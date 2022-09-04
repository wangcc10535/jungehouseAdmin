import request from "@/utils/request";

// 新增banner
export function addBanner(data) {
    return request({
      url: "/system/dict/data",
      method: "post",
      data: data,
    });
  }
// 获取banner
export function getBanners() {
  return request({
    url: "/system/dict/data/type/banner",
    method: "get"
  });
}
// 删除banner
export function delBanner(data) {
  return request({
    url: "/system/dict/data/type/"+data,
    method: "delete"
  });
}
