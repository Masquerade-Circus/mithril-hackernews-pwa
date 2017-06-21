/**
 * Helper fuction to call when device or dom are ready
 * @method Ready
 * @param  {Function} func Function to call when the device or dom are ready
 */
let Ready = func => {
    let event = /https?:\/\//.test(window.document.URL) ? 'DOMContentLoaded' : 'deviceready';
    window.document.addEventListener(event, func, false);
};

/**
 * Helper function to change the title of the page
 * @method Title
 * @param  {String} title New title
 */
let Title = title => {
    window.document.title = title;
    let titleTag = window.document.getElementsByTagName('title')[0];
    titleTag.innerHtml = title;
};

export default {
    Ready,
    Title
};
