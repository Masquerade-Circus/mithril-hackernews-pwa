let CommentItem = {
    collapsed: true,
    toggle(e, vnode) {
        vnode.state.collapsed = !vnode.state.collapsed;
        e.preventDefault();
    },
    view(vnode) {
        if (vnode.attrs.id === undefined) {
            return m('.comment_item.fadeIn');
        }

        return m('.comment-item.fadeIn', [
            m('', [
                m('a', {href: `/user/${vnode.attrs.by}`, oncreate: m.route.link}, vnode.attrs.by),
                ' ',
                timeago().format(vnode.attrs.time * 1000)
            ]),
            m('', m.trust(vnode.attrs.text)),
            vnode.attrs.kids !== undefined && vnode.attrs.kids.length > 0 ?
                m('', [
                    this.collapsed ?
                        m('.comments-collapsed[data-background="primary 50"]', {key: `comments-collapsed-${vnode.attrs.id}`}, [
                            m('a[href="#"]', {onclick: e => this.toggle(e, vnode)}, '[+]'),
                            ` ${vnode.attrs.kids.length} replies collapsed`
                        ]) :
                        m('', [
                            m('a.collapse-button[href="#"]', {onclick: e => this.toggle(e, vnode), key: `collapsed-button-${vnode.attrs.id}`}, '[-]'),
                            m(CommentList, vnode.attrs)
                        ])
                ]) :
                ''
        ]);
    }
}

let CommentList = {
    getKids(kids = [], i = 0) {
        if (i >= kids.length) {
            return;
        }

        let kid = kids[i];
        return this.getItem(kid)
            .then(kid => {
                kids[i] = kid;
                i++;
                m.redraw();
                this.getKids(kids, i);
            });
    },
    getItem(id) {
        if (typeof id === 'object') {
            return Promise.resolve(id);
        }
        return m.request({
            method: "GET",
            url: `/hackernews/item/${id}`
        }).then(item => {
            return item[0] || item;
        });
    },
    oninit(vnode) {
        this.getKids(vnode.attrs.kids);
    },
    view(vnode) {
        return vnode.attrs.kids.map(kid => {
            if (kid.deleted !== true) {
                return m(CommentItem, kid);
            }
        });
    }
};

export default CommentList;
