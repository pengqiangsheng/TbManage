const { Bill } = require('../model')

module.exports = async (ctx, result) => {
  const data = await Bill.list()
  result.set({
    code: 200,
    msg: '操作成功',
    data
  })
}