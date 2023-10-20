import React from 'react'
import Link from "next/link";
export default function Socials() {
    const socials = [
        'vk2.svg',
        'google.svg',
        'ya.svg',
        'tg2.svg',
        'steam.svg',
    ]
    return (
        <div className="socials_list d-grid">
            {socials.map((value, i) =>
                <Link key={i} className='social-list-item' href="">
                    <img className='w-100 h-100' src={`/images/${value}`} alt="" />
                </Link>
            )}

        </div>
    )
}
