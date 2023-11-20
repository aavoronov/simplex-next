import React, { useEffect, useState } from "react";
import { MainLayout } from "../../layouts/MainLayout";
import Link from "next/link";
import ScrollContainer from "react-indiana-drag-scroll";
import Pagination from "@/components/pagination";
import Breadcrumbs, { crumbs } from "@/components/breadcrumbs";
import ProductItem from "@/components/productItem";
// import Filter from "@/components/modals/filter";
import { useAppDispatch, useAppSelector } from "@/utilities/hooks";
import { actionFilter } from "../../store/actions/modal";
import { GetRequestParams, SetState, axiosQuery } from "@/utilities/utilities";
import { GetStaticPaths } from "next";
import Modal from "react-modal";
import { Field, Form, Formik } from "formik";

const FilterParam = ({
  constraint,
  properties,
  setProperties,
}: {
  constraint: Constraint;
  properties: Record<string, string | string[]>;
  setProperties: SetState<Record<string, string | string[]>>;
}) => {
  const thisPropertyName = `properties.${constraint.name}`;
  const thisState = properties[thisPropertyName];

  console.log(properties);

  if (constraint.type === "oneOf") {
    return (
      <div className='modal-filter-item w-100'>
        <div className='filter-label'>{constraint.name}</div>
        <div className='form-row form-row_buttons d-grid align-items-center position-relative'>
          {constraint.value.map((value, i) => (
            <label
              onClick={() => setProperties((prev) => ({ ...prev, [`${thisPropertyName}`]: value }))}
              className={`btn_filter-item filter-radio ${
                thisState === value ? "active gradient" : ""
              } d-flex align-items-center justify-content-center text-center`}>
              <Field className='customInput d-none position-absolute' type='radio' name='method' value='' />
              {value}
            </label>
          ))}
        </div>
      </div>
    );
  }
  if (constraint.type === "numeric") {
    // const [from, to] = (thisState as string).split('-')
    const [from, setFrom] = useState(thisState ? (thisState as string).split("-")[0] || "" : null);
    const [to, setTo] = useState(thisState ? (thisState as string).split("-")[1] || "" : null);
    useEffect(() => {
      setFrom(thisState ? (thisState as string).split("-")[0] || "" : null);
      setTo(thisState ? (thisState as string).split("-")[1] || "" : null);
    }, [properties]);
    useEffect(() => {
      const newProp = (from || null) + "-" + (to || null);
      console.log(newProp);
      setProperties((prev) => ({ ...prev, [`${thisPropertyName}`]: newProp }));
    }, [from, to]);
    return (
      <div className='modal-filter-item w-100'>
        <div className='filter-label'>{constraint.name}</div>
        <div className='form-row form-row_range d-grid align-items-center position-relative'>
          <Field
            className='customInput w-100'
            type='text'
            placeholder={`От ${constraint.value[0]}`}
            value={from === "null" ? "" : from}
            onChange={(e) => setFrom(e.target.value)}
          />
          —
          <Field
            className='customInput w-100'
            type='text'
            placeholder={`До ${constraint.value[1]}`}
            value={to === "null" ? "" : to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
      </div>
    );
  }

  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(properties[thisPropertyName] === "true");
  }, [properties]);
  useEffect(() => {
    setProperties((prev) => ({ ...prev, [`${thisPropertyName}`]: checked.toString() }));
  }, [checked]);
  if (constraint.type === "binary") {
    return (
      <div className='settings-item d-flex align-items-start w-100'>
        <div className='setting-item-text'>
          <p className='m-0'>{constraint.name}</p>
        </div>
        <div className='toggle-notifications d-flex align-items-center ms-auto'>
          <label className='switch-item'>
            <Field className='customInput w-100' type='text' name='sale' value='' />
            <span className={`slider round ${checked ? "checked" : ""}`} onClick={() => setChecked(!checked)}></span>
          </label>
        </div>
      </div>
    );
  }
  return null;
};

function Filter({
  name,
  constraints,
  appId,
  categoryId,
  getProducts,
  setProducts,
  properties,
  setProperties,
}: {
  name: string;
  constraints: Constraint[];
  appId: number;
  categoryId: number;
  getProducts: (q: GetRequestParams) => void;
  setProducts: SetState<any>;
  properties: Record<string, string>;
  setProperties: SetState<Record<string, string>>;
}) {
  const filterModal = useAppSelector((state) => state.modalFilter);
  const dispatch = useAppDispatch();
  const filterModalAction = () => {
    dispatch(actionFilter());
    setProperties(initialProperties);
  };
  const initialProperties: Record<string, string> = Object.fromEntries(constraints.map((item) => [`properties.${item.name}`, null]));
  const [productCount, setProductCount] = useState(null);
  const [priceFrom, setPriceFrom] = useState<number>(null);
  const [priceTo, setPriceTo] = useState<number>(null);
  const [discount, setDiscount] = useState(false);
  const [withReviews, setWithReviews] = useState(false);

  useEffect(() => {
    setProperties(initialProperties);
  }, [constraints]);

  const getProductCount = async () => {
    const queryParams = new GetRequestParams();
    queryParams.addParam("categoryId", categoryId.toString());
    queryParams.addParam("price", `${priceFrom || null}-${priceTo || null}`);
    discount && queryParams.addParam("discount", "true");
    withReviews && queryParams.addParam("withReviews", "true");
    queryParams.addParamsFromObject(properties);

    const res = await axiosQuery({ url: `/products/count/${appId}?${queryParams.serialize()}` });
    setProductCount(res.data.count);
    console.log(queryParams.serialize());
  };

  const getFilteredProducts = async () => {
    const queryParams = new GetRequestParams();
    queryParams.addParam("categoryId", categoryId.toString());
    queryParams.addParam("price", `${priceFrom || null}-${priceTo || null}`);
    discount && queryParams.addParam("discount", "true");
    withReviews && queryParams.addParam("withReviews", "true");
    queryParams.addParamsFromObject(properties);

    setProducts([]);
    getProducts(queryParams);
    dispatch(actionFilter());
    setProperties(initialProperties);
  };

  useEffect(() => {
    getProductCount();
  }, [properties, categoryId, priceTo, priceFrom, discount, withReviews]);

  const resetEverything = () => {
    setProperties(initialProperties);
    setPriceTo(null);
    setPriceFrom(null);
    setDiscount(false);
    setWithReviews(false);
  };

  return (
    <>
      <Modal
        isOpen={filterModal}
        onRequestClose={filterModalAction}
        contentLabel=''
        className='allModal modal-filter d-flex flex-column align-items-center'>
        <button onClick={filterModalAction} className='btn btn_modal-close position-absolute'>
          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
            <g clipPath='url(#clip0_243_6669)'>
              <path
                d='M15.8045 0.195557C15.6795 0.0705765 15.51 0.000366211 15.3332 0.000366211C15.1564 0.000366211 14.9869 0.0705765 14.8619 0.195557L7.99986 7.05756L1.13786 0.195557C1.01284 0.0705765 0.8433 0.000366211 0.666524 0.000366211C0.489748 0.000366211 0.320209 0.0705765 0.195191 0.195557V0.195557C0.0702103 0.320576 0 0.490114 0 0.666891C0 0.843667 0.0702103 1.01321 0.195191 1.13822L7.05719 8.00022L0.195191 14.8622C0.0702103 14.9872 0 15.1568 0 15.3336C0 15.5103 0.0702103 15.6799 0.195191 15.8049V15.8049C0.320209 15.9299 0.489748 16.0001 0.666524 16.0001C0.8433 16.0001 1.01284 15.9299 1.13786 15.8049L7.99986 8.94289L14.8619 15.8049C14.9869 15.9299 15.1564 16.0001 15.3332 16.0001C15.51 16.0001 15.6795 15.9299 15.8045 15.8049C15.9295 15.6799 15.9997 15.5103 15.9997 15.3336C15.9997 15.1568 15.9295 14.9872 15.8045 14.8622L8.94252 8.00022L15.8045 1.13822C15.9295 1.01321 15.9997 0.843667 15.9997 0.666891C15.9997 0.490114 15.9295 0.320576 15.8045 0.195557V0.195557Z'
                fill='#18130C'
              />
            </g>
            <defs>
              <clipPath id='clip0_243_6669'>
                <rect width='16' height='16' fill='white' />
              </clipPath>
            </defs>
          </svg>
        </button>
        <Formik
          initialValues={{
            email: "",
            price_from: "",
            price_to: "",
            amount: "",
            sale: "",
            reviews: "",
          }}
          onSubmit={() => console.log(properties)}>
          {(props) => (
            <Form className='filter-form d-flex flex-column align-items-center w-100'>
              <div className='filter-header d-flex justify-content-center position-relative w-100'>
                <button className='btn btn_resset-filter position-absolute start-0 top-0' onClick={resetEverything}>
                  Сбросить
                </button>
                <div className='modal-title text-center'>{name}</div>
              </div>
              <div className='modal-content d-flex flex-column align-items-center w-100'>
                {constraints.map((item) => (
                  <FilterParam constraint={item} properties={properties} setProperties={setProperties} key={item.id} />
                ))}

                <div className='modal-filter-item w-100'>
                  <div className='filter-label'>Цена</div>
                  <div className='form-row form-row_range form-row_price d-grid align-items-center position-relative'>
                    <Field
                      className='customInput w-100'
                      type='text'
                      name='price_from'
                      placeholder='От'
                      value={priceFrom ? priceFrom : ""}
                      onChange={(e) => setPriceFrom(e.target.value)}
                    />
                    —
                    <Field
                      className='customInput w-100'
                      type='text'
                      name='price_to'
                      placeholder='До'
                      value={priceTo ? priceTo : ""}
                      onChange={(e) => setPriceTo(e.target.value)}
                    />
                  </div>
                </div>
                <div className='modal-filter-item w-100'>
                  <div className='filter-label'>Особенности</div>
                  <div className='form-row align-items-center position-relative'>
                    <div className='settings-item d-flex align-items-start w-100'>
                      <div className='settings-item_icon d-flex'>
                        <img className='w-100 h-100' src='../images/s3.svg' alt='' />
                      </div>
                      <div className='setting-item-text'>
                        <p className='m-0'>По скидке</p>
                      </div>
                      <div className='toggle-notifications d-flex align-items-center ms-auto'>
                        <label className='switch-item'>
                          <Field className='customInput w-100' type='text' name='sale' value='' />
                          <span className={`slider round ${discount ? "checked" : ""}`} onClick={() => setDiscount(!discount)}></span>
                        </label>
                      </div>
                    </div>
                    <div className='settings-item d-flex align-items-start w-100'>
                      <div className='settings-item_icon d-flex'>
                        <img className='w-100 h-100' src='../images/s3.svg' alt='' />
                      </div>
                      <div className='setting-item-text'>
                        <p className='m-0'>С отзывами</p>
                      </div>
                      <div className='toggle-notifications d-flex align-items-center ms-auto'>
                        <label className='switch-item'>
                          <Field className='customInput w-100' type='text' name='reviews' value='' />
                          <span
                            className={`slider round ${withReviews ? "checked" : ""}`}
                            onClick={() => setWithReviews(!withReviews)}></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='filter-footer d-flex flex-column'>
                {productCount !== null && (
                  <button
                    className='btn btn_submit gradient d-flex align-items-center justify-content-center mx-auto'
                    type='submit'
                    onClick={getFilteredProducts}
                    style={productCount === 0 ? { opacity: 0.5, cursor: "default" } : {}}
                    disabled={productCount === 0}>
                    {productCount === 0 ? "0 результатов" : `Показать ${productCount} товаров`}
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}

interface Constraint {
  id: number;
  type: "binary" | "numeric" | "oneOf";
  name: string;
  value: string[];
}

interface Category {
  id: number;
  name: string;
  globalCategoryId: number;
  constraints: Constraint[];
}

export default function Catalog({ app }: { app: number }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category>(null);
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [endReached, setEndReached] = useState(false);
  const [properties, setProperties] = useState<Record<string, string>>({});

  const [data, setData] = useState(null);

  // useEffect(() => {

  // }, [properties])
  const dispatch = useAppDispatch();

  const getData = async (id: number) => {
    const res = await axiosQuery({ url: `/apps/${id}` });
    setData({ pagePic: res.data.pagePic, isGame: res.data.isGame, name: res.data.name });
    console.log(res.data);
    setCategories(res.data.categories);
    setActiveCategory(res.data.categories[0]);
    return res.data.categories[0].id;
  };

  // queryParams.addParam("categoryId", "1");
  const getProducts = async (queryParams: GetRequestParams) => {
    // const paramsArr = Object.entries(properties);
    const res = await axiosQuery({ url: `/products/app/${app}?${queryParams.serialize()}` });
    setProducts((prev) => [...prev, ...res.data]);
    setPage((prev) => prev + 1);
    if (!res.data.length) {
      setEndReached(true);
    }
  };

  const handleCategoryChange = async (categoryId: number) => {
    const queryParams = new GetRequestParams();
    queryParams.addParam("page", "1");
    queryParams.addParam("categoryId", categoryId.toString());
    setProducts([]);
    await getProducts(queryParams);
    setPage(2);
  };

  useEffect(() => {
    (async () => {
      const categoryId = await getData(app);
      // if (!!activeCategory?.id) {
      const queryParams = new GetRequestParams();
      queryParams.addParam("page", page.toString());
      queryParams.addParam("categoryId", categoryId.toString());
      getProducts(queryParams);
    })();
  }, []);

  return (
    <MainLayout title={"Roblox"}>
      <>
        <div className='content-column'>
          <div className='container'>
            {data?.name && <Breadcrumbs currentCrumbs={[data.isGame ? crumbs.games : crumbs.apps, data.name]} />}
            <div className='catalog-banner'>
              {!!data && <img src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/apps/${data.pagePic}`} className='w-100 h-100' alt='' />}
            </div>

            <div className='catalog-menu'>
              <ScrollContainer className='catalog-menu_list d-flex align-items-center'>
                {categories.map((item: Category) => (
                  <Link
                    key={item.id}
                    id={`${item.id}`}
                    href='/'
                    onClick={(e) => {
                      e.preventDefault();
                      if (activeCategory.id === item.id) {
                        dispatch(actionFilter());
                      } else {
                        setActiveCategory(item);
                        handleCategoryChange(item.id);
                      }
                    }}
                    className={`btn catalog-menu-item d-flex align-items-center ${activeCategory.id === item.id ? "active gradient" : ""}`}>
                    <div className='catalog-menu-item_name'>{item.name}</div>
                    {activeCategory.id === item.id && (
                      <div className='filter-icon'>
                        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='17' fill='none'>
                          <g fill='#fff' clipPath='url(#a)'>
                            <path d='M.667 3.667H2.49a2.485 2.485 0 0 0 4.796 0h8.046a.667.667 0 1 0 0-1.333H7.287a2.485 2.485 0 0 0-4.796 0H.667a.667.667 0 1 0 0 1.333Zm4.222-1.833a1.167 1.167 0 1 1 0 2.333 1.167 1.167 0 0 1 0-2.333ZM15.333 7.833H13.51a2.484 2.484 0 0 0-4.796 0H.667a.667.667 0 0 0 0 1.333h8.046a2.485 2.485 0 0 0 4.796 0h1.824a.667.667 0 1 0 0-1.333Zm-4.222 1.833a1.166 1.166 0 1 1 0-2.333 1.166 1.166 0 0 1 0 2.333ZM15.333 13.334H7.287a2.485 2.485 0 0 0-4.796 0H.667a.666.666 0 1 0 0 1.333H2.49a2.485 2.485 0 0 0 4.796 0h8.046a.667.667 0 1 0 0-1.333ZM4.89 15.167a1.167 1.167 0 1 1 0-2.333 1.167 1.167 0 0 1 0 2.333Z' />
                          </g>
                          <defs>
                            <clipPath id='a'>
                              <path fill='#fff' d='M0 .5h16v16H0z' />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    )}
                  </Link>
                ))}
              </ScrollContainer>
            </div>

            <div className='products-content'>
              <div className='products-list d-grid'>
                {products.map((value, i) => (
                  <ProductItem key={i} item={value} />
                ))}
              </div>
              {!endReached && (
                <Pagination
                  onClick={() => {
                    const queryParams = new GetRequestParams();
                    queryParams.addParam("page", page.toString());
                    queryParams.addParam("categoryId", activeCategory.id.toString());
                    getProducts(queryParams);
                  }}
                />
              )}
            </div>
          </div>
        </div>
        {activeCategory && (
          <Filter
            name={activeCategory.name}
            constraints={activeCategory.constraints}
            appId={app}
            categoryId={activeCategory.id}
            getProducts={getProducts}
            setProducts={setProducts}
            properties={properties}
            setProperties={setProperties}
          />
        )}
      </>
    </MainLayout>
  );
}

export const getStaticPaths = (() => {
  const paths = new Array(11).fill(0).map((i, index) => {
    return {
      params: {
        app: index.toString(),
      },
    };
  });
  console.log(paths);
  return {
    paths,
    fallback: "blocking",
  };
}) satisfies GetStaticPaths;

export async function getStaticProps(context) {
  console.log(context.params.app); // return { title: 'Mortal Kombat' }
  // const res = await axiosQuery({ url: `/apps?type=${context.params.globalCategory}&page=1` });
  return {
    // props: { initialApps: res.data, type: context.params.type }, // will be passed to the page component as props
    props: { app: context.params.app },
    revalidate: 60,
  };
}
