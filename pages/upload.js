import React from 'react'
import {
  Form, Input, Select, Switch, Button, message, Alert
} from 'antd'
import Layout from '../components/Layout'
import { apiBaseUrl } from '../utils'

const FormItem = Form.Item
const Option = Select.Option

class uploadForm extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      submitLoading: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()

    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        this.setState({ submitLoading: true })

        let strList = []

        Object.keys(values).forEach(item => {
          strList.push(`${item}=${values[item]}`)
        })

        const res = await fetch(`${apiBaseUrl}add2gank`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: strList.join('&')
        })

        const json = await res.json()

        if (json.error) {
          message.error(json.msg)
        } else {
          message.success(json.msg)
        }

        this.setState({ submitLoading: false })
      }
    })
  }

  checkUrl (rule, value, callback) {
    if (value) {
      this.validUrl(value)
      ? callback()
      : callback('请输入正确的url地址!')
    } else {
      callback()
    }
  }

  validUrl (str) {
    const pattern = /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i

    if(pattern.test(str)) {
      return true
    }

    return false
  }

  render () {
    const { getFieldDecorator } = this.props.form

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      }
    }

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        }
      }
    }

    const types = ['Android', 'iOS', '休息视频', '福利', '拓展资源', '前端', '瞎推荐', 'App']

    return (
      <Layout title="发布">
        <Alert
          message="提示"
          description="本项目 api 由 gank（干货集中营）提供，本着对 api 提供者负责的原则，此提交表单默认是 debug 模式，非正式提交（但走的是真实接口，可控制台查看），如果您认为你的链接的确是高质量的干活，手动将 “测试数据” 设置为否即可，并且欢迎您提供优质的干货分享给大家."
          type="info"
          style={{ marginBottom: 30 }}
          showIcon
        />
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="链接"
            hasFeedback
          >
            {getFieldDecorator('url', {
              rules: [{
                required: true, message: '请输入想要提交的网页地址!',
              }, {
                validator: this.checkUrl
              }]
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="标题"
            hasFeedback
          >
            {getFieldDecorator('desc', {
              rules: [{
                required: true, message: '请输入标题!',
              }]
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="昵称"
            hasFeedback
          >
            {getFieldDecorator('who', {
              rules: [{
                required: true, message: '请输入昵称!',
              }]
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="类型"
          >
            {getFieldDecorator('type', {
              rules: [{
                required: true
              }],
              initialValue: '前端'
            })(
              <Select>
                {types.map(item => <Option value={item} key={item}>{ item }</Option>)}
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="测试数据"
          >
            {getFieldDecorator('debug', {
              initialValue: true
            })(
              <Switch defaultChecked={true} checkedChildren="是" unCheckedChildren="否" />
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button
              type="primary"
              loading={this.state.submitLoading}
              htmlType="submit"
            >
              提交干货
            </Button>
          </FormItem>
        </Form>
      </Layout>
    )
  }
}

export default Form.create()(uploadForm)
