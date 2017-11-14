import Head from 'next/head'
import { LocaleProvider } from 'antd-mobile'
import enUS from 'antd-mobile/lib/locale-provider/en_US'
import 'isomorphic-fetch'

export default ({ children, language }) => (
  <div>
    <Head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1" />
      <title>Gank</title>
      <link href="/static/logo.png" rel="icon" type="image/x-icon" />
      <link rel='stylesheet' type='text/css' href='//unpkg.com/antd-mobile/dist/antd-mobile.min.css' />
    </Head>
    <LocaleProvider locale={language.substr(0, 2) === 'en' ? enUS : undefined}>
      {children}
    </LocaleProvider>
    <style global jsx>{`
      .am-tab-bar {
        height: 100vh;
      }

      .am-tab-bar-item {
        padding-top: 45px;
      }

      .am-navbar {
        width: 100%;
        position: fixed;
        top: 0;
      }
    `}</style>
  </div>
)
