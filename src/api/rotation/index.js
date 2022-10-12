/*
 * @Author: wangcc 1053578651@qq.com
 * @Date: 2022-09-21 22:01:51
 * @LastEditors: wangcc 1053578651@qq.com
 * @LastEditTime: 2022-10-12 22:28:16
 * @FilePath: \jungehouseAdmin\src\api\rotation\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
    url: "/system/dict/data/"+data,
    method: "delete"
  });
}

// 修改banner
export function EditBanner(data) {
  return request({
    url: "/system/dict/data",
    method: "put",
    data: data,
  });
}
