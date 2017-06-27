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
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var api = {
    fetch: function fetch(section) {
        var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

        return m.request({
            method: "GET",
            url: "/hackernews/" + section + "/" + param
        });
    },
    getItem: function getItem(id) {
        if ((typeof id === "undefined" ? "undefined" : _typeof(id)) === 'object') {
            return Promise.resolve(id);
        }

        return m.request({
            method: "GET",
            url: "/hackernews/item/" + id
        }).then(function (item) {
            return item[0] || item;
        });
    },
    getKids: function getKids() {
        var kids = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        if (i >= kids.length) {
            return;
        }

        var kid = kids[i];
        return api.getItem(kid).then(function (kid) {
            kids[i] = kid;
            i++;
            m.redraw();
            api.getKids(kids, i);
        });
    },
    catchBaseUrl: function catchBaseUrl() {
        var loc = window.location;
        m.request({
            method: "GET",
            url: loc.protocol + "//" + loc.hostname + (loc.port ? ':' + loc.port : ''),
            headers: {
                "Content-Type": "text/html",
                "Accept": "text/html"
            },
            deserialize: function deserialize(value) {
                return value;
            }
        });
    }
};

exports.default = api;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var sections = [{ title: 'Top', section: 'top', paginated: true }, { title: 'New', section: 'new', paginated: true }, { title: 'Show', section: 'show', paginated: true }, { title: 'Ask', section: 'ask', paginated: true }, { title: 'Jobs', section: 'job', paginated: true }];

var urlsToCache = ['/hackernews/top/1', '/js/app.js'
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _comments_component = __webpack_require__(6);

var _comments_component2 = _interopRequireDefault(_comments_component);

var _credits_component = __webpack_require__(7);

var _credits_component2 = _interopRequireDefault(_credits_component);

var _list_item_component = __webpack_require__(8);

var _list_item_component2 = _interopRequireDefault(_list_item_component);

var _logo_component = __webpack_require__(9);

var _logo_component2 = _interopRequireDefault(_logo_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    comments: _comments_component2.default,
    credits: _credits_component2.default,
    listItem: _list_item_component2.default,
    logo: _logo_component2.default
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _init = __webpack_require__(11);

var _init2 = _interopRequireDefault(_init);

var _helpers = __webpack_require__(10);

var _helpers2 = _interopRequireDefault(_helpers);

var _modules = __webpack_require__(13);

var _modules2 = _interopRequireDefault(_modules);

var _config = __webpack_require__(1);

var _config2 = _interopRequireDefault(_config);

var _api = __webpack_require__(0);

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// When service worker is fully activated
(0, _init2.default)(function () {
    // Request base url to always have the new content cached
    _api2.default.catchBaseUrl();
}

// Helper function to add list routes
);var routeFactory = function routeFactory(item) {
    return {
        render: function render() {
            _helpers2.default.Title('HN - ' + item.title);
            var param = m.route.param('param') || '';
            return m(_modules2.default.Layout, m(_modules2.default.List, Object.assign({ key: item.section + param, param: param }, item)));
        }
    };
};

// Set the routes for users and comments
var Routes = {
    '/user/:param': {
        render: function render() {
            _helpers2.default.Title('HN - User');
            var param = m.route.param('param') || '';
            return m(_modules2.default.Layout, m(_modules2.default.User, { key: param, param: param }));
        }
    },
    '/comments/:param': {
        render: function render() {
            _helpers2.default.Title('HN - Comments');
            var param = m.route.param('param') || '';
            return m(_modules2.default.Layout, m(_modules2.default.Comments, { key: param, param: param }));
        }
    }
};

// For each section add the main route and the route with params
_config2.default.sections.map(function (item) {
    Routes['/' + item.section] = routeFactory(item);
    Routes['/' + item.section + '/:param'] = routeFactory(item);
});

// Add the default route
Routes['/'] = routeFactory(_config2.default.sections[0]);

var bodyElement = window.document.body || window.document.getElementsByTagName('body')[0];
m.route(bodyElement, '/', Routes);

/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _api = __webpack_require__(0);

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CommentItem = {
    collapsed: true,
    toggle: function toggle(e, vnode) {
        vnode.state.collapsed = !vnode.state.collapsed;
        e.preventDefault();
    },
    view: function view(vnode) {
        var _this = this;

        if (vnode.attrs.id === undefined) {
            return m('.comment_item.fadeIn');
        }

        return m('.comment-item.fadeIn', [m('', [m('a', { href: '/user/' + vnode.attrs.by, oncreate: m.route.link }, vnode.attrs.by), ' ', timeago().format(vnode.attrs.time * 1000)]), m('', m.trust(vnode.attrs.text)), vnode.attrs.kids !== undefined && vnode.attrs.kids.length > 0 ? m('', [this.collapsed ? m('.comments-collapsed[data-background="primary 50"]', { key: 'comments-collapsed-' + vnode.attrs.id }, [m('a[href="#"]', { onclick: function onclick(e) {
                return _this.toggle(e, vnode);
            } }, '[+]'), ' ' + vnode.attrs.kids.length + ' replies collapsed']) : m('', [m('a.collapse-button[href="#"]', { onclick: function onclick(e) {
                return _this.toggle(e, vnode);
            }, key: 'collapsed-button-' + vnode.attrs.id }, '[-]'), m(CommentList, vnode.attrs)])]) : '']);
    }
};

var CommentList = {
    oninit: function oninit(vnode) {
        _api2.default.getKids(vnode.attrs.kids);
    },
    view: function view(vnode) {
        return vnode.attrs.kids.map(function (kid) {
            if (kid.deleted !== true) {
                return m(CommentItem, kid);
            }
        });
    }
};

exports.default = CommentList;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var Credits = {
    view: function view() {
        return m('h1', ['Built with ', m('a[target="_blank"][rel="noopener"][href="https://mithril.js.org/"][data-font="accent-100"]', 'Mithril'), m('br'), 'and ', m('a[target="_blank"][rel="noopener"][href="https://masquerade-circus.github.io/pure-material-css/#about"][data-font="accent-100"]', 'Pure Material')]);
    }
};

exports.default = Credits;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var listItem = {
    view: function view(vnode) {
        return m('li', m('span[tabindex="-1"]', [m('span.icon-counter[data-font="primary"]', vnode.attrs.score), m('span', [m('small', m('a[target="_blank"][rel="noopener"]', { href: vnode.attrs.url }, vnode.attrs.title)), m('br'), m('small', ['by ', m('a', { href: '/user/' + vnode.attrs.by, oncreate: m.route.link }, vnode.attrs.by), ' ', timeago().format(vnode.attrs.time * 1000), vnode.attrs.descendants !== undefined ? ' | ' : '', vnode.attrs.descendants !== undefined ? m('a', { href: '/comments/' + vnode.attrs.id, oncreate: m.route.link }, vnode.attrs.descendants + ' comments') : ''])])]));
    }
};

exports.default = listItem;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// Mithril logo in mithril.

exports.default = {
    view: function view() {
        return [m("svg[id='Capa_1'][version='1.1'][viewBox='0 0 38.044 38.044'][x='0px'][xml:space='preserve'][xmlns='http://www.w3.org/2000/svg'][xmlns:xlink='http://www.w3.org/1999/xlink'][y='0px']", { style: { "enable-background": "new 0 0 38.044 38.044" } }, [m("g", [m("g", [m("path[d='M31.716,13.5C31.699,6.47,25.974,0.755,18.94,0.755c-7.045,0-12.777,5.732-12.777,12.777\t\t\tc0,0.022,0.004,0.043,0.004,0.065C2.477,15.84,0,19.887,0,24.511c0,7.046,5.731,12.777,12.777,12.777\t\t\tc2.268,0,4.395-0.601,6.244-1.642c1.849,1.041,3.977,1.642,6.245,1.642c7.046,0,12.777-5.732,12.777-12.777\t\t\tC38.043,19.82,35.495,15.722,31.716,13.5z M19.021,32.961c-2.312-1.713-3.906-4.341-4.22-7.352c1.3,0.448,2.689,0.702,4.139,0.702\t\t\tc1.514,0,2.96-0.278,4.307-0.764C22.949,28.584,21.349,31.236,19.021,32.961z M8.517,14.898c1.303-0.579,2.743-0.909,4.26-0.909\t\t\tc1.475,0,2.879,0.307,4.154,0.858c-2.114,1.826-3.629,4.325-4.195,7.167C10.473,20.352,8.898,17.814,8.517,14.898z M18.94,24.055\t\t\tc-1.457,0-2.846-0.298-4.109-0.837c0.361-2.928,1.929-5.482,4.19-7.157c2.243,1.662,3.802,4.187,4.18,7.085\t\t\tC21.897,23.727,20.457,24.055,18.94,24.055z M21.111,14.846c1.275-0.55,2.679-0.858,4.154-0.858c1.457,0,2.846,0.298,4.11,0.837\t\t\tc-0.356,2.885-1.883,5.404-4.089,7.082C24.704,19.108,23.199,16.65,21.111,14.846z M18.94,3.01c5.432,0,9.915,4.137,10.466,9.425\t\t\tc-1.3-0.447-2.689-0.702-4.14-0.702c-2.268,0-4.396,0.601-6.245,1.642c-1.848-1.041-3.975-1.642-6.244-1.642\t\t\tc-1.514,0-2.96,0.278-4.307,0.763C8.993,7.179,13.488,3.01,18.94,3.01z M12.777,35.034c-5.803,0-10.523-4.72-10.523-10.523\t\t\tc0-3.418,1.645-6.451,4.177-8.375c0.744,3.581,2.999,6.607,6.059,8.408c0.011,3.847,1.735,7.293,4.442,9.631\t\t\tC15.656,34.727,14.253,35.034,12.777,35.034z M25.266,35.034c-1.475,0-2.879-0.307-4.154-0.858\t\t\tc2.715-2.345,4.444-5.804,4.444-9.664c0-0.022-0.004-0.044-0.004-0.065c3.007-1.829,5.209-4.852,5.918-8.416\t\t\tc2.613,1.917,4.319,4.999,4.319,8.48C35.788,30.313,31.068,35.034,25.266,35.034z']")])])])];
    }
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Helper fuction to call when device or dom are ready
 * @method Ready
 * @param  {Function} func Function to call when the device or dom are ready
 */
var Ready = function Ready(func) {
    var event = /https?:\/\//.test(window.document.URL) ? 'DOMContentLoaded' : 'deviceready';
    window.document.addEventListener(event, func, false);
};

/**
 * Helper function to change the title of the page
 * @method Title
 * @param  {String} title New title
 */
var Title = function Title(title) {
    window.document.title = title;
    var titleTag = window.document.getElementsByTagName('title')[0];
    titleTag.innerHtml = title;
};

exports.default = {
    Ready: Ready,
    Title: Title
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mithrilMin = __webpack_require__(17);

var _mithrilMin2 = _interopRequireDefault(_mithrilMin);

var _timeago = __webpack_require__(20);

var _timeago2 = _interopRequireDefault(_timeago);

var _config = __webpack_require__(1);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.m = _mithrilMin2.default;
_mithrilMin2.default.route.prefix('');
window.timeago = _timeago2.default;
window.Log = _config2.default.Log;

var Init = function Init() {
    var fn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

    navigator.serviceWorker.register('{{upDir}}/sw.js', { scope: '{{upDir}}/' }).then(function () {
        return navigator.serviceWorker.ready;
    }).then(function (registration) {
        window.Ready = true;
        setTimeout(function () {
            fn();
        }, 10);
    }).catch(function (err) {
        return console.error('ServiceWorker registration failed: ', err);
    });
};

exports.default = Init;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _components = __webpack_require__(2);

var _components2 = _interopRequireDefault(_components);

var _api = __webpack_require__(0);

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CommentsModule = {
    comments: {},
    item: {},
    oninit: function oninit(vnode) {
        var _this = this;

        _api2.default.getItem(vnode.attrs.param).then(function (item) {
            return _this.item = item;
        });
    },
    view: function view(vnode) {
        return [m('article', [m('a[data-fab="accent back"]', { onclick: function onclick(e) {
                return window.history.back();
            } }, '<'), m('section[data-card="full-width"]', [m('header', [m('h1', [this.item.id !== undefined ? m('a[target="_blank"][rel="noopener"][data-font="default"]', { href: this.item.url }, this.item.title) : ''])]), m('section', [this.item.id !== undefined ? m('span', [this.item.score, ' points | by ', m('a', { href: '/user/' + this.item.by, oncreate: m.route.link }, this.item.by), ' ', timeago().format(this.item.time * 1000)]) : ''])]), m('section[data-card="full-width"]', [m('header', [m('h1', [this.item.id !== undefined ? this.item.descendants + ' comments' : ''])]), m('section', this.item.id !== undefined ? m(_components2.default.comments, this.item) : '')])]), m('footer', m(_components2.default.credits))];
    }
};

exports.default = CommentsModule;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _layout_module = __webpack_require__(14);

var _layout_module2 = _interopRequireDefault(_layout_module);

var _list_module = __webpack_require__(15);

var _list_module2 = _interopRequireDefault(_list_module);

var _user_module = __webpack_require__(16);

var _user_module2 = _interopRequireDefault(_user_module);

var _comments_module = __webpack_require__(12);

var _comments_module2 = _interopRequireDefault(_comments_module);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    Layout: _layout_module2.default,
    List: _list_module2.default,
    User: _user_module2.default,
    Comments: _comments_module2.default
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = __webpack_require__(1);

var _config2 = _interopRequireDefault(_config);

var _components = __webpack_require__(2);

var _components2 = _interopRequireDefault(_components);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Layout = {
    nav: [],
    oncreate: function oncreate(vnode) {
        this.nav = _config2.default.sections;
    },
    view: function view(vnode) {
        return [m('header', [
        //m('img.icon-logo[src="./images/logo-48x48.png"][alt="Mithril"]'),
        m('.icon-logo', m(_components2.default.logo)), m('nav', _config2.default.sections.map(function (item) {
            return m('a[data-button]', { href: '/' + item.section, oncreate: m.route.link }, item.title);
        }))]), vnode.children];
    }
};

exports.default = Layout;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _components = __webpack_require__(2);

var _components2 = _interopRequireDefault(_components);

var _api = __webpack_require__(0);

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListModule = {
    elements: [],
    pagination: {
        show: false,
        current: 1,
        next: 2,
        prev: 0
    },
    section: 'top',
    oninit: function oninit(vnode) {
        var _this = this;

        this.section = vnode.attrs.section.toLowerCase();
        if (!window.Ready) {
            this.elements = initialData[this.section];
        }
        this.pagination.show = vnode.attrs.paginated || false;
        this.pagination.current = parseInt(vnode.attrs.param) || 1;
        this.pagination.next = this.pagination.current + 1;
        this.pagination.prev = this.pagination.current - 1;
        if (window.Ready) {
            _api2.default.fetch(this.section, this.pagination.current).then(function (elements) {
                return _this.elements = elements;
            });
        }
    },
    view: function view(vnode) {
        return [m('article', [m('section[data-card="full-width"]', [m('section', [m('ul[data-list="three-line"]', this.elements.map(function (item) {
            item.key = item.id;
            return m(_components2.default.listItem, item);
        }))])])]), m('footer', [m(_components2.default.credits), this.pagination.show ? m('nav', [this.pagination.prev > 0 ? m('a[data-button]', {
            href: '/' + this.section + (this.pagination.prev > 1 ? '/' + this.pagination.prev : ''),
            oncreate: m.route.link
        }, this.pagination.prev) : '', m('span[data-button]', this.pagination.current), this.elements.length === 30 ? m('a[data-button]', { href: '/' + this.section + '/' + this.pagination.next, oncreate: m.route.link }, this.pagination.next) : '']) : ''])];
    }
};

exports.default = ListModule;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _components = __webpack_require__(2);

var _components2 = _interopRequireDefault(_components);

var _api = __webpack_require__(0);

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserModule = {
    user: {},
    oninit: function oninit(vnode) {
        var _this = this;

        _api2.default.fetch('user', vnode.attrs.param).then(function (user) {
            return _this.user = user;
        });
    },
    view: function view(vnode) {
        return [m('article', [m('a[data-fab="accent back"]', { onclick: function onclick(e) {
                return window.history.back();
            } }, '<'), m('section[data-card="full-width"]', [m('header', [m('h1', 'User: ', this.user.id)]), m('section', [m('div', 'Karma: ', this.user.karma), m('div', 'Created: ', timeago().format(this.user.created * 1000)), m('hr'), m.trust(this.user.about || 'No info'), m('hr'), m('div', [m('a[target="_blank"][rel="noopener"]', { href: 'https://news.ycombinator.com/submitted?id=' + this.user.id }, 'submissions'), ' | ', m('a[target="_blank"][rel="noopener"]', { href: 'https://news.ycombinator.com/threads?id=' + this.user.id }, 'comments')])])])]), m('footer', m(_components2.default.credits))];
    }
};

exports.default = UserModule;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate, global) {(function(){function B(b,d,f,g,e,n){return{tag:b,key:d,attrs:f,children:g,text:e,dom:n,domSize:void 0,state:void 0,_state:void 0,events:void 0,instance:void 0,skip:!1}}function C(b){var d=arguments[1],f=2,g;if(null==b||"string"!==typeof b&&"function"!==typeof b&&"function"!==typeof b.view)throw Error("The selector must be either a string or a component.");if("string"===typeof b){var e;if(!(e=M[b])){g="div";for(var n=[],k={};e=P.exec(b);){var q=e[1],m=e[2];""===q&&""!==m?g=m:"#"===q?k.id=m:"."===q?
n.push(m):"["===e[3][0]&&((q=e[6])&&(q=q.replace(/\\(["'])/g,"$1").replace(/\\\\/g,"\\")),"class"===e[4]?n.push(q):k[e[4]]=q||!0)}0<n.length&&(k.className=n.join(" "));e=M[b]={tag:g,attrs:k}}}if(null==d)d={};else if("object"!==typeof d||null!=d.tag||Array.isArray(d))d={},f=1;if(arguments.length===f+1)g=arguments[f],Array.isArray(g)||(g=[g]);else for(g=[];f<arguments.length;)g.push(arguments[f++]);f=B.normalizeChildren(g);if("string"===typeof b){g=!1;var l,u,n=d.className||d["class"],a;for(a in e.attrs)N.call(e.attrs,
a)&&(d[a]=e.attrs[a]);void 0!==n&&(void 0!==d["class"]&&(d["class"]=void 0,d.className=n),null!=e.attrs.className&&(d.className=e.attrs.className+" "+n));for(a in d)if(N.call(d,a)&&"key"!==a){g=!0;break}Array.isArray(f)&&1===f.length&&null!=f[0]&&"#"===f[0].tag?u=f[0].children:l=f;return B(e.tag,d.key,g?d:void 0,l,u)}return B(b,d.key,d,f)}function Q(b){var d=0,f=null,g="function"===typeof requestAnimationFrame?requestAnimationFrame:setTimeout;return function(){var e=Date.now();0===d||16<=e-d?(d=e,
b()):null===f&&(f=g(function(){f=null;b();d=Date.now()},16-(e-d)))}}B.normalize=function(b){return Array.isArray(b)?B("[",void 0,void 0,B.normalizeChildren(b),void 0,void 0):null!=b&&"object"!==typeof b?B("#",void 0,void 0,!1===b?"":b,void 0,void 0):b};B.normalizeChildren=function(b){for(var d=0;d<b.length;d++)b[d]=B.normalize(b[d]);return b};var P=/(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g,M={},N={}.hasOwnProperty;C.trust=function(b){null==b&&(b="");return B("<",
void 0,void 0,b,void 0,void 0)};C.fragment=function(b,d){return B("[",b.key,b,B.normalizeChildren(d),void 0,void 0)};var x=function(b){function d(b,a){return function r(d){var k;try{if(!a||null==d||"object"!==typeof d&&"function"!==typeof d||"function"!==typeof(k=d.then))l(function(){a||0!==b.length||console.error("Possible unhandled promise rejection:",d);for(var f=0;f<b.length;f++)b[f](d);e.length=0;n.length=0;m.state=a;m.retry=function(){r(d)}});else{if(d===g)throw new TypeError("Promise can't be resolved w/ itself");
f(k.bind(d))}}catch(R){q(R)}}}function f(b){function a(a){return function(b){0<d++||a(b)}}var d=0,e=a(q);try{b(a(k),e)}catch(A){e(A)}}if(!(this instanceof x))throw Error("Promise must be called with `new`");if("function"!==typeof b)throw new TypeError("executor must be a function");var g=this,e=[],n=[],k=d(e,!0),q=d(n,!1),m=g._instance={resolvers:e,rejectors:n},l="function"===typeof setImmediate?setImmediate:setTimeout;f(b)};x.prototype.then=function(b,d){function f(b,d,f,k){d.push(function(a){if("function"!==
typeof b)f(a);else try{e(b(a))}catch(w){n&&n(w)}});"function"===typeof g.retry&&k===g.state&&g.retry()}var g=this._instance,e,n,k=new x(function(b,d){e=b;n=d});f(b,g.resolvers,e,!0);f(d,g.rejectors,n,!1);return k};x.prototype["catch"]=function(b){return this.then(null,b)};x.resolve=function(b){return b instanceof x?b:new x(function(d){d(b)})};x.reject=function(b){return new x(function(d,f){f(b)})};x.all=function(b){return new x(function(d,f){var g=b.length,e=0,n=[];if(0===b.length)d([]);else for(var k=
0;k<b.length;k++)(function(k){function m(b){e++;n[k]=b;e===g&&d(n)}null==b[k]||"object"!==typeof b[k]&&"function"!==typeof b[k]||"function"!==typeof b[k].then?m(b[k]):b[k].then(m,f)})(k)})};x.race=function(b){return new x(function(d,f){for(var g=0;g<b.length;g++)b[g].then(d,f)})};"undefined"!==typeof window?("undefined"===typeof window.Promise&&(window.Promise=x),x=window.Promise):"undefined"!==typeof global&&("undefined"===typeof global.Promise&&(global.Promise=x),x=global.Promise);var F=function(b){function d(b,
g){if(Array.isArray(g))for(var e=0;e<g.length;e++)d(b+"["+e+"]",g[e]);else if("[object Object]"===Object.prototype.toString.call(g))for(e in g)d(b+"["+e+"]",g[e]);else f.push(encodeURIComponent(b)+(null!=g&&""!==g?"="+encodeURIComponent(g):""))}if("[object Object]"!==Object.prototype.toString.call(b))return"";var f=[],g;for(g in b)d(g,b[g]);return f.join("&")},S=/^file:\/\//i,K=function(b,d){function f(){function a(){0===--b&&"function"===typeof u&&u()}var b=0;return function A(d){var e=d.then;d.then=
function(){b++;var f=e.apply(d,arguments);f.then(a,function(d){a();if(0===b)throw d;});return A(f)};return d}}function g(a,b){if("string"===typeof a){var d=a;a=b||{};null==a.url&&(a.url=d)}return a}function e(a,b){if(null==b)return a;for(var d=a.match(/:[^\/]+/gi)||[],e=0;e<d.length;e++){var f=d[e].slice(1);null!=b[f]&&(a=a.replace(d[e],b[f]))}return a}function n(a,b){var d=F(b);if(""!==d){var e=0>a.indexOf("?")?"?":"&";a+=e+d}return a}function k(a){try{return""!==a?JSON.parse(a):null}catch(w){throw Error(a);
}}function q(a){return a.responseText}function m(a,b){if("function"===typeof a)if(Array.isArray(b))for(var d=0;d<b.length;d++)b[d]=new a(b[d]);else return new a(b);return b}var l=0,u;return{request:function(a,l){var u=f();a=g(a,l);var w=new d(function(d,f){null==a.method&&(a.method="GET");a.method=a.method.toUpperCase();var g="GET"===a.method||"TRACE"===a.method?!1:"boolean"===typeof a.useBody?a.useBody:!0;"function"!==typeof a.serialize&&(a.serialize="undefined"!==typeof FormData&&a.data instanceof
FormData?function(h){return h}:JSON.stringify);"function"!==typeof a.deserialize&&(a.deserialize=k);"function"!==typeof a.extract&&(a.extract=q);a.url=e(a.url,a.data);g?a.data=a.serialize(a.data):a.url=n(a.url,a.data);var l=new b.XMLHttpRequest,u=!1,w=l.abort;l.abort=function(){u=!0;w.call(l)};l.open(a.method,a.url,"boolean"===typeof a.async?a.async:!0,"string"===typeof a.user?a.user:void 0,"string"===typeof a.password?a.password:void 0);a.serialize===JSON.stringify&&g&&l.setRequestHeader("Content-Type",
"application/json; charset=utf-8");a.deserialize===k&&l.setRequestHeader("Accept","application/json, text/*");a.withCredentials&&(l.withCredentials=a.withCredentials);for(var r in a.headers)({}).hasOwnProperty.call(a.headers,r)&&l.setRequestHeader(r,a.headers[r]);"function"===typeof a.config&&(l=a.config(l,a)||l);l.onreadystatechange=function(){if(!u&&4===l.readyState)try{var h=a.extract!==q?a.extract(l,a):a.deserialize(a.extract(l,a));if(200<=l.status&&300>l.status||304===l.status||S.test(a.url))d(m(a.type,
h));else{var c=Error(l.responseText),p;for(p in h)c[p]=h[p];f(c)}}catch(v){f(v)}};g&&null!=a.data?l.send(a.data):l.send()});return!0===a.background?w:u(w)},jsonp:function(a,k){var u=f();a=g(a,k);var q=new d(function(d,f){var g=a.callbackName||"_mithril_"+Math.round(1E16*Math.random())+"_"+l++,k=b.document.createElement("script");b[g]=function(e){k.parentNode.removeChild(k);d(m(a.type,e));delete b[g]};k.onerror=function(){k.parentNode.removeChild(k);f(Error("JSONP request failed"));delete b[g]};null==
a.data&&(a.data={});a.url=e(a.url,a.data);a.data[a.callbackKey||"callback"]=g;k.src=n(a.url,a.data);b.document.documentElement.appendChild(k)});return!0===a.background?q:u(q)},setCompletionCallback:function(a){u=a}}}(window,x),O=function(b){function d(h,c,p,a,b,d,e){for(;p<a;p++){var v=c[p];null!=v&&f(h,v,b,e,d)}}function f(h,c,p,a,b){var v=c.tag;if("string"===typeof v)switch(c.state={},null!=c.attrs&&C(c.attrs,c,p),v){case "#":return c.dom=D.createTextNode(c.children),l(h,c.dom,b),c.dom;case "<":return g(h,
c,b);case "[":var k=D.createDocumentFragment();null!=c.children&&(v=c.children,d(k,v,0,v.length,p,null,a));c.dom=k.firstChild;c.domSize=k.childNodes.length;l(h,k,b);return k;default:var m=c.tag;switch(c.tag){case "svg":a="http://www.w3.org/2000/svg";break;case "math":a="http://www.w3.org/1998/Math/MathML"}var t=(v=c.attrs)&&v.is,m=a?t?D.createElementNS(a,m,{is:t}):D.createElementNS(a,m):t?D.createElement(m,{is:t}):D.createElement(m);c.dom=m;if(null!=v)for(k in t=a,v)A(c,k,null,v[k],t);l(h,m,b);null!=
c.attrs&&null!=c.attrs.contenteditable?u(c):(null!=c.text&&(""!==c.text?m.textContent=c.text:c.children=[B("#",void 0,void 0,c.text,void 0,void 0)]),null!=c.children&&(h=c.children,d(m,h,0,h.length,p,null,a),h=c.attrs,"select"===c.tag&&null!=h&&("value"in h&&A(c,"value",null,h.value,void 0),"selectedIndex"in h&&A(c,"selectedIndex",null,h.selectedIndex,void 0))));return m}else return e(c,p),null!=c.instance?(p=f(h,c.instance,p,a,b),c.dom=c.instance.dom,c.domSize=null!=c.dom?c.instance.domSize:0,l(h,
p,b),c=p):(c.domSize=0,c=J),c}function g(h,c,p){var a={caption:"table",thead:"table",tbody:"table",tfoot:"table",tr:"tbody",th:"tr",td:"tr",colgroup:"table",col:"colgroup"}[(c.children.match(/^\s*?<(\w+)/im)||[])[1]]||"div",a=D.createElement(a);a.innerHTML=c.children;c.dom=a.firstChild;c.domSize=a.childNodes.length;c=D.createDocumentFragment();for(var b;b=a.firstChild;)c.appendChild(b);l(h,c,p);return c}function e(h,c){var a;if("function"===typeof h.tag.view){h.state=Object.create(h.tag);a=h.state.view;
if(null!=a.$$reentrantLock$$)return J;a.$$reentrantLock$$=!0}else{h.state=void 0;a=h.tag;if(null!=a.$$reentrantLock$$)return J;a.$$reentrantLock$$=!0;h.state=null!=h.tag.prototype&&"function"===typeof h.tag.prototype.view?new h.tag(h):h.tag(h)}h._state=h.state;null!=h.attrs&&C(h.attrs,h,c);C(h._state,h,c);h.instance=B.normalize(h._state.view.call(h.state,h));if(h.instance===h)throw Error("A view cannot return the vnode it received as argument");a.$$reentrantLock$$=null}function n(h,c,p,b,e,g,n){if(c!==
p&&(null!=c||null!=p))if(null==c)d(h,p,0,p.length,e,g,void 0);else if(null==p)a(c,0,c.length,p);else{if(c.length===p.length){for(var v=!1,t=0;t<p.length;t++)if(null!=p[t]&&null!=c[t]){v=null==p[t].key&&null==c[t].key;break}if(v){for(t=0;t<c.length;t++)c[t]!==p[t]&&(null==c[t]&&null!=p[t]?f(h,p[t],e,n,m(c,t+1,g)):null==p[t]?a(c,t,t+1,p):k(h,c[t],p[t],e,m(c,t+1,g),b,n));return}}if(!b)a:{if(null!=c.pool&&Math.abs(c.pool.length-p.length)<=Math.abs(c.length-p.length)&&(b=p[0]&&p[0].children&&p[0].children.length||
0,Math.abs((c.pool[0]&&c.pool[0].children&&c.pool[0].children.length||0)-b)<=Math.abs((c[0]&&c[0].children&&c[0].children.length||0)-b))){b=!0;break a}b=!1}if(b){var u=c.pool;c=c.concat(c.pool)}for(var t=v=0,w=c.length-1,y=p.length-1,G;w>=v&&y>=t;){var r=c[v],z=p[t];if(r!==z||b)if(null==r)v++;else if(null==z)t++;else if(r.key===z.key){var A=null!=u&&v>=c.length-u.length||null==u&&b;v++;t++;k(h,r,z,e,m(c,v,g),A,n);b&&r.tag===z.tag&&l(h,q(r),g)}else if(r=c[w],r!==z||b)if(null==r)w--;else if(null==z)t++;
else if(r.key===z.key)A=null!=u&&w>=c.length-u.length||null==u&&b,k(h,r,z,e,m(c,w+1,g),A,n),(b||t<y)&&l(h,q(r),m(c,v,g)),w--,t++;else break;else w--,t++;else v++,t++}for(;w>=v&&y>=t;){r=c[w];z=p[y];if(r!==z||b)if(null==r)w--;else{if(null!=z)if(r.key===z.key)A=null!=u&&w>=c.length-u.length||null==u&&b,k(h,r,z,e,m(c,w+1,g),A,n),b&&r.tag===z.tag&&l(h,q(r),g),null!=r.dom&&(g=r.dom),w--;else{if(!G){G=c;var r=w,A={},E;for(E=0;E<r;E++){var x=G[E];null!=x&&(x=x.key,null!=x&&(A[x]=E))}G=A}null!=z&&(r=G[z.key],
null!=r?(A=c[r],k(h,A,z,e,m(c,w+1,g),b,n),l(h,q(A),g),c[r].skip=!0,null!=A.dom&&(g=A.dom)):g=f(h,z,e,void 0,g))}y--}else w--,y--;if(y<t)break}d(h,p,t,y+1,e,g,n);a(c,v,w+1,p)}}function k(h,c,a,b,d,m,l){var p=c.tag;if(p===a.tag){a.state=c.state;a._state=c._state;a.events=c.events;var v;if(v=!m){var r,z;null!=a.attrs&&"function"===typeof a.attrs.onbeforeupdate&&(r=a.attrs.onbeforeupdate.call(a.state,a,c));"string"!==typeof a.tag&&"function"===typeof a._state.onbeforeupdate&&(z=a._state.onbeforeupdate.call(a.state,
a,c));void 0===r&&void 0===z||r||z?v=!1:(a.dom=c.dom,a.domSize=c.domSize,a.instance=c.instance,v=!0)}if(!v)if("string"===typeof p)switch(null!=a.attrs&&(m?(a.state={},C(a.attrs,a,b)):I(a.attrs,a,b)),p){case "#":c.children.toString()!==a.children.toString()&&(c.dom.nodeValue=a.children);a.dom=c.dom;break;case "<":c.children!==a.children?(q(c),g(h,a,d)):(a.dom=c.dom,a.domSize=c.domSize);break;case "[":n(h,c.children,a.children,m,b,d,l);c=0;b=a.children;a.dom=null;if(null!=b){for(m=0;m<b.length;m++){var y=
b[m];null!=y&&null!=y.dom&&(null==a.dom&&(a.dom=y.dom),c+=y.domSize||1)}1!==c&&(a.domSize=c)}break;default:h=l;d=a.dom=c.dom;switch(a.tag){case "svg":h="http://www.w3.org/2000/svg";break;case "math":h="http://www.w3.org/1998/Math/MathML"}"textarea"===a.tag&&(null==a.attrs&&(a.attrs={}),null!=a.text&&(a.attrs.value=a.text,a.text=void 0));l=c.attrs;p=a.attrs;v=h;if(null!=p)for(y in p)A(a,y,l&&l[y],p[y],v);if(null!=l)for(y in l)null!=p&&y in p||("className"===y&&(y="class"),"o"!==y[0]||"n"!==y[1]||E(y)?
"key"!==y&&a.dom.removeAttribute(y):x(a,y,void 0));null!=a.attrs&&null!=a.attrs.contenteditable?u(a):null!=c.text&&null!=a.text&&""!==a.text?c.text.toString()!==a.text.toString()&&(c.dom.firstChild.nodeValue=a.text):(null!=c.text&&(c.children=[B("#",void 0,void 0,c.text,void 0,c.dom.firstChild)]),null!=a.text&&(a.children=[B("#",void 0,void 0,a.text,void 0,void 0)]),n(d,c.children,a.children,m,b,null,h))}else{if(m)e(a,b);else{a.instance=B.normalize(a._state.view.call(a.state,a));if(a.instance===a)throw Error("A view cannot return the vnode it received as argument");
null!=a.attrs&&I(a.attrs,a,b);I(a._state,a,b)}null!=a.instance?(null==c.instance?f(h,a.instance,b,l,d):k(h,c.instance,a.instance,b,d,m,l),a.dom=a.instance.dom,a.domSize=a.instance.domSize):null!=c.instance?(w(c.instance,null),a.dom=void 0,a.domSize=0):(a.dom=c.dom,a.domSize=c.domSize)}}else w(c,null),f(h,a,b,l,d)}function q(a){var c=a.domSize;if(null!=c||null==a.dom){var b=D.createDocumentFragment();if(0<c){for(a=a.dom;--c;)b.appendChild(a.nextSibling);b.insertBefore(a,b.firstChild)}return b}return a.dom}
function m(a,c,b){for(;c<a.length;c++)if(null!=a[c]&&null!=a[c].dom)return a[c].dom;return b}function l(a,c,b){b&&b.parentNode?a.insertBefore(c,b):a.appendChild(c)}function u(a){var c=a.children;if(null!=c&&1===c.length&&"<"===c[0].tag)c=c[0].children,a.dom.innerHTML!==c&&(a.dom.innerHTML=c);else if(null!=a.text||null!=c&&0!==c.length)throw Error("Child node of a contenteditable must be trusted");}function a(a,c,b,d){for(;c<b;c++){var h=a[c];null!=h&&(h.skip?h.skip=!1:w(h,d))}}function w(a,c){function b(){if(++d===
h&&(r(a),a.dom)){var b=a.domSize||1;if(1<b)for(var e=a.dom;--b;){var g=e.nextSibling,f=g.parentNode;null!=f&&f.removeChild(g)}b=a.dom;e=b.parentNode;null!=e&&e.removeChild(b);if(b=null!=c&&null==a.domSize)b=a.attrs,b=!(null!=b&&(b.oncreate||b.onupdate||b.onbeforeremove||b.onremove));b&&"string"===typeof a.tag&&(c.pool?c.pool.push(a):c.pool=[a])}}var h=1,d=0;if(a.attrs&&"function"===typeof a.attrs.onbeforeremove){var e=a.attrs.onbeforeremove.call(a.state,a);null!=e&&"function"===typeof e.then&&(h++,
e.then(b,b))}"string"!==typeof a.tag&&"function"===typeof a._state.onbeforeremove&&(e=a._state.onbeforeremove.call(a.state,a),null!=e&&"function"===typeof e.then&&(h++,e.then(b,b)));b()}function r(a){a.attrs&&"function"===typeof a.attrs.onremove&&a.attrs.onremove.call(a.state,a);"string"!==typeof a.tag&&"function"===typeof a._state.onremove&&a._state.onremove.call(a.state,a);if(null!=a.instance)r(a.instance);else if(a=a.children,Array.isArray(a))for(var c=0;c<a.length;c++){var b=a[c];null!=b&&r(b)}}
function A(a,c,b,d,e){var h=a.dom;if("key"!==c&&"is"!==c&&(b!==d||"value"===c||"checked"===c||"selectedIndex"===c||"selected"===c&&a.dom===D.activeElement||"object"===typeof d)&&"undefined"!==typeof d&&!E(c)){var g=c.indexOf(":");if(-1<g&&"xlink"===c.substr(0,g))h.setAttributeNS("http://www.w3.org/1999/xlink",c.slice(g+1),d);else if("o"===c[0]&&"n"===c[1]&&"function"===typeof d)x(a,c,d);else if("style"===c)if(a=b,a===d&&(h.style.cssText="",a=null),null==d)h.style.cssText="";else if("string"===typeof d)h.style.cssText=
d;else{"string"===typeof a&&(h.style.cssText="");for(var f in d)h.style[f]=d[f];if(null!=a&&"string"!==typeof a)for(f in a)f in d||(h.style[f]="")}else c in h&&"href"!==c&&"list"!==c&&"form"!==c&&"width"!==c&&"height"!==c&&void 0===e&&!(a.attrs.is||-1<a.tag.indexOf("-"))?"input"===a.tag&&"value"===c&&a.dom.value==d&&a.dom===D.activeElement||"select"===a.tag&&"value"===c&&a.dom.value==d&&a.dom===D.activeElement||"option"===a.tag&&"value"===c&&a.dom.value==d||("input"===a.tag&&"type"===c?h.setAttribute(c,
d):h[c]=d):"boolean"===typeof d?d?h.setAttribute(c,""):h.removeAttribute(c):h.setAttribute("className"===c?"class":c,d)}}function E(a){return"oninit"===a||"oncreate"===a||"onupdate"===a||"onremove"===a||"onbeforeremove"===a||"onbeforeupdate"===a}function x(a,c,b){var d=a.dom,e="function"!==typeof F?b:function(a){var c=b.call(d,a);F.call(d,a);return c};if(c in d)d[c]="function"===typeof b?e:null;else{var h=c.slice(2);void 0===a.events&&(a.events={});a.events[c]!==e&&(null!=a.events[c]&&d.removeEventListener(h,
a.events[c],!1),"function"===typeof b&&(a.events[c]=e,d.addEventListener(h,a.events[c],!1)))}}function C(a,b,d){"function"===typeof a.oninit&&a.oninit.call(b.state,b);"function"===typeof a.oncreate&&d.push(a.oncreate.bind(b.state,b))}function I(a,b,d){"function"===typeof a.onupdate&&d.push(a.onupdate.bind(b.state,b))}var D=b.document,J=D.createDocumentFragment(),F;return{render:function(a,b){if(!a)throw Error("Ensure the DOM element being passed to m.route/m.mount/m.render is not undefined.");var c=
[],d=D.activeElement;null==a.vnodes&&(a.textContent="");Array.isArray(b)||(b=[b]);n(a,a.vnodes,B.normalizeChildren(b),!1,c,null,void 0);a.vnodes=b;for(var e=0;e<c.length;e++)c[e]();D.activeElement!==d&&d.focus()},setEventCallback:function(a){return F=a}}},H=function(b){function d(b){b=g.indexOf(b);-1<b&&g.splice(b,2)}function f(){for(var b=1;b<g.length;b+=2)g[b]()}b=O(b);b.setEventCallback(function(b){!1!==b.redraw&&f()});var g=[];return{subscribe:function(b,f){d(b);g.push(b,Q(f))},unsubscribe:d,
redraw:f,render:b.render}}(window);K.setCompletionCallback(H.redraw);C.mount=function(b){return function(d,f){if(null===f)b.render(d,[]),b.unsubscribe(d);else{if(null==f.view&&"function"!==typeof f)throw Error("m.mount(element, component) expects a component, not a vnode");b.subscribe(d,function(){b.render(d,B(f))});b.redraw()}}}(H);var T=x,L=function(b){if(""===b||null==b)return{};"?"===b.charAt(0)&&(b=b.slice(1));b=b.split("&");for(var d={},f={},g=0;g<b.length;g++){var e=b[g].split("="),n=decodeURIComponent(e[0]),
e=2===e.length?decodeURIComponent(e[1]):"";"true"===e?e=!0:"false"===e&&(e=!1);var k=n.split(/\]\[?|\[/),q=d;-1<n.indexOf("[")&&k.pop();for(var m=0;m<k.length;m++){var n=k[m],l=k[m+1],l=""==l||!isNaN(parseInt(l,10)),u=m===k.length-1;""===n&&(n=k.slice(0,m).join(),null==f[n]&&(f[n]=0),n=f[n]++);null==q[n]&&(q[n]=u?e:l?[]:{});q=q[n]}}return d},U=function(b){function d(d){var e=b.location[d].replace(/(?:%[a-f89][a-f0-9])+/gim,decodeURIComponent);"pathname"===d&&"/"!==e[0]&&(e="/"+e);return e}function f(b){return function(){null==
k&&(k=n(function(){k=null;b()}))}}function g(b,d,e){var a=b.indexOf("?"),g=b.indexOf("#"),f=-1<a?a:-1<g?g:b.length;if(-1<a){var a=L(b.slice(a+1,-1<g?g:b.length)),k;for(k in a)d[k]=a[k]}if(-1<g)for(k in d=L(b.slice(g+1)),d)e[k]=d[k];return b.slice(0,f)}var e="function"===typeof b.history.pushState,n="function"===typeof setImmediate?setImmediate:setTimeout,k,q={prefix:"#!",getPath:function(){switch(q.prefix.charAt(0)){case "#":return d("hash").slice(q.prefix.length);case "?":return d("search").slice(q.prefix.length)+
d("hash");default:return d("pathname").slice(q.prefix.length)+d("search")+d("hash")}},setPath:function(d,f,k){var a={},l={};d=g(d,a,l);if(null!=f){for(var m in f)a[m]=f[m];d=d.replace(/:([^\/]+)/g,function(b,d){delete a[d];return f[d]})}(m=F(a))&&(d+="?"+m);(l=F(l))&&(d+="#"+l);e?(l=k?k.state:null,m=k?k.title:null,b.onpopstate(),k&&k.replace?b.history.replaceState(l,m,q.prefix+d):b.history.pushState(l,m,q.prefix+d)):b.location.href=q.prefix+d},defineRoutes:function(d,k,n){function a(){var a=q.getPath(),
e={},f=g(a,e,e),l=b.history.state;if(null!=l)for(var m in l)e[m]=l[m];for(var u in d)if(l=new RegExp("^"+u.replace(/:[^\/]+?\.{3}/g,"(.*?)").replace(/:[^\/]+/g,"([^\\/]+)")+"/?$"),l.test(f)){f.replace(l,function(){for(var b=u.match(/:[^\/]+/g)||[],g=[].slice.call(arguments,1,-2),f=0;f<b.length;f++)e[b[f].replace(/:|\./g,"")]=decodeURIComponent(g[f]);k(d[u],e,a,u)});return}n(a,e)}e?b.onpopstate=f(a):"#"===q.prefix.charAt(0)&&(b.onhashchange=a);a()}};return q};C.route=function(b,d){var f=U(b),g=function(b){return b},
e,n,k,q,m,l=function(b,a,l){if(null==b)throw Error("Ensure the DOM element that was passed to `m.route` is not undefined");var u=function(){null!=e&&d.render(b,e(B(n,k.key,k)))},w=function(b){if(b!==a)f.setPath(a,null,{replace:!0});else throw Error("Could not resolve default route "+a);};f.defineRoutes(l,function(a,b,d){var f=m=function(a,l){f===m&&(n=null==l||"function"!==typeof l.view&&"function"!==typeof l?"div":l,k=b,q=d,m=null,e=(a.render||g).bind(a),u())};a.view||"function"===typeof a?f({},
a):a.onmatch?T.resolve(a.onmatch(b,d)).then(function(b){f(a,b)},w):f(a,"div")},w);d.subscribe(b,u)};l.set=function(b,a,d){null!=m&&(d={replace:!0});m=null;f.setPath(b,a,d)};l.get=function(){return q};l.prefix=function(b){f.prefix=b};l.link=function(b){b.dom.setAttribute("href",f.prefix+b.attrs.href);b.dom.onclick=function(a){a.ctrlKey||a.metaKey||a.shiftKey||2===a.which||(a.preventDefault(),a.redraw=!1,a=this.getAttribute("href"),0===a.indexOf(f.prefix)&&(a=a.slice(f.prefix.length)),l.set(a,void 0,
void 0))}};l.param=function(b){return"undefined"!==typeof k&&"undefined"!==typeof b?k[b]:k};return l}(window,H);C.withAttr=function(b,d,f){return function(g){d.call(f||this,b in g.currentTarget?g.currentTarget[b]:g.currentTarget.getAttribute(b))}};var V=O(window);C.render=V.render;C.redraw=H.redraw;C.request=K.request;C.jsonp=K.jsonp;C.parseQueryString=L;C.buildQueryString=F;C.version="1.1.1";C.vnode=B; true?module.exports=C:window.m=C})();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(21).setImmediate, __webpack_require__(3)))

/***/ }),
/* 18 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3), __webpack_require__(18)))

/***/ }),
/* 20 */
/***/ (function(module, exports) {

!function(t,e){"object"==typeof module&&module.exports?(module.exports=e(),module.exports.default=module.exports):t.timeago=e()}("undefined"!=typeof window?window:this,function(){function t(t){return t instanceof Date?t:isNaN(t)?/^\d+$/.test(t)?new Date(e(t)):(t=(t||"").trim().replace(/\.\d+/,"").replace(/-/,"/").replace(/-/,"/").replace(/(\d)T(\d)/,"$1 $2").replace(/Z/," UTC").replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2"),new Date(t)):new Date(e(t))}function e(t){return parseInt(t)}function n(t,n,r){n=p[n]?n:p[r]?r:"en";for(var o=0,i=t<0?1:0,a=t=Math.abs(t);t>=h[o]&&o<m;o++)t/=h[o];return t=e(t),o*=2,t>(0===o?9:1)&&(o+=1),p[n](t,o,a)[i].replace("%s",t)}function r(e,n){return((n=n?t(n):new Date)-t(e))/1e3}function o(t){for(var e=1,n=0,r=Math.abs(t);t>=h[n]&&n<m;n++)t/=h[n],e*=h[n];return r%=e,r=r?e-r:e,Math.ceil(r)}function i(t){return t.dataset.timeago?t.dataset.timeago:a(t,w)}function a(t,e){return t.getAttribute?t.getAttribute(e):t.attr?t.attr(e):void 0}function u(t,e){return t.setAttribute?t.setAttribute(_,e):t.attr?t.attr(_,e):void 0}function c(t){return a(t,_)}function d(t,e){this.nowDate=t,this.defaultLocale=e||"en"}function f(t,e){return new d(t,e)}var s="second_minute_hour_day_week_month_year".split("_"),l="秒_分钟_小时_天_周_月_年".split("_"),p={en:function(t,e){if(0===e)return["just now","right now"];var n=s[parseInt(e/2)];return t>1&&(n+="s"),[t+" "+n+" ago","in "+t+" "+n]},zh_CN:function(t,e){if(0===e)return["刚刚","片刻后"];var n=l[parseInt(e/2)];return[t+n+"前",t+n+"后"]}},h=[60,60,24,7,365/7/12,12],m=6,w="datetime",_="data-tid",v={};return d.prototype.doRender=function(t,e,i){var a,c=r(e,this.nowDate),d=this;t.innerHTML=n(c,i,this.defaultLocale),v[a=setTimeout(function(){d.doRender(t,e,i),delete v[a]},Math.min(1e3*o(c),2147483647))]=0,u(t,a)},d.prototype.format=function(t,e){return n(r(t,this.nowDate),e,this.defaultLocale)},d.prototype.render=function(t,e){void 0===t.length&&(t=[t]);for(var n=0,r=t.length;n<r;n++)this.doRender(t[n],i(t[n]),e)},d.prototype.setLocale=function(t){this.defaultLocale=t},f.register=function(t,e){p[t]=e},f.cancel=function(t){var e;if(t)(e=c(t))&&(clearTimeout(e),delete v[e]);else{for(e in v)clearTimeout(e);v={}}},f});

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(19);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ })
/******/ ]);
//# sourceMappingURL=app.map