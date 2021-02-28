import request from '@/utils/request'

export function getRateList(data) {
  return request({
    url: '/rate/list',
    method: 'post',
    data
  })
}

export function addRate(params) {
  return request({
    url: '/rate/add',
    method: 'post',
    data: params
  })
}

export function delRate(params) {
  return request({
    url: '/rate/del',
    method: 'post',
    data: params
  })
}
