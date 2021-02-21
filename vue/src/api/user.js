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
