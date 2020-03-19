import { Component } from 'react'
import Router from 'next/router'
import { NavBar, Icon } from 'antd-mobile'
import { apiBaseUrl, getPageTitle, getInitList } from '../../../utils'
import Layout from '../../../components/mobile/Layout'
import ScrollList from '../../../components/mobile/ScrollList'

class MobileTopicPage extends Component {
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

export async function getServerSideProps ({ params }) {
  const topic = params.name || ''
  const title = getPageTitle(topic)
  const apiUrl = `${apiBaseUrl}data/${encodeURIComponent(title)}/20`

  const initList = await getInitList(apiUrl)

  return {
    props: {
      title,
      apiUrl,
      initList
    }
  }
}

export default MobileTopicPage
