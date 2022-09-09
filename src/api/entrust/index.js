import request from "@/utils/request";

// 查询委托
export function qnaList(data) {
  return request({
    url: "/qna/selectList",
    method: "post",
    data: data,
  });
}

// 删除委托
export function delQna(data) {
    return request({
      url: "/qna/deleteById",
      method: "post",
      data: data,
    });
  }