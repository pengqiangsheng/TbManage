const { User } = require('../model')
const { getUserInfo } = require('../tools')

module.exports = async (ctx, result) => {
  const { bankCardNo, bankCardInfo } = ctx.request.body
  const { name: username } = await getUserInfo(ctx.headers)
  const { id: userId } = await User.findByName(username)
  const data = await User.updateBank(userId, `'${bankCardNo}'`, `'${bankCardInfo}'`)
  result.set({
    code: 200,
    msg: '操作成功',
    data
  })
}