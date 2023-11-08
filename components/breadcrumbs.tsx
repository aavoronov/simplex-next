import React from "react";
import Link from "next/link";

interface Crumb {
  name: string;
  href: string;
}
export const crumbs: Record<string, Crumb> = {
  index: {
    name: "Главная",
    href: "/",
  },
  games: {
    name: "Игры",
    href: "/games",
  },
  apps: {
    name: "Приложения",
    href: "/apps",
  },
  catalog: {
    name: "Каталог",
    href: "/apps",
  },
};
export default function Breadcrumbs({ currentCrumbs = [] }: { currentCrumbs: Array<Crumb | string> }) {
  // const finalCrumbs = [crumbs.index, crumbs.games, ...currentCrumbs];

  return (
    <nav className='breadcrumbs d-flex align-items-center p-0'>
      <Link className='breadcrumbs_link' href='/'>
        Главная
      </Link>
      <span className='breadcrumbs_separator'>›</span>

      {currentCrumbs.map((item, index, arr) => {
        return index === arr.length - 1 ? (
          <span className='breadcrumbs_current' key={index}>
            {typeof item === "string" ? item : item.name}
          </span>
        ) : (
          <>
            <Link className='breadcrumbs_link' href={(item as Crumb).href}>
              {(item as Crumb).name}
            </Link>
            <span className='breadcrumbs_separator'>›</span>
          </>
        );
      })}
      {/* <Link className='breadcrumbs_link' href='/'>
        Главная
      </Link>
      <span className='breadcrumbs_separator'>›</span>
      <Link className='breadcrumbs_link' href=''>
        Игры
      </Link>
      <span className='breadcrumbs_separator'>›</span>
      <span className='breadcrumbs_current'>Roblox</span> */}
    </nav>
  );
}
