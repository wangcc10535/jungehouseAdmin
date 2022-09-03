import request from '@/utils/request'

// 新增房产
export function addRoom(data) {
    return request({
      url: '/room/add',
      method: 'post',
      data: data
    })
  }