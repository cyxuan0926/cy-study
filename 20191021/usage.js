#!/usr/bin/env node
// 因为output是个异步操作 如果awaiting.js里面的异步操作没执行完 那就output的值就是undefined, output的值取决于执行时间
// import { output } from './awaiting.js'
// console.log(outputPlusValue(1000));
// setTimeout(() => { console.log(outputPlusValue(1000)) }, 1000)
// 第一次的响应
// import promise, { output } from './awaiting.js'
// function outputPlusValue(value) { return output + value }
// promise.then(() => {
//   console.log(outputPlusValue(1000));
//   setTimeout(() => { console.log(outputPlusValue(1000)) }, 1000)
// })
// 顶层await命令相应:
// import { output } from './awaiting'
// function outputPlusValue(value) { return output + value }
// console.log(outputPlusValue(100));
// setTimeout(() => console.log(outputPlusValue(100), 1000))
console.log('X1')
await new Promise(r => setTimeout(r, 1000))
console.log('X2');