let Helper = require('./helpers'),
    config = require('./config'),
    HNService = require('./hackernews_service'),
    timeago = require('timeago.js');

/**
 * Get the default options with the js, css and links view loaded
 * when the server starts
 * @method indexDefaultOptions
 * @return {Object}
 */
let indexDefaultOptions = {};

Promise.resolve()
    .then(() => Helper.loadView('./public/js/app.js', {}).then(js => indexDefaultOptions.js = js))
    .then(() => Helper.loadView('./public/css/app.css', {}).then(css => indexDefaultOptions.css = css))
    .then(() => Helper.loadView('./src/views/links.html', {}).then(iconLinks => indexDefaultOptions.iconLinks = iconLinks));

// Generate the index template
let indexTemplate = () => {};
Helper.loadView('./src/views/index.html').then(template => indexTemplate = template);
let listItemTemplate = () => {};
Helper.loadView('./src/views/list_item.html').then(template => listItemTemplate = template);

let getSection = (section, upDir = '.') => {
    return async (req, res) => {
        let initialData = {
            top: {items: [], total: 1},
            new: {items: [], total: 1},
            show: {items: [], total: 1},
            ask: {items: [], total: 1},
            job: {items: [], total: 1}
        };

        if (config.initialData) {
            if (config.initialDataAll) {
                initialData.top = await HNService.fetch(`/hackernews/top/1`);
                initialData.new = await HNService.fetch(`/hackernews/new/1`);
                initialData.show = await HNService.fetch(`/hackernews/show/1`);
                initialData.ask = await HNService.fetch(`/hackernews/ask/1`);
                initialData.job = await HNService.fetch(`/hackernews/job/1`);
            }

            if (!config.initialDataAll) {
                initialData[section] = await HNService.fetch(`/hackernews/${section}/1`);
            }
        }

        let options = {upDir: upDir, list: '', initialData: JSON.stringify(initialData), title: 'HN - Mithril'};

        if (config.initialHtml) {
            let html = '',
                i = 0,
                length = initialData[section].items.length;

            for (; i < length; i++) {
                initialData[section].items[i].time = timeago().format(initialData[section].items[i].time * 1000);
                html += listItemTemplate(initialData[section].items[i]);
            }

            options.list = html;
        }

        return indexTemplate(Object.assign({}, indexDefaultOptions, options));
    }
};

module.exports = getSection;
