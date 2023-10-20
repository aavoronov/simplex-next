import Head from "next/head";
import React, { useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import LeftMenu from "@/components/leftMenu";
import { axiosQuery } from "@/utilities/utilities";
import { useRouter } from "next/router";
import { updateProfile } from "@/store/userSlice";
import { getCookie, setCookie } from "cookies-next";
import { useAppDispatch, useAppSelector } from "@/utilities/hooks";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toggle } from "@/store/notificationsSlice";

export const MainLayout = ({
  children,
  title = "Title",
  charSet = "utf-8",
  description = "description",
  keyWords = "keyWords",
  viewport = "width=device-width, initial-scale=1",
}) => {
  if (typeof window !== "undefined") {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  const dispatch = useAppDispatch();
  const router = useRouter();
  const reauth = async () => {
    if (!!getCookie("simple-token")) {
      try {
        const res = await axiosQuery({ url: "/users/reauth" });

        // const { id, name, role, login } = res.data.user;

        dispatch(updateProfile(res.data.user));
      } catch (e) {
        console.log(e.response.data);
        // setCookie("simple-token", "");
        router.push("/");
      }
    }
  };

  useEffect(() => {
    reauth();
  }, []);

  const notification = useAppSelector((state) => state.notification);

  useEffect(() => {
    if (notification.text) {
      switch (notification.type) {
        case "info":
          toast.info(notification.text);
          break;
        case "success":
          toast.success(notification.text);
          break;
        case "warning":
          toast.warning(notification.text);
          break;
        case "error":
          toast.error(notification.text);
          break;
        case "default":
          toast(notification.text);
          break;
        default:
          notification.text && toast(notification.text);
      }
    }
  }, [notification]);

  useEffect(() => {
    if (notification.text !== "") setTimeout(() => dispatch(toggle({ text: "", type: null })), 5000);
  }, [notification]);

  return (
    <>
      <ToastContainer position='top-left' hideProgressBar={false} newestOnTop={true} draggable pauseOnHover />
      <Head>
        <title>{title}</title>
        <meta name='keywords' content={keyWords} />
        <meta name='description' content={description} />
        <meta name='viewport' content={viewport} />
        <meta charSet={charSet} />
      </Head>
      <Header />
      <main className='main-content d-flex'>
        <LeftMenu />
        {!children
          ? // <Loader
            //   type='Rings'
            //   color='#00BFFF'
            //   height={100}
            //   width={100}
            //   timeout={3000} //3 secs
            // />
            null
          : children}
      </main>
      <Footer />
    </>
  );
};
