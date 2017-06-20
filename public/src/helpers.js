let Ready = func => {
    let event = /https?:\/\//.test(window.document.URL) ? 'DOMContentLoaded' : 'deviceready';
    window.document.addEventListener(event, func, false);
};

let Title = title => {
    window.document.title = title;
    let titleTag = window.document.getElementsByTagName('title')[0];
    titleTag.innerHtml = title;
};

export default {
    Ready,
    Title
};
