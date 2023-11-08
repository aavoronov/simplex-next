import React, { useRef, useState } from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { useWindowSize } from "../../hooks/useWindowSize";
import ScrollContainer from "react-indiana-drag-scroll";
import Link from "next/link";
import Breadcrumbs from "@/components/breadcrumbs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ReviewsCard from "@/components/reviews/reviewsCard";
import FriendInvite from "@/components/friendInvite";
import ProductItem from "@/components/productItem";
import { GetStaticPaths } from "next";
import { axiosQuery, getPreciseAverage, getPrettyAge } from "@/utilities/utilities";
import { actionPayment } from "@/store/actions/modal";
import { useAppDispatch } from "@/utilities/hooks";
import Payment from "@/components/modals/payment";

export interface Review {
  id: number;
  text: string;
  rating: number;
  createdAt: string;
  user: {
    id: number;
    name: string;
    profilePic?: string;
  };
}

interface DataType {
  product: {
    id: number;
    name: string;
    description: string;
    pics: string[];
    price: string;
    status: string;
    properties: Record<string, string>;
    createdAt: string;
    // updatedAt: string;
    // userId: number;
    // categoryId: number;
    user: {
      id: number;

      products: {
        id: number;
        name: string;
        reviews: Review[];
        pics: string[];
      }[];
    };
  };
  user: {
    id: number;
    name: string;
    isBlocked: boolean;
    createdAt: string;
    average: string;
    count: string;
    salesCount: string;
    profilePic?: string;
  };
}

export interface ProductWithReviews {
  id: number;
  name: string;
  reviews: Review[];
  pics: string[];
}

const ProductProperties = ({ properties }: { properties: Record<string, string> }) => {
  console.log(properties);
  const props = Object.entries(properties);
  console.log(props);
  return props.map((item, index) => {
    const booleanValue = (value) => (typeof value === "boolean" ? (value ? "Да" : "Нет") : value);
    return (
      <div className='product-chars-item' key={index}>
        <div className='product-chars-name'>{item[0]}</div>
        <div className='product-chars-value'>{booleanValue(item[1])}</div>
      </div>
    );
  });
};

export default function Product({ data }: { data: DataType }) {
  const { width } = useWindowSize();
  const dispatch = useAppDispatch();

  const productsWithReviews: ProductWithReviews[] = data.product.user.products;
  // const reviews = data.product.user.products;
  console.log(productsWithReviews);

  return (
    <MainLayout title={"Roblox"}>
      <div className='content-column product_sold-out'>
        <div className='container'>
          <Breadcrumbs currentCrumbs={[data.product.name]} />
          {data.product.status === "sold" && (
            <div className='sold-out-disclaimer d-flex align-items-center justify-content-center text-center w-100'>Продан</div>
          )}
          <div className='product-content d-grid justify-content-between'>
            <div className='product-gallery'>
              <Swiper spaceBetween={18} className='mySwiper'>
                {data.product.pics.map((item, index) => (
                  <SwiperSlide key={index}>
                    <img src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/products/${item}`} className='w-100 h-100' alt='' />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className='product-right'>
              <div className='item-tag gradient d-flex align-items-center justify-content-center position-absolute'>Летняя скидка</div>

              <div className='product-item-info d-flex flex-column'>
                <div className='product-item-price d-flex align-items-center'>
                  <div className={`current-price _sale`}>{data.product.price} ₽</div>
                  {/* <div className='discount gradient d-flex align-items-center justify-content-center'>-14%</div>
                  <div className='old-price'>429</div> */}
                </div>
                <div className='product-item-name two-lines'>{data.product.name}</div>
                <div className='item-raiting d-flex align-items-center'>
                  <div className='item-raiting_num'>{getPreciseAverage(data.user.average)}</div>
                  <div className='votes-count'>{data.user.count} отзывов</div>
                </div>
              </div>
              <button
                className='btn btn_buy gradient d-flex align-items-center justify-content-center w-100'
                onClick={() => dispatch(actionPayment())}>
                Купить
              </button>
              <div className='product-right-text'>После покупки будет доступен чат с продавцом</div>
              <Link className='product-right-link d-flex' href=''>
                Гарантия Simple
              </Link>
              {width > 1024 && <FriendInvite sum={parseFloat(data.product.price) / 10} />}
            </div>
            <div className='seller-block d-flex align-items-center justify-content-between'>
              <div className='seller-card d-flex align-items-center'>
                <div className='seller-ava _best position-relative'>
                  <div className='seller-ava-image w-100 h-100'>
                    {data.user.profilePic ? (
                      <img
                        className='w-100 h-100'
                        src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/users/${data.user.profilePic}`}
                        alt=''
                      />
                    ) : (
                      <img className='w-100 h-100' src='../images/anonymous.png' alt='' />
                    )}
                  </div>
                  {/* <div className='online-check position-absolute'></div> */}
                </div>
                <div className='seller-info position-relative'>
                  <div className='seller-name'>{data.user.name}</div>
                  <div className='seller-raiting'>
                    <div className='item-raiting d-flex align-items-center'>
                      <div className='item-raiting_num'>{getPreciseAverage(data.user.average)}</div>
                      <div className='votes-count'>{data.user.count} отзывов</div>
                    </div>
                  </div>
                  <div className='seller-status d-flex align-items-center'>
                    Статус: <b>Лучший продавец</b>
                  </div>
                </div>
              </div>
              <div className='seller-achievements'>
                {/* <div className='achiev-item d-flex align-items-center'>
                  <span className='achiev-icon'>
                    <img src='../images/achiv.svg' alt='' />
                  </span>
                  <span className='achiev-text'>Скорость ответа: не более 1 часа</span>
                </div> */}
                <div className='achiev-item d-flex align-items-center'>
                  <span className='achiev-icon'>
                    <img src='../images/achiv.svg' alt='' />
                  </span>
                  <span className='achiev-text'>На площадке: {getPrettyAge(data.user.createdAt)}</span>
                </div>
                <div className='achiev-item d-flex align-items-center'>
                  <span className='achiev-icon'>
                    <img src='../images/achiv.svg' alt='' />
                  </span>
                  <span className='achiev-text'>Кол-во продаж: {data.user.salesCount}</span>
                </div>
              </div>
            </div>
            <div className='product-info d-grid'>
              <div className='product-description w-100'>
                <div className='prod-page-title'>Описание</div>
                <div className='product-description-text'>
                  <p>{data.product.description}</p>
                </div>
              </div>
              <div className='product-chars'>
                <div className='prod-page-title'>Характеристики</div>
                <div className='product-chars-row d-flex justify-content-between'>
                  <ProductProperties properties={data.product.properties} />
                </div>
              </div>
            </div>

            <div className='shop-info'>
              <div className='pay-info'>
                <div className='pay-info-title'>Безопасная оплата</div>
                <div className='pay-info-values d-flex align-items-center'>
                  <div className='pay-icon'>
                    <img className='w-100 h-100' src='../images/pay1.png' alt='' />
                  </div>
                  <div className='pay-icon'>
                    <img className='w-100 h-100' src='../images/pay2.png' alt='' />
                  </div>
                  <div className='pay-icon'>
                    <img className='w-100 h-100' src='../images/pay3.png' alt='' />
                  </div>
                  <div className='pay-icon'>
                    <img className='w-100 h-100' src='../images/pay4.png' alt='' />
                  </div>
                  <div className='pay-icon'>
                    <img className='w-100 h-100' src='../images/pay5.png' alt='' />
                  </div>
                  <div className='pay-icon'>
                    <img className='w-100 h-100' src='../images/pay6.png' alt='' />
                  </div>
                </div>
              </div>
              <div className='warranty-info'>
                <ul className='list-none p-0 m-0'>
                  <li>Возврат средств, если вы не получили товар</li>
                  <li>Возврат средств, если товар не соответствует описанию</li>
                </ul>
              </div>
            </div>
            {width <= 1024 && <FriendInvite sum={parseFloat(data.product.price) / 10} />}
          </div>
          <div className='product-reviews'>
            <div className='product-reviews-head d-flex align-items-center justify-content-between'>
              <div className='prod-page-title'>Отзывы о {data.user.name}</div>
              {width >= 768 ? (
                <Link
                  className='btn_all-reviews d-flex position-relative'
                  href={{
                    pathname: `/reviews/[id]`,
                    query: {
                      id: data.user.id, // pass the id
                    },
                  }}>
                  Все отзывы ({data.user.count})
                </Link>
              ) : (
                <Link className='btn_all-reviews d-flex position-relative' href=''>
                  {data.user.count}
                </Link>
              )}
            </div>
            <div className='all-reviews-card d-flex align-items-center'>
              <div className='all-reviews_raiting'>{getPreciseAverage(data.user.average)}</div>
              <div className='all-reviews-info'>
                <div className='all-reviews-stars'>
                  <svg width='105' height='18' viewBox='0 0 105 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M16.8808 6.79616C16.7359 6.31971 16.4464 5.90407 16.0551 5.61072C15.6637 5.31737 15.1914 5.16188 14.708 5.16724H11.6127L10.6726 2.14064C10.5247 1.66423 10.2342 1.24862 9.84292 0.953755C9.45164 0.658889 8.9798 0.5 8.49545 0.5C8.0111 0.5 7.53926 0.658889 7.14798 0.953755C6.7567 1.24862 6.46619 1.66423 6.31835 2.14064L5.37822 5.16724H2.28295C1.80101 5.16795 1.33162 5.32595 0.941817 5.61867C0.552013 5.9114 0.261737 6.32387 0.112451 6.79718C-0.0368358 7.27049 -0.0374966 7.78042 0.110563 8.25414C0.258622 8.72785 0.547828 9.14113 0.936872 9.43493L3.45616 11.3375L2.49832 14.4015C2.34353 14.8767 2.34157 15.3908 2.49273 15.8673C2.64389 16.3437 2.94008 16.7569 3.33714 17.0453C3.7274 17.343 4.20033 17.5025 4.68545 17.5C5.17058 17.4975 5.64194 17.3331 6.0293 17.0314L8.49545 15.1566L10.9623 17.0292C11.3519 17.3252 11.8222 17.486 12.3058 17.4884C12.7894 17.4908 13.2613 17.3348 13.6536 17.0428C14.0459 16.7508 14.3385 16.3378 14.4892 15.8631C14.64 15.3885 14.6412 14.8768 14.4926 14.4015L13.5347 11.3375L16.0569 9.43493C16.4504 9.14482 16.743 8.73155 16.8913 8.2563C17.0397 7.78105 17.036 7.26907 16.8808 6.79616Z'
                      fill='url(#paint0_linear_243_7662)'
                    />
                    <path
                      d='M37.8808 6.79616C37.7359 6.31971 37.4464 5.90407 37.0551 5.61072C36.6637 5.31737 36.1914 5.16188 35.708 5.16724H32.6127L31.6726 2.14064C31.5247 1.66423 31.2342 1.24862 30.8429 0.953755C30.4516 0.658889 29.9798 0.5 29.4955 0.5C29.0111 0.5 28.5393 0.658889 28.148 0.953755C27.7567 1.24862 27.4662 1.66423 27.3183 2.14064L26.3782 5.16724H23.2829C22.801 5.16795 22.3316 5.32595 21.9418 5.61867C21.552 5.9114 21.2617 6.32387 21.1125 6.79718C20.9632 7.27049 20.9625 7.78042 21.1106 8.25414C21.2586 8.72785 21.5478 9.14113 21.9369 9.43493L24.4562 11.3375L23.4983 14.4015C23.3435 14.8767 23.3416 15.3908 23.4927 15.8673C23.6439 16.3437 23.9401 16.7569 24.3371 17.0453C24.7274 17.343 25.2003 17.5025 25.6855 17.5C26.1706 17.4975 26.6419 17.3331 27.0293 17.0314L29.4955 15.1566L31.9623 17.0292C32.3519 17.3252 32.8222 17.486 33.3058 17.4884C33.7894 17.4908 34.2613 17.3348 34.6536 17.0428C35.0459 16.7508 35.3385 16.3378 35.4892 15.8631C35.64 15.3885 35.6412 14.8768 35.4926 14.4015L34.5347 11.3375L37.0569 9.43493C37.4504 9.14482 37.743 8.73155 37.8913 8.2563C38.0397 7.78105 38.036 7.26907 37.8808 6.79616Z'
                      fill='url(#paint1_linear_243_7662)'
                    />
                    <path
                      d='M58.8808 6.79616C58.7359 6.31971 58.4464 5.90407 58.0551 5.61072C57.6637 5.31737 57.1914 5.16188 56.708 5.16724H53.6127L52.6726 2.14064C52.5247 1.66423 52.2342 1.24862 51.8429 0.953755C51.4516 0.658889 50.9798 0.5 50.4955 0.5C50.0111 0.5 49.5393 0.658889 49.148 0.953755C48.7567 1.24862 48.4662 1.66423 48.3183 2.14064L47.3782 5.16724H44.2829C43.801 5.16795 43.3316 5.32595 42.9418 5.61867C42.552 5.9114 42.2617 6.32387 42.1125 6.79718C41.9632 7.27049 41.9625 7.78042 42.1106 8.25414C42.2586 8.72785 42.5478 9.14113 42.9369 9.43493L45.4562 11.3375L44.4983 14.4015C44.3435 14.8767 44.3416 15.3908 44.4927 15.8673C44.6439 16.3437 44.9401 16.7569 45.3371 17.0453C45.7274 17.343 46.2003 17.5025 46.6855 17.5C47.1706 17.4975 47.6419 17.3331 48.0293 17.0314L50.4955 15.1566L52.9623 17.0292C53.3519 17.3252 53.8222 17.486 54.3058 17.4884C54.7894 17.4908 55.2613 17.3348 55.6536 17.0428C56.0459 16.7508 56.3385 16.3378 56.4892 15.8631C56.64 15.3885 56.6412 14.8768 56.4926 14.4015L55.5347 11.3375L58.0569 9.43493C58.4504 9.14482 58.743 8.73155 58.8913 8.2563C59.0397 7.78105 59.036 7.26907 58.8808 6.79616Z'
                      fill='url(#paint2_linear_243_7662)'
                    />
                    <path
                      d='M79.8808 6.79616C79.7359 6.31971 79.4464 5.90407 79.0551 5.61072C78.6637 5.31737 78.1914 5.16188 77.708 5.16724H74.6127L73.6726 2.14064C73.5247 1.66423 73.2342 1.24862 72.8429 0.953755C72.4516 0.658889 71.9798 0.5 71.4955 0.5C71.0111 0.5 70.5393 0.658889 70.148 0.953755C69.7567 1.24862 69.4662 1.66423 69.3183 2.14064L68.3782 5.16724H65.2829C64.801 5.16795 64.3316 5.32595 63.9418 5.61867C63.552 5.9114 63.2617 6.32387 63.1125 6.79718C62.9632 7.27049 62.9625 7.78042 63.1106 8.25414C63.2586 8.72785 63.5478 9.14113 63.9369 9.43493L66.4562 11.3375L65.4983 14.4015C65.3435 14.8767 65.3416 15.3908 65.4927 15.8673C65.6439 16.3437 65.9401 16.7569 66.3371 17.0453C66.7274 17.343 67.2003 17.5025 67.6855 17.5C68.1706 17.4975 68.6419 17.3331 69.0293 17.0314L71.4955 15.1566L73.9623 17.0292C74.3519 17.3252 74.8222 17.486 75.3058 17.4884C75.7894 17.4908 76.2613 17.3348 76.6536 17.0428C77.0459 16.7508 77.3385 16.3378 77.4892 15.8631C77.64 15.3885 77.6412 14.8768 77.4926 14.4015L76.5347 11.3375L79.0569 9.43493C79.4504 9.14482 79.743 8.73155 79.8913 8.2563C80.0397 7.78105 80.036 7.26907 79.8808 6.79616Z'
                      fill='url(#paint3_linear_243_7662)'
                    />
                    <path
                      d='M100.881 6.79616C100.736 6.31971 100.446 5.90407 100.055 5.61072C99.6637 5.31737 99.1914 5.16188 98.708 5.16724H95.6127L94.6726 2.14064C94.5247 1.66423 94.2342 1.24862 93.8429 0.953755C93.4516 0.658889 92.9798 0.5 92.4955 0.5C92.0111 0.5 91.5393 0.658889 91.148 0.953755C90.7567 1.24862 90.4662 1.66423 90.3183 2.14064L89.3782 5.16724H86.2829C85.801 5.16795 85.3316 5.32595 84.9418 5.61867C84.552 5.9114 84.2617 6.32387 84.1125 6.79718C83.9632 7.27049 83.9625 7.78042 84.1106 8.25414C84.2586 8.72785 84.5478 9.14113 84.9369 9.43493L87.4562 11.3375L86.4983 14.4015C86.3435 14.8767 86.3416 15.3908 86.4927 15.8673C86.6439 16.3437 86.9401 16.7569 87.3371 17.0453C87.7274 17.343 88.2003 17.5025 88.6855 17.5C89.1706 17.4975 89.6419 17.3331 90.0293 17.0314L92.4955 15.1566L94.9623 17.0292C95.3519 17.3252 95.8222 17.486 96.3058 17.4884C96.7894 17.4908 97.2613 17.3348 97.6536 17.0428C98.0459 16.7508 98.3385 16.3378 98.4892 15.8631C98.64 15.3885 98.6412 14.8768 98.4926 14.4015L97.5347 11.3375L100.057 9.43493C100.45 9.14482 100.743 8.73155 100.891 8.2563C101.04 7.78105 101.036 7.26907 100.881 6.79616Z'
                      fill='url(#paint4_linear_243_7662)'
                    />
                    <defs>
                      <linearGradient id='paint0_linear_243_7662' x1='8.5' y1='0.5' x2='20.3027' y2='3.2321' gradientUnits='userSpaceOnUse'>
                        <stop stopColor='#FE6546' />
                        <stop offset='1' stopColor='#FF9E0D' />
                      </linearGradient>
                      <linearGradient
                        id='paint1_linear_243_7662'
                        x1='29.5'
                        y1='0.5'
                        x2='41.3027'
                        y2='3.2321'
                        gradientUnits='userSpaceOnUse'>
                        <stop stopColor='#FE6546' />
                        <stop offset='1' stopColor='#FF9E0D' />
                      </linearGradient>
                      <linearGradient
                        id='paint2_linear_243_7662'
                        x1='50.5'
                        y1='0.5'
                        x2='62.3027'
                        y2='3.2321'
                        gradientUnits='userSpaceOnUse'>
                        <stop stopColor='#FE6546' />
                        <stop offset='1' stopColor='#FF9E0D' />
                      </linearGradient>
                      <linearGradient
                        id='paint3_linear_243_7662'
                        x1='71.5'
                        y1='0.5'
                        x2='83.3027'
                        y2='3.2321'
                        gradientUnits='userSpaceOnUse'>
                        <stop stopColor='#FE6546' />
                        <stop offset='1' stopColor='#FF9E0D' />
                      </linearGradient>
                      <linearGradient
                        id='paint4_linear_243_7662'
                        x1='92.5'
                        y1='0.5'
                        x2='104.303'
                        y2='3.2321'
                        gradientUnits='userSpaceOnUse'>
                        <stop stopColor='#FE6546' />
                        <stop offset='1' stopColor='#FF9E0D' />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className='all-reviews-count'>{data.user.count} отзывов</div>
              </div>
            </div>
            <div className='product-reviews-content'>
              <ScrollContainer className='reviewsContainer d-flex'>
                {productsWithReviews.map((item: ProductWithReviews) => (
                  <ReviewsCard product={item} key={item.id} />
                ))}
              </ScrollContainer>
            </div>
            <div className='product-reviews-desc'>Все отзывы оставлены после покупки товаров</div>
          </div>
          <div className='other-products'>
            <div className='prod-page-title'>Похожие товары</div>
            <div className='products-list d-grid'>
              {/* {products.map((value, i) => (
                <ProductItem key={i} />
              ))} */}
            </div>
          </div>
        </div>
      </div>
      <Payment product={data.product} />
    </MainLayout>
  );
}

export const getStaticPaths = (async () => {
  const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const paths = ids.map((item) => ({ params: { id: item.toString() } }));
  return {
    paths: paths,
    fallback: "blocking",
  };
}) satisfies GetStaticPaths;

export async function getStaticProps(context) {
  console.log(context.params.id); // return { title: 'Mortal Kombat' }
  const res = await axiosQuery({ url: `/products/${context.params.id}` });
  console.log(res.data);
  return {
    props: { data: res.data }, // will be passed to the page component as props
    revalidate: 60,
  };
}
