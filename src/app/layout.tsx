import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// 样式导入：先第三方重置样式，再自定义全局样式
import "antd/dist/reset.css";
import "./globals.css";
// 导入封装好的Layout组件
import { Layout } from "@/components/Layout/index";

// 加载字体
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 元数据配置
export const metadata: Metadata = {
  title: "图书管理系统",
  description: "基于Next.js和Ant Design的图书管理系统",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      {/* body标签必须直接放在html标签下，这是浏览器规范 */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* 在这里使用封装好的Layout组件，将页面内容children传递进去 */}
        <Layout>
          {/* 这里的children会被渲染到Layout组件的Content区域 */}
          {children}
        </Layout>
      </body>
    </html>
  );
}
    