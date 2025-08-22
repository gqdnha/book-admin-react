"use client"; // 添加客户端组件标记

import React from "react";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Image,
} from "antd";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

export default function BookForm() {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);

//   用于封面预览
  const [preview, setPreview] = useState("");
//   获取表单实例
  const [form] = Form.useForm();
  const handleFinish = (values) => {
    console.log(values);
  }
  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
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
          <Select placeholder="请选择">
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="封面" name="cover">
          <Input.Group>
            <Space>
              <Input
                placeholder="请输入"
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
            </Space>
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
        <Form.Item label="Button">
          <Button htmlType="submit">创建</Button>
        </Form.Item>
      </Form>
    </>
  );
}
