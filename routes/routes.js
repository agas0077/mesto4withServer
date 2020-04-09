const routes = require('express').Router();
const cards = require('./cards.js');
const users = require('./users.js');
// const { noSuchDirecrory } = require('../helpers/helpers.js');

routes.use('/cards', cards);
routes.use('/users', users);
// noSuchDirecrory(routes);

module.exports = routes;
