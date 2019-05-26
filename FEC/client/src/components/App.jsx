import React from 'react';
const $ = require('jquery');
import StockChart from './StockChart.jsx';
import { BrowserRouter, Route} from 'react-router-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[]

        }
        this.retrieveData = this.retrieveData.bind(this);
    }

    componentDidMount() {
        let match = window.location.pathname.match(/\/stocks\/(\w+)/i);
        const ticker = match ? match[1] : null;
        if (ticker) {
           this.setState({
               ticker: ticker,
                date: new Date(),

            }, () => this.retrieveData());
        }
    }

    retrieveData() {
        $.ajax({
            url: `/api/stocks/${ticker}/prices/${timeline}`,
            type: 'GET',
            success: (data) => {
                this.setState({
                    data: data
                })
                console.log('GET request successful', data);
            },
            error: (err) => {
                console.log(err);
            }
        })
    }
    render () {
        <BrowserRouter>
            <Route path='/stocks/:ticker' component={StockChart} />
        </BrowserRouter>
        return (
            <div>
               <StockChart data={this.state.data}/>
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
// createOneDayTimes() {
//     //new Date()
// }

// createOneWeekTimes() {

// }
// createOneMonthTimes() {

// }