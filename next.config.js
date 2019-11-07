const withOffline = require('next-offline')
const withCss = require('@zeit/next-css')
const withImages = require('next-images')

const nextConfig = {
  cssModules: true
}

module.exports = withOffline(withImages(withCss(nextConfig)))
