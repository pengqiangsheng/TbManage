const { taskModel, User, Log } = require('../model')
const { getUserInfo, lockHelper } = require('../tools')
const debug = require('debug')('app:router:del_task')

module.exports = async (ctx, result) => {
  // 判断参数正确性
  const { ids, totals } = ctx.request.body
  if(!ids.length || !totals.length) return
  if(ids.length !== totals.length) throw "系统出错：参数"

  // 判断权限
  const { name, roles } = await getUserInfo(ctx.headers)
  if(roles !== 'shoper') throw '系统出错：权限'

  // 循环删除
  const delTaskIds = []
  for(let i = 0; i < ids.length; i++) {
    const taskId = ids[i]
    const total = totals[i]
    // 判断是否可以删除
    const isCanDel = await taskModel.getTaskStatus(taskId)
    if(isCanDel === 1) {
      debug('can')
      delTaskIds.push(taskId)
      const { money, id: userId } = await User.findByName(name)
      // 锁住 momey_id 的操作
      const lockName = `momey_${userId}`
      await lockHelper(lockName, () => User.pay(userId, money + total))
      // 记录操作
      const desc = `删除任务id:${taskId}，返还${total}元`
      await Log.save({ desc: desc, operator: name })
      // 删除任务
      await taskModel.deleteById(taskId)
    }
  }
  // 返回已成功删除的任务id集合
  result.set({
    code: 200,
    msg: `操作成功`,
    data: delTaskIds
  })
}