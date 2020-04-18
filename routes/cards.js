/* eslint-disable consistent-return */
// const path = require('path');
// const readFilePromise = require('fs-readfile-promise');
// const { jsonHandler } = require('../helpers/helpers');

// module.exports = (req, res) => {
//   const buffer = readFilePromise(path.join('data', 'cards.json'));

//   buffer.then((result) => jsonHandler(result, res))
//     .then((result) => {
//       res.status(200).send(result);
//     })
//     .catch(() => {
//       res.status(404).json({ message: 'Запрашиваемый файл не найден' });
//     });
// };

const cards = require('express').Router();
const { getCards, postCard, deleteCard } = require('../controllers/cards');

cards.get('/', getCards);
cards.post('/', postCard);
cards.delete('/:id', deleteCard);

module.exports = cards;
