import React from 'react'
import { configure, shallow } from 'enzyme'

import Adapter from 'enzyme-adapter-react-16'
import NavigationItem from './Navigationitem/NavigationItem'
import NavigationItems from './NavigationItems'

configure({ adapter: new Adapter() })
describe('<NavigationItems />', () => {
 const wrapper = shallow(<NavigationItems />)
    it('it should render navigationitems with 2', () => {


        expect(wrapper.find(NavigationItem)).toHaveLength(2)
    })
    it('it should render navigationitems with 3 ', () => {

        wrapper.setProps({isAuthenticated : true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    })
})