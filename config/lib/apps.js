const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

/**
 * defineApp allows you to easily add support for multi-page applications
 * Each app has it's own entry file and html template.
 *
 * The folder structure should be like this:
 *
 * src
 *   |__app
 *      |__{your app}
 *         |__index.html
 *         |__App.tsx
 *         |__index.tsx
 *
 * @typedef {{ name: string, isIndex: boolean }} ConfigItem
 *
 * @param {string} configFile
 */
module.exports = (configFile) => {
    const plugins = [];
    const entries = {};
    const rewrites = [];

    /** @type {ConfigItem[]} config */
    const config = require(configFile);

    const entry = (src) => {
        return [
            src,
        ]
    };

    config.forEach(({ name, isIndex }) => {
        if(!fs.existsSync(`./src/apps/${name}/index.tsx`)) {
            console.log(chalk.red(`No entry point for app ${name} found!`));
            process.exit(1);
        }

        entries[name] = entry(`./apps/${name}/index.tsx`);

        plugins.push(
            new HTMLWebpackPlugin({

                /*
                    The HTMLWebpackPlugin will include all the chunks for all the apps.
                    But what you want is that a app only includes the app chunk and the shared chunks.
                */
                chunks: [name],
                filename: isIndex ? 'index.html' : `${name}/index.html`,
                template: path.resolve(__dirname, `../../src/apps/${name}/index.ejs`),
                inject: true
            })
        );

        if(!isIndex) {
            const escapedName = name.replace(/([^a-zA-Z0-9])/g, "\\$1");

            /**
             * Add rewrite for history fallback (only used in devserver)
             */
            rewrites.push({
                from: new RegExp(`^\/${escapedName}`), to: `/${name}/index.html`
            });
        }
    });

    return {
        getPlugins: () => plugins,
        getEntries: () => entries,
        getRewrites: () => rewrites,
        getCacheGroups: () => {
            return {

                /**
                * This cache group is actually just the same as the default cache group where everything in node_modules ends up in vendors.
                * I only tweaked the naming
                */
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'initial',
                    priority: 1,
                    name(module, chunks, cacheGroupKey) {
                        if(chunks.length > 1 || Object.keys(entries).length === 1) {
                            return 'vendor';
                        }
                        return `vendor-${chunks[0].name}`;
                    }
                }
            }
        },
    }
}
