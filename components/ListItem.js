import React from 'react'
import { Card, Tag, Icon } from 'antd'

export default class ListItem extends React.Component {
  constructor (props) {
    super(props)
  }

  setTagColor (type) {
    let color

    switch (type) {
      case 'Android':
        color = 'green'
        break

      case 'iOS':
        color = 'purple'
        break

      case '休息视频':
        color = 'cyan'
        break

      case '福利':
        color = 'pink'
        break

      case '拓展资源':
        color = 'red'
        break

      case '前端':
        color = 'orange'
        break

      case 'App':
        color = 'blue'
        break

      default:
        color = '#bbb'
        break
    }

    return color
  }

  render () {
    const item = this.props.item

    return (
      <Card style={{ width: '100%', marginBottom: 20 }}
            title={item.desc}
            extra={<a href={item.url} target="_blank">More</a>}>
        <Icon type="user" />
        <span style={{ marginRight: 20 }}> { item.who ? item.who : '未知' }</span>
        <Icon type="clock-circle-o" />
        <span style={{ marginRight: 20 }}> { item.publishedAt.slice(0, 10) }</span>
        <Tag color={this.setTagColor(item.type)}>{item.type}</Tag>
      </Card>
    )
  }
}
