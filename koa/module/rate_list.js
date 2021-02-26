const { Rate } = require('../model')

module.exports = async (ctx, result) => {
  const data = await Rate.list()
  result.set({
    code: 200,
    msg: '操作成功',
    data
  })
}