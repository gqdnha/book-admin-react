import { BookQueryType } from "@/type/book";
import qs from "qs";
import request from '@/utils/request'

export async function getBookList(params?:BookQueryType) {
  return request.get(`/api/books?${qs.stringify(params)}`,);
  // console.log(res, "图书列表");
}
