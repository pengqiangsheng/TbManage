const { execute } = require('../mysql')

/**
 * 通过id删除一条记录
 * @param {*表名} table 
 * @param {*id} id 
 */
const deleteById = async(table, id) => {
  const sql = `DELETE FROM ${table} WHERE id = ?`
  const data = await execute(sql, id)
  return data
}

module.exports = del = {
  deleteById
}