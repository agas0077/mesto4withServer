const cards = require('../../data/cards');

module.exports = (req, res) => {
  res.status(200).json(cards);
};
