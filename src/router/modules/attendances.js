import Layout from '@/layout'
export default {
  path: '/attendances',
  component: Layout,
  children: [{
    path: '',
    name: 'attendances',
    // 路由懒加载 ，不用不加载，可以减轻首页的压力，提高速度
    component: () => import('@/views/attendances/index'),
    meta: { title: '考勤', icon: 'skill' }
  }]
}