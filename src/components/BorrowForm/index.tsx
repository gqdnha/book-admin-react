"use client";
import { getBookList } from "@/api/book";
import { borrowAdd, borrowUpdate } from "@/api/borrow";
import { getUserList } from "@/api/user";
import Content from "@/components/Content";
import { Button, Form, message, Select } from "antd";
import { useEffect, useState } from "react";

export default function BorrowForm({ title, editData }: { title: string }) {
  const [form] = Form.useForm();
  const [userList, setUserList] = useState([]);
  const [bookList, setBookList] = useState([]);
  const [stock, setStock] = useState(0);

  useEffect(() => {
    getUserList().then((res) => {
      setUserList(res.data);
    });
    getBookList().then((res) => {
      setBookList(res.data);
    });
  }, []);

  const handleFinish = async (values: BorrowType) => {
    console.log("表单提交", values);
    try {
      if (editData?.id) {
        //编辑
        await borrowUpdate(values);
        message.success("编辑成功");
      } else {
        // 创建
        await borrowAdd(values);
        message.success("创建成功");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleBookChange = (value, options) => {
    console.log(value, options);
    setStock(options.stock);
  };
  return (
    <Content title={title}>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
        onFinish={handleFinish}
      >
        <Form.Item
          label="书籍名称"
          name="book"
          rules={[{ required: true, message: "请输入名称" }]}
        >
          <Select
            placeholder="请选择"
            options={bookList.map((item) => ({
              label: item.name,
              value: item._id,
              stock: item.stock,
            }))}
            onChange={handleBookChange}
          />
        </Form.Item>
        <Form.Item
          label="借阅用户"
          name="user"
          rules={[{ required: true, message: "请输入作者" }]}
        >
          <Select
            placeholder="请选择"
            options={userList.map((item) => ({
              label: item.name,
              value: item._id,
            }))}
          />
        </Form.Item>
        <Form.Item label="书籍库存">{stock}</Form.Item>
        <Form.Item label=" " colon={false}>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            disabled={stock <= 0}
          >
            创建
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
}
