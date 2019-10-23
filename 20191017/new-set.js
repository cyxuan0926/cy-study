// 现在怎么去优化它 用更加好的思路写法 思路去实现
// 获取菜单或者当前路由权限数组
/**
 *
 * @param {*} menus 菜单数组或者路由数组
 * @param {*} accumulator 累加器 结果为所有的权限数组
 */
// eslint-disable-next-line
const handlePermissions = (menus, accumulator = []) => {
  menus.map(val => {
    if (val.permission || (val.meta && val.meta.permission)) accumulator.push(val.permission || val.meta.permission)
    if (val.children && val.children.length) handlePermissions(val.children, accumulator)
  })
  return accumulator
}
/**
 *
 * @param {*} menusAuthorities 当前用户所有的菜单权限
 * @param {*} routes 定义的所有路由数组
 * @param {*} result 当前用户的精确的路由数组
 * 现在的目标是优化算法 减少遍历范围 做到精确获取
 * 1.就是先遍历出菜单数组对应的全部权限 去遍历这个数组 获取当前权限对应的路由对象
 * 2.再去遍历当前权限所对应的路由对象 得到其全部的权限 再和服务器返回给的权限数组做比较 来精确匹配路由
 * 3.再过滤掉菜单数组中当前路由对象的权限、权限数组的权限 路由数组里面的当前路由对象
 * 4.重复上面步骤
 * 注 都是引用类型 需要用他的副本拷贝
 */
// eslint-disable-next-line
const dynamicAddRoutes = (rootmenusAuthorities = [], routes = [], currentUsersAuth = [], result = [{ path: '*', redirect: '/dashboard' }]) => {
  rootmenusAuthorities.some(auth => {
    let { currentRouter, filterRoutes } = getCurrenRouter(auth, routes)
    if (currentRouter.length) {
      let currentRouterAuth = handlePermissions(currentRouter),
        { menusAuthorities, authorities, ownRouterAuthorities } = filterAuthorities(currentUsersAuth, currentRouterAuth, rootmenusAuthorities)
      getExactCurrentRouter(currentRouter, ownRouterAuthorities)
      mapLoadComponet(currentRouter)
      result.push(...currentRouter)
      return dynamicAddRoutes(menusAuthorities, filterRoutes, authorities, result)
    }
  })
  return result
}
/**
 *
 * @param {*} router 当前路由对象的子路由数组
 * @param {*} permission 当前的菜单权限
 * 返回 当前菜单权限是否匹配当前路由对象
 */
// eslint-disable-next-line
const mapChildren = (permission = '', router = []) => {
  return router.some(route => {
    if (route.children && route.children.length) return mapChildren(permission, route.children)
    return route.meta && route.meta.permission && route.meta.permission === permission
  })
}
/**
 *
 * @param {*} permission 当前的菜单权限
 * @param {*} routes 路由数组
 * 返回 当前权限 所匹配到的路由对象 已经过滤了当前路由对象的路由数组
 * 这里考虑不全面
 */
// eslint-disable-next-line
const getCurrenRouter = (permission = '', routes = []) => {
  let currentRouter = routes.filter(route => {
      if (route.meta && route.meta.permission && route.meta.permission === permission) return true
      if (route.children && route.children.length) return mapChildren(permission, route.children)
    }), filterRoutes = new Set(routes)
  // if (filterRoutes.has(...currentRouter)) filterRoutes.delete(...currentRouter)
  currentRouter.map(router => {
    if (filterRoutes.has(router)) filterRoutes.delete(router)
  })
  return { currentRouter, filterRoutes: [...filterRoutes] }
}
/**
 *
 * @param {*} authorities 当前用户所有的权限
 * @param {*} currentRouterAuthorities 当前路由对象所有的菜单权限
 * @param {*} menusAuthorities 当前用户的所有菜单权限
 * 返回 过滤后的用户的所有权限 和对应菜单拥有的菜单权限 所有菜单权限
 */
// eslint-disable-next-line
const filterAuthorities = (authorities = [], currentRouterAuthorities = [], menusAuthorities = []) => {
  let ownRouterAuthorities = currentRouterAuthorities.filter(currentRouterAuth => {
    const passed = authorities.some(auth => {
      return auth === currentRouterAuth && authorities.splice(authorities.indexOf(auth), 1)
    })
    if (passed && menusAuthorities.includes(currentRouterAuth)) menusAuthorities.splice(menusAuthorities.indexOf(currentRouterAuth), 1)
    return passed
  })
  return { ownRouterAuthorities, menusAuthorities, authorities }
}
// eslint-disable-next-line
const getExactCurrentRouter = (currentRouter, ownRouterAuthorities) => {
  currentRouter.map(router => {
    if (router.children && router.children.length) return getExactCurrentChildrenRouter(router.children, ownRouterAuthorities)
  })
  return currentRouter
}
/**
 *
 * @param {*} routers
 * @param {*} auth
 */
// eslint-disable-next-line
const getExactCurrentChildrenRouter = (routers, auth) => {
  let temp = routers.map(router => {
    if (router.children && router.children.length) return getExactCurrentChildrenRouter(router.children, auth)
    return !router.redirect && !(router.meta && router.meta.permission && auth.includes(router.meta.permission))
  })
  filterRoutes(temp, routers)
  return !temp.includes(false)
}
/**
 *
 * @param {*} filterResult:路由是否再该用户的权限之内
 * @param {*} routes:当前遍历的路由的children
 */
// eslint-disable-next-line
const filterRoutes = (filterResult, routes) => {
  filterResult.map((val, index) => {
    if (val) {
      routes.splice(index, 1)
      filterResult.splice(index, 1)
      return filterRoutes(filterResult, routes)
    }
  })
}
/**
 *
 * @param {*} routes:当前的路由数组
 * 为了修复动态添加路由之后重复挂载frame组件
 */
// eslint-disable-next-line
const mapLoadComponet = (routes) => {
  return routes.map(childRouter => {
    if (childRouter.component) childRouter.component = helper.loadView(childRouter.component)
    if (childRouter.children) return mapLoadComponet(childRouter.children)
  })
}

// eslint-disable-next-line
const md5RoleId = (userRoles) => md5(userRoles.map(val => val.roleId).join(''))


export default router
