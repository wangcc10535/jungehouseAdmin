import request from "@/utils/request";

// 新增合作企业
export function addCooperation(data) {
    return request({
      url: "/system/dict/data",
      method: "post",
      data: data,
    });
  }
// 获取
export function getCooperation() {
  return request({
    url: "/system/dict/data/type/cooperation",
    method: "get"
  });
}
// 删除合作企业
export function delCooperation(data) {
  return request({
    url: "/system/dict/data/"+data,
    method: "delete"
  });
}
