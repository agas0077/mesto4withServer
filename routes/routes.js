const routes = require('express').Router();
const cards = require('./cards.js');
const users = require('./users.js');

routes.use('/cards', cards);
routes.use('/users', users);

module.exports = routes;
