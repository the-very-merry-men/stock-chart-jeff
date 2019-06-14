const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/STOCK_DATA';
const db = mongoose.connect(mongoURI, { useNewUrlParser: true });
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


// const mongoURI = 'mongodb://localhost:27017/STOCK_DATA';
// Use connect method to connect to the Server passing in
// additional options
MongoClient.connect(mongoURI, {
  poolSize: 1000
}, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  db.close();
});

const stockSchema = new mongoose.Schema({
  id: Number,
  stock_name: String,
  stock_ticker: String,
  oneDay: [Number], 
  oneWeek: [Number], 
  oneMonth: [Number],
  threeMonth: [Number],
  oneYear: [Number],
  fiveYear: [Number],
});

const Stock = mongoose.model('Stock', stockSchema);

const fetch = (id, callback) => {
  Stock.find( { id } )
    .then((data) => {
      console.log(data);
      callback(null, data);
    })
    .catch((err) => console.log(err));
}
module.exports.fetch = fetch;
module.exports.db = db;
