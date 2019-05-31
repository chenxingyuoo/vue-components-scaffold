const path = require('path')
const config = require('../config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.resolve = function(dir) {
  return path.join(__dirname, '..', dir)
}

exports.styleLoaders = function (options) {
  options = options || {}
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  function getCssRule (extension, loader, loaderOptions) {
    const loaders = ['vue-style-loader', cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, { sourceMap: options.sourceMap })
      })
    }
    
    if (options.usePostCSS) {
      loaders.push(getPostCssLoader(options.sourceMap))
    }

    if (options.extract) {
      loaders.splice(1, 0, {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../' // dist/css 相对于 dist 根目录
        }
      })
    }

    return {
      test: new RegExp('\\.' + extension + '$'),
      loaders: loaders
    }
  }

  const result = [
    getCssRule('css', false),
    getCssRule('postcss', false),
    getCssRule('less', 'less'),
    getCssRule('sass', 'sass', { indentedSyntax: true }),
    getCssRule('scss', 'sass'),
    getCssRule('stylus', 'stylus'),
    getCssRule('styl', 'stylus')
  ]
  return result
}

function getPostCssLoader (sourceMap) {
  return {
    loader: 'postcss-loader',
    options: {
      sourceMap: sourceMap,
      plugins: [
        require('autoprefixer')({
          browsers: ['iOS >= 7', 'Android >= 5']
        })
        // require('postcss-pxtorem')({ rootValue: 100, propList: ['*'] })
      ]
    }
  }
}
