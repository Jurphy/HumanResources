import { login, getUserInfo } from '@/api'
// 获取cookie 中的fang'
import { setToken, getToken, removeToken } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    token: getToken(),
    userInfo: {}
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
    }
  },
  actions: {
    //
    async login({ commit }, data) {
      const res = await login(data)
      console.log(res)
      commit('setToken', res)
    },
    async getUserInfo({ commit }) {
      const res = await getUserInfo()
      // console.log(res)
      commit('setUserInfo', res)
      return res // 不推荐 直接返回res
      // 重点 要意识到这个 这个数据传递过程 带来的问题
    }

  },
  getters: {

  }
}
