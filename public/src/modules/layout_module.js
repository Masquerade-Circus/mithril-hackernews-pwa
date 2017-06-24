import config from '../config';
import Component from '../components';

let Layout = {
    nav : [],
    oncreate(vnode) {
        this.nav = config.sections;
    },
    view(vnode) {
        return [
            m('header', [
                //m('img.icon-logo[src="./images/logo-48x48.png"][alt="Mithril"]'),
                m('.icon-logo', m(Component.logo)),
                m('nav', config.sections.map(item => m('a[data-button]', {href: `/${item.section}`, oncreate: m.route.link}, item.title)))
            ]),
            vnode.children
        ];
    }
};

export default Layout;
