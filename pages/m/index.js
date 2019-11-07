import { Component } from 'react'
import ReactDOM from 'react-dom'
import Router from 'next/router'
import {
  WhiteSpace, NavBar, Icon, Grid
} from 'antd-mobile'
import Layout from '../../components/mobile/Layout'
import MenuBar from '../../components/mobile/MenuBar'
import ScrollList from '../../components/mobile/ScrollList'
import { apiBaseUrl, getInitList } from '../../utils'

const gridMenu = [
  {
    icon: '/static/icon/html.svg',
    text: '前端',
    link: '/m/topics/fe'
  }, {
    icon: '/static/icon/android.svg',
    text: '安卓',
    link: '/m/topics/android'
  }, {
    icon: '/static/icon/ios.svg',
    text: 'iOS',
    link: '/m/topics/ios'
  }, {
    icon: '/static/icon/app.svg',
    text: 'App',
    link: '/m/topics/app'
  }, {
    icon: '/static/icon/expand.svg',
    text: '拓展资源',
    link: '/m/topics/expand'
  }, {
    icon: '/static/icon/video.svg',
    text: '休息视频',
    link: '/m/topics/videos'
  }, {
    icon: '/static/icon/blind.svg',
    text: '瞎推荐',
    link: '/m/topics/blind'
  }, {
    icon: '/static/icon/welfare.svg',
    text: '福利',
    link: '/m/topics/welfare'
  }
]

export default class MobileHome extends Component {
  static async getInitialProps () {
    const apiUrl = `${apiBaseUrl}data/all/20`

    const initList = await getInitList(apiUrl)

    return { initList, apiUrl }
  }

  constructor (props) {
    super(props)

    this.state = {
      listHeight: 1000
    }
  }

  componentDidMount () {
    const height = document.documentElement.clientHeight - 113 -
      ReactDOM.findDOMNode(this.grid).getBoundingClientRect().height

    this.setState({
      listHeight: height
    })
  }

  render () {
    const {
      initList,
      apiUrl,
      url: { pathname }
    } = this.props

    return (
      <Layout>
        <MenuBar
          pathname={pathname}
        >
          <NavBar
            mode='light'
            leftContent={<img width="22px" src="/static/icon/github.svg"/>}
            onLeftClick={() => window.open('https://github.com/OrangeXC/gank')}
            rightContent={<Icon
              onClick={() =>
                Router
                  .push('/m/search')
                  .then(() => window.scrollTo(0, 0))}
                type='search'
            />}
          >
            主页
          </NavBar>
          <WhiteSpace />
          <Grid
            ref={el => this.grid = el}
            data={gridMenu}
            hasLine={false}
            onClick={(el) => Router.push(el.link)}
          />
          <WhiteSpace />
          <ScrollList
            listHeight={this.state.listHeight}
            initList={initList}
            apiUrl={apiUrl}
            listHeaderText="最新列表">
          </ScrollList>
        </MenuBar>
      </Layout>
    )
  }
}
