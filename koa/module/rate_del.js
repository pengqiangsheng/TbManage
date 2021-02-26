const { Rate } = require('../model')

module.exports = async (ctx, result) => {
  const { id } = ctx.request.body
  if(!id) return
  const data = await Rate.deleteById(id)
  result.set({
    code: 200,
    msg: '操作成功',
    data
  })
}