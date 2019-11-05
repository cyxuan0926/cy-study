export * from './test_1' // export * 命令会忽略test_1模块的default方法
export const e = 2.71
export default function(x) {
  console.log(Math.exp(x))
}