import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/high-res.css";
import * as Yup from "yup";
import { useAppDispatch } from "@/utilities/hooks";
import { actionRegistration } from "@/store/actions/modal";
import { updateProfile } from "@/store/userSlice";
import { axiosQuery } from "@/utilities/utilities";
import { setCookie } from "cookies-next";
import { toggle } from "@/store/notificationsSlice";

let yup = require("yup");

export default function Phone() {
  const dispatch = useAppDispatch();

  const [phone, setPhone] = useState("");

  const signUp = async (phone: string) => {
    const res = await axiosQuery({ url: "/users/phone", method: "post", payload: { phone } });
    console.log(res.data);

    if (res) {
      //   dispatch(updateProfile(res.data.user));
      //   setCookie("simple-token", res.data.token, { maxAge: 3600 * 24 * 30 });
      dispatch(actionRegistration());
      dispatch(toggle({ text: res.data.otp, type: "info" }));
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
        onSubmit={() => signUp(phone)}>
        {(props) => (
          <Form>
            <div className='form-row position-relative'>
              <PhoneInput
                onChange={(value) => setPhone(value)}
                // className='d-flex flex-row-reverse align-items-center justify-content-between'
                country={"ru"}
                regions={"europe"}
              />
            </div>
            <button
              disabled={!phone}
              className='btn btn_submit gradient d-flex align-items-center justify-content-center mx-auto'
              type='submit'>
              Зарегистрироваться
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}
