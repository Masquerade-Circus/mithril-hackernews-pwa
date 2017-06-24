import Component from '../components';
import Api from '../api';

let CommentsModule = {
    comments: {},
    item: {},
    oninit(vnode) {
        Api.getItem(vnode.attrs.param)
            .then(item => this.item = item);
    },
    view(vnode) {
        return [
            m('article', [
                m('a[data-fab="accent back"]', {onclick: e => window.history.back()},  '<'),
                m('section[data-card="full-width"]', [
                    m('header', [
                        m('h1', [
                            this.item.id !== undefined ?
                                m('a[target="_blank"][rel="noopener"][data-font="default"]', {href: this.item.url}, this.item.title) :
                                ''
                        ])
                    ]),
                    m('section', [
                        this.item.id !== undefined ?
                            m('span', [
                                this.item.score,
                                ' points | by ',
                                m('a', {href: `/user/${this.item.by}`, oncreate: m.route.link}, this.item.by),
                                ' ',
                                timeago().format(this.item.time * 1000)
                            ]) :
                            ''
                    ])
                ]),
                m('section[data-card="full-width"]', [
                    m('header', [
                        m('h1', [
                            this.item.id !== undefined ?
                                `${this.item.descendants} comments` :
                                ''
                        ])
                    ]),
                    m('section', this.item.id !== undefined ? m(Component.comments, this.item) : '')
                ])
            ]),
            m('footer', m(Component.credits))
        ];
    }
};

export default CommentsModule;
