const ora  = require('ora')
const { checkRepeat } = require('./check')
const { cacheMange } = require('./cache')
const { getConfig } = require('./config')

const spinner = ora('应用初始化中')

module.exports.init = async (option) => {
  // 问询配置
  await getConfig(option)
  if(option.vueVersion == 'vue3'){
    option.language = 'typescript'
  } 
  console.log(option)
  // 判断当前appName是否已存在
  // await checkRepeat(option)
  // // 显示loading
  // spinner.start()
  // // 缓存比对
  // await cacheMange(option)
  // spinner.succeed()
  // process.exit()
}

