import { Spin } from 'antd'

const spinStyle = {
  textAlign: 'center',
  marginBottom: '20px',
  padding: '30px 50px'
}

const ListSpin = () => (
  <div style={spinStyle}>
    <Spin size="large" />
  </div>
)

export default ListSpin
