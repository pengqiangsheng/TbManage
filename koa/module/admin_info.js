const { Config } = require('../model')

module.exports = async (ctx, result) => {
  const data = await Config.info('s_key', 'adminInfo')
  result.set({
    code: 200,
    msg: '操作成功',
    data
  })
}