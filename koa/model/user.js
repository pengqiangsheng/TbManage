const { add, del, find, update } = require('../DAO')
const { USER } = require('../tools/constant')
// const userClass = {
//   username: '',
//   password: '',
//   name: '',
//   avatar: '',
//   role: '', 0 管理员  1卖家  2刷手
//   root: '',
//   uid: '',
//   country: '',
//   status: '',  -1 未激活  异常  1正常
// }
module.exports = {
  deleteById: id => del.deleteById(USER, id),
  save: data => add.addOne(USER, data),
  list: (pageObj) => find.list(USER, pageObj),
  active: id => update.updateById(USER, id, 'status', 1),
  findByName: name => find.findByparams(USER, {
    key: 'username',
    value: name
  }),
  topUp: (id, money) => update.updateById(USER, id, 'money', money)
}