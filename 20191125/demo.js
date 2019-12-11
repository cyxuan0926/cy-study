// let x = do {
//   let t = 4;
//   Math.pow(t, 2) + 1;
// };
// console.log(x)
// const enable = props.enabled ?? true;
// const { enabled: enable = true } = props 
// function add(x, y) {
//   return x + y;
// };
// const add7 = add.bind(null, 7)
// const add7p = x => add(x, 7);
// function add7(x) { // add函数的一个特殊版本
//   return x + 7;
// }
// const g = f(?, 1, ...);
// const gp = (x, ...y) => f(x, 1, ...y);
// let obj = {
//   f(x, y) {
//     return x + y;
//   }
// }
// const g = obj.f(?, 3);
// console.log(g(1));
// x |> f === f(x)
/**
 * parseInt(string, radix):将一个字符串string转换为radix进制的整数 radix为介于2~36之间的数
 * string：要被解析的值 如果参数不是一个字符串 则将其转换为字符串(使用ToString) 字符串开头的空白
 * 符会被忽略
 * radix: 2~36之间的整数 默认是10
 * 返回解析后的整数值 如果被解析参数的第一个字符无法被转化成数值类型 则返回NaN
 * 注：radix参数为n将会把第一个参数看作是一个数的n进制表示 而返回的值则是十进制的
 * 如果parseInt的字符不是指定基数中的数字 则忽略该字符和所以后续字符 并返回解析到该点
 * 的整数值。一些数中可能包含e字符，使用parseInt去截取包含e字符数值部分会造成难以预料
 * 的结果
 * 在基数为undefined 或者 为0或者没有指定的情况下,处理如下
 * 如果字符串string以0x或者0X开头 则基数是16
 * 如果字符串string以0开头 基数是8或者10 具体由实现环境决定
 * 如果字符串string以其它任何值开头 基数是10
 * 如果第一个字符不能被转换成数组 则返回NaN
 * 将整型数值以特定基数转换成它的字符串可以使用 intValue.toString(radix)
 * 注 parseInt的第一个参数是字符串 所以假如是整数需要转成对应基数的字符串
 * parseInt(value[, radix])语法流程：
 *   1. value 为 字符串 go on
 *   2. value 不是字符串 do
 *      1. 如果 value 是以 0x 或者 0X 开头的 则 stringRadix 为 16
 *      2. 如果 value 是以 0b 或者 0B 开头的 则 stringRadix 为 2
 *      3. 如果 value 是以 0O 0o  开头的 则 stringRadix 为 8
 *      4. 如果 value 是以 0 开头的 则根据具体的实现环境来决定
 *      5. 其余情况 stringRadix 为 10
 *      6. value.toString(stringRadix)
 *         1. 如果 value.toString(radix) 转不了 返回NaN
 *         2. 否则 go on
 *   3. radix 如果存在 go on
 *       1. 不在[2, 36] 返回 NaN
 *       2. 否则 go on
 *   4. radix 不存在 do
 *      1. 如果 value 是以 0x 或者 0X 开头的字符串 在 radix 为 16
 *      2. 如果 value 是以 0b 或者 0B 开头的字符串 在 radix 为 2
 *      3. 如果 value 是以 0O 0o  开头的字符串 在 radix 为 8
 *      4. 如果 value 是以 0 开头的字符串 则根据具体的实现环境来决定
 *      5. 其余情况 radix 为 10
 *   5. 如果 value 里面的每位值 都在 radix 基数范围内 go on
 *   6. 如果 不是那种情况 do
 *      1. 忽略改位置字符 以及后续字符 并返回解析到该点数值 赋值给 value
 */
// console.log(parseInt('ad', 5))
// console.log(parseInt('6.022e23', 10), parseInt(6.022e2, 10));
// console.log((10).toString(2))
// 021 默认是八进制数的表示 转为十进制 17 转为字符串 ‘17’
// console.log(parseInt(4.7 * 1e22, 10), parseInt(0.00000000000434, 10))
// 去抖 和 节流
/** 
 * 在用户和前端页面的交互过程中 很多操作的触发频率非常高 比如鼠标移动 mousemove 事件, 滚动条滑动 scroll 事件, 输入框 input 事件, 键盘 keyup 事件，浏览器窗口 resize 事件
 * 在以上事件上绑定回调函数 如果回调函数是一些需要大量计算、消耗内存、HTTP请求、DOM操作等 去抖和节流函数的根据思想就是 减少高频率事件处理函数handler的执行频率(注意是事件处理函数 不是事件回调函数)
 * 将多次事件的回调合并成一个回调来执行 从而优化性能
 * 去抖 也叫防抖：就是事件触发频率稳定后 才开始执行回调函数 一连串的事件触发 但只进行一次事件处理。去抖分为延迟执行和立即执行两种思路 
*/