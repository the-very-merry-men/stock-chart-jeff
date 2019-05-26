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
            typeHover: false,
            color: '#f45531',
            type: '1D',
            currentPoint: {},
            date: new Date(),
            market: 'Bull'
        }
        this.handleGraphTypeChange = this.handleGraphTypeChange.bind(this);
    }

    handleGraphTypeChange(event) {
        event.preventDefault();
        this.setState({
            type: event.target.name
        })


    }

    render() {
        const color = (this.props.market === 'Bull' ? '#f45531' : '#21CE99');

        return (
            <SectionWrapper className='stock-chart-container'>
                <StockHeader>
                    <StockName>Google</StockName>
                </StockHeader>
                <PriceHeader>
                    <Price>$2,000</Price>
                    <Change>
                        <StockPriceChange>+$2.00</StockPriceChange >
                        <StockPriceChange> (+0.001) </StockPriceChange>
                    </Change >
                </PriceHeader>
                <Spacer></Spacer>
                <ChartBox className="stock-chart" style={{position: 'relative', width: 676, height: 196}}>
                    <LineChart />
                </ChartBox>
            <NavType className='stock-type-nav'>
                <OneDTag type={this.state.type} name="1D" onClick={this.handleGraphTypeChange}>1D</OneDTag>
                <OneWTag type={this.state.type} name="1W" onClick={this.handleGraphTypeChange} >1W</OneWTag>
                <OneMTag type={this.state.type} name="1M" onClick={this.handleGraphTypeChange} >1M</OneMTag>
                <ThreeMTag type={this.state.type} name="3M" onClick={this.handleGraphTypeChange} >3M</ThreeMTag>
                <OneYTag type={this.state.type} name="1Y" onClick={this.handleGraphTypeChange}>1Y</OneYTag>
                <FiveYTag type={this.state.type} name="5Y" onClick={this.handleGraphTypeChange}>5Y</FiveYTag>
            </NavType>
            </SectionWrapper>
        )
    }
}

export default StockChart;