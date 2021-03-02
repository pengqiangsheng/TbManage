const { User } = require('../model')
const { cryptPwd, getUserInfo } = require('../tools')

module.exports = async (ctx, result) => {
  const { newPwd } = ctx.request.body
  const { name: username } = await getUserInfo(ctx.headers)
  const { id: userId } = await User.findByName(username)
  const pwd = cryptPwd(newPwd)
  const data = await User.modifyPwd(userId, `'${pwd}'`)
  result.set({
    code: 200,
    msg: '操作成功',
    data
  })
}