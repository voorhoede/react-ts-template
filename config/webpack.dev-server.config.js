const path = require('path');
const evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware');
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const paths = require('./lib/paths');
const apps = require('./lib/apps')(path.resolve(__dirname, './apps.config.js'));
const url = require('url');

require('dotenv').config( { path: paths.root('.env') });

const apiBase = process.env.API_BASE;
const apiHost = process.env.API_HOST || 'http://0.0.0.0:8000';

module.exports = {
    host: '0.0.0.0',
    contentBase: paths.dist(),
    port: 3000,
    overlay: false,
    quiet: false,
    hot: true,
    clientLogLevel: 'none',
    proxy: {
        [apiBase]: {
            target: url.resolve(apiHost, apiBase),
            pathRewrite: {[`^${apiBase}`] : ''},
            changeOrigin: true,
        },
    },
    historyApiFallback: {
        rewrites: apps.getRewrites(),
    },
    before(app, server) {
        app.use(evalSourceMapMiddleware(server));
        app.use(errorOverlayMiddleware());
    },
    stats: {
        chunks: false,
        chunkGroups: false,
        chunkModules: false,
        colors: true,
        entrypoints: true,
        modules: false,
    }
}
