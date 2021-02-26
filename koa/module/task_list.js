const { taskModel } = require('../model')

module.exports = async (ctx, result) => {
  const { username } = ctx.request.body
  console.log(username)
  const data = await taskModel.getJoinList(username)
  result.set({
    code: 200,
    msg: '操作成功',
    data
  })
}