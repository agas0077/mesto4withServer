const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const router = require('./routes/routes');
const { mongooseConfig, PORT, DATABASE_URL } = require('./config');

const app = express();

mongoose.connect(DATABASE_URL, mongooseConfig);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public', 'dist')));

app.use((req, res, next) => {
  req.user = {
    _id: '5e9b1c8022bb5a322ccb83ea',
  };

  next();
});

app.use('/', router);
app.use('/', (req, res) => {
  res.status(404).json({ message: 'Запрашиваемый ресурс не найден' });
});


app.listen(PORT);
