const { taskModel } = require('../model')
const Singleton = require('../tools/singleton')
const fn = Singleton.getInstance()

module.exports = async (ctx, result) => {
  const { receiveName, id } = ctx.request.body
  let data = {}
  const isCanReceive = await taskModel.getTaskStatus(id)
  if(isCanReceive !== 1) {
    throw '该任务已被接单，请刷新后重试'
  }
  const fnName = `receive_${receiveName}_${id}` // 锁住接单的操作 receive_name_taskId
  if(fn.queue[fnName]) {
    throw '系统正忙，请刷新后重试'
  }
  fn.lock(fnName, () => {})
  data = await taskModel.receive(`'${receiveName}'`, id)
  fn.unlock(fnName)
  result.set({
    code: 200,
    msg: '操作成功',
    data
  })
}