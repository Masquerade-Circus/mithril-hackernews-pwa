import './init';
import Helper from './helpers';
import config from './config';
import HNService from './hackernews_service';
import timeago from 'timeago.js';

/**
 * Get the default options with the js, css and links view loaded
 * when the server starts
 * @method indexDefaultOptions
 * @return {Object}
 */
let indexDefaultOptions = {
    upDir: '.',
    title: 'HN - Mithril'
};

Promise.resolve()
    .then(() => Helper.loadView('./public/js/app.js', {}).then(js => indexDefaultOptions.js = js))
    .then(() => Helper.loadView('./public/css/app.css', {}).then(css => indexDefaultOptions.css = css))
    .then(() => Helper.loadView('./src/views/links.html', {}).then(iconLinks => indexDefaultOptions.iconLinks = iconLinks));

// Generate the index template
let indexTemplate = () => {};
Helper.loadView('./src/views/index.html').then(template => indexTemplate = template);

let getSectionList = async (req, section, upDir = '.') => {
    let initialData = {
        top: await HNService.fetch('/hackernews/top/1'),
        new: await HNService.fetch('/hackernews/new/1'),
        show: await HNService.fetch('/hackernews/show/1'),
        ask: await HNService.fetch('/hackernews/ask/1'),
        job: await HNService.fetch('/hackernews/job/1')
    };

    let options = {upDir: upDir, list: '', initialData: JSON.stringify(initialData)};

    if (config.initialHtml) {
        let template = await Helper.loadView('./src/views/list_item.html');

        let html = '';
        initialData[section].map(item => {
            item.time = timeago().format(item.time * 1000);
            html += template(item);
        });
        options.list = html;
    }

    return index(options);
};

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
    Router.get('/', Helper.routeHandler((req, res) => Helper.render(res, getSectionList(req, 'top')))),
    // Serve image files directory
    Router.get('(/*)/images/*', Helper.serveDir('./public/images/')),
    // Serve the service worker file
    Router.get('(/*)/sw.js', Helper.routeHandler((req,res) => Helper.serveFile(res, './public/js/sw.js'))),
    // If no routes where found send a not found response
    Router.get('/*', Helper.routeHandler((req, res) => micro.send(res, 404)))
];

// We get all the sections from the config file and add them as routes serving the index view
config.sections.map(item => {
    routes.unshift(Router.get(`/${item.section}/:param`, Helper.routeHandler(async (req, res) => Helper.render(res, getSectionList(req, item.section, {upDir: '..'})))));
    routes.unshift(Router.get(`/${item.section}`, Helper.routeHandler(async (req, res) => Helper.render(res, getSectionList(req, item.section)))));
    routes.unshift(Router.get(`/hackernews/${item.section}(/:param)`, Helper.routeHandler(HNService.handler(item.section))));
});

let server = micro(Router.router.apply(micro, routes));

server.listen(3000, () => console.log('Server listening on port 3000'));
