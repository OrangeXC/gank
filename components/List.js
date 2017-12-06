import React from 'react'
import Link from 'next/link'
import Layout from './Layout'
import ListItem from './ListItem'
import { Card, Alert } from 'antd'
import { inject, observer } from 'mobx-react'

@inject('store') @observer
export default class List extends React.Component {
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
    if (document.documentElement.offsetHeight + document.documentElement.scrollTop > document.documentElement.scrollHeight - 50) {
      this.handleLoadMore()
    }
  }

  async handleLoadMore () {
    this.setState((prevState) => ({
      currentPage: prevState.currentPage + 1
    }))

    const currentPage = this.state.currentPage
    const apiUrl = this.props.apiUrl

    const res = await fetch(`${apiUrl}${currentPage}`)
    const json = await res.json()

    if (json.results && json.results.length) {
      this.props.store.loadMoreList(json.results)
    } else {
      this.setState(() => ({
        hasMore: false
      }))
    }
  }

  render () {
    return (
      <Layout title={this.props.title}>
        {this.props.store.list.map((item) =>
          <ListItem item={item} key={item._id}></ListItem>
        )}
        {
          this.state.hasMore
            ? (<Card loading bordered={false} style={{ width: '100%' }}>loading card</Card>)
            : (<Alert message="全部列表都在这，没有更多了~" type="info" showIcon />)
        }
      </Layout>
    )
  }
}
