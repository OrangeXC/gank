import React, { Component } from 'react'
import Router from 'next/router'
import { TabBar, Icon } from 'antd-mobile'

export default class MenuBar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      tabHeight: '100vh'
    }
  }

  async componentDidMount () {
    const height = document.documentElement.clientHeight

    this.setState({
      tabHeight: height
    })
  }

  render () {
    const {
      pathname,
      children
    } = this.props

    return (
      <div>
        <TabBar>
          {tabBarData.map(({ title, icon, selectedIcon, link, dot, component: Component }) => (
            <TabBar.Item
              key={link}
              title={title}
              icon={icon}
              selectedIcon={selectedIcon}
              selected={pathname === link || pathname === `/m${link}` || pathname === `${link}/`}
              onPress={() => Router.push(link)}
            >
              {children}
            </TabBar.Item>
          ))}
        </TabBar>
        <style jsx global>{`
          .am-tab-bar {
            height: ${this.state.tabHeight}
          }

          .am-tab-bar-item {
            padding-top: 45px;
          }
        `}</style>
      </div>
    )
  }
}

const tabBarData = [
  {
    title: '主页',
    icon: <div style={{
      width: '22px',
      height: '22px',
      background: 'url(/static/icon/home.svg) center center /  21px 21px no-repeat' }}
    />,
    selectedIcon: <div style={{
      width: '22px',
      height: '22px',
      background: 'url(/static/icon/home_active.svg) center center /  21px 21px no-repeat' }}
    />,
    link: '/m'
  },
  {
    title: '时间轴',
    icon: <div style={{
      width: '22px',
      height: '22px',
      background: 'url(/static/icon/timeline.svg) center center /  21px 21px no-repeat' }}
    />,
    selectedIcon: <div style={{
      width: '22px',
      height: '22px',
      background: 'url(/static/icon/timeline_active.svg) center center /  21px 21px no-repeat' }}
    />,
    link: '/m/timeline'
  },
  {
    title: '发布',
    icon: <div style={{
      width: '22px',
      height: '22px',
      background: 'url(/static/icon/upload.svg) center center /  21px 21px no-repeat' }}
    />,
    selectedIcon: <div style={{
      width: '22px',
      height: '22px',
      background: 'url(/static/icon/upload_active.svg) center center /  21px 21px no-repeat' }}
    />,
    link: '/m/upload'
  }
]
