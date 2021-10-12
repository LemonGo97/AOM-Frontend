import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/servers',
    method: 'get',
    params
  })
}

export function getOne(id, params) {
  return request({
    url: '/server/' + id,
    method: 'get',
    params
  })
}

export function save(data) {
  return request({
    url: '/server',
    method: 'post',
    data
  })
}
