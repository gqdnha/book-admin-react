import { UserType, UserQueryType } from "@/type";

import qs from "qs";
import request from "@/utils/request";

// 获取用户列表
export async function getUserList(params?: UserQueryType) {
  return request.get(`/api/users?${qs.stringify(params)}`);
}

// 添加用户
export async function userAdd(params: UserType) {
  return request.post("/api/users", params);
}
// 删除用户
export async function userDelete(id: string) {
  return request.delete(`/api/users/${id}`);
}
// 禁用
export async function userUpdate(params: UserType) {
  // TODO: 这里的接口设计有问题，应该是 /api/users/:id
  return request.put(`/api/users`, params);
  // return request.put(`/api/users/${params._id}`, params);

}
