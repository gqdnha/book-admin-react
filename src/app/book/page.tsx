"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css"; // 引入样式文件
import axios from "axios";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Row,
  Select,
  Space,
  Table,
  TablePaginationConfig,
  Tooltip,
} from "antd";
import dayjs from "dayjs";

// import { title } from "process";

const COLUMNS = [
  {
    title: "名称",
    dataIndex: "name",
    key: "name",
    width: 200,
  },
  {
    title: "封面",
    dataIndex: "cover",
    key: "cover",
    width: 120,
    render: (text: string) => {
      return <Image width={50} src={text} alt="" />;
    },
  },
  {
    title: "作者",
    dataIndex: "author",
    key: "author",
    width: 120,
  },
  {
    title: "分类",
    dataIndex: "category",
    key: "category",
    width: 80,
  },
  {
    title: "描述",
    dataIndex: "description",
    key: "description",
    ellipsis: true, // 超出省略号
    width: 200,
    render: (text: string) => {
      return (
        <Tooltip title={text} placement="topLeft">
          {text}
        </Tooltip>
      );
    },
  },
  {
    title: "库存",
    dataIndex: "stock",
    key: "stock",
    width: 80,
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    key: "createTime",
    render: (text: string) => dayjs(text).format("YYYY-MM-DD"),
    width: 130,
  },
];

export default function Home() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [data, setdata] = useState([]);
  // 请求数据
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        "https://mock.apifox.cn/m1/2398938-0-default/api/books"
      );
      // console.log(res, "图书列表");
      const { data } = res.data;
      console.log(data, "图书列表数据");
      setdata(data);
    }
    fetchData();
  }, []);

  // 分页器
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    total: data.length,
  });

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
    router.push("/book/add");
  };
  // 表格改变
  const handleTableChange = (pagination: TablePaginationConfig) => {
    console.log(pagination, "分页器");
    setPagination({
      current: pagination.current ?? 1,
      pageSize: pagination.pageSize ?? 10,
      showSizeChanger:
        typeof pagination.showSizeChanger === "boolean"
          ? pagination.showSizeChanger
          : true,
      total: pagination.total ?? data.length,
    });
  };
  // 表格-操作列
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
      <div className={styles.tableWrap}>
        <Table
          columns={columns}
          dataSource={data}
          scroll={{ x: 1000 }} // 设置表格的滚动
          onChange={handleTableChange}
          pagination={{
            ...pagination,
            showTotal: () => `共${pagination.total} 条`,
          }}
        />
      </div>
    </>
  );
}
