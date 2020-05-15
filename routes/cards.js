const cards = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const {
  getCards, postCard, deleteCard, putLike, deleteLike,
} = require('../controllers/cards');

cards.get('/', getCards);

cards.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required(),
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
