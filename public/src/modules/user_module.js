import Component from '../components';

let UserModule = {
    user: {},
    oncreate(vnode) {
        m.request({
            method: "GET",
            url: `/hackernews/user/${vnode.attrs.param}`
        })
        .then(user => this.user = user);
    },
    view(vnode) {
        return [
            m('article', [
                m('a[data-fab="accent back"]', {onclick: e => window.history.back()},  '<'),
                m('section[data-card="full-width"]', [
                    m('header', [
                        m('h1', 'User: ', this.user.id)
                    ]),
                    m('section', [
                        m('div', 'Karma: ', this.user.karma),
                        m('div', 'Created: ', timeago().format(this.user.created * 1000)),
                        m('hr'),
                        m.trust(this.user.about || 'No info'),
                        m('hr'),
                        m('div', [
                            m('a[target="_blank"][rel="noopener"]', {href: `https://news.ycombinator.com/submitted?id=${this.user.id}`}, 'submissions'),
                            ' | ',
                            m('a[target="_blank"][rel="noopener"]', {href: `https://news.ycombinator.com/threads?id=${this.user.id}`}, 'comments')
                        ])
                    ])
                ])
            ]),
            m('footer', m(Component.credits))
        ];
    }
};

export default UserModule;
