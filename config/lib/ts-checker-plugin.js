const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const typescriptFormatter = require('react-dev-utils/typescriptFormatter');
const path = require('path');

class TsCheckerPlugin {    
    clearConsole() {
        process.stdout.write(
            process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H'
        );
    }

    apply(compiler) {
        let tsMessagesPromise;
        let tsMessagesResolver;

        const forkTsPlugin = new ForkTsCheckerWebpackPlugin({
            async: true,
            useTypescriptIncrementalApi: true,
            checkSyntacticErrors: true,
            silent: true,
            formatter: typescriptFormatter,
            watch: './src',
            tsconfig: path.resolve(compiler.options.context, '../tsconfig.json'),
        });

        forkTsPlugin.apply(compiler);

        compiler.hooks.beforeCompile.tap('beforeCompile', () => {
            tsMessagesPromise = new Promise(resolve => {
                tsMessagesResolver = msgs => resolve(msgs);
            });
        });

        ForkTsCheckerWebpackPlugin
            .getCompilerHooks(compiler)
            .receive.tap('afterTypeScriptCheck', (diagnostics, lints) => {
                const allMsgs = [...diagnostics, ...lints];
                const format = message =>
                `${message.file}\n${typescriptFormatter(message, true)}`;

                tsMessagesResolver({
                    errors: allMsgs.filter(msg => msg.severity === 'error').map(format),
                    warnings: allMsgs
                        .filter(msg => msg.severity === 'warning')
                        .map(format),
                });
            });

        compiler.hooks.done.tap('done', async stats => {
            const messages = await tsMessagesPromise;

            const statsData = stats.toJson({
                all: false,
                warnings: true,
                errors: true,
            });

            if(statsData.errors.length) {
                return;
            }

            statsData.errors.push(...messages.errors);

            stats.compilation.errors.push(...messages.errors);
            stats.compilation.warnings.push(...messages.warnings);

            if(messages.errors.length) {
                compiler.hooks.devServerWrite.call('errors', messages.errors);
                console.log(messages.errors.join('\n\n'));
            } else if(messages.warnings.length) {
                compiler.hooks.devServerWrite.call('warnings', messages.warnings);
                console.log(messages.warnings.join('\n\n'));
            }
        })
    }
}

module.exports = TsCheckerPlugin;