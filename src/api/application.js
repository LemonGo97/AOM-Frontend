import request from '@/utils/request'

export function getList(type, params) {
  return request({
    url: '/applications/' + type + '/version',
    method: 'get',
    params
  })
}
