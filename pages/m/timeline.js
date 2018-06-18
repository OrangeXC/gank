import React from 'react'
import Link from 'next/link'
import { NavBar, List, ListView } from 'antd-mobile'
import Layout from '../../mobileComponents/Layout'
import MenuBar from '../../mobileComponents/MenuBar'

const { Item } = List

export default class MobileTimeLinePage extends React.Component {
  static async getInitialProps ({ req }) {
    const res = await fetch('https://gank.io/api/day/history')
    const json = await res.json()

    return { timeline: json.results }
  }

  constructor (props) {
    super(props)

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    }).cloneWithRows(props.timeline)

    this.state = {
      dataSource,
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
      url: { pathname }
    } = this.props

    const {
      dataSource,
      listHeight
    } = this.state

    return (
      <div>
        <Layout>
          <MenuBar
            pathname={pathname}
          >
            <NavBar
              mode='light'
            >
              时间轴
            </NavBar>
            <ListView
              dataSource={dataSource}
              renderRow={rowData => (<Link href={{ pathname: '/m/day', query: { date: rowData } }}><Item arrow="horizontal">{rowData}</Item></Link>)}
              style={{
                height: listHeight,
                overflow: 'scroll'
              }}
              initialListSize={30}
              pageSize={30}
            />
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
