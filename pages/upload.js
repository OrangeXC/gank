import { Component, createRef } from 'react'
import {
  Form, Input, Select, Switch, Button, message, Alert
} from 'antd'
import Layout from '../components/Layout'
import { apiBaseUrl } from '../utils'

const FormItem = Form.Item
const Option = Select.Option

class UploadForm extends Component {
  constructor () {
    super()

    this.state = {
      submitLoading: false
    }

    this.formRef = createRef()
    this.onFinish = this.onFinish.bind(this)
    this.onFinishFailed = this.onFinishFailed.bind(this)
  }

  async onFinish (values) {
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

      this.formRef.current.resetFields()
    }

    this.setState({ submitLoading: false })
  }

  onFinishFailed = ({ errorFields }) => {
    this.formRef.current.scrollToField(errorFields[0].name)
  }

  async checkUrl (rule, value) {
    if (value && !this.validUrl(value)) {
      throw new Error('请输入正确的url地址!')
    }
  }

  validUrl (str) {
    const pattern = /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i

    return !!pattern.test(str)
  }

  render () {
    const layout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      }
    }

    const tailLayout = {
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
        <Form
          {...layout}
          ref={this.formRef}
          name="upload"
          initialValues={{
            type: '前端',
            debug: true
          }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}>
          <FormItem
            label="链接"
            name="url"
            rules={[{
              required: true,
              message: '请输入想要提交的网页地址!'
            }, {
              validator: this.checkUrl.bind(this)
            }]}
            hasFeedback
          >
            <Input />
          </FormItem>
          <FormItem
            label="标题"
            name="desc"
            rules={[{
              required: true,
              message: '请输入标题!'
            }]}
            hasFeedback
          >
            <Input />
          </FormItem>
          <FormItem
            label="昵称"
            name="who"
            rules={[{
              required: true,
              message: '请输入昵称!'
            }]}
            hasFeedback
          >
            <Input />
          </FormItem>
          <FormItem
            label="类型"
            name="type"
            rules={[{
              required: true
            }]}
          >
            <Select>
              {types.map(item => <Option value={item} key={item}>{ item }</Option>)}
            </Select>
          </FormItem>
          <FormItem
            label="测试数据"
            name="debug"
            valuePropName="checked"
          >
            <Switch checkedChildren="是" unCheckedChildren="否" />
          </FormItem>
          <FormItem {...tailLayout}>
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

export default UploadForm
