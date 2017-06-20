let sections = [
    {title: 'Top', section: 'top', paginated: true},
    {title: 'New', section: 'new', paginated: true},
    {title: 'Show', section: 'show', paginated: true},
    {title: 'Ask', section: 'ask', paginated: true},
    {title: 'Jobs', section: 'job', paginated: true}
];

let filesToCahe = [
    'js/app.js',
    'images/logo.png',
    'icons/manifest.json',
    'icons/manifest.webapp',
    'icons/yandex-browser-manifest.json',
    'icons/favicon.ico'
];

let cacheName = 'hn-mithril';

export default {
    sections,
    cacheName,
    filesToCahe
};
