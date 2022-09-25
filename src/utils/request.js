import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'

const TimeOut = 36000// 定义超时时间

// 是否超时
// 超时逻辑  (当前时间  - 缓存中的时间) 是否大于 时间差
function IsCheckTimeOut() {
  var currentTime = Date.now() // 当前时间戳
  var timeStamp = store.getters.hrsaasTime // 缓存时间戳
  return (currentTime - timeStamp) / 1000 > TimeOut
}
// 创建了一个新的axios实例service
const service = axios.create({
  // baseURL: '/api',
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout超时时间
})

// request interceptor请求拦截器主要处理 token的统一注入问题
service.interceptors.request.use(config => {
  // token存在
  if (store.getters.token) {
    if (IsCheckTimeOut()) {
      // 如果它为true表示 过期了
      // token没用了 因为超时了
      store.dispatch('user/logout') // 登出操作 清除本地的token
      // 跳转到登录页
      router.push('/login')
      return Promise.reject(new Error('token超时了'))
    }

    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  Message.error(error.message)
  return Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use((response) => {
  const { success, message, data } = response.data
  if (success) {
    return data
  } else {
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, (err) => {
  if (err.response && err.response.data.code === 10002) {
    store.dispatch('user/logout') // 登出操作
    // 跳转到登录页
    router.push('/login')
  } else {
    Message.error(err.message || '')
  }
  return Promise.reject(err)
})
export default service// 导出axios实例
