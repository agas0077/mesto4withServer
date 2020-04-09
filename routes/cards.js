/* eslint-disable consistent-return */
const path = require('path');
const readFilePromise = require('fs-readfile-promise');
const { jsonHandler, noSuchDirecrory } = require('../helpers/helpers');

module.exports = (req, res) => {
  const buffer = readFilePromise(path.join('data', 'cards.json'));

  buffer.then((result) => jsonHandler(result, res))
    .then((result) => {
      res.status(200).send(result);
    })
    .catch(noSuchDirecrory(res));
};
