/**
 * Vue3中router带来了哪些变化
 * 构建选项mode
 * 由原来的mode: 'history' 更改为 history: createWebHistory()(设置其他mode 也是同样的方式)
 * 构建选项base：传给createWebHistory()的第一个参数作为base
 * 捕获所有路由(*):现在必须使用带有自定义正则表达式的参数进行定义 /:catchAll(.*)
 * router.match与router.resolve合并在一起为router.resolve 但签名略有不同
*/
import { createRouter, createWebHistory } from 'vue-next-router'
const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/user/:a:catchAll(.*)',
      component: ''
    }
  ]
})