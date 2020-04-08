const users = require('express').Router();
const allUsers = require('./allUsers/allUsers');
const singleUser = require('./singleUser/singleUser');


users.use('/:id', singleUser);
users.use('/', allUsers);

module.exports = users;
