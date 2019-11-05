// var mod = require('./lib')

// console.log(mod.counter)
// mod.isCounter()
// console.log(mod.counter)
// import { counter, isCounter } from './lib'
// console.log(counter)
// isCounter()
// console.log(counter)
// import { foo } from './lib'
// console.log(foo)
// setTimeout(() => console.log(foo), 500)
// import './test_02'
// import './test_01'
// import cy from './lib'
// import {default as ss} from './lib'
// import * as all from './lib'
// let { default: cy } = all
// console.log(cy)
// console.log(all.default())
// console.log(all)
// exports.done = false;
// var lib = require('./lib');
// console.log('在main.js之中， lib.done = %j', lib.done);
// exports.done = true;
// console.log('main.js 执行完毕');
import * as m from './even'
m.even(10);