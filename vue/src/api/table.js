import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/task/list',
    method: 'post',
    params
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
