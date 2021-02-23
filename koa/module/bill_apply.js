const { Bill } = require('../model')

module.exports = async (ctx, result) => {
  const { username, order, rechargeMoney, platform } = ctx.request.body
  const data = await Bill.save({
    username,
    order,
    rechargeMoney,
    platform
  })
  result.set({
    code: 200,
    msg: '操作成功',
    data
  })
}