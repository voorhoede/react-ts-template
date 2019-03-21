const { resolve } = require('path');

const root = resolve(__dirname, '../../');

exports.src = (path = '.') => {
    return resolve(root, 'src', path);
}

exports.root = (path = '.') => {
    return resolve(root, path);
}

exports.dist = (path = '.') => {
    return resolve(root, 'dist', path);
}
