/** 
 * Module的语法：
 * js没有module体系 无法将一个大程序拆分成相互依赖的小文件 再用简单的方法拼装起来
 * ES6模块的设计思想是尽量的静态化 使得编译时就能确定模块的依赖关系 以及输入和输出的变量 CommonJS和AMD模块 都只能在运行时确定这些东西
 * ES6模块不是对象 而是通过exprot命令显示指定输出的代码 再通过import命令输入(编译时加载/静态加载)
 * 严格模式：ES6的模块自动采用严格模式
 *  注：尤其需要注意this的限制 ES6模块之中 顶层的this指向undefined 
 * export命令：用于规定模块的对外接口 import命令用于输入其他模块提供的功能, 输出变量、函数、类(模块的对外接口)
 * 一般情况下 export输出的变量就是本来的名字 但是可以使用as关键字重命名
 * 注：export命令规定的时对外的接口 必须与模块内部的变量建立一一对应关系
*/
// export let firstName = 'cy';
// export let lastName = 'xuan';
// export let year = 2019;
// let firstName = 'cy', lastName = 'xuan', year = 2019;
// function v1() {}
// function v2() {}
// export { firstName, lastName, year, v1 as a, v2 as b }
// export：用于规定模块的对外接口 import：输入其他模块提供的功能 一个模块就是一个独立的文件
// 需要特别注意的是, export命令规定的是对外的接口 必须与模块内部的变量建立一一对应关系
// 另外 export语句输出的接口 与其对应的值是动态绑定关系 即通过该接口 可以取到模块内部实时的值
// export let foo = 'bar'
// setTimeout(() => foo = 'baz', 500);
// 最好 export命令可以出现在模块的任何位置 只要处于模块顶层就可以 如果处于块级作用域内 就会报错，因为处在条件代码块之中
// 就没法做静态优化了
// function s() {
//   export default 'bar';
// }
// foo()
// import命令：通过import命令加载这个模块
// export function area(radius) {
//   return Math.PI * Math.pow(radius, 2);
// }
// export function circumference(radius) {
//   return 2 * Math.PI * radius;
// }
// export default 输出的 其他模块加载该模块时 import命令可以为该匿名函数指定任意名字 需要注意的是 这时import命令后面
// 不使用大括号
// 不使用export default时 对应的import语句需要使用大括号
/** 
 * export default命令用于指定模块的默认输出 显然 一个模块只能有一个默认输出 因为export default命令只能使用一次
 * 所有import命令后面才不用加大括号 因为只可能唯一对应export default命令
 * 本质上 export default就是输出一个叫做default的变量或方法, 然后系统允许你为它任意取名字 
*/
// import { foo } from './test01'
// foo() 
// import { default as foo } from './test01' // 等同于 import foo from './test01'
// console.log(foo)
// import MyClass from './test01'
// let a = new MyClass()
// console.log(a)
// const foo = 'a'
// const bar = 'b'