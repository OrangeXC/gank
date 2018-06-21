import { shallow } from 'enzyme'
import React from 'react'
import ListSpin from '../../components/ListSpin'

describe('ListSpin', () => {
  it('child', () => {
    const wrapper = shallow(<ListSpin />)

    expect(wrapper.find('div').text()).toEqual('<Spin />')
  })
})
