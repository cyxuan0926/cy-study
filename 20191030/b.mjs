import { foo } from './a.mjs';
console.log('b.mjs');
// console.log(foo());
// console.log(foo);
export let bar = 'bar';
// function bar() { return 'bar' }; // 函数具有变量提升作用, 改成函数表达式 也不具有提升作用 执行就会报错
// export { bar };