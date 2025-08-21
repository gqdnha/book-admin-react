"use client";
import { Button, Col, Form, Input, Row, Select, Space } from "antd";

export default function Home() {
  const [form] = Form.useForm();

  const handlesearchFinsh = (values) => {
    console.log(values, "搜索结果");
  };

  const handleSearchReset = () => {
    form.resetFields(); // 只执行重置逻辑
  };

  return (
    <>
      <Form
        name="customized_form_controls"
        // layout="inline"
        onFinish={handlesearchFinsh}
        
        initialValues={{
          name: "",
          author: "",
          category: "",
        }}
        form={form} // 注意这里需要关联form实例
      >
        <Row gutter={24}>
          <Col span={5}>
            <Form.Item name="name" label="名称">
              <Input placeholder="请输入" allowClear />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item name="author" label="作者">
              <Input placeholder="请输入" allowClear />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item name="category" label="分类">
              <Select
                showSearch
                allowClear
                placeholder="请选择"
                options={[
                  { label: "分类1", value: "分类1" },
                  { label: "分类2", value: "分类2" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={9}>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  搜索
                </Button>

                <Button htmlType="button" onClick={handleSearchReset}>
                  清空
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}
