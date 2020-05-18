/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const Card = require('../models/cards');
const NotFoundError = require('../errors/NotFoundError');
const Forbidden = require('../errors/Forbidden');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      if (!cards) throw new Error('Ошибка получения карточек');
      res.status(200).send(cards);
    })
    .catch(next);
};

module.exports.postCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      if (!card) throw new Error();
      res.status(200).send(card);
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { id } = req.params;

  Card.findById({ _id: id })
    .orFail(() => new NotFoundError('Не удалось найти фотографию с таким id'))
    .then(() => {
      Card.findOneAndDelete({ $and: [{ _id: id }, { owner: req.user._id }] })
        .orFail(() => new Forbidden('Не удалось удалить фотографию. Недостаточно прав'))
        .then((card) => {
          if (!card) throw new Error();
          res.status(200).send(card);
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.putLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError('Не удалось найти фотографию с таким id'))
    .then((card) => {
      if (!card) throw new Error();
      res.status(200).send(card);
    })
    .catch(next);
};

module.exports.deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError('Не удалось убрать лайк'))
    .then((card) => {
      if (!card) throw new Error();
      res.status(200).send(card);
    })
    .catch(next);
};
