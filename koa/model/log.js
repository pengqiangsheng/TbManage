const { add, del, find } = require('../DAO')
const { LOG } = require('../tools/constant')

module.exports = {
  deleteById: id => del.deleteById(LOG, id),
  save: data => add.addOne(LOG, data),
  list: (pageObj) => find.list(LOG, pageObj),
}