import React from 'react';
const $ = require('jquery');
import StockChart from './StockChart.jsx';
import { BrowserRouter, Route} from 'react-router-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            date: new Date(),
            times: [],
            type: '1D',
            ticker: 'TSLA',

        }
        this.retrieveData = this.retrieveData.bind(this);
        this.handleGraphTypeChange = this.handleGraphTypeChange.bind(this);
    }

    componentDidMount() {
        //get the path and filename of current page
        let stockMatch = window.location.pathname.match(/\/stocks\/(\w+)/i);
        let ticker = stockMatch ? stockMatch[1] : null;
        if (ticker) {
           this.setState({ticker}, () => this.retrieveData());
        }
    }

    handleGraphTypeChange(event) {
        event.preventDefault();
        this.setState({
            type: event.target.name
        }, () => this.retrieveData())
    }

    retrieveData() {
        $.ajax({
            url: `/api/stocks/${this.state.ticker}/prices/${this.state.type}`,
            type: 'GET',
            success: (data) => {
                this.setState({
                    data: data
                })
                console.log('GET request successful', data);
            },
            error: (err) => {
                console.log(err);
                this.setState({
                    data: [{x: 0, y: 30.12}, {x: 1, y: 32.10}, {x: 2, y: 30.09}, {x: 3, y: 30.99}, {x: 4, y: 31.99}, {x: 5, y: 53.99}, {x: 6, y: 40.20}, {x: 7, y: 32.12}, {x: 8, y: 32.10}, {x: 9, y: 31.09}, {x: 10, y: 32.99}, {x: 11, y: 36.99}, {x: 12, y: 54.99}, {x: 13, y: 40.20}]
                })
            }
        })
    }

    createTimes() {
        let graphData = [];
        let today = this.state.date;
        let type = this.state.type;
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        let month;
        if(mm === 0) {
            month = 'JAN';
        } else if(mm === 1) {
             month = 'FEB';
        }else if(mm === 2) {
            month = 'MAR';
        }else if(mm === 3) {
             month = 'APR';
        }else if(mm === 4) {
            month = 'MAY';
        }else if(mm === 5) {
            month = 'JUN';
        }else if(mm === 6) {
            month = 'JUL';
        }else if(mm === 7) {
            month = 'AUG';
        }else if(mm === 8) {
            month = 'SEPT';
        }else if(mm === 9) {
            month = 'OCT';
        }else if(mm === 10) {
            month = 'NOV';
        }else if(mm === 11) {
            month = 'DEC'
        }
        if (type === '1D') {
            let schedule = ['9:00', '9:30', '10:00', '10:30', '11:30', '12:00', '12:30', '12:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00']
        } else if(type === '1W') {
            for(var i = 1; i <=5; i++) {
                for(var i = 0.5; i<=17; i += 0.5) {
                    graphData.push({})
                }
            }
            let schedule = ['9:00', '9:30', '10:00', '10:30', '11:30', '12:00', '12:30', '12:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00']
        } else if(type === '1M') {
            let schedule = ['9:00', '9:30', '10:00', '10:30', '11:30', '12:00', '12:30', '12:30', '1:00', '1:30', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00']
        } else if(type ==='3M') {

            today = month + ' ' + dd + ',' + yyyy;
        } else if(type === '1Y') {

        } else if(type === '5Y') {

        }
    }

    render () {
        return (
            <div>
                <StockChart data={this.state.data} market={this.state.market} handleGraphTypeChange={this.handleGraphTypeChange} type={this.state.type}/>
            </div>

        )
    }
}

export default App;

//write a function that creates an array of times for 1 day, 1 week and 1 month
//1 data point every 30 minutes = 17 data points per day for an 8 hour day 9:00AM-5:00 PM ET
//1 day is = 5*17 = 85
//1 week = 85*4 = 340
//1 month = 340* 4 = 1,360

// createOneWeekTimes() {

// }
// createOneMonthTimes() {

// }