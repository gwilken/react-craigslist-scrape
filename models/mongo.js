const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/test';

var mongo = {

    db: null,
    collection: null,

    connect: function() {
      MongoClient.connect(url, function(err, db) {
          console.log("Connected successfully to mongodb");
          mongo.db = db;
          mongo.collection = db.collection('scraper');
        });
    }
};

module.exports = mongo;
