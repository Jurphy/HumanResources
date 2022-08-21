import Layout from '@/layout'
export default {
  path: '/social',
  component: Layout,
  children: [{
    path: '',
    name: 'social',
    // 路由懒加载 ，不用不加载，可以减轻首页的压力，提高速度
    component: () => import('@/views/social/index'),
    meta: { title: '社保', icon: 'table' }
  }]
}
