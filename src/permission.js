import router from '@/router/index'
import store from '@/store'
// 1. 权限拦截处理逻辑需要放在路由的前置守卫里处理
// 2. 首先判断有无token
// 2.1 token 存在 说明 处于登录状态
// 2.1.1 判断是否处于登录页面，是的话 跳首页 否则 直接留在当前页（直接放行 next()）
// 2.2 token 不存在 说明 不处于登录状态
// 2.2.1 判断一下 是否处于白名单 是的话 直接留在 当前页 否则 跳转到登录页
const whiteList = ['/login', '/404']// 定义白名单  所有不受权限控制的页面
// 路由的前置守卫
router.beforeEach(async(to, from, next) => {
  //  首先判断有无token
  if (store.getters.token) {
    // 如果没有用户信息就调用getUserInfo
    if (!store.getters.userId) {
      await store.dispatch('user/getUserInfo')
    }
    if (to.path === '/login') {
      next('/')// 跳到主页
    } else {
      next()// 直接放行
    }
  } else {
    if (whiteList.includes(to.path)) { // 如果没有token，看是否在白名单中
      next()
    } else {
      next('/login')
    }
  }
})
