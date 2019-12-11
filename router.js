#!/usr/bin/env node
/**
 * 前端路由的实现原理：本质就是监听URL的变化 然后匹配路由规则 显示相应的页面 并且无需刷新
 * 目前单页面使用的路由就只有两种实现方式：hash/history 模式
 * hash模式:http:xxx.xx.com/#/xxx 当#后面的哈希值发生变化时 不会向服务器请求数据，可以通过hashchange事件来监听到
 * URL的变化 从而进行跳转页面/手动刷新：不会向服务器发送请求 但是也不会触发hashchange事件 可以通过load事件
 * history模式:浏览器动作 比如回退 包括history.back()触发popstate事件/点击跳转 调用pushstate函数向浏览器历史添加一个
 * 状态 并且不会向服务器请求/刷新页面或输入URL 会向服务器请求
 */
// import { auth } from './index.js'
// auth()
console.log('test')