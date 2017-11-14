import React from 'react'
import Router from 'next/router'
import { NavBar, Icon, Tabs, WhiteSpace } from 'antd-mobile'
import Layout from '../../mobileComponents/Layout'
import CardItem from '../../mobileComponents/CardItem'

export default class MobileDayPage extends React.Component {
  static async getInitialProps ({ req, query }) {
    const language = req ? req.headers['accept-language'] : navigator.language

    const { date } = query
    const year = date.slice(0, 4)
    const month = date.slice(5, 7)
    const day = date.slice(8, 10)

    const res = await fetch(`https://gank.io/api/day/${year}/${month}/${day}`)
    const json = await res.json()

    const tabs = json.category.map(item => {
      let listItem = {
        title: item,
        list: json.results[item]
      }

      return listItem
    })

    return { date, tabs, language }
  }

  constructor (props) {
    super(props)

    this.state = {
      listHeight: 300
    }
  }

  componentDidMount () {
    const height = document.documentElement.clientHeight - 88.5

    this.setState({
      listHeight: height
    })
  }

  renderContent = tab =>
    (<div style={{ height: this.state.listHeight }}>
      {tab.list.map(item =>
        <div key={item._id}>
          {CardItem(item)}
          <WhiteSpace />
        </div>
      )}
    </div>)

  render () {
    const {
      date,
      tabs,
      language
    } = this.props

    return (
      <Layout language={language}>
        <div style={{ marginTop: 45 }}>
          <NavBar
            mode='dark'
            icon={<Icon type="left" />}
            onLeftClick={() => Router.push('/m/timeline')}
          >
            {date}
          </NavBar>
          <Tabs tabs={tabs}>
            {this.renderContent}
          </Tabs>
        </div>
      </Layout>
    )
  }
}
