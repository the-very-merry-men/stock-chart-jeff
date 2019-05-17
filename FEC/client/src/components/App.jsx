import React from 'react';
const $ = require('jquery');


class App extends React.Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {
        $.ajax({
            url: '/api/stocks/prices',
            type: 'GET',
            success: (data) => {
                console.log('GET request successful', data);
            },
            error: (err) => {
                console.log(err);
            }
        })
    }

    render () {
        return (
            <div>
               <h1> Robinhood.com </h1>
               <h3> Stock Chart </h3>
            </div>
        )
    }
}

export default App;