#!/usr/bin/env node
/** 
 * Module dependencies
*/
/* 
package.json bin字段 如果只有一个可执行文件 那么它的名字就应该和包名(package.json的name属性)相同，此时只需要提供这个文件路径(字符串)
// eslint-disable-line 表示这一行不要eslint检查rule
*/
let program = require('commander');
// program
//       .version('0.0.1')
//       .option('-p --peppers', 'Add peppers')
//       .option('-P --pineapple', 'Add pineapple')
//       .option('-b --no-bbq-sauce', 'Add bbq sauce')
//       .option('-c --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
//       .parse(process.argv);
// console.log('you ordered a pizza with:');
// if (program.peppers) console.log('  - peppers');
// if (program.pineapple) console.log('  - pineapple');
// if (program.bbqSauce) console.log('  - bbq');
// console.log('  - %s cheese', program.cheese);
// program
//       .version('0.0.1')
//       .command('setup')
//       .description('run remote setup commands')
//       .action(function() {
//         console.log('12setup');
//       });
program
      .version('0.0.1')
      .command('setput <sname>')
      .description('asdasdxczxc casdasdas')
      .action(function(name) {
        console.log(111, name);
      });      
program.parse(process.argv);      