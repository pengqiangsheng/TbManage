const { add, del, find, update } = require('../DAO')
const { TASK, RATE } = require('../tools/constant')

let sql = `select a.id,a.rid,a.t_key,a.sku,a.price,a.total,a.status,a.link,a.shopName,
          b.platform,b.site,b.rate,b.commission
          from ${TASK} a 
          join ${RATE} b 
          on a.rid = b.id`

const getListByAdmin = pageObj => find.getJoinList(sql, pageObj)

const getListByBuyer = async (receiveName, pageObj) => {
  let sql = `select a.id,a.rid,a.t_key,a.sku,a.price,a.total,a.status,a.link,a.shopName,
              b.platform,b.site,b.rate,b.commission
              from ${TASK} a 
              join ${RATE} b 
              on a.rid = b.id and a.receiveName = '${receiveName}'`
  return await find.getJoinList(sql, pageObj)
}
const getListByShoper = async (username, pageObj) => {
  let sql = `select a.id,a.rid,a.t_key,a.sku,a.price,a.total,a.status,a.link,a.shopName,
              b.platform,b.site,b.rate,b.commission
              from ${TASK} a 
              join ${RATE} b 
              on a.rid = b.id and a.username = '${username}'`
  return await find.getJoinList(sql, pageObj)
}

const unreceiveSql = `select a.id,a.rid,a.t_key,a.sku,a.price,a.total,a.status,a.link,a.shopName,
                      b.platform,b.site,b.rate,b.commission
                      from ${TASK} a 
                      join ${RATE} b 
                      on a.rid = b.id and a.receiveName is null`
const getUnreceiveList = pageObj => find.getJoinList(unreceiveSql, pageObj)

const complete = async(roles, id) => {
  let status = 0
  if(roles === 'buyer') {
    status = 3
  } else if(roles === 'shoper') {
    status = 4
  } else if(roles === 'admin') {
    status = 5
  }
  return await update.updateById(TASK, id, 'status', status)
}

module.exports = {
  deleteById: id => del.deleteById(TASK, id),
  add: data => add.addOne(TASK, data),
  list: (pageObj) => find.list(TASK, pageObj),
  receive: (receiveName, id) => update.updateById(TASK, id, 'receiveName', receiveName, 'status', 2),
  complete,
  getListByAdmin,
  getListByBuyer,
  getListByShoper,
  getUnreceiveList
}