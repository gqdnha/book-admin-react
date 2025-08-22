"use client"; // 添加客户端组件标记

import React, {  useEffect, useMemo } from "react";
import { useState } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  message,
} from "antd";
import { categoryAdd } from "@/api/category";
import {  CategoryType } from "@/type";
import { useRouter } from "next/navigation";
import Styles from "./index.module.css";
import Content from "../Content";
import { LEVEL_OPTIONS } from "@/app/category/page";
import { getCategoryList } from "@/api/category";

export default function CategoryForm({ title }: { title: string }) {
  // const [componentDisabled, setComponentDisabled] = useState<boolean>(true);

  //   获取表单实例
  const [form] = Form.useForm();
  const router = useRouter();
  // 级别
  const [level, setLevel] = useState(1);
  const [levelOneList,setLevelOneList] = useState<CategoryType[]>([])
  const handleFinish = async (values: CategoryType) => {
    console.log("提交的值", values);
    await categoryAdd(values);
    message.success("添加成功");
    router.push("/category");
  };
  // 所属级别
  useEffect(() => {
    async function fetchData() {
      const res = await getCategoryList({all: true,level:1})
      setLevelOneList(res.data)
    }
    fetchData()
  }, []);

  const levelOneOptions = useMemo(() => {
    return levelOneList.map((item) => ({
      value: item._id,
      label: item.name,
    }))
  }, [levelOneList])
  return (
    <Content title={title}>
      <Form
        className={Styles.form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={handleFinish}
      >
        <Form.Item
          label="名称"
          name="name"
          rules={[{ required: true, message: "请输入名称" }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          label="级别"
          name="level"
          rules={[{ required: true, message: "请选择级别" }]}
        >
          <Select
            onChange={(value) => {
              setLevel(value);
            }}
            placeholder="请选择"
            options={LEVEL_OPTIONS}
          />
        </Form.Item>
        {level === 2 && (
          <Form.Item
            label="所属级别"
            name="parent"
            rules={[{ required: true, message: "请选择级别" }]}
          >
            <Select placeholder="请选择" options={levelOneOptions} />
          </Form.Item>
        )}

        <Form.Item label=" " colon={false}>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className={Styles.btn}
          >
            创建
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
}
