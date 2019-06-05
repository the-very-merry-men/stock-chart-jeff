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
  fillStocks();
  thirtyMinutePriceDataForOneMonth();
  oneDayDataFor5Years();
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


const thirtyMinutePriceDataForOneMonth = () => {
  let count = 0;
  writer.pipe(fs.createWriteStream('seedTable1.csv'));
  for (let i = 0; i < 10000000; i++) {
    let number = (random() * 100);
    for (let j = 1; j <= 5; j++) {
      count++;
      let price = random < 0.5 ? (number + (random() * 5)) : (number - (random() * 5));
      let newPrice = price.toFixed(2);
      writer.write({count, i, newPrice});
    }
  }
  console.log('done');
};

const oneDayDataFor5Years = () => {
  let count = 0;
  writer.pipe(fs.createWriteStream('seedTable2.csv'));
  for (var i = 1; i < 10000000; i++) {
    var number = (Math.random() * 100);
    for (j = 1; j <= 5; j++) {
      count++;
      var random = (Math.random());
      var price = random < 0.5 ? number + (Math.random() * 5) : number - (Math.random() * 5);
      const newPrice = price.toFixed(2);
      writer.write({count, i, newPrice});
    }
  }
  console.log('done');
};



