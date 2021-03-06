'use strict'
require('./check-versions')()

const buildType = process.argv[2]
const isBuildDemo = buildType === 'build-demo'
const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = isBuildDemo ? require('./webpack.demo.prod.conf') :  require('./webpack.prod.conf')
const spinner = ora('building for production...')

spinner.start()

rm(isBuildDemo ? path.join(config.build.assetsRoot, config.build.assetsSubDirectory) : path.join(path.resolve(__dirname, '../lib')), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
  })
})
