"use client";
import UserForm from "@/components/UserForm";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserDetail } from "@/api/user";
import { useParams } from "next/navigation"; // 导入 useParams

export default function UserEdit() {
  const params = useParams(); // 获取路由参数
  const [data, setData] = useState();
  const id = params.id as string; // 从参数中获取 id

  useEffect(() => {
    if (id) {
      getUserDetail(id).then(res => {
        console.log(res.data);
        setData(res.data);
      });
    }
  }, [id]);

  return (
    <UserForm title="用户编辑" editData={data} />
  );
}