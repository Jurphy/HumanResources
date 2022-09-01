// 引入动态和静态路由
import router, { asyncRoutes, constantRoutes } from '@/router'
const state = {
  routes: constantRoutes// 定义静态路由
}
const mutations = {
  // 合并路由 角色路由=静态路由+动态路由（权限路由）
  setRoures(state, matchRoutes) {
    state.routes = [...constantRoutes, ...matchRoutes]
  }
}
const actions = {
  // 过滤路由，把动态路由和菜单项中menus的路由进行匹配
  filterRoutes(context, menus) {
    const routes = asyncRoutes.filter(ele => menus.includes(ele.meta.id))
    context.commit('setRoures', routes)
    // 追加动态路由addRoutes方法，为了防止刷新进入404，把404放最后
    router.addRoutes([...routes, { path: '*', redirect: '/404', hidden: true }])
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
