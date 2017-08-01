import Component from '../components';
import Api from '../api';

let ListModule = {
    elements: [],
    pagination: {
        show: false,
        current : 1,
        next: 2,
        prev: 0,
        total: 1
    },
    section: 'top',
    oninit(vnode) {
        this.section = vnode.attrs.section.toLowerCase();
        if (!window.Ready) {
            this.elements = initialData[this.section].items || [];
            this.pagination.total = initialData[this.section].total || 1;
        }
        this.pagination.show = vnode.attrs.paginated || false;
        this.pagination.current = parseInt(vnode.attrs.param) || 1;
        this.pagination.next = this.pagination.current + 1;
        this.pagination.prev = this.pagination.current - 1;
        if (window.Ready) {
            Api.fetch(this.section, this.pagination.current)
                .then(response => {
                    this.elements = response.items;
                    this.pagination.total = response.total;
                });
        }
    },
    view(vnode) {
        return [
            m('header', [
                this.pagination.show ?
                    m('nav', [
                        this.pagination.prev > 0 ?
                            m('a[data-button]', {
                                href: `/${this.section}` + (this.pagination.prev > 1 ? `/${this.pagination.prev}` : ''),
                                key: `/${this.section}` + (this.pagination.prev > 1 ? `/${this.pagination.prev}` : ''),
                                oncreate: m.route.link,
                                onupdate: m.route.link
                            }, '< prev') :
                            m('a[data-button][disabled]', {onclick: e => e.preventDefault()}, '< prev'),
                        m('span', this.pagination.current),
                        ' / ',
                        m('span', this.pagination.total),
                        this.elements.length === 30 ?
                            m('a[data-button]', {
                                href: `/${this.section}/${this.pagination.next}`,
                                key: `/${this.section}/${this.pagination.next}`,
                                oncreate: m.route.link,
                                onupdate: m.route.link
                            }, 'next >') :
                            m('a[data-button][disabled]', {onclick: e => e.preventDefault()}, 'next >')
                    ]) : ''
            ]),
            m('article', [
                m('section[data-card="full-width"]', [
                    m('section', [
                        m('ul[data-list="three-line"]', this.elements.map(item => {
                            item.key = item.id;
                            return m(Component.listItem, item);
                        }))
                    ])
                ])
            ]),
            m('footer', [
                m(Component.credits)
            ])
        ];
    }
};

export default ListModule;
