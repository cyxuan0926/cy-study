#!/usr/bin/env node
// let output;
// 问题的出现
// async function main() {
//   const dynamic = await import(someMission);
//   const data = await fetch(url);
//   output = someProcess(dynamic.defalut, data);
// };
// main();
// 第一次的修改
// export default (async function main() {
//   const dynamic = await import(someMission);
//   const data = await fetch(url);
//   output = someProcess(dynamic.defalut, data);
// })();
// export { output };
// 第二次的修改 顶层await命令 只有等异步操作完成 这个模块才会输出值
// const dynamic = import(someMission)
// const data = fetch(url);
// export const output = someMission((await dynamic).default, await data);
console.log('Y1')
console.log('Y2');