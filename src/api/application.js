import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/applications',
    method: 'get',
    params
  })
}
