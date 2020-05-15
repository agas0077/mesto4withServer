/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const User = require('../models/users');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getUser = (req, res, next) => {
  const { id } = req.params;


  User.findById(id)
    .orFail(() => new NotFoundError('Запрашиваемый пользователь не найден'))
    .then((user) => {
      if (!user) throw new Error();
      res.status(200).send(user);
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users) throw new Error('Запрашиваемые данные не найдены');
      res.status(200).send(users);
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { $set: { name, about } },
    {
      runValidators: true,
      new: true,
    },
  )
    .then((user) => {
      if (!user) throw new NotFoundError();
      res.status(200).send(user);
    })
    .catch(next);
};

module.exports.getProfile = (req, res, next) => {
  const id = req.user._id;

  User.findById(id)
    .orFail(() => new NotFoundError('Запрашиваемый пользователь не найден'))
    .then((user) => {
      if (!user) throw new NotFoundError();
      res.status(200).send(user);
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { avatar: req.body.avatar } },
    {
      runValidators: true,
      new: true,
    },
  )
    .then((profile) => {
      if (!profile) throw new Error('Не удалось обновить аватар');
      res.status(200).send(profile);
    })
    .catch(next);
};
