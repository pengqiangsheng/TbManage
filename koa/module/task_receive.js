const { taskModel, Log } = require('../model')
const { lockHelper } = require('../tools')

module.exports = async (ctx, result) => {
  const { receiveName, id } = ctx.request.body
  let data = {}
  const isCanReceive = await taskModel.getTaskStatus(id)
  if(isCanReceive !== 1) {
    throw '该任务已被接单，请刷新后重试'
  }
  const lockName = `receive_${receiveName}_${id}` // 锁住接单的操作 receive_name_taskId
  await lockHelper(lockName, () => taskModel.receive(`'${receiveName}'`, id))
  result.set({
    code: 200,
    msg: '操作成功',
    data
  })
}