import request from '@/utils/request'

export function getAdminInfo(data) {
  return request({
    url: '/admin/info',
    method: 'post',
    data
  })
}

