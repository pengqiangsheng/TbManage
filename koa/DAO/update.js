const { execute } = require('../mysql')

/**
 * 通过id修改一条记录
 * @param {*表名} table 
 * @param {*id} id 
 */
const updateById = async(table, id, ...params) => {
  let sql = `UPDATE ${table} SET `
  for(let i=0; i < params.length; i++) {
    if(i%2) {
      sql += params[i]
    }else {
      sql += `${params[i]} = `
    }
  }
  sql += ` WHERE id = ?;`
  const data = await execute(sql, id)
  return data
}

module.exports = update = {
  updateById
}