const path = require('path')
const { promisify } = require('util')
const download = promisify(require('download-git-repo'))
const fs = require('fs') 

const processError = (err) => {
  if (err) {
    console.log('err', err)
    process.exit()
  }
}

const resolveApp = (source) => {
  // 以根目录为基准
  return path.resolve(__dirname, `../../${source}`)
}

const downloadWithPromise = promisify(require('download-git-repo'))

const getWithPromise = (url, timeout) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject('url request timeout:' + url)
    }, timeout || 5000)
    let data = ''
    https.get(url,res => {
      clearTimeout(timer)
      res.on('data', (chunk) => { data += chunk.toString() })
      res.on('end', () => {
        resolve(JSON.parse(data))
      })
    }).on('error', (err) => {
      reject(err)
    })
  })
}

// 缓存判断是否有效处理
const getVersionEffective = async (option) => {
  if (fs.existsSync(resolveApp('./cache'))) {
    const url = option.language === 'typescript' ? tsUrl : jsUrl
    const language = option.language === 'javascript' ? 'js' : 'ts'
    try {
      const { 'dist-tags': { latest } } = await getWithPromise(url)
      const localVersion = require(resolveApp(`./cache/example/with-${language}/package.json`)).version.trim()
      // 如果版本一样就不用更新
      return latest === localVersion
    } catch (error) {
      return true
    }
  }
  return false
}


module.exports = {
  getVersionEffective,
  processError,
  resolveApp,
  downloadWithPromise
}
