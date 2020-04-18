/* eslint-disable no-underscore-dangle */
const User = require('../models/users');

module.exports.getUser = (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(() => {
      res.status(404).json({ message: 'Запрашиваемый пользователь не найден' });
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(() => {
      res.status(404).json({ message: 'Запрашиваемые данные не найдены' });
    });
};


module.exports.postUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      res.status(500).send({ message: `Создать пользователь не удалось ${err.message}` });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { $set: { name, about } },
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
    .then((profile) => {
      res.status(200).send(profile);
    })
    .catch(() => {
      res.status(404).json({ message: 'Запрашиваемый пользователь не найден' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const id = req.user._id;

  User.findByIdAndUpdate(
    id,
    { $set: { avatar: req.body.avatar } },
  )
    .then((profile) => {
      res.status(200).send(profile);
    })
    .catch(() => {
      res.status(404).json({ message: 'Не удалось обновить аватар' });
    });
};
