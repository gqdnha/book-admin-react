import { BookQueryType, BookType } from "@/type";

import qs from "qs";
import request from "@/utils/request";

// 获取图书列表
export async function getBookList(params?: BookQueryType) {
  return request.get(`/api/books?${qs.stringify(params)}`);
  // console.log(res, "图书列表");
}

// 添加图书
export async function bookAdd(params: BookType) {
  return request.post("/api/books",  params );
}
