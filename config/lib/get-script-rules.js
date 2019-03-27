
module.exports = (isProduction) => [
    {
        test: /\.graphql$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                }
            },
            {
                loader: 'graphql-loader',
                options: {
                    schemaInput: 'http://localhost:4000/graphql',
                    schemaOutput: './src/types/schema.d.ts'
                }
            }
        ]
    },

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
