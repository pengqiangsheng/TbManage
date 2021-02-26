const { Rate } = require('../model')

module.exports = async (ctx, result) => {
  const obj = ctx.request.body
  console.log(obj)
  const data = await Rate.save(obj)
  console.log(data)
  result.set({
    code: 200,
    msg: '操作成功',
    data
  })
}