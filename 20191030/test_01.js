// import utils from './test_02'

// const x = 1;

// console.log(x === global.x)
// console.log(this === undefined)
// import { c } from './lib.mjs'
// c.show()
// var lib = require('./lib');
// var main = require('./main');
// console.log('在test_01.js之中，lib.done = %j, main.done = %j', lib.done, main.done);
import { foo } from './lib';
console.log('test_01.js');
console.log(foo);
export let bar = 'bar';