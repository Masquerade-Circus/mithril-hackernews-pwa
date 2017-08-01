/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var sections = [{ title: 'Top', section: 'top', paginated: true }, { title: 'New', section: 'new', paginated: true }, { title: 'Show', section: 'show', paginated: true }, { title: 'Ask', section: 'ask', paginated: true }, { title: 'Jobs', section: 'job', paginated: true }];

var urlsToCache = ['/hackernews/top/1'
// '/images/icons/favicon.ico',
// '/images/icons/favicon-32x32.png',
// '/images/icons/favicon-16x16.png'
];

var cacheName = 'hn-mithril';
var cacheVersion = "v1::";

/**
 * Log function, you can set to console.log for debugging process
 * @method Log
 */
var Log = function Log() {};

// Hackernews options
var hnOptions = { log: Log, watch: true };

exports.default = {
    sections: sections,
    urlsToCache: urlsToCache,
    cacheName: cacheName,
    cacheVersion: cacheVersion,
    Log: Log,
    hnOptions: hnOptions
};

/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(5);


/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _config = __webpack_require__(1);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Log = _config2.default.Log;

/**
 * Helper function to send a message to the client
 * @method sendMessage
 * @param  {Any}    message
 * @return {Promise}
 */
// import firebase from 'firebase/app';
// import 'firebase/database';
// import Hackernews from 'firebase-hackernews/dist/firebase-hackernews.js';
var sendMessage = function sendMessage(message) {
    return self.clients.matchAll({
        type: 'window',
        includeUncontrolled: true
    }).then(function (clients) {
        clients.forEach(function (client) {
            client.postMessage(message);
        });
    });
};

// let hackernews = Hackernews.init(firebase, config.hnOptions);

// Function to add the network response to the cache
var fetchedFromNetwork = function fetchedFromNetwork(event) {
    return function (response) {
        Log('WORKER: fetch response from network.', event.request.url);
        if (!response || response.status !== 200 || response.type !== 'basic') {
            return;
        }

        var cacheCopy = response.clone();
        caches.open(_config2.default.cacheVersion + _config2.default.cacheName).then(function (cache) {
            return cache.put(event.request, cacheCopy);
        }).then(function () {
            return Log('WORKER: fetch response stored in cache.', event.request.url);
        });
        return response;
    };
};

// If the network or the cache response fail, response with Service Unavailable
var unableToResolve = function unableToResolve() {
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
self.addEventListener("fetch", function (event) {
    Log('WORKER: fetch event in progress.', event.request.url);

    var url = new URL(event.request.url);

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

    event.respondWith(caches.match(event.request).then(function (cached) {
        Log('WORKER: fetch event', cached ? '(cached)' : '(network)', event.request.url);

        var network = fetch(event.request).then(fetchedFromNetwork(event), unableToResolve).catch(function (error) {
            console.log(error);
            return caches.match('/');
        });

        return cached || network;
    }));
});

var createCacheBustedRequest = function createCacheBustedRequest(url) {
    var request = new Request(url, { cache: 'reload' });
    // See https://fetch.spec.whatwg.org/#concept-request-mode
    // This is not yet supported in Chrome as of M48, so we need to explicitly check to see
    // if the cache: 'reload' option had any effect.
    if ('cache' in request) {
        return request;
    }

    // If {cache: 'reload'} didn't have any effect, append a cache-busting URL parameter instead.
    var bustedUrl = new URL(url, self.location.href);
    bustedUrl.search += (bustedUrl.search ? '&' : '') + 'cachebust=' + Date.now();
    return new Request(bustedUrl);
};

self.addEventListener("install", function (event) {
    event.waitUntil(
    // We can't use cache.add() here, since we want OFFLINE_URL to be the cache key, but
    // the actual URL we end up requesting might include a cache-busting parameter.
    caches.open(_config2.default.cacheVersion + _config2.default.cacheName).then(function (cache) {
        return cache.addAll(_config2.default.urlsToCache);
    }).catch(function (error) {
        return console.error('WORKER: Failed to cache', error);
    }));
});

self.addEventListener("activate", function (event) {
    event.waitUntil(caches.keys().then(function (keys) {
        return Promise.all(keys.filter(function (key) {
            return !key.startsWith(_config2.default.cacheVersion);
        } // Filter by keys that don't start with the latest version prefix.
        ).map(function (key) {
            return caches.delete(key);
        } // Return a promise that's fulfilled when each outdated cache is deleted.
        ));
    }).then(function () {
        return self.clients.claim();
    }));
});

// When we receive an init event respond with ready
self.addEventListener('message', function (event) {
    if (event.data === 'init') {
        sendMessage('ready');
    }
});

/***/ })

/******/ });
//# sourceMappingURL=sw.map