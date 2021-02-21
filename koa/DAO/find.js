const { row, first } = require('../mysql')

/**
 * 查找数据
 * @param {*表名} table 
 * @param {*id} id 
 */
const list = async(table) => {
  const sql = `select * from ${table}`
  const data = await row(sql)
  return data
}

/**
 * 
 * @param {*表名} table 
 * @param {*key-value} params 
 */
const findByparams = async(table, params) => {
  console.log(params)
  const sql = `select * from ${table} where ${params.key} = ?`
  const data = await first(sql, params.value)
  return data
}

module.exports = find = {
  list,
  findByparams
}