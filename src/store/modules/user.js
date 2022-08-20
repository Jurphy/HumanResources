import { login, getUserInfo, getUserDetailById } from '@/api'
// 获取cookie 中的fang'
import { setToken, getToken, removeToken } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    token: getToken(),
    userInfo: {},
    hrsaasTime: ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    removeToken(state) {
      state.token = null
      removeToken()
    },
    setUserInfo(state, userInfo) {
      state.userInfo = JSON.parse(JSON.stringify(userInfo))
    },
    removeUserInfo(state) {
      state.userInfo = {}
    },
    setHrsaasTime(state, time) {
      state.hrsaasTime = time
    }
  },
  actions: {
    //
    async login({ commit }, data) {
      const res = await login(data)
      console.log(res)
      // 获取token的时间
      commit('setHrsaasTime', +new Date())
      commit('setToken', res)
    },
    async getUserInfo({ commit }) {
      const res = await getUserInfo()
      const baseInfo = await getUserDetailById(res.userId)
      const baseResult = { ...res, ...baseInfo }
      console.log(baseResult)
      commit('setUserInfo', baseResult)
      return baseResult // 不推荐 直接返回res
      // 重点 要意识到这个 这个数据传递过程 带来的问题
    },
    // 登出的action
    logout(context) {
    // 删除token
      context.commit('removeToken') // 不仅仅删除了vuex中的 还删除了缓存中的
      // 删除用户资料
      context.commit('removeUserInfo') // 删除用户信息
    }

  },
  getters: {

  }
}
