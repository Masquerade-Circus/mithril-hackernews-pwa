let listItem = {
    view(vnode) {
        return m('li', m('span[tabindex="-1"]', [
            m('span.icon-counter[data-font="primary"]', vnode.attrs.score),
            m('span', [
                m('small', m('a[target="_blank"][rel="noopener"]', {href: vnode.attrs.url}, vnode.attrs.title)),
                m('br'),
                m('small', [
                    'by ',
                    m('a', {href: `/user/${vnode.attrs.by}`, oncreate: m.route.link}, vnode.attrs.by),
                    ' ',
                    timeago().format(vnode.attrs.time * 1000),
                    ' | ',
                    m('a', {href: `/comments/${vnode.attrs.id}`, oncreate: m.route.link}, `${vnode.attrs.descendants} comments`)
                ])
            ])
        ]));
    }
};

export default listItem;
