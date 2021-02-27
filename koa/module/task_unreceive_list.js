const { taskModel } = require('../model')
// const { getUserInfo } = require('../tools')

module.exports = async (ctx, result) => {
  const { pageObj } = ctx.request.body
  // const { name, roles } = await getUserInfo(ctx.headers)
  const data = await taskModel.getUnreceiveList(pageObj)

  result.set({
    code: 200,
    msg: '操作成功',
    data
  })
}