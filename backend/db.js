const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
require('dotenv').config();
const mongoDbUrl = process.env.CONNECTION_URL;

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('Database is already initialized');
    return callback(null, _db);
  }
  MongoClient.connect(mongoDbUrl)
    .then((client) => {
      _db = client;
      console.log('Database connected');
      return callback(null, _db);
    })
    .catch((err) => {
      callback(err);
      console.log(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error('Database not initialized');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};
