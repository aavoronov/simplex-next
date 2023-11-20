import React, { useEffect, useState } from "react";
import Link from "next/link";
import ScrollContainer from "react-indiana-drag-scroll";
import BtnSort from "../btnSort";
import Pagination from "../pagination";
import BtnDelete from "../btnDelete";
import { axiosQuery, currentDatetime } from "@/utilities/utilities";

interface Sale {
  id: number;
  status: "created" | "disputed" | "completed" | "cancelled";
  sum: number;
  createdAt: string;
  product: {
    id: number;
    name: string;
    category: {
      name: string;
      app: {
        name: string;
        miniPic: string;
      };
    };
  };
}

const SingleSale = ({ sale }: { sale: Sale }) => {
  const Status = () => {
    switch (sale.status) {
      case "created":
        return <div className='item-tag gradient d-flex align-items-center justify-content-center mx-auto'>Ожидает подтверждения</div>;
      case "completed":
        return <div className='item-tag gradient_green d-flex align-items-center justify-content-center mx-auto'>Подтвержден</div>;
      case "disputed":
        return <div className='item-tag gradient d-flex align-items-center justify-content-center mx-auto'>Идет спор</div>;
      case "cancelled":
        return <div className='item-tag gradient d-flex align-items-center justify-content-center mx-auto'>Отменен</div>;
    }
  };
  return (
    <div className='history-table-item d-flex align-items-center justify-content-between w-100'>
      <div className='history-table-item_info'>
        <div className='history-table-item_info_num'>№{sale.id}</div>
        <div className='history-table-item_info_date'>{currentDatetime(sale.createdAt)}</div>
      </div>
      <div className='history-table-item_cat'>
        <Link href='/catalog/' className='product-cat d-flex'>
          <div className='product-cat-icon'>
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/apps/${sale.product.category.app.miniPic}`}
              className='w-100 h-100'
              alt=''
            />
          </div>
          <div className='product-cat-info d-flex flex-column justify-content-between'>
            <div className='product-game-name'>{sale.product.category.app.name}</div>
            <div className='product-cat-name'>{sale.product.category.name}</div>
          </div>
        </Link>
      </div>
      <div className='history-table-item_name two-lines'>{sale.product.name}</div>
      {/* <div className='history-table-item_count text-center'>24 шт.</div> */}
      <div className='history-table-item_price text-center'>{sale.sum} ₽</div>
      <div className='history-table-item_status'>
        <Status />
      </div>
    </div>
  );
};

export default function Sales() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [page, setPage] = useState(1);
  const [endReached, setEndReached] = useState(false);

  const getSales = async (page) => {
    const res = await axiosQuery({ url: `/purchases/sales?page=${page}` });
    setSales((prev) => [...prev, ...res.data]);
    console.log(res.data);
    setPage((prev) => prev + 1);
    if (!res.data.length) setEndReached(true);
  };

  useEffect(() => {
    getSales(page);
  }, []);
  return (
    <>
      <div className='profile-content_head d-flex align-items-center justify-content-between'>{/* <BtnSort /> */}</div>
      <div className='history_content history-purchases_content'>
        <div className='history-table'>
          {sales.map((item) => (
            <SingleSale sale={item} key={item.id} />
          ))}
        </div>
        {!endReached && <Pagination onClick={() => getSales(page)} />}
      </div>
    </>
  );
}
