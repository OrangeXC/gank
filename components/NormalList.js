import { List, Icon } from 'antd'
import Router from 'next/router'
import { getPageTopic } from '../utils'

const { Item } = List

const IconText = ({ type, text, href = '' }) => (
  <span onClick={() => href && Router.push(href).then(() => window.scrollTo(0, 0))}>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
)

const listImageWrapStyle = {
  width: 272,
  height: 168,
  textAlign: 'center',
  lineHeight: '168px',
  backgroundColor: 'rgb(234, 237, 242)'
}

const listImageStyle = {
  maxWidth: '100%',
  maxHeight: '100%'
}

export default (props) => (
  <div>
    <List
      itemLayout="vertical"
      size="large"
      bordered
      dataSource={props.list}
      renderItem={item => (
        <Item
          key={item._id}
          actions={[
            <IconText type="user" text={item.who ? item.who : '未知'} />,
            <IconText
              type="clock-circle-o"
              text={item.publishedAt.slice(0, 10)}
              href={`/day?date=${item.publishedAt.slice(0, 10)}`}
            />,
            <IconText
              type="tag-o"
              text={item.type}
              href={`/topics/${getPageTopic(item.type)}`}
            />
          ]}
          extra={item.images &&
            <div style={listImageWrapStyle}>
              <img
                style={listImageStyle}
                alt="cover"
                src={item.images[0]}
                onError={(e) => e.target.src='/static/icon/image.svg'}
              />
            </div>
          }
        >
          <h4 className="ant-list-item-meta-title">
            <a href={item.url} target="_blank">{item.desc}</a>
          </h4>
        </Item>
      )}
    />

    <style global jsx>{`
      .ant-list-vertical .ant-list-item-main {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .ant-list-vertical .ant-list-item-action {
        margin-left: 0;
      }
  `}</style>
  </div>
)
