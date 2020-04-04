const routes = require('express').Router();
const cards = require('./cards/cards');
const users = require('./users/routes');

routes.use('/cards', cards);
routes.use('/users', users);

module.exports = routes;
