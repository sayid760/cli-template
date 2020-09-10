const shell = require('shelljs')
const { resolveApp , downloadWithPromise, getVersionEffective}  = require('./util')

// 缓存管理
module.exports.cacheMange =  async (option)=>{
  // const useCache = await getVersionEffective(option)
  const language = option.language === 'javascript' ? 'js' : 'ts'
  const { vueVersion } = option
  // 如果没有缓存可用或者远程代码更新则拉取最新代码
  // if (!useCache) {
    shell.rm('-rf', resolveApp('./cache'))
    await downloadWithPromise('github:sayid760/cli-template#master', resolveApp('./cache'))
  // }
  console.log(language)
  const example = resolveApp(`./cache/example/${vueVersion}-with-${language}`)
  shell.cp('-rf', example, './')
  shell.mv(`./${vueVersion}-with-${language}`, `./${option.appName}`)
}
