const { taskModel, User } = require('../model')
const { getUserInfo } = require('../tools')
const Singleton = require('../tools/singleton')
const fn = Singleton.getInstance()

module.exports = async (ctx, result) => {
  const obj = ctx.request.body
  const { name, roles } = await getUserInfo(ctx.headers)
  if(roles !== 'shoper') {
    throw '系统出错：权限'
  }
  const { money, id: userId } = await User.findByName(name)
  const { total } = obj
  const fnName = `momey_${userId}` // 锁住 momey_id 的操作
  if(fn.queue[fnName]) {
    throw '系统正忙，请刷新后重试'
  }
  if(money < total) {
    throw '账户余额不足'
  }
  
  fn.lock(fnName, () => {})
  await User.pay(userId, money - total)
  fn.unlock(fnName)

  const data = await taskModel.add(obj)
  
  console.log(data)
  result.set({
    code: 200,
    msg: '操作成功',
    data
  })
}
