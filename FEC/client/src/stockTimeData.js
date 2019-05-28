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
        for(var i = 0; i < this.state.priceData.length; i++) {
            for(var j = 0; i <=17; i +=0.5) {
                graphData.push({dateString: schedule[i], x: j, y: this.state.priceData[i].price})
            }
        }
        this.setState({
            stockData: graphData
        })
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

//write a function that creates an array of times for 1 day, 1 week and 1 month
//1 data point every 30 minutes = 17 data points per day for an 8 hour day 9:00AM-5:00 PM ET
//1 day is = 17 data points
//1 week = 17 * 5 = 85
//1 month = 85 * 4 = 340