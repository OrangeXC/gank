import React from 'react'
import ListItem from '../components/ListItem'
import Layout from '../components/Layout'
import { Input, Alert, Card, message } from 'antd'
const { Search } = Input

export default class SearchPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      list: [],
      hasSearch: false
    }
  }

  handleLoadingShow () {
    this.setState((preState) => ({
      hasSearch: !preState.hasSearch
    }))
  }

  async handleSearch (val) {
    if (!val) {
      this.setState(() => ({
        list: []
      }))

      message.info(`搜索内容不能为空`)

      return
    }

    this.handleLoadingShow()

    const res = await fetch(`https://gank.io/api/search/query/${val}/category/all/count/50/page/1`)
    const { count, results } = await res.json()

    if (count) {
      this.setState(() => ({
        list: results
      }))
    } else {
      this.setState(() => ({
        list: []
      }))

      message.warning(`未找到关键字为（${val}）的数据`)
    }

    this.handleLoadingShow()
  }

  render () {
    return (
      <Layout title="搜索">
        <Search
          placeholder="input search text"
          style={{ width: 600, margin: '0 auto 50px', display: 'block' }}
          size="large"
          onSearch={value => this.handleSearch(value)}
        />
        {
          this.state.hasSearch
            ? (<Card loading bordered={false} style={{ width: '100%' }}>loading card</Card>)
            : (this.state.list.map((item, index) => <ListItem item={item} key={index}></ListItem>))
        }
      </Layout>
    )
  }
}
