const mysql = require('mysql');
const faker = require('faker');
const Math = require('mathjs');
const random = require('math-random');

const connectRobinhood = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'robinhood_stock_chart',
});


connectRobinhood.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
  // eslint-disable-next-line no-use-before-define
  // schema();
  // eslint-disable-next-line no-use-before-define
  // fillStocks();
  // eslint-disable-next-line no-use-before-define
  // thirtyMinutePriceDataForOneMonth();
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
  for (let i = 1; i < 101; i += 1) {
    const companyName = faker.company.companyName();
    const newCompanyName = companyName.split(/[' ,-]+/);
    let queryName = newCompanyName[0];
    const stockLettering = makeId(4);
    const listingSql = `INSERT INTO stock_info (id, stock_name, stock_ticker) VALUES ('${i}', '${queryName}', '${stockLettering}');`;
    connectRobinhood.query(listingSql, (err, result) => {
      if (err) throw err;
      console.log('record inserted first table');
    });
    console.log(i);
  }
};

var thirtyMinutePriceDataForOneMonth = () => {
    var count = 0;
    for (var i = 1; i < 101; i++) {
        var number = (random() * 100);
        for (var j = 1; j <= 100; j++) {
            count++;
            var price = random < 0.5 ? (number + (random() * 5)) : (number - (random() * 5));
            const thirtyMinQuery = `INSERT INTO stock_price_history_one_month (id, stock_id, stock_price_for_thirty_minutes) VALUES (${count}, ${i}, ${price});`
            console.log(count, i);
            connectRobinhood.query(thirtyMinQuery, (err, result) => {
              if (err) throw err;
              console.log('record inserted second table', i, j);
            })
        }
    }
};

var oneDayDataFor5Years = () => {
    var count = 0;
    for (var i = 1; i < 101; i++) {
        var number = (Math.random() * 100);
        for (j = 1; j <= 100; j++) {
                count++;
                var random = (Math.random());
                var price = random < 0.5 ? number + (Math.random() * 5) : number - (Math.random() * 5);
                const oneDayFor5Years = `INSERT INTO stock_price_history_five_years (id, stock_id, stock_price_for_one_day) VALUES (${count}, ${i}, ${price});`;
            connectRobinhood.query(oneDayFor5Years, (err, result) => {
                if (err) throw err;
                console.log('record inserted second table', i, j);
            });
        }
    }

};


// module.exports = {
//   fillListingTable,
//   fillBookingTable,
// };
