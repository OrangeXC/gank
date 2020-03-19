import { Component } from 'react'
import { Input, message } from 'antd'
import Layout from '../components/Layout'
import NormalList from '../components/NormalList'
import ListSpin from '../components/ListSpin'
import { apiBaseUrl } from '../utils'

const { Search } = Input

const searchStyle = {
  marginBottom: '50px'
}

class SearchPage extends Component {
  constructor () {
    super()

    this.state = {
      list: [],
      searching: false
    }
  }

  handleLoadingShow () {
    this.setState((preState) => ({
      searching: !preState.searching
    }))
  }

  async handleSearch (val) {
    if (!val) {
      this.setState({
        list: []
      })

      message.info(`搜索内容不能为空`)

      return
    }

    this.handleLoadingShow()

    const url = `${apiBaseUrl}search/query/${val}/category/all/count/50/page/1`
    const res = await fetch(url)
    const { count, results } = await res.json()

    if (count) {
      this.setState({
        list: results
      })
    } else {
      this.setState({
        list: []
      })

      message.warning(`未找到关键字为（${val}）的数据`)
    }

    this.handleLoadingShow()
  }

  render () {
    return (
      <Layout title="搜索">
        <Search
          placeholder="input search text"
          style={searchStyle}
          size="large"
          onSearch={value => this.handleSearch(value)}
        />

        {
          this.state.searching
            ? <ListSpin></ListSpin>
            : <NormalList list={this.state.list}></NormalList>
        }
      </Layout>
    )
  }
}

export default SearchPage
