import Breadcrumbs from "@/components/breadcrumbs";
import PublishedModal from "@/components/modals/published";
import Pagination from "@/components/pagination";
import { MainLayout } from "@/layouts/MainLayout";
import { SetState, axiosQuery } from "@/utilities/utilities";
import { useState, useEffect } from "react";

interface App {
  id: number;
  miniPic: string;
  name: string;
}

const AppSelection = ({
  initialApps,
  initialGames,
  appsCount,
  gamesCount,
  initialSearch,
}: {
  initialApps: App[];
  initialGames: App[];
  appsCount: number;
  gamesCount: number;
  initialSearch: string;
}) => {
  const [activeCategory, setActiveCategory] = useState("games");

  const [apps, setApps] = useState<App[]>(initialApps);
  const [appEndReached, setAppEndReached] = useState(false);
  const [appPage, setAppPage] = useState(2);
  const [appCount, setAppCount] = useState(appsCount);

  const [games, setGames] = useState<App[]>(initialGames);
  const [gameEndReached, setGameEndReached] = useState(false);
  const [gamePage, setGamePage] = useState(2);
  const [gameCount, setGameCount] = useState(gamesCount);

  const [search, setSearch] = useState(initialSearch);

  const getApps = async (page, search) => {
    const res = await axiosQuery({ url: `/apps?type=apps&page=${page}&search=${search}` });
    setApps((prev) => [...prev, ...res.data.rows]);
    if (!res.data.rows.length) {
      setAppEndReached(true);
    }
    setAppCount(res.data.count);
    setAppPage((prev) => prev + 1);
  };

  const getGames = async (page, search) => {
    const res = await axiosQuery({ url: `/apps?type=games&page=${page}&search=${search}` });
    setGames((prev) => [...prev, ...res.data.rows]);
    if (!res.data.rows.length) {
      setGameEndReached(true);
    }
    setGameCount(res.data.count);
    setGamePage((prev) => prev + 1);
  };
  const displayEntities = activeCategory === "games" ? games : apps;
  const getMore = () => (activeCategory === "games" ? getGames(gamePage, search) : getApps(appPage, search));
  const endReached = activeCategory === "games" ? gameEndReached : appEndReached;

  // useEffect(() => {
  //   getApps(1);
  //   getGames(1);
  // }, []);

  //   useEffect(() => {
  //     setApps([]);
  //     setGames([]);
  //     setAppPage(1);
  //     setGamePage(1);
  //     getApps(1);
  //     getGames(1);
  //   }, [search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setApps([]);
    setGames([]);
    setAppPage(1);
    setGamePage(1);
    getApps(1, e.target.value);
    getGames(1, e.target.value);
  };

  return (
    <>
      <div className='sell_search gradient'>
        <form className='position-relative w-100' action=''>
          <input
            className='search-input w-100'
            type='text'
            placeholder='Поиск игр и приложений'
            value={search}
            onChange={handleSearchChange}
          />
          <button className='btn_search d-flex align-items-center justify-content-start position-absolute p-0'>
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'>
              <path
                stroke='#929292'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M10 15.974c3.314 0 6-2.682 6-5.99a5.995 5.995 0 0 0-6-5.99c-3.314 0-6 2.681-6 5.99a5.995 5.995 0 0 0 6 5.99ZM20 19.967l-5-5.99'
              />
            </svg>
          </button>
        </form>
      </div>
      <div className='sell_choose d-flex align-items-center'>
        <button
          id='c_0'
          onClick={() => setActiveCategory("games")}
          className={`btn btn_choose d-flex align-items-center justify-content-center ${activeCategory === "games" ? "active" : ""}`}>
          <span className='btn_choose-icon'>
            <img src='../images/games_g.svg' alt='' />
          </span>
          Игры ({gameCount})
        </button>
        <button
          id='c_1'
          onClick={() => setActiveCategory("apps")}
          className={`btn btn_choose d-flex align-items-center justify-content-center ${activeCategory === "apps" ? "active" : ""}`}>
          <span className='btn_choose-icon'>
            <img src='../images/apps_g.svg' alt='' />
          </span>
          Приложения ({appCount})
        </button>
      </div>
      <div className='gaa-catalog d-grid'>
        {displayEntities.map((item, i) => (
          <div
            key={item.id}
            className='gaa-item d-flex'
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              console.log(item.id);
            }}>
            <div className='gaa-item_icon'>
              <img src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/apps/${item.miniPic}`} className='w-100 h-100' alt='' />
            </div>
            <div className='gaa-item-info'>
              <p className='gaa-item_name two-lines'>{item.name}</p>
            </div>
          </div>
        ))}
      </div>
      {!endReached && <Pagination onClick={getMore} />}
    </>
  );
};

export default function Search({ apps, games, appsCount, gamesCount, initialSearch }) {
  return (
    <MainLayout title={"Продать"}>
      <div className='content-column'>
        <div className='container'>
          <Breadcrumbs currentCrumbs={["Поиск"]} />

          <AppSelection
            initialApps={apps}
            initialGames={games}
            appsCount={appsCount}
            gamesCount={gamesCount}
            initialSearch={initialSearch}
          />
        </div>
        <PublishedModal />
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps({ query }) {
  const search = query.search;
  console.log(search);

  const apps = await axiosQuery({ url: `/apps?type=apps&search=${search}` });
  const games = await axiosQuery({ url: `/apps?type=games&search=${search}` });
  console.log(apps.data.rows);

  // console.log(res.data);
  return {
    props: {
      apps: apps.data.rows,
      appsCount: apps.data.count,
      games: games.data.rows,
      gamesCount: games.data.count,
      initialSearch: search,
    }, // will be passed to the page component as props
  };
}
