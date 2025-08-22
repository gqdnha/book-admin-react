import { BookQueryType, BookType } from "@/type";

import qs from "qs";
import request from "@/utils/request";

// 获取图书列表
export async function getCategoryList(params?: BookQueryType) {
  return request.get(`/api/categories?${qs.stringify(params)}`);
  // console.log(res, "图书列表");
}

// 添加图书
export async function categoryAdd(params: BookType) {
  return request.post("/api/categories",  params );
}
// 删除图书
export async function categoryDelete(id: string) {
  return request.delete(`/api/categories/${id}` );
}