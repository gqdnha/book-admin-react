import { BorrowQueryType, BorrowType } from "@/type";

import qs from "qs";
import request from "@/utils/request";

// 获取图书列表
export async function getBorrowList(params?: BorrowQueryType) {
  return request.get(`/api/borrows?${qs.stringify(params)}`);
  // console.log(res, "图书列表");
}

// 添加图书
export async function borrowAdd(params: BorrowType) {
  return request.post("/api/borrows",  params );
}
// 删除图书
export async function borrowDelete(id: string) {
  return request.delete(`/api/borrows/${id}` );
}
// 编辑图书
export async function borrowUpdate(params: BorrowType) {
  return request.put(`/api/borrows`, params );
}
export async function getBorrowDetail(id: string) {
  return request.get(`/api/borrows/${id}` );
}
