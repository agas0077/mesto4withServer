/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');


module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;
  const { NODE_ENV, JWT_SECRET } = process.env;
  let payload;

  if (!token) throw new Unauthorized('Нужно войти в систему');

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'SOME-SECRET-KEY');
  } catch (err) {
    next(err);
  }


  req.user = payload;
  next();
};
