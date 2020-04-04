const users = require('../../data/users');

module.exports = (req, res) => {
  res.status(200).json(users);
};
