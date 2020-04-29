/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const User = require('../models/users');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getUser = (req, res) => {
  const { id } = req.params;


  User.findById(id)
    .orFail(() => new NotFoundError('Запрашиваемый пользователь не найден'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(err.statusCode || 500).json({ message: err.message });
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(() => {
      res.status(500).json({ message: 'Запрашиваемые данные не найдены' });
    });
};

module.exports.updateProfile = (req, res) => {
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
    .catch((err) => {
      res.status(500).send({ message: `Обновать пользователь не удалось ${err.message}` });
    });
};

module.exports.getProfile = (req, res) => {
  const id = req.user._id;

  User.findById(id)
    .orFail(() => new NotFoundError('Запрашиваемый пользователь не найден'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(err.statusCode || 500).json({ message: err.message });
    });
};

module.exports.updateAvatar = (req, res) => {
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
    .catch(() => {
      res.status(500).json({ message: 'Не удалось обновить аватар' });
    });
};
