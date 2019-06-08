const fs = require("fs");
const faker = require('faker');
const writer = fs.createWriteStream('./seed.json')

const makeId = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

const arrGenerator = () => {
  let newArr = [];
  for (let i = 1; i <= 5; i++) {
    let arrItem = (Math.random() * 80).toFixed(2)
    newArr.push(Number(arrItem));
  }
  return newArr;
}

function writeOneMillionTimes(writer, encoding, callback, lines) {
  let i = 10000000;
  const randomObjMaker = () => {
    let addObject = {
      id: i,
      stock_name: faker.company.companyName(),
      stock_ticker: makeId(4),
      oneDay: arrGenerator(),
      oneWeek: arrGenerator(),
      oneMonth: arrGenerator(),
      threeMonth: arrGenerator(),
      oneYear: arrGenerator(),
      fiveYear: arrGenerator(),
    };
    return addObject;
  }
  
  write();
  function write() {
    let ok = true;
    do {
      i--;
      if (i % 500000 === 0) {
        console.log(i);
      }
      if (i === 0) {
        writer.write((JSON.stringify(randomObjMaker()) + '\n'), encoding, callback);
      } else {
        ok = writer.write((JSON.stringify(randomObjMaker()) + '\n'), encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
}

writeOneMillionTimes(writer, 'utf8', (err) => {
  if (err) throw err;
});

