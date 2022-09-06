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
import myMixin from '@/mixin/checkPermission'
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }
Vue.use(components)
// 全局引入混入
Vue.mixin(myMixin)
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 引人国际化语言包并全局注册，挂载到vue实例上面
import i18n from '@/lang'
Vue.use(ElementUI, { i18n: (key, value) => i18n.t(key, value) })
Vue.config.productionTip = false

import Print from 'vue-print-nb'
Vue.use(Print)
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
  i18n,
  render: h => h(App)
})
