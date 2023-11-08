import React from "react";
import Link from "next/link";
import ScrollContainer from "react-indiana-drag-scroll";
import { App } from "@/pages/categories/[globalCategory]";

export default function TopDownloads({ data, title }: { data: App[]; title: string }) {
  const displayData = data.slice(0, 12);

  return (
    <div className='top-downloads_block gradient'>
      <div className='top-downloads-title d-flex align-items-center'>
        <div className='title-icon'>
          <img src='../images/top.svg' alt='' />
        </div>
        <div className='title-text'>{title}</div>
      </div>
      <div className='top-downloads_block-items'>
        <ScrollContainer className='top-downloads_scroll d-flex'>
          {displayData.map((value, i) => (
            <Link key={i} className='top-downloads-item d-flex flex-column' href={`/catalog/${value.app.id}`}>
              <div className='top-downloads-item_icon w-100'>
                <img src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/apps/${value.app.miniPic}`} className='w-100 h-100' alt='' />
              </div>
              <p className='top-downloads-item_name two-lines'>{value.app.name}</p>
              <div className='item-raiting d-flex align-items-center'>
                {/* <div className='item-raiting_num'>3.6</div> */}
                {/* <div className="votes-count">50347</div> */}
              </div>
            </Link>
          ))}
        </ScrollContainer>
      </div>
    </div>
  );
}
