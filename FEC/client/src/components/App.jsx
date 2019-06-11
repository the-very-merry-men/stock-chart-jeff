import React from 'react';
const $ = require('jquery');
import StockChart from './StockChart.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            priceData:[],
            stockName: '',
            date: new Date(),
            stockData: [],
            type: '1D',
            ticker: '',
            oneDay: [],
            oneWeek: [],
            oneMonth: [],
            threeMonth: [],
            oneYear: [],
            fiveYear: [],
        }
        this.retrieveData = this.retrieveData.bind(this);
        this.handleGraphTypeChange = this.handleGraphTypeChange.bind(this);
        this.generateStockDataArray = this.generateStockDataArray.bind(this);
    }

    componentDidMount() {
        // const loadTicker = this.makeId(4);
        // // let ticker = pathName ? pathName[1] : null;
        // if (loadTicker) {
        //    this.setState({ticker : loadTicker}, () => this.retrieveData(id));
        // }
        this.retrieveData();
    }

    makeId (length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    retrieveData() {
        const stockId = window.location.href.split('?')[1].slice(3);
        $.ajax({
            // ok so I need to make sure that ticker is being passed down effectively
            url: `/stocks/${stockId}`,
            type: 'GET',
            success: (data) => {
                const currentPrice = data[0].oneDay[data[0].oneDay.length-1];
                const randomNum = Math.random()*5;
                const num = Number(randomNum.toFixed(2));
                const random = Math.random();
                const closingPrice = (random > 0.5) ? Number(currentPrice - num): Number(currentPrice + num);
                const market = (closingPrice > currentPrice) ? 'Bear' : 'Bull';
                const color = (market === 'Bull') ? '#21CE99': '#F45531'; 
                this.setState({
                    // changed default to the first day
                    priceData: data[0].oneDay,
                    ticker: data[0].stock_ticker,
                    stockName: data[0].stock_name,
                    currentPrice: currentPrice,
                    closingPrice: closingPrice,
                    market: market,
                    color: color,
                    oneDay: data[0].oneDay,
                    oneWeek: data[0].oneWeek,
                    oneMonth: data[0].oneMonth,
                    threeMonth: data[0].threeMonth,
                    oneYear: data[0].oneYear,
                    fiveYear: data[0].fiveYear,
                }, () => this.generateStockDataArray(), console.log('GET request successful', this.state.priceData));
            },
            error: (err) => {
                console.log('here', err);
            }
        })
    }

    //a function that updates the type and data on the state when the graph type is changed
    handleGraphTypeChange(event) {
        event.preventDefault();
        let graphType;
        if (event.target.name === '1D') {
          graphType = this.state.oneDay;
        } else if (event.target.name === '1W') {
          graphType = this.state.oneWeek;
        } else if (event.target.name === '1M') {
          graphType = this.state.oneMonth;
        } else if (event.target.name === '3M') {
          graphType = this.state.threeMonth;
        } else if (event.target.name === '1Y') {
          graphType = this.state.oneYear;
        } else {
          graphType = this.state.fiveYear;
        }

        this.setState({
            type: event.target.name,
        }, () => this.setState({
            priceData: graphType
        }, () => this.generateStockDataArray()));
    }

    //a function that creates a stock data object for each retrieved price data point
    generateStockDataArray() {
        // data to be rendered on the graph
        let graphData = [];
        let today = this.state.date;
        let type = this.state.type;
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        let month;
        let schedule = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM']
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC']
        const market = (this.state.stockData[0] < this.state.stockData[this.state.stockData.length-1]) ? 'Bear' : 'Bull';
        const color = (market === 'Bull') ? '#21CE99': '#F45531';

        const data = this.state.priceData.slice();
        if(mm === 0) {
            month = 'JAN';
        } else if (mm === 1) {
            month = 'FEB';
        } else if (mm === 2) {
             month = 'MAR';
        } else if (mm === 3) {
             month = 'APR';
        } else if (mm === 4) {
             month = 'MAY';
        } else if (mm === 5) {
             month = 'JUN';
        } else if (mm === 6) {
             month = 'JUL';
        } else if (mm === 7) {
             month = 'AUG';
        } else if (mm === 8) {
             month = 'SEPT';
        } else if (mm === 9) {
             month = 'OCT';
        } else if (mm === 10) {
             month = 'NOV';
        } else if (mm === 11) {
            month = 'DEC'
        }
        // what are these data arrays?? 
        // const data = this.state.priceData.slice();
        if (type === '1D') {
            for (var i = 0; i < 16; i++) {
                graphData.push({dateString: `${schedule[i]} ET`, x: i, y: data[i]});
            }
            this.setState({
                stockData: graphData,
                color: color,
            })
        } else if (type === '1W') {
            for (var i = 0; i < data.length; i++) {
                graphData.push({dateString: `${schedule[i]}, ${month} ${dd} ET`, x: i, y: data[i]});
            }
            this.setState({
                stockData: graphData,
                color: color,
            })
        } else if (type === '1M') {
            for (var i = 0; i < data.length; i++) {
                graphData.push({dateString: `${schedule[i]}, ${month} ${dd} ET`, x: i, y: data[i]});
            }
            this.setState({
                stockData: graphData,
                color: color,
            })
        } else if (type ==='3M') {
            for (var i = 0; i < data.length; i++) {
                graphData.push({dateString: `${schedule[i]}, ${month} ${dd} ET`, x: i, y: data[i]});
            }
            this.setState({
                stockData: graphData,
                color: color,
            })
        } else if (type === '1Y') {
            for (var i = 0; i < data.length; i++) {
                graphData.push({dateString: today, x: i, y: data[i]});
            }
            this.setState({
                stockData: graphData,
                color: color,
            })
        } else if (type === '5Y') {
            for (var i = 0; i < data.length; i++) {
                graphData.push({dateString: today, x: i, y: data[i]});
            }
            this.setState({
                stockData: graphData,
                color: color,
            }, () => console.log(this.state.stockData));
        }
    }

    render () {
        return (
            <div>
                <StockChart color={this.state.color} stockName={this.state.stockName} closingPrice={this.state.closingPrice} currentPrice={this.state.currentPrice} stockData={this.state.stockData} market={this.state.market} handleGraphTypeChange={this.handleGraphTypeChange} type={this.state.type}/>
            </div>

        )
    }
};

export default App;

