import React from 'react'
import {
  NavBar, NoticeBar, List, InputItem, Picker,
  Switch, Button, Toast, WingBlank, WhiteSpace
} from 'antd-mobile'
import { createForm } from 'rc-form'
import MenuBar from '../../components/mobile/MenuBar'
import Layout from '../../components/mobile/Layout'
import { apiBaseUrl } from '../../utils'

const { Item } = List
const types = [
  'Android', 'iOS', '休息视频', '福利',
  '拓展资源', '前端', '瞎推荐', 'App'
].map(item => ({
  label: item,
  value: item
}))

class MobileUploadForm extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      submitLoading: false
    }

    this.onReset = this.onReset.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit () {
    this.props.form.validateFields({ force: true }, async (error) => {
      if (error) {
        Toast.fail('验证失败', 2)

        return
      }

      this.setState({
        submitLoading: true
      })

      const values = this.props.form.getFieldsValue()

      let strList = []

      Object.keys(values).forEach(item => {
        if (item === 'type') {
          strList.push(`${item}=${values[item][0]}`)
        } else {
          strList.push(`${item}=${values[item]}`)
        }
      })

      const res = await fetch(`${apiBaseUrl}add2gank`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: strList.join('&')
      })

      const data = await res.json()

      if (data.error) {
        Toast.fail(data.msg, 2)
      } else {
        Toast.success(data.msg, 2)

        this.onReset()
      }

      this.setState({
        submitLoading: false
      })
    })
  }

  onReset () {
    this.props.form.resetFields()
  }

  validateUrl (rule, value, callback) {
    if (value && this.checkUrl(value)) {
      callback()
    } else {
      callback(new Error('请输入正确的链接'))
    }
  }

  checkUrl (str) {
    const pattern = /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i

    if (pattern.test(str)) {
      return true
    }

    return false
  }

  render () {
    const {
      url: { pathname }
    } = this.props
    const { getFieldProps, getFieldError } = this.props.form

    return (
      <Layout>
        <MenuBar
          pathname={pathname}
        >
          <NavBar
            mode='light'
          >
            发布
          </NavBar>
          <NoticeBar mode="closable">
            本项目 api 由 gank（干货集中营）提供，本着对 api 提供者负责的原则，此提交表单默认是 debug 模式，非正式提交（但走的是真实接口，可控制台查看），如果您认为你的链接的确是高质量的干活，手动将 “测试数据” 设置为否即可，并且欢迎您提供优质的干货分享给大家.
          </NoticeBar>
          <WhiteSpace />
          <form>
            <List>
              <InputItem
                {...getFieldProps('url', {
                  rules: [
                    {
                      required: true,
                      message: '分享链接不能为空'
                    }, {
                      validator: this.validateUrl.bind(this)
                    }
                  ]
                })}
                clear
                error={!!getFieldError('url')}
                onErrorClick={() => {
                  Toast.fail(getFieldError('url').join('、'), 2)
                }}
                placeholder="请输入分享链接"
              >
                链接
              </InputItem>
              <InputItem
                {...getFieldProps('desc', {
                  rules: [
                    {
                      required: true,
                      message: '标题不能为空'
                    }
                  ]
                })}
                clear
                error={!!getFieldError('desc')}
                onErrorClick={() => {
                  Toast.fail(getFieldError('desc').join('、'), 2)
                }}
                placeholder="请输入标题"
              >
                标题
              </InputItem>
              <InputItem
                {...getFieldProps('who', {
                  rules: [
                    {
                      required: true,
                      message: '标题不能为空'
                    }
                  ]
                })}
                clear
                error={!!getFieldError('who')}
                onErrorClick={() => {
                  Toast.fail(getFieldError('who').join('、'), 2)
                }}
                placeholder="请输入昵称"
              >
                昵称
              </InputItem>
              <Picker
                data={types}
                cols={1}
                {...getFieldProps('type' , {
                  initialValue: ['前端']
                })}
              >
                <Item arrow="horizontal">类型</Item>
              </Picker>
              <Item
                extra={<Switch {...getFieldProps('debug', {
                  initialValue: true,
                  valuePropName: 'checked'
                })} />}
              >
                测试数据
              </Item>
              <WhiteSpace />
              <WingBlank>
                <Button type="primary" loading={this.state.submitLoading} onClick={this.onSubmit}>提交</Button>
                <WhiteSpace />
                <Button onClick={this.onReset}>清空</Button>
              </WingBlank>
            </List>
          </form>
        </MenuBar>
      </Layout>
    )
  }
}

export default createForm()(MobileUploadForm)
