/** 
 * 最新提案
 *  do表达式
 *    本质上 块级作用域是一个语句 将多个操作封装在一起 没有返回值.现在有一个提案 使得块级作用域可以变为表达式 也就是说可以返回值 在块级作用域之前加上do 使它变为do表达式 然后就
 *    会返回内部最后执行的表达.
 *    do表达式的逻辑非常简单 封装的是什么 就会返回什么
 *    还可以封装多个语句 让程序更加模块化
 *    do { <表达式> } === 表达式
 *    do { <语句> } === 语句
 *    do表达式在JSX语法中非常好用
 *  throw表达式
 *    JavaScript语法规定throw是一个命令 用来抛出错误 不能用在表达式之中。现在有一个提案 允许throw用于表达式
 *    语法上 throw表达式里面的throw不再是一个命令 而是一个运算符。为了避免与throw命令混淆 规定throw出现在行首
 *    一律解释为throw语句 而不是throw表达式
 *  链判断运算符
 *    读取对象内部的某个属性 往往需要判断下该对象是否存在。现在有一个提案 引入了"链判断运算符"(optional chainning operator) ?.
 *    直接在链式调用的时候判断 左侧的对象是否为null 或undefined 如果使得 就不再往下运算 而是返回undefined
 *    三种用法
 *      obj?.prop // 对象属性
 *      obj?.[expr] // 对象属性
 *      func?.(...args) // 函数或对象方法的调用
 *    使用这个运算符 有几个注意点
 *      短路机制
 *        a?.[++x] => a == null ? undefined : a[++x]：如果a是undefined或null 那么x不会进行递增运算
 *      delete运算符
 *        delete a?.b => a == null ? undefined : delete a.b 如果a是undefined或null 不会进行delete运算
 *      括号不改变运算顺序
 *        (a?.b).c => (a == null ? undefined : a.b).c 一般来说 使用?.运算符的场合 不应该使用圆括号
 *      报错场合
 *        构造函数/链判断运算符右侧有模板字符串/链判断运算符的左侧是super/链判断运算符用于赋值运算符左侧
 *      右侧不得为十进制数值
 *        foo?.3:0 可能会被解析成 foo ? .3 : 0 此时规定会被分解成三目运算符 和一个小数
 *    Null判断运算符(??)
 *      读取对象属性的时候 如果某个属性的值是null或undefined 有时候需要为它们指定默认值 常见做法是通过||运算符指定默认值
 *      const headerText = response.settings.headerText ?? 'Hello, world'
 *      定义：只有左边的值是null或者undefined时 才生效。这个运算的一个目的 就是跟链判断运算符?.配合使用
 *      为null或undefined的值设定默认值
 *      ?? 与 && 和 ||的优先级规则
 *        如果多个逻辑运算符一起使用 必须用括号表明优先级 否则会报错 (A && B) ?? C
 *    函数的部分执行(partial application) ?是单个参数的占位符 ...是多个参数的占位符
 *      多参数的函数有时候需要绑定其中的一个或多个参数 然后返回一个新函数。
 *      ?和...只能出现在函数调用之中 并且会返回一个新函数
 *      函数的部分执行 也可以用于对象的方法
 *      注意点
 *        函数的部分执行是基于原函数的 如果原函数发生变化 部分执行生成的新函数也会立即反映这种变化
 *        如果预先提供的那个值是一个表达式 那么这个表达式并不会在定义时求值 而是在每次调用时求值
 *        如果新函数的参数多于占位符的数量 那么多余的参数将被忽略
 *        ...只会被采集一次 如果函数的部分执行使用了多个... 那么每个...的值都将相同
 *    管道运算符 |>
 *      Unix操作系统有一个管道机制(pipeline) 可以把前一个操作的值传给后一个操作，使得简单的操作可以组合
 *      成为复杂的操作.管道运算符 |> 它的左边是一个表达式 右边时一个函数 管道运算符把左边表达式的值 传入
 *      右边的函数进行求值.
 *      最大的好处是可以把嵌套的函数 写出从左到右的链式表达式 A |> F |> G |> H
 *      管道运算符只能传递一个值 这意味着它右边的函数必须是一个单参数函数 如果是多参数函数 就必须进行柯里化
 *      改成单参数的版本.
 *      管道运算符对于await函数也适用 x |> await f === await f(x)
 *    数值分隔符(_)
 *      欧美语言中 较长的数值允许每三位加一个分隔符(通常是一个逗号) 增加数值的可阅读性
 *      javaScript的数值分隔符没有指定间隔位数/小数 和 科学计数法也可以使用数值分隔符
 *      注意点
 *        不能在数值的最前面(leading)或最后面(trailing)/不能两个或两个以上的分隔符连在一起
 *        小数点的前后不能有分隔符/科学计数法里面 指数e或E前后不能有分隔符
 *        除了十进制 其他进制的数值也可以使用分隔符/分隔符不能紧跟着进制的前缀0b 0B 0o 0O 0X 0x
 *        Number()、parseInt()、parseFloat()这三个函数 不支持数值分隔符
 *    BigInt数据类型： 只是一种数据类型 其实本质也是数
 *      JavaScript所有数字都保存成64位浮点数
 *        IEEE754标准 任意一个二进制浮点数V的表示形式
 *          V = (-1)^S * M * 2^E
 *          32位浮点数：最高的一位是符号位s 接着的8位是指数E 23位是有效数字位
 *          64位浮点数：最高的一位是符号位s 接着的11位是指数E 52位是有效数字位
 *          注：1 <= M < 2 也就是说M可以写出1.abcdef...的形式， 其中abcdef...表示小数部分 IEEE754规定
 *            在计算机保存M时 默认这个数的第一位为1 因此可以被舍去 这样就可以节省一位有效数字位 使得32(64)
 *            位浮点数可以保存24(53)位的有效数字
 *            指数E的情况稍微复杂一些：
 *              E是一个无符号的整数 当E为8位时 其取值范围为 0 到255 E为11位的时候 范围为 0到2047
 *              但是科学计数法中的E可以时负数 所有e实际存储在计算机中的值减去一个中间值 才是真实值
 *              所有e(计算机中存储的) = E(真实值) + 127(32) || 1023(64)
 *                浮点数的表示中移码(源码的基础上加上一个偏移量)表示阶码
 *                  便于比较大小 如果阶码(指数)也用补码来表示 就会使得一个浮点数中出现两个符号位：浮点数自身的和浮点数指数部分的 这样的结果是
 *                  在比较两个浮点数大小时 无法像比较整数时一样使用简单的无逻辑的二进制比较 故而在浮点数的指数部分采用了移码(无符号整数)来表示
 *                8位有符号的数：-128 ~ 127 在浮点数的阶码中 00000000与11111111被保留用作特殊情况 所以阶码可用范围只有  
 *                8位无符号的数： 0 ~ 255 1 ~ 254
 *                11位有符号的数：-1024 ~ 1023
 *            s符号位，等于0时为正 等于1时为负
 *            M为有效数字 1 <= M < 2
 *            2^E表示指数位
 *        数值的精度只能到53个二进制位(相当于16个十进制数) 大于这个范围的整数 无法精确表示
 *        大于或等于2的1024次方的数值 JavaScript无法表示 会返回Infinity
 *          11位指数位 2^11-1 =2047 -1023 ~ 1024
 *        新的数据类型BigInt(大整数).BigInt只用来表示整数 没有位数的限制 任何位数的整数都可以精确表示.为了与Number类型区别 BigInt类型的数据必须添加后缀n
 *          const a = 12322323231213213123123n; 表示任何位数的整数 并且是精确表示
 *        BigInt同样可以使用各种进制表示 都要加上后缀n 0b1101n/0xFFn/0o777n
 *        BigInt与普通整数是两种值 它们之间并不相等 42n === 42 false
 *        typeof 运算对于BigInt类型的数据返回 bigint
 *        BigInt 可以使用负号(-) 但是不能使用正号(+)
 *      BigInt对象
 *        JavaScript原生提供BigInt对象 可以用作构造函数生成BigInt类型的数值.转换规则基本与Number一致 将其他类型的值转为BigInt
 *        BigInt()构造函数必须有参数 而且参数必须可以正常转为数值 会报错 如果是小数 也会报错
 *        BigInt对象继承了Object对象的两个实例方法
 *          BigInt.prototype.toString()
 *          Number.prototype.toString([,radix])
 *             返回指定Number对象得字符串表示形式 radix指定要用于数字到字符串得转换得基数([2,36]) 默认是10 Number对象覆盖了Object对象上的toString方法 如果基数大于10 则会使用字母来表示大于9的数字
 *             如果对象是负数 则会保留负号 即使radix是2也是如此 返回的字符串包含一个负号前缀和正数的二进制表示 不是数值的二进制补码 进行数字到字符串的转换时 建议用小括号将要转换的目标括起来 防止出错
 *          BigInt.prototype.valueOf()
 *        还继承了Number对象的一个实例方法
 *          BigInt.prototype.toLocaleString()
 *          Number.prototype.toLocaleString([locales, [options]])
 *            返回这个数字在特定语言环境下的表示字符串.新的locales 和 options参数让应用程序可以指定要进行格式转换的语言
 *        另外还提供了三个静态方法
 *          BigInt.asUintN(width, BigInt): 给定的BigInt 转为 0 到 2^width - 1 之间对应的值
 *          BigInt.asIntN(width, BigInt): 给定的bigInt转为 -2^width ~ 2 ^(width-1) -1 之间的值
 *          BigInt.parseInt(string[, radix]): 近似与Number.parseInt() 将一个字符串转换成指定进制的BigInt
 *          如果BigInt.asUnitN()和BigInt.asIntN()指定的位数 小于数值本身的位数 那么头部的位将被舍弃
 *        转换规则
 *          可以使用Boolean() Number() String() 这三个方法 将BigInt可以转为布尔值、数值和字符串类型
 *            注：转为字符串时 后缀n会消失/取反运算符(!) 也可以转为布尔值
 *        数学运算
 *          BigInt类型的 + - * 和 ** 这四个二元运算符 与Number类型的行为一致 除法运算/会舍去小数部分 返回一个整数
 *          几乎所有的数值运算符都可以用在BigInt 但是有两个例外
 *            不带符号的右移位运算符>>>
 *            一元的求正运算符+
 *          BigInt不能与普通数值进行混合运算
 *          同样的 如果一个标准库函数的参数预期是Number类型 但是得到的是一个BigInt类型 就会报错
 *        其他运算
 *          BigInt对应的布尔值 与Number类型一致 即0n会转为false 其他值转为true
 *          比较运算符和相等运算符 运算BigInt与其他类型的值混合计算 因为这样做不会损失精度
 *          BigInt与字符串混合运算时 会先转为字符串 再进行运算
 *    Math.signbit()
 *      用来判断一个值的正负 但是如果参数是 -0 它会返回 -0 这导致对于判断符号位的正负 Math.sign()不是很有用 因为+0 与 -0 判断很麻烦 因为它们是相等的
 *      该方法的算法如下
 *        如果参数是NaN 返回false
 *        如果参数是-0 返回true
 *        如果参数是负值 返回true
 *        其他情况返回 false
 *    双冒号运算符
 *      箭头函数可以绑定this对象 大大减少了显示绑定this对象的写法(call apply bind) '函数绑定'运算符 用来取代call apply bind调用 函数绑定运算符是并排的两个
 *      冒号(::) 双冒号左边是一个对象 右边是一个函数 该运算符会自动将左边的对象 作为上下文环境(this对象) 绑定到右边的函数上面
 *      如果双冒号左边为空 右边是一个对象的方法 则等于将该方法绑定到该对象上面/如果双冒号运算符的运算结果 还是一个对象 就可以采用链式写法
 *    Realm API
 *      提供沙箱功能(sandbox) 允许隔离代码 防止那些被隔离的代码拿到全局对象
 *      Realm API 单独提供了一个全局对象 new Realm().global
 *        提供一个Realm()构造函数 用来生成一个Realm对象 该对象的global属性指向一个新的顶层对象 这个顶层对象跟原始的顶层对象类似 Reaml顶层对象与原始对象是两个对象
 *        Realm沙箱里面只能运行ECMAScript语法提供的API 不能运行宿主环境提供的API
 *        Realm()构造函数可以接受一个参数对象 该参数对象的intrinsics属性可以指定Realm沙箱继承原始顶层对象的方法
 *        用户可以自己定义Realm的子类 用来定制自己的沙箱
 *    #!命令
 *      Unix的命令行脚本都支持#!命令 放在脚本的第一行 用来指定脚本的执行器
 *    import.meta
 *      加载Javascript脚本的时候 有时候需要知道脚本的元信息
 *      data-*
 *        data-*全局属性是一类称为自定义数据属性的属性 它赋予我们在所有HTML元素上嵌入自定义数据属性的能力 并可以通过脚本(一般指JavaScript)与HTML之间进行专有数据的交换
 *        所有这些自定义数据属性都可以通过所属元素的HTMLElement接口来访问 HTMLElement.dataset属性可以访问它们/获取的时候通过驼峰原则来获取属性名
 *          javaScript访问： 通过dataset对象去获取
 *          css访问： 使用attr(data-*)来获取值
 *                    可以通过属性选择器[data-* = '']根据data来改变样式
 *      现在统一Node.js和浏览器 使用import.meta属性在脚本内部获取元信息 这个属性返回一个对象 该对象的各种属性就是当前运行的脚本的元信息 一般来说 浏览器的import.meta至少会有两个属性
 *        import.meta.url: 脚本的URL
 *        import.meta.scriptElement: 加载脚本的那个<script>的DOM节点 用来替代document.currentScript
 *        document.currentScript
 *          返回其所包含的脚本中正在被执行的<script>元素
*/      