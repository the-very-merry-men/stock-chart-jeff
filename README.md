> CreateReadUpdateDelete OPERATIONS for Stock Chart System Design

STOCK NAME AND TICKER

| API Endpoints  | Request Type | Input | Output | Description  |
| ------------- | ------------- | ------------- | ------------- | ------------- | 
| /api/stocks/:stock | GET  | id of the desired stock  | An object stock id, name, and ticker along with success STATUS CODE 200 | Grab a particular stock from the database  |
| /api/stocks/:stock | POST  | stock name, stock ticker   | Content Cell  | Content Cell  | 
| /api/stocks/:stock | PUT  | a given name or ticker id to be updated with input values  | Content Cell  | Content Cell  |
| /api/stocks/:stock | DELETE  | a given name, or stock id  | Content Cell  | Content Cell  |
| ------------- | ------------- | ------------- | ------------- | ------------- | 

STOCK DATA FOR ONE DAY, ONE WEEK, ONE MONTH, ONE YEAR, 5 YEARS

| First Header  | Second Header | First Header  | Second Header | First Header  |
| ------------- | ------------- | ------------- | ------------- | ------------- | 
| Content Cell  | Content Cell  | Content Cell  | Content Cell  | Content Cell  |
| Content Cell  | Content Cell  | Content Cell  | Content Cell  | Content Cell  | 
| Content Cell  | Content Cell  | Content Cell  | Content Cell  | Content Cell  |
| Content Cell  | Content Cell  | Content Cell  | Content Cell  | Content Cell  |
| ------------- | ------------- | ------------- | ------------- | ------------- | 
