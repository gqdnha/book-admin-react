"use client"; // 添加客户端组件标记
import React, { useEffect } from "react";
import { Button, Form, Input, message, Radio } from "antd";
import { useRouter } from "next/navigation";
import Styles from "./index.module.css";
import Content from "../Content";
import { userAdd,userUpdate } from "@/api/user";
import { USER_SEX, USER_ROLE, USER_STATUS } from "@/constant/user";
import { UserType } from "@/type";

export default function UserForm({
  title,
  editData = {
    sex: USER_SEX.MALE,
    role: USER_ROLE.USER,
    status: USER_STATUS.ON,
  },
}: {
  title: string;
  // Partial 可能会有userType的部分属性
  editData?: Partial<UserType>;
}) {
  //   获取表单实例
  const [form] = Form.useForm();
  const router = useRouter();
  useEffect(() => {
    if (editData._id) {
      console.log("editData", editData);
      form.setFieldsValue(editData);
    }
  }, [editData, form]);
  const handleFinish = async (values: UserType) => {
    console.log(values);
    if(editData._id) {
      await userUpdate(values);
    } else {
      await userAdd(values);
    }
    message.success("添加成功");
    router.push("/user");
  };
  // 初始化加载数据

  return (
    <Content title={title}>
      <Form
        form={form}
        initialValues={editData}
        className={Styles.form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={handleFinish}
      >
        <Form.Item
          label="账号"
          name="name"
          rules={[{ required: true, message: "请输入账号" }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          label="名称"
          name="nickName"
          rules={[{ required: true, message: "请输入名称" }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          label="性别"
          name="sex"
          rules={[{ required: true, message: "请选择性别" }]}
        >
          <Radio.Group>
            <Radio value="male">男</Radio>
            <Radio value="female">女</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="密码" name="password">
          <Input.Group compact>
            <Input.Password placeholder="请输入" />
          </Input.Group>
        </Form.Item>
        <Form.Item label="状态" name="status">
          <Radio.Group>
            <Radio value="on">启用</Radio>
            <Radio value="off">禁用</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="角色" name="role">
          <Radio.Group>
            <Radio value="user">用户</Radio>
            <Radio value="admin">管理员</Radio>
          </Radio.Group>
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
