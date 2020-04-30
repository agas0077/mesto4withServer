/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const Card = require('../models/cards');
const NotFoundError = require('../errors/NotFoundError');
const Forbidden = require('../errors/Forbidden');

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

  Card.findById({ _id: id })
    .orFail(() => new NotFoundError('Не удалось найти фотографию с таким id'))
    .then(() => {
      Card.findOneAndDelete({ $and: [{ _id: id }, { owner: req.user._id }] })
        .orFail(() => new Forbidden('Не удалось удалить фотографию. Недостаточно прав'))
        .then((card) => {
          res.status(200).send(card);
        })
        // Не совсем понимаю, почему ошибка не идет сразу во внешний catch
        // На сколько я понимал, выброшенное исключение должно идти до
        // близжайшего обработчика ошибки
        .catch((err) => {
          res.status(err.statusCode || 500).send({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(err.statusCode || 500).send({ message: err.message });
    });
};

module.exports.putLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError('Не удалось найти фотографию с таким id'))
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      res.status(err.statusCode || 500).send({ message: err.message });
    });
};

module.exports.deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new NotFoundError('Не удалось убрать лайк'))
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      res.status(err.statusCode || 500).send({ message: err.message });
    });
};
