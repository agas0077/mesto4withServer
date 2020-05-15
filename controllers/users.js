/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const User = require('../models/users');
const NotFoundError = require('../errors/notFoundError');

module.exports.getUser = (req, res, next) => {
  const { id } = req.params;


  User.findById(id)
    .orFail(() => new NotFoundError('Запрашиваемый пользователь не найден'))
    .then((user) => {
      if (!user) throw new Error();
      res.status(200).send(user);
    })
<<<<<<< HEAD
    .catch((err) => {
      res.status(err.statusCode || 500).json(err.message);
    });
=======
    .catch(next);
>>>>>>> master
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users) throw new Error('Запрашиваемые данные не найдены');
      res.status(200).send(users);
    })
    .catch(next);
};

<<<<<<< HEAD

module.exports.postUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      res.status(500).send({ message: `Создать пользователь не удалось ${err.message}` });
    });
};

module.exports.updateProfile = (req, res) => {
=======
module.exports.updateProfile = (req, res, next) => {
>>>>>>> master
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
<<<<<<< HEAD
    .catch((err) => {
      res.status(err.statusCode || 500).json(err.message);
    });
};

module.exports.updateAvatar = (req, res) => {
  const id = req.user._id;

=======
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
>>>>>>> master
  User.findByIdAndUpdate(
    id,
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
