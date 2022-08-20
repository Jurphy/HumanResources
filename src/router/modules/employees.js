import Layout from '@/layout'
export default {
  path: '/employees',
  name: 'employees',
  component: Layout,
  children: [{
    path: '',
    // 路由懒加载 ，不用不加载，可以减轻首页的压力，提高速度
    component: () => import('@/views/employees/index'),
    meta: { title: '员工', icon: 'people' }
  }]
}
