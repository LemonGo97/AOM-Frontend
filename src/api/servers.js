import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/servers',
    method: 'get',
    params
  })
}

export function getOne(id) {
  return request({
    url: '/server/' + id,
    method: 'get'
  })
}

export function save(data) {
  return request({
    url: '/server',
    method: 'post',
    data
  })
}

export function remove(id) {
  return request({
    url: '/server/' + id,
    method: 'delete'
  })
}

export function modify(data) {
  return request({
    url: '/server',
    method: 'put',
    data
  })
}

export function getSystemType(params) {
  return request({
    url: '/server/system-type',
    method: 'get',
    params
  })
}
