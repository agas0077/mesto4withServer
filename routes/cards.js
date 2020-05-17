const cards = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const {
  getCards, postCard, deleteCard, putLike, deleteLike,
} = require('../controllers/cards');

cards.get('/', getCards);

// Пробовал вынести схемы валидации в отдельный файл, но мне не понравилось, тк стало сложнее читать
cards.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required()
        .regex(/(https?:\/\/)(www\.)?((\w+\.\w{2,})|(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))(:\d{2,5})?.*#?/i),
    }),
  }),
  postCard,
);

cards.delete(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().alphanum().length(24),
    }),
  }),
  deleteCard,
);

cards.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24),
    }),
  }),
  putLike,
);

cards.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24),
    }),
  }),
  deleteLike,
);

module.exports = cards;
