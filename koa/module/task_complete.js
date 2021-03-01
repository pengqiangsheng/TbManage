const { taskModel } = require('../model')
const { getUserInfo } = require('../tools')

module.exports = async (ctx, result) => {
  const { id } = ctx.request.body
  const { roles } = await getUserInfo(ctx.headers)
  const data = await taskModel.complete(roles, id)
  if(roles === 'buyer') {
    const { orderNumber, remark } = ctx.request.body
    await taskModel.writeOrderNumber(id, orderNumber, remark)
  }
  result.set({
    code: 200,
    msg: '操作成功',
    data
  })
}