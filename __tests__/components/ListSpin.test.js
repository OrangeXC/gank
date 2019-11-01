import { shallow } from 'enzyme'
import ListSpin from '../../components/ListSpin'

describe('ListSpin', () => {
  it('child', () => {
    const wrapper = shallow(<ListSpin />)

    expect(wrapper.find('div').text()).toEqual('<Spin />')
  })
})
