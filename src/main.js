import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import components from '@/components'
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }
Vue.use(components)
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
Vue.use(ElementUI)
Vue.config.productionTip = false
// 注册自定义指令
// 遍历所有的导出的指令对象 完成自定义全局注册
import * as directives from '@/directives'
Object.keys(directives).forEach(ele => {
  Vue.directive(ele, directives[ele])
})

import * as filters from '@/filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
