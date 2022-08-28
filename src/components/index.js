// import PageTools from './PageTools'
// export default {
//   install(Vue) {
//     //  注册全局的通用栏组件对象
//     Vue.component('PageTools', PageTools)
//   }
// }
// 自动批量注册组件
// 导入组件路径 相当于import PageTools from './PageTools'
const requireComponent = require.context('./', true, /\.vue$/)
const res = requireComponent.keys().map(requireComponent)
// ele.default 对象  ele.default.name 组件名称
export default (Vue) => {
  res.forEach(ele => {
    Vue.component(ele.default.name, ele.default)
  })
}
