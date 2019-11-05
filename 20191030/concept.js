/** 
 * Module的加载实现：上一章介绍了模块的语法 本章介绍如何在浏览器和Node之中加载ES6模块 以及实际开发中经常遇到的一些问题
 * 1.浏览器加载：
 *   HTML中 浏览器通过script标签加载JavaScript脚本：默认情况下 浏览器是同步加载JavaScript脚本
 *   浏览器允许脚本异步加载 <script defer> <script async>:
 *     defer：整个页面渲染完再执行(渲染完再执行)， 能保证多个脚本 会按照它们在页面出现顺序加载
 *     async：一旦下载完 渲染引擎就会中断 执行这个脚本以后 再继续渲染(下载完就执行)， 对各async脚本是不能保证加载的顺序
 * 2.加载规则：
 *   浏览器加载ES6模块 也使用<script>标签 但是要加入type="module"属性 <script type="module" src="./xxx"></script>
 *   浏览器对于带有type="module"的<script> 都是异步加载 不会造成堵塞浏览器 即等到整个页面渲染完 再执行模块脚本 等同于打开了<script>标签的defer属性
 *   <script>标签的async属性也可以打开 这时只要加载完成 渲染引擎就会中断渲染立即执行 执行完成后 再恢复渲染<script type="module" src="xx.js" async></script>
 *   ES6模块也允许内嵌在网页中 语法行为与加载外部脚本完全一致 <script type="module"> import utils from './xx.js' </script>
 *   对于外部的模块脚本 有几点需要注意:
 *    1.代码是在模块作用域之中运行 而不是在全局作用域运行 模块内部的顶层变量 外部不可见
 *    2.模块脚本自动采用严格模式 不管有没有声明 use strict
 *    3.模块之中 可以使用import命令加载其他模块(.js后缀不可省略 需要提供绝对URL或相对URL) 也可以使用export命令输出对外接口
 *    4.模块之中 顶层的this关键字返回undefined 而不是指向window 也就是说 在模块顶层使用this关键字 是无意义的
 *    5.同一个模块加载多次 将只执行一次
 * 3.ES6模块与CommonJS模块的差异
 *    1.CommonJS模块输出的是一个值的拷贝(CommonJS加载的是一个对象 即module.exports属性) ES6模块输出的是值的引用(遇到模块加载命令import 就会生成一个只读引用,这就好比main.js
 *    创造了一个名为obj的const变量;对于export通过接口 输出的是同一个值 不同的脚本加载这个接口 得到的都是同样的实例)
 *    2.CommonJS模块是运行时加载 ES6模块是编译时输出接口
 * 4.Node加载
 *    Node要去ES6模块采用.mjs后缀文件名  也就是说 只要脚本文件里面使用import或者export命令 就必须采用.mjs后缀名。同时 为了与浏览器的import
 *    加载规则相同 Node的.mjs文件支持URL路径。如果模块名不含路径 那么import命令会去node_modules目录寻找这个模块。如果模块名包含路径 那么import
 *    命令会按照路径去寻找这个名字的脚本文件；如果脚本文件省略了后缀名 比如 import './foo' Node会依次尝试四个后缀名：'./foo.mjs' './foo.js'
 *    './foo.json' './foo.node' 如果这些脚本文件都不存在 Node就会去加载'./foo/package.json'的main字段指定的脚本 如果./foo/package.json
 *    不存在或者没用main字段 那么就会依次加载./foo/index.mjs ./foo/index.js ./foo/index.json ./foo/index.node 如果以上四个文件还是都不
 *    不存在 就会抛出错误。Node的import命令是异步加载 这一点与浏览器的处理方法相同
 * 5.内部变量
 *    ES6模块应该是通用的 同一个模块不用修改 就可以用在浏览器和服务器环境。为了到达这个目标 Node规定ES6模块之中不能使用CommonJS模块的特有的一些内部变量
 *     1.this关键字：ES6顶层的this指向undefined；
 *     2.以下这些顶层变量在ES6模块之中都是不存在的：arguments、require、module、exports、__filename、__dirname;如果你一定要使用这些变量 就是写一个CommonJS
 *     模块输出这些变量，然后再用ES6模块加载这个CommonJS模块，但是这样一来 该ES6模块就不能直接用于浏览器环境了
 * 6.ES6模块加载CommonJS模块
 *     CommonJS模块的输出都定义在module.exports这个属性上面 Node的import命令加载CommonJS模块 Node会自动将module.exports属性 当作模块的默认输出 即等同于 
 *     export default xxx;CommonJS模块的输出缓存机制 ES6加载方式下依然有效
 *     CommonJS模块是运行时确定输出接口 所以采用import命令加载CommonJS模块时 因为CommonJS格式只有运行时才能确定里面的接口 而import命令要求编译时就确定这个接口
 * 7.CommonJS模块加载ES6模块
 *     CommonJS模块加载ES6模块 不能使用require命令 而要使用import()函数 ES6模块的所有输出接口 会成为输入对象的属性
 * 8.循环加载
 *     '循环加载'(circular dependency)指的是 a脚本的执行依赖b脚本 而b脚本的执行又依赖a脚本。通常'循环加载'表示存在强耦合 如果处理不好 还可能导致递归加载 使得
 *      程序无法执行 因此应该避免出现
 * 9.CommonJS模块的加载原理
 *      CommonJS的一个模块 就是一个脚本文件 require命令第一次加载该脚本 就会执行整个脚本 然后在内存生成一个对象
 *      { id：'', exports: {...}, loaded: true, ... } id属性是模块名 exports属性是模块输出的各个接口 loaded属性是一个布尔值 表示该模块的脚本是否执行完毕
 *      以后需要用到这个模块的时候 就会到exports属性上面取值 即使再次执行require命令 也不会再次执行该模块 而是到缓存之中取值，不论加载多少次 都只会运行一次
 *      以后再加载 就返回第一次的运行结果 除非手动清除系统缓存
 * 10.CommonJS模块的循环加载
 *      CommonJS模块的重要特性是加载时执行，即脚本代码在require的时候就会全部执行。一旦出现某个模块被'循环加载'，就只输出已经执行的部分，还未执行的部分就不会输出
 *      另外 由于CommonJS模块遇到循环加载时 返回的是当前已经执行的部分的值 而不是代码全部执行后的值
 * 11.ES6模块的循环加载
 *      ES6指向被加载模块的引用 需要开发者自己保证 真正取值的时候能够取到值
 * 12.ES6模块的转码
 *      浏览器目前还不支持ES6模块 为了现在就能使用 可以将其转为ES5的写法。除了babel可以用来转码之外 还有以下两个方法 也可以用来转码
 *        1.ES6 module transpiler: npm i -g es6-module-transpiler
 *        2.SystemJS:可以在浏览器将其转为ES5格式：引入<script src='system.js'></script> System.import()会自动将其转码，其使用异步加载
 *        返回一个Promise对象
*/