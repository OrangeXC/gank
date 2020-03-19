import React from 'react'
import Link from 'next/link'
import { Tabs, Card, Col, Row } from 'antd'
import Layout from '../components/Layout'
import { apiBaseUrl } from '../utils'

const { TabPane } = Tabs

function TimeLinePage ({ timeline, years }) {
  return (
    <Layout title="时间轴">
      <Tabs defaultActiveKey={years[0]}>
        {
          years.map(year =>
            <TabPane tab={year} key={year}>
              <Row gutter={16}>
                {
                  timeline
                    .filter(item => item.includes(year))
                    .map(item => cards(item))
                }
              </Row>
            </TabPane>
          )
        }
      </Tabs>
    </Layout>
  )
}

function cards (item) {
  return (
    <Col span={6} key={item}>
      <div style={{marginTop: 8, marginBottom: 8}}>
        <Card
          title={item}
          extra={
            <Link href={{ pathname: '/day', query: { date: item } }}>
              <a>More</a>
            </Link>
          }
          bodyStyle={{ padding: 0 }}>
        </Card>
      </div>
    </Col>
  )
}


export async function getServerSideProps () {
  const res = await fetch(`${apiBaseUrl}day/history`)
  const { results } = await res.json()

  let years = []

  results.forEach(element => {
    if (years.indexOf(element.slice(0, 4)) === -1) years.push(element.slice(0, 4))
  })

  return {
    props: {
      timeline: results,
      years
    }
  }
}

export default TimeLinePage
