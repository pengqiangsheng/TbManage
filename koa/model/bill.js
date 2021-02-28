const { add, del, find, update } = require('../DAO')
const { BILL } = require('../tools/constant')

module.exports = {
  deleteById: id => del.deleteById(BILL, id),
  save: data => add.addOne(BILL, data),
  list: (pageObj) => find.list(BILL, pageObj),
  getListByParams: (pageObj, ...params) => find.findListByParams(BILL, pageObj, ...params),
  check: (id, ...params) => update.updateById(BILL, id, ...params),
  findByName: name => find.findByparams(BILL, {
    key: 'username',
    value: name
  }),
  topUp: money => update.updateById(BILL, id, 'money', money)
}