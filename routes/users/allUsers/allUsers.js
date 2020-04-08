/* eslint-disable consistent-return */
const readFilePromise = require('fs-readfile-promise');

function jsonHandler(potentialJson, res) {
  try {
    return JSON.parse(potentialJson.toString());
  } catch (err) {
    res.status(404).send({ message: 'В файле с данными содержится ошибка' });
  }
}

module.exports = (req, res) => {
  const buffer = readFilePromise('data/users.json');

  buffer.then((result) => jsonHandler(result, res))
    .then((result) => {
      res.status(200).send(result);
    });
};
