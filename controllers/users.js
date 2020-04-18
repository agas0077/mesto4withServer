const User = require('../models/users');

module.exports.getUser = (req, res) => {
  const { id } = req.params;

  User.find({ id })
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
      res.status(500).send({ message: err.message });
    });
};
