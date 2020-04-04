const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./routes/routes');

const { PORT = 3000 } = process.env;
const app = express();

// Не знаю зачем мне сейчас здесь парсер, но пусть будет
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public', 'dist')));

app.use('/', router);
app.use('/', (req, res) => {
  res.status(404).json({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT);
