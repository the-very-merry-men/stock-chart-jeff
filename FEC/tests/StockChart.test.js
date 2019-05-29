import React from 'react';
import StockChart from '../client/src/components/StockChart.jsx';
import {shallow} from 'enzyme';

describe('Stock Chart Component', () => {
    it('renders one <StockChart />', () => {
        const component = shallow(<StockChart />);
        expect(component).toHaveLength(1)
    })
})