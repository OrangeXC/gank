const withOffline = require('next-offline')
const withImages = require('next-images')

const nextConfig = {
  cssModules: true
}

module.exports = withOffline(withImages(nextConfig))
