const { Bill } = require('../model')
const { getUserInfo } = require('../tools')

module.exports = async (ctx, result) => {
  const { name, roles } = await getUserInfo(ctx.headers)
  const { pageObj } = ctx.request.body
  let data = {}
  if(roles === 'shoper') {
    data = await Bill.getListByParams(pageObj, 'username', `'${name}'`)
  }else if(roles === 'admin'){
    data = await Bill.list(pageObj)
  }
  result.set({
    code: 200,
    msg: '操作成功',
    data
  })
}