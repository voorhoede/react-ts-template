const webpack = require('webpack');
const commonConfig = require('./webpack.common.config');
const merge = require('webpack-merge');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const paths = require('./lib/paths');
const TsCheckerPlugin = require('./lib/ts-checker-plugin');
const { createRuleGetter } = require('./lib/utils');
const getCssRules = createRuleGetter( require('./lib/get-css-rules') );
const getAssetRules = createRuleGetter( require('./lib/get-asset-rules') );
const getScriptRules = createRuleGetter( require('./lib/get-script-rules') );

module.exports = merge(commonConfig, {
    mode: 'development',
    devtool: 'cheap-eval-source-map',
    output: {
        path: paths.dist(),
        filename: 'js/[name].[hash:8].js',
        publicPath: '/'
    },
    module: {
        rules: [
            ...getScriptRules(),
            ...getAssetRules(),
            ...getCssRules(),
        ]
    },
    plugins: [
        new webpack.WatchIgnorePlugin([
            /css\.d\.ts$/
        ]),
        new TsCheckerPlugin(),
        new StyleLintPlugin({
            configFile: paths.root('.stylelintrc'),
            files: '**/*.css',
            fix: true,
            lintDirtyModulesOnly: true
        }),
    ]
});
