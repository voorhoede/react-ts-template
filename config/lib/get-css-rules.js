const path = require('path');
const camelCase = require('camelcase');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (isProduction) => [
    {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
            isProduction && {
                loader: MiniCssExtractPlugin.loader,
            },

            {
                loader: 'css-loader',
                options: {
                    modules: true,
                    camelCase: true,
                    sourceMap: true,
                    importLoaders: 2,
                    getLocalIdent(context, localIdentName, localName, options) {
                        const { resourcePath } = context;
                        const componentName = path.basename(resourcePath, '.css');
                        const componentNameCamelCased = camelCase(componentName);
                        return componentNameCamelCased + '__'  + localName;
                    },
                },
            },

            !isProduction && {
                loader: 'css-ts-creator-loader',
            },

            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true
                }
            }
        ]
    }
];
