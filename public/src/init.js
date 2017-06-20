import m from 'mithril';
import timeago from 'timeago.js';

window.m = m;
window.timeago = timeago;
window.Log = () => {};

m.route.prefix('');

let Init = (fn = () => {}) => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js', {scope: './'})
            .then(registration => {
                let serviceWorker = registration.installing || registration.waiting || registration.active;
                Log('ServiceWorker registration successful with scope: ', registration.scope);

                if (serviceWorker !== undefined) {
                    if (serviceWorker.state === 'activated') {
                        return fn();
                    }

                    serviceWorker.addEventListener('statechange', e => {
                        if (e.target.state === 'activated') {
                            fn();
                        }
                    });
                }
            })
            .catch(err => Log('ServiceWorker registration failed: ', err));
    }
};

export default Init;
