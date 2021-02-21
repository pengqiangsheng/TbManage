const { taskModel } = require('../model')

module.exports = async (ctx, result) => {
  const data = await taskModel.list()
  result.set({
    code: 200,
    msg: '操作成功',
    data
  })
}