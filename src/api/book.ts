import { BookQueryType } from "@/type/book";
import axios from "axios";
import qs from "qs";

export async function getBookList(params?:BookQueryType) {
  const res = await axios.get(`/api/books?${qs.stringify(params)}`,);
  // console.log(res, "图书列表");
  return res.data
}
