import { Component } from 'react'
import ReactDOM from 'react-dom'
import Router from 'next/router'
import {
  WhiteSpace, NavBar, Icon, Grid
} from 'antd-mobile'
import { getInitList } from '../../utils'
import Layout from '../../mobileComponents/Layout'
import MenuBar from '../../mobileComponents/MenuBar'
import ScrollList from '../../mobileComponents/ScrollList'

const gridMenu = [
  {
    icon: '/icon/html.svg',
    text: '前端',
    link: '/m/fe'
  }, {
    icon: '/icon/android.svg',
    text: '安卓',
    link: '/m/android'
  }, {
    icon: '/icon/ios.svg',
    text: 'iOS',
    link: '/m/ios'
  }, {
    icon: '/icon/app.svg',
    text: 'App',
    link: '/m/app'
  }, {
    icon: '/icon/expand.svg',
    text: '拓展资源',
    link: '/m/expand'
  }, {
    icon: '/icon/video.svg',
    text: '休息视频',
    link: '/m/videos'
  }, {
    icon: '/icon/blind.svg',
    text: '瞎推荐',
    link: '/m/blind'
  }, {
    icon: '/icon/welfare.svg',
    text: '福利',
    link: '/m/welfare'
  }
]

export default class MobileHome extends Component {
  static async getInitialProps () {
    const apiUrl = 'https://gank.io/api/data/all/20'

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
            leftContent={<img width="22px" src="/icon/github.svg"/>}
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
