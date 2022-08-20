import Layout from '@/layout'
export default {
  path: '/setting',
  name: 'setting',
  component: Layout,
  children: [{
    path: '',
    // 路由懒加载 ，不用不加载，可以减轻首页的压力，提高速度
    component: () => import('@/views/setting/index'),
    meta: { title: '公司设置', icon: 'setting' }
  }]
}
