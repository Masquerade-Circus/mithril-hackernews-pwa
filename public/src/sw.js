// import firebase from 'firebase/app';
// import 'firebase/database';
// import Hackernews from 'firebase-hackernews/dist/firebase-hackernews.js';
import config from './config';

let Log = config.Log;

/**
 * Helper function to send a message to the client
 * @method sendMessage
 * @param  {Any}    message
 * @return {Promise}
 */
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

// let hackernews = Hackernews.init(firebase, config.hnOptions);

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
    Log('WORKER: fetch event in progress.', event.request.url);

    let url = new URL(event.request.url);

    // We only handle Get requests all others let them pass
    if (event.request.method !== 'GET') {
        return;
    }

    // // If the url starts with hackernews fetch from the hn webservice
    // if (url.pathname.startsWith('/hackernews/')) {
    //     Log((`hn:sw: start hooking of fetch, ${url}`));
    //     return event.respondWith(hackernews.fetch(url.pathname).then(data => {
    //         Log((`hn:sw: end hooking of fetch`));
    //         return new Response(JSON.stringify(data), {
    //             headers: {'Content-Type': 'application/json'}
    //         });
    //     }));
    // }

    Log('WORKER: fetchevent for ' + url);

    event.respondWith(
        caches.match(event.request).then(cached => {
            Log('WORKER: fetch event', cached ? '(cached)' : '(network)', event.request.url);

            let network = fetch(event.request)
                .then(fetchedFromNetwork(event), unableToResolve)
                .catch(error => {
                    console.log(error);
                    return caches.match('/');
                });

            return cached || network;
        })
    );
});

let createCacheBustedRequest = (url) => {
    let request = new Request(url, {cache: 'reload'});
    // See https://fetch.spec.whatwg.org/#concept-request-mode
    // This is not yet supported in Chrome as of M48, so we need to explicitly check to see
    // if the cache: 'reload' option had any effect.
    if ('cache' in request) {
        return request;
    }

    // If {cache: 'reload'} didn't have any effect, append a cache-busting URL parameter instead.
    let bustedUrl = new URL(url, self.location.href);
    bustedUrl.search += (bustedUrl.search ? '&' : '') + 'cachebust=' + Date.now();
    return new Request(bustedUrl);
};

self.addEventListener("install", event => {
    event.waitUntil(
        // We can't use cache.add() here, since we want OFFLINE_URL to be the cache key, but
        // the actual URL we end up requesting might include a cache-busting parameter.
        fetch(createCacheBustedRequest('/'))
            .then(response => {
                return caches.open(config.cacheVersion + config.cacheName)
                    .then(cache => {
                        return cache.put('/', response)
                            .then(() =>  cache.addAll(config.urlsToCache));
                    });
            })
            .catch(error => console.error('WORKER: Failed to cache', error))
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(
                keys.filter(key => !key.startsWith(config.cacheVersion)) // Filter by keys that don't start with the latest version prefix.
                    .map(key => caches.delete(key)) // Return a promise that's fulfilled when each outdated cache is deleted.
            ))
            .then(() => self.clients.claim())
    );
});

// When we receive an init event respond with ready
self.addEventListener('message', event => {
    if (event.data === 'init') {
        sendMessage('ready');
    }
});
