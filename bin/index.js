#!/usr/bin/env node

const commander = require('commander');
const chalk = require('chalk');
const download = require('download-git-repo');
const inquirer = require('inquirer');
const fs = require('fs');
const ora = require('ora');
const symbols = require('log-symbols');
const handlebar = require('handlebars');
const packageJson = require('../package.json');

commander
  .version(packageJson.version)
  .usage('<command> [options]');


commander
  .command('create <app-name>')
  .description('create a new project powered by vue-brush')
  .option('-d, --default', 'Skip prompts and use default preset')
  .action((name) => {
    console.log(chalk.blue(`${name}项目正在创建中...`));
    if (!fs.existsSync(name)) {
      inquirer
      .prompt([{
          name: 'version',
          message: '请输入项目版本',
          default: '1.0.0'
        },{
          name: 'description',
          message: '请输入项目描述信息',
          default: '这是一个自定义脚手架生成的项目'
        },{
          name: 'author',
          message: '请输入作者名称',
          default: ''
        }])
      .then(answer => {
        const url ='github.com:ladyzdp/vue-brush#master';
        const spinner = ora(`正在下载模板，源地址：${url}`);
        spinner.start();
        download(url, name, {clone: true}, function (err) {
          if (err) {
            spinner.fail();
            console.log(symbols.error, chalk.red(err));
          } else {
            spinner.succeed();
            const fileName = name+'/package.json';
            const meta = {
              name,
              version: answer.version,
              description: answer.description,
              author: answer.author
            };
            if (fs.existsSync(fileName)) {
              const content = fs.readFileSync(fileName).toString();
              const resultContent = handlebar.compile(content)(meta);
              fs.writeFileSync(fileName, resultContent);
            }
            console.log(symbols.success, chalk.green('项目初始化成功'));
            console.log(symbols.info, chalk.yellow('cd'+' '+ name));
            console.log(symbols.info, chalk.yellow('npm install or yarn'));
            console.log(symbols.info, chalk.yellow('npm run serve'));
            console.log(symbols.info, chalk.yellow('npm run build'));
          }
        });
      });
    } else {
      console.log(symbols.error, chalk.red('项目已存在'));
      // console.log('项目已存在');
    }
  });

commander.parse(process.argv);