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

/** *
 * 新增角色
 * ***/
export function addRole(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}
/**
 * 修改角色
 * ***/
export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    data,
    method: 'put'
  })
}

/** **
 *  删除角色
 *
 * ****/
export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}

/**
 * 获取公司信息
 * **/
export function getCompanyInfo(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}
/**
 * 获取角色详情
 * **/
export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`
  })
}
// 给角色分配权限
export function assignPerm(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}

