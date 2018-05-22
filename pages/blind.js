import React from 'react'
import MainList from '../components/MainList'
import { Provider } from 'mobx-react'
import { initStore } from '../store'

export default class AppPage extends React.Component {
  static async getInitialProps (req) {
    const isServer = !!req
    const store = initStore(isServer)

    const res = await fetch('https://gank.io/api/data/%E7%9E%8E%E6%8E%A8%E8%8D%90/20/1')
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
        <MainList title="App" apiUrl="https://gank.io/api/data/%E7%9E%8E%E6%8E%A8%E8%8D%90/20/"></MainList>
      </Provider>
    )
  }
}
