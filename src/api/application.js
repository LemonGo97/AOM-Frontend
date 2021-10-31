import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/applications/version',
    method: 'get',
    params
  })
}
