
var mysql = require('mysql');
var mysqlConfig = require('./config.js');

var connection = mysql.createConnection(mysqlConfig);

const getOneDayData = (ticker, callback) => {
    var query = `SELECT stock_price_for_thirty_minutes AS thirty, stock_info.stock_ticker AS ticker FROM stock_info
    INNER JOIN stock_price_history_one_month
    ON stock_price_history_one_month.stock_id = stock_info.id
    WHERE stock_info.stock_ticker = "${ticker}" `;
    connection.query(query, (err, results) => {
        if (err) {
            callback(err);
        } else {
            callback(null, results);
        }
    })
};

module.exports.getOneDayData = getOneDayData;

