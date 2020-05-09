const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

module.exports.createUser = (req, res) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        email,
        password: hash,
        name,
        about,
        avatar,
      })
        .then((user) => User.findOne({ _id: user._id }))
        .then((user) => res.status(200).send(user))
        .catch((err) => {
          res.status(500).send({ message: `Создать пользователь не удалось ${err.message}` });
        });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const { NODE_ENV, JWT_SECRET } = process.env;

      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'SOME-SECRET-KEY',
        { expiresIn: '7d' },
      );

      res
        .cookie(
          'jwt',
          token,
          {
            maxAge: 1000 * 60 * 60 * 24 * 7, // Длинно, но мне так проще понять, что написано.
            httpOnly: true,
          },
        )
        .end();
    })
    .catch((err) => {
      res.status(err.statusCode || 500).json({ message: err.message });
    });
};
