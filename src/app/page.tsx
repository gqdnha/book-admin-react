'use client'; // 添加这行，将组件转换为客户端组件


import { Button } from "antd";

export default function Home() {
  return (
    <div>
      <h1>Hello World</h1>
      <Button type="primary">Hello Button</Button>
    </div>
  );
}
