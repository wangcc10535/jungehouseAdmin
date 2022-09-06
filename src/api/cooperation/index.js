import request from "@/utils/request";

// 新增banner
export function addCooperation(data) {
    return request({
      url: "/system/dict/data",
      method: "post",
      data: data,
    });
  }
// 获取banner
export function getCooperation() {
  return request({
    url: "/system/dict/data/type/cooperation",
    method: "get"
  });
}
// 删除banner
export function delCooperation(data) {
  return request({
    url: "/system/dict/data/"+data,
    method: "delete"
  });
}
