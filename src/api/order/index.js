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