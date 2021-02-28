const { add, del, find } = require('../DAO')
const { RATE } = require('../tools/constant')

module.exports = {
  deleteById: id => del.deleteById(RATE, id),
  save: data => add.addOne(RATE, data),
  list: (pageObj) => find.list(RATE, pageObj)
}