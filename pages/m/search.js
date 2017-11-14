import React from 'react'
import Router from 'next/router'
import { NavBar, SearchBar, Button, Icon, WhiteSpace, Toast } from 'antd-mobile'
import CardItem from '../../mobileComponents/CardItem'
import Layout from '../../mobileComponents/Layout'

export default class MobileSearchPage extends React.Component {
  static async getInitialProps ({ req }) {
    const language = req ? req.headers['accept-language'] : navigator.language

    return { language }
  }

  constructor (props) {
    super(props)

    this.state = {
      value: '',
      list: [],
      listHeight: 1000
    }
  }

  componentDidMount() {
    this.autoFocusInst.focus()

    const height = document.documentElement.clientHeight - 89

    this.setState({
      listHeight: height
    })
  }

  async handleSearch (val) {
    if (!val) {
      this.setState(() => ({
        list: []
      }))

      Toast.fail('搜索内容不能为空！', 2)

      return
    }

    Toast.loading('Loading...', 10)

    const res = await fetch(`https://gank.io/api/search/query/${val}/category/all/count/50/page/1`)
    const { count, results } = await res.json()

    if (count) {
      this.setState(() => ({
        list: results
      }))

      Toast.hide()
    } else {
      this.setState(() => ({
        list: []
      }))

      await Toast.fail(`未找到关键字为（${val}）的数据`, 2)
    }
  }

  render () {
    const { language } = this.props

    return (
      <Layout language={language}>
        <div style={{ paddingTop: 45 }}>
          <NavBar
            mode='dark'
            icon={<Icon type="left" />}
            onLeftClick={() => Router.push('/m')}
          >
            搜索
          </NavBar>
          <SearchBar
            placeholder="请输入搜索内容"
            ref={ref => this.autoFocusInst = ref}
            onSubmit={value => this.handleSearch(value)}
          />
          <div style={{ height: this.state.listHeight, overflow: "auto" }}>
            {
              this.state.list.map((item, index) =>
                <div key={index}>
                  {CardItem(item)}
                  <WhiteSpace />
                </div>
              )
            }
          </div>
        </div>
      </Layout>
    )
  }
}
