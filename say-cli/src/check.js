const inquirer = require('inquirer')
const fs = require('fs')
const shell = require('shelljs')

// 应用初始化函数
module.exports.checkRepeat = (option) => {
  const { appName } = option
  return new Promise(async (resolve, reject) => {
    if (fs.existsSync(`./${appName}`)) {
      const answers = await inquirer.prompt([{
        type: 'confirm',
        message: `当前文件夹下含有创建 ${appName} 文件名，是否强制删除文件继续初始化?`,
        name: 'delete',
        default: 'Yes'
      }])
      if (answers.delete) {
        shell.rm('-rf', `./${appName}`)
        console.log(`原文件已经成功删除...`)
        resolve()
      } else process.exit()
    }
    resolve()
  })
}
