import Init from './init';
import Helper from './helpers';

import Module from './components';
import config from './config';

let routeFactory = item => {
    return {
        render() {
            Helper.Title(`HN - ${item.title}`);
            let param = m.route.param('param') || '';
            return m(Module.Layout, m(Module.List, Object.assign({key: item.section + param, param}, item)));
        }
    };
};

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

config.sections.map(item => {
    Routes[`/${item.section}`] = routeFactory(item);
    Routes[`/${item.section}/:param`] = routeFactory(item);
});

Helper.Ready(Init(() => {
    let bodyElement = window.document.body || window.document.getElementsByTagName('body')[0];
    m.route(bodyElement, '/top', Routes);
}));
