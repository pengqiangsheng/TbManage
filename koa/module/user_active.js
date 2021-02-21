const { User } = require('../model')
const { getUserInfo } = require('../tools')

module.exports = async (ctx, result) => {
  const { id } = ctx.request.body
  const { name } = await getUserInfo(ctx.headers)
  console.log('===================================',name)
  if(name && name === 'admin') {
    if(!id) return
    const data = await User.active(id)
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