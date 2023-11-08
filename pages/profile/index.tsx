import React, { useEffect, useState } from "react";
import { MainLayout } from "../../layouts/MainLayout";
import Link from "next/link";
import Exit from "@/components/modals/exit";
import Breadcrumbs from "@/components/breadcrumbs";
import Balance from "@/components/profile/balance";
import Purchases from "@/components/profile/purchases";
import Sales from "@/components/profile/sales";
import MyGoods from "@/components/profile/myGoods";
import Settings from "@/components/modals/settings";
import { axiosQuery, getPreciseAverage, getPrettyAge } from "@/utilities/utilities";
import { useAppDispatch, useAppSelector } from "@/utilities/hooks";
import { actionLoginTrue } from "@/store/actions/modal";
import { getCookie } from "cookies-next";

interface Profile {
  id: number;
  name: string;
  isBlocked: boolean;
  createdAt: string;
  average: string;
  count: string;
  salesCount: string;
}

export default function Profile() {
  // {tabs.map((item) => (
  //     <button
  //       className={`btn btn_profile d-flex align-items-center justify-content-between w-100 ${
  //         activeTab === item.key ? " active" : ""
  //       } ${item.key === "balance" ? "btn_balance" : ""}`}
  //       key={item.key}
  //       onClick={() => setActiveTab(item.key)}>
  //       <div className='btn_profile-name'>{item.name}</div>
  //       {item.key === "balance" && <div className='btn_balance-sum'>5 000 ₽</div>}
  //     </button>
  //   ))}

  // const [page, setPage] = useState(0)
  const [title, setTitle] = useState("Личный кабинет");
  const [activeTab, setActiveTab] = useState("balance");
  const [profile, setProfile] = useState<Profile>(null);

  const { id, login, profilePic, name, inviteToken } = useAppSelector((state) => state.user);
  const token = getCookie("simple-token");
  const dispatch = useAppDispatch();

  const getUser = async () => {
    const res = await axiosQuery({ url: `/users/${id}` });
    setProfile(res.data);
  };

  useEffect(() => {
    if (id) getUser();
    // if (!id) dispatch(actionLoginTrue());
  }, [id]);

  if (!token) {
    dispatch(actionLoginTrue());
  }

  return (
    <MainLayout title={"Профиль"}>
      <div className='content-column'>
        <div className='container'>
          <Breadcrumbs currentCrumbs={["Профиль"]} />
          <div className='profile-wrapper d-grid'>
            <div className='profile_controls w-100'>
              {!!profile && (
                <div className='seller-card d-flex align-items-center'>
                  <div className='seller-ava position-relative'>
                    {profilePic ? (
                      <img className='w-100 h-100' src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/users/${profilePic}`} alt='' />
                    ) : (
                      <img className='w-100 h-100' src='../images/anonymous.png' alt='' />
                    )}
                    <div className='online-check position-absolute'></div>
                  </div>
                  <div className='seller-info position-relative'>
                    <div className='seller-name'>{name}</div>
                    <div className='seller-raiting'>
                      <div className='item-raiting d-flex align-items-center'>
                        <div className='item-raiting_num'>{getPreciseAverage(profile.average)}</div>
                        <div className='votes-count'>{profile.count} отзывов</div>
                      </div>
                    </div>
                    <div className='seller-status d-flex align-items-center'>на Simple {getPrettyAge(profile.createdAt)}</div>
                    <Settings />
                  </div>
                </div>
              )}
              <button
                className={`btn btn_profile btn_balance d-flex align-items-center justify-content-between w-100 ${
                  activeTab === "balance" ? "active" : ""
                }`}
                onClick={() => setActiveTab("balance")}>
                <div className='btn_profile-name'>Баланс</div>
                <div className='btn_balance-sum'>5 000 ₽</div>
              </button>
              <Link className='friend_invite-link d-flex align-items-center position-relative w-100' href='/profile/invite'>
                <div className='friend_invite-link_inner position-relative'>
                  <div className='friend_invite-link-name'>Пригласить друга</div>
                  <div className='friend_invite-link-text'>Получить +10% от первой оплаты</div>
                  <div className='item-tag gradient_green d-flex align-items-center justify-content-center position-absolute'>Новое</div>
                </div>
              </Link>
              <div className='profile_nav'>
                <button
                  className={`btn btn_profile d-flex align-items-center justify-content-between w-100 ${
                    activeTab === "goods" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("goods")}>
                  <div className='btn_profile-name'>Мои товары</div>
                </button>
                <button
                  className={`btn btn_profile d-flex align-items-center justify-content-between w-100 ${
                    activeTab === "purchases" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("purchases")}>
                  <div className='btn_profile-name'>Покупки</div>
                </button>
                <button
                  className={`btn btn_profile d-flex align-items-center justify-content-between w-100 ${
                    activeTab === "sales" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("sales")}>
                  <div className='btn_profile-name'>Продажи</div>
                </button>
                <Link href='/sell' className='btn btn_profile d-flex align-items-center justify-content-between w-100'>
                  <div className='btn_profile-name'>Выставить товар</div>
                </Link>
                <Exit />
              </div>
            </div>
            <div className='profile-content w-100'>
              {activeTab === "balance" && <Balance />}
              {activeTab === "goods" && <MyGoods />}
              {activeTab === "purchases" && <Purchases />}
              {activeTab === "sales" && <Sales />}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
