import m from 'mithril';
import timeago from 'timeago.js';
import config from './config';

window.m = m;
window.timeago = timeago;
window.Log = config.Log;

m.route.prefix('');

/**
 * Function to register the service worker
 * @method Init
 * @param  {Function} [fn=()=>{}] Function to call when the service worker is fully activated
 */
let Init = (fn = () => {}) => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.addEventListener('message', event => {
            Log(event.data);
            if (event.data === 'ready') {
                fn();
            }
        });

        navigator.serviceWorker.register('/sw.js', {scope: './'})
            .then(() => navigator.serviceWorker.ready)
            .then(registration => registration.active.postMessage('init'))
            .catch(err => Log('ServiceWorker registration failed: ', err));
    }
};

export default Init;
