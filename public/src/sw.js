importScripts('https://www.gstatic.com/firebasejs/4.1.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.1.2/firebase-database.js');

import Hackernews from 'firebase-hackernews/dist/firebase-hackernews.js';
import config from './config';

let Log = config.Log;

let sendMessage = message => {
    return self.clients.matchAll({
        type: 'window',
        includeUncontrolled: true
    })
    .then(clients => {
        clients.forEach(client => {
            client.postMessage(message);
        });
    })
};

let hackernews = Hackernews
    .init(firebase, config.hnOptions);

// Response handler for hn
let responseWithJSON = data => new Response(JSON.stringify(data), {
    headers: {'Content-Type': 'application/json'}
});

// Function to add the network response to the cache
let fetchedFromNetwork = event => response => {
    Log('WORKER: fetch response from network.', event.request.url);
    if (!response || response.status !== 200 || response.type !== 'basic') {
        return;
    }

    let cacheCopy = response.clone();
    caches
      .open(config.cacheVersion + config.cacheName)
      .then(cache => cache.put(event.request, cacheCopy))
      .then(() => Log('WORKER: fetch response stored in cache.', event.request.url));
    return response;
};

// If the network or the cache response fail, response with Service Unavailable
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

// Fetch listener
self.addEventListener("fetch", event => {
    Log('WORKER: fetch event in progress.');

    // We only handle Get requests all others let them pass
    if (event.request.method !== 'GET') {
        return;
    }

    let url = new URL(event.request.url);

    // If the url starts with hackernews fetch from the hn webservice
    if (url.pathname.startsWith('/hackernews/')) {
        Log((`hn:sw: start hooking of fetch, ${url}`));
        return event.respondWith(hackernews.fetch(url.pathname).then(data => {
            Log((`hn:sw: end hooking of fetch`));
            return responseWithJSON(data);
        }));
    }

    event.respondWith(
        caches.match(event.request).then(cached => {
            // We fetch from the network to always set a clean cache response
            let networked = fetch(event.request)
                .then(fetchedFromNetwork(event), unableToResolve)
                .catch(unableToResolve);

            Log('WORKER: fetch event', cached ? '(cached)' : '(network)', event.request.url);

            // Try to send first the cached response to improve a fast response,
            // if no cache, send the network response
            return cached || networked;
        })
    );
});

self.addEventListener("install", event => {
    Log('WORKER: install event in progress.');
    event.waitUntil(
        caches.open(config.cacheVersion + config.cacheName)
            .then(cache => cache.addAll(config.filesToCahe))
            .then(() => sendMessage('WORKER: All files are cached and install completed'))
            .then(() => Log('WORKER: All files are cached and install completed'))
            .catch(error => console.error('WORKER: Failed to cache', error))
    );
});

self.addEventListener("activate", event => {
    Log('WORKER: activate event in progress.');
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(
                keys.filter(key => !key.startsWith(config.cacheVersion)) // Filter by keys that don't start with the latest version prefix.
                    .map(key => caches.delete(key)) // Return a promise that's fulfilled when each outdated cache is deleted.
            ))
            .then(() => self.clients.claim())
            .then(() => self.skipWaiting())
            .then(() => sendMessage('WORKER: activate completed.'))
            .then(() => Log('WORKER: activate completed.'))
    );
});

// When we receive an init event, init hackernews and respond with ready
self.addEventListener('message', event => {
    if (event.data === 'init') {
        hackernews.watch(config.hnOptions.watch)
            .then(() => sendMessage('ready'))
            .catch(err => Log('WORKER: Failed to initialize', err));
    }
});
