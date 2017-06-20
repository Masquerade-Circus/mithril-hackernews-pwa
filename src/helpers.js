import compress from 'micro-compress';
import fs from 'fs';

import config from './config.js';

let errorHandler = fn => (req, res) => {
    return Promise.resolve(fn(req, res)).catch(err => {
        if (err.code !== undefined && err.code === "ENOENT") {
            return micro.send(res, 404);
        }
        console.log(err.stack);
        micro.sendError(req, res, err);
    });
};

let route = fn => errorHandler(compress((req, res) => fn(req, res)));

let serveFile = (res, fileName) => {
    let filePath = fileName;
    let extension = fileName.split('/').pop().split('.').pop();
    return new Promise((resolve, reject) => {
        return fs.stat(filePath, (err, stat) => {
            if (err) {
                return reject(err);
            }

            res.writeHead(200, {
                'Content-Type': config.mimeTypes[extension] || 'text/plain',
                'Content-Length': stat.size,
                'Cache-Control': 'public, max-age=2592000',
                'Expires': new Date(Date.now() + 604800000).toUTCString()
            });

            let readStream = fs.createReadStream(filePath);

            resolve(readStream.pipe(res));
        });
    });
};

let serveDir = path => route((req, res) => serveFile(res, path + (Array.isArray(req.params._) ? req.params._.pop() : req.params._)));

/**
 * https://gist.github.com/Masquerade-Circus/d441541cc604624552a9
 * Small and super fast logic-less template engine in 132 bytes.
 */

let file = (file, data = {}) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (err, contents) => {
            if (err) {
                return reject(err);
            }

            for (let i in data) {
                contents = contents.replace(new RegExp("{{(" + i + ")}}", "g"), (data[i] || ''));
            }
            resolve(contents);
        });
    });
};

let render = (res, html) => {
    res.writeHead(200, {
        'Content-Type': config.mimeTypes.html,
        'Content-Length': html.length
    });

    res.end(html);
};

export default {
    serveFile,
    errorHandler,
    serveDir,
    route,
    file,
    render
};
