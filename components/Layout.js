import Router from 'next/router'
import NProgress from 'nprogress'
import Head from 'next/head'
import Link from 'next/link'
import {
  Layout, Menu, Button, Icon, BackTop
} from 'antd'
import ActiveLink from './ActiveLink'
import 'isomorphic-fetch'

Router.onRouteChangeStart = () => {
  NProgress.start()
}
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

export default ({ children, title = '主页' }) => (
  <div>
    <Head>
      <title>{title} - Gank</title>
      <meta charSet='utf-8' />
      <meta
        name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1"
      />
      <link href="https://unpkg.com/antd@3.19.5/dist/antd.min.css" rel='stylesheet' />
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
        <ActiveLink href='/fe'>前端</ActiveLink>
        <ActiveLink href='/android'>Android</ActiveLink>
        <ActiveLink href='/ios'>iOS</ActiveLink>
        <ActiveLink href='/app'>App</ActiveLink>
        <ActiveLink href='/expand'>拓展资源</ActiveLink>
        <ActiveLink href='/videos'>休息视频</ActiveLink>
        <ActiveLink href='/blind'>瞎推荐</ActiveLink>
        <ActiveLink href='/welfare'>福利</ActiveLink>
        <ActiveLink href='/timeline'>时间轴</ActiveLink>
      </Menu>
      <div className="icons">
        <Link href='/upload'>
          <Button type="primary" shape="circle" style={{ marginRight: 12 }} icon="upload" />
        </Link>
        <Link href='/search'>
          <Button type="primary" shape="circle" style={{ marginRight: 12 }} icon="search" />
        </Link>
        <a className="github-btn" href="https://github.com/OrangeXC/gank" target="_blank">
          <Button shape="circle" icon="github" />
        </a>
      </div>
    </Header>

    <Content style={contentStyle}>
      { children }
    </Content>

    <Footer style={{ textAlign: 'center' }}>
      Gank ©2017 use gank api Paword by Next
      <a href="https://github.com/OrangeXC/gank" target="_blank">
        <Icon type="github" />
      </a>
    </Footer>

    <BackTop />

    <style jsx>{`
      .logo {
        width: 30px;
        height: 30px;
        background-image: url(../static/logo.png);
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
