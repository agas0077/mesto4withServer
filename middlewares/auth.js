/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');


module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;
  const { NODE_ENV, JWT_SECRET } = process.env;
  let payload;
  const UnauthorizedError = new Unauthorized('Нужно войти в систему');

  if (!token) {
    return res.status(UnauthorizedError.statusCode || 500)
      .send({ message: UnauthorizedError.message });
  }

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'SOME-SECRET-KEY');
  } catch (err) {
    res.status(UnauthorizedError.statusCode || 500).send({ message: UnauthorizedError.message });
  }


  req.user = payload;
  next();
};
