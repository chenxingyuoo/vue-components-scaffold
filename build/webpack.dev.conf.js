/**
 * example的开发预览
 */
'use strict'
const utils = require('./utils')
const config = require('../config')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.conf.js')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

module.exports = merge(webpackBaseConfig, {
  mode: 'development', // webpack4新增，也可写在CLI参数里，自动设置process.env.NODE_ENV=
  entry: './example/main.js',
  devtool: config.dev.devtool,
  performance: {
    hints: "warning"
  },
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true, // 404的页面会自动跳转到/页面
    inline: true, // 文件改变自动刷新页面
    progress: true, // 显示编译进度
    quiet: true,
    overlay: config.dev.errorOverlay  // webpack出错直接贴到页面上
    ? { warnings: false, errors: true }
    : false,
    hot: true, //启用 webpack 的模块热替换特性
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    publicPath: config.dev.assetsPublicPath,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port, // 服务器端口
    proxy: config.dev.proxyTable,
    // https: true
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      usePostCSS: true
    })
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new webpack.HotModuleReplacementPlugin(), // 热加载模块
    // 给index.html自动添加引用的JS文件，CSS文件
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('example/index.html'),
      inject: true
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`You application is running here http://localhost:${PORT}/`],
      },
    })
  ]
})
