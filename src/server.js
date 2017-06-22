import './init';
import Helper from './helpers';
import config from './config';

/**
 * Get the default options with the js, css and links view loaded
 * when the server starts
 * @method indexDefaultOptions
 * @return {Object}
 */
let indexDefaultOptions = {
    upDir: '.',
    title: 'HN - Mithril - 2'
};

Promise.resolve()
    .then(() => Helper.loadView('./public/js/app.js', {}).then(js => indexDefaultOptions.js = js))
    .then(() => Helper.loadView('./public/css/app.css', {}).then(css => indexDefaultOptions.css = css))
    .then(() => Helper.loadView('./src/views/links.html', {}).then(iconLinks => indexDefaultOptions.iconLinks = iconLinks));

// Generate the index template
let indexTemplate = () => {};
Helper.loadView('./src/views/index.html').then(template => indexTemplate = template);

/**
 * Index view to send to all requests
 * @method index
 * @param  {Object}  [data={}] object with a key value list
 * @return {Promise}           The html file contents
 */
let index = (data = {}) => indexTemplate(Object.assign({}, indexDefaultOptions, data));

// Create the routes
let routes = [
    // Main route serve the index view
    Router.get('/', Helper.routeHandler((req, res) => Helper.render(res, index()))),
    // Serve image files directory
    Router.get('(/*)/images/*', Helper.serveDir('./public/images/')),
    // Serve the service worker file
    Router.get('(/*)/sw.js', Helper.routeHandler((req,res) => Helper.serveFile(res, './public/js/sw.js'))),
    // If no routes where found send a not found response
    Router.get('/*', Helper.routeHandler((req, res) => micro.send(res, 404)))
];

// We get all the sections from the config file and add them as routes serving the index view
config.sections.map(item => {
    routes.unshift(Router.get(`/${item.section}/:param`, Helper.routeHandler((req, res) => Helper.render(res, index({upDir: '..'})))));
    routes.unshift(Router.get(`/${item.section}`, Helper.routeHandler((req, res) => Helper.render(res, index()))));
});

let server = micro(Router.router.apply(micro, routes));

server.listen(3000, () => console.log('Server listening on port 3000'));
