const paths = require('./paths');

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
            !isProduction && {
                loader: 'graphql-loader',
                options: {
                    schemaInput: 'http://localhost:4000/graphql',
                    schemaOutput: paths.src('types/schema.d.ts')
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
