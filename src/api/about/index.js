import request from "@/utils/request";

// 新增关于我们
export function addAboutus(data) {
    return request({
      url: "/system/dict/data",
      method: "post",
      data: data,
    });
  }
// 获取关于我们
export function getAboutus() {
  return request({
    url: "/system/dict/data/type/aboutus",
    method: "get"
  });
}
// 修改关于我们
export function editAboutus(data) {
    return request({
      url: "/system/dict/data",
      method: "put",
      data: data,
    });
  }

// 新增隐私声明
export function addStatement(data) {
    return request({
      url: "/system/dict/data",
      method: "post",
      data: data,
    });
  }
// 获取隐私声明
export function getStatement() {
  return request({
    url: "/system/dict/data/type/statement",
    method: "get"
  });
}
// 修改隐私声明
export function editStatement(data) {
    return request({
      url: "/system/dict/data",
      method: "put",
      data: data,
    });
  }
// 新增服务条款
export function addTerms(data) {
    return request({
      url: "/system/dict/data",
      method: "post",
      data: data,
    });
  }
// 获取服务条款
export function getTerms() {
  return request({
    url: "/system/dict/data/type/terms",
    method: "get"
  });
}
// 修改服务条款
export function editTerms(data) {
    return request({
      url: "/system/dict/data",
      method: "put",
      data: data,
    });
  }