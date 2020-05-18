const users = require('express').Router();
const { Joi, celebrate } = require('celebrate');

const {
  getUser, getUsers, updateProfile, getProfile, updateAvatar,
} = require('../controllers/users');


users.get('/me', getProfile);

users.get('/', getUsers);

// Пробовал вынести схемы валидации в отдельный файл, но мне не понравилось, тк стало сложнее читать

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
      avatar: Joi.string().required().uri(),
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
