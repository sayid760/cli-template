
// const program = require('commander')

// program
//     .command('init <name>')
//     .description('init project')
//     .action(init)

// program.parse(process.argv)

// console.log(process.argv.slice(2))

// program
//   .version('0.0.1')
//   .command('init <name>')
//   .description('Generate a new project from a template')
//   .action(name => {
//     // 回调函数
//     console.log('init' + name);
//   })
//   .command('create <name>', 'Generate a new project from a template') // 这种写法相当于把文件分离出去，执行 s-cli create demo时，找cli-create.js文件
// // 解析命令行参数
// program.parse(process.argv);

// console.log(program)

const inquirer = require('inquirer');
// const promptList = [{
//   type: 'input',
//   message: '应用名称:',
//   name: 'appName',
//   default: 'hhh'
// }, {
//   type: 'list',
//   message: '开发语言',
//   name: 'language',
//   default: 'javascript',
//   choices: [
//     'javascript',
//     'typescript'
//   ]
// }]
// inquirer.prompt(promptList).then(answers => {
//   console.log(answers); // 返回的结果
// })

const  yargs = require('yargs')


// const init = async (option) => {
//   // 自检更新当前脚手架是否最新
//   await updateCli()
//   // 问询APP配置
//   await getConfig(option)
//   // 判断当前appName是否已存在
//   await checkRepeat(option)
//   // 显示loading
//   spinner.start()
//   // 缓存比对
//   await cacheMange(option)

//   spinner.succeed()
//   process.exit()
// }


// const  getConfig = async (option) => {
//   const answers = await inquirer.prompt([{
//     type: 'input',
//     message: '应用名称:',
//     name: 'appName',
//     default: option.appName
//   }, {
//     type: 'list',
//     message: '开发语言',
//     name: 'language',
//     default: 'javascript',
//     choices: [
//       'javascript',
//       'typescript'
//     ]
//   }])
//   Object.assign(option, answers)
// }

// yargs
//   .command('init [appName]', 'init the program', {}, async (argv) => {
//     const option = {
//       appName: argv.appName || 'app',
//       language: 'javascript'
//     }
//     try {
//       await getConfig(option)
//       // console.log(option)
//     } catch (error) {
//       // processError(error)
//       console.log(error)
//     }
//   })
//   .command('dev', 'start clientRender', {}, async () => { 
//     process.env.NODE_ENV = 'development'
//     // const { dev } = require('./clientRender')
//     // await dev(yargs.argv)
//     console.log(yargs.argv)
//   })
//   .command('build', 'start clientBuild', {}, async () => {
//     process.env.NODE_ENV = 'production'
//     // const { build } = require('./clientRender')
//     // await build()
//     console.log('build~~~')
//   })
//   .demandCommand(1, 'You need at least one command before moving on')
//   .option('version', {
//     alias: 'v',
//     default: false
//   })
//   .parse()

// var argv = yargs.argv;
// console.log('hello ', argv.name);

// const fs = require('fs'), { decode, encode } = require('ini')
// const context = fs.readFileSync('index.html','utf-8')
// const config = ini.parse(context)
// console.log(decode(context))
// console.log(encode(context))

const { promisify } = require('util')
const downloadWithPromise = promisify(require('download-git-repo'))
// const path = require('path')
// const down = require('download-git-repo')

downloadWithPromise('github:sayid760/koa-react-ssr#master/example/react-ssr-js', path.resolve(__dirname, '../demo'));

// const clone = require("git-clone")
// const program = require("commander")
// const shell = require("shelljs")
// const log = require("tracer").colorConsole()

// var url = "https://github.com/sayid760/vue3-vite-template.git"
// clone(url, process.cwd()+'/demo', null, function(){
//   console.log('拉取完成')
// })

// program
//   .version("0.0.1")
//   .description("追书云移动端项目基础模板")
//   .program.command("create <project_name> [template]")
//   .option("-tsx, --typescript", "typescript tsx template")
//   .action(function (project, template, cmd) {
//     var ts_tpl = !!cmd.typescript;
//     log.info(`zhuishuyun create ${project} ${ts_tpl ? "--tsx" : ""}`);
//     if (project) {
//       var pwd = shell.pwd();
//       var url = "https://github.com/ZhengXiaowei/base-job-template.git";
//       if (ts_tpl)
//         url = "https://github.com/ZhengXiaowei/base-vue-tsx-template.git";
//       log.info("正在拉取远端模板，请稍等..");
//       clone(url, pwd + `/${project}`, null, function () {
//         shell.rm("-rf", pwd + `/${project}/.git`);
//         log.info("模板已建立");
//       });
//     } else {
//       log.error("请填写正确的项目名称！");
//     }
//   });

// program.parse(process.argv);