let micro = require('micro'),
    Helper = require('./helpers'),
    config = require('./config'),
    HNService = require('./hackernews_service'),
    MicroExRouter = require('micro-ex-router'),
    compression = require('compression'),
    getSection = require('./section'),
    defaultOptions = {
        parseBody: false, // Tells the router to parse the body by default
        acceptedMethods: ['get', 'post', 'options', 'use'] // The methods that will be handled by the router
    };

// Handle errors for all routes
let handleErrors = fn => async (req, res) => {
    try {
        return await fn(req, res);
    } catch (err) {
        micro.send(res, 500, err);
    }
};

// Main router
let router = MicroExRouter(defaultOptions);
router
    // Add compression
    .use((req,res) => new Promise(next => compression()(req, res, next)))
    // Serve index
    .get('/', getSection('top'))
    // Serve icon files
    .get('/images/icons/:file', (req, res) => Helper.serveFile(res, `./public/images/icons/${req.params.file}`))
    // Serve worker
    .get('/sw.js', (req, res) => Helper.serveFile(res, `./public/js/sw.js`))
;

// For each section add its routes
config.sections.map(item => {
    router
        // Uncomment the next lines to push state navigation
        // .get(`/${item.section}/:param`, getSection(item.section, {upDir: '..'}))
        // .get(`/${item.section}`, getSection(item.section))

        .get(`/hackernews/${item.section}/:param`, HNService.handler(item.section))
        .get(`/hackernews/${item.section}`, HNService.handler(item.section))
    ;
});

// Add the item route to get the comments
router.get(`/hackernews/item/:param`, HNService.handler('item'));

// Init server
let server = micro(handleErrors(router));
server.listen(3000, () => console.log('Server listening on port 3000'));
