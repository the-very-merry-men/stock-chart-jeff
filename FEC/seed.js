const mysql = require('mysql');
const faker = require('faker');
const Math = require('mathjs');
const random = require('math-random');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();
const fs = require('fs');

const connectRobinhood = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'robinhood_stock_chart',
});


connectRobinhood.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
  // fillStocks();

  // ran below function 6 times to fill postgres database
  fillTables();
});

const makeId = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(random() * charactersLength));
    }
    return result;
}

const fillStocks = () => {
  writer.pipe(fs.createWriteStream('seed.csv'));
  for (let i = 1; i < 10000000; i += 1) {
    const companyName = faker.company.companyName();
    const newCompanyName = companyName.split(/[' ,-]+/);
    let stock_name = newCompanyName[0];
    const stock_ticker = makeId(4);
    writer.write({i, stock_name, stock_ticker});
  }
  console.log('done');
};

const fillTables = () => {
  let id_ = 0;
  let currentWrite = 1;
  writer.pipe(fs.createWriteStream(`seedTable${currentWrite}.csv`));
  for (let i = 1; i < 10000000; i++) {
    var number = (Math.random() * 100);
    for (j = 1; j <= 5; j++) {
      id_++;
      let random = (Math.random());
      let firstPrice = random < 0.5 ? number + (Math.random() * 5) : number - (Math.random() * 5);
      let newPrice = firstPrice.toFixed(2);
      let price = newPrice;
      let stock_id = i;
      writer.write({id_, stock_id, price});
    }
  }
  console.log('done');
};
