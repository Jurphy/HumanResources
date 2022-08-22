const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  username: state => state.user.userInfo.username, // 如果之前设置为null 了 ，非空判断做完整
  userId: state => state.user.userInfo.userId,
  staffPhoto: state => state.user.userInfo.staffPhoto, // 建立用户头像的映射
  hrsaasTime: state => state.user.hrsaasTime,
  companyId: state => state.user.userInfo.companyId

}
export default getters
