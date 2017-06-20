import config from '../config';

let Layout = {
    nav : [],
    oncreate(vnode) {
        this.nav = config.sections;
    },
    view(vnode) {
        return [
            m('header', [
                m('img.icon-logo[src="./images/logo.png"][alt="Mithril"]'),
                m('nav', config.sections.map(item => m('a[data-button]', {href: `/${item.section}`, oncreate: m.route.link}, item.title)))
            ]),
            vnode.children
        ];
    }
};

export default Layout;
