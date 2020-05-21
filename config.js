module.exports.mongooseConfig = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

const isProduction = process.env.NODE_ENV === 'production';

console.log(isProduction)

module.exports.PORT = process.env.PORT || 3000;

module.exports.KEY = isProduction ? process.env.JWT_SECRET : 'SOME-SECRET-KEY';

console.log(this.KEY)

module.exports.DATABASE_URL = isProduction ? process.env.DATABASE_URL : 'mongodb://localhost:27017/mydb';
