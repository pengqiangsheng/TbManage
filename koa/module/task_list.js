const { taskModel } = require('../model')
const { getUserInfo } = require('../tools')

module.exports = async (ctx, result) => {
  const { pageObj } = ctx.request.body
  const { name, roles } = await getUserInfo(ctx.headers)
  // if(!name) {
  //   throw 'name is null'
  // }
  // if(!roles) {
  //   throw 'roles is null'
  // }
  let data = {}
  if(roles === 'admin') {
    data = await taskModel.getListByAdmin(pageObj)
  } else if(roles === 'buyer') {
    data = await taskModel.getListByBuyer(name, pageObj)
  } else if(roles === 'shoper') {
    data = await taskModel.getListByShoper(name, pageObj)
  } else {
    throw 'roles is incorrect'
  }
  result.set({
    code: 200,
    msg: '操作成功',
    data
  })
}