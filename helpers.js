module.exports.cardResponseHandler = (card, res) => {
  if (!card) return res.status(404).send({ message: 'Не удалось найти фотографию с таким id' });
  return res.status(200).send(card);
};

module.exports.userResponseHandler = (user, res) => {
  if (!user) return res.status(404).json({ message: 'Запрашиваемый пользователь не найден' });
  return res.status(200).send(user);
};
