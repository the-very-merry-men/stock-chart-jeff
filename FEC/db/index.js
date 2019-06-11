const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/STOCK_DATA';
const db = mongoose.connect(mongoURI, { useNewUrlParser: true });

db
  .then(db => console.log(`Connected to: ${mongoURI}`))
  .catch(err => {
    console.log(`There was a problem connecting to mongo at: ${mongoURI}`)
    console.log(err);
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
