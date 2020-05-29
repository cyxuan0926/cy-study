/** 
 * 1.canvas(画布)元素
 *   canvas元素可以说是HTML5元素中功能最强大的一个/实际是通过canvas的context对象而表现出来的 该环境变量可以从canvas元素身上获取
 *  1.1.1 canvas元素的大小和绘图表面的大小
 *    可以通过canvas元素的width和height属性来改变元素的大小/也可以通过CSS来设置canvas元素的大小 不过使用CSS设置canvas元素的效果 与通过width、height属性值来设定 并不一样
 *    canvas元素实际上有两套尺寸 一个是元素本身的大小 还有一个是元素绘图表面(drawing surface表面)的大小/当设置元素的width和height属性时 实际上是同时修改了该元素的大小和元素
 *    绘图表面的大小/然而 如果是通过CSS来设定canvas元素的大小 那么只会改变元素本身的大小 而不会影响到绘图表面，这时 当canvas元素的大小不符合其绘图表面的大小时 浏览器就会对绘图
 *    表面进行缩放 使其符合元素的大小
 *  1.1.2 canvas元素的API
 *    两个属性与三个方法:
 *      width: canvas元素绘图表面的宽度 在默认情况下 浏览器会将canvas元素的大小设定成与绘图表面大小一致 如果在CSS中覆写了元素大小 那么浏览器则会将绘图表面进行缩放 使之符合元素尺寸/非负整数/默认值 300 /按照规定 不能给数值加px后缀
 *      height：canvas元素绘图表面的宽度 在默认情况下 浏览器会将canvas元素的大小设定成与绘图表面大小一致 如果在CSS中覆写了元素大小 那么浏览器则会将绘图表面进行缩放 使之符合元素尺寸/非负整数/默认值 150 /按照规定 不能给数值加px后缀
 *      getContext(): 返回与该canvas元素相关的绘图环境对象
 *      toDataURL(type, quality): 返回一个数据地址(data URL) 你可以将它设定为img元素的src属性值。第一个参数指定了图像的类型 例如 image/jpeg image/png 如果不指定第一个参数 则默认使用image/png 第二个参数必须为0 ~ 1.0之间的double值
 *      它表示JPEG图像的显示质量
 *      toBlob(callback, type, args...): 创建一个用于表示此canvas元素图像文件的Blob 第一个参数是回调函数 浏览器会以一个指向blob的引用为参数 去调用该回调函数
 *  1.2 Canvas的绘图环境
 *    canvas元素仅仅是为了充当绘图环境对象的容器而存在的 该环境对象提供了全部的绘制功能
 *    2d绘图环境的全部属性
 *      canvas：指向该绘图环境所属的canvas对象 该属性最常用的用途就是通过它来获取canvas的宽度和高度
 *      fillstyle: 指定该绘图环境在后续的图像填充操作中所使用的颜色、渐变色或图案
 *      font: 设定在调用绘图环境对象的fillText()或strokeText()方法时 所使用的字型
 *      globalAlpha: 全局透明度设定
 *      globalCompsiteOperation: 该值决定了浏览器将某个物体绘制在其他物体之上时 所采用的绘制方式
 *      lineCap：该值告诉浏览器如何绘制线段的端点 可以在以下三个值中指定 ： butt round square
 *      lineWidth: 该值决定了canvas之中绘制线段的屏幕像素宽度 它必须是个非负、非无穷的double的值 默认值是1.0
 *      lineJoin: 该值告诉浏览器在两条线段相交时如何绘制焦点 可取的值是：bevel、round miter 默认值是miter
 *      save(保存) 和 restore(恢复)： save()会将当前的绘图环境压入堆栈顶部 对应的restore()方法则会从堆栈顶部弹出一组状态信息
 *  开始学习HTML5
 *     HTML5 Canvas/基于脚本的定时控制动画(Timing control for script-based animation)/Html5视频、音频(HTML5 video audio)
 *     window.requestAnimationFrame()来取代 window.setTimeout window.setInterval()
 *     性能分析器与时间轴工具
 *       时间轴工具可以将应用程序中发生的重要事件纪录下来 同时也一并纪录了这些事件中的细节
 *       性能分析器 可以更为详细地观察到程序代码在函数级别地性能表现
 *     基本地绘制操作
 *       将鼠标坐标转换为canvas坐标
 *         
*/