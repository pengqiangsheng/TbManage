import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/task/list',
    method: 'post',
    data
  })
}

export function addList(params) {
  return request({
    url: '/task/add',
    method: 'post',
    data: params
  })
}

export function delTask(params) {
  return request({
    url: '/task/del',
    method: 'post',
    data: params
  })
}

export function receiveTask(data) {
  return request({
    url: '/task/receive',
    method: 'post',
    data
  })
}

export function getUnreceiveList(data) {
  return request({
    url: '/task/unreceive/list',
    method: 'post',
    data
  })
}

export function completeTask(data) {
  return request({
    url: '/task/complete',
    method: 'post',
    data
  })
}
