import React from 'react'
import Layout from '../components/Layout'
import NormalList from '../components/NormalList'
import { Tabs } from 'antd'

export default class DayPage extends React.Component {
  static async getInitialProps ({query}) {
    const { date } = query
    const year = date.slice(0, 4)
    const month = date.slice(5, 7)
    const day = date.slice(8, 10)

    const res = await fetch(`http://gank.io/api/day/${year}/${month}/${day}`)
    const json = await res.json()

    return { list: json.results, category: json.category }
  }

  constructor (props) {
    super(props)
  }

  render () {
    const { list, category } = this.props

    return (
      <Layout title="今日数据">
        <Tabs defaultActiveKey={category[0]} tabPosition="left">
          {
            category.map(item =>
              <Tabs.TabPane tab={item} key={item}>
                <NormalList list={list[item]}></NormalList>
              </Tabs.TabPane>
            )
          }
        </Tabs>
      </Layout>
    )
  }
}
