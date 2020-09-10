const yargs = require('yargs')
const {init} = require('./init')
const {processError} = require('./util')

// 界面交互配置
yargs
  .command('init [appName]', 'init the program', {}, async (argv) => {
    const option = {
      appName: argv.appName || 'app',
      language: 'javascript',
      vueVersion: 'vue2'
    }
    try {
      await init(option)
    } catch (error) {
      processError(error)
    }
  })
  .command('dev', 'start clientRender', {}, async () => {
    process.env.NODE_ENV = 'development'
    const { dev } = require('./clientRender')
    await dev(yargs.argv)
  })
  .command('build', 'start clientBuild', {}, async () => {
    process.env.NODE_ENV = 'production'
    const { build } = require('./clientRender')
    await build()
  })
  .demandCommand(1, 'You need at least one command before moving on')
  .option('version', {
    alias: 'v',
    default: false
  })
  .parse()
