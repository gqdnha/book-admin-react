'use client'; // 添加这行，将组件转换为客户端组件

import Book from "./book/page"; // 取消注释
export default function Home() {
  return (
    <Book />
  );
}