import request from '@/utils/request'

export function getList(type, params) {
  return request({
    url: '/applications/' + type + '/version',
    method: 'get',
    params
  })
}

export function getInfo(type) {
  return request({
    url: '/applications/' + type + '/info',
    method: 'get'
  })
}

export function getChangeLog(type) {
  return request({
    url: '/applications/' + type + '/changeLog',
    method: 'get'
  })
}
