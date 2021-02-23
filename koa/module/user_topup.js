const { User, Bill } = require('../model')
const { getUserInfo } = require('../tools')

module.exports = async (ctx, result) => {
  
  const { username, rechargeMoney, rechargeId } = ctx.request.body
  const { name } = await getUserInfo(ctx.headers)

  if(name && name === 'admin') {
    if(!username) return
    const { money, id: userId } = await User.findByName(username)
    const total = money + rechargeMoney
    const data = await User.topUp(userId, total)
    await Bill.check(rechargeId, 'operator', '\'admin\'', 'isCheck', 1, 'rechargeMoney', rechargeMoney)
    result.set({
      code: 200,
      msg: '操作成功',
      data
    })
  }else {
    result.set({
      code: 500,
      msg: '账号无此权限'
    })
  }
}