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
*/