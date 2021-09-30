import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/servers',
    method: 'get',
    params
  })
}
