import React from "react";
import Link from "next/link";

export default function FriendInvite({ sum }: { sum: number }) {
  return (
    <div className='friend-invite'>
      <div className='friend-invite_head d-flex align-items-center justify-content-between'>
        <div className='prod-page-title m-0'>Пригласить друга</div>
        <Link className='friend-invite-info_link' href=''>
          Подробнее
        </Link>
      </div>
      <div className='friend-invite_get gradient_green d-flex flex-column align-items-center justify-content-center text-center'>
        <div className='friend-invite_get-value'>+{sum} ₽</div>
        <div className='friend-invite_get-text'>Вы получите, если купят этот товар</div>
      </div>
      <div className='friend-invite_links d-grid align-items-start'>
        <button className='btn btn_friend-link'>
          <div className='btn_friend-link-icon mx-auto'>
            <img className='w-100 h-100' src='/images/tg.png' alt='' />
          </div>
          <div className='btn_friend-link-text'>Telegram</div>
        </button>
        <button className='btn btn_friend-link'>
          <div className='btn_friend-link-icon mx-auto'>
            <img className='w-100 h-100' src='/images/vk.png' alt='' />
          </div>
          <div className='btn_friend-link-text'>VK</div>
        </button>
        <button className='btn btn_friend-link'>
          <div className='btn_friend-link-icon mx-auto'>
            <img className='w-100 h-100' src='/images/wa.png' alt='' />
          </div>
          <div className='btn_friend-link-text'>WhatsApp</div>
        </button>
        <button className='btn btn_friend-link'>
          <div className='btn_friend-link-icon mx-auto'>
            <img className='w-100 h-100' src='/images/mail.png' alt='' />
          </div>
          <div className='btn_friend-link-text'>Почта</div>
        </button>
        <button className='btn btn_friend-link'>
          <div className='btn_friend-link-icon mx-auto'>
            <img className='w-100 h-100' src='/images/copy_link.png' alt='' />
          </div>
          <div className='btn_friend-link-text'>Скопировать ссылку</div>
        </button>
      </div>
    </div>
  );
}
