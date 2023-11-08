import React, { useEffect, useState } from "react";
import { MainLayout } from "../layouts/MainLayout";
import Link from "next/link";
import Pagination from "@/components/pagination";
import TopDownloads from "@/components/topDownloads";
import Breadcrumbs, { crumbs } from "@/components/breadcrumbs";
import { axiosQuery } from "@/utilities/utilities";
import { GetStaticPaths } from "next";
import { App } from "./index";
import router from "next/router";

export default function Apps({ initialApps, type }: { initialApps: App[]; type: "games" | "apps" }) {
  const [page, setPage] = useState(2);
  const [apps, setApps] = useState<App[]>(initialApps);
  const [endReached, setEndReached] = useState(false);

  // const type = isGames ? "games" : "apps";

  const getApps = async (page) => {
    const res = await axiosQuery({ url: `/apps?type=${type}&page=${page}` });

    console.log(res.data);
    setApps((prev) => [...prev, ...res.data.rows]);
    if (!res.data.rows.length) {
      setEndReached(true);
    }
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    setPage(1);
    console.log("reset");
    setApps([]);
    setEndReached(false);
    getApps(1);
    // router.push(`/${type}`).then(() => {
    //   router.reload();
    // });
  }, [type]);

  return (
    <MainLayout title={type === "games" ? "Игры" : "Приложения"}>
      <div className='content-column'>
        <div className='container'>
          <Breadcrumbs currentCrumbs={[type === "games" ? crumbs.games : crumbs.apps]} />
          {/* <TopDownloads /> */}
          <div className='gaa-catalog d-grid'>
            {apps.map((item) => (
              <Link className='gaa-item d-flex' href={`/catalog/${item.id}`} key={item.id}>
                <div className='gaa-item_icon'>
                  <img src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/apps/${item.miniPic}`} className='w-100 h-100' alt='' />
                </div>
                <div className='gaa-item-info'>
                  <p className='gaa-item_name two-lines'>{item.name}</p>
                </div>
              </Link>
            ))}
          </div>
          {!endReached && <Pagination onClick={() => getApps(page)} />}
        </div>
      </div>
    </MainLayout>
  );
}

export const getStaticPaths = (async () => {
  return {
    paths: [
      {
        params: {
          type: "games",
        },
      }, // See the "paths" section below
      {
        params: {
          type: "apps",
        },
      },
    ],
    fallback: "blocking",
  };
}) satisfies GetStaticPaths;

export async function getStaticProps(context) {
  console.log(context.params.type); // return { title: 'Mortal Kombat' }
  const res = await axiosQuery({ url: `/apps?type=${context.params.type}&page=1` });
  return {
    props: { initialApps: res.data.rows, type: context.params.type }, // will be passed to the page component as props
    revalidate: 60,
  };
}
