export const apiBaseUrl = 'https://gank.io/api/'

const topics = [{
  title: '首页',
  name: ''
}, {
  title: '前端',
  name: 'fe'
}, {
  title: 'Android',
  name: 'android'
}, {
  title: 'iOS',
  name: 'ios'
}, {
  title: 'App',
  name: 'app'
}, {
  title: '拓展资源',
  name: 'expand'
}, {
  title: '休息视频',
  name: 'videos'
}, {
  title: '瞎推荐',
  name: 'blind'
}, {
  title: '福利',
  name: 'welfare'
}]

export const getInitList = async (apiUrl) => {
  const res = await fetch(`${apiUrl}/1`)
  const json = await res.json()

  return json.results
}

export const getPageTitle = (topic = '') => {
  return topics.find(({ name }) => name === topic).title
}

export const getPageTopic = (name) => {
  return topics.find(({ title }) => title === name).name
}
