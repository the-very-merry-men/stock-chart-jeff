# CRUD
                        
                        CreateReadUpdateDelete OPERATIONS for Stock Chart System Design



> ### STOCK NAME AND TICKER

| API Endpoints  | Request Type | Input | Output | Description  |
| ------------- | ------------- | ------------- | ------------- | ------------- | 
| /api/stocks/:stock | GET  | id of the desired stock  | An object stock id, name, and ticker along with success STATUS CODE 200 | Grab a particular stock from the database  |
| /api/stocks/:stock | POST  | stock name, stock ticker   | STATUS CODE 201  | Insert a new stock into the database  | 
| /api/stocks/:stock | PUT  | a given name or ticker id to be updated with input values  | STATUS CODE 200  | Update a current stock inside the database  |
| /api/stocks/:stock | DELETE  | a given name, or stock id  | STATUS CODE 200  | Delete a stock from a user input name or ticker_id  |



> ### STOCK DATA FOR ONE DAY, ONE WEEK, ONE MONTH, ONE YEAR, 5 YEARS

| API Endpoints  | Request Type | Input | Output | Description  |
| ------------- | ------------- | ------------- | ------------- | ------------- | 
| /api/stocks/:ticker/prices/:type  | GET  | ticker id for a certain stock at a certain time increment  | stock prices STATUS CODE 200 | Get the stock prices for a given stock  |
| /api/stocks/:ticker/prices/:type  | POST  | ticker id for a certain stock plus a new value to add to a database  | STATUS CODE 201  | Add a new price for a given stock  | 
| /api/stocks/:ticker/prices/:type  | PUT  | ticker id and a new price to replace an older price at a specific index if applicable (latest if not)  | STATUS CODE 200  | Update a price (either the most recent or a specific price at a specific ID)  |
| /api/stocks/:ticker/prices/:type  | DELETE  | ticker id and a specific ID if applicable (latest if not)  | STATUS CODE 200  | Delete a price (either the most recent or a specific price at a specific ID)   |

<img align="center" width="50" height="50" src="http://www.fillmurray.com/50/50">
