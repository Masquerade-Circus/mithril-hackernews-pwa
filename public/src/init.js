import m from 'mithril/mithril.min.js';
import timeago from 'timeago.js';
import config from './config';

window.m = m;
// m.route.prefix(''); // Uncoment this for push state navigation
window.timeago = timeago;
window.Log = config.Log;

let Init = (fn = () => {}) => {
    navigator.serviceWorker.register('/sw.js', {scope: '/'})
        .then(() => navigator.serviceWorker.ready)
        .then(registration => {
            window.Ready = true;
            setTimeout(() => {
                fn();
            }, 10);
        })
        .catch(err => console.error('ServiceWorker registration failed: ', err));
};

export default Init;
