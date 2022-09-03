import request from "@/utils/request";

// 新增经济人
export function addmiddleman(data) {
  return request({
    url: "/middleman/add",
    method: "post",
    data: data,
  });
}

// 修改经济人
export function editmiddleman(data) {
    return request({
      url: "/middleman/update",
      method: "post",
      data: data,
    });
  }

// 删除经济人
export function delmiddleman(data) {
    return request({
      url: "/middleman/deleteById",
      method: "post",
      data: data,
    });
  }

// 查询经济人
export function listmiddleman(data) {
    return request({
      url: "/middleman/selectList",
      method: "post",
      data: data
    });
  }
