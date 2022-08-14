import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)// 返回的是一个方法 可以批量导入文件 （'要查找的文件路径','是否查找子目录','要匹配的正则'）
const requireAll = requireContext => requireContext.keys().map(requireContext)// keys是方法，返回一个数组
requireAll(req)
// console.log(requireAll(req))
