import React from "react";
import Link from "next/link";
export default function Pagination({ onClick }: { onClick: () => void }) {
  return (
    <div className='paginations_block d-flex flex-column align-items-center'>
      <button className='btn btn_show-more' onClick={onClick}>
        Показать ещё
      </button>
      {/* <nav className="navigation pagination d-flex justify-content-center w-100" role="navigation">

                <Link href="" className="prev-page d-flex justify-content-center align-items-center text-decoration-none">
                    <img src="../images/prev-page.svg" alt="" />
                </Link>
                <Link className="page-numbers d-flex align-items-center justify-content-center text-decoration-none" href=""><span>1</span></Link>
                <span aria-current="page" className="page-numbers d-flex align-items-center justify-content-center current"><span>2</span></span>
                <Link className="page-numbers d-flex align-items-center justify-content-center text-decoration-none" href=""><span>3</span></Link>
                <Link className="page-numbers d-flex align-items-center justify-content-center text-decoration-none" href=""><span>4</span></Link>
                <Link href="" className="next-page d-flex justify-content-center align-items-center text-decoration-none">
                    <img src="../images/next-page.svg" alt="" />
                </Link>
            </nav> */}
    </div>
  );
}
