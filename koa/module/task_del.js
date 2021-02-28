const { taskModel, User } = require('../model')
const { getUserInfo, lockHelper } = require('../tools')
const debug = require('debug')('app:router:del_task')

module.exports = async (ctx, result) => {
  const { id, total } = ctx.request.body
  const { name, roles } = await getUserInfo(ctx.headers)
  if(!id) return
  if(roles !== 'shoper') {
    throw '系统出错：权限'
  }
  const isCanDel = await taskModel.getTaskStatus(id)
  if(isCanDel !== 1) {
    throw '该任务已被接单，无法被删除，请刷新后重试'
  }
  const { money, id: userId } = await User.findByName(name)
  const lockName = `momey_${userId}` // 锁住 momey_id 的操作
  debug('1')
  await lockHelper(lockName, () => User.pay(userId, money + total))
  debug('3')
  const data = await taskModel.deleteById(id)
  debug('5')
  result.set({
    code: 200,
    msg: '操作成功',
    data
  })
}