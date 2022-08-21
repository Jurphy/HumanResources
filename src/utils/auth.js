import Cookies from 'js-cookie'

const TokenKey = 'hrsaas-token'// 设定一个独一无二的key
// 把token存在cookies中
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
