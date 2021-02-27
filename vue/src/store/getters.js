const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  statusList: state => state.list.statusList,
  roleList: state => state.list.roleList,
  userObj: state => state.user.userObj,
  taskStatusList: state => state.list.taskStatusList
}
export default getters
