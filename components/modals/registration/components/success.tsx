import React, { useState } from "react";
import BtnCopy from "@/components/btnCopy";
import { axiosQuery } from "@/utilities/utilities";
import { useAppDispatch } from "@/utilities/hooks";
import { toggle } from "@/store/notificationsSlice";
import { actionRegistration } from "@/store/actions/modal";
import { setCookie } from "cookies-next";
import { updateProfile } from "@/store/userSlice";
export default function Success({ login, password }: { login: string; password: string }) {
  const [email, setEmail] = useState("");
  const dispatch = useAppDispatch();

  const sendData = async () => {
    const res = await axiosQuery({
      url: "/users/send-one-click",
      method: "post",
      payload: {
        email,
        login,
        password,
      },
    });
    console.log(res.data);
    setEmail("");
  };

  const signIn = async () => {
    const res = await axiosQuery({
      url: "/users/sign-in",
      method: "post",
      payload: {
        // login: "k5P9rCmqG0iu",
        // password: "4x77b06s",
        login: login,
        password: password,
      },
      onError: (e: any) => {
        dispatch(toggle({ type: "error", text: e.response.data.message }));
      },
    });

    // console.log("res.data", res.data);
    if (res) {
      dispatch(updateProfile(res.data.user));
      dispatch(actionRegistration());

      setCookie("simple-token", res.data.token, { maxAge: 3600 * 24 * 30 });
    }
  };
  return (
    <>
      <div className='modal-content d-flex flex-column align-items-center w-100'>
        <div className='reg-success-icon'>
          <img src='../../images/reg-star.svg' alt='' />
        </div>
        <div className='reg-success-title text-center'>Регистрация прошла успешно!</div>
        <div className='reg-success-text text-center'>Не забудь сохранить логин и пароль</div>
        <div className='reg-success-accesses w-100'>
          <div className='form-row position-relative w-100'>
            <span className='form-row-label d-block position-absolute'>Логин</span>
            <input disabled className='customInput w-100' type='text' value={login} />
            <div onClick={() => navigator.clipboard.writeText(login)}>
              <BtnCopy />
            </div>
          </div>
          <div className='form-row position-relative w-100'>
            <span className='form-row-label d-block position-absolute'>Пароль</span>
            <input disabled className='customInput w-100' type='text' value={password} />
            <div onClick={() => navigator.clipboard.writeText(password)}>
              <BtnCopy />
            </div>
          </div>
        </div>
      </div>
      <div className='modal-footer position-relative w-100'>
        <div className='modal-footer-name position-absolute'>или</div>
        <div className='modal-content mx-auto'>
          <div className='form-row position-relative w-100'>
            <input
              className='customInput w-100'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='E-mail'
            />
            <button className='btn btn_email-send d-flex align-items-center position-absolute' onClick={() => sendData()}>
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M3 11L22 2L13 21L11 13L3 11Z' stroke='#18130C' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
            </button>
          </div>
        </div>
        <button className='btn btn_submit gradient d-flex align-items-center justify-content-center mx-auto' onClick={signIn}>
          Начать
        </button>
      </div>
    </>
  );
}
