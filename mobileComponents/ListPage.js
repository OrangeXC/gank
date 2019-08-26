import { Component } from 'react'
import Router from 'next/router'
import { NavBar, Icon } from 'antd-mobile'
import { getPageTitle, getInitList } from '../utils'
import Layout from './Layout'
import ScrollList from './ScrollList'

export default class MobileListPage extends Component {
  static async getInitialProps ({ pathname }) {
    const title = getPageTitle(pathname.slice(2))
    const apiUrl = `http://gank.io/api/data/${encodeURIComponent(title)}/20`

    const initList = await getInitList(apiUrl)

    return {
      title,
      apiUrl,
      initList
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      listHeight: 1000
    }
  }

  componentDidMount () {
    const height = document.documentElement.clientHeight - 45

    this.setState({
      listHeight: height
    })
  }

  render () {
    const {
      title,
      apiUrl,
      initList
    } = this.props

    return (
      <Layout>
        <div style={{ paddingTop: 45 }}>
          <NavBar
            mode='light'
            icon={<Icon type="left" />}
            onLeftClick={() => Router.push('/m')}
          >
            {title}
          </NavBar>
          <ScrollList
            listHeight={this.state.listHeight}
            initList={initList}
            apiUrl={apiUrl}
          ></ScrollList>
        </div>
      </Layout>
    )
  }
}
