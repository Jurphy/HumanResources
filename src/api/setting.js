import request from '@/utils/request'
/**
 * 获取所有角色列表 Query page  pagesize
 * @returns
 */
export function getRole(params) {
  return request({
    url: '/sys/role',
    params// page 页码  pagesize 每页条数
  })
}
