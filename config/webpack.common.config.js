const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const DotenvPlugin = require('dotenv-webpack');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const paths = require('./lib/paths');
const apps = require('./lib/apps')(path.resolve(__dirname, './apps.config.js'));

module.exports = {
    context: paths.src(),
    entry: apps.getEntries(),
    resolve: {
        extensions: ['.wasm', '.mjs', '.js', '.json', '.ts', '.tsx'],
        alias: {
            '@': paths.src(),
        },
    },
    resolveLoader: {
        modules: [
            'node_modules',
            path.resolve(__dirname, './lib'),
        ],
    },
    plugins: [
        ...apps.getPlugins(),
        new DotenvPlugin({
            path: paths.root('.env'),
            safe: true,
        }),
        new CopyPlugin([
            {
                from: 'public',
                to: '.',
                toType: 'dir',
                ignore: ['.gitkeep'],
                context: paths.root(),
            }
        ]),
        new SpriteLoaderPlugin({
            plainSprite: true
        })
    ]
};
