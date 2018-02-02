import React from 'react'
import MainList from '../components/MainList'
import { Provider } from 'mobx-react'
import { initStore } from '../store'

export default class ExpandPage extends React.Component {
  static async getInitialProps (req) {
    const isServer = !!req
    const store = initStore(isServer)

    const res = await fetch('https://gank.io/api/data/%e6%8b%93%e5%b1%95%e8%b5%84%e6%ba%90/20/1')
    const json = await res.json()

    return { list: json.results, isServer }
  }

  constructor (props) {
    super(props)

    this.store = initStore(props.isServer, props.list)
  }

  render () {
    return (
      <Provider store={this.store}>
        <MainList title="拓展资源" apiUrl="https://gank.io/api/data/%e6%8b%93%e5%b1%95%e8%b5%84%e6%ba%90/20/"></MainList>
      </Provider>
    )
  }
}
