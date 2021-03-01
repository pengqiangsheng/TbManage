const { taskModel, User, Log } = require('../model')
const { getUserInfo, lockHelper } = require('../tools')

module.exports = async (ctx, result) => {
  const { taskInfo, taskNumber } = ctx.request.body
  const { name, roles } = await getUserInfo(ctx.headers)
  if(roles !== 'shoper') {
    throw '系统出错：权限'
  }
  const { money, id: userId } = await User.findByName(name)
  const { total } = taskInfo
  if(money < total * taskNumber) {
    throw '账户余额不足'
  }
  const lockName = `momey_${userId}` // 锁住 momey_id 的操作
  await lockHelper(lockName, () => User.pay(userId, money - total * taskNumber))
  const desc = `新建任务${taskNumber}次，扣费${total * taskNumber}元`
  await Log.save({ desc: desc, operator: name })
  for(let i = 0; i < taskNumber; i++) {
    await taskModel.add(taskInfo)
  }
  result.set({
    code: 200,
    msg: '操作成功'
  })
}
