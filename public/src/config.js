let sections = [
    {title: 'Top', section: 'top', paginated: true},
    {title: 'New', section: 'new', paginated: true},
    {title: 'Show', section: 'show', paginated: true},
    {title: 'Ask', section: 'ask', paginated: true},
    {title: 'Jobs', section: 'job', paginated: true}
];

let urlsToCache = [
    '/hackernews/top/1',
    // '/images/logo-48x48.png',
    // '/images/icons/favicon.ico',
    // '/images/icons/favicon-32x32.png',
    // '/images/icons/favicon-16x16.png'
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
    urlsToCache,
    cacheName,
    cacheVersion,
    Log,
    hnOptions
};
