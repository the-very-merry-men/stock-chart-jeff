import React from 'react'
import App from '../client/src/components/App.jsx'
import {shallow} from 'enzyme'

describe('App Component', () => {
    it('renders one <App />', () => {
        const component = shallow(<App />)
        expect(component).toHaveLength(1)
    })
    it('renders the correct state on mounting', () => {
        const appState = component.state().timeline
        expect(appState).toEqual('oneDay');

        expect(Array.isArray(appState.data).toEqual(true))
        expect(appState.data.length.toEqual(85));
    })
    it('should render the correct state when graph is changed' () => {
    })
})