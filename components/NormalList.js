import { List, Icon } from 'antd'

export default function NormalList(props) {
  const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  )

  return (
    <List
      itemLayout="vertical"
      size="large"
      bordered
      dataSource={props.list}
      renderItem={item => (
        <List.Item
          key={item._id}
          actions={[
            <IconText type="user" text={ item.who ? item.who : '未知' } />,
            <IconText type="clock-circle-o" text={ item.publishedAt.slice(0, 10) } />,
            <IconText type="tag-o" text={item.type} />
          ]}
          extra={item.images &&
            <div style={{ width: 272, height: 168, textAlign: 'center', lineHeight: '168px', backgroundColor: 'rgb(234, 237, 242)' }}>
              <img
                style={{ maxWidth: '100%', maxHeight: '100%' }}
                alt="logo"
                src={`${item.images[0].replace(/^http:\/\//i, 'https://')}?imageView2/0/w/544`}
              />
            </div>
          }
        >
          <List.Item.Meta
            title={<a href={item.url} target="_blank">{item.desc}</a>}
          />
        </List.Item>
      )}
    />
  )
}
