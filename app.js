require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const router = require('./routes/routes');
const { mongooseConfig, PORT, DATABASE_URL } = require('./config');
const { login, createUser } = require('./controllers/credentials');
const { auth } = require('./middlewares/auth');

const app = express();

app.use(helmet());

mongoose.connect(DATABASE_URL, mongooseConfig);

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth);

app.use('/', router);
app.use('/', (req, res) => {
  res.status(404).json({ message: 'Запрашиваемый ресурс не найден' });
});


app.listen(PORT);
