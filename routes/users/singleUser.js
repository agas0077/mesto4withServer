/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable guard-for-in */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */
const users = require('../../data/users');


module.exports = (req, res) => {
  const { id } = req.params;

  for (user of users) {
    if (user._id === id) {
      res.status(200).json(user);
      break;
    } else {
      res.status(404).json({ message: 'Нет пользователя с таким id' });
    }
  }
};
