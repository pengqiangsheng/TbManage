const { execute } = require('../mysql')

/**
 * 
 * @param {*表名} table 
 * @param {*数据体} obj 
 */
const addOne = async(table, obj) => {
  const sql = `INSERT INTO ${table} SET ?`
  const data = await execute(sql, obj)
  return data
}

module.exports = add = {
  addOne
}