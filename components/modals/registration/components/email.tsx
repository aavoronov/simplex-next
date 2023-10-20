import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { axiosQuery } from "@/utilities/utilities";
import { useAppDispatch } from "@/utilities/hooks";
import { updateProfile } from "@/store/userSlice";
import { actionRegistration } from "@/store/actions/modal";
import { setCookie } from "cookies-next";

let yup = require("yup");

export default function Email() {
  const [passwordShow, setPasswordShow] = useState(null);

  const dispatch = useAppDispatch();

  const handlePasswordShow = () => {
    setPasswordShow(!passwordShow);
  };

  const signUp = async (values: { email: string; password: string }) => {
    const res = await axiosQuery({ url: "/users/email", method: "post", payload: values });
    console.log(res.data);

    if (res) {
      dispatch(updateProfile(res.data.user));
      dispatch(actionRegistration());

      setCookie("simple-token", res.data.token, { maxAge: 3600 * 24 * 30 });
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(values) => signUp(values)}>
        {(props) => (
          <Form>
            <div className='form-row position-relative'>
              <Field className='customInput w-100' name='email' placeholder='E-mail' />
            </div>
            <div className='form-row position-relative'>
              <Field className='customInput w-100' type={passwordShow ? "text" : "password"} name='password' placeholder='Пароль' />
              <span onClick={handlePasswordShow} className='toggleShow position-absolute'>
                <img src='/images/show.png' alt='' />
              </span>
            </div>
            <div className='form-row position-relative'>
              <Field
                className='customInput w-100'
                type={passwordShow ? "text" : "password"}
                name='confirm_password'
                placeholder='Повторите пароль'
              />
              <span onClick={handlePasswordShow} className='toggleShow position-absolute'>
                <img src='/images/show.png' alt='' />
              </span>
            </div>
            <button
              disabled={!(props.isValid && props.dirty)}
              className='btn btn_submit gradient d-flex align-items-center justify-content-center mx-auto'>
              Зарегистрироваться
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}
