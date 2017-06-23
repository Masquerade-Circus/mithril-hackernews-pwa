import firebase from 'firebase';
import Hackernews from 'firebase-hackernews';
import config from './config';

let hnservice = Hackernews.init(firebase);

let Service = {};

Service.fetch = (path) => hnservice.fetch(path);

Service.handler = section => (req, res) => Service.fetch(`/hackernews/${section}/${req.params.param || 1}`).then(JSON.stringify);

export default Service;
