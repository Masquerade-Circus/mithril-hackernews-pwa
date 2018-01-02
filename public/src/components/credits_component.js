
let Credits = {
    view() {
        return m('h1', [
            'Built with ',
            m('a[target="_blank"][rel="noopener"][href="https://mithril.js.org/"][data-font="accent-100"]', 'Mithril'),
            ' and ',
            m('a[target="_blank"][rel="noopener"][href="https://masquerade-circus.github.io/pure-material-css/#about"][data-font="accent-100"]', 'Pure Material')
        ]);
    }
};

export default Credits;
