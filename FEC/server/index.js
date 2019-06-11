const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../db/index.js')

const app = express();

var port = 3001;

app.use(express.static(path.join(__dirname + '/../public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log('Server is listening on port 3001')
});

app.get('/stocks/id', (req, res) => {
    if (!req.params.id) {
      res.status(400);
      res.end();
    } else {
      res.sendFile('index.html', { root: path.resolve(__dirname, '../public') });
    }
  });


//GET request for stock price data
app.get('/stocks/:id', (req, res) => {
  // const ticker = req.params.ticker;
  const id = req.params.id;
  // console.log(req.params.id)
  // need to input ticker value to search for that specific value 
  db.fetch((id), (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });
});

// do I need to make a separate get for the stock name and possibly the ID?? 
    // tbd, but likely yes


// here is the old types
    // if (req.params.type === '1D' || req.params.type === '1W' || req.params.type === '1M') {
    //     db.getOneDayWeekMonthData(req.params.ticker, req.params.type, (err, results) => {
    //         if (err) {
    //             res.status(500);
    //             res.send(err);
    //         } else {
    //             res.status(200);
    //             res.send(results);
    //         }
    //     })
    // } else if (req.params.type === '3M' || req.params.type === '1Y' || req.params.type === '5Y') {
    //     db.getThreeMonthOneYearFiveYearData(req.params.ticker, req.params.type, (err, results) => {
    //         if (err) {
    //             res.status(500);
    //             res.send(err);
    //         } else {
    //             res.status(200);
    //             res.send(results);
    //         }
    //     })
    // }

//GET request or stock price data
// app.get('/', (req, res) => {
//     if (req.params.type === '1D' || req.params.type === '1W' || req.params.type === '1M') {
//         db.getOneDayWeekMonthData(req.params.ticker, req.params.type, (err, results) => {
//             if (err) {
//                 res.status(500);
//                 res.send(err);
//             } else {
//                 res.status(200);
//                 res.send(results);
//             }
//         })
//     } else if (req.params.type === '3M' || req.params.type === '1Y' || req.params.type === '5Y') {
//         db.getThreeMonthOneYearFiveYearData(req.params.ticker, req.params.type, (err, results) => {
//             if (err) {
//                 res.status(500);
//                 res.send(err);
//             } else {
//                 res.status(200);
//                 res.send(results);
//             }
//         })
//     }
// })



