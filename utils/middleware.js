import nextConnect from "next-connect";
import { MongoClient } from "mongodb";

const mongoClient = new MongoClient(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let cached = global.mongo;
if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}
async function database(req, res, next) {
  if (!cached.promise) {
    cached.promise = mongoClient.connect().then((client) => {
      return {
        client,
        db: client.db(process.env.MONGODB_DB),
      };
    });
    cached.conn = await cached.promise;
  }
  req.dbClient = cached.conn.client;
  req.db = cached.conn.db;
  return next();
}
const middleware = nextConnect();

middleware.use(database);

export default middleware;
