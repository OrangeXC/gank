import { Card, Tag, Flex } from 'antd-mobile'

const CardItem = (rowData) => {
  return (
    <div>
      {
        rowData.type !== '福利'
          ? <Card full onClick={() => {window.open(rowData.url)}}>
              <Card.Body>
                <Flex align="start">
                  {rowData.images && <Flex.Item style={{ flex: '0 0 auto', width: 100, textAlign: 'center' }}><img style={{ maxWidth: 100, maxHeight: 100 }} src={`${rowData.images[0].replace(/^http:\/\//i, 'https://')}?imageView2/0/w/200/h/200`} /></Flex.Item>}
                  <Flex.Item><div>{rowData.desc}</div></Flex.Item>
                </Flex>
              </Card.Body>
              <Card.Footer content={<div>{rowData.who ? rowData.who : ''} {rowData.publishedAt.slice(0, 10)}</div>} extra={<Tag small>{rowData.type}</Tag>} />
            </Card>
          : <Card full>
              <Card.Body>
                <img style={{ maxWidth: '100%' }} src={`${rowData.url}?imageView2/2/w/750`} />
              </Card.Body>
              <Card.Footer content={<div>{rowData.publishedAt.slice(0, 10)}</div>} />
            </Card>
      }
    </div>
  )
}

export default CardItem
