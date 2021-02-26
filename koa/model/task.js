const { add, del, find, update } = require('../DAO')
const { TASK, RATE } = require('../tools/constant')
// const taskClass = {
//   site: '',
//   shop: '',
//   t_key: '',
//   sku: '',
//   price: '',
//   rate: '',
//   commission: '',
//   total: '',
//   status: ''
// }
module.exports = {
  deleteById: id => del.deleteById(TASK, id),
  add: data => add.addOne(TASK, data),
  list: () => find.list(TASK),
  getJoinList: (username) => find.getJoinList(TASK, RATE, username)
}