const users = require('express').Router();
const allUsers = require('./users/allUsers');
const singleUser = require('./users/singleUser');


users.use('/:id', singleUser);
users.use('/', allUsers);

module.exports = users;
