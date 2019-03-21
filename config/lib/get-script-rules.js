
module.exports = (isProduction) => [
    {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                }
            },
            !isProduction && {
                loader: 'eslint-loader',
                options: {
                    fix: true
                }
            }
        ]
    }
];
