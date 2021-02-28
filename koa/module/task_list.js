const { taskModel } = require('../model')
const { getUserInfo } = require('../tools')

module.exports = async (ctx, result) => {
  const { pageObj, range } = ctx.request.body
  const { name, roles } = await getUserInfo(ctx.headers)
  let data = {}
  if(roles === 'admin') {
    data = await taskModel.getListByAdmin(range[0], range[1], pageObj)
  } else if(roles === 'buyer') {
    data = await taskModel.getListByBuyer(name, range[0], range[1], pageObj)
  } else if(roles === 'shoper') {
    data = await taskModel.getListByShoper(name, range[0], range[1], pageObj)
  } else {
    throw 'roles is incorrect'
  }
  result.set({
    code: 200,
    msg: '操作成功',
    data
  })
}