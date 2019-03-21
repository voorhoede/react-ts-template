const path = require('path');
const DtsCreator = require('typed-css-modules');
const crypto = require('crypto');
const fs = require('fs');
const { promisify } = require('util');

const existsAsync = promisify(fs.exists);

const hashFromContents = (data) => {
    return new Promise((resolve, reject) => {
        const hasher = crypto.createHash('md5');
        hasher.setEncoding('hex');
        hasher.on('readable', () => {
            const data = hasher.read();
            if(data) {
                resolve(data);
            }
        });
        hasher.write(data);
        hasher.end();
    });
}

const hashFromFile = (file) => {
    return new Promise((resolve, reject) => {
        const hasher = crypto.createHash('md5');
        hasher.setEncoding('hex');
        const readStream = fs.createReadStream(file);
        readStream.once('end', () => {
            hasher.end();
            resolve(hasher.read());
        });
        readStream.on('error', reject);
        readStream.pipe(hasher);
    });
}

module.exports = function (source, map) {
    if (this.cacheable) {
        this.cacheable();
    }

    this.addDependency(this.resourcePath);

    const callback = this.async();
    const creator = new DtsCreator();
    
    creator.create(this.resourcePath, source)
        .then(content => {
            this.emitFile(
                path.relative(this.context, content.outputFilePath),
                content.formatted,
                map
            );

            return existsAsync(content.outputFilePath)
                .then((exists) => {
                    return exists
                        ? Promise.all([hashFromFile(content.outputFilePath), hashFromContents(content.formatted)]) 
                        : [null, null];
                })
                .then(([hashFile, hashContents]) => {
                    if(hashFile === null || hashFile !== hashContents) {
                        return content.writeFile();
                    }
                });
        })
        .then(() => {
            callback(null, source, map);
        })
        .catch(callback);
}