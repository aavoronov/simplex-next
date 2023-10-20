import React from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import BtnSort from '../btnSort'
import Payment from '../modals/payment'
import Payout from '../modals/payout'
export default function Balance() {

  const filters = [
    'Операции',
    'Сумма',
    'Способ',
    'Сосстояие',
  ]

  return (
    <>
      <div className="profile-content_head d-flex align-items-center">
        <div className="balance-change d-flex align-items-center">
          <button className="btn btn_change">Пополнить</button>
          <button className="btn btn_change active">Выплата</button>
        </div>
      </div>
      <div className="balance_info">
        <div className="balance_value">4 000 ₽</div>
        <div className="balance_info-text">Доступно к выплате</div>
      </div>
      <form action="" className="cash-form d-grid align-items-center">
        <div className="field-container">
          <input type="text" placeholder='Введите сумму' />
        </div>
        <button className='btn btn_submit gradient w-100'>Создать выплату</button>
      </form>
      <div className="history_content history-balance_content">
        <div className="history-head d-flex align-items-center justify-content-between">
          <div className="history_title">История</div>
          <BtnSort />
        </div>
        <div className="filter-wrapper d-flex align-items-center">
          <button className="btn btn_filter d-flex align-items-center justify-content-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" fill="none">
              <g fill="#18130C" clipPath="url(#a)">
                <path d="M.667 3.667H2.49a2.485 2.485 0 0 0 4.796 0h8.046a.667.667 0 1 0 0-1.333H7.287a2.485 2.485 0 0 0-4.796 0H.667a.667.667 0 1 0 0 1.333Zm4.222-1.833a1.167 1.167 0 1 1 0 2.333 1.167 1.167 0 0 1 0-2.333ZM15.333 7.833H13.51a2.484 2.484 0 0 0-4.796 0H.667a.667.667 0 0 0 0 1.333h8.046a2.485 2.485 0 0 0 4.796 0h1.824a.667.667 0 1 0 0-1.333Zm-4.222 1.833a1.166 1.166 0 1 1 0-2.333 1.166 1.166 0 0 1 0 2.333ZM15.333 13.334H7.287a2.485 2.485 0 0 0-4.796 0H.667a.666.666 0 1 0 0 1.333H2.49a2.485 2.485 0 0 0 4.796 0h8.046a.667.667 0 1 0 0-1.333ZM4.89 15.167a1.167 1.167 0 1 1 0-2.333 1.167 1.167 0 0 1 0 2.333Z" />
              </g>
              <defs>
                <clipPath id="a">
                  <path fill="#fff" d="M0 .5h16v16H0z" />
                </clipPath>
              </defs>
            </svg>
          </button>
          <div className="filters-horizontal_items">
            <ScrollContainer className="filters_scroll d-flex align-items-center">
              {filters.map((value, i) =>
                <button key={i} className={`btn btn_filter-item`}>{value}</button>
              )}

            </ScrollContainer>
          </div>

        </div>

        <div className="history-table">
          <div className="history-table-item d-flex align-items-center justify-content-between w-100">
            <div className="history-table-item_name">Вывод средств</div>
            <div className="history-table-item_date">30.07.2023</div>
            <div className="history-table-item_time">12:00</div>
            <div className="history-table-item_sum burnt text-end">- 1 000 000 ₽</div>
          </div>
          <div className="history-table-item d-flex align-items-center justify-content-between w-100">
            <div className="history-table-item_name">Кэшбэк “Пригласи Друга”</div>
            <div className="history-table-item_date">30.07.2023</div>
            <div className="history-table-item_time">12:00</div>
            <div className="history-table-item_sum text-end">1 000 ₽</div>
          </div>
        </div>
      </div>
      <Payment />
      <Payout />
    </>
  )
}
