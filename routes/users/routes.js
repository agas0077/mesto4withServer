const users = require('express').Router();
const allUsers = require('./allUsers');
const singleUser = require('./singleUser');

users.use('/:id', singleUser);
users.use('/', allUsers);


module.exports = users;
