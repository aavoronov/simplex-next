import React from "react";
import Link from "next/link";
import BtnDelete from "./btnDelete";
import { ProductThumbnail } from "@/pages";
import { getPreciseAverage } from "@/utilities/utilities";

export default function ProductItem({ item, del, cats = true }: { item: ProductThumbnail; del?: boolean; cats?: boolean }) {
  const isNew = true;
  const isDiscount = true;

  return (
    <div className='product-item d-flex flex-column position-relative'>
      {del && <BtnDelete />}
      {cats && (
        <Link href='' className='product-cat d-flex'>
          <div className='product-cat-icon'>
            <img src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/apps/${item.category.app.miniPic}`} className='w-100 h-100' alt='' />
          </div>
          <div className='product-cat-info d-flex flex-column justify-content-between'>
            <div className='product-game-name'>{item.category.app.name}</div>
            <div className='product-cat-name'>{item.category.name}</div>
          </div>
        </Link>
      )}

      <Link
        href={{
          pathname: `/products/[id]`,
          query: {
            id: item.id, // pass the id
          },
        }}
        className='product-item_card d-flex flex-column'>
        <div className='product-item-image w-100 position-relative'>
          <img src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/products/${item.pics[0]}`} className='w-100 h-100' alt='' />
          {isNew ? (
            <div className='item-tag gradient_green d-flex align-items-center justify-content-center position-absolute'>Новинка</div>
          ) : (
            <div className='item-tag gradient d-flex align-items-center justify-content-center position-absolute'>Летняя скидка</div>
          )}
        </div>
        <div className='product-item-info d-flex flex-column'>
          <div className='product-item-price d-flex align-items-center'>
            <div className={`current-price ${isDiscount && "_sale"}`}>{item.price} ₽</div>
            {isDiscount && (
              <>
                <div className='discount gradient d-flex align-items-center justify-content-center'>-14%</div>
                <div className='old-price'>429</div>
              </>
            )}
          </div>
          <div className='product-item-name'>
            <p className='two-lines'>{item.name}</p>
          </div>
          <div className='item-raiting d-flex align-items-center'>
            <div className='item-raiting_num'>{getPreciseAverage(item.average)}</div>
            <div className='votes-count'>{item.count}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}
