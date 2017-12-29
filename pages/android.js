import React from 'react'
import List from '../components/List'
import { Provider } from 'mobx-react'
import { initStore } from '../store'

export default class AndroidPage extends React.Component {
  static async getInitialProps (req) {
    const isServer = !!req
    const store = initStore(isServer)

    const res = await fetch('https://gank.io/api/data/Android/20/1')
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
        <List title="Android" apiUrl="https://gank.io/api/data/Android/20/"></List>
      </Provider>
    )
  }
}
