import request from "@/utils/request";

// 新增地区
export function addRegion(data) {
    return request({
      url: "/system/dict/data",
      method: "post",
      data: data,
    });
  }
// 获取地区
export function getRegion() {
  return request({
    url: "/system/dict/data/type/region",
    method: "get"
  });
}
// 删除地区
export function delRegion(data) {
  return request({
    url: "/system/dict/data/"+data,
    method: "delete"
  });
}
