const program = require('commander');
program
  // 默认-V | --version, 第2、3个参数可设置
  .version('0.0.1', '-v, --vers', 'output the current version')
  // 设置命令 itcast init等, <xx>必须参数
  .command('init <templateName> <projectName>')
  // 命令提示
  .description('初始化项目模板')
  .action(function (templateName, projectName) {
    // 输入itcast init aa bb
    console.log('init', templateName, projectName);  // init aa bb
  })
  .parse(process.argv);