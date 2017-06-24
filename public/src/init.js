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
        navigator.serviceWorker.register('/sw.js', {scope: './'})
            .then(() => navigator.serviceWorker.ready)
            .then(registration => {
                Log('ServiceWorker registrated and activated');
            })
            .catch(err => Log('ServiceWorker registration failed: ', err));
    }
};

export default Init;
