const { User } = require('../model')

module.exports = async (ctx, result) => {
  const { pageObj } = ctx.request.body
  const data = await User.list(pageObj)
  result.set({
    code: 200,
    msg: '操作成功',
    data
  })
}