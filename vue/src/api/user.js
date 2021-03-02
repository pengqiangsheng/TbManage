import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function registry(data) {
  return request({
    url: '/registry',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/user/info',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export function getList(data) {
  return request({
    url: '/user/list',
    method: 'post',
    data
  })
}

export function activeUser(data) {
  return request({
    url: '/user/active',
    method: 'post',
    data
  })
}

export function topUp(data) {
  return request({
    url: '/user/topup',
    method: 'post',
    data
  })
}

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

export function modifyPwd(data) {
  return request({
    url: '/user/modify/pwd',
    method: 'post',
    data
  })
}

export function updateBankInfo(data) {
  return request({
    url: '/user/bank/update',
    method: 'post',
    data
  })
}
