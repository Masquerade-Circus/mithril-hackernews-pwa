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
let cacheVersion = "v1::";

/**
 * Log function, you can set to console.log for debugging process
 * @method Log
 */
let Log = () => {};

// Hackernews options
let hnOptions = { log: Log, watch: true};

export default {
    sections,
    filesToCahe,
    cacheName,
    cacheVersion,
    Log,
    hnOptions
};
