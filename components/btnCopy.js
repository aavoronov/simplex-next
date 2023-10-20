import React from "react";

export default function BtnCopy() {
  return (
    <button className='btn btn_copy-link'>
      <svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='none'>
        <path
          stroke='#18130C'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.5'
          d='M20 2h-8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z'
        />
        <path stroke='#18130C' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M20 2v6h6M22 13h-8M22 17h-8M16 9h-2' />
        <path
          fill='#fff'
          stroke='#18130C'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.5'
          d='M14 8H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V14l-6-6Z'
        />
        <path stroke='#18130C' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M14 8v6h6M16 19H8M16 23H8M10 15H8' />
      </svg>
    </button>
  );
}
