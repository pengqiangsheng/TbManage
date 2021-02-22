const { User, Bill } = require('../model')
const { getUserInfo } = require('../tools')

module.exports = async (ctx, result) => {
  
  const { account, order, money: topMoney } = ctx.request.body
  const { name } = await getUserInfo(ctx.headers)

  if(name && name === 'admin') {
    if(!account) return
    const { money, id } = await User.findByName(account)
    const total = money + topMoney
    const data = await User.topUp(id, total)
    await Bill.save({
      creator: 'admin',
      money: topMoney,
      account,
      order
    })
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