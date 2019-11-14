/** 
 * 1.块级作用域
 *   1. let 取代 var；
 *   2. 全局变量和线程安全：在let 和const 之间 建议优先使用const，尤其是在全局环境 不应该设置变量 只应设置常量
 *      1.const可以提醒阅读程序的人 这个变量不应该改变
 *      2.比较符合函数式编程思想，运算不改变值 只是新建值
 *      3.JavaScript编译器会对const进行优化 有助于提高程序的运行效率
 *   3.字符串:静态字符串一律使用单引号或反引号 不使用双引号 动态字符串使用反引号
 *      const a = 'foobar';const b = `foo${a}bar`
 *   4.解构赋值：使用数组成员对变量赋值时 优先使用解构赋值；函数的参数如果是对象的成员 优先使用解构赋值
 *      如果函数返回多个值 优先使用对象的解构赋值 而不是数组的解构赋值
 *   5.对象：单行定义的对象 最后一个成员不以逗号结尾 多行定义的对象 最后一个成员以逗号结尾
 *       const a = { k1: 'a', k2: 'b' }
         const b = {
          k1: '2',
          k2: '3',
         }
         对象尽量静态化，一旦定义 就不得随意添加新的属性 如果添加属性不可避免 要使用Object.assign方法
         如果对象的属性名是动态的 可以在创造对象的时候 使用属性表达式定义
         const obj = {
          id: 5,
          name: 'San Francisco',
          [getKey('enabled')]: true,
        }
        对象的属性和方法 尽量采用简洁表达式,这样易于描述和书写
        let ref = 'some value'
        const atom = {
          ref,
          value: 1,
          addValue: value => atom.value + value
        }
      6.数组：使用扩展运算符(...)拷贝数组，使用Array.from()将类似数组的对象转为数组
      7.函数：立即执行函数可以改写成箭头函数的形式；那些使用匿名函数当作参数的场合 尽量使用箭头函数代替 因为这样更简洁 而且绑定了this
              箭头函数取代Function.prototype.bind 不应再用 self/_this/that绑定，所有配置项都应该集中在一个对象 放在最后一个参数
              布尔值不可以直接作为参数；不要在函数体内使用arguments变量 使用rest运算符(...)代替 因为rest运算符显示表明你想要获取参数
              arguments是一个类似数组的对象而rest运算符可以提供一个真正的数组
              function concatenateAll() {
                console.log(arguments)
                const args = Array.prototype.slice.call(arguments)
                console.log(args)
              }
              concatenateAll('a','b','c')
              使用默认值语法设置函数参数的默认值
      8.Map结构：如果只是需要key:value的数据结构 使用Map结构 因为Map有内建的遍历机制
      9.Class：总是用Class 取代需要prototype的操作；使用extends实现继承 因为这样更简单 不会有破坏 instanceof运算的危险
              构造函数的prototype属性是否出现在某个实例的原型链上
      10.模块：Module语法是JavaScript模块的标准写法 坚持使用这种写法 使用import取代require；使用export 取代module.exports
              如果模块只有一个输出值 就使用export default 如果模块有多个输出值 就不要使用default 其与普通的export不要同时使用
              不要在模块输入中使用通配符 因为这样可以确保你的模块之中 有一个默认输出(export default)
              如果模块默认输出一个函数 函数名的首字母应该小写，如果模块默认输出一个对象 对象名的首字母应该大写
              function makeStyleGuide() {}
              export default makeStyleGuide
              const StyleGuide = {}
              export default StyleGuide
      11.ESLint的使用：一个语法规则和代码风格的检查工具 可以用来确保写出语法正确 风格统一的代码
      12.ECMAscript规格
              1.术语：
                抽象操作(abstract operations)：就是引擎的一些内部方法 外部不能调用；规格定义了一些列的抽象操作 规定了它们的行为
                留给各种引擎自己去实现
                Record和field：ES6规格将键值对(key-value map)的数据结构称为Record 其中的每一组键值对成为field;一个record由多个field组成 而每个field都包含一个键名和一个键值
                [[Notation]](符号):ES6规格大量使用[[Notation]]这种书写法， 比如[[value]]、[[writable]]、[[Get]]、[[Set]]等等 它用来指代field的键名
                  obj.prototype === obj[[prototype]](es6写法)，一般来说 使用[[Notation]]这种写法的属性 都是对象的内部属性
                Completion Record:每个语句都会返回一个Completion Record 表示运行结果 每个Completion Record有一个[[Type]] 属性 表示运行结果的类型，有五种可能的值:normal(运行正常) return throw(运行出错) break continue
              2.抽象操作的标准流程：
                1.Let resultCompletionRecord be AbstranctOp()
                2.If resultCompletionRecord is an abrupt completion return resultCompletionRecord
                3.Let result be resultCompletionRecord.[[value]]
                4.return result
                简写1：
                1.Let result be AbstractOp()
                2.ReturnIfAbrupt(result)
                3.return result
              3.相等运算符：
                1.ReturnIfAbrupt(x)
                2.ReturnIfAbrupt(y)
                3.If Type(x) is the same as Type(y) then
                  1.Return the result of performing Strict Equality Comparison x === y
                4.If x is null and y is undefined return true;
                5.If x is undefined and y is null return true;
                6.If Type(x) is Number and Type(y) is String return the result of the result of the comparison ToNumber(y) == x;
                7.If Type(x) is String and Type(y) is Number return the result of the comparison ToNumber(x) == y;
                8.If Type(x) is Boolean return the result of the comparison ToNumber(x) == y
                9.If Type(y) is Boolean return the result of the comparison x == ToNumber(y)
                10.If Type(x) is either String, Number, or Symbol and Type(y) is Object then return the result of the comparison x == Toprimitive(y)
                11.If Type(x) is Object and Type(y) is either String Number or Symbol then return the result of the comparison Toprimitive(x) == y
                12 return false
              4.数组的空位：
                const a1 = [undefined, undefined, undefined]
                const a2 = [,,,]
                console.log(a1.length, a2.length, a1[0], a2[0], a1[0] == a2[0]);
                console.log(0 in a1, 0 in a2, a1.hasOwnProperty(0), a2.hasOwnProperty(0))
                'Array elements may be elided at the beginning, middle or end of the element list. whenever a comma in the element list is not preceded by an AssignmentExpression(1.e., a comma at the
                beginning or after another comma) the missing array element contributes to the length of the Array and increases the index of subsequent elements.Elided Array elements are not defined
                If an element is elided at the end of an array, that element does not contribute to the length of the Array'
              5.数组的map方法：
                1.Let O be ToObject(this value)
                2.ReturnIfAbrupt(O)
                3.Let len be ToLength(Get(O, 'length))
                4.ReturnIfAbrupt(len)
                5.If IsCallable(callbackfn) is false throw a TypeError exception
                6.If thisArg was supllied let T be thisArg else let T be undefined
                7.Let A be ArraySpeciesCreate(O,len)
                8.ReturnIfAbrupt(A)
                9.Let K be 0
                10 Repeat, while k < len
                    1.Let PK be ToString(k)
                    2.Let kPresent be HasProperty(O,PK)
                    3.ReturnIfAbrupt(kpresent)
                    4.If KPresent is true then
                      1.Let kValue be Get(O,PK)
                      2.ReturnIfAbrupt(kValue)
                      3.Let mappedValue be call(callback, T, <<kValue, k, O>>)
                      4.ReturnIfAbrupt(mappedValue)
                      5.Let status be CreateDataPropertyOrThrow(A, PK, mappedValue)
                      6.ReturnIfAbrupt(status)
                    5.Increase k by 1
                11.Return A
              const arr = [,,,]
              const s = arr.map(n => {
                console.log(n);
                return 1;
              });
              console.log(s)
              注；直接跳过 没有执行回调函数 返回一个全是空位的新数组
              function ArrayMap(f, receiver) {
                CHECK_OBJECT_COERCIBLE(this, 'Array.prototype.map');
                let array = TO_OBJECT(this);
                let length = TO_LENGTH_OR_UINT32(array.length);
                return InnerArrayMap(f, receiver, array, length);
              }
              function InnerArrayMap(f, receiver, array, length) {
                if(!IS_CALLABLE(f)) throw MakeTypeError(kCalledNonCallable, f);
                var accumulator = new InternalArray(length);
                var is_array = IS_ARRAY(array);
                var stepping = DEBUG_IS_STEPPING(f);
                for(var i = 0; i < length; i++) {
                  if (HAS_INDEX(array, i, is_array)) {
                  var element = array[i]
                  if (stepping) %DebugPrepareStepInIfStepping(f);
                  accumulator[i] = %_Call(f, receiver, element, i, array);
                  }
                }
                var result = new GlobalArray();
                %MoveArrayContents(accumulator, result);
                return result;
              }
*/



