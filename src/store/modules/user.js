import { login, getUserInfo, getUserDetailById } from '@/api'
// 获取cookie 中的方法
import { setToken, getToken, removeToken } from '@/utils/auth'
export default {
  // 开启命名空间
  namespaced: true,
  state: {
    // 存储token
    token: getToken(), // token持久化 => 放到缓存中
    userInfo: {}, // 定义一个空的对象，用户信息
    hrsaasTime: ''// 初始获取token的时间
  },
  mutations: {
    // 修改token
    setToken(state, token) {
      state.token = token
      // vuex变化 => 缓存数据
      setToken(token)// vuex和 缓存数据的同步
    },
    // 删除缓存
    removeToken(state) {
      state.token = null
      removeToken()
    },
    // 设置用户信息
    setUserInfo(state, userInfo) {
      // 深拷贝
      state.userInfo = JSON.parse(JSON.stringify(userInfo))
    },
    // 删除用户信息
    removeUserInfo(state) {
      state.userInfo = {}
    },
    setHrsaasTime(state, time) {
      state.hrsaasTime = time
    }
  },
  actions: {
    // 发送登录请求，获取token 在后续中还会用到的，所以很直接抽取 出来
    async login({ commit }, data) {
      const res = await login(data)
      console.log(res)
      // 获取token的时间
      commit('setHrsaasTime', +new Date())
      commit('setToken', res)
    },
    // 获取用户资料action
    async getUserInfo({ commit }) {
      const res = await getUserInfo()// 获取用户资料
      const baseInfo = await getUserDetailById(res.userId)// 为了获取头像
      const baseResult = { ...res, ...baseInfo }// 将两个接口结果合并
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
