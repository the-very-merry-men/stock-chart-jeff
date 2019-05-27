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
            times: [],
            type: '1D',
            ticker: 'TSLA',

        }
        this.retrieveData = this.retrieveData.bind(this);
        this.handleGraphTypeChange = this.handleGraphTypeChange.bind(this);
    }

    componentDidMount() {
        //retrieve the path and filename of current page
        let stockMatch = window.location.pathname.match(/\/stocks\/(\w+)/i);
        let ticker = stockMatch ? stockMatch[1] : null;
        if (ticker) {
           this.setState({ticker}, () => this.retrieveData());
        }
    }

    //a function that makes an http GET request using the ticker and graph type 
    retrieveData() {
        $.ajax({
            url: `/api/stocks/${this.state.ticker}/prices/${this.state.type}`,
            type: 'GET',
            success: (data) => {
                this.setState({
                    priceData: data,
                    stockName: data[0].name
                })
                console.log('GET request successful', data);
            },
            error: (err) => {
                console.log(err);
            }
        })
    }
    //a function that updates the type and data on the state when the graph type is changed
    handleGraphTypeChange(event) {
        event.preventDefault();
        this.setState({
            type: event.target.name
        }, () => this.retrieveData())
    }

    render () {
        return (
            <div>
                <StockChart stockName={this.state.stockName} priceData={this.state.priceData} market={this.state.market} handleGraphTypeChange={this.handleGraphTypeChange} type={this.state.type}/>
            </div>

        )
    }
}

export default App;

