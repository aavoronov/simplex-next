import React from "react";
import { MainLayout } from "../../layouts/MainLayout";
import Breadcrumbs from "@/components/breadcrumbs";
import BtnCopy from "@/components/btnCopy";
import { useAppDispatch, useAppSelector } from "@/utilities/hooks";
import { getCookie } from "cookies-next";
import { actionLoginTrue } from "@/store/actions/modal";
export default function Invite() {
  const { inviteToken } = useAppSelector((state) => state.user);
  const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL;
  const inviteUrl = `${clientUrl.substring(0, clientUrl.length - 1)}?invite=${inviteToken}`;
  const dispatch = useAppDispatch();
  const token = getCookie("simple-token");
  if (!token) {
    dispatch(actionLoginTrue());
  }

  return (
    <MainLayout title={"Пригласить друга"}>
      <div className='content-column'>
        <div className='container'>
          <Breadcrumbs currentCrumbs={["Пригласить друга"]} />
          <div className='invite-wrapper d-grid'>
            <div className='invite-content'>
              <div className='friend-invite_get gradient_green d-flex flex-column align-items-center justify-content-center text-center'>
                <div className='friend-invite_get-value'>+ 10 %</div>
                <div className='friend-invite_get-text'>Вы получите, если купят этот товар</div>
              </div>
              <div className='invite-share'>
                <div className='invite-share-name'>Ссылка на приглашение</div>
                <div className='invite-share_row d-flex align-items-center justify-content-between'>
                  <div className='invite-share_link'>{inviteUrl}</div>
                  <BtnCopy onClick={() => navigator.clipboard.writeText(inviteUrl)} />
                </div>
                <button className='btn btn_invite-share d-flex align-items-center justify-content-center w-100'>Поделиться</button>
              </div>
              <div className='invite-statistics'>
                <div className='invite-statistics-income gradient d-flex align-items-center justify-content-between w-100'>
                  <div className='invite-statistics-income_name'>Доход</div>
                  <div className='invite-statistics-income_value'>1 000 ₽</div>
                </div>
                <div className='invite-statistics-title'>Статистика</div>
                <div className='invite-statistics_content'>
                  <div className='invite-statistics-item d-flex align-items-center justify-content-between'>
                    <div className='invite-statistics-item-name'>Регистрация</div>
                    <div className='invite-statistics-item-value'>20 111</div>
                  </div>
                  <div className='invite-statistics-item d-flex align-items-center justify-content-between'>
                    <div className='invite-statistics-item-name'>Оплаты</div>
                    <div className='invite-statistics-item-value'>20 111</div>
                  </div>
                </div>
              </div>
            </div>
            <div className='sell-start_banner gradient_green w-100 position-relative'>
              <div className='sell-start_banner-text w-100 mx-auto text-center'>
                Вы также можете зарабатывать приглашая своих друзей на наш сайт
              </div>

              <img className='s_dec1 position-absolute' src='../images/s_dec1.svg' alt='' />
              <img className='s_dec2 position-absolute' src='../images/s_dec2.svg' alt='' />
              <img className='s_dec3 position-absolute' src='../images/s_dec3.png' alt='' />
              <img className='s_dec5 position-absolute' src='../images/s_dec5.svg' alt='' />
              <div className='s_dec-smile position-absolute'>
                <img className='s_dec4' src='../images/s_dec4.svg' alt='' />
                <img className='s_star1 position-absolute' src='../images/s_star1.svg' alt='' />
                <img className='s_star2 position-absolute' src='../images/s_star2.svg' alt='' />
                <img className='s_star3 position-absolute' src='../images/s_star3.svg' alt='' />
                <img className='s_star4 position-absolute' src='../images/s_star4.svg' alt='' />
                <img className='s_star5 position-absolute' src='../images/s_star5.svg' alt='' />
                <img className='s_star6 position-absolute' src='../images/s_star6.svg' alt='' />
              </div>
            </div>
          </div>
          <div className='invite-triggers'>
            <div className='invite-triggers-title'>Условия</div>
            <div className='invite-triggers-content d-grid'>
              <div className='invite-triggers-item d-flex align-items-start justify-content-between'>
                <div className='invite-triggers-item-icon d-flex align-items-center justify-content-center'>
                  <img src='../images/tr1.svg' alt='' />
                </div>
                <div className='invite-triggers-item-info'>
                  <div className='invite-triggers-item-name'>Зачисление рублями, никаких бонусов</div>
                  <div className='invite-triggers-item-text'>
                    Награда зачисляется рублями на ваш баланс на сайте. Вы можете потратить средства на покупки, вывести нельзя
                  </div>
                </div>
              </div>
              <div className='invite-triggers-item d-flex align-items-start justify-content-between'>
                <div className='invite-triggers-item-icon d-flex align-items-center justify-content-center'>
                  <img src='../images/tr2.svg' alt='' />
                </div>
                <div className='invite-triggers-item-info'>
                  <div className='invite-triggers-item-name'>10% от первой оплаты</div>
                  <div className='invite-triggers-item-text'>
                    Например, пользователь зарегистрировался по вашей ссылке и сделал покупку на 1000 ₽. Вы получите 100 ₽. Если он совершит
                    еще одну покупку, вы не получите бонус
                  </div>
                </div>
              </div>
              <div className='invite-triggers-item d-flex align-items-start justify-content-between'>
                <div className='invite-triggers-item-icon d-flex align-items-center justify-content-center'>
                  <img src='../images/tr3.svg' alt='' />
                </div>
                <div className='invite-triggers-item-info'>
                  <div className='invite-triggers-item-name'>Новые пользователи</div>
                  <div className='invite-triggers-item-text'>
                    Награда приходит за тех, кто регистрируется на Playerok по вашей ссылке. Уже зарегистрированные пользователи засчитаны
                    не будут
                  </div>
                </div>
              </div>
              <div className='invite-triggers-item d-flex align-items-start justify-content-between'>
                <div className='invite-triggers-item-icon d-flex align-items-center justify-content-center'>
                  <img src='../images/tr4.svg' alt='' />
                </div>
                <div className='invite-triggers-item-info'>
                  <div className='invite-triggers-item-name'>Злоупотребление запрещено</div>
                  <div className='invite-triggers-item-text'>
                    Нельзя создать вторые аккаунты. Ваш профиль будет заблокирован, а средства заморожены
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
