// var counter = 3;
// function isCounter() {
//   counter++;
// }
// module.exports = {
//   get counter() {
//     return counter;
//   },
//   isCounter: isCounter
// }
// export let counter = 3;
// export function isCounter() {
//   counter++;
// }
// export var foo = 'bar';
// setTimeout(() => foo = 'baz', 500)
// function C() {
//   this.sum = 0;
//   this.add = function() {
//     this.sum += 1;
//   }
//   this.show = function() {
//     console.log(this.sum);
//   }
// }
// export let c = new C();
// module.exports = {
//   foo: 'hello',
//   bar: 'world'
// }
// module.exports = function two() {
//   return 2;
// }
// module.exports = 123;
// setTimeout(() => module.exports = null)
// exports.done = false;
// var main = require('./main');
// console.log('在lib.js之中， main.done = %j', main.done);
// exports.done = true;
// console.log('lib.js执行完毕');
import { bar } from './test_01';
console.log('lib.js');
console.log(bar);
export let foo = 'foo';
