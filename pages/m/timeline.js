import React from 'react'
import Link from 'next/link'
import { Timeline } from 'antd'
import { NavBar, Icon } from 'antd-mobile'
import Layout from '../../mobileComponents/Layout'
import MenuBar from '../../mobileComponents/MenuBar'

export default class MobileTimeLinePage extends React.Component {
  static async getInitialProps ({ req }) {
    const language = req ? req.headers['accept-language'] : navigator.language

    const res = await fetch('https://gank.io/api/day/history')
    const json = await res.json()

    return { timeline: json.results, language }
  }

  constructor (props) {
    super(props)

    this.state = {
      listHeight: 1000
    }
  }

  async componentDidMount () {
    const height = document.documentElement.clientHeight - 95

    this.setState({
      listHeight: height
    })
  }

  render () {
    const {
      timeline,
      language,
      url: { pathname }
    } = this.props

    const { listHeight } = this.state

    return (
      <div>
        <Layout language={language}>
          <MenuBar
            pathname={pathname}
          >
            <NavBar
              mode='light'
            >
              时间轴
            </NavBar>
            <div style={{ height: listHeight, overflow: 'scroll', overflowScrolling: "touch", WebkitOverflowScrolling: "touch" }}>
              <Timeline>
                {
                  timeline.map(item => <Timeline.Item key={item}><Link href={{ pathname: '/m/day', query: { date: item } }}><a>{item}</a></Link></Timeline.Item>)
                }
              </Timeline>
            </div>
          </MenuBar>
        </Layout>
        <style global jsx>{`
          .ant-timeline {
            list-style: none;
            margin: 0;
            padding: 20px;
          }
          .ant-timeline-item {
            position: relative;
            padding: 0 0 12px;
            list-style: none;
            margin: 0;
          }
          .ant-timeline-item-tail {
            position: absolute;
            left: 5px;
            top: 0;
            height: 100%;
            border-left: 2px solid #e9e9e9;
          }
          .ant-timeline-item-pending .ant-timeline-item-tail {
            display: none;
          }
          .ant-timeline-item-head {
            position: absolute;
            width: 12px;
            height: 12px;
            background-color: #fff;
            border-radius: 100px;
            border: 2px solid transparent;
          }
          .ant-timeline-item-head-blue {
            border-color: #108ee9;
            color: #108ee9;
          }
          .ant-timeline-item-head-red {
            border-color: #f04134;
            color: #f04134;
          }
          .ant-timeline-item-head-green {
            border-color: #00a854;
            color: #00a854;
          }
          .ant-timeline-item-head-custom {
            position: absolute;
            text-align: center;
            width: 40px;
            left: -14px;
            line-height: 1;
            margin-top: 6px;
            border: 0;
            height: auto;
            border-radius: 0;
            padding: 3px 0;
            font-size: 14px;
            -webkit-transform: translateY(-50%);
                -ms-transform: translateY(-50%);
                    transform: translateY(-50%);
          }
          .ant-timeline-item-content {
            padding: 0 0 10px 24px;
            font-size: 14px;
            position: relative;
            top: -3px;
          }
          .ant-timeline-item-last .ant-timeline-item-tail {
            border-left: 2px dotted #e9e9e9;
            display: none;
          }
          .ant-timeline-item-last .ant-timeline-item-content {
            min-height: 48px;
          }
          .ant-timeline.ant-timeline-pending .ant-timeline-item-last .ant-timeline-item-tail {
            display: block;
          }
        `}</style>
      </div>
    )
  }
}
