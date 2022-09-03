import request from "@/utils/request";

// 新增问题
export function addFaq(data) {
  return request({
    url: "/faq/add",
    method: "post",
    data: data,
  });
}

// 修改问题
export function editFaq(data) {
    return request({
      url: "/faq/update",
      method: "post",
      data: data,
    });
  }

// 删除问题
export function delFaq(data) {
    return request({
      url: "/faq/deleteById",
      method: "post",
      data: data,
    });
  }

// 查询问题
export function listFaq(data) {
    return request({
      url: "/faq/selectList",
      method: "post",
      data: data
    });
  }

// // 查询问题列表
// export function listUser(query) {
//     return request({
//       url: '/system/user/list',
//       method: 'get',
//       params: query
//     })
//   }