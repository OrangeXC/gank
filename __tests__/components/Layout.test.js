import { shallow } from 'enzyme'
import React from 'react'
import Layout from '../../components/Layout'
import ActiveLink from '../../components/ActiveLink'
import { Menu } from 'antd'

describe('Layout', () => {
  it('render', () => {
    const wrapper = shallow(<Layout title="前端" />)

    expect(wrapper.find('title').text()).toEqual('前端 - Gank')

    const links = wrapper.find(ActiveLink)

    expect(links).toHaveLength(10)
    expect(links.at(0).text()).toEqual('<withRouter(ActiveLink) />')

    const menu = wrapper.find(Menu)

    expect(menu.prop('style')).toEqual({
      lineHeight: '64px',
      float: 'left'
    })
  })
})
