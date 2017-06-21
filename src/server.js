import './init';
import Helper from './helpers';
import config from './config';

/**
 * Index view to send to all requests
 * @method index
 * @param  {Object}  [data={}] object with a key value list
 * @return {Promise}           The html file contents
 */
let index = async (data = {}) => Helper.loadView('./src/views/index.html', Object.assign({}, {
    upDir: '.',
    title: 'HN - Mithril',
    css : await Helper.loadView('./public/css/app.css'),
    iconLinks: await Helper.loadView('./src/views/links.html')
}, data));

// Create the routes
let routes = [
    // Main route serve the index view
    Router.get('/', Helper.routeHandler(async (req, res) => Helper.render(res, await index()))),
    // Serve file directories
    Router.get('(/*)/css/*', Helper.serveDir('./public/css/')),
    Router.get('(/*)/js/*', Helper.serveDir('./public/js/')),
    Router.get('(/*)/images/*', Helper.serveDir('./public/images/')),
    Router.get('(/*)/icons/*', Helper.serveDir('./public/icons/')),
    // Serve the service worker
    Router.get('(/*)/sw.js', Helper.routeHandler((req,res) => Helper.serveFile(res, './public/js/sw.js'))),
    // If no routes where found send a not found response
    Router.get('/*', Helper.routeHandler((req, res) => micro.send(res, 404)))
];

// We get all the sections from the config file and add them as routes serving the index view
config.sections.map(item => {
    routes.unshift(Router.get(`/${item.section}/:param`, Helper.routeHandler(async (req, res) => Helper.render(res, await index({upDir: '..'})))));
    routes.unshift(Router.get(`/${item.section}`, Helper.routeHandler(async (req, res) => Helper.render(res, await index()))));
});

let server = micro(Router.router.apply(micro, routes));

server.listen(3000, () => console.log('Server listening on port 3000'));
