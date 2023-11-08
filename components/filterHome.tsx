import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import Catalog from "./modals/catalog";
import { axiosQuery } from "@/utilities/utilities";
import Link from "next/link";
export default function FilterHome() {
  const cats = [
    "Донат",
    "Аккаунты",
    "Предметы",
    "Другое",
    "Игровая валюта",
    "Подписки",
    "Аккаунты с играми",
    "Скины",
    "Буст",
    "Медиа",
    "Услуги",
    "Дизайн",
  ];

  const getData = async (id: number) => {
    const res = await axiosQuery({ url: `/global-categories/${id}` });
    console.log(res.data);
  };

  return (
    <div className='filter-wrapper d-flex align-items-center'>
      <Catalog cats={cats} />
      <div className='filters-horizontal_items'>
        <ScrollContainer className='filters_scroll d-flex align-items-center'>
          {cats.map((value, i) => (
            <button key={i} className={`btn btn_filter-item`}>
              <Link
                href={{
                  pathname: `/categories/[globalCategory]`,
                  query: {
                    globalCategory: i + 1, // pass the id
                  },
                }}>
                {value}
              </Link>
            </button>
          ))}
        </ScrollContainer>
      </div>
    </div>
  );
}
