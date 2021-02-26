import request from '@/utils/request'

export function getBillList(data) {
  return request({
    url: '/bill/list',
    method: 'post',
    data
  })
}

export function billApply(data) {
  return request({
    url: '/bill/apply',
    method: 'post',
    data
  })
}
