import React from 'react'
import MainList from '../components/MainList'
import { Provider } from 'mobx-react'
import { initStore } from '../store'

export default class WelfarePage extends React.Component {
  static async getInitialProps (req) {
    const isServer = !!req
    const store = initStore(isServer)

    const res = await fetch('https://gank.io/api/data/%e7%a6%8f%e5%88%a9/20/1')
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
        <MainList title="福利" apiUrl="https://gank.io/api/data/%e7%a6%8f%e5%88%a9/20/"></MainList>
      </Provider>
    )
  }
}
