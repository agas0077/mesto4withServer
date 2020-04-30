/* eslint-disable func-names */
const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');
const Unauthorized = require('../errors/Unauthorized');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
    },
    unique: true,
  },
  password: {
    type: String,
    select: false,
    required: true,
    minlength: 8,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
    },
    required: true,
  },
});

// Знаю про index: {unique: true}, но там ошибка приходит некрасивая
userSchema.plugin(uniqueValidator);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .orFail(() => new Unauthorized('Неверно указана почта или пароль'))
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) return new Unauthorized('Неверно указана почта или пароль');
        return user;
      }));
};

module.exports = mongoose.model('user', userSchema);
