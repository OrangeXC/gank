import { initStore } from '../../store'
import { Provider } from 'mobx-react'
import MainList from '../../components/MainList'
import {
  apiBaseUrl, getPageTitle, getInitList
} from '../../utils'

function TopicPage ({ title, apiUrl, initList }) {
  const store = initStore(initList)

  return (
    <Provider store={store}>
      <MainList title={title} apiUrl={apiUrl}></MainList>
    </Provider>
  )
}

export async function getServerSideProps ({ params }) {
  const title = getPageTitle(params.name)
  const apiUrl = `${apiBaseUrl}data/${encodeURIComponent(title)}/20`

  const initList = await getInitList(apiUrl)

  return {
    props: {
      title,
      apiUrl,
      initList
    }
  }
}

export default TopicPage
