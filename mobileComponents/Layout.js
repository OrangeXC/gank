import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'
import { LocaleProvider } from 'antd-mobile'
import enUS from 'antd-mobile/lib/locale-provider/en_US'
import 'isomorphic-fetch'

Router.onRouteChangeStart = (url) => {
  NProgress.start()
}
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

export default ({ children, language }) => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1" />
      <title>Gank</title>
      <link rel="icon" type="image/x-icon" href="/static/logo.png" />
      <link rel="apple-touch-icon" href="/static/logo.png" />
      <link rel='stylesheet' type='text/css' href='https://cdn.bootcss.com/antd-mobile/2.1.8/antd-mobile.min.css' />
      <link rel='stylesheet' href='/static/css/nprogress.mobile.css' />
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
