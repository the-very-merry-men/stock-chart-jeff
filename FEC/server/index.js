require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../db/index.js');
const redis = require('redis');
const client = redis.createClient();

const app = express();

var port = 3001;

app.use(express.static(path.join(__dirname + '/../public')));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/stocks/id', (req, res) => {
    if (!req.params.id) {
      res.status(400);
      res.end();
    } else {
      res.sendFile('index.html', { root: path.resolve(__dirname, '../public') });
    }
  });


//GET request for stock price data


const getCache = (req, res) => {
  let id = req.params.id;
  client.get(id, (err, result) => {
    if (err) {
      res.send(err);
    } else if (result) {
      res.send(result);
    } else {
      getStock(req, res)
    }
  });
}

const getStock = (req, res) => {
  const id = req.params.id
  db.fetch((id), (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.send(results);
      client.set(id, JSON.stringify(results));
    }
  });
}

client.on('connect', function() {
  console.log('connected to redis');
  client.get('hello', (err, result) => {
    console.log(err, result, 'hey')
  })
});

app.get('/stocks/:id', (req, res) => {
  getCache(req, res)
});


app.listen(port, () => {
  console.log('Server is listening on port 3001')
});