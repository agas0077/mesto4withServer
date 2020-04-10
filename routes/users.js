const users = require('express').Router();
const readFilePromise = require('fs-readfile-promise');
const path = require('path');
const { jsonHandler, checkForId } = require('../helpers/helpers');


users.use('/:id', (req, res) => {
  const { id } = req.params;

  const buffer = readFilePromise(path.join('data', 'users.json'));

  buffer.then((result) => jsonHandler(result, res))
    .then((result) => checkForId(result, res, id))
    .then((result) => {
      res.status(200).send(result);
    })
    .catch(() => {
      res.status(404).json({ message: 'Запрашиваемый файл не найден' });
    });
});


users.use('/', (req, res) => {
  const buffer = readFilePromise(path.join('data', 'users.json'));

  buffer.then((result) => jsonHandler(result, res))
    .then((result) => {
      res.status(200).send(result);
    })
    .catch(() => {
      res.status(404).json({ message: 'Запрашиваемый файл не найден' });
    });
});

module.exports = users;
