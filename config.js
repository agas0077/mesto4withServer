module.exports.mongooseConfig = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

const { DB_PASSWORD } = process.env;

module.exports.PORT = process.env.PORT || 3000;

module.exports.DATABASE_URL = DB_PASSWORD ? `mongodb://DND:${DB_PASSWORD}@dnd-shard-00-00-yxink.azure.mongodb.net:27017,dnd-shard-00-01-yxink.azure.mongodb.net:27017,dnd-shard-00-02-yxink.azure.mongodb.net:27017/mesto4?ssl=true&replicaSet=DND-shard-0&authSource=admin&retryWrites=true&w=majority` : 'mongodb://localhost:27017/mydb';
