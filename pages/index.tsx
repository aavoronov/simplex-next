import React, { useEffect, useState } from "react";
import { useWindowSize } from "../hooks/useWindowSize";
import { MainLayout } from "../layouts/MainLayout";
import FilterHome from "@/components/filterHome";
import MainSlider from "@/components/mainSlider";
import TopDownloads from "@/components/topDownloads";
import Link from "next/link";
import ScrollContainer from "react-indiana-drag-scroll";
import Pagination from "@/components/pagination";
import ProductItem from "@/components/productItem";
import { axiosQuery } from "@/utilities/utilities";

export interface App {
  id: number;
  miniPic: string;
  isGame: boolean;
  name: string;
  image: string;
}

export interface ProductThumbnail {
  id: number;
  pics: string[];
  name: string;
  price: number;
  average: string;
  count: string;
  category: {
    name: string;
    app: {
      id: number;
      name: string;
      miniPic: string;
    };
  };
  reviews: Review[];
}

export interface Review {
  rating: number;
}

const AppThumbnail = ({ app }: { app: App }) => {
  return (
    <Link className='gaa-item d-flex' href={`/catalog/${app.id}`}>
      <div className='gaa-item_icon'>
        <img
          src={app.image ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/products/${app.image}` : "../images/no-image.jpg"}
          className='w-100 h-100'
          alt=''
        />
      </div>
      <div className='gaa-item-info'>
        <p className='gaa-item_name two-lines'>{app.name}</p>
        {/* <div className='item-raiting d-flex align-items-center'>
          <div className='item-raiting_num'>3.6</div>
          <div className="votes-count">50347</div>
        </div> */}
      </div>
    </Link>
  );
};

export default function Home() {
  const { width } = useWindowSize();

  const [games, setGames] = useState<App[]>([]);
  const [apps, setApps] = useState<App[]>([]);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [endReached, setEndReached] = useState(false);

  const bonuses = [1, 2, 3, 4];

  // const products = [1, 2, 3, 4, 5, 6, 7, 8];

  const getApps = async () => {
    const res = await axiosQuery({ url: `/apps?type=apps&page=1` });

    console.log(res.data);
    setApps(res.data.rows.slice(0, 7));
  };

  const getGames = async () => {
    const res = await axiosQuery({ url: `/apps?type=games&page=1` });

    console.log(res.data);
    setGames(res.data.rows.slice(0, 15));
  };

  const getProducts = async (page) => {
    const res = await axiosQuery({ url: `/products?page=${page}` });
    setProducts((prev) => [...prev, ...res.data]);
    setPage((prev) => prev + 1);
    if (!res.data.length) {
      setEndReached(true);
    }
    console.log(res.data);
  };

  useEffect(() => {
    getGames();
    getApps();
    getProducts(page);
  }, []);

  return (
    <MainLayout title={"Главная"}>
      <div className='content-column'>
        <FilterHome />
        <div className='container'>
          <MainSlider />
          {/* {!notImplemented && <TopDownloads />} */}
          <div className='store-bonuses'>
            <ScrollContainer className='bonus-list d-grid'>
              {bonuses.map((value, i) => (
                <Link key={i} className='bonus-item d-flex align-items-center position-relative' href=''>
                  <div className='bonus-icon'>
                    <img src='../images/bonus.png' alt='' />
                  </div>
                  <div className='bonus-item-info'>
                    <div className='bonus-item-name'>Бонус за каждую покупку</div>
                    <div className='bonus-item-text'>Узнай всё про Simple</div>
                  </div>
                </Link>
              ))}
            </ScrollContainer>
          </div>
          <div className='games-and-apps d-flex justify-content-between'>
            <div className='games-column'>
              <div className='title_header d-flex justify-content-between align-items-center'>
                <div className='home-title d-flex align-items-center'>
                  <div className='title-icon'>
                    <img src='../images/games.svg' alt='' />
                  </div>
                  <div className='title-text'>Игры</div>
                </div>
                <Link
                  href={{
                    pathname: `/[type]`,
                    query: {
                      type: "games", // pass the id
                    },
                  }}
                  // as='/games/'
                  className='open_all'>
                  {width >= 1024 ? "Посмотреть больше" : "Ещё"}
                </Link>
              </div>

              <ScrollContainer className='gaa-list d-flex justify-content-between'>
                {games.map((value, i) => (
                  <AppThumbnail key={value.id} app={value} />
                ))}
              </ScrollContainer>
            </div>
            <div className='apps-column'>
              <div className='title_header d-flex justify-content-between align-items-center'>
                <div className='home-title d-flex align-items-center'>
                  <div className='title-icon'>
                    <img src='../images/apps.svg' alt='' />
                  </div>
                  <div className='title-text'>Приложения</div>
                </div>
                <Link
                  href={{
                    pathname: `/[type]`,
                    query: {
                      type: "apps", // pass the id
                    },
                  }}
                  // as='/apps/'
                  className='open_all'>
                  {width >= 1024 ? "Посмотреть больше" : "Ещё"}
                </Link>
              </div>
              <ScrollContainer className='gaa-list d-flex justify-content-between'>
                {apps.map((value, i) => (
                  <AppThumbnail key={value.id} app={value} />
                ))}
              </ScrollContainer>
            </div>
          </div>

          <div className='premium-goods'>
            <div className='title_header d-flex justify-content-between align-items-center'>
              <div className='home-title d-flex align-items-center'>
                <div className='title-icon'>
                  <img src='../images/diamond.svg' alt='' />
                </div>
                <div className='title-text'>Премиум товары</div>
              </div>
            </div>
            <div className='products-content'>
              <div className='products-list d-grid'>
                {products.map((value: ProductThumbnail, i) => (
                  <ProductItem key={i} item={value} />
                ))}
              </div>
              {!endReached && <Pagination onClick={() => getProducts(page)} />}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
