const cards = require('express').Router();
const {
  getCards, postCard, deleteCard, putLike, deleteLike,
} = require('../controllers/cards');

cards.get('/', getCards);
cards.post('/', postCard);
cards.delete('/:id', deleteCard);
cards.put('/:cardId/likes', putLike);
cards.delete('/:cardId/likes', deleteLike);

module.exports = cards;
