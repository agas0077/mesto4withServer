/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const readFilePromise = require('fs-readfile-promise');

function jsonHandler(potentialJson, res) {
  try {
    return JSON.parse(potentialJson.toString());
  } catch (err) {
    res.status(404).send({ message: 'В файле с данными содержится ошибка' });
  }
}

function checkForId(array, res, id) {
  return array.find((el) => {
    try {
      if (el._id === id) {
        return el;
      }
      throw new Error();
    } catch (err) {
      res.status(404).send({ message: 'Нет пользователя с таким id' });
    }
  });
}

module.exports = (req, res) => {
  const { id } = req.params;

  const buffer = readFilePromise('data/users.json');

  buffer.then((result) => jsonHandler(result, res))
    .then((result) => checkForId(result, res, id))
    .then((result) => {
      res.status(200).send(result);
    });
};
