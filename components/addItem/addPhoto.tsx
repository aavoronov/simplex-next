import React, { useRef, useState } from "react";
import { getDroppedOrSelectedFiles } from "html5-file-selector";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";

import Dropzone from "react-dropzone-uploader";
import { SetState } from "@/utilities/utilities";
import { Image } from "@/pages/sell";

export const AddPhoto = ({ imagesArray, setImagesArray }: { imagesArray: Image[]; setImagesArray: SetState<Image[]> }) => {
  const [swiperRef, setSwiperRef] = useState(null);

  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);

  const inputRef = useRef();

  const getFilesFromEvent = (e) => {
    return new Promise((resolve) => {
      getDroppedOrSelectedFiles(e).then((chosenFiles) => {
        resolve(chosenFiles.map((f) => f.fileObject));
      });
    });
  };

  // called every time a file's `status` changes
  const handleAddPreview = ({ meta, file }, status) => {
    // console.log(file);
    if (status == "done") {
      setImagesArray((prev) => [...prev, { file, preview: meta.previewUrl }]);
      setTimeout(() => {
        swiperRef.slideTo(imagesArray.length, 0);
      }, 0.1);
    }
  };

  const Input = ({ accept, onFiles, files }) => {
    return (
      <>
        <label className={`dzu-inputLabel`}>
          <svg width='83' height='86' viewBox='0 0 83 86' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <ellipse cx='41.4684' cy='42.9494' rx='41.4684' ry='42.9494' fill='white' />
            <path d='M42.1777 29.0649V58.3149' stroke='#1653FF' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
            <path d='M28.0488 43.6899H56.3066' stroke='#1653FF' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
          </svg>
          <input
            disabled={files?.length >= 10}
            ref={inputRef}
            style={{ display: "none" }}
            type='file'
            accept={accept}
            multiple
            onChange={(e) => {
              getFilesFromEvent(e).then((chosenFiles) => {
                onFiles(chosenFiles);
              });
            }}
          />
        </label>
      </>
    );
  };

  const Preview = () => {
    return <></>;
  };

  return (
    <div className='add_item-slider position-relative'>
      <Swiper
        onSwiper={setSwiperRef}
        slidesPerView={"auto"}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        modules={[Pagination, Navigation]}
        className='addPhotoSwiper'>
        {imagesArray.map((el, i) => (
          <SwiperSlide key={i}>
            <img src={el.preview} alt='' onClick={() => console.log(imagesArray)} />
          </SwiperSlide>
        ))}
        <SwiperSlide>
          <Dropzone onChangeStatus={handleAddPreview} PreviewComponent={Preview} accept='image/*' InputComponent={Input} />
        </SwiperSlide>
      </Swiper>
      <div
        className='gallery-swiper-button-prev d-flex align-items-center justify-content-center position-absolute'
        ref={navigationPrevRef}>
        <svg width='17' height='16' viewBox='0 0 17 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M0.292892 7.29289C-0.0976315 7.68342 -0.0976315 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292892 7.29289ZM17 7L1 7V9L17 9V7Z'
            fill='#18130C'
          />
        </svg>
      </div>
      <div
        className='gallery-swiper-button-next d-flex align-items-center justify-content-center position-absolute'
        ref={navigationNextRef}>
        <svg width='17' height='16' viewBox='0 0 17 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M16.7071 7.29289C17.0976 7.68342 17.0976 8.31658 16.7071 8.70711L10.3431 15.0711C9.95262 15.4616 9.31946 15.4616 8.92893 15.0711C8.53841 14.6805 8.53841 14.0474 8.92893 13.6569L14.5858 8L8.92893 2.34315C8.53841 1.95262 8.53841 1.31946 8.92893 0.928932C9.31946 0.538408 9.95262 0.538408 10.3431 0.928932L16.7071 7.29289ZM0 7L16 7V9L0 9L0 7Z'
            fill='#18130C'
          />
        </svg>
      </div>
    </div>
  );
};
