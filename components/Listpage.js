import { Component } from 'react'
import { Provider } from 'mobx-react'
import MainList from './MainList'
import { apiBaseUrl, getPageTitle, getInitList } from '../utils'

export default class ListPage extends Component {
  static async getInitialProps ({ query }) {
    const topic = query.name || ''
    const title = getPageTitle(topic)
    const apiPath = title === '首页' ? 'all' : title
    const apiUrl = `${apiBaseUrl}data/${encodeURIComponent(apiPath)}/20`

    const initList = await getInitList(apiUrl)

    return {
      title,
      apiUrl,
      initList
    }
  }

  render () {
    const { props } = this

    return (
      <Provider store={this.store}>
        <MainList title={props.title} apiUrl={props.apiUrl}></MainList>
      </Provider>
    )
  }
}
