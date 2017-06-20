importScripts('https://www.gstatic.com/firebasejs/4.1.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.1.2/firebase-database.js');
// importScripts('/firebase-hackernews-sw.js');

import Hackernews from 'firebase-hackernews/dist/firebase-hackernews.js';
import config from './config';

let Log = () => {};

let opts = {
    log: Log,
    watch: true
};

let hackernews = Hackernews.init(firebase, opts);

Log((`hn:sw: start watching ${opts.watch}`));
hackernews.watch(opts.watch).then(() => {
    return self.clients.matchAll({
        type: 'window',
        includeUncontrolled: true
    }).then(clients => {
        Log((`hn:sw: end watching`));
        clients.forEach(client => {
            client.postMessage({
                target: 'firebase-hackernews-sw',
                type: 'ready'
            });
        });
    });
});

let version = "v2::";

let responseWithJSON = data => new Response(JSON.stringify(data), {
    headers: {'Content-Type': 'application/json'}
});

let fetchedFromNetwork = event => response => {
    Log('WORKER: fetch response from network.', event.request.url);
    if (!response || response.status !== 200 || response.type !== 'basic') {
        return;
    }

    let cacheCopy = response.clone();
    caches
      .open(version + config.cacheName)
      .then(cache => cache.put(event.request, cacheCopy))
      .then(() => Log('WORKER: fetch response stored in cache.', event.request.url));
    return response;
};

let unableToResolve = () => {
    Log('WORKER: fetch request failed in both cache and network.');
    return new Response('<h1>Service Unavailable</h1>', {
        status: 503,
        statusText: 'Service Unavailable',
        headers: new Headers({
            'Content-Type': 'text/html'
        })
    });
};


self.addEventListener("fetch", event => {
    Log('WORKER: fetch event in progress.');

    if (event.request.method !== 'GET') {
        return;
    }

    let url = new URL(event.request.url);

    event.respondWith(
      caches.match(event.request).then(cached => {
            if (url.pathname.startsWith('/hackernews/')) {
                Log((`hn:sw: start hooking of fetch, ${url}`));
                return hackernews.fetch(url.pathname).then(data => {
                    Log((`hn:sw: end hooking of fetch`));
                    return responseWithJSON(data);
                });
            }

            let networked = fetch(event.request)
                .then(fetchedFromNetwork(event), unableToResolve)
                .catch(unableToResolve);

            Log('WORKER: fetch event', cached ? '(cached)' : '(network)', event.request.url);
            return cached || networked;
        })
    );
});

self.addEventListener("install", function (event) {
    Log('WORKER: install event in progress.');
    event.waitUntil(
      caches.open(version + config.cacheName)
        .then(cache => cache.addAll(config.filesToCahe))
        .then(() => Log('WORKER: All files are cached'))
        .then(() => Log('WORKER: install completed'))
        .catch(error => console.error('WORKER: Failed to cache', error))
    );
});

self.addEventListener("activate", function (event) {
    Log('WORKER: activate event in progress.');

    event.waitUntil(
      caches.keys()
        .then(keys => Promise.all(
            keys.filter(key => !key.startsWith(version)) // Filter by keys that don't start with the latest version prefix.
                .map(key => caches.delete(key)) // Return a promise that's fulfilled when each outdated cache is deleted.
        ))
        .then(() => self.clients.claim())
        .then(() => Log('WORKER: activate completed.'))
    );
});
