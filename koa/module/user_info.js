const { User } = require('../model')
const { getUserInfo } = require('../tools')

module.exports = async (ctx, result) => {
  const { name } = await getUserInfo(ctx.headers)
  console.log('==============getinfo=====================',name)
  const data = await User.findByName(name)
  result.set({
    code: 200,
    msg: '操作成功',
    data
  })
}