import React, { useEffect, useState } from "react";
import Link from "next/link";
import ScrollContainer from "react-indiana-drag-scroll";
import BtnSort from "../btnSort";
import Pagination from "../pagination";

import ProductItem from "@/components/productItem";
import { axiosQuery } from "@/utilities/utilities";
import ProductItemPersonal from "../productItemPersonal";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  status: string;
  pics: string[];
  category: {
    id: number;
    name: string;
    app: {
      id: number;
      name: string;
      miniPic: string;
    };
  };
}

export default function MyGoods() {
  const filters = [
    { name: "Все", key: "all" },
    { name: "Активные", key: "active" },
    { name: "Скрытые", key: "hidden" },
    { name: "Проданные", key: "sold" },
  ];
  const [filter, setFilter] = useState(filters[0]);

  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [endReached, setEndReached] = useState(false);

  const getProducts = async (page: number) => {
    const res = await axiosQuery({ url: `/products/my?page=${page}` });
    setProducts((prev) => [...prev, ...res.data]);
    setPage((prev) => prev + 1);
    if (res.data.length < 15) setEndReached(true);
  };

  useEffect(() => {
    getProducts(page);
  }, []);

  return (
    <>
      <div className='profile-content_head d-flex align-items-center justify-content-between'>
        <div className='filter-wrapper d-flex align-items-center'>
          <div className='filters-horizontal_items'>
            <ScrollContainer className='filters_scroll d-flex align-items-center'>
              {filters.map((value, i) => (
                <button key={i} className={`btn btn_filter-item`} onClick={() => setFilter(value)}>
                  {value.name}
                </button>
              ))}
            </ScrollContainer>
          </div>
        </div>
        {/* <BtnSort /> */}
      </div>
      <div className='goods_content'>
        <div className='goods_content-list d-grid justify-content-between'>
          {products
            .filter((item) => {
              return filter.key === filters[0].key || item.status === filter.key;
            })
            .map((item, i) => (
              <ProductItemPersonal key={item.id} item={item} />
            ))}
        </div>
        {filter.key === filters[0].key && !endReached && <Pagination onClick={() => getProducts(page)} />}
      </div>
    </>
  );
}
