import React, { useRef, useState } from 'react';
import Link from "next/link";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

export default function MainSlider() {

    const slides = [1,2,3]

    return (
        <div className="main-slider">
            <Swiper
                slidesPerView={1}
                spaceBetween={18}
                breakpoints={{
                    768: {
                      slidesPerView: 2,
                    },
                    1200: {
                      slidesPerView: 3,
                    },
                  }}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {slides.map((value, i) =>
                    <SwiperSlide key={i}>
                        <Link href="/" className='d-block position-relative'>
                            <img src="../images/slide.jpg" className='w-100 h-100' alt="" />
                        </Link>
                    </SwiperSlide>
                )}
            </Swiper>
        </div>
    )
}
