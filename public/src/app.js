import Init from './init';
import Helper from './helpers';

import Module from './modules';
import config from './config';

// Helper function to add list routes
let routeFactory = item => {
    return {
        render() {
            Helper.Title(`HN - ${item.title}`);
            let param = m.route.param('param') || '';
            return m(Module.Layout, m(Module.List, Object.assign({key: item.section + param, param}, item)));
        }
    };
};

// Set the routes for users and comments
let Routes = {
    '/user/:param': {
        render() {
            Helper.Title(`HN - User`);
            let param = m.route.param('param') || '';
            return m(Module.Layout, m(Module.User, {key: param, param}));
        }
    },
    '/comments/:param': {
        render() {
            Helper.Title(`HN - Comments`);
            let param = m.route.param('param') || '';
            return m(Module.Layout, m(Module.Comments, {key: param, param}));
        }
    }
};

// For each section add the main route and the route with params
config.sections.map(item => {
    Routes[`/${item.section}`] = routeFactory(item);
    Routes[`/${item.section}/:param`] = routeFactory(item);
});

// Add the default route
Routes[`/`] = routeFactory(config.sections[0]);
Helper.Ready(() => {
    let bodyElement = window.document.body || window.document.getElementsByTagName('body')[0];
    m.route(bodyElement, '/', Routes);
});

// When dom ready and service worker activated attach mithril to the dom
Init(() => {
    console.log('Service worker init');
});
