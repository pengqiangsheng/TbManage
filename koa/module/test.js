const Singleton = require('../tools/singleton')
const lock = Singleton.getInstance()

module.exports = async (ctx, result) => {
  const { receiveName, id } = ctx.request.body
  let data = {}
  const fnName = `${receiveName}_${id}`
  if(lock.fn[fnName]) {
    throw '系统正忙，请刷新后重试'
  }
  lock.pushFn(fnName, () => {})
  // data = await taskModel.receive(`'${receiveName}'`, id)
  lock.shiftFn(fnName)
  result.set({
    code: 200,
    msg: '操作成功',
    data: lock
  })
}

