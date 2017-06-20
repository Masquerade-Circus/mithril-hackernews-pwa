import './init';
import Helper from './helpers';
import config from './config';

let index = async (data = {}) => Helper.file('./src/views/index.html', Object.assign({}, {
    upDir: '.',
    title: 'HN - Mithril',
    css : await Helper.file('./public/css/app.css'),
    iconLinks: await Helper.file('./src/views/links.html')
}, data));

let routes = [
    Router.get('/', Helper.route(async (req, res) => Helper.render(res, await index()))),
    Router.get('(/*)/css/*', Helper.serveDir('./public/css/')),
    Router.get('(/*)/js/*', Helper.serveDir('./public/js/')),
    Router.get('(/*)/images/*', Helper.serveDir('./public/images/')),
    Router.get('(/*)/icons/*', Helper.serveDir('./public/icons/')),
    Router.get('(/*)/sw.js', Helper.route((req,res) => Helper.serveFile(res, './public/js/sw.js'))),
    Router.get('/*', Helper.route((req, res) => micro.send(res, 404)))
];

config.sections.map(item => {
    routes.unshift(Router.get(`/${item.section}/:param`, Helper.route(async (req, res) => Helper.render(res, await index({upDir: '..'})))));
    routes.unshift(Router.get(`/${item.section}`, Helper.route(async (req, res) => Helper.render(res, await index()))));
});

let server = micro(Router.router.apply(micro, routes));

server.listen(3000, () => console.log('Server listening on port 3000'));
