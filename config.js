module.exports.mongooseConfig = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

module.exports.PORT = process.env.PORT || 80;

module.exports.DATABASE_URL = 'mongodb://localhost:27017/mestodb';
