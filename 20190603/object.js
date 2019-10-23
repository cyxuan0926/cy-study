/**
 * 属性的简洁表示法:允许直接写入变量和函数 作为带薪的属性和方法
 * 属性名为变量名 属性值为变量的值 方法也可以简写
 * CommonJS模块输出一组变量 非常合适使用简洁写法
 * 属性名表达式 将表达式放在方括号之内 用于定义属性和方法
 * 属性名表达法和简写表示法 不能同时使用
 * Object.prototype.toString.call()：可用来具体判断数据类型 格式[object, (真实的数据类型)]
 * 属性名表达式如果是一个对象 默认情况下会自动将对象转为字符串[object, Object] 这一点要特别小心
 * decimalism:十进制;方法的name属性 返回方法的name 如果对象的方法使用了取值函数和存值函数，则name属性不是在
 * 该方法上面 而是在该方法的属性的描述对象的get和set属性上面 返回值是方法名前加上get 和 set
 * bind方法创造的函数 name属性在 返回 bound加上原函数的名字 Function构造函数创造的函数 name返回anonymous
 * bind call apply/ 属性的可枚举性和遍历：对象的每个属性都有一个描述对象(descriptor) 用来控制该属性的行为
 * prototype:原型 property:属性/ writable:可写 enumerable 可枚举性/简单 粗略的深拷贝 JSON.parse(JSON.stringify(obj))
 * enumberable为false时 这四个操作会忽略这个属性 for...in JSON.stringify Object.keys Object.assign
 * ES6规定 所以class的原型的方法都是不可枚举的/super关键字：this指向函数所在的当前对象 super则指向当前对象的原型对象
 * super关键字表示原型对象时 只能用在对象的方法之中，用在其他地方都会报错
 * 对象的扩展运算符 ...ES2018将其引入了对象
 * 对象的解构赋值用于从一个对象取值 将目标对象的所以可遍历 但尚未被读取的属性 拷贝到新对象上
 * 解构赋值必须是最后一个参数 解构赋值的拷贝是浅拷贝 扩展运算符的解构赋值 不能赋值继承自原型对象的属性
 * 如果使用解构赋值 扩展运算符后面必须是一个变量名 而不能是一个解构赋值表达式
 * 扩展运算符(...)用于取出参数对象的所以可遍历属性 拷贝到当前对象之中 由于数组是特殊的对象 所以对象的扩展运算符也可以用于数组
 * 如果扩展运算符后面是一个空对象 则没有任何效果/ 如果扩展运算符后面不是对象 则会自动将其转为对象
 * 如果扩展运算符后面是字符串 它会自动转成一个类似数组的对象 扩展运算符等同于使用Object.assign() 对象的扩展运算符后面可以跟表达式
 * 扩展运算符的参数对象之中 如有取值函数get 这个函数是会执行的
 */
/* 
let birth = '2019/06/03';
const Person = {
  name: 'cy',
  birth,
  hello() {
    console.log('我的名字是 ', this.name);
  }
}
let ms = {}
function getItem(key) {
  return key in ms ? ms[key] : null
}
function setItem(key, value) {
  ms[key] = value;
}
function clear() {
  ms = {};
}
module.exports = {
  getItem,
  setItem,
  clear
}
let propKey = 'foo'
let tsObj = {
  [propKey]: true,
  ['a'+ 'bc']: 123
}
console.log(tsObj);
let lastWorld = 'world';
const a = {
  'first world': 'hello',
  [lastWorld]: 'world'
}
console.log(a);
let a = []
console.log(Object.prototype.toString.call(a));
let keyA = {a: 1}, keyB = {b: 2}, myObject = {
  [keyA]: 'valueA',
  [keyB]: 'valueB'
}
console.log(myObject)
const person = {
  sayName() {
    console.log('hello');
  }
}
console.log(person.sayName.name);
const obj = {
  get foo() {},
  set foo(value) {}
}
const descriptor = Object.getOwnPropertyDescriptor(obj, 'foo');
console.log(descriptor.get.name, descriptor.set.name)
let a = function(){}
console.log((new Function()).name, a.bind().name)
let b = JSON.parse(JSON.stringify(obj))
obj.foo = 234
console.log(obj, b)
let obj = { foo: 123, name: 'cy'}
console.log(Object.getOwnPropertyDescriptor(obj, 'foo'))
console.log(Object.getOwnPropertyDescriptor(Object.prototype, 'toString').enumerable)
const proto = {
  foo: 'hello'
}
const obj = {
  foo: 'world',
  find() {
    return super.foo
  }
}
Object.setPrototypeOf(obj, proto)
console.log(obj.find())
const proto = {
  x: 'hello',
  foo() {
    console.log(this.x)
  }
}
const obj = {
  x: 'world',
  foo() {
    super.foo()
  }
}
Object.setPrototypeOf(obj, proto)
obj.foo()
let {x, y, ...z} = {x: 1, y: 2, a: 3, d: 4}
console.log(x,y,z)
let obj = {a: {b: 1}}
let {...x} = obj;
obj.a.b =2
console.log(x)
let o1 = {a: 1}, o2 = { b: 2};
Object.setPrototypeOf(o2, o1);
let {...o3} = o2;
console.log(o3);
const o = Object.create({x: 1, y: 2});
o.z = 3;
let { x, ...newObj} = o;
let {y, z} = newObj;
console.log(x, y, z);
let foo = {...['a','b','c']};
console.log(foo);
console.log({...1}) 由于Number{1}该对象没有自身属性 所以返回一个空对象
console.log({...'hello'});
let runtimerError = {
  ...{
    get x () {
      console.log('action')
    }
  }
}
 */
let a = {name: 'cy', age: 223},b = [1,2,4]
console.log(...a)
