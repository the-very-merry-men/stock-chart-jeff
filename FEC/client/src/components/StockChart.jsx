import React from 'react';
import LineChart from './LineChart.jsx';
import styled from 'styled-components';

//STYLING
const ATag = styled.a`
   margin: 0px 12px;

   &:hover {
    color: #21CE99;
   }
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
        console.log("you clicked", event.target.name);
        this.setState({
            type: event.target.name
        })

    }

    render() {
        let color = this.props.market === 'Bull' ? '#f45531' : '#21CE99';
        let hoverColor = this.state.typeHover ? 'black' : color;

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
                <ATag name="1D" onClick={this.handleGraphTypeChange}>1D</ATag>
                <ATag name="1W" onClick={this.handleGraphTypeChange}>1W</ATag>
                <ATag name="1M" onClick={this.handleGraphTypeChange}>1M</ATag>
                <ATag name="3M" onClick={this.handleGraphTypeChange}>3M</ATag>
                <ATag name="1Y" onClick={this.handleGraphTypeChange}>1Y</ATag>
                <ATag name="5Y" onClick={this.handleGraphTypeChange}>5Y</ATag>
            </NavType>
            </SectionWrapper>
        )
    }
}

export default StockChart;