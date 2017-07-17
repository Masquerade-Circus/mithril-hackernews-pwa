let firebase = require('firebase'),
    Hackernews = require('firebase-hackernews'),
    config = require('./config');

let hnservice = Hackernews.init(firebase);

let Service = {};

Service.fetch = (path) => hnservice.fetch(path);

Service.handler = section => (req, res) => Service.fetch(`/hackernews/${section}/${req.params.param || 1}`).then(JSON.stringify);

module.exports = Service;
