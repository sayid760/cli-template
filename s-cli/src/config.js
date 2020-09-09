const inquirer = require('inquirer') 

// 应用配置环节
module.exports.getConfig = async (option)=>{
  const answers = await inquirer.prompt([{
    type: 'input',
    message: '应用名称:',
    name: 'appName',
    default: option.appName
  }, {
    type: 'list',
    message: 'vue版本',
    name: 'vueVersion',
    default: 'vue2',
    choices: [
      'vue2',
      'vue3'
    ]
  },
  {
    type: 'list',
    message: '开发语言',
    name: 'language',
    default: 'javascript',
    choices: [
      'javascript',
      'typescript'
    ],
    when: function(answers) { // 当vueVersion为vue2的时候才会提问当前问题
      return answers.vueVersion == 'vue2'
    }
  }])
  Object.assign(option, answers)
}
