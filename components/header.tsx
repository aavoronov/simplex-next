import React, { useEffect, useState } from "react";
import { useWindowSize } from "../hooks/useWindowSize";
import Link from "next/link";
import Registration from "./modals/registration/registration";
import Login from "./modals/login";
import { getCookie } from "cookies-next";
import { useAppSelector } from "@/utilities/hooks";
import { useRouter } from "next/router";

export default function Header() {
  const { width } = useWindowSize();
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleKeyPress = async (event) => {
    console.log(event.keyCode);
    if (event.keyCode !== 13) {
      // setSearchValue(event.target.value);
      return;
    }

    if (searchValue) {
      event.preventDefault();
      await router.push({
        pathname: `/search`,
        query: {
          search: searchValue, // pass the id
        },
      });
    }
  };

  const { name, role, profilePic } = useAppSelector((state) => state.user);

  return (
    <>
      <div className='main-header'>
        <div className='container container-max d-flex align-items-center'>
          <Link className='header-logo' href='/'>
            <img src='../images/logo.svg' alt='' />
          </Link>
          <button
            className='btn btn_back gradient d-flex align-items-center justify-content-center'
            onClick={() => window && window.history.back()}>
            <span className='btn_back-icon'>
              <img src='../images/back.svg' alt='' />
            </span>
            Назад
          </button>
          {/* <button
            onClick={async (e) => {
              e.preventDefault();
              await router.push({
                pathname: `/search`,
                query: {
                  search: searchValue, // pass the id
                },
              });
            }}>
            test
          </button> */}
          <div className='header-search gradient w-100'>
            <form className='position-relative w-100' action=''>
              <input
                className='search-input w-100'
                type='text'
                placeholder='Поиск игр и приложений'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={async (e) => await handleKeyPress(e)}
              />
              <Link
                href={{
                  pathname: `/search`,
                  query: {
                    search: searchValue, // pass the id
                  },
                }}
                className='btn_search d-flex align-items-center justify-content-start position-absolute p-0'>
                <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'>
                  <path
                    stroke='#929292'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M10 15.974c3.314 0 6-2.682 6-5.99a5.995 5.995 0 0 0-6-5.99c-3.314 0-6 2.681-6 5.99a5.995 5.995 0 0 0 6 5.99ZM20 19.967l-5-5.99'
                  />
                </svg>
              </Link>
            </form>
          </div>
          <div className='user-controls d-flex align-items-center justify-content-end'>
            {role ? (
              <div className='user-profile d-flex align-items-center justify-content-end'>
                <div className='user-profile-info text-end'>
                  <div className='user-profile-info-name'>{name} | Баланс</div>
                  <div className='user-profile-balance'>0</div>
                  <button className='btn user-profile-balance_add gradient_green d-flex align-items-center justify-content-between ms-auto'>
                    Пополнить <span>+</span>
                  </button>
                </div>
                <Link href='/profile' className='user-profile-ava d-block'>
                  {profilePic ? (
                    <img className='w-100 h-100' src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/users/${profilePic}`} alt='' />
                  ) : (
                    <img className='w-100 h-100' src='../images/anonymous.png' alt='' />
                  )}
                </Link>
              </div>
            ) : (
              <>
                <Login />
                <Registration />
              </>
            )}
          </div>
        </div>
      </div>
      {width <= 1025 && (
        <div className='mobile_navigation d-flex justify-content-between align-items-end position-fixed bottom-0 start-0 end-0'>
          <Link className='mobile_navigation-item active d-flex flex-column align-items-center' href=''>
            <span className='mobile_navigation-icon d-flex align-items-center justify-content-center'>
              <svg xmlns='http://www.w3.org/2000/svg' width='26' height='25' fill='none'>
                <g clipPath='url(#a)'>
                  <path
                    fill='#18130C'
                    d='M25.729 9.16a3.312 3.312 0 0 0-3.195-2.318h-4.55L16.6 2.534a3.362 3.362 0 0 0-6.402 0L8.816 6.842h-4.55a3.361 3.361 0 0 0-1.98 6.075l3.704 2.708-1.408 4.362a3.31 3.31 0 0 0 1.233 3.763 3.309 3.309 0 0 0 3.959-.02l3.626-2.668 3.627 2.665a3.362 3.362 0 0 0 5.19-3.74l-1.408-4.362 3.708-2.708a3.31 3.31 0 0 0 1.212-3.756Zm-2.44 2.075-4.317 3.155a1.041 1.041 0 0 0-.378 1.162l1.641 5.073a1.278 1.278 0 0 1-1.974 1.422l-4.245-3.125a1.042 1.042 0 0 0-1.233 0l-4.245 3.125a1.278 1.278 0 0 1-1.979-1.422l1.646-5.073a1.042 1.042 0 0 0-.377-1.162L3.51 11.235a1.278 1.278 0 0 1 .754-2.31h5.313a1.042 1.042 0 0 0 .992-.723l1.614-5.032a1.278 1.278 0 0 1 2.433 0l1.615 5.032a1.042 1.042 0 0 0 .992.723h5.312a1.279 1.279 0 0 1 .754 2.31h-.002Z'
                  />
                </g>
                <defs>
                  <clipPath id='a'>
                    <path fill='#fff' d='M.9 0h25v25H.9z' />
                  </clipPath>
                </defs>
              </svg>
            </span>
            <span className='mobile_navigation-name'>Главная</span>
          </Link>
          <Link className='mobile_navigation-item d-flex flex-column align-items-center' href=''>
            <span className='mobile_navigation-icon d-flex align-items-center justify-content-center'>
              <svg xmlns='http://www.w3.org/2000/svg' width='25' height='25' viewBox='0 0 25 25' fill='none'>
                <g clipPath='url(#clip0_684_74)'>
                  <path
                    d='M12.5 0C10.0277 0 7.61099 0.733112 5.55538 2.10663C3.49976 3.48015 1.89761 5.43238 0.951511 7.71646C0.00541608 10.0005 -0.242126 12.5139 0.24019 14.9386C0.722505 17.3634 1.91301 19.5907 3.66117 21.3388C5.40933 23.087 7.63661 24.2775 10.0614 24.7598C12.4861 25.2421 14.9995 24.9946 17.2835 24.0485C19.5676 23.1024 21.5199 21.5002 22.8934 19.4446C24.2669 17.389 25 14.9723 25 12.5C24.9964 9.18589 23.6783 6.00855 21.3349 3.66512C18.9915 1.3217 15.8141 0.00358446 12.5 0V0ZM12.5 22.9167C10.4398 22.9167 8.42583 22.3057 6.71282 21.1611C4.9998 20.0165 3.66467 18.3897 2.87626 16.4863C2.08785 14.5829 1.88156 12.4884 2.28349 10.4678C2.68542 8.44718 3.67751 6.5911 5.13431 5.1343C6.59111 3.67751 8.44718 2.68542 10.4678 2.28349C12.4885 1.88156 14.5829 2.08784 16.4863 2.87626C18.3897 3.66467 20.0165 4.9998 21.1611 6.71281C22.3057 8.42582 22.9167 10.4398 22.9167 12.5C22.9136 15.2617 21.8152 17.9095 19.8624 19.8623C17.9095 21.8152 15.2617 22.9136 12.5 22.9167ZM17.7083 12.5C17.7083 12.7763 17.5986 13.0412 17.4032 13.2366C17.2079 13.4319 16.9429 13.5417 16.6667 13.5417H13.5417V16.6667C13.5417 16.9429 13.4319 17.2079 13.2366 17.4032C13.0412 17.5986 12.7763 17.7083 12.5 17.7083C12.2237 17.7083 11.9588 17.5986 11.7634 17.4032C11.5681 17.2079 11.4583 16.9429 11.4583 16.6667V13.5417H8.33334C8.05707 13.5417 7.79212 13.4319 7.59677 13.2366C7.40142 13.0412 7.29167 12.7763 7.29167 12.5C7.29167 12.2237 7.40142 11.9588 7.59677 11.7634C7.79212 11.5681 8.05707 11.4583 8.33334 11.4583H11.4583V8.33333C11.4583 8.05707 11.5681 7.79211 11.7634 7.59676C11.9588 7.40141 12.2237 7.29167 12.5 7.29167C12.7763 7.29167 13.0412 7.40141 13.2366 7.59676C13.4319 7.79211 13.5417 8.05707 13.5417 8.33333V11.4583H16.6667C16.9429 11.4583 17.2079 11.5681 17.4032 11.7634C17.5986 11.9588 17.7083 12.2237 17.7083 12.5Z'
                    fill='#18130C'
                  />
                </g>
                <defs>
                  <clipPath id='clip0_684_74'>
                    <rect width='25' height='25' fill='white' />
                  </clipPath>
                </defs>
              </svg>
            </span>
            <span className='mobile_navigation-name'>Продать</span>
          </Link>
          <Link className='mobile_navigation-item d-flex flex-column align-items-center' href=''>
            <span className='mobile_navigation-icon d-flex align-items-center justify-content-center'>
              <svg xmlns='http://www.w3.org/2000/svg' width='25' height='25' viewBox='0 0 25 25' fill='none'>
                <g clipPath='url(#clip0_684_78)'>
                  <path
                    d='M24.9997 11.7158C24.8491 9.27834 23.9884 6.93822 22.5239 4.98397C21.0593 3.02971 19.0549 1.54675 16.7577 0.717894C14.4606 -0.110958 11.9711 -0.249462 9.59613 0.319457C7.22119 0.888375 5.06465 2.13985 3.39237 3.91958C1.72009 5.69932 0.60517 7.92953 0.185067 10.3353C-0.235036 12.741 0.0580405 15.2171 1.02817 17.4582C1.99829 19.6994 3.60305 21.6077 5.64461 22.9478C7.68618 24.288 10.0753 25.0014 12.5174 25.0002H19.7914C21.1723 24.9988 22.4963 24.4496 23.4727 23.4732C24.4492 22.4967 24.9983 21.1728 24.9997 19.7919V11.7158ZM22.9164 19.7919C22.9164 20.6207 22.5871 21.4155 22.0011 22.0016C21.415 22.5876 20.6202 22.9169 19.7914 22.9169H12.5174C11.0476 22.9162 9.59434 22.6057 8.25252 22.0057C6.9107 21.4057 5.71041 20.5296 4.72992 19.4346C3.74468 18.3401 3.00485 17.0476 2.56002 15.6437C2.11519 14.2399 1.97565 12.7572 2.15075 11.295C2.42725 8.98867 3.46345 6.83997 5.096 5.18761C6.72856 3.53525 8.86461 2.47322 11.1674 2.16894C11.6166 2.11264 12.0689 2.08411 12.5216 2.08352C14.9492 2.0769 17.3016 2.92509 19.1664 4.47936C20.2555 5.38451 21.1494 6.50139 21.794 7.7623C22.4386 9.02322 22.8205 10.4019 22.9164 11.8148V19.7919Z'
                    fill='#18130C'
                  />
                  <path
                    d='M8.33317 9.37483H12.4998C12.7761 9.37483 13.0411 9.26509 13.2364 9.06974C13.4318 8.87439 13.5415 8.60944 13.5415 8.33317C13.5415 8.0569 13.4318 7.79195 13.2364 7.5966C13.0411 7.40125 12.7761 7.2915 12.4998 7.2915H8.33317C8.0569 7.2915 7.79195 7.40125 7.5966 7.5966C7.40125 7.79195 7.2915 8.0569 7.2915 8.33317C7.2915 8.60944 7.40125 8.87439 7.5966 9.06974C7.79195 9.26509 8.0569 9.37483 8.33317 9.37483Z'
                    fill='#18130C'
                  />
                  <path
                    d='M16.6665 11.4585H8.33317C8.0569 11.4585 7.79195 11.5682 7.5966 11.7636C7.40125 11.9589 7.2915 12.2239 7.2915 12.5002C7.2915 12.7764 7.40125 13.0414 7.5966 13.2367C7.79195 13.4321 8.0569 13.5418 8.33317 13.5418H16.6665C16.9428 13.5418 17.2077 13.4321 17.4031 13.2367C17.5984 13.0414 17.7082 12.7764 17.7082 12.5002C17.7082 12.2239 17.5984 11.9589 17.4031 11.7636C17.2077 11.5682 16.9428 11.4585 16.6665 11.4585Z'
                    fill='#18130C'
                  />
                  <path
                    d='M16.6665 15.625H8.33317C8.0569 15.625 7.79195 15.7347 7.5966 15.9301C7.40125 16.1255 7.2915 16.3904 7.2915 16.6667C7.2915 16.9429 7.40125 17.2079 7.5966 17.4032C7.79195 17.5986 8.0569 17.7083 8.33317 17.7083H16.6665C16.9428 17.7083 17.2077 17.5986 17.4031 17.4032C17.5984 17.2079 17.7082 16.9429 17.7082 16.6667C17.7082 16.3904 17.5984 16.1255 17.4031 15.9301C17.2077 15.7347 16.9428 15.625 16.6665 15.625Z'
                    fill='#18130C'
                  />
                </g>
                <defs>
                  <clipPath id='clip0_684_78'>
                    <rect width='25' height='25' fill='white' />
                  </clipPath>
                </defs>
              </svg>
            </span>
            <span className='mobile_navigation-name'>Чат</span>
          </Link>
          <Link className='mobile_navigation-item d-flex flex-column align-items-center' href=''>
            <span className='mobile_navigation-icon d-flex align-items-center justify-content-center'>
              {profilePic ? (
                <img className='w-100 h-100' src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/users/${profilePic}`} alt='' />
              ) : (
                <img className='w-100 h-100' src='../images/anonymous.png' alt='' />
              )}
            </span>
            <span className='mobile_navigation-name'>Профиль</span>
          </Link>
        </div>
      )}
    </>
  );
}
