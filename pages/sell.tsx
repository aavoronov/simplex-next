import React, { useEffect, useState } from "react";
import { MainLayout } from "../layouts/MainLayout";
import Link from "next/link";
import Pagination from "@/components/pagination";
import TopDownloads from "@/components/topDownloads";
import Breadcrumbs from "@/components/breadcrumbs";
import { AddPhoto } from "@/components/addItem/addPhoto";
import PublishedModal from "@/components/modals/published";
import { SetState, axiosQuery } from "@/utilities/utilities";
import { useAppDispatch } from "@/utilities/hooks";
import { toggle } from "@/store/notificationsSlice";
import { actionPublished } from "@/store/actions/modal";

const SellStart = ({ setStage }: { setStage: SetState<number> }) => {
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

const AppSelection = ({ setStage, setActiveApp }: { setStage: SetState<number>; setActiveApp: SetState<number> }) => {
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
          <div
            className='gaa-item d-flex'
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              setActiveApp(item.id);
              setStage(2);
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

interface Constraint {
  id: number;
  type: string;
  name: string;
  value: string[];
}

interface ProductWithCats {
  id: number;
  name: string;
  categories: {
    id: number;
    name: string;
    constraints: {
      id: number;
      type: string;
      name: string;
      value: string[];
    }[];
  }[];
}

const Property = ({
  constraint,
  properties,
  setProperties,
}: {
  constraint: Constraint;
  properties: Record<string, string | string[]>;
  setProperties: SetState<Record<string, string | number | boolean>>;
}) => {
  const thisPropertyName = constraint.name;
  const thisState = properties[thisPropertyName];

  useEffect(() => {
    return () => setProperties({});
  }, []);

  if (constraint.type === "oneOf") {
    useEffect(() => {
      setProperties((prev) => ({ ...prev, [`${thisPropertyName}`]: constraint.value[0] }));
    }, []);
    return (
      <div className='add-item-row'>
        <div className='add-item-row_name'>{constraint.name}</div>
        <div className='add-item-row_content'>
          <div className='radio-container d-flex'>
            {constraint.value.map((item) => (
              <label
                className={`btn radio-item d-flex align-items-center justify-content-center ${thisState === item ? " active" : ""}`}
                onClick={() => setProperties((prev) => ({ ...prev, [`${thisPropertyName}`]: item }))}>
                <input type='radio' name='server' />
                <div className='radio-name'>{item}</div>
              </label>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (constraint.type === "numeric") {
    useEffect(() => {
      setProperties((prev) => ({ ...prev, [`${thisPropertyName}`]: parseFloat(constraint.value[0]) }));
    }, []);
    return (
      <div className='add-item-row'>
        <div className='add-item-row_name'>
          {constraint.name}
          {` (от ${constraint.value[0]} до ${constraint.value[1]})`}
        </div>
        <div className='add-item-row_content'>
          <div className='field-container'>
            <input
              type='text'
              placeholder={`от ${constraint.value[0]} до ${constraint.value[1]}`}
              value={thisState || 0}
              onChange={(e) => setProperties((prev) => ({ ...prev, [`${thisPropertyName}`]: parseFloat(e.target.value) }))}
            />
          </div>
        </div>
      </div>
    );
  }

  if (constraint.type === "binary") {
    const [checked, setChecked] = useState(false);
    useEffect(() => {
      setProperties((prev) => ({ ...prev, [`${thisPropertyName}`]: checked }));
    }, [checked]);
    return (
      <div className='add-item-row'>
        <div className='add-item-row_content'>
          <div className='checkbox-container'>
            <label className='btn checkbox-item active d-flex align-items-center justify-content-center'>
              <input type='checkbox' name='mail_access' onClick={() => setChecked(!checked)} />
              <div className='checkbox-name'>{constraint.name}</div>
            </label>
          </div>
        </div>
      </div>
    );
  }
};

const ProductDetails = ({
  appId,
  imagesArray,
  setImagesArray,
  properties,
  setProperties,
}: {
  appId: number;
  imagesArray: any[];
  setImagesArray: SetState<any[]>;
  properties: Record<string, string | string[]>;
  setProperties: SetState<Record<string, string | number | boolean>>;
}) => {
  const [data, setData] = useState<ProductWithCats>(null);
  const [activeCategory, setActiveCategory] = useState<number>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [desc, setDesc] = useState("");
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   setProperties({});
  // }, [activeCategory]);

  const createProduct = async () => {
    try {
      if (!name) {
        throw new Error("Заполните название товара");
      }
      if (!imagesArray.length) {
        throw new Error("Заполните фото товара");
      }
      if (!desc) {
        throw new Error("Заполните описание товара");
      }
      const payload = new FormData();
      payload.append("name", name);
      payload.append("description", desc);
      payload.append("price", price.toString());
      payload.append("properties", JSON.stringify(properties));
      payload.append("categoryId", activeCategory.toString());
      imagesArray.forEach((item) => payload.append("files", item.file));
      const res = await axiosQuery({
        url: "/products",
        method: "post",
        payload: payload,
      });
      if (res.data.id) {
        dispatch(actionPublished());
      }
    } catch (e) {
      dispatch(toggle({ text: e.message, type: "error" }));
    }
  };

  const getCategories = async () => {
    const res = await axiosQuery({ url: `/apps/${appId}` });
    setData(res.data);
    setActiveCategory(res.data.categories[0].id);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className='add_item-page d-grid align-items-start'>
      <div className='item-category_list'>
        <div className='add_item-title'>Выберите рубрику</div>
        <div className='item-category_list-content'>
          <ul className='list-none p-0 m-0'>
            {data &&
              data.categories.map((value) => (
                <li
                  className={`d-flex align-items-center justify-content-between position-relative ${
                    value.id === activeCategory ? "active" : ""
                  }`}
                  key={value.id}
                  onClick={() => setActiveCategory(value.id)}>
                  {value.name}
                  <span className='check_indicator d-block position-relative'></span>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className='add_item-content'>
        <div className='add-item-row'>
          <div className='add-item-row_name' onClick={() => console.log(properties)}>
            Название товара
          </div>
          <div className='add-item-row_content'>
            <div className='field-container'>
              <input type='text' placeholder='Название товара' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          </div>
        </div>
        {data &&
          data.categories
            .find((item) => item.id === activeCategory)
            .constraints.map((constraint) => (
              <Property constraint={constraint} properties={properties} setProperties={setProperties} key={constraint.id} />
            ))}
        <div className='add-item-row add-item-row_photo'>
          <div className='add-item-row_name'>Фото {imagesArray.length}/10</div>
          <div className='add-item-row_content'>
            <AddPhoto imagesArray={imagesArray} setImagesArray={setImagesArray} />
          </div>
        </div>
        <div className='add-item-row'>
          <div className='add-item-row_name'>Описание товара</div>
          <div className='add-item-row_content'>
            <div className='field-container'>
              <textarea name='' id='' placeholder='Описание товара' value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
            </div>
          </div>
        </div>
        <div className='add-item-row add-item-price'>
          <div className='add-item-row_name'>Цена</div>
          <div className='add-item-row_content'>
            <div className='field-container position-relative'>
              <input
                type='text'
                placeholder='Введите сумму'
                value={price}
                onChange={(e) => setPrice(Number.isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value))}
              />
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
        {/* <div className='add-item-row'>
          <div className='add-item-row_name'>Данные для покупателя</div>
          <div className='add-item-row_content'>
            <div className='field-container'>
              <textarea name='' id='' placeholder='Покупатель получит после оплаты... (логин, пароль, инструкцию и т.д.)'></textarea>
            </div>
          </div>
        </div> */}
        <button className='btn btn_step w-100' onClick={createProduct}>
          Далее
        </button>
      </div>
    </div>
  );
};

export interface Image {
  file: File;
  preview?: string;
}

export default function Sell() {
  const [activeApp, setActiveApp] = useState(null);
  const [stage, setStage] = useState(0);
  const [imagesArray, setImagesArray] = useState<Image[]>([]);
  const [properties, setProperties] = useState<Record<string, string>>({});

  // const [dataForUser, setDataForUser] = useState('')

  return (
    <MainLayout title={"Продать"}>
      <div className='content-column'>
        <div className='container'>
          <Breadcrumbs currentCrumbs={["Продажа"]} />
          {stage === 0 && <SellStart setStage={setStage} />}
          {stage === 1 && <AppSelection setStage={setStage} setActiveApp={setActiveApp} />}
          {stage === 2 && (
            <ProductDetails
              appId={activeApp}
              imagesArray={imagesArray}
              setImagesArray={setImagesArray}
              properties={properties}
              setProperties={setProperties}
            />
          )}
        </div>
        <PublishedModal />
      </div>
    </MainLayout>
  );
}
