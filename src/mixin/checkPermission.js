import store from '@/store'
export default {
//   created() {
//     console.log('created', store.state.user && store.state.user.userInfo && store.state.user.userInfo.roles && store.state.user.userInfo.roles.points)
//   }
  checkPermission(key) {
    const points = store.state.user.userInfo.roles && store.state.user.userInfo.roles.points
    return points.includes(key)
  }
}
