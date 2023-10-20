import React from "react";
import Link from "next/link";
import { ProductWithReviews, Review } from "@/pages/products/[id]";
import { currentDatetime } from "@/utilities/utilities";

export default function ReviewsCard({ product }: { product: ProductWithReviews }) {
  return product.reviews.map((review) => {
    return (
      <div className='reviews-item d-flex flex-column'>
        <div className='reviews-item_head d-flex justify-content-between'>
          <div className='buyer-card d-flex'>
            <div className='buyer-ava'>
              {review.user.profilePic ? (
                <img className='w-100 h-100' src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/users/${review.user.profilePic}`} alt='' />
              ) : (
                <img className='w-100 h-100' src='../images/anonymous.png' alt='' />
              )}
            </div>
            <div className='buyer-info'>
              <div className='buyer-name'>{review.user.login}</div>
              <div className='buyer-stars'>
                <svg xmlns='http://www.w3.org/2000/svg' width='66' height='10' fill='none'>
                  <path
                    fill='url(#a1)'
                    d='M9.93 3.704a1.368 1.368 0 0 0-.486-.698 1.296 1.296 0 0 0-.792-.26H6.83L6.278.965a1.388 1.388 0 0 0-.488-.7 1.316 1.316 0 0 0-1.585 0c-.23.174-.401.419-.488.7l-.553 1.78H1.343c-.284 0-.56.093-.789.265-.23.172-.4.415-.488.693a1.433 1.433 0 0 0-.001.857c.087.279.257.522.486.695l1.482 1.119-.563 1.802a1.41 1.41 0 0 0-.004.863c.09.28.263.523.497.693a1.296 1.296 0 0 0 1.584-.009l1.45-1.102 1.451 1.101a1.316 1.316 0 0 0 1.583.008c.231-.172.403-.415.492-.694.089-.279.09-.58.002-.86l-.563-1.802 1.483-1.12c.232-.17.404-.413.491-.692a1.41 1.41 0 0 0-.006-.86Z'
                  />
                  <path
                    fill='url(#b)'
                    d='M23.93 3.704a1.368 1.368 0 0 0-.486-.698 1.297 1.297 0 0 0-.792-.26H20.83l-.553-1.78a1.389 1.389 0 0 0-.488-.7 1.316 1.316 0 0 0-1.585 0c-.23.174-.401.419-.488.7l-.553 1.78h-1.821c-.284 0-.56.093-.789.265-.23.172-.4.415-.488.693a1.433 1.433 0 0 0-.001.857c.087.279.257.522.486.695l1.482 1.119-.563 1.802a1.41 1.41 0 0 0-.004.863c.09.28.264.523.497.693a1.296 1.296 0 0 0 1.584-.009l1.45-1.102 1.451 1.101a1.316 1.316 0 0 0 1.583.008c.231-.172.403-.415.492-.694.089-.279.09-.58.002-.86l-.563-1.802 1.483-1.12c.232-.17.404-.413.491-.692a1.41 1.41 0 0 0-.006-.86Z'
                  />
                  <path
                    fill='url(#c)'
                    d='M37.93 3.704a1.368 1.368 0 0 0-.486-.698 1.297 1.297 0 0 0-.792-.26H34.83l-.553-1.78a1.389 1.389 0 0 0-.488-.7 1.316 1.316 0 0 0-1.585 0c-.23.174-.401.419-.488.7l-.553 1.78h-1.821c-.284 0-.56.093-.789.265-.23.172-.4.415-.488.693a1.433 1.433 0 0 0-.001.857c.087.279.257.522.486.695l1.482 1.119-.563 1.802a1.41 1.41 0 0 0-.004.863c.09.28.264.523.497.693a1.296 1.296 0 0 0 1.584-.009l1.45-1.102 1.451 1.101a1.316 1.316 0 0 0 1.583.008c.231-.172.403-.415.492-.694.089-.279.09-.58.002-.86l-.563-1.802 1.483-1.12c.232-.17.404-.413.491-.692a1.41 1.41 0 0 0-.006-.86Z'
                  />
                  <path
                    fill='url(#d)'
                    d='M51.93 3.704a1.368 1.368 0 0 0-.486-.698 1.297 1.297 0 0 0-.792-.26H48.83l-.553-1.78a1.389 1.389 0 0 0-.488-.7 1.316 1.316 0 0 0-1.585 0c-.23.174-.401.419-.488.7l-.553 1.78h-1.821c-.284 0-.56.093-.789.265-.23.172-.4.415-.488.693a1.433 1.433 0 0 0-.001.857c.087.279.257.522.486.695l1.482 1.119-.563 1.802a1.41 1.41 0 0 0-.004.863c.09.28.264.523.497.693a1.296 1.296 0 0 0 1.584-.009l1.45-1.102 1.451 1.101a1.316 1.316 0 0 0 1.583.008c.231-.172.403-.415.492-.694.089-.279.09-.58.002-.86l-.563-1.802 1.483-1.12c.232-.17.404-.413.491-.692a1.41 1.41 0 0 0-.006-.86Z'
                  />
                  <path
                    fill='#BDBDBD'
                    d='M65.93 3.704a1.368 1.368 0 0 0-.486-.698 1.297 1.297 0 0 0-.792-.26H62.83l-.553-1.78a1.389 1.389 0 0 0-.488-.7 1.316 1.316 0 0 0-1.585 0c-.23.174-.401.419-.488.7l-.553 1.78h-1.821c-.284 0-.56.093-.789.265-.23.172-.4.415-.488.693a1.433 1.433 0 0 0-.001.857c.087.279.257.522.486.695l1.482 1.119-.563 1.802a1.41 1.41 0 0 0-.004.863c.09.28.264.523.497.693a1.296 1.296 0 0 0 1.584-.009l1.45-1.102 1.451 1.101a1.316 1.316 0 0 0 1.583.008c.231-.172.403-.415.492-.694.089-.279.09-.58.002-.86l-.563-1.802 1.483-1.12c.232-.17.404-.413.491-.692a1.41 1.41 0 0 0-.006-.86Z'
                  />
                  <defs>
                    <linearGradient id='a1' x1='5' x2='11.943' y1='0' y2='1.607' gradientUnits='userSpaceOnUse'>
                      <stop stopColor='#FE6546' />
                      <stop offset='1' stopColor='#FF9E0D' />
                    </linearGradient>
                    <linearGradient id='b' x1='19' x2='25.943' y1='0' y2='1.607' gradientUnits='userSpaceOnUse'>
                      <stop stopColor='#FE6546' />
                      <stop offset='1' stopColor='#FF9E0D' />
                    </linearGradient>
                    <linearGradient id='c' x1='33' x2='39.943' y1='0' y2='1.607' gradientUnits='userSpaceOnUse'>
                      <stop stopColor='#FE6546' />
                      <stop offset='1' stopColor='#FF9E0D' />
                    </linearGradient>
                    <linearGradient id='d' x1='47' x2='53.943' y1='0' y2='1.607' gradientUnits='userSpaceOnUse'>
                      <stop stopColor='#FE6546' />
                      <stop offset='1' stopColor='#FF9E0D' />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
          <div className='review-date'>{currentDatetime(review.createdAt)}</div>
        </div>

        <div className='reviews-item-content'>
          {!!review.text && (
            <>
              <div className='reviews-item-title'>Комментарий</div>
              <div className='reviews-item-text'>{review.text}</div>
            </>
          )}
        </div>

        <Link href='/product/' className='reviews-item-product d-flex align-items-center justify-content-between w-100'>
          <div className='reviews-item-product-image'>
            <img className='w-100 h-100' src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/products/${product.pics[0]}`} alt='' />
          </div>
          <div className='reviews-item-product-info'>
            <div className='product-item-price d-flex align-items-center'>
              {/* <div className={`current-price ${props.num < 5 && "_sale"}`}>369 ₽</div>
            {props.num < 5 && (
              <>
                <div className='discount gradient d-flex align-items-center justify-content-center'>-14%</div>
                <div className='old-price'>429</div>
              </>
            )} */}
            </div>
            <div className='reviews-item-product-name position-relative'>{product.name}</div>
          </div>
        </Link>
      </div>
    );
  });
}
