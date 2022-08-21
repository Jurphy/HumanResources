import Layout from '@/layout'
export default {
  path: '/permission',
  component: Layout,
  children: [{
    path: '',
    name: 'permission',
    // 路由懒加载 ，不用不加载，可以减轻首页的压力，提高速度
    component: () => import('@/views/permission/index'),
    meta: { title: '权限管理', icon: 'lock' }
  }]
}
