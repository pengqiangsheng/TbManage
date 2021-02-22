const { add, del, find, update } = require('../DAO')
const { BILL } = require('../tools/constant')

module.exports = {
  deleteById: id => del.deleteById(BILL, id),
  save: data => add.addOne(BILL, data),
  list: () => find.list(BILL),
  active: id => update.updateById(BILL, id, 'status', 1),
  findByName: name => find.findByparams(BILL, {
    key: 'username',
    value: name
  }),
  topUp: money => update.updateById(BILL, id, 'money', money)
}