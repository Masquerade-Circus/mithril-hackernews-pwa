let compression = require('compression'),
    fs = require('fs'),
    config = require('./config.js');

/**
 * Function to catch errors
 * @method errorHandler
 * @param  {Function}   fn  The handler function
 * @return {Promise}
 */
let errorHandler = fn => (req, res) => {
    // Uses promise resolve to convert any static function to a promise
    return Promise.resolve(fn(req, res)).catch(err => {
        if (err.code !== undefined && err.code === "ENOENT") {
            return micro.send(res, 404);
        }
        console.log(err.stack);
        micro.sendError(req, res, err);
    });
};

/**
 * Main route handler, it attach the compress and errorHandler to all routes
 * @method routeHandler
 * @param  {Function} fn    The handler function
 * @return {Function}       The main handler function
 */
let routeHandler = fn => errorHandler(async (req, res) => {
    new Promise(next => compression()(req, res, next));
    return await fn(req, res);
});

/**
 * Helper functio to serve a file from the file system
 * @method serveFile
 * @param  {Object}  res        Response object
 * @param  {String}  filePath   Path of the file to serve
 * @return {Promise}
 */
let serveFile = (res, filePath) => {
    let extension = filePath.split('/').pop().split('.').pop();
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

/**
 * Helper function to serve a full directory form the file system
 * @method serveDir
 * @param  {String} path    The directory path
 * @return {Function}       The main handler
 */
let serveDir = path => routeHandler((req, res) => serveFile(res, path + (Array.isArray(req.params._) ? req.params._.pop() : req.params._)));

/**
 * Helper function to load a view and replace a list of vars in it as a simple template engine
 * @method loadView
 * @param  {String} filePath        The file path
 * @param  {Object} [data={}]       Object of key value pairs to replace on the contents
 * @return {Promise}                Promise that resolves with a template function file contents
 */
let loadView = (filePath, data) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, contents) => {
            if (err) {
                return reject(err);
            }

            /**
             * Simple template engine
             * @method template
             * @param  {Object} [data={}] Object of key value pairs to replace on the contents
             * @return {String}           Contents parsed
             */
            let template = (data = {}) => {
                let c = contents;
                for (let i in data) {
                    c = c.replace(new RegExp("{{(" + i + ")}}", "g"), (data[i] || ''));
                }
                return c;
            };

            // If data object is passed, return the contents parsed
            if (data !== undefined && typeof data === 'object') {
                return resolve(template(data));
            }

            // If no data object, return the template function;
            resolve(template);
        });
    });
};

/**
 * Helper function to render an html string
 * @method render
 * @param  {Object} res     Response object
 * @param  {String} html    Html string
 * @return {Void}
 */
let render = (res, html) => {
    return Promise.resolve(html)
        .then(html => {
            res.writeHead(200, {
                'Content-Type': config.mimeTypes.html,
                'Content-Length': html.length
            });

            res.end(html);
        });
};

/**
 * Expor default object with all the helpers
 */
module.exports = {
    serveFile,
    errorHandler,
    serveDir,
    routeHandler,
    loadView,
    render
};
