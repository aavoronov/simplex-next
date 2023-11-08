import React, { useState } from "react";
import Modal from "react-modal";
import { useAppSelector, useAppDispatch } from "@/utilities/hooks";
import { actionPublished } from "../../store/actions/modal";
import { useRouter } from "next/router";
import Link from "next/link";

export default function PublishedModal() {
  const publishedModal = useAppSelector((state) => state.modalPublished);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const publishedModalAction = () => {
    dispatch(actionPublished());
    router.replace("/");
  };

  return (
    <>
      <Modal
        isOpen={publishedModal}
        onRequestClose={publishedModalAction}
        contentLabel=''
        className='allModal allModal_published d-flex flex-column align-items-center'>
        <button onClick={publishedModalAction} className='btn btn_modal-close position-absolute'>
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
        <div className='modal-published-title text-center'>Ваш товар успешно опубликован</div>
        <div className='modal-published-text w-100 mx-auto text-center'>Проследить можно в личном кабинете</div>
        <Link href='/profile' className='btn btn_submit btn_submit-green'>
          В личный кабинет
        </Link>
      </Modal>
    </>
  );
}
