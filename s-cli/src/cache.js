const shell = require('shelljs')
const { resolveApp , downloadWithPromise, getVersionEffective}  = require('./util')

// /**
//  * 缓存管理
//  *
//  * @export
//  * @param {Optional} option 应用全局配置
//  * @returns {Promise<void>}
//  */
// module.exports.cacheMange =  async (name)=>{
//   let useCache
//   try {
//     useCache = require(resolveApp(`./cache/example/with-js/package.json`)).version.trim() || null
//   } catch (error) {
//     // console.log(error) 
//   }
  
//   // 如果没有缓存可用或者远程代码更新则拉取最新代码
//   if (!useCache) {
//     shell.rm('-rf', resolveApp('./cache'))
//     await downloadWithPromise('github:sayid760/cli-template#master/example/with-js', resolveApp('./cache'))
//   }
//   const example = resolveApp(`./cache/example/with-js`)
//   shell.cp('-rf', example, './')
//   shell.mv(`./with-js`, `./${name}`)
// }

module.exports.cacheMange =  async (option)=>{
  const useCache = await getVersionEffective(option)
  const language = option.language === 'javascript' ? 'js' : 'ts'
  // 如果没有缓存可用或者远程代码更新则拉取最新代码
  if (!useCache) {
    shell.rm('-rf', resolveApp('./cache'))
    await downloadWithPromise('github:sayid760/cli-template#master', resolveApp('./cache'))
  }
  console.log(language)
  const example = resolveApp(`./cache/example/with-${language}`)
  shell.cp('-rf', example, './')
  shell.mv(`./with-${language}`, `./${option.appName}`)

  // if (!useCache) {
  //   shell.rm('-rf', resolveApp('./cache'))
  //   await downloadWithPromise('github:ykfe/egg-react-ssr#dev', resolveApp('./cache'))
  // }
  // const example = resolveApp(`./cache/example/ssr-with-${language}`)
  // shell.cp('-rf', example, './')
  // shell.mv(`./ssr-with-${language}`, `./${option.appName}`)
}
