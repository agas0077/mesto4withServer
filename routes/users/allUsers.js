/* eslint-disable consistent-return */
const readFilePromise = require('fs-readfile-promise');
const path = require('path');
const { jsonHandler, noSuchDirecrory } = require('../../helpers/helpers.js');

module.exports = (req, res) => {
  const buffer = readFilePromise(path.join('data', 'users.json'));

  buffer.then((result) => jsonHandler(result, res))
    .then((result) => {
      res.status(200).send(result);
    })
    .catch(noSuchDirecrory(res));
};
