import Layout from '@/layout'
export default {
  path: '/departments',
  component: Layout,
  children: [{
    path: '',
    name: 'departments',
    // 路由懒加载 ，不用不加载，可以减轻首页的压力，提高速度
    component: () => import('@/views/departments/index'),
    meta: { title: '组织架构', icon: 'tree' }
  }]
}
