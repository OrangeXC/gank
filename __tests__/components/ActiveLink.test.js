import { shallow } from 'enzyme'
import React from 'react'

describe('ActiveLink', () => {
  const mocks = {
    useRouter: jest.fn(() => ({
      push: mocks.push
    })),
    push: jest.fn().mockImplementation((value) => Promise.resolve(value)),
    scrollTo: jest.fn()
  }
  let ActiveLink

  beforeAll(() => {
    window.scrollTo = mocks.scrollTo

    jest.mock('next/router', () => ({
      __esModule: true,
      useRouter: mocks.useRouter
    }))

    ActiveLink = require('../../components/ActiveLink').default
  })

  it('render', () => {
    const wrapper = shallow(<ActiveLink children="home" />).first().shallow()
    const node = wrapper.find('li')

    expect(node.text()).toEqual('home')
    expect(node.hasClass('ant-menu-item')).toBeTruthy()
    expect(node.hasClass('ant-menu-item-selected')).toBeTruthy()
    expect(mocks.useRouter).toHaveBeenCalled()
  })

  it('click', (done) => {
    const wrapper = shallow(<ActiveLink href="/home" />).first().shallow()
    const node = wrapper.find('li')

    wrapper.simulate('click', { preventDefault() {} })

    expect(mocks.push).toHaveBeenCalledWith('/home')
    expect(node.hasClass('ant-menu-item')).toBeTruthy()
    expect(node.hasClass('ant-menu-item-selected')).toBeFalsy()

    setTimeout(() => {
      expect(mocks.scrollTo).toHaveBeenCalledWith(0, 0)

      done()
    }, 0)
  })
})
