let Router = require('microrouter'),
    micro = require('micro');

/**
 * Export Router as global
 * @type {Router}
 */
global.Router = Router;
/**
 * Export micro as global
 * @type {Micro}
 */
global.micro = micro;
