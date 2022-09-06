import request from "@/utils/request";

// 新增评论
export function addApplaud(data) {
    return request({
      url: "/applaud/add",
      method: "post",
      data: data,
    });
  }
// 获取评论
export function listApplaud(data) {
    return request({
      url: "/applaud/selectList",
      method: "post",
      data: data,
    });
  }
// 删除评论
export function delApplaud(data) {
  return request({
    url: "/applaud/deleteById",
    method: "post",
    data: data,
  });
}

// 修改评论
export function editApplaud(data) {
    return request({
      url: "/applaud/update",
      method: "post",
      data: data,
    });
  }