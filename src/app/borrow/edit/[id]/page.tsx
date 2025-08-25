"use client";

import BorrowForm from "@/components/BorrowForm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getBorrowDetail } from "@/api/borrow";

export default function BorrowEdit() {
  const router = useRouter();
  const [data, setData] = useState();
  useEffect(() => {
    if (router.id) {
      getBorrowDetail(router.query.id).then((res) => {
        setData(res.data);
      });
    }
  }, [router.id]);
  return <BorrowForm title="借阅编辑" editData={data} />;
}
