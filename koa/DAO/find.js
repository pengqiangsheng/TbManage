const { row, first } = require('../mysql')

/**
 * 计算表中有多少条记录
 * @param {*表名} table 
 * @param {*字段} id 
 */
const countTable = async (table, id = 'id') => {
  const sql = `SELECT count(${id}) FROM ${table}`
  const obj = await first(sql)
  return obj['count(id)']
}

const PAGEOBJ = {
  pageNum: 1,
  pageSize: 10,
  totalSize: 0,
  totalPage: 0,
}

const getPageInfo = async (pageSize, table) => {
  const totalSize = await countTable(table)
  const totalPage = totalSize > pageSize ? Math.ceil(totalSize / pageSize) : 1
  return { totalSize,  totalPage }
}

/**
 * 查找数据
 * @param {*表名} table 
 * @param {*id} id 
 */
const list = async(table, pageObj = { ...PAGEOBJ }, params = []) => {
  let sql = null
  if(!params.length) {
    // all
    sql = `select * from ${table}`
  }else {
    // fliter by params
    sql = `select * from ${table} where `
    for(let i=0; i < params.length; i++) {
      if(i%2) {
        sql += `${params[i]} and `
      }else {
        sql += `${params[i]} = `
      }
    }
    sql = sql.slice(0, -5)
  }

  // add page
  const { pageNum, pageSize } = pageObj
  if(pageObj.totalSize) {
    sql += ` LIMIT ${(pageNum - 1) * pageSize}, ${pageSize}`
    const list = await row(sql)
    return { list, pageObj }
  }
  const { totalSize, totalPage } = await getPageInfo(pageSize, table)
  pageObj.totalSize = totalSize
  pageObj.totalPage = totalPage

  sql += ` order by id desc`
  sql += ` LIMIT ${(pageNum - 1) * pageSize},   ${pageSize}`
  const list = await row(sql)

  return { list, pageObj }
}

/**
 * 查找一个匹配的数据
 * @param {*表名} table 
 * @param {*key-value} params 
 */
const findByparams = async(table, params) => {
  console.log(params)
  const sql = `select * from ${table} where ${params.key} = ?`
  const data = await first(sql, params.value)
  return data
}

/**
 * 查找数据集合
 * @param {*表名} table 
 * @param {*params} params 
 */
const findListByParams = async(table, pageObj = { ...PAGEOBJ }, ...params) => {

  let sql = `select * from ${table} where `
  for(let i=0; i < params.length; i++) {
    if(i%2) {
      sql += `${params[i]} and `
    }else {
      sql += `${params[i]} = `
    }
  }
  sql = sql.slice(0, -5)

  // add page
  const { pageNum, pageSize } = pageObj

  // if(pageObj.totalSize) {
  //   sql += ` LIMIT ${(pageNum - 1) * pageSize}, ${pageSize}`
  //   const list = await row(sql)
  //   return { list, pageObj }
  // }

  const { length: totalSize } = await row(sql)
  const totalPage = totalSize > pageSize ? Math.ceil(totalSize / pageSize) : 1
  pageObj.totalSize = totalSize
  pageObj.totalPage = totalPage

  sql += ` order by id desc`
  sql += ` LIMIT ${(pageNum - 1) * pageSize}, ${pageSize}`
  const list = await row(sql)
  return { list, pageObj }
}

/**
 * 内联查询
 * @param {*} tA 
 * @param {*} tB 
 * @param {*} username 
 */
const getJoinList = async (sql, pageObj = { ...PAGEOBJ }) => {
  // add page
  const { pageNum, pageSize } = pageObj

  // if(pageObj.totalSize) {
  //   sql += ` LIMIT ${(pageNum - 1) * pageSize}, ${pageSize}`
  //   const list = await row(sql)
  //   return { list, pageObj }
  // }

  const { length: totalSize } = await row(sql)
  const totalPage = totalSize > pageSize ? Math.ceil(totalSize / pageSize) : 1
  pageObj.totalSize = totalSize
  pageObj.totalPage = totalPage

  sql += ` order by a.id desc`
  sql += ` LIMIT ${(pageNum - 1) * pageSize}, ${pageSize}`
  
  const list = await row(sql)
  return { list, pageObj }
}

/**
 * 外联
 * 
 * 
to left
select a.id,a.name,a.addrid,b.country,b.city
from student a left join addr b
on a.addrid=b.addrid;

to right
select a.id,a.name,a.addrid,b.country,b.city
from student a right join addr b
on a.addrid=b.addrid;
 */



module.exports = find = {
  list,
  findByparams,
  findListByParams,
  countTable,
  getJoinList
}