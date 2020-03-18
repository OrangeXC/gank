import Head from 'next/head'
import Link from 'next/link'
import { Result, Button } from 'antd'
import pkg from '../package.json'

function NotFoundPage() {
  return (
    <div>
      <Head>
        <title>404 - Gank</title>
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
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link href='/'>
            <Button type="primary">Back Home</Button>
          </Link>
        }
      />
    </div>
  )
}

export default NotFoundPage
