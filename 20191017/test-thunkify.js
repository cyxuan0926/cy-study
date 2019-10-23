#!/usr/bin/env node
// 当前文件的执行环境是node
// css js webpack node ts http svg canvas 算法等等
// 多看书 多思考
// var thunkify = require('thunkify'), fs = require('fs')
// ,read = thunkify(fs.readFile);
// read('../package.json')(function(err, str) {
//   console.log(err, str)
// })
// Thunkify的源码：写高级代码的思想 封装性
// function thunkify(fn) {
//   return function() {
//     // arguments参数是个类数组对象 有length属性， 可以使用下标访问
//     console.log(arguments)
//     var args = new Array(arguments.length);
//     var ctx = this;
//     for (var i = 0; i < args.length; ++i) {
//       args[i] = arguments[i];
//     }
//     return function(done) {
//       let called;
//       args.push(function() {
//         if(called) return;
//         called = true;
//         done.apply(null, arguments);
//       })
//       try {
//         fn.apply(ctx, args);
//       }
//       catch(err) {
//         done(err);
//       }
//     }
//   }
// }
// function f(a, b, callback) {
//   let sum = a + b;
//   callback(sum);
//   callback(sum);
// }
// let ft = thunkify(f), print = console.log.bind(console);
// ft(1, 2)(print)
// Thunk函数:将多参数的函数变成单参数,如果是有callback的函数 则是返回
// let readFileThunk = thunkify(fs.readFile), gen = function *() {
//   let r1 = yield readFileThunk('./new-set.js');
//   console.log(r1.toString());
//   let r2 = yield readFileThunk('./test-thunkify.js');
//   console.log(r2.toString());
// }
// let a = gen(), s = a.next(), m = a.next(123)
// console.log(m)
// var fs = require('fs')
// var readFile = function(fileName) {
//   return new Promise(function(resolve, reject) {
//     fs.readFile(fileName, function(error, data) {
//       if (error) return reject(error);
//       resolve(data);
//     });
//   });
// };
// var gen = function *() {
//   var f1 = yield readFile('./new-set.js');
//   var f2 = yield readFile('./index.html');
//   console.log(f1.toString(), f2.toString());
// }
// var g = gen();
// g.next().value.then(data => {
//   g.next(data).value.then(data => {
//     g.next(data)
//   })
// })
// // 目标是自动调用 并且这个值要一步一步地保存下去
// function test(fn) {
//   let g = fn()
//   function next(data) {
//     let result = g.next(data)
//     if(result.done) return result.value
//     result.value.then(data => next(data))
//   }
//   next();
// }
// // co模块地源码：co函数接受Generator函数作为参数 返回一个Promise对象
// function co(gen) {
//   let ctx = this;
//   return new Promise((resolve, reject) => {
//     if (typeof gen === 'function') gen = gen.call(ctx);
//     // 检查传递进来的函数是不是为Generator函数 如果不是 将Promise对象的状态改为resolved
//     if (!gen || typeof gen.next !== 'function') return resolve(gen);
//     onFulfulled();
//     // 将Generator函数的内部指针对象的next方法 包装成一个函数 主要是为了能够捕获抛出的错误
//     function onFulfulled(res) {
//       var ret;
//       try {
//         ret = gen.next(res);
//       }
//       catch(e) {
//         return reject(e);
//       }
//       next(ret);
//     }
//     function next(ret) {
//       if (ret.done) return resolve(ret.value);
//       var value = toPromise.call(ctx, ret.value);
//       if (value && isPromise(value)) return value.then(onFulfulled, onRejected);
//       return onRejected(new TypeError(
//         `You may only yield a function, promise, generator, array, or object,but the following object was passed: String(ret.value)`
//       ));
//     }
//   })
// }
// Node 提供Stream模式读写数据 特点是一次只处理数据的一部分 数据分成一块块依次处理 就好像"数据流"一样
// Stream模式使用EventEmitter API :data事件：下一块数据块已经准备好了 end事件：整个"数据流"处理完了 error事件: 发生错误
const co = require('co');
const fs = require('fs');
const stream = fs.createReadStream('./test.txt')
let valjeanCount = 0;
co(function *() {
  while(true) {
    const res = yield Promise.race([
      new Promise(resolve => stream.once('data', resolve)),
      new Promise(resolve => stream.once('end', resolve)),
      new Promise((resolve, reject) => stream.once('error', reject))
    ]);
    if (!res) break;
    stream.removeAllListeners('data');
    stream.removeAllListeners('end');
    stream.removeAllListeners('error');
    valjeanCount += (res.toString().match(/Generator/ig) || []).length;
  }
  console.log('count:', valjeanCount)
})
