/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const readFilePromise = require('fs-readfile-promise');
const path = require('path');
const { jsonHandler, checkForId, noSuchDirecrory } = require('../../helpers/helpers');


module.exports = (req, res) => {
  const { id } = req.params;

  const buffer = readFilePromise(path.join('data', 'users.json'));

  buffer.then((result) => jsonHandler(result, res))
    .then((result) => checkForId(result, res, id))
    .then((result) => {
      res.status(200).send(result);
    })
    .catch(noSuchDirecrory(res));
};
