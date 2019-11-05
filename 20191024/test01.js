// import命令接受一对大括号 里面指定要从其他模块导入的变量名 大括号里面的变量名 必须与被导入模块对外接口的名称相同
// 如果想为输入的变量重新取一个名字 可以使用as关键字 将输入的变量重命名
/**
 * import命令输入的变量都是只读的 因为它的本质是输入接口 也就是说 不允许在加载模块的脚本里面 改写接口
 * 但是如果是一个对象 改写对象的属性是允许的，但是不要轻易修改输入接口的变量
 * import后面的from指定模块文件的位置 可以是绝对路径 也可以是相对路径 .js后缀可以省略 如果只是模块名 不带有路径
 * 必须有配置文件 告诉JavaScript引擎该模块的位置
 * 注意import命令具有提升效果 会提升到整个模块的头部 首先执行:因为import命令是编译阶段执行 在代码运行之前
 * 由于import是静态执行 所以不能使用表达式和变量
 * export 与 import的复合写法: 如果在一个模块之中 先输入后输出同一个模块 import语句可以与export语句写在一起
 * 模块地继承:模块之间也可以继承.
 * 跨模块变量: 如果使用的常量非常多, 可以建一个专门的constants目录 将各种常量写在不同的文件里面 然后将这些文件输出的常量
 * 合并在index.js里面 使用的时候 直接加载index.js就可以了
 * import(): 一个提案 建议引入import() 完成动态加载, 参数是指定所要加载的模块的位置或者模块, 返回一个promise对象
 * import()韩式可以用在任何地方 不仅仅是模块 非模块的脚本也可以使用 它是允许时执行 什么时候运行到这一句 就会加载指定的模块
 * import()函数是异步加载的,与所加载的模块没有静态连接关系
 * 适合场合:
 *  1.按需加载:可以在需要的时候 再加载某个模块
 */
// console.log(firstName)
// import { firstName, lastName, year as cy } from './module'
// function sayName() {
//   console.log(firstName, lastName, cy)
// }
// sayName()
// import语句会执行所加载的模块 因此可以有下面的写法 如果重复执行同一个import语句 那么只会执行一次 而不会执行多次
// import 'lodash' // 仅仅执行loash模块 但是不输入任何值
// 模块的整体加载：除了指定加载某个输出值 还可以使用整体加载 即用星号(*)指定一个对象 所以输出值都加载在这个对象上面
// import * as circle from './module'
// console.log('圆面积：' + circle.area(4))
// console.log('圆周长：' + circle.circumference(14))
// 注:模块整体加载所有的那个对象 应该时可以静态分析的 所有不允许运行时改变
// export default命令：为模块指定默认输出,用在非匿名函数前 也是可以的
// export default function() {
//   console.log('foo')
// }
// export function foo() {
//   console.log('fooasdasd')
// }
// function add(x, y) {
//   return x * y;
// }
// export { add as default } // 等同于 export default add
// 注:正因为export default 命令其实只是输出一个叫做default的变量 所有它后面不能跟变量声明语句
// export default const a = 1; // 错误
// 同样地 因为export default命令地本质是将后面地值 赋给default变量 所有可以直接将一个值写在export default 后面
// export default 42;
// 有了export default命名 输入模块时就非常直观了 也可以用来输出类
// export default class cy{}
// 注:下面这种写法export import写在一行 foo, bar实际上并没有被导入当前模块 只是对外转发了这两个接口 导致当前模块不能直接使用 foo 和bar
// export { foo, bar } from './module' // === import { foo, bar } from './' export { foo, bar } 
// 模块的接口改名和整体输出 也可以采用这种写法
// export { foo as myFoo } from './module'
// export * from './module'
// 默认接口的写法
// export { default } from './module'
// 具名接口改为默认接口的写法:
// export { es6 as default } from './module' // === import { es6 } from './xxx' export default es6
// 同样地 默认接口也可以改名为具名接口
// export { default as es6 } from './module'
// 下面三种import语句 没有对应地复合写法
// import * as something from './module'
// import someDefault from './module'
// import someDefaults, { nameSomething } from './module'