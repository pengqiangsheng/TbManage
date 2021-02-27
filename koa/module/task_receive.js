const { taskModel } = require('../model')

module.exports = async (ctx, result) => {
  const { receiveName, id } = ctx.request.body
  let data = {}
  data = await taskModel.receive(`'${receiveName}'`, id)
  result.set({
    code: 200,
    msg: '操作成功',
    data
  })
}