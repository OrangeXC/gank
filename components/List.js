import React from 'react'
import Link from 'next/link'
import Layout from './Layout'
import ListItem from './ListItem'
import { Card, Alert } from 'antd'
import { inject, observer } from 'mobx-react'
import Masonry from 'react-masonry-component'

const Meta = Card.Meta

@inject('store') @observer
export default class List extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      currentPage: 1,
      hasMore: true,
      showImages: false
    }

    this.handleScroll = this.handleScroll.bind(this)
    this.handleLoadMore = this.handleLoadMore.bind(this)
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll)
    this.handleLayoutComplete()
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

  handleLayoutComplete () {
    this.setState({
      showImages: true
    })
  }

  render () {
    let list = this.props.store.list

    const childNormalElements = list.map(item =>
      <ListItem item={item} key={item._id}></ListItem>
    )

    const childImageElements = list.map(element =>
      <div style={{ width: '25%', boxSizing: 'border-box', padding: 20 }} key={element._id}>
        <Card cover={<img src={`${element.url}?imageView2/2/w/436`} />}>
          <Meta
            title={element.desc}
          />
        </Card>
      </div>
    )

    return (
      <Layout title={this.props.title}>
        {
          this.props.title === '福利'
            ? <div style={{ opacity: this.state.showImages ? '1' : '0', transition: 'opacity 0.5s linear' }}>
                <Masonry>
                  {childImageElements}
                </Masonry>
              </div>
            : childNormalElements
        }

        {
          this.state.hasMore
            ? (<Card loading bordered={false} style={{ width: '100%' }}>loading card</Card>)
            : (<Alert message="全部列表都在这，没有更多了~" type="info" showIcon />)
        }
      </Layout>
    )
  }
}
