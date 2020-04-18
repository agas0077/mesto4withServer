const users = require('express').Router();

const {
  getUser, getUsers, postUser, updateProfile, getProfile, updateAvatar,
} = require('../controllers/users');


users.get('/me', getProfile);
users.get('/', getUsers);
users.get('/:id', getUser);
users.post('/', postUser);
users.patch('/me/avatar', updateAvatar);
users.patch('/me', updateProfile);


module.exports = users;
