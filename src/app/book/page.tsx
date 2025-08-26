"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css"; // 引入样式文件
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  message,
  Row,
  Select,
  Space,
  Table,
  TablePaginationConfig,
  Tooltip,
} from "antd";
import dayjs from "dayjs";
import { bookDelete, getBookList } from "@/api/book";
import { BookQueryType, CategoryType } from "@/type";
import Content from "@/components/Content";
import { getCategoryList } from "@/api/category";

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

export default function Book() {
  const [form] = Form.useForm();
  const [data, setdata] = useState([]);
  const router = useRouter();
  // 请求数据
  async function fetchData(search:BookQueryType) {
    const res = await getBookList({
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...search,
    });
    const { data } = res;
    console.log(res, "123");
    setdata(data);
    setPagination({...pagination,total:res.total})
  }
  // 请求数据
  useEffect(() => {
    fetchData({});
    getCategoryList({all:true}).then(res => {
      console.log(res.data,'分类')
      setCategoryList(res.data)
    })
  }, []);
  // 分类列表
  const [categoryList, setCategoryList] = useState<CategoryType[]>([])

  // 分页器
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    total: data.length,
  });

  // 搜索操作
  const handleSearchFinsh = async (values: BookQueryType) => {
    // console.log(values, "搜索结果");
    const res = await getBookList({
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
  // 清空操作
  const handleSearchReset = () => {
    form.resetFields(); // 只执行重置逻辑
    handleSearchFinsh({});
  };
  // 编辑操作
  const handleBookEdit = (id: string) => {
    console.log(id, "编辑");
    router.push(`/book/edit/${id}`);
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
    getBookList({
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...query, // 保持查询条件
    });
  };
  // 删除
  const handleBookDelete = (id: string) => {
    bookDelete(id).then((res) => {
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
              <Button type="link" onClick={() => handleBookEdit(row._id)}>
                编辑
              </Button>
              <Button type="link" danger onClick={()=>handleBookDelete(row._id)}>
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
      title="图书列表"
      operation={
        <Button
          type="primary"
          onClick={() => {
            router.push("/book/add");
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
                options={categoryList.map(item => ({label:item.name,value:item._id}) )}
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
