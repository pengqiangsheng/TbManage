const { add, del, find, update } = require('../DAO')
const { CONFIG } = require('../tools/constant')

module.exports = {
 info: (key, value) => find.findByparams(CONFIG, {
   key: key,
   value: value
 }),
 list: () => find.list(CONFIG)
}