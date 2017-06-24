import Component from '../components';
import Api from '../api';

let ListModule = {
    elements: [],
    pagination: {
        show: false,
        current : 1,
        next: 2,
        prev: 0
    },
    section: 'top',
    oninit(vnode) {
        this.section = vnode.attrs.section.toLowerCase();
        this.elements = initialData[this.section];
        this.pagination.show = vnode.attrs.paginated || false;
        this.pagination.current = parseInt(vnode.attrs.param) || 1;
        this.pagination.next = this.pagination.current + 1;
        this.pagination.prev = this.pagination.current - 1;
        Api.fetch(this.section, this.pagination.current)
            .then(elements => this.elements = elements);
    },
    view(vnode) {
        return [
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
                m(Component.credits),
                this.pagination.show ?
                    m('nav', [
                        this.pagination.prev > 0 ?
                            m('a[data-button]', {
                                href: `/${this.section}` + (this.pagination.prev > 1 ? `/${this.pagination.prev}` : ''),
                                oncreate: m.route.link
                            }, this.pagination.prev) :
                            '',
                        m('span[data-button]', this.pagination.current),
                        this.elements.length === 30 ?
                            m('a[data-button]', {href: `/${this.section}/${this.pagination.next}`, oncreate: m.route.link}, this.pagination.next) :
                            ''
                    ]) : ''
            ])
        ];
    }
};

export default ListModule;
