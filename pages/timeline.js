import React from 'react'
import Link from 'next/link'
import { Tabs, Card, Col, Row } from 'antd'
import Layout from './../components/Layout'

const TabPane = Tabs.TabPane

export default class TimeLinePage extends React.Component {
  static async getInitialProps (req) {
    const res = await fetch('https://gank.io/api/day/history')
    const json = await res.json()

    let years = []

    json.results.forEach(element => {
      if (years.indexOf(element.slice(0, 4)) === -1) years.push(element.slice(0, 4))
    })

    return { timeline: json.results, years }
  }

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Layout title="时间轴">
        <Tabs defaultActiveKey={this.props.years[0]}>
          {
            this.props.years.map(year =>
              <TabPane tab={year} key={year}>
                <Row gutter={16}>
                  {
                    this.props.timeline.filter(item => item.indexOf(year) > -1).map(item =>
                      <Col span={6} key={item}>
                        <div style={{marginTop: 8, marginBottom: 8}}>
                          <Card title={item} extra={<Link href={{ pathname: '/day', query: { date: item } }}><a>More</a></Link>}></Card>
                        </div>
                      </Col>
                    )
                  }
                </Row>
              </TabPane>
            )
          }
        </Tabs>
      </Layout>
    )
  }
}
