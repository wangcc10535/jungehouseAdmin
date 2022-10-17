/*
 * @Author: wangcc 1053578651@qq.com
 * @Date: 2022-09-21 22:01:51
 * @LastEditors: wangcc 1053578651@qq.com
 * @LastEditTime: 2022-10-17 21:42:27
 * @FilePath: \jungehouseAdmin\src\api\about\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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

// 新增关于我们视频
export function addVideo(data) {
  return request({
    url: "/system/dict/data",
    method: "post",
    data: data,
  });
}
// 获取关于我们视频
export function getVideo() {
  return request({
    url: "/system/dict/data/type/about_video",
    method: "get"
  });
}
// 修改关于我们视频
export function editVideo(data) {
  return request({
    url: "/system/dict/data",
    method: "put",
    data: data,
  });
}

// 删除视频
export function delVideo(data) {
  return request({
    url: "/system/dict/data/"+data,
    method: "delete"
  });
}