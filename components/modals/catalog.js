import React from "react";
import Modal from "react-modal";
import { useAppSelector, useAppDispatch } from "@/utilities/hooks";
import Link from "next/link";
import { actionCatalog, actionFilter } from "../../store/actions/modal";

export default function Catalog({ cats }) {
  const catsModal = useAppSelector((state) => state.catalogMenu);
  const dispatch = useAppDispatch();
  const catsModalAction = () => dispatch(actionCatalog());

  return (
    <>
      <button onClick={catsModalAction} className='btn btn_filter d-flex align-items-center justify-content-center'>
        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='17' fill='none'>
          <g fill='#18130C' clipPath='url(#a)'>
            <path d='M.667 3.667H2.49a2.485 2.485 0 0 0 4.796 0h8.046a.667.667 0 1 0 0-1.333H7.287a2.485 2.485 0 0 0-4.796 0H.667a.667.667 0 1 0 0 1.333Zm4.222-1.833a1.167 1.167 0 1 1 0 2.333 1.167 1.167 0 0 1 0-2.333ZM15.333 7.833H13.51a2.484 2.484 0 0 0-4.796 0H.667a.667.667 0 0 0 0 1.333h8.046a2.485 2.485 0 0 0 4.796 0h1.824a.667.667 0 1 0 0-1.333Zm-4.222 1.833a1.166 1.166 0 1 1 0-2.333 1.166 1.166 0 0 1 0 2.333ZM15.333 13.334H7.287a2.485 2.485 0 0 0-4.796 0H.667a.666.666 0 1 0 0 1.333H2.49a2.485 2.485 0 0 0 4.796 0h8.046a.667.667 0 1 0 0-1.333ZM4.89 15.167a1.167 1.167 0 1 1 0-2.333 1.167 1.167 0 0 1 0 2.333Z' />
          </g>
          <defs>
            <clipPath id='a'>
              <path fill='#fff' d='M0 .5h16v16H0z' />
            </clipPath>
          </defs>
        </svg>
      </button>

      <Modal isOpen={catsModal} onRequestClose={catsModalAction} contentLabel='' className='allModal modal-catalog d-flex flex-column'>
        <button onClick={catsModalAction} className='btn btn_modal-close position-absolute'>
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
        <div className='modal-title text-center'>Категория</div>
        <div className='modal-cats_list overflow-auto'>
          {cats.map((value, i) => (
            <Link
              href={{
                pathname: `/categories/[globalCategory]`,
                query: {
                  globalCategory: i + 1, // pass the id
                },
              }}>
              <div className='cat-link d-flex align-items-center justify-content-between w-100' key={i}>
                {value}
                <span className='cat-link-icon' onClick={() => dispatch(actionFilter())}>
                  <svg xmlns='http://www.w3.org/2000/svg' width='8' height='14' viewBox='0 0 8 14' fill='none'>
                    <path d='M1 13L7 7L1 1' stroke='#18130C' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Modal>
    </>
  );
}
