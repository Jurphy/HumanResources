import Layout from '@/layout'
export default {
  path: '/salarys',
  component: Layout,
  children: [{
    path: '',
    name: 'salarys',
    // 路由懒加载 ，不用不加载，可以减轻首页的压力，提高速度
    component: () => import('@/views/salarys/index'),
    meta: { title: '工资', icon: 'money' }
  }]
}
