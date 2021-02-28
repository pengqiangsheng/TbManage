const util = require('util')
const crypto = require('crypto')
const jsonwebtoken = require('jsonwebtoken')
const { SECRET } = require('./constant')
const Singleton = require('./singleton')

const cryptPwd = (password, salt = 'pqs') => {
  const md5 = crypto
    .createHash('md5')
    .update(password + salt)
    .digest('hex')
  return md5
}
const getUserInfo = async ({ authorization: token }) => {
  const payload = await util.promisify(jsonwebtoken.verify)(token.split(' ')[1], SECRET)
  return payload
}
const generateToken = (username, roles) => {
  return jsonwebtoken.sign(
    {
      name: username,
      roles: roles
    },
    SECRET,
    { expiresIn: '1h' }
  )
}
const lockHelper = async (lockName, fn) => {
  const f = Singleton.getInstance()
  if(f.queue[lockName]) {
    throw '系统正忙，请刷新后重试'
  }
  f.lock(lockName, () => {})
  console.log('2.1')
  await fn()
  console.log('2.5')
  f.unlock(lockName)
}

module.exports = {
  cryptPwd,
  getUserInfo,
  generateToken,
  lockHelper
}
