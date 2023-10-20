import React, { useState } from "react";
import Modal from "react-modal";
import { useAppSelector, useAppDispatch } from "@/utilities/hooks";
import { actionFilter } from "../../store/actions/modal";

import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from "yup";

let yup = require("yup");

export default function Filter() {
  const filterModal = useAppSelector((state) => state.modalFilter);
  const dispatch = useAppDispatch();
  const filterModalAction = () => dispatch(actionFilter());

  const methods = ["Моментальные", "Геймпас", "Промокод", "Другое"];

  const amount = [
    "20 робуксов",
    "40 робуксов",
    "80 робуксов",
    "100 робуксов",
    "200 робуксов",
    "400 робуксов",
    "600 робуксов",
    "800 робуксов",
    "1000 робуксов",
    "10000 робуксов",
  ];

  return (
    <>
      <Modal
        isOpen={filterModal}
        onRequestClose={filterModalAction}
        contentLabel=''
        className='allModal modal-filter d-flex flex-column align-items-center'>
        <button onClick={filterModalAction} className='btn btn_modal-close position-absolute'>
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
        <Formik
          initialValues={{
            email: "",
            price_from: "",
            price_to: "",
            amount: "",
            sale: "",
            reviews: "",
          }}>
          {(props) => (
            <Form className='filter-form d-flex flex-column align-items-center w-100'>
              <div className='filter-header d-flex justify-content-center position-relative w-100'>
                <button className='btn btn_resset-filter position-absolute start-0 top-0'>Сбросить</button>
                <div className='modal-title text-center'>Рубоксы</div>
              </div>
              <div className='modal-content d-flex flex-column align-items-center w-100'>
                <div className='modal-filter-item w-100'>
                  <div className='filter-label'>Способ передачи</div>
                  <div className='form-row form-row_buttons d-grid align-items-center position-relative'>
                    {methods.map((value, i) => (
                      <label
                        className={`btn_filter-item filter-radio ${
                          i === 0 ? "active gradient" : ""
                        } d-flex align-items-center justify-content-center text-center`}>
                        <Field className='customInput d-none position-absolute' type='radio' name='method' value='' />
                        {value}
                      </label>
                    ))}
                  </div>
                </div>
                <div className='modal-filter-item w-100'>
                  <div className='filter-label'>Количество</div>
                  <div className='form-row form-row_buttons d-grid align-items-center position-relative'>
                    {amount.map((value, i) => (
                      <label
                        className={`btn_filter-item filter-radio ${
                          i === 0 ? "active gradient" : ""
                        } d-flex align-items-center justify-content-center text-center`}>
                        <Field className='customInput d-none position-absolute' type='radio' name='amount' value='' />
                        {value}
                      </label>
                    ))}
                  </div>
                </div>
                <div className='modal-filter-item w-100'>
                  <div className='filter-label'>Цена</div>
                  <div className='form-row form-row_range form-row_price d-grid align-items-center position-relative'>
                    <Field className='customInput w-100' type='text' name='price_from' placeholder='От' />
                    —
                    <Field className='customInput w-100' type='text' name='price_to' placeholder='От' />
                  </div>
                </div>
                <div className='modal-filter-item w-100'>
                  <div className='filter-label'>Особенности</div>
                  <div className='form-row align-items-center position-relative'>
                    <div className='settings-item d-flex align-items-start w-100'>
                      <div className='settings-item_icon d-flex'>
                        <img className='w-100 h-100' src='../images/s3.svg' alt='' />
                      </div>
                      <div className='setting-item-text'>
                        <p className='m-0'>По скидке</p>
                      </div>
                      <div className='toggle-notifications d-flex align-items-center ms-auto'>
                        <label className='switch-item'>
                          <Field className='customInput w-100' type='text' name='sale' value='' />
                          <span className='slider round'></span>
                        </label>
                      </div>
                    </div>
                    <div className='settings-item d-flex align-items-start w-100'>
                      <div className='settings-item_icon d-flex'>
                        <img className='w-100 h-100' src='../images/s3.svg' alt='' />
                      </div>
                      <div className='setting-item-text'>
                        <p className='m-0'>С отзывами</p>
                      </div>
                      <div className='toggle-notifications d-flex align-items-center ms-auto'>
                        <label className='switch-item'>
                          <Field className='customInput w-100' type='text' name='reviews' value='' />
                          <span className='slider round'></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='filter-footer d-flex flex-column'>
                <button className='btn btn_submit gradient d-flex align-items-center justify-content-center mx-auto'>
                  Показать 1182 товара
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}
