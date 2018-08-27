import { Component } from 'react'
import Layout from './Layout'
import NormalList from './NormalList'
import MasonryList from './MasonryList'
import ListSpin from './ListSpin'
import { Alert } from 'antd'
import { inject, observer } from 'mobx-react'

@inject('store')
@observer
class MainList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      currentPage: 1,
      hasMore: true
    }

    this.handleScroll = this.handleScroll.bind(this)
    this.handleLoadMore = this.handleLoadMore.bind(this)
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll () {
    const scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop)

    if (
      document.documentElement.offsetHeight + scrollTop >
      document.documentElement.scrollHeight - 50
    ) {
      this.handleLoadMore()
    }
  }

  async handleLoadMore () {
    this.setState((prevState) => ({
      currentPage: prevState.currentPage + 1
    }))

    const currentPage = this.state.currentPage
    const apiUrl = this.props.apiUrl

    const res = await fetch(`${apiUrl}/${currentPage}`)
    const json = await res.json()

    if (Array.isArray(json.results) && json.results.length) {
      this.props.store.loadMoreList(json.results)
    } else {
      this.setState({
        hasMore: false
      })
    }
  }

  render () {
    const { list } = this.props.store

    return (
      <Layout title={this.props.title}>
        {
          this.props.title === '福利'
            ? <MasonryList list={list}></MasonryList>
            : <NormalList list={list}></NormalList>
        }

        {
          this.state.hasMore
            ? <ListSpin></ListSpin>
            : <Alert message="全部列表都在这，没有更多了~" type="info" showIcon />
        }
      </Layout>
    )
  }
}

export default MainList
