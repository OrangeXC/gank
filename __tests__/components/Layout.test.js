import { shallow } from 'enzyme'
import ActiveLink from '../../components/ActiveLink'
import { Menu } from 'antd'

describe('Layout', () => {
  const mocks = {
    nextRouter: {
      onRouteChangeStart: jest.fn(),
      onRouteChangeComplete: jest.fn(),
      onRouteChangeError: jest.fn()
    },
    nprogress: {
      start: jest.fn(),
      done: jest.fn()
    }
  }
  let Layout

  beforeAll(() => {
    jest.mock('next/router', () => mocks.nextRouter)
    jest.mock('nprogress', () => mocks.nprogress)

    Layout = require('../../components/Layout').default
  })

  it('render', () => {
    const wrapper = shallow(<Layout />)

    expect(wrapper.find('title').text()).toEqual('主页 - Gank')

    const links = wrapper.find(ActiveLink)

    expect(links).toHaveLength(10)
    expect(links.at(0).text()).toEqual('<ActiveLink />')

    const menu = wrapper.find(Menu)

    expect(menu.prop('style')).toEqual({
      lineHeight: '64px',
      float: 'left'
    })
  })

  it('nprogress run', () => {
    mocks.nextRouter.onRouteChangeStart()

    expect(mocks.nprogress.start).toHaveBeenCalled()

    mocks.nextRouter.onRouteChangeComplete()

    expect(mocks.nprogress.done).toHaveBeenCalled()

    mocks.nextRouter.onRouteChangeError()

    expect(mocks.nprogress.done).toHaveBeenCalled()
  })
})
