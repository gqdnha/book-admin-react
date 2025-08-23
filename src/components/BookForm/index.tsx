"use client"; // 添加客户端组件标记
import React, { useEffect } from "react";
import { useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Image,
  message,
} from "antd";
import { bookAdd } from "@/api/book";
import { BookType, CategoryType } from "@/type";
import { useRouter } from "next/navigation";
import Styles from "./index.module.css";
import dayjs from "dayjs";
import Content from "../Content";
import { getCategoryList } from "@/api/category";
const { TextArea } = Input;

export default function BookForm({ title }: { title: string }) {
  // const [componentDisabled, setComponentDisabled] = useState<boolean>(true);

  //   用于封面预览
  const [preview, setPreview] = useState("");
  //   分类列表
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
  //   获取表单实例
  const [form] = Form.useForm();
  const router = useRouter();
  const handleFinish = async (values: BookType) => {
    if (values.publishAt) {
      values.publishAt = dayjs(values.publishAt).valueOf();
    }
    await bookAdd(values);
    message.success("添加成功");
    router.push("/book");
  };
  // 初始化加载数据
  useEffect(() => {
    getCategoryList({ all: true }).then((res) => {
      setCategoryList(res.data);
    });
  });
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
          label="作者"
          name="author"
          rules={[{ required: true, message: "请输入作者" }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          label="分类"
          name="category"
          rules={[{ required: true, message: "请选择分类" }]}
        >
          <Select
            placeholder="请选择"
            options={categoryList.map((item) => ({
              label: item.name,
              value: item._id,
            }))}
          />
        </Form.Item>
        <Form.Item label="封面" name="cover">
          <Input.Group compact>
            <Input
              placeholder="请输入"
              style={{ width: "calc(100% - 64px)" }}
              onChange={(e) => {
                form.setFieldValue("cover", e.target.value);
              }}
            />
            <Button
              type="primary"
              onClick={(e) => {
                setPreview(form.getFieldValue("cover"));
              }}
            >
              预览
            </Button>
          </Input.Group>
        </Form.Item>
        {preview && (
          <Form.Item label="封面预览" colon={false}>
            <Image src={preview} alt="" width={100} height={100} />
          </Form.Item>
        )}

        <Form.Item label="出版日期" name="publishAt">
          <DatePicker placeholder="请选择" />
        </Form.Item>
        <Form.Item label="库存" name="stock">
          <InputNumber placeholder="请输入" />
        </Form.Item>
        <Form.Item label="描述" name="description">
          <TextArea rows={4} placeholder="请输入..." />
        </Form.Item>
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
