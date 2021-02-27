const util = require('util')
const crypto = require('crypto')
const jsonwebtoken = require('jsonwebtoken')
const { SECRET } = require('./constant')

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
module.exports = {
  cryptPwd,
  getUserInfo,
  generateToken
}
