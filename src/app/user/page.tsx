"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css"; // 引入样式文件
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Table,
  TablePaginationConfig,
  Tag,
} from "antd";
import dayjs from "dayjs";
import { getCategoryList, categoryDelete } from "@/api/category";
import { CategoryQueryType } from "@/type";
import Content from "@/components/Content";

// import { title } from "process";

const STATUS = {
  ON: "on",
  OFF: "off",
};
export const STATUS_OPTIONS = [
  { label: "正常", value: STATUS.ON },
  { label: "禁用", value: STATUS.OFF },
];

const COLUMNS = [
  {
    title: "账号",
    dataIndex: "name",
    key: "name",
    width: 200,
  },
  {
    title: "用户名",
    dataIndex: "nickName",
    key: "nickName",
    width: 120,
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    width: 120,
    render: (text: string) => {
      return text === STATUS.ON ? (
        <Tag color="green">正常</Tag>
      ) : (
        <Tag color="red">禁用</Tag>
      );
    },
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
  async function fetchData(values?: any) {
    const res = await getCategoryList({
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...values,
    });
    const { data } = res;
    console.log(res, "123");
    setdata(data);
    setPagination({ ...pagination, total: res.total });
  }
  useEffect(() => {
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
  const handleSearchFinsh = async (values: CategoryQueryType) => {
    console.log(values, "搜索结果");
    const res = await getCategoryList({
      ...values,
      current: 1,
      pageSize: pagination.pageSize,
    });
    console.log(res.data, "搜索结果");
    setdata(res.data);
    setPagination({
      ...pagination,
      current: 1,
      total: res.total || res.data.length,
    });
  };
  // 删除操作
  const handleCategoryDelete = (row: { _id: string }) => {
    const { _id } = row as { _id: string };
    console.log(_id, "删除操作");
    /* Modal.confirm({
      title: "确认删除吗？",
      okText: "确定",
      cancelText: "取消",
      async onOk() {
        // 对应 网课 分类管理-列表 第14节课
        await categoryDelete(_id);
        message.success("删除成功");
        fetchData(form.getFieldsValue()); // 重新获取数据
      },
    }); */
    categoryDelete(_id).then((res) => {
      message.success("删除成功");
      fetchData(form.getFieldsValue()); // 重新获取数据
    });
    console.log(_id, "删除操作1");
  };
  // 清空操作
  const handleSearchReset = () => {
    form.resetFields(); // 只执行重置逻辑
    handleSearchFinsh({});
  };
  // 编辑操作
  const handleCategoryEdit = (id: string) => {
    console.log(id, "编辑");
    router.push(`/category/edit/${id}`);
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
    getCategoryList({
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...query, // 保持查询条件
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
              <Button type="link" onClick={() => handleCategoryEdit(row._id)}>
                编辑
              </Button>
              <Button
                danger={row.status === STATUS.ON ? true : false}
                type="link"
                onClick={() => handleCategoryEdit(row._id)}
              >
                {row.status === STATUS.ON ? "禁用" : "启用"}
              </Button>
              <Button
                type="link"
                danger
                onClick={() => handleCategoryDelete(row)}
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
      title="用户列表"
      operation={
        <Button
          type="primary"
          onClick={() => {
            router.push("/category/add");
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
            <Form.Item name="name" label="名称">
              <Input placeholder="请输入" allowClear />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item name="level" label="状态">
              <Select
                showSearch
                allowClear
                placeholder="请选择"
                options={STATUS_OPTIONS}
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
