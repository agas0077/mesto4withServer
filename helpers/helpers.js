/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
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

function noSuchDirecrory(res) {
  res.status(404).json({ message: 'Запрашиваемый файл не найден' });
}

module.exports = {
  jsonHandler,
  checkForId,
  noSuchDirecrory,
};
