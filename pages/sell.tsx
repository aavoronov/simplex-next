import React, { useEffect, useState } from "react";
import { MainLayout } from "../layouts/MainLayout";
import Link from "next/link";
import Pagination from "@/components/pagination";
import TopDownloads from "@/components/topDownloads";
import Breadcrumbs from "@/components/breadcrumbs";
import { AddPhoto } from "@/components/addItem/addPhoto";
import PublishedModal from "@/components/modals/published";
import { SetState, axiosQuery } from "@/utilities/utilities";

const SellStart = ({ stage, setStage }: { stage: number; setStage: SetState<number> }) => {
  return (
    <div className='sell-start d-grid'>
      <div className='sell-start_content d-flex flex-column justify-content-between w-100'>
        <div className='sell-start_info'>
          <div className='sell-title'>Что нужно знать</div>
          <div className='sell-start_info-row'>
            <div className='sell-start_info-item d-flex'>
              <div className='sell-start_info-icon'>
                <img src='../images/i1.svg' alt='' />
              </div>
              <div className='sell-start_info-text'>Заполнить информацию о товаре и выставить его на продажу</div>
            </div>
          </div>
          <div className='sell-start_info-row'>
            <div className='sell-start-text'>Продажа</div>
            <div className='sell-start_info-item d-flex'>
              <div className='sell-start_info-icon'>
                <img src='../images/i2.svg' alt='' />
              </div>
              <div className='sell-start_info-text'>Выполнить свои обязательства по передаче товара покупателю</div>
            </div>
            <div className='sell-start_info-item d-flex'>
              <div className='sell-start_info-icon'>
                <img src='../images/i3.svg' alt='' />
              </div>
              <div className='sell-start_info-text'>Вы получите оплату после того, как покупатель подтвердит получение товара</div>
            </div>
          </div>
          <div className='sell-start_info-row'>
            <div className='sell-start-text'>Сервисные сборы 20%</div>
            <button
              className='btn btn_start gradient_green d-flex align-items-center justify-content-center w-100'
              onClick={() => setStage(1)}>
              Начать продажу
            </button>
            <div className='sell-start-text text-center'>Нажимая «Начать продажу», Вы принимаете Условия продажи</div>
          </div>
        </div>
        <div className='ban_rules w-100'>
          <div className='sell-title'>Запрещено</div>
          <div className='ban_rules-list'>
            <ul className='list-none p-0 m-0'>
              <li className='position-relative'>Указывать недостоверную информацию о товаре</li>
              <li className='position-relative'>Мошенничество в любом виде</li>
              <li className='position-relative'>Общение с покупателем за пределами Playerok</li>
              <li className='position-relative'>Продажа запрещенных товаров, в том числе полученных нелегальным путем</li>
            </ul>
          </div>
          <div className='ban_rules-text'>
            За нарушение условий продажи средства будут возвращены покупателю, Ваш товар будет снят с продажи и Ваша учетная запись будет
            заблокирована
          </div>
        </div>
      </div>
      <div className='sell-start_banner gradient_green w-100 position-relative'>
        <div className='sell-start_banner-text w-100 mx-auto text-center'>
          Вы также можете зарабатывать приглашая своих друзей на наш сайт
        </div>
        <Link className='btn gradient d-flex align-items-center justify-content-center mx-auto' href=''>
          Подробнее
        </Link>

        <img className='s_dec1 position-absolute' src='../images/s_dec1.svg' alt='' />
        <img className='s_dec2 position-absolute' src='../images/s_dec2.svg' alt='' />
        <img className='s_dec3 position-absolute' src='../images/s_dec3.png' alt='' />
        <img className='s_dec5 position-absolute' src='../images/s_dec5.svg' alt='' />
        <div className='s_dec-smile position-absolute'>
          <img className='s_dec4' src='../images/s_dec4.svg' alt='' />
          <img className='s_star1 position-absolute' src='../images/s_star1.svg' alt='' />
          <img className='s_star2 position-absolute' src='../images/s_star2.svg' alt='' />
          <img className='s_star3 position-absolute' src='../images/s_star3.svg' alt='' />
          <img className='s_star4 position-absolute' src='../images/s_star4.svg' alt='' />
          <img className='s_star5 position-absolute' src='../images/s_star5.svg' alt='' />
          <img className='s_star6 position-absolute' src='../images/s_star6.svg' alt='' />
        </div>
      </div>
    </div>
  );
};

const AppSelection = ({ stage, setStage, setActiveApp }: { stage: number; setStage: SetState<number>; setActiveApp: SetState<number> }) => {
  interface App {
    id: number;
    miniPic: string;
    name: string;
  }

  const [activeCategory, setActiveCategory] = useState("games");

  const [apps, setApps] = useState<App[]>([]);
  const [appEndReached, setAppEndReached] = useState(false);
  const [appPage, setAppPage] = useState(1);
  const [appCount, setAppCount] = useState(0);

  const [games, setGames] = useState<App[]>([]);
  const [gameEndReached, setGameEndReached] = useState(false);
  const [gamePage, setGamePage] = useState(1);
  const [gameCount, setGameCount] = useState(0);

  const [search, setSearch] = useState("");

  const getApps = async (page) => {
    const res = await axiosQuery({ url: `/apps?type=apps&page=${page}&search=${search}` });
    setApps((prev) => [...prev, ...res.data.rows]);
    if (!res.data.rows.length) {
      setAppEndReached(true);
    }
    setAppCount(res.data.count);
    setAppPage((prev) => prev + 1);
  };

  const getGames = async (page) => {
    const res = await axiosQuery({ url: `/apps?type=games&page=${page}&search=${search}` });
    setGames((prev) => [...prev, ...res.data.rows]);
    if (!res.data.rows.length) {
      setGameEndReached(true);
    }
    setGameCount(res.data.count);
    setGamePage((prev) => prev + 1);
  };
  const displayEntities = activeCategory === "games" ? games : apps;
  const getMore = () => (activeCategory === "games" ? getGames(gamePage) : getApps(appPage));
  const endReached = activeCategory === "games" ? gameEndReached : appEndReached;

  // useEffect(() => {
  //   getApps(1);
  //   getGames(1);
  // }, []);

  useEffect(() => {
    setApps([]);
    setGames([]);
    setAppPage(1);
    setGamePage(1);
    getApps(1);
    getGames(1);
  }, [search]);

  return (
    <>
      <div className='sell_search gradient'>
        <form className='position-relative w-100' action=''>
          <input
            className='search-input w-100'
            type='text'
            placeholder='Поиск игр и приложений'
            onChange={(e) => setSearch(e.target.value)}
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
          <Link className='gaa-item d-flex' href='/catalog/'>
            <div className='gaa-item_icon'>
              <img src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/apps/${item.miniPic}`} className='w-100 h-100' alt='' />
            </div>
            <div className='gaa-item-info'>
              <p className='gaa-item_name two-lines'>{item.name}</p>
            </div>
          </Link>
        ))}
      </div>
      {!endReached && <Pagination onClick={getMore} />}
    </>
  );
};

const ProductDetails = ({ stage, setStage }: { stage: number; setStage: SetState<number> }) => {
  return (
    <div className='add_item-page d-grid align-items-start'>
      <div className='item-category_list'>
        <div className='add_item-title'>Выберите рубрику</div>
        <div className='item-category_list-content'>
          <ul className='list-none p-0 m-0'>
            {cats.map((value, i) => (
              <li className={`d-flex align-items-center justify-content-between position-relative ${i == 0 ? "active" : ""}`} key={i}>
                {value}
                <span className='check_indicator d-block position-relative'></span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='add_item-content'>
        <div className='add-item-row'>
          <div className='add-item-row_name'>Название товара</div>
          <div className='add-item-row_content'>
            <div className='field-container'>
              <input type='text' placeholder='Название товара' />
            </div>
          </div>
        </div>
        <div className='add-item-row add-item-row_ar'>
          <div className='add-item-row_name'>AR</div>
          <div className='add-item-row_content'>
            <div className='field-container'>
              <input type='text' placeholder='от 1 до 60' />
            </div>
          </div>
        </div>
        <div className='add-item-row'>
          <div className='add-item-row_name'>Сервер</div>
          <div className='add-item-row_content'>
            <div className='radio-container d-flex'>
              <label className='btn radio-item active d-flex align-items-center justify-content-center'>
                <input type='radio' name='server' />
                <div className='radio-name'>Европа</div>
              </label>
              <label className='btn radio-item d-flex align-items-center justify-content-center'>
                <input type='radio' name='server' />
                <div className='radio-name'>Америка</div>
              </label>
              <label className='btn radio-item d-flex align-items-center justify-content-center'>
                <input type='radio' name='server' />
                <div className='radio-name'>Азия</div>
              </label>
              <label className='btn radio-item d-flex align-items-center justify-content-center'>
                <input type='radio' name='server' />
                <div className='radio-name'>Другой</div>
              </label>
            </div>
          </div>
        </div>
        <div className='add-item-row'>
          <div className='add-item-row_content'>
            <div className='checkbox-container'>
              <label className='btn checkbox-item active d-flex align-items-center justify-content-center'>
                <input type='checkbox' name='mail_access' />
                <div className='checkbox-name'>Доступ к почте</div>
              </label>
              <label className='btn checkbox-item active d-flex align-items-center justify-content-center'>
                <input type='checkbox' name='rebinding' />
                <div className='checkbox-name'>Перепривязка</div>
              </label>
            </div>
          </div>
        </div>
        <div className='add-item-row add-item-row_photo'>
          <div className='add-item-row_name'>Фото 2/10</div>
          <div className='add-item-row_content'>
            <AddPhoto />
          </div>
        </div>
        <div className='add-item-row'>
          <div className='add-item-row_name'>Описание товара</div>
          <div className='add-item-row_content'>
            <div className='field-container'>
              <textarea name='' id='' placeholder='Описание товара'></textarea>
            </div>
          </div>
        </div>
        <div className='add-item-row add-item-price'>
          <div className='add-item-row_name'>Цена</div>
          <div className='add-item-row_content'>
            <div className='field-container position-relative'>
              <input type='text' placeholder='Введите сумму' />
            </div>
            <div className='field-info'>
              <div className='field-info-item d-flex justify-content-between'>
                <div className='field-info-item_column'>Сервисные сборы</div>
                <div className='field-info-item_column'>-10%</div>
              </div>
              <div className='field-info-item d-flex justify-content-between'>
                <div className='field-info-item_column'>Минимальная сумма</div>
                <div className='field-info-item_column'>100₽</div>
              </div>
            </div>
          </div>
        </div>
        <div className='add-item-row'>
          <div className='add-item-row_name'>Данные для покупателя</div>
          <div className='add-item-row_content'>
            <div className='field-container'>
              <textarea name='' id='' placeholder='Покупатель получит после оплаты... (логин, пароль, инструкцию и т.д.)'></textarea>
            </div>
          </div>
        </div>
        <button className='btn btn_step w-100'>Далее</button>
      </div>
    </div>
  );
};

export default function Sell() {
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

  // const games = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

  const [activeApp, setActiveApp] = useState(null);
  const [stage, setStage] = useState(0);

  return (
    <MainLayout title={"Продать"}>
      <div className='content-column'>
        <div className='container'>
          <Breadcrumbs />
          {stage === 0 && <SellStart stage={stage} setStage={setStage} />}
          {stage === 1 && <AppSelection stage={stage} setStage={setStage} setActiveApp={setActiveApp} />}
        </div>

        <PublishedModal />
      </div>
    </MainLayout>
  );
}
