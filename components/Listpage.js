import { Component } from 'react'
import { Provider } from 'mobx-react'
import MainList from './MainList'
import { getPageTitle, getInitList } from '../utils'

export default class ListPage extends Component {
  static async getInitialProps ({ pathname }) {
    const title = getPageTitle(pathname)
    const path = title === '首页' ? 'all' : title
    const apiUrl = `http://gank.io/api/data/${encodeURIComponent(path)}/20`

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
