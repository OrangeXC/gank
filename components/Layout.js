import Router from 'next/router'
import NProgress from 'nprogress'
import Head from 'next/head'
import Link from 'next/link'
import {
  Layout, Menu, Button, BackTop
} from 'antd'
import {
  GithubOutlined, SearchOutlined, UploadOutlined
} from '@ant-design/icons'
import 'isomorphic-fetch'
import ActiveLink from './ActiveLink'
import pkg from '../package.json'

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

const { Header, Content, Footer } = Layout

const headerStyle = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  zIndex: 10,
  minWidth: 1140
}
const headerMenuStyle = {
  lineHeight: '64px',
  float: 'left'
}
const contentStyle = {
  width: 1140,
  padding: '80px 50px 64px',
  margin: '0 auto',
  minHeight: `calc(100vh - 69px)`
}

const LayoutPage = ({ children, title = '主页' }) => (
  <div>
    <Head>
      <title>{title} - Gank</title>
      <meta charSet='utf-8' />
      <meta
        name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1"
      />
      <link href={`https://cdn.jsdelivr.net/npm/antd@${pkg.dependencies.antd}/dist/antd.min.css`} rel='stylesheet' />
      <link href="/static/css/nprogress.css" rel="stylesheet" />
      <link href="/static/logo.png" rel="icon" type="image/x-icon" />
      <link href="/static/logo.png" rel="apple-touch-icon" />
    </Head>

    <Header style={headerStyle}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        style={headerMenuStyle}
      >
        <ActiveLink href='/'>主页</ActiveLink>
        <ActiveLink href='/topics/fe'>前端</ActiveLink>
        <ActiveLink href='/topics/android'>Android</ActiveLink>
        <ActiveLink href='/topics/ios'>iOS</ActiveLink>
        <ActiveLink href='/topics/app'>App</ActiveLink>
        <ActiveLink href='/topics/expand'>拓展资源</ActiveLink>
        <ActiveLink href='/topics/videos'>休息视频</ActiveLink>
        <ActiveLink href='/topics/blind'>瞎推荐</ActiveLink>
        <ActiveLink href='/topics/welfare'>福利</ActiveLink>
        <ActiveLink href='/timeline'>时间轴</ActiveLink>
      </Menu>
      <div className="icons">
        <Link href='/upload'>
          <Button type="primary" shape="circle" style={{ marginRight: 12 }} icon={<UploadOutlined />} />
        </Link>
        <Link href='/search'>
          <Button type="primary" shape="circle" style={{ marginRight: 12 }} icon={<SearchOutlined />} />
        </Link>
        <a className="github-btn" href="https://github.com/OrangeXC/gank" target="_blank">
          <Button shape="circle" icon={<GithubOutlined />} />
        </a>
      </div>
    </Header>

    <Content style={contentStyle}>
      { children }
    </Content>

    <Footer style={{ textAlign: 'center' }}>
      Gank ©2017-{ new Date().getFullYear() } use gank api Paword by Next
      <a href="https://github.com/OrangeXC/gank" style={{ marginLeft: 6 }} target="_blank">
        <GithubOutlined />
      </a>
    </Footer>

    <BackTop />

    <style jsx>{`
      .logo {
        width: 30px;
        height: 30px;
        background-image: url(/static/logo.png);
        background-size: cover;
        border-radius: 6px;
        margin: 16px 24px 16px 0;
        float: left;
      }

      .icons {
        float: right;
      }
    `}</style>
  </div>
)

export default LayoutPage
