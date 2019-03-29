module.exports = ({
    config,
    mode
}) => {
    config.module.rules.push({
        test: /\.(ts|tsx)$/,
        loader: require.resolve('babel-loader'),
        options: {
            presets: [
                "@babel/preset-react",
                [
                    "@babel/preset-typescript",
                    {
                        "isTSX": true,
                        "allExtensions": true
                    }
                ],
            ],
        },
    });
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
};
