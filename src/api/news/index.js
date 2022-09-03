import request from "@/utils/request";

// 新增新闻
export function addNews(data) {
  return request({
    url: "/news/add",
    method: "post",
    data: data,
  });
}

// 修改新闻
export function editNews(data) {
    return request({
      url: "/news/update",
      method: "post",
      data: data,
    });
  }

// 删除新闻
export function delNews(data) {
    return request({
      url: "/news/deleteById",
      method: "post",
      data: data,
    });
  }

// 查询新闻
export function listNews(data) {
    return request({
      url: "/news/selectList",
      method: "post",
      data: data
    });
  }
