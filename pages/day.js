import Layout from '../components/Layout'
import NormalList from '../components/NormalList'
import { apiBaseUrl } from '../utils'
import { Tabs } from 'antd'

function DayPage ({ list, category }) {
  return (
    <Layout title="今日数据">
      <Tabs defaultActiveKey={category[0]} tabPosition="left">
        {
          category.map(item =>
            <Tabs.TabPane tab={item} key={item}>
              <NormalList list={list[item]}></NormalList>
            </Tabs.TabPane>
          )
        }
      </Tabs>
    </Layout>
  )
}

export async function getServerSideProps ({ query }) {
  const { date } = query
  const year = date.slice(0, 4)
  const month = date.slice(5, 7)
  const day = date.slice(8, 10)

  const res = await fetch(`${apiBaseUrl}day/${year}/${month}/${day}`)
  const { results, category } = await res.json()

  return {
    props: {
      list: results,
      category
    }
  }
}

export default DayPage
