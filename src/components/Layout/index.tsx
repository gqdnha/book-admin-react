"use client"; // 添加客户端组件标记
import styles from "./index.module.css";
import React, { ReactNode } from "react";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import Image from "next/image";
import { Space, Layout as AntdLayout, Menu, Dropdown } from "antd";
import { useRouter, usePathname } from "next/navigation";


const { Header, Content, Sider } = AntdLayout;

// 左侧导航栏内容
const ITEMS = [
  {
    // icon: React.createElement(icon),
    key: `book`,
    label: `图书管理`,
    children: [
      { key: `/book`, label: `图书列表` },
      { key: `/book/add`, label: `图书添加` },
    ],
  },
  {
    // icon: React.createElement(icon),
    key: `borrow`,
    label: `借阅管理`,
    children: [
      { key: `/borrow`, label: `借阅列表` },
      { key: `/borrow/add`, label: `借阅添加` },
    ],
  },
  {
    // icon: React.createElement(icon),
    key: `category`,
    label: `分类管理`,
    children: [
      { key: `/category`, label: `分类列表` },
      { key: `/category/add`, label: `分类添加` },
    ],
  },
  {
    // icon: React.createElement(icon),
    key: `user`,
    label: `用户管理`,
    children: [
      { key: `/user`, label: `用户列表` },
      { key: `/user/add`, label: `用户添加` },
    ],
  },
];
const USER_TIENM: MenuProps["items"] = [
  {
    label: "用户中心",
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: "登出",
    key: "2",
    // disabled: true,
  },
];

// export function Layout({ children }: LayoutProps) {
export function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  /* const handleMenuClick = ({ key }: { key: string }) => {
    router.push(key);
  }; */
  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    router.push(key);
  };

  // 添加路径判断逻辑，当访问首页时高亮图书列表
  const activeMenu = pathname === '/' ? '/book' : pathname;
  
  return (
    <> 
      <main className={styles.main}></main>
      <AntdLayout>
        <Header className={styles.header}>
          <Image
            className={styles.logo}
            src="/logo.svg"
            alt="logo"
            width={30}
            height={30}
          />
          三木图书管理系统
          <span className={styles.user}>
            <Dropdown menu={{ items: USER_TIENM }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  用户名
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </span>
        </Header>

        <div style={{ padding: "0 48px" }}>
          <AntdLayout className={styles.sectionInner}>
            <Sider width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={["/book"]}
                defaultOpenKeys={["book"]}
                selectedKeys={[activeMenu]}
                style={{ height: "100%" }}
                items={ITEMS}
                onClick={handleMenuClick}
              />
            </Sider>
            <AntdLayout className={styles.sectionContent}>
              <Content
                className={styles.content}
                // style={{ padding: "24px 24px", minHeight: 280 }}
              >
                {children}
              </Content>
            </AntdLayout>
          </AntdLayout>
        </div>
        {/* <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()}
        </Footer> */}
      </AntdLayout>
    </>
  );
}