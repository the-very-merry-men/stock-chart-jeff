import React from 'react';
import LineChart from './LineChart.jsx';
import styled from 'styled-components';

//STYLING
const OneDTag = styled.a`
   margin: 0px 12px;

   &:hover {
    color: #21CE99;
   }

   border-bottom: ${props => props.type === '1D' ? '#21CE99 1px solid' : 'none'};
   color: ${props => props.type === '1D' ? '#21CE99' : 'black'};
`;
const OneWTag = styled.a`
   margin: 0px 12px;

   &:hover {
    color: #21CE99;
   }

   border-bottom: ${props => props.type === '1W' ? '#21CE99 1px solid' : 'none'};
   color: ${props => props.type === '1W' ? '#21CE99' : 'black'};
`;

const OneMTag = styled.a`
   margin: 0px 12px;

   &:hover {
    color: #21CE99;
   }

   border-bottom: ${props => props.type === '1M' ? '#21CE99 1px solid' : 'none'};
   color: ${props => props.type === '1M' ? '#21CE99' : 'black'};
`;
const ThreeMTag = styled.a`
   margin: 0px 12px;

   &:hover {
    color: #21CE99;
   }

   border-bottom: ${props => props.type === '3M' ? '#21CE99 1px solid' : 'none'};
   color: ${props => props.type === '3M' ? '#21CE99' : 'black'};
`;

const OneYTag = styled.a`
   margin: 0px 12px;

   &:hover {
    color: #21CE99;
   }

   border-bottom: ${props => props.type === '1Y' ? '#21CE99 1px solid' : 'none'};
   color: ${props => props.type === '1Y' ? '#21CE99' : 'black'};
`;
const FiveYTag = styled.a`
   margin: 0px 12px;

   &:hover {
    color: #21CE99;
   }

   border-bottom: ${props => props.type === '5Y' ? '#21CE99 1px solid' : 'none'};
   color: ${props => props.type === '5Y' ? '#21CE99' : 'black'};
`;

const NavType = styled.nav`
   display: flex;
   margin:  24px 0px 12px;
   flex-direction: row;
   width: 676px;
   height: 33px;
   font-size: 13px;
   font-weight:400;
   line-spacing: 0.25px;
   border-bottom: 1px solid #f4f4f5;
   `;

const SectionWrapper = styled.section`
   width: 676px;
   height: 349px;
`;

const ChartBox = styled.div`
   width: 676px;
   height: 196;
   padding-bottom: 44px;
`;

const Price = styled.div`
    width: 676px;
    height: 42px;
    font-size: 36px;
    color: black;
    margin: 0px;
    letter-spacing: -0.7px;
    line-height: 42px;
    font-weight: 400;
`;
const PriceHeader = styled.header`
    height: 84px;
    width: 676px;
    margin: 0px 0px 12px;
`;

const Change = styled.div`
    width: 676px;
    height: 19px;
    font-size: 13px;
    color: black;
`;
const StockPriceChange = styled.span`
    width: 55px;
    height: 17px;
    font-size: 13px;
    color: black;
`;

const Spacer = styled.div`
    width: 676px;
    height: 19px;
`;

const StockName = styled.div`
   width: 144 px;
   height: 42px;
   font-size: 36px;
   line-height: 42px;
   font-weight: 500;
   letter-spacing: -0.29px;
`;

const StockHeader = styled.header`
    width: 676px;
    height: 42px;
`;


class StockChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPrice: 200.00,
            closingPrice: 210.00,
            amountDiff: 2.00,
            percentDiff: 0.012,
        }
    }

    componentDidMount() {
        const random = (Math.random());
        const currentPrice = 200;
        const closing = random < 0.5 ? currentPrice + (Math.random() * 20) : currentPrice - (Math.random() * 5);
        this.setState({
            currentPrice: currentPrice,
            closingPrice: closing
        })
    }
    render() {
        const color = (this.props.market === 'Bull' ? '#f45531' : '#21CE99');
        const currentVal = `$${this.state.currentPrice}`;
        const priceDifference = (this.state.closingPrice - this.state.currentPrice).toFixed(2);
        const pricePercentage = (priceDifference/this.state.closingPrice).toFixed(3);
        const sign = priceDifference > 0 ? '+' : '-';
        const differenceString = priceDifference < 0 ? `${sign}$${Math.abs(priceDifference)}   ` : `${sign}$${priceDifference}   `;
        const percentString = pricePercentage < 0 ? `${sign}(${Math.abs(pricePercentage)} %)` : `${sign}(${pricePercentage} %)`;


        return (
            <SectionWrapper className='stock-chart-container'>
                <StockHeader>
                    <StockName>{this.props.stockName}</StockName>
                </StockHeader>
                <PriceHeader>
                    <Price>{currentVal}</Price>
                    <Change>
                        <StockPriceChange>{differenceString}</StockPriceChange >
                        <StockPriceChange>{percentString}</StockPriceChange>
                    </Change >
                </PriceHeader>
                <Spacer></Spacer>
                <ChartBox style={{position: 'relative', width: 676, height: 196}}>
                    <LineChart stockData={this.props.stockData}/>
                </ChartBox>
            <NavType className='stock-type-nav'>
                <OneDTag type={this.props.type}name="1D" onClick={this.props.handleGraphTypeChange}>1D</OneDTag>
                <OneWTag type={this.props.type} name="1W" onClick={this.props.handleGraphTypeChange} >1W</OneWTag>
                <OneMTag type={this.props.type} name="1M" onClick={this.props.handleGraphTypeChange} >1M</OneMTag>
                <ThreeMTag type={this.props.type} name="3M" onClick={this.props.handleGraphTypeChange} >3M</ThreeMTag>
                <OneYTag type={this.props.type} name="1Y" onClick={this.props.handleGraphTypeChange}>1Y</OneYTag>
                <FiveYTag type={this.props.type} name="5Y" onClick={this.props.handleGraphTypeChange}>5Y</FiveYTag>
            </NavType>
            </SectionWrapper>
        )
    }
}

export default StockChart;