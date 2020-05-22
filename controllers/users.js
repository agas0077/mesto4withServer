/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const User = require('../models/users');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getUser = (req, res, next) => {
  const { id } = req.params;


  User.findById(id)
    .orFail(() => new NotFoundError('Запрашиваемый пользователь не найден'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
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
      res.status(200).send(user);
    })
    .catch(next);
};

module.exports.getProfile = (req, res, next) => {
  const id = req.user._id;

  User.findById(id)
    .orFail(() => new NotFoundError('Запрашиваемый пользователь не найден'))
    .then((user) => {
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
      res.status(200).send(profile);
    })
    .catch(next);
};
