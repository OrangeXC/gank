import { Component } from 'react'
import Router from 'next/router'
import { TabBar } from 'antd-mobile'

const tabs = [{
  title: '主页',
  name: 'home'
}, {
  title: '时间轴',
  name: 'timeline'
}, {
  title: '发布',
  name: 'upload'
}]

const tabData = tabs.map(({ title, name }) => ({
  title,
  icon: <div style={{
    width: '22px',
    height: '22px',
    background: `url(/static/icon/${name}.svg) center center /  21px 21px no-repeat` }}
  />,
  selectedIcon: <div style={{
    width: '22px',
    height: '22px',
    background: `url(/static/icon/${name}_active.svg) center center /  21px 21px no-repeat` }}
  />,
  link: name === 'home' ? '/m' : `/m/${name}`
}))

class MenuBar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      tabHeight: '100vh'
    }
  }

  async componentDidMount () {
    const height = `${document.documentElement.clientHeight}px`

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
          {
            tabData.map(({ title, icon, selectedIcon, link }) => (
              <TabBar.Item
                key={link}
                title={title}
                icon={icon}
                selectedIcon={selectedIcon}
                selected={pathname === link || pathname === `/m${link}` || pathname === `${link}/`}
                onPress={() => Router.push(link).then(() => window.scrollTo(0, 0))}
              >
                {children}
              </TabBar.Item>
            ))
          }
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

export default MenuBar
