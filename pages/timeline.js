import React from 'react'
import Link from 'next/link'
import { Timeline } from 'antd'
import Layout from './../components/Layout'

export default class TimeLinePage extends React.Component {
  static async getInitialProps (req) {
    const res = await fetch('https://gank.io/api/day/history')
    const json = await res.json()

    return { timeline: json.results }
  }

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Layout title="时间轴">
        <Timeline style={{margin: '0 auto'}}>
          {
            this.props.timeline.map(item => <Timeline.Item key={item}><Link href={{ pathname: '/day', query: { date: item } }}><a>{item}</a></Link></Timeline.Item>)
          }
        </Timeline>
      </Layout>
    )
  }
}
