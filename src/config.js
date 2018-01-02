/**
 * Sections to add to the router
 * @type {Array}
 */
let sections = [
    {title: 'Top', section: 'top'},
    {title: 'New', section: 'new'},
    {title: 'Show', section: 'show'},
    {title: 'Ask', section: 'ask'},
    {title: 'Jobs', section: 'job'},
    {title: 'User', section: 'user'},
    {title: 'Comments', section: 'comments'}
];

let initialData = true;
let initialDataAll = false;
let initialHtml = true;

/**
 * Mime types to set to the served files
 * @type {Object}
 */
let mimeTypes = {
    aac: "audio/aac",
    abw: "application/x-abiword",
    arc: "application/octet-stream",
    avi: "video/x-msvideo",
    azw: "application/vnd.amazon.ebook",
    bin: "application/octet-stream",
    bz: "application/x-bzip",
    bz2: "application/x-bzip2",
    csh: "application/x-csh",
    css: "text/css",
    csv: "text/csv",
    doc: "application/msword",
    epub: "application/epub+zip",
    gif: "image/gif",
    htm: "text/html",
    html: "text/html; charset=utf-8",
    ico: "image/x-icon",
    ics: "text/calendar",
    jar: "application/java-archive",
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
    js: "application/javascript",
    json: "application/json",
    mid: "audio/midi",
    midi: "audio/midi",
    mpeg: "video/mpeg",
    mpkg: "application/vnd.apple.installer+xml",
    odp: "application/vnd.oasis.opendocument.presentation",
    ods: "application/vnd.oasis.opendocument.spreadsheet",
    odt: "application/vnd.oasis.opendocument.text",
    oga: "audio/ogg",
    ogv: "video/ogg",
    ogx: "application/ogg",
    pdf: "application/pdf",
    png: "image/png",
    ppt: "application/vnd.ms-powerpoint",
    rar: "application/x-rar-compressed",
    rtf: "application/rtf",
    sh: "application/x-sh",
    svg: "image/svg+xml",
    swf: "application/x-shockwave-flash",
    tar: "application/x-tar",
    tif: "image/tiff",
    tiff: "image/tiff",
    ttf: "font/ttf",
    vsd: "application/vnd.visio",
    wav: "audio/x-wav",
    weba: "audio/webm",
    webm: "video/webm",
    webp: "image/webp",
    woff: "font/woff",
    woff2: "font/woff2",
    xhtml: "application/xhtml+xml",
    xls: "application/vnd.ms-excel",
    xml: "application/xml",
    xul: "application/vnd.mozilla.xul+xml",
    zip: "application/zip",
    "3gp": "video/3gpp",
    "3g2": "video/3gpp2",
    "7z": "application/x-7z-compressed"
};

module.exports = {
    sections,
    mimeTypes,
    initialData,
    initialDataAll,
    initialHtml
};
