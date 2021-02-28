const { taskModel, User, Log } = require('../model')
const { getUserInfo, lockHelper } = require('../tools')

module.exports = async (ctx, result) => {
  const obj = ctx.request.body
  const { name, roles } = await getUserInfo(ctx.headers)
  if(roles !== 'shoper') {
    throw '系统出错：权限'
  }
  const { money, id: userId } = await User.findByName(name)
  const { total } = obj
  if(money < total) {
    throw '账户余额不足'
  }

  const lockName = `momey_${userId}` // 锁住 momey_id 的操作
  await lockHelper(lockName, () => User.pay(userId, money - total))
  const desc = `新建任务，扣费${total}元`
  await Log.save({ desc: desc, operator: name })
  const data = await taskModel.add(obj)
  result.set({
    code: 200,
    msg: '操作成功',
    data
  })
}
