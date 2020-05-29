/**
 * Vue Loader是什么？
 *  CLI:命令行界面
 *  是webpack的loader 它允许你以一种名为单文件组件的格式撰写Vue组件
 *  当Vue Loader编译单文件组件中的<template>块时 它也会将所有遇到的资源URL转换为webpack模块请求
 *  转换规则：
 *    资源URL转换会遵循如下规则：
 *      如果路径是绝对路径(例如/images/foo.png) 会原样保留
 *      如果路径以.开头 将会被看作相对的模块依赖 并按照你的本地文件系统上的目录结构进行解析
 *      如果路径以~开头 其后的部分将会被看作模块依赖 这意味着你可以用该特性来引用一个Node依赖中的资源
 *      如果路径以@ 开头 也会被看着模块依赖 如果webpack配置中给@ 配置了alias 那么@ 就指向 配置的alias
 *  使用预处理器
 *    在webpack中 所有的预处理器需要匹配对应的loader. Vue Loader允许你使用其他webpack loader处理Vue组件的某一部分
 *    Sass: sass-loader node-loader
 *  共享全局变量
 *    sass-loader 也支持一个prependData选项 这个选项允许你在所有被处理的文件之间共享常见的变量 而不需要显示地导入它们
 *    babel: Babel的配置可以通过.babelrc或babel-loader选项来完成
 *  Scoped CSS
 *    当<style>标签中scoped属性时 它的CSS只作用于当前组件中的元素 它可以通过PostCSS来实现以下转换
 *    你可以在一个组件中同时使用有scoped和非scoped样式
 *    子组件的根元素
 *      使用scoped后 父组件的样式将不会渗透到子组件中 不过一个子组件的根节点会同时受气父组件的scoped CSS 和子组件的scoped CSS的影响
 *    深度作用选择器
 *      如果你希望scoped样式中的一个选择器能够作用得'更深' 例如影响子组件 你可以使用>>>操作符 /deep/ ::v-deep >>> 都是深度作用选择器
 */