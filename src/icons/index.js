import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally 全局注册组件
Vue.component('svg-icon', SvgIcon)
// require.context 方法 可以实现批量导入文件
// require.context(directory, useSubdirectories, regExp)
// directory: 要查找的文件路径
// useSubdirectories: 是否查找子目录
// regExp: 要匹配文件的正则
// 返回一个方法

// 返回的方法 keys 属性
// keys 函数 返回一个数组
const req = require.context('./svg', false, /\.svg$/)// 返回的是一个方法 可以批量导入文件 （'要查找的文件路径','是否查找子目录','要匹配的正则'）
// 声明一个函数
const requireAll = requireContext => requireContext.keys().map(requireContext)// keys是方法，返回一个数组
requireAll(req)
// console.log(requireAll(req))
