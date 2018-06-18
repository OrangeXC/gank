const category = [{
  title: '首页',
  path: '/'
}, {
  title: '前端',
  path: '/fe'
}, {
  title: 'Android',
  path: '/android'
}, {
  title: 'iOS',
  path: '/ios'
}, {
  title: 'App',
  path: '/app'
}, {
  title: '拓展资源',
  path: '/expand'
}, {
  title: '休息视频',
  path: '/videos'
}, {
  title: '瞎推荐',
  path: '/blind'
}, {
  title: '福利',
  path: '/welfare'
}]

export const getInitList = async (apiUrl) => {
  const res = await fetch(`${apiUrl}/1`)
  const json = await res.json()

  return json.results
}

export const getPageTitle = (pathname) => {
  return category.find(({ path }) => path === pathname).title
}

export const getPagePath = (name) => {
  return category.find(({ title }) => title === name).path
}
