import React, { Component } from 'react'
import Router from 'next/router'
import { TabBar, Icon } from 'antd-mobile'

export default class MenuBar extends Component {
  render () {
    const {
      pathname,
      children
    } = this.props

    return (
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
