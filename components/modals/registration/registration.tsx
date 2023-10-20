import React, { useState } from "react";
import Modal from "react-modal";
import { useAppSelector, useAppDispatch } from "@/utilities/hooks";
import Link from "next/link";
import { actionLogin, actionRegistration } from "../../../store/actions/modal";
import OneClick from "./components/oneClick";
import Socials from "./components/socials";
import Email from "./components/email";
import Phone from "./components/phone";
import Success from "./components/success";
import { axiosQuery } from "@/utilities/utilities";

export default function Registration() {
  const regTypes = [
    {
      img: "type1.svg",
      name: "В 1 клик",
    },
    {
      img: "type2.svg",
      name: "Соцсети",
    },
    {
      img: "type3.svg",
      name: "E-mail",
    },
    {
      img: "type4.svg",
      name: "Телефон",
    },
  ];

  const oneClickSignUp = async () => {
    const res = await axiosQuery({ url: "/users/one-click", method: "post" });
    console.log(res.data);
    setOneClickData(res.data);
  };

  const [regType, setRegType] = useState(regTypes[0].name);
  const [oneClickData, setOneClickData] = useState<{ login: string; password: string }>(null);

  const regModal = useAppSelector((state) => state.modalReg);
  const dispatch = useAppDispatch();
  const regModalAction = () => dispatch(actionRegistration());
  return (
    <>
      <button onClick={regModalAction} className='btn btn_reg gradient_green d-flex align-items-center justify-content-center'>
        <div className='btn_reg-icon'>
          <svg xmlns='http://www.w3.org/2000/svg' width='25' height='24' fill='none'>
            <path
              stroke='#18130C'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='1.5'
              d='M12.5 22c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10Z'
            />
            <path
              stroke='#18130C'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='1.5'
              d='M8.5 14s1.5 2 4 2 4-2 4-2M9.5 9h.01M15.5 9h.01'
            />
          </svg>
        </div>
        Регистрация
      </button>
      {/* <Modal
        isOpen={regModal}
        onRequestClose={regModalAction}
        contentLabel=""
        className="allModal modal-captcha gradient d-flex flex-column justify-content-end align-items-center"
      >
        <button onClick={regModalAction} className="btn btn_modal-close position-absolute">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <g clipPath="url(#clip0_243_6669)">
              <path d="M15.8045 0.195557C15.6795 0.0705765 15.51 0.000366211 15.3332 0.000366211C15.1564 0.000366211 14.9869 0.0705765 14.8619 0.195557L7.99986 7.05756L1.13786 0.195557C1.01284 0.0705765 0.8433 0.000366211 0.666524 0.000366211C0.489748 0.000366211 0.320209 0.0705765 0.195191 0.195557V0.195557C0.0702103 0.320576 0 0.490114 0 0.666891C0 0.843667 0.0702103 1.01321 0.195191 1.13822L7.05719 8.00022L0.195191 14.8622C0.0702103 14.9872 0 15.1568 0 15.3336C0 15.5103 0.0702103 15.6799 0.195191 15.8049V15.8049C0.320209 15.9299 0.489748 16.0001 0.666524 16.0001C0.8433 16.0001 1.01284 15.9299 1.13786 15.8049L7.99986 8.94289L14.8619 15.8049C14.9869 15.9299 15.1564 16.0001 15.3332 16.0001C15.51 16.0001 15.6795 15.9299 15.8045 15.8049C15.9295 15.6799 15.9997 15.5103 15.9997 15.3336C15.9997 15.1568 15.9295 14.9872 15.8045 14.8622L8.94252 8.00022L15.8045 1.13822C15.9295 1.01321 15.9997 0.843667 15.9997 0.666891C15.9997 0.490114 15.9295 0.320576 15.8045 0.195557V0.195557Z" fill="#18130C" />
            </g>
            <defs>
              <clipPath id="clip0_243_6669">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
        
        <div className="captcha-smile">
          <img className='w-100 h-100' src="../../images/smile.svg" alt="" />
        </div>
        <div className="captcha-text w-100 mx-auto text-center">Мы должны убедиться, что Вы не робот)</div>
        <div className="captcha-wrapper">
          <img src="../../images/captcha.jpg" alt="" />
        </div>
      </Modal> */}

      <Modal
        isOpen={regModal}
        onRequestClose={regModalAction}
        contentLabel=''
        className='allModal modal-reg d-flex flex-column align-items-center'>
        <button onClick={regModalAction} className='btn btn_modal-close position-absolute'>
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
        <div className='modal-title text-center'>Регистрация</div>
        <div className='reg_types d-flex align-items-center justify-content-between'>
          {regTypes.map((el, i) => (
            <button
              key={i}
              onClick={() => setRegType(el.name)}
              className={`btn btn_reg-type ${
                regType === el.name ? "gradient_green" : ""
              } d-flex align-items-center justify-content-center`}>
              <div className='btn_reg-type-icon'>
                <img className='w-100 h-100' src={`../../images/${el.img}`} alt='' />
              </div>
              {el.name}
            </button>
          ))}
        </div>
        <div className='modal-content d-flex flex-column align-items-center w-100'>
          {regType === regTypes[0].name && <OneClick onClick={oneClickSignUp} />}
          {regType === regTypes[1].name && <Socials />}
          {regType === regTypes[2].name && <Email />}
          {regType === regTypes[3].name && <Phone />}
          <div className='modal-content-text'>
            Уже есть аккаунт?{" "}
            <button
              className='btn btn_leave'
              onClick={() => {
                dispatch(actionRegistration());
                dispatch(actionLogin());
              }}>
              Войти
            </button>
          </div>
        </div>
        <div className='modal-footer w-100'>
          <div className='modal-text w-100 mx-auto text-center'>
            Продолжая регистрацию или вход, вы принимаете условия <Link href=''>Пользовательского соглашения</Link> и{" "}
            <Link href=''>Политики конфиденциальности</Link>
          </div>
        </div>

        {oneClickData && <Success login={oneClickData.login} password={oneClickData.password} />}
      </Modal>
    </>
  );
}
