var mysql = require('mysql');
var mysqlConfig = require('./config.js');

var connection = mysql.createConnection(mysqlConfig);




const getOneDayData = (callback) => {
    var query = `SELECT * FROM stock_price_history_one_month WHERE stock_id = 1`;
    connection.query(query, (err, results) => {
        if (err) {
            callback(err);
        } else {
            callback(null, results);
        }
    })
};

module.exports.getOneDayData = getOneDayData;

