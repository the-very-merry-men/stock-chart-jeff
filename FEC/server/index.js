require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../db/index.js');

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
  const id = req.params.id;
  db.fetch((id), (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });
});