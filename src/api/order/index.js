import request from "@/utils/request";

// 新增房产
export function addRoom(data) {
  return request({
    url: "/room/add",
    method: "post",
    data: data,
  });
}

// 删除房产
export function deleteRoom(data) {
  return request({
    url: "/room/deleteById",
    method: "post",
    data: data,
  });
}
// 修改房产
export function updateRoom(data) {
  return request({
    url: "/room/update",
    method: "post",
    data: data,
  });
}

// 房产详情
export function selectRoom(data) {
  return request({
    url: "/room/selectById",
    method: "post",
    data: data,
  });
}

// 房产查询
export function searchRoom(data) {
  return request({
    url: "/room/selectList",
    method: "post",
    data: data,
  });
}

// 用户咨询查询

export function searchRequire(data) {
  return request({
    url: "/require/update",
    method: "post",
    data: data,
  });
}

// 用户咨询修改

export function updateRequire(data) {
  return request({
    url: "/require/selectList",
    method: "post",
    data: data,
  });
}

// 用户咨询删除

export function delRequire(data) {
  return request({
    url: "/require/deleteById",
    method: "post",
    data: data,
  });
}