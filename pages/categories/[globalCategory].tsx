import React, { useEffect, useState } from "react";
import { MainLayout } from "../../layouts/MainLayout";
import Link from "next/link";
import ScrollContainer from "react-indiana-drag-scroll";
import Pagination from "@/components/pagination";
import Breadcrumbs from "@/components/breadcrumbs";
import ProductItem from "@/components/productItem";
import Filter from "@/components/modals/filter";
import { useAppDispatch } from "@/utilities/hooks";
import { actionFilter } from "../../store/actions/modal";
import { axiosQuery } from "@/utilities/utilities";
import { GetStaticPaths } from "next";
import TopDownloads from "@/components/topDownloads";
import { ProductThumbnail } from "..";

export interface App {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  appId: number;
  globalCategoryId: number;
  productCount: string;
  app: {
    id: number;
    name: string;
  };
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
}

export default function GlobalCategory({ globalCategory }: { globalCategory: number }) {
  const [apps, setApps] = useState<App[]>([]);
  const [products, setProducts] = useState<ProductThumbnail[]>([]);

  const getData = async (id: number) => {
    const res = await axiosQuery({ url: `/global-categories/${id}` });
    console.log(res.data);
    setApps(res.data.apps);
    setProducts(res.data.products);
  };

  useEffect(() => {
    getData(globalCategory);
  }, []);

  return (
    <MainLayout title={"Roblox"}>
      <>
        <div className='content-column'>
          <div className='container'>
            <Breadcrumbs />

            <TopDownloads title='Игры' data={apps} />

            <div className='products-content'>
              <div className='products-list d-grid'>
                {products.map((value, i) => (
                  <ProductItem key={i} item={value} />
                ))}
              </div>
              <Pagination onClick={() => null} />
            </div>
          </div>
        </div>
        <Filter />
      </>
    </MainLayout>
  );
}

export const getStaticPaths = (() => {
  return {
    paths: new Array(11).map((i, index) => {
      return {
        params: {
          globalCategory: index.toString(),
        },
      };
    }),
    fallback: "blocking",
  };
}) satisfies GetStaticPaths;

export async function getStaticProps(context) {
  console.log(context.params.globalCategory); // return { title: 'Mortal Kombat' }
  // const res = await axiosQuery({ url: `/apps?type=${context.params.globalCategory}&page=1` });
  return {
    // props: { initialApps: res.data, type: context.params.type }, // will be passed to the page component as props
    props: { globalCategory: context.params.globalCategory },
  };
}
