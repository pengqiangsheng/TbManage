const { User } = require('../model')

module.exports = async (ctx, result) => {
  const data = await User.list()
  result.set({
    code: 200,
    msg: '操作成功',
    data
  })
}