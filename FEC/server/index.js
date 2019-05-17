const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db/index.js')

const app = express();

var port = 3001;

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());

app.listen(port, () => {
    console.log('Server is listening on port 3001')
});



// 1 day for Stock # 1
app.get('/api/stocks/prices', (req, res) => {
    db.getOneDayData((err, results) => {
        if (err) {
            res.status(500);
            res.send(err);
        } else {
            res.status(200);
            res.send(results);
        }
    })
})


// //1 Week
// app.get('/yo', (req, res) => {
//     console.log('1 week received')
// })

// //1 Month
// app.get('/yo', (req, res) => {
//     console.log('1 month received')
// })

// //3 Months
// app.get('/yo', (req, res) => {
//     console.log('3 months received')
// })

// //1 Year
// app.get('/hey', (req, res) => {
//     console.log('1 year received')
// })
