import React from 'react'
import Link from 'next/link';
export default function Breadcrumbs() {
  return (
    <nav className="breadcrumbs d-flex align-items-center p-0">
      <Link className='breadcrumbs_link' href="/">Главная</Link>
      <span className="breadcrumbs_separator">›</span>
      <Link className='breadcrumbs_link' href="">Игры</Link>
      <span className="breadcrumbs_separator">›</span>
      <span className='breadcrumbs_current'>Roblox</span>
    </nav>
  )
}
