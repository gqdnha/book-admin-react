"use client";
import { Button, Col, Form, Input, Row, Select, Space, Table } from "antd";
import { useRouter } from "next/navigation";
// import { title } from "process";

const COLUMNS = [
  {
    title: "名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "封面",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "作者",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "分类",
    dataIndex: "tags",
    key: "tags",
  },
  {
    title: "描述",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "库存",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "创建时间",
    dataIndex: "age",
    key: "age",
  },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "5",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "6",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "7",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "8",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "9",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "10",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "11",
    name: "Jim Green11",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "12",
    name: "Joe Black12",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "13",
    name: "John Brown13",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
];

export default function Home() {
  const [form] = Form.useForm();
  const router = useRouter()
  // 搜索操作
  const handlesearchFinsh = (values: unknown) => {
    console.log(values, "搜索结果");
  };

  // 清空操作
  const handleSearchReset = () => {
    form.resetFields(); // 只执行重置逻辑
  };
  // 编辑操作
  const handleBookEdit = (row: unknown) => {
    console.log(row, "编辑");
    router.push('/book/add')
  };

  const columns = [
    ...COLUMNS,
    {
      title: "操作",
      key: "action",
      render: (_: unknown, row: unknown) => {
        return (
          <>
            <Space>
              <Button type="link" onClick={handleBookEdit}>
                编辑
              </Button>
              <Button type="link" danger>
                删除
              </Button>
            </Space>
          </>
        );
      },
    },
  ];

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

      {/* 表格 */}
      <Table columns={columns} dataSource={data} scroll={{ x: 1000 }} />
    </>
  );
}
