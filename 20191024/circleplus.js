/** 
 * export * 表示再输出circle模块的所有属性和方法 注 export * 命令会忽略circle模块的default方法 
*/
export * from './circle'
export let e = 2.71828182846;
export default function(x) {
  return Math.exp(x);
}