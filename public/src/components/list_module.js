import ListItem from './list_item_component';
import Credits from './credits_component';

let ListModule = {
    elements: [],
    pagination: {
        show: false,
        current : 1,
        next: 2,
        prev: 0
    },
    section: 'top',
    oncreate(vnode) {
        this.section = vnode.attrs.section.toLowerCase();
        this.pagination.show = vnode.attrs.paginated || false;
        this.pagination.current = parseInt(vnode.attrs.param) || 1;
        this.pagination.next = this.pagination.current + 1;
        this.pagination.prev = this.pagination.current - 1;

        m.request({
            method: "GET",
            url: `/hackernews/${this.section}/${this.pagination.current}`
        })
        .then(elements => this.elements = elements);
    },
    view(vnode) {
        return [
            m('article', [
                m('section[data-card="full-width"]', [
                    m('section', [
                        m('ul[data-list="three-line"]', this.elements.map(item => {
                            item.key = item.id;
                            return m(ListItem, item);
                        }))
                    ])
                ])
            ]),
            m('footer', [
                m(Credits),
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
