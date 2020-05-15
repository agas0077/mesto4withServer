const users = require('express').Router();
const { Joi, celebrate } = require('celebrate');

const {
  getUser, getUsers, updateProfile, getProfile, updateAvatar,
} = require('../controllers/users');


users.get('/me', getProfile);

users.get('/', getUsers);

users.get(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().alphanum().length(24),
    }),
  }),
  getUser,
);

users.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required(),
    }),
  }),
  updateAvatar,
);

users.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateProfile,
);


module.exports = users;
