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
    miniPic: string;
  };
  globalCategory: {
    name: string;
  };
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
}

export default function GlobalCategory({ globalCategory, name }: { globalCategory: number; name: string }) {
  const [apps, setApps] = useState<App[]>([]);
  const [products, setProducts] = useState<ProductThumbnail[]>([]);
  const [endReached, setEndReached] = useState(false);
  const [page, setPage] = useState(1);

  const getApps = async (id: number) => {
    const res = await axiosQuery({ url: `/global-categories/${id}` });
    setApps(res.data.apps);
  };

  const getProducts = async (id: number, page: number) => {
    const res = await axiosQuery({ url: `/products?globalCategoryId=${id}&page=${page}` });
    console.log(res.data);
    setProducts((prev) => [...prev, ...res.data]);
    setPage((prev) => prev + 1);
    if (!res.data.length) setEndReached(true);
  };

  useEffect(() => {
    getApps(globalCategory);
    getProducts(globalCategory, page);
  }, []);

  return (
    <MainLayout title={"Roblox"}>
      <>
        <div className='content-column'>
          <div className='container'>
            {!!apps.length && <Breadcrumbs currentCrumbs={[apps[0].globalCategory.name]} />}

            <TopDownloads title='Игры' data={apps} />

            <div className='products-content'>
              <div className='products-list d-grid'>
                {products.map((value, i) => (
                  <ProductItem key={i} item={value} />
                ))}
              </div>
              {!endReached && <Pagination onClick={() => getProducts(globalCategory, page)} />}
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
    revalidate: 60,
  };
}
