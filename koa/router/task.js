const Router = require('@koa/router')
const router = new Router({
  prefix: '/task'
})
const { row } = require('../mysql')

router
  .get('/list', async ctx => {
    await ctx.render('index')
  })
  .get('/add', async ctx => {
    await ctx.render('sign', {
      url: '/api/login',
      btnText: '登陆'
    })
  })
  .get('/del', async ctx => {
    await ctx.render('sign', {
      url: '/api/registry',
      btnText: '马上注册'
    })
  })

module.exports = router
