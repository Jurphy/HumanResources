import Layout from '@/layout'
export default {
  path: '/approvals',
  component: Layout,
  meta: { id: 'approvals' },
  children: [{
    path: '',
    name: 'approvals',
    // 路由懒加载 ，不用不加载，可以减轻首页的压力，提高速度
    component: () => import('@/views/approvals/index'),
    meta: { title: '审批', icon: 'tree-table' }
  }]
}
