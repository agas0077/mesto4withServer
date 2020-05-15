const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { Joi, celebrate, errors } = require('celebrate');

const bodyParser = require('body-parser');
const router = require('./routes/routes');
const { mongooseConfig, PORT, DATABASE_URL } = require('./config');
const { login, createUser } = require('./controllers/credentials');
const { auth } = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

mongoose.connect(DATABASE_URL, mongooseConfig);
mongoose.connection.on('connected', () => {
  console.log('Connected');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required().min(8),
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
      avatar: Joi.string().required(),
    }),
  }),
  createUser,
);

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);

  next();
});

app.use('/', router);
app.use('/', (req, res) => {
  res.status(404).json({ message: 'Запрашиваемый ресурс не найден' });
});

app.use(errorLogger);
app.use(errors());


app.use((err, req, res) => {
  res.status(err.statusCode || 500).send({ message: err.message });
});


app.listen(PORT);
