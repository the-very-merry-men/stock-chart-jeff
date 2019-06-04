> CreateReadUpdateDelete OPERATIONS for Stock Chart System Design

STOCK NAME AND TICKER

| API Endpoints  | Request Type | Input | Output | Description  |
| ------------- | ------------- | ------------- | ------------- | ------------- | 
| /api/stocks/:stock | GET  | id of the desired stock  | An object stock id, name, and ticker along with success STATUS CODE 200 | Grab a particular stock from the database  |
| /api/stocks/:stock | POST  | stock name, stock ticker   | STATUS CODE 201  | Insert a new stock into the database  | 
| /api/stocks/:stock | PUT  | a given name or ticker id to be updated with input values  | STATUS CODE 200  | Update a current stock inside the database  |
| /api/stocks/:stock | DELETE  | a given name, or stock id  | STATUS CODE 200  | Delete a stock from a user input name or ticker_id  |

STOCK DATA FOR ONE DAY, ONE WEEK, ONE MONTH, ONE YEAR, 5 YEARS

| First Header  | Second Header | First Header  | Second Header | First Header  |
| ------------- | ------------- | ------------- | ------------- | ------------- | 
| Content Cell  | Content Cell  | Content Cell  | Content Cell  | Content Cell  |
| Content Cell  | Content Cell  | Content Cell  | Content Cell  | Content Cell  | 
| Content Cell  | Content Cell  | Content Cell  | Content Cell  | Content Cell  |
| Content Cell  | Content Cell  | Content Cell  | Content Cell  | Content Cell  |
| ------------- | ------------- | ------------- | ------------- | ------------- | 
