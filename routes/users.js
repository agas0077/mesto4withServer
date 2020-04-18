const users = require('express').Router();

const { getUser, getUsers, postUser } = require('../controllers/users');

users.get('/', getUsers);
users.get('/:id', getUser);
users.post('/', postUser);

// users.use('/:id', (req, res) => {
//   const { id } = req.params;

//   const buffer = readFilePromise(path.join('data', 'users.json'));

//   buffer.then((result) => jsonHandler(result, res))
//     .then((result) => checkForId(result, res, id))
//     .then((result) => {
//       res.status(200).send(result);
//     })
//     .catch(() => {
//       res.status(404).json({ message: 'Запрашиваемый файл не найден' });
//     });
// });


// users.use('/', (req, res) => {
//   const buffer = readFilePromise(path.join('data', 'users.json'));

//   buffer.then((result) => jsonHandler(result, res))
//     .then((result) => {
//       res.status(200).send(result);
//     })
//     .catch(() => {
//       res.status(404).json({ message: 'Запрашиваемый файл не найден' });
//     });
// });

module.exports = users;
