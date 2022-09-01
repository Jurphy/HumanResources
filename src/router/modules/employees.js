import Layout from '@/layout'
export default {
  path: '/employees',
  component: Layout,
  meta: { id: 'employees' },
  children: [{
    path: '',
    name: 'employees',
    // 路由懒加载 ，不用不加载，可以减轻首页的压力，提高速度
    component: () => import('@/views/employees/index'),
    meta: { title: '员工', icon: 'people' }
  },
  {
    path: 'detail/:id',
    component: () => import('@/views/employees/detail'),
    hidden: true,
    meta: { title: '员工详情' }
  },
  {
    path: 'print/:id',
    component: () => import('@/views/employees/print'),
    hidden: true,
    meta: { title: '打印' }
  }
  ]
}
