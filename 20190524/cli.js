#!/usr/bin/env node 
// 表示用node环境来执行
// 先来个简单的本地的全局自定义的命令 1.package.json的bin字段 内置命令执行的时候的文件的目录 2.执行文件里面加上#!/usr/bin/env node 并且通过npm link映射一个链接到本地的
// 使用commander模块 一个命令行输入和参数解析强大功能 /* */快捷键(Alt+Shift+A) /** */：文档注释
// const path = require('path');
const program = require('commander');
/* program
      .version('0.0.1')
      .option('-p --peppers-pvc', 'Add peppers') //第一个参数是选项定义 分为短定义和长定义 用| ， 空格连接 参数可以用<>(必选)或[](可选) 第二个参数为选项描述 第三个可选值 为选项参数的默认值
      .option('-P --pineapple', 'Add pineapple')
      .option('-b --bbq', 'Add bbq sauce')
      .option('-c --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
      .parse(process.argv);
console.log(program);      
console.log('you ordered a pizza with: ');
if (program.peppers) console.log('  - peppers');
if (program.pineapple) console.log('  - pineapple');
if (program.bbq) console.log('  - bbq');
console.log('  - %s cheese', program.cheese); */
// let a = []
// console.log('入');
// a.push(1);
// console.log('第一步', a);
// a.push(2);
// console.log('第二步', a);
// a.push(3)
// console.log('第三步', a);
// a.push(4)
// console.log('第四步', a);
// // console.log('出栈');
// // console.log('第一步',a.pop(), a);
// // console.log('第二步', a.pop(), a);
// // console.log('第三步', a.pop(), a);
// // console.log('第四步', a.pop(), a);
// console.log('出队');
// console.log('第一步',a.shift(), a);
// console.log('第二步', a.shift(), a);
// console.log('第三步', a.shift(), a);
// console.log('第四步', a.shift(), a);
/* function camelcase(flag) {
  return flag.split('-').reduce(function(str, word) {
    return str + word[0].toUpperCase() + word.slice(1);
  });
} */
/* 
__dirname: 获得当前执行文件所在目录的完整目录名
__filename: 获得当前执行文件的带有完整绝对路径的文件名
process.cwd():获得当前执行node命令时候的文件夹目录名
path
path.dirname(path): 返回path目录名
path.basename(path, [ext]): 返回路径中的文件名(只是输出路径的最后一部分，并不会判断是否文件名)，可以用第二个参数过滤扩展名
path.extname:(path):获取文件扩展名(假设 path.basename(path) === B)从B的最后一个.开始截取，直到最后一个字符，如果B中不存在. 或者B的第一个字符就是. 则返回空字符串
*/
// console.log(__dirname, __filename, process.cwd());
// console.log(path.dirname(''), path.extname('/foo/bar/baz/asdf/dddd/sss.html'))
