const commonConfig = require('./webpack.common.config');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const paths = require('./lib/paths');
const apps = require('./lib/apps')(path.resolve(__dirname, './apps.config.js'));
const { createRuleGetter } = require('./lib/utils');
const getCssRules = createRuleGetter( require('./lib/get-css-rules') );
const getAssetRules = createRuleGetter( require('./lib/get-asset-rules') );
const getScriptRules = createRuleGetter( require('./lib/get-script-rules') );

const optionalPlugins = [];

if(process.argv.includes('--analyze')) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    optionalPlugins.push(new BundleAnalyzerPlugin());
}

module.exports = merge(commonConfig, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        path: paths.dist(),
        filename: 'js/[name].[chunkhash:8].js',
        publicPath: '/'
    },
    optimization: {
        nodeEnv: 'production',
        moduleIds: 'named', // better in combination with gzip
        minimizer: [
            new TerserPlugin({
                parallel: true,
                sourceMap: true,
                terserOptions: {
                    ie8: false
                }
            })
        ],
        splitChunks: {
            name: true,
            minSize: 0,
            maxAsyncRequests: 9,
            maxInitialRequests: 9,
            cacheGroups: {
                ...apps.getCacheGroups(),
            },
        },
        runtimeChunk: {
            name: "manifest",
        },
    },
    module: {
        rules: [
            ...getAssetRules(),
            ...getCssRules(),
            ...getScriptRules(),
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash:8].css',
            chunkFilename: 'css/[name].[hash:8].css'
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: {
                map: {
                  inline: false
                }
            }
        }),
        new CleanWebpackPlugin(),
        ...optionalPlugins,
    ]
});
