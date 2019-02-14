const withOffline = require('next-offline')
const withCss = require('@zeit/next-css')
const withImages = require('next-images')
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')

// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.css'] = (file) => {}
}

module.exports = withOffline(withImages(withCss({
  cssModules: true,
  webpack: (config) => {
    const newConfig = { ...config }
    newConfig.plugins = [
      ...config.plugins,
      new FilterWarningsPlugin({
        exclude: /mini-css-extract-plugin[^]*Conflicting order between:/
      })
    ]
    return newConfig
  }
})))
