module.exports = (isProduction) => [
    {
        test: /\.(jpe?g|gif|png)$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: isProduction ? 'assets/images/[name].[hash:8].[ext]' : 'assets/images/[path][name].[ext]',
                }
            }
        ]
    },

    {
        test: /\.(ttf|otf|woff2?)$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: isProduction ? 'assets/fonts/[name].[hash:8].[ext]' : 'assets/fonts/[path][name].[ext]',
                }
            }
        ]
    },
    {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'svg-sprite-loader',
                options: {
                    extract: true,
                    spriteFilename: svgPath => isProduction ? `assets/images/sprite.[hash:8]${svgPath.substr(-4)}` : `assets/images/sprite${svgPath.substr(-4)}`
                }
            }
        ],
    }
];
