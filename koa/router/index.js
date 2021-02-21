const Router = require('@koa/router')
const router = new Router({ prefix: '/api' })
const fs = require('fs')
const { User } = require('../model')
const { join } = require('path')
const debug = require('debug')('app:router')
const Result =  require('../tools/result')
const { cryptPwd, generateToken } = require('../tools')
const { CLEARCACHE } = require('../tools/constant')
const apicache = require('@pengqiangsheng/apicache')
const cache = apicache.options({ debug: process.env.NODE_ENV === 'development' }).middleware
// 缓存白名单
const whitePath = ['registry', 'login', ...require('../module/filter')]
//event.js 文件
const event = require('../tools/event')
// 清除缓存分组
event.on(CLEARCACHE, function(groupName) { 
  debug('清除分组缓存', groupName)
  apicache.clear(groupName)
})

// 接口缓存
router.use(cache('2 minutes', ctx => {
  const has = whitePath.findIndex(path => ctx.path.indexOf(path) > -1) > -1
  if(has) {
    debug('缓存白名单：', ctx.path)
    return false
  }else {
    return true
  }
}))

// 注册
router.post('/registry', async ctx => {
  const { username, password, roles, country } = ctx.request.body
  try {
    let _user = null
    _user = await User.findByName(username)
    if(_user) {
      return ctx.body = {
        code: 400,
        msg: '已有账号，请重新输入'
      }
    }
    const pwd = cryptPwd(password)
    const result = await User.save({ username, password: pwd, roles, country })
    debug('新增完成', result.insertId)
    ctx.body = {
      code: 200,
      msg: '注册成功'
    }
  }catch(err) {
    ctx.body = {
      code: 400,
      msg: '注册失败',
      err
    }
  }
})

// 登录
router.post('/login', async ctx => {
  const { username, password } = ctx.request.body
  debug(username, password)
  try {
    const _user = await User.findByName(username)
    if(_user) {
      debug(_user)
      if(_user.status === 1) {
        if(_user.password === cryptPwd(password)) {
          ctx.body = {
            code: 200,
            msg: '登录成功',
            token: generateToken(username)
          }
        }else {
          ctx.body = {
            code: -1,
            msg: '账号或密码错误'
          }
        }
      }else if(_user.status === -1) {
        ctx.body = {
          code: -2,
          msg: '账号未激活，请联系管理员'
        }
      }else {
        ctx.body = {
          code: -2,
          msg: '账号异常，请联系管理员'
        }
      }
    } 
  }catch(err) {
    ctx.body = {
      code: 500,
      msg: '数据库异常'
    }
  }

})

// router.redirect('/login', 'sign-in')

// router
const special = {
  'daily_signin.js': '/daily_signin',
  'fm_trash.js': '/fm_trash',
  'personal_fm.js': '/personal_fm'
}
const FILTER = 'filter.js'
debug('========== Generate Router ==========')
fs.readdirSync(join(__dirname, '../module')).reverse().forEach(file => {
  if(!file.endsWith('.js')) return
  if(file === FILTER) return
  let route = (file in special) ? special[file] : '/' + file.replace(/\.js$/i, '').replace(/_/g, '/')
  let fn = require(join(__dirname, '../module', file))
  let methods = 'post'
  debug('add runtime route:', `/api${route}`)
  router[methods](route, async ctx => {
    const result = new Result()
    try {
      await fn(ctx, result)
    } catch(err) {
      result.set('msg', err)
    } finally {
      ctx.body = result.format()
    }
  })
  // router[methods](route, fn())
})
debug('=========== Generate End ============')


module.exports = router
