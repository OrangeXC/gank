import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'
import { LocaleProvider } from 'antd-mobile'
import enUS from 'antd-mobile/lib/locale-provider/en_US'
import 'isomorphic-fetch'
import pkg from '../../package.json'

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

export default ({ children }) => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1" />
      <title>Gank</title>
      <link href="/static/logo.png" rel="icon" type="image/x-icon" />
      <link href="/static/logo.png" rel="apple-touch-icon" />
      <link href={`https://cdn.jsdelivr.net/npm/antd-mobile@${pkg.dependencies['antd-mobile']}/dist/antd-mobile.min.css`} rel='stylesheet' />
      <link href='/static/css/nprogress.mobile.css' rel='stylesheet' />
    </Head>
    <LocaleProvider locale={enUS}>
      {children}
    </LocaleProvider>
    <style global jsx>{`
      .am-navbar {
        width: 100%;
        position: fixed;
        top: 0;
      }
    `}</style>
  </div>
)
