const { add, del, find, update } = require('../DAO')
const { TASK, RATE } = require('../tools/constant')



const getListByAdmin = async (left, right, pageObj) => {
  let sql = `select a.id,a.rid,a.t_key,a.sku,a.price,a.total,a.status,a.link,a.shopName,a.orderNumber,a.remark,
            b.platform,b.site,b.rate,b.commission
            from ${TASK} a 
            join ${RATE} b 
            on a.rid = b.id and a.status between ${left} and ${right}`
  return await find.getJoinList(sql, pageObj)
}

const getListByBuyer = async (receiveName, left, right, pageObj) => {
  let sql = `select a.id,a.rid,a.t_key,a.sku,a.price,a.total,a.status,a.link,a.shopName,a.orderNumber,a.remark,
              b.platform,b.site,b.rate,b.commission
              from ${TASK} a 
              join ${RATE} b 
              on a.rid = b.id and a.receiveName = '${receiveName}' and a.status between ${left} and ${right}`
  return await find.getJoinList(sql, pageObj)
}
const getListByShoper = async (username, left, right, pageObj) => {
  let sql = `select a.id,a.rid,a.t_key,a.sku,a.price,a.total,a.status,a.link,a.shopName,a.orderNumber,a.remark,
              b.platform,b.site,b.rate,b.commission
              from ${TASK} a 
              join ${RATE} b 
              on a.rid = b.id and a.username = '${username}' and a.status between ${left} and ${right}`
  return await find.getJoinList(sql, pageObj)
}

const unreceiveSql = `select a.id,a.rid,a.t_key,a.sku,a.price,a.total,a.status,a.link,a.shopName,a.orderNumber,a.remark,
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
  writeOrderNumber: (id, orderNumber, remark) => update.updateById(TASK, id, 'orderNumber', `'${orderNumber}'`, 'remark', `'${remark}'`),
  getListByAdmin,
  getListByBuyer,
  getListByShoper,
  getUnreceiveList,
  getTaskStatus: async id => {
    const { status } = await find.findByparams(TASK, {
      key: 'id',
      value: id
    })
    return status
  }
}