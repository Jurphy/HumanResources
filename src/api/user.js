import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
export function logout() {
}
