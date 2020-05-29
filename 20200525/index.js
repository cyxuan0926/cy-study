/**
 * 几个非常有意思的JavaScript知识总结点
 *  1.Observer API
 *    Observer是浏览器自带的观察者 它主要提供了：Intersection Mutation Resize Performance这四类观察者
 *    Intersection Observer 提供了一种异步观察者目标元素和其祖先元素交叉状态的方法 当一个IntersectionObserver对象被创建时 其被配置为监听根中一段给定比例的可见区域 并且无法更改其配置
 *    然而我们可以在同一个观察者对象中配置监听多个目标元素/说简单点就是这个api可以异步监听目标元素在根元素里的位置变动 并触发响应事件 我们可以用它来实现更为高效的图片懒加载、无限滚动以及内容
 *    埋点上报等
 *   视口：指的是浏览器的可视区域 其宽度和浏览器窗口的宽度保持一致/而在移动端则较为复杂 它涉及到三个视口：布局视口(layout viewport) 视觉视口(visual viewport) 理想视口(ideal viewport)
 *    基本概念：两种像素
 *        像素是计算机屏幕中显示特定颜色的最小区域 屏幕中的像素越多 同一范围内能看到的内容就越多 或者说 当设备尺寸相同时 像素越密集 画面就越精细
 *        物理像素和
 */
// const intersectionObserver = new IntersectionObserver((entries, observer) => {
//   // callback：IntersectionObserver实例的第一个参数 当目标元素和根元素通过阈值时就会触发该回调。回调中的第一个参数是被观察对象列表 一旦被观察者对象发生突变就会被移入该列表
//   // callback：第一个参数是被观察对象列表 一旦被观察对象发生突变就会被移入该列表 列表中每一项都保留观察者的位置信息 第二个参数是observer 观察者本身
//   entries.forEach(entry => {
//     console.log(entry)
//   })
// }, {
//   root: '',
//   rootMargin: '0px',
//   threshold: .5
// })
// const target = document.querySelector('')
// intersectionObserver.observe(target)