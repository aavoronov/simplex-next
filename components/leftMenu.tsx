import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function LeftMenu() {
  const { asPath } = useRouter();
  // const slug = router.pathname;
  console.log({ asPath });
  // console.log({ slug });
  return (
    <div className='left-menu'>
      <ul className='list-none p-0 m-0'>
        <li>
          <Link className={`left-menu-item d-flex align-items-center ${asPath === "/" ? " active gradient" : ""}`} href='/'>
            <span className='left-menu-item_icon'>
              <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none'>
                <g clipPath='url(#a)'>
                  <path
                    fill='#929292'
                    d='M15.414 6.046 10.357.989a3.339 3.339 0 0 0-4.714 0L.586 6.046A1.985 1.985 0 0 0 0 7.46v6.545a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.46a1.986 1.986 0 0 0-.586-1.414ZM10 14.67H6V12.05a2 2 0 1 1 4 0v2.622Zm4.667-.666a.667.667 0 0 1-.667.666h-2.667V12.05a3.333 3.333 0 1 0-6.666 0v2.622H2a.667.667 0 0 1-.667-.666V7.46c.001-.177.071-.346.196-.471l5.056-5.056a2.005 2.005 0 0 1 2.83 0l5.056 5.058a.672.672 0 0 1 .196.469v6.545Z'
                  />
                </g>
                <defs>
                  <clipPath id='a'>
                    <path fill='#fff' d='M0 0h16v16H0z' />
                  </clipPath>
                </defs>
              </svg>
            </span>
            <span className='left-menu-item_name'>Главная</span>
          </Link>
        </li>
        <li>
          <Link className={`left-menu-item d-flex align-items-center ${asPath === "/sell" ? " active gradient" : ""}`} href='/sell'>
            <span className='left-menu-item_icon'>
              <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none'>
                <g clipPath='url(#a)'>
                  <path
                    fill='#929292'
                    d='M8 0a8 8 0 1 0 8 8 8.009 8.009 0 0 0-8-8Zm0 14.667A6.666 6.666 0 1 1 14.667 8 6.674 6.674 0 0 1 8 14.667ZM11.333 8a.667.667 0 0 1-.666.667h-2v2a.667.667 0 0 1-1.334 0v-2h-2a.667.667 0 0 1 0-1.334h2v-2a.667.667 0 0 1 1.334 0v2h2a.667.667 0 0 1 .666.667Z'
                  />
                </g>
                <defs>
                  <clipPath id='a'>
                    <path fill='#fff' d='M0 0h16v16H0z' />
                  </clipPath>
                </defs>
              </svg>
            </span>
            <span className='left-menu-item_name'>Продать</span>
          </Link>
        </li>
        <li>
          <Link
            className={`left-menu-item d-flex align-items-center ${asPath === "/games" ? " active gradient" : ""}`}
            href={{
              pathname: `/[type]`,
              query: {
                type: "games", // pass the id
              },
            }}
            // as='/games/'
          >
            <span className='left-menu-item_icon'>
              <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none'>
                <path
                  fill='#929292'
                  d='M14.805 3.353c-.598-.996-1.66-1.66-2.855-1.66H3.983c-1.195 0-2.257.664-2.854 1.66A8.904 8.904 0 0 0 0 7.668c0 3.652 1.46 6.64 3.32 6.64.995 0 1.792-.93 2.39-2.855.066-.266.331-.465.663-.465h3.254c.265 0 .53.199.663.465.598 1.925 1.395 2.854 2.39 2.854 1.86 0 3.32-2.987 3.32-6.639a9.775 9.775 0 0 0-1.195-4.315Zm-2.19 9.626c-.2 0-.665-.53-1.13-1.925-.265-.863-1.062-1.394-1.925-1.394H6.373c-.863 0-1.66.597-1.925 1.394-.465 1.394-.93 1.925-1.129 1.925-.663 0-1.991-2.058-1.991-5.31a7.85 7.85 0 0 1 .93-3.652c.398-.598 1.062-.996 1.725-.996h7.967c.664 0 1.328.398 1.726.996a7.85 7.85 0 0 1 .93 3.651c0 3.253-1.328 5.311-1.992 5.311Z'
                />
                <path
                  fill='#929292'
                  d='M6 6h-.667v-.667c0-.4-.267-.666-.667-.666s-.667.266-.667.666V6h-.666c-.4 0-.667.267-.667.667s.267.666.667.666h.666V8c0 .4.267.667.667.667S5.333 8.4 5.333 8v-.667h.666c.4 0 .667-.266.667-.666S6.399 6 5.999 6ZM12.334 6.667a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM10.334 8.667a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z'
                />
              </svg>
            </span>
            <span className='left-menu-item_name'>Игры</span>
          </Link>
        </li>
        <li>
          <Link
            className={`left-menu-item d-flex align-items-center ${asPath === "/apps" ? " active gradient" : ""}`}
            href={{
              pathname: `/[type]`,
              query: {
                type: "apps", // pass the id
              },
            }}
            // as='/apps/'
          >
            <span className='left-menu-item_icon'>
              <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none'>
                <g fill='#929292' clipPath='url(#a)'>
                  <path d='M4.667 0h-2A2.667 2.667 0 0 0 0 2.667v2a2.667 2.667 0 0 0 2.667 2.666h2a2.667 2.667 0 0 0 2.666-2.666v-2A2.667 2.667 0 0 0 4.667 0ZM6 4.667A1.333 1.333 0 0 1 4.667 6h-2a1.333 1.333 0 0 1-1.334-1.333v-2a1.333 1.333 0 0 1 1.334-1.334h2A1.333 1.333 0 0 1 6 2.667v2ZM4.667 8.667h-2A2.667 2.667 0 0 0 0 11.333v2A2.667 2.667 0 0 0 2.667 16h2a2.667 2.667 0 0 0 2.666-2.667v-2a2.667 2.667 0 0 0-2.666-2.666ZM6 13.333a1.333 1.333 0 0 1-1.333 1.334h-2a1.333 1.333 0 0 1-1.334-1.334v-2A1.333 1.333 0 0 1 2.667 10h2A1.334 1.334 0 0 1 6 11.333v2ZM13.333 8.667h-2a2.667 2.667 0 0 0-2.667 2.666v2A2.667 2.667 0 0 0 11.333 16h2a2.667 2.667 0 0 0 2.666-2.667v-2a2.667 2.667 0 0 0-2.666-2.666Zm1.333 4.666a1.333 1.333 0 0 1-1.333 1.334h-2a1.333 1.333 0 0 1-1.334-1.334v-2A1.333 1.333 0 0 1 11.333 10h2a1.334 1.334 0 0 1 1.333 1.333v2ZM9.333 4.667h2v2a.667.667 0 1 0 1.333 0v-2h2a.667.667 0 1 0 0-1.334h-2v-2a.667.667 0 1 0-1.333 0v2h-2a.667.667 0 1 0 0 1.334Z' />
                </g>
                <defs>
                  <clipPath id='a'>
                    <path fill='#fff' d='M0 0h16v16H0z' />
                  </clipPath>
                </defs>
              </svg>
            </span>
            <span className='left-menu-item_name'>Приложения</span>
          </Link>
        </li>
        <li>
          <Link className={`left-menu-item d-flex align-items-center ${asPath === "/best" ? " active gradient" : ""}`} href='/best'>
            <span className='left-menu-item_icon'>
              <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none'>
                <g clipPath='url(#a)'>
                  <path
                    fill='#929292'
                    d='M15.89 5.863a2.12 2.12 0 0 0-2.044-1.484h-2.912l-.885-2.757a2.151 2.151 0 0 0-4.098 0l-.884 2.757H2.154A2.151 2.151 0 0 0 .887 8.267L3.258 10l-.901 2.792a2.119 2.119 0 0 0 .79 2.408 2.118 2.118 0 0 0 2.532-.012L8 13.48l2.322 1.706a2.15 2.15 0 0 0 3.322-2.394L12.742 10l2.373-1.733a2.118 2.118 0 0 0 .776-2.404ZM14.33 7.19l-2.763 2.02a.667.667 0 0 0-.241.744l1.05 3.246a.818.818 0 0 1-1.264.91l-2.716-2a.666.666 0 0 0-.79 0l-2.716 2a.818.818 0 0 1-1.267-.91l1.053-3.246a.667.667 0 0 0-.24-.744L1.67 7.19a.818.818 0 0 1 .483-1.478h3.4a.667.667 0 0 0 .635-.462l1.033-3.221a.818.818 0 0 1 1.557 0l1.034 3.22a.667.667 0 0 0 .634.463h3.4a.818.818 0 0 1 .483 1.478h-.001Z'
                  />
                </g>
                <defs>
                  <clipPath id='a'>
                    <path fill='#fff' d='M0 0h16v16H0z' />
                  </clipPath>
                </defs>
              </svg>
            </span>
            <span className='left-menu-item_name'>Лучшие</span>
          </Link>
        </li>
        <li>
          <Link className={`left-menu-item d-flex align-items-center${asPath === "/chat" ? " active gradient" : ""}`} href='/chat'>
            <span className='left-menu-item_icon'>
              <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none'>
                <g fill='#929292' clipPath='url(#a)'>
                  <path d='M16 7.498A8.009 8.009 0 1 0 8.013 16h4.655a3.336 3.336 0 0 0 3.334-3.333V7.498Zm-1.333 5.169a2 2 0 0 1-2 2H8.012a6.694 6.694 0 0 1-6.373-4.655 6.611 6.611 0 0 1-.262-2.783 6.695 6.695 0 0 1 5.771-5.84c.288-.037.577-.055.867-.056a6.614 6.614 0 0 1 4.252 1.534 6.694 6.694 0 0 1 2.4 4.694v5.106Z' />
                  <path d='M5.333 6h2.666a.667.667 0 1 0 0-1.333H5.333a.667.667 0 1 0 0 1.333ZM10.666 7.333H5.333a.667.667 0 1 0 0 1.334h5.333a.667.667 0 1 0 0-1.333ZM10.666 10H5.333a.666.666 0 1 0 0 1.333h5.333a.667.667 0 1 0 0-1.333Z' />
                </g>
                <defs>
                  <clipPath id='a'>
                    <path fill='#fff' d='M0 0h16v16H0z' />
                  </clipPath>
                </defs>
              </svg>
            </span>
            <span className='left-menu-item_name'>Чаты</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
