import { Card, Tag, Flex } from 'antd-mobile'

const flexItemStyle = {
  flex: '0 0 auto',
  width: 100,
  textAlign: 'center'
}

const flexItemImageStyle = {
  maxWidth: 100,
  maxHeight: 100
}

const CardItem = rowData => (
  <div>
    {
      rowData.type !== '福利' ? (
        <Card full onClick={() => {window.open(rowData.url)}}>
          <Card.Body>
            <Flex align="start">
              {
                rowData.images &&
                  <Flex.Item style={flexItemStyle}>
                    <img
                      style={flexItemImageStyle}
                      src={rowData.images[0]}
                      onError={(e) => e.target.src='/static/icon/image.svg'}
                    />
                  </Flex.Item>
              }
              <Flex.Item>
                <div>{rowData.desc}</div>
              </Flex.Item>
            </Flex>
          </Card.Body>
          <Card.Footer
            content={
              <div>
                {rowData.who ? rowData.who : ''}
                {rowData.publishedAt.slice(0, 10)}
              </div>
            }
            extra={<Tag small>{rowData.type}</Tag>}
          />
        </Card>
      ) : (
        <Card full>
          <Card.Body>
            <img
              style={{ maxWidth: '100%' }}
              src={rowData.url}
              onError={(e) => e.target.src='/static/icon/image.svg'}
            />
          </Card.Body>
          <Card.Footer content={<div>{rowData.publishedAt.slice(0, 10)}</div>} />
        </Card>
      )
    }
  </div>
)

export default CardItem
