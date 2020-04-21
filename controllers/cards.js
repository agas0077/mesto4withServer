/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const Card = require('../models/cards');
const { cardResponseHandler } = require('../helpers');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(() => {
      res.status(500).send({ message: 'Ошибка получения карточек' });
    });
};

module.exports.postCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

module.exports.deleteCard = (req, res) => {
  const { id } = req.params;

  Card.findByIdAndDelete({ _id: id })
    .then((card) => {
      cardResponseHandler(card, res);
    })
    .catch(() => {
      res.status(500).send({ message: 'Не удалось удалить фотографию' });
    });
};

module.exports.putLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      cardResponseHandler(card, res);
    })
    .catch(() => {
      res.status(500).send({ message: 'Не удалось поставить лайк' });
    });
};

module.exports.deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      cardResponseHandler(card, res);
    })
    .catch(() => {
      res.status(500).send({ message: 'Не удалось убрать лайк' });
    });
};
