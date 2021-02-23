const { Bill } = require('../model')

module.exports = async (ctx, result) => {
  const { username } = ctx.request.body
  let data = {}
  if(username) {
    data = await Bill.getListByParams('username', `'${username}'`)
  }else {
    data = await Bill.list()
  }
  result.set({
    code: 200,
    msg: '操作成功',
    data
  })
}