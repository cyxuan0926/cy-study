#!/usr/bin/env node
/** 
 * vue mixin混入 如果是对象 则递归合并 冲突的属性 取组件对象的键值 如果是方法类型的 那就是都调用 且混合的在组件之前被调用
 * mixin(混入)：提供了一种非常灵活的方式 来分发Vue组件中的可复用功能，一个混入对象可以包含任意组件选项。当组件使用混入对象时
 * 所以混入对象的选项将被'混合'进入该组件本身的选项。当组件和混入对象含有同名选项时 这些选项将以恰当的方式进行'合并'
 * data对象在内部会进行递归合并 并在发生冲突时以组件数据优先/同名钩子函数将合并为一个数组，因此都被调用 混入对象的钩子将在组件自身钩子
 * 之前调用/值为对象的选项 将被合并为同一个对象 两个对象的键名冲突时 取组件对象的键值对
 * 对象的新增方法 ===严格相等：NaN不等于自身 +0与-0相等的缺点 Object.is用来比较两个值是否严格相等 并且也解决了===严格相等的缺点
 * Object.assign 用于对象的合并 将源对象的所以可枚举属性 复制到目标对象 如果有同名属性 后面的属性会覆盖前面的属性
 * 如果只有一个参数 则直接返回该参数，如果该参数不是对象 则会先转成对象 然后返回/如果参数是undefined||null 则会报错
 * 如果非对象参数出现在源对象的位置(即非首参数) 首先这些参数都会转成对象 如果无法转成对象 就会跳过 这意味着 如果undefined 和null
 * 不在首参数 就不会报错了/包装对象：js中 一切皆对象 String Number Boolean 在一定条件下 也会自动转为对象 也就是原始类型的'包装对象'
 * 这些原始类型 new String() new Number() new Boolean()显示地创建原始类型地包装对象 
 * npm link 
 * 集群技术：集群是一种较新的技术 通过集群技术 可以再付出较低成本的情况下获得在性能、可靠性、灵活性方面的相对较高的收益 任务调度则是
 * 集群系统中的核心技术/集群式一组相互独立的 通过高速网络互联的计算机，它们构成了一个组，并以单一系统的模式加以管理
*/
/* 
console.log(Object.is({}, {}), Object.is(+0, -0), Object.is(NaN, NaN));
es5可以这么部署 实现 
Object.defineProperty(Object, 'is', {
  value: function(x, y){
    if( x === y ) {
      return x !==0 || 1/x === 1/y;
    }
    return x !==x && y !==y;
  },
  enumerable: false,
  configurable: true,
  writable: true
})
console.log(Object(1), Object(10), Object('abc'));
直接写变量 变量名就是属性名 变量值就是属性值
简洁写法的属性名总是字符串
const obj = {
  class(){} === 'class': function() {}
}
属性名表达式[方括号之中]/标识符 字面量方式就是变量本身
name属性
ES6规定 所以Class的原型的方法都是不可枚举的
super 是当前对象的原型对象 只能用再对象的方法中 
目前只有对象的方法的简写法可以让JavaScript引擎确认 定义的是对象的方法
扩展运算符的解构赋值 不能复制继承自原型对象的属性
对象的解构赋值相当于将目标对象自身的可遍历的 但尚未被读取的属性 分配到指定的对象上面 所以的键值都会
被拷贝到新对象上面/如果使用解构赋值 扩展运算符后面必须是一个变量名 而不能是一个解构赋值的表达式
function bashFunction({a, b}){
  console.log([a, b]);
}
function wrapperFunction({x, y, ...restConfig}) {
  console.log([x, y]);
  return bashFunction(restConfig);
}
wrapperFunction({x: 2, y: 3,a: 4, b: 5});
对象的扩展运算符(...)用于取出参数对象的所以可遍历属性 拷贝到当前对象之中
包装对象：只有引用类型才有属性和方法 原始类型是没有的 我们会看到
number/string/boolean 再一定情况下 也会自动转为对象 也就是原始类型的'包装对象'
包装对象是特殊的引用类型。每当读取数字、字符串和布尔值的属性或方法时，创建的 临时对象 称做包装对象
包装对象：js语言中的对象和基础类型string number boolean都可以使用.符号访问属性和方法
但是本质是只有对象才可以使用.，就要引入包装对象这个概念 当遇到.这个操作的时候 js解析器首先会调用基础类型对应的构造函数
构建一个临时包装对象 然后再访问包装对象的属性
扩展运算符的参数对象之中 如果有取值函数get 这个函数会执行的
let a ={name: 'cy'}, runtimerError = {
...a,
...{
  get x() {
    console.log('now'); // 因为是再扩展运算符的参数对象中的get函数 所以这个函数会执行
  }
}
}
console.log(Object.is(+0, -0), Object.is(NaN, NaN));
Object.defineProperty(Object, 'is', {
  value(x, y) {
    if(x === y) return x !== 0 || 1/x === 1/y; //相等的情况 处理+0===-0 
    return  x !== x && y !== y;// 不相等的情况 处理 NaN !== NaN
  },
  writable: true,
  configurable: true,
  enumerable: false
});
如果非参数对象出现在源对象的位置 那么无法转换成对象的 就会跳过的
 */
console.log('test package.json bin')