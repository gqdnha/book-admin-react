"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css"; // 引入样式文件
import {
  Button,
  Col,
  Form,
  message,
  Row,
  Select,
  Space,
  Table,
  TablePaginationConfig,
  Tag,
} from "antd";
import dayjs from "dayjs";
import { getBookList } from "@/api/book";
import { BookType, BorrowQueryType } from "@/type";
import Content from "@/components/Content";
import { getBorrowList,borrowDelete } from "@/api/borrow";

// import { title } from "process";
// 状态列表
const STATUS_OPTIONS = [
  { label: "借出", value: "on" },
  { label: "归还", value: "off" },
];

const COLUMNS = [
  {
    title: "名称",
    dataIndex: "bookName",
    key: "bookName",
    width: 200,
  },

  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    width: 80,
    render: (text: string) =>
      text === "on" ? (
        <Tag color="red">借出</Tag>
      ) : (
        <Tag color="green">归还</Tag>
      ),
  },
  {
    title: "借阅人",
    dataIndex: "borrowUser",
    key: "borrowUser",
    width: 80,
  },
  {
    title: "借阅时间",
    dataIndex: "borrowAt",
    key: "borrowAt",
    render: (text: string) => dayjs(text).format("YYYY-MM-DD"),
    width: 130,
  },
  {
    title: "归还时间",
    dataIndex: "backAt",
    key: "backAt",
    render: (text: string) => dayjs(text).format("YYYY-MM-DD"),
    width: 130,
  },
];

export default function Borrow() {
  const [form] = Form.useForm();
  const [data, setdata] = useState([]);
  const router = useRouter();
  // 请求数据
  async function fetchData(search: BorrowQueryType) {
    const res = await getBorrowList({
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...search,
    });
    const newData = res.data.map((item) => ({
      ...item,
      bookName: item.book.name,
      borrowUser: item.user.nickName,
    }));
    setdata(newData);
    setPagination({ ...pagination, total: res.total });
  }
  // 用户列表
  // TODO
  const [userList, setUserList] = useState<any[]>([]);
  // 书籍列表
  const [bookList, setBookList] = useState<BookType[]>([]);

  // 分页器
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    total: data.length,
  });

  // 请求数据
  useEffect(() => {
    fetchData({});
    getBookList({ all: true }).then((res) => {
      setBookList(res.data);
    });
  }, []);

  // 搜索操作
  const handleSearchFinsh = async (values: BorrowQueryType) => {
    // console.log(values, "搜索结果");
    const res = await getBorrowList({
      ...values,
      current: 1,
      pageSize: pagination.pageSize,
    });
    const newData = res.data.map((item) => ({
      ...item,
      bookName: item.book.name,
      borrowUser: item.user.nickName,
    }));
    console.log(newData, "搜索结果");
    setdata(newData);
    setPagination({
      ...pagination,
      current: 1,
      total: res.total || res.data.length,
    });
  };
  // 清空操作
  const handleSearchReset = () => {
    form.resetFields(); // 只执行重置逻辑
    handleSearchFinsh({});
  };
  // 编辑操作
  const handleBorrowEdit = (id: string) => {
    console.log(id, "编辑");
    router.push(`/borrow/edit/${id}`);
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
    const query = form.getFieldsValue();
    getBorrowList({
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...query, // 保持查询条件
    });
  };
  // 删除
  const handleBorrowDelete = (id: string) => {
    borrowDelete(id).then((res) => {
      message.success("删除成功");
      fetchData(form.getFieldsValue()); // 重新获取数据
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
              <Button type="link" onClick={() => handleBorrowEdit(row._id)}>
                编辑
              </Button>
              <Button
                type="link"
                danger
                onClick={() => handleBorrowDelete(row._id)}
              >
                删除
              </Button>
            </Space>
          </>
        );
      },
    },
  ];

  return (
    <Content
      title="书籍借阅"
      operation={
        <Button
          type="primary"
          onClick={() => {
            router.push("/borrow/add");
          }}
        >
          添加
        </Button>
      }
    >
      <Form
        name="customized_form_controls"
        // layout="inline"
        onFinish={handleSearchFinsh}
        initialValues={{
          name: "",
          author: "",
          category: "",
        }}
        form={form} // 注意这里需要关联form实例
      >
        <Row gutter={24}>
          <Col span={5}>
            <Form.Item name="name" label="书籍名称">
              <Select
                allowClear
                showSearch
                optionFilterProp="label"
                options={bookList.map((item) => ({
                  label: item.name,
                  value: item._id,
                }))}
              ></Select>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item name="status" label="状态">
              <Select allowClear options={STATUS_OPTIONS}></Select>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item name="user" label="借阅人">
              <Select
                allowClear
                placeholder="请选择"
                options={userList.map((item) => ({
                  label: item.name,
                  value: item._id,
                }))}
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
    </Content>
  );
}
