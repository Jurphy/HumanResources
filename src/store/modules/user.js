import { login } from '@/api'
// 获取cookie 中的fang'
import { setToken, getToken, removeToken } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    token: getToken()
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    removeToken(state) {
      state.token = null
      removeToken()
    }
  },
  actions: {
    //
    async login({ commit }, data) {
      const res = await login(data)
      console.log(res)
      commit('setToken', res)
    }

  },
  getters: {

  }
}
