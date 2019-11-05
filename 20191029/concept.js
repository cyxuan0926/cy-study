/** 
 * javascript一直没有模块(module)体系 无法将一个大丞相拆分成相互依赖的小文件 再用简单的方法拼装起来。commonJS用于服务器 AMD用于浏览器
 * ES6模块的设计思路是尽量的静态化 使得编译时就能确定模块的依赖关系，以及输入和输出的变量
 * 由于ES6模块是编译时加载 使得静态分析成为可能 有了它 就能进一步拓宽JavaScript的语法
 * export命令：用于规定模块的对外接口。一个模块就是一个独立的文件 该文件内部的所有变量 外部无法获取，如果你想外部能够读取模块内部的某个变量
 * 就必须使用export关键字输出该变量.通常情况下 export输出的变量就是本来的名字 但是可以使用as关键字重命名
 * 注意 export命令规定的是对外的接口 必须与模块内部的变量建立一一对应关系，export实质是 在接口名与模块内部变量之间 建立了一一对应的关系
 * export语句输出的接口 与其对应的值是动态绑定关系 即通过该接口 可以取到模块内部实时的值
 * export命令可以出现在模块的任何位置 只要处于模块顶层就可以
 * import命令: 通过import命令加载这个模块，大括号里面指定其他模块导入的变量名 里面的变量名 必须与被导入的模块对外接口的名称相同
 * 如果想为输入的变量重新取一个名字 import命令要使用as关键字 将输入的变量重命名
 * import输入的变量都是只读的 因为它的本质是输入接口，但是如果a是一个对象 改写a的属性是允许的
 * import后面的from指定模块文件的位置 可以是相对路径 也可以是绝对路径 .js后缀可以省略 如果是模块名 不带有路径 那么必须有配置文件 告诉JavaScript引擎盖模块的位置
 * 注意 import命令具有提升效果 会提升到整个模块的头部 首先执行。 由于import是静态执行 所有不能使用表达式和变量
 * 最后 import语句会执行所加载的模块 比如 import 'lodash' 这代码仅仅执行lodash模块 不是不输入任何值。如果多次重复执行同一句import语句 那么只会执行一次 不会多次执行
 * 模块的整体加载：除了指定加载某个输出值 还可以使用整体加载 即用星号(*)指定一个对象 所有输出值都加载在这个对象上面 import * as cicrle from './xxx'
 * export default命令：为模块指定默认输出，其他模块加载该模块时 import命令可以为该匿名接口指定任意名字(注意：此时import命令后面 不使用大括号)
 * export default用在非匿名变量面前也是可以的；因为export default命令其实只是输出一个叫做default的变量 所有后面不能跟变量声明语句
 * export default命令的本质 是将后面的值 赋值给变量default 所以可以直接将一个值写在export default之后
 * export default 也可以用来输出类
 * export 与 import的复合写法：如果在一个模块之中 先输入后输出同一个模块 import语句可以与export语句写在一起
 * export {xx, xx} from 'xx'（当前模块不能直接使用xx ，xx两个接口） === import { xx, xx } from 'xx' export {xx, xx}
 * 默认接口的写法： export { default } from 'xx'
 * 具名接口改成默认接口的写法： export { xx as default } from 'xx'
 * 默认接口改成具名接口的写法： export { default as xx } from 'xx
 * 下面三种import语句 没有对应的复合写法:
 * 1. import * as xx from 'xx'
 * 2. import xx from 'xx'
 * 3. import xx1, { xx2 } from 'xx'
 * 模块的继承：模块之间也可以继承
 * 跨模块常量：module模块化可以做到
 * import('指定所要加载的模块的位置')函数:完成动态加载，返回一个Promise对象，可以用在任何地方 运行到这一句 就会加载指定的模块
 * import()是异步加载 require()是同步加载
 * 适用场合：
 * 1.按需加载：可以在需要的时候 再加载某个模块
 * 2.条件加载：可以放在if代码块 根据不同的情况 加载不同的模块
 * 3.动态的模块路径：允许模块路径动态生成
 * 注意点：import()加载模块成功以后 这个模块会作为一个对象 当作then方法的参数 因此可以使用对象解构赋值的语法 获取输出接口 import('xx').then(({xx1, xx2}) => {})
 *       如果模块有default输出接口 可以用参数直接获得 import('xx').then(obj => obj.default) || .then(({default: xx }) => xx)
 *       如果想同时加载多个模块 可以Promise.all([import('xx1'), import('xx2'), ...]).then(([module1, module2, ....]) => {})
 *       import()也可以用在async函数之中 async function test01() { const xx1 = await import(ss1) const {export1, export2} = await import('./myModule.js');
                                const [module1, module2, module3] =await Promise.all([import('./module1.js'),import('./module2.js'),import('./module3.js'),]);}
*/