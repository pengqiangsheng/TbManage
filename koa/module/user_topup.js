const { User, Bill } = require('../model')
const { getUserInfo } = require('../tools')
const Singleton = require('../tools/singleton')
const fn = Singleton.getInstance()

module.exports = async (ctx, result) => {
  
  const { username, rechargeMoney, rechargeId } = ctx.request.body
  const { name, roles } = await getUserInfo(ctx.headers)

  if(roles && roles === 'admin') {
    if(!username) return
    const { money, id: userId } = await User.findByName(username)
    const total = money + rechargeMoney
    const lockName = `momey_${userId}` // 锁住 momey_id 的操作
    if(fn.queue[lockName]) {
      throw '系统正忙，请刷新后重试'
    }
    fn.lock(lockName, () => {})
    const data = await User.topUp(userId, total)
    fn.unlock(lockName)
    await Bill.check(rechargeId, 'operator', `'${name}'`, 'isCheck', 1, 'rechargeMoney', rechargeMoney)
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