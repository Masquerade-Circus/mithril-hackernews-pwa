let firebase = require('firebase'),
    Hackernews = require('firebase-hackernews'),
    config = require('./config');

let hnservice = Hackernews.init(firebase);

let Service = {};

Service.fetch = async (path) => {
    let p = path.replace('/hackernews/', '').split('/'),
        section = p.shift(),
        param = p.shift(),
        result = await hnservice.fetch(path);

    if (/(top|new|show|ask|job)/g.test(section)) {
        let length = await hnservice.fetch(`/hackernews/length/${section}`);
        let response = {
            items: result,
            total: Math.ceil(length / 30)
        };
        return response;
    }

    return result;
};

Service.handler = section => (req, res) => Service.fetch(`/hackernews/${section}/${req.params.param || 1}`);

module.exports = Service;
