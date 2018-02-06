import React from 'react'
import { Card, Alert, Modal, List, Icon } from 'antd'
import Masonry from 'react-masonry-component'

export default class MasonryList extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      showImages: false,
      dialogImageVisible: false,
      largeImage: ''
    }
  }

  componentDidMount () {
    this.handleLayoutComplete()
  }

  handleLayoutComplete () {
    this.setState({
      showImages: true
    })
  }

  handleLargeImageShow (url) {
    this.setState({
      dialogImageVisible: true,
      largeImage: url
    })
  }

  handleLargeImageHide () {
    this.setState({
      dialogImageVisible: false
    })
  }

  render () {
    return (
      <div style={{ opacity: this.state.showImages ? '1' : '0', transition: 'opacity 0.5s linear' }}>
        <Masonry>
          {
            this.props.list.map(element =>
              <div
                style={{ width: '25%', boxSizing: 'border-box', padding: 20 }}
                key={element._id}
                onClick={() => this.handleLargeImageShow(element.url)}
              >
                <Card cover={<img src={`${element.url}?imageView2/2/w/436`} />} hoverable>
                  <Card.Meta
                    title={element.desc}
                  />
                </Card>
              </div>
            )
          }
        </Masonry>

        <Modal
          title="原图"
          visible={this.state.dialogImageVisible}
          wrapClassName="vertical-center-modal"
          footer={null}
          onCancel={() => this.handleLargeImageHide()}
        >
          <img style={{ maxWidth: '100%' }} src={this.state.largeImage} />
        </Modal>
      </div>
    )
  }
}