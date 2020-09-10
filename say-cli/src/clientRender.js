const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const { resolve }  = require('path')
const { webpackWithPromise }  = require('./util/webpack')

const express = require('express');
const isProduction = process.env.NODE_ENV === 'production'

const ora = require('ora')('正在构建')
const cwd = process.env.BASE_CWD || process.cwd()
const merge = require('webpack-merge')
const baseDir = process.env.BASE_DIR || '.'
const clientConfig = require(resolve(cwd, baseDir, './build/webpack.config'))

process.on && process.on('message', async data => {
  if (data.msg === 'start dev') {
    await dev()
  }
})

const dev = async (argv) => {
  const PORT = (argv && argv.PORT) || process.env.FE_PORT || 8000
  const compiler = webpack(clientConfig)
  let server = new WebpackDevServer(compiler, Object.assign({
      // stats: {
      //   assets: true, // 添加资源信息
      //   cachedAssets: false, // 显示缓存的资源（将其设置为 `false` 则仅显示输出的文件）
      //   children: false, // 添加 children 信息
      //   chunks: false, // 添加 chunk 信息（设置为 `false` 能允许较少的冗长输出）
      //   colors: true, // 以不同颜色区分构建信息
      //   modules: false, // 添加构建模块信息
      //   warnings: false,
      //   entrypoints: false
      // },
      // contentBase: cwd + './', // 指定一个虚拟路径来让devServer服务器提供内容
      // publicPath:  clientConfig.output.publicPath || '/', // 指定静态资源的根目录的
      // publicPath:'/',
      // disableHostCheck: true,
      hot: true,
      //开启 HMR，由 webpack-dev-server 发送 "webpackHotUpdate" 消息到客户端代码
      historyApiFallback: false,
      // //单页应用 404 转向 index.html
      // compress: true,
      // quiet: false, // 不在控制台打印任何 log
      // noInfo: false, //不输出启动 log
      // historyApiFallback: {  // 处理404页面
      //   disableDotRule: true,
      //   rewrites: '/dist/index.html'
      //   // genHistoryApiFallbackRewrites(clientConfig.output.publicPath, clientConfig.output.pages)
      // },
      // proxy: {
      //   "./public": "http://localhost:8080"
      // },
      // 代理配置，来源于 http-proxy-middleware
      // setup: function(app) {
      //webpack-dev-server 本身是 Express 服务器可以添加自己的路由
      // app.get('/', function(req, res) {
      //   // res.json({ custom: 'response' });
      //   fs.readFile('./public/index.html','utf8',function(err,data){
      //     if(err){
      //       throw err;
      //     }
      //     res.end(data);
      //   });
      // res.send('./public/index.html');
      // });
      // },
      // publicPath: clientConfig.output.publicPath || '/',
      // host: '0.0.0.0',
      // sockPort: PORT,
      // contentBase: cwd + '/dist',
      // port: PORT,
      // clientLogLevel: 'warning',
      // headers: {
      //   'access-control-allow-origin': '*'
      // },
      // proxy: {
      //   '/api': 'http://localhost:7001'
      // }
  }, clientConfig.devServer))
  // webpackDevServer.addDevServerEntrypoints(config, options); 
  server.listen(PORT, '0.0.0.0', (err) => {
    if (err) {
      throw err
    }
    process.send && process.send({ msg: 'start dev finish' })
  })
}

const build = async () => {
  ora.start()
  const stats = await webpackWithPromise(clientConfig)
  console.log(stats.toString(Object.assign({
    assets: true,
    colors: true,
    hash: true,
    timings: true,
    version: true,
    warnings: false
  }, clientConfig.stats)))
  ora.succeed('构建成功')
}

module.exports = {
  dev,
  build
}
