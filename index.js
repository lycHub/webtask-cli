const program = require('commander');
const clone = require('git-clone');

// 模板引擎
const handlebars = require('handlebars');

// 用户与命令行交互
const inquirer = require('inquirer');

// 命令行状态提示：loading spin
const ora = require('ora');

// 命令行颜色
const chalk = require('chalk');

// 输出内容前加图标
const logSymbols = require('log-symbols');
const fs = require('fs');
const templates = require('./templates');
const { version } = JSON.parse(fs.readFileSync('package.json', 'utf8'));
program
  .version(version);

program
  .command('create <projectName> <templateName>')
  .description('初始化项目模板')
  .action(function (projectName, templateName) {
    if (Object.keys(templates).find(item => item === templateName)) {
      const repo = templates[templateName].url;
      const spinner = ora({
        text: '开始下载...',
        discardStdin: false
      }).start();
      clone(repo, projectName,  err => {
        if (err) {
          spinner.fail('下载失败');
        } else {
          spinner.succeed('下载成功');
          inquirer.prompt([{
            type: 'input',
            name: 'name',
            message: '请输入项目名称'
          }, {
            type: 'input',
            name: 'description',
            message: '请输入描述信息'
          }, {
            type: 'input',
            name: 'author',
            message: '请输入项目作者'
          }]).then(answers => {
              // console.log('answers', answers);  { name, description, author }
            const fileName = projectName + '/package.json';
            const packageJson = fs.readFileSync(fileName, 'utf8');
            // 匹配package.json中的 {{}}， 将里面的内容替换
            const packageResult = handlebars.compile(packageJson)(answers);
            fs.writeFileSync(fileName, packageResult);
            console.log(logSymbols.success, chalk.blue('模板创建成功'));
          });
        }
      });
    } else {
      console.log(logSymbols.warning, chalk.red('模板名错误，可选模板：' + Object.keys(templates).join(' | ')));
    }
  });

program
  .command('list')
  .description('查看所有模板')
  .action(function () {
    for (const attr in templates) {
      console.log(`${attr}: ${templates[attr].description}`);
    }
  });

program
  .parse(process.argv);