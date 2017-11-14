import React from 'react'
import { NavBar, NoticeBar, List, InputItem, Picker, Switch, Button, Toast, WingBlank, WhiteSpace } from 'antd-mobile'
import { createForm } from 'rc-form'
import MenuBar from '../../mobileComponents/MenuBar'
import Layout from '../../mobileComponents/Layout'

const Item = List.Item

class MobileUploadForm extends React.Component {
  static async getInitialProps ({ req }) {
    const language = req ? req.headers['accept-language'] : navigator.language

    return { language }
  }

  constructor (props) {
    super(props)

    this.state = {
      submitLoading: false
    }
  }

  onSubmit = () => {
    this.props.form.validateFields({ force: true }, async (error) => {
      if (!error) {
        this.setState({ submitLoading: true })

        const values = this.props.form.getFieldsValue()

        let strList = []

        Object.keys(values).forEach(item => {
          if (item === 'type') {
            strList.push(`${item}=${values[item][0]}`)
          } else {
            strList.push(`${item}=${values[item]}`)
          }
        })

        const res = await fetch("https://gank.io/api/add2gank", {
          method: "POST",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: strList.join('&')
        })

        const json = await res.json()

        if (json.error) {
          Toast.fail(json.msg, 2)
        } else {
          Toast.success(json.msg, 2)
        }

        this.setState({ submitLoading: false })
      } else {
        Toast.fail('验证失败', 2)
      }
    })
  }

  onReset = () => {
    this.props.form.resetFields()
  }

  validateUrl = (rule, value, callback) => {
    if (value && this.testUrl(value)) {
      callback();
    } else {
      callback(new Error('请输入正确的链接'));
    }
  }

  testUrl (str) {
    const pattern = /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i

    if(!pattern.test(str)) {
      return false
    } else {
      return true
    }
  }

  render () {
    const {
      language,
      url: { pathname }
    } = this.props
    const { getFieldProps, getFieldError } = this.props.form
    const types = [
      {
        value: 'Android',
        label: 'Android'
      }, {
        value: 'iOS',
        label: 'iOS'
      }, {
        value: '休息视频',
        label: '休息视频'
      }, {
        value: '福利',
        label: '福利'
      }, {
        value: '拓展资源',
        label: '拓展资源'
      }, {
        value: '前端',
        label: '前端'
      }, {
        value: '瞎推荐',
        label: '瞎推荐'
      }, {
        value: 'App',
        label: 'App'
      }
    ]

    return (
      <Layout language={language}>
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
                    { required: true, message: '分享链接不能为空' },
                    { validator: this.validateUrl }
                  ]
                })}
                clear
                error={!!getFieldError('url')}
                onErrorClick={() => {
                  Toast.fail(getFieldError('url').join('、'), 2)
                }}
                placeholder="请输入分享链接"
              >链接</InputItem>
              <InputItem
                {...getFieldProps('desc', {
                  rules: [
                    { required: true, message: '标题不能为空' }
                  ]
                })}
                clear
                error={!!getFieldError('desc')}
                onErrorClick={() => {
                  Toast.fail(getFieldError('desc').join('、'), 2)
                }}
                placeholder="请输入标题"
              >标题</InputItem>
              <InputItem
                {...getFieldProps('who', {
                  rules: [
                    { required: true, message: '标题不能为空' }
                  ]
                })}
                clear
                error={!!getFieldError('who')}
                onErrorClick={() => {
                  Toast.fail(getFieldError('who').join('、'), 2)
                }}
                placeholder="请输入昵称"
              >昵称</InputItem>
              <Picker
                data={types}
                cols={1}
                {...getFieldProps('type' , {
                  initialValue: ['前端']
                })}
              >
                <List.Item arrow="horizontal">类型</List.Item>
              </Picker>
              <Item
                extra={<Switch {...getFieldProps('debug', { initialValue: true, valuePropName: 'checked' })} />}
              >测试数据</Item>
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
