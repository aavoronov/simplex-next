import React, { useEffect, useState } from "react";
import Link from "next/link";
import ScrollContainer from "react-indiana-drag-scroll";
import BtnSort from "../btnSort";
import BtnDelete from "../btnDelete";
import { axiosQuery, currentDatetime } from "@/utilities/utilities";
import { useAppDispatch } from "@/utilities/hooks";
import { actionReviewForm } from "@/store/actions/modal";
import ReviewForm from "../modals/reviewForm";

interface Purchase {
  id: number;
  sum: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  productId: number;
  product: {
    id: number;
    name: string;
    description: string;
    price: string;
    status: "created" | "disputed" | "completed" | "cancelled";
    category: {
      name: string;
      app: {
        name: string;
        miniPic: string;
      };
    };
    reviews: { id: number }[];
  };
}

const Purchase = ({ purchase }: { purchase: Purchase }) => {
  const [status, setStatus] = useState(purchase.status);
  const [reviewLeft, setReviewLeft] = useState(!!purchase.product.reviews.length);
  const [reviewForm, setReviewForm] = useState(false);

  const dispatch = useAppDispatch();

  const changePurchaseStatus = async (status: "completed" | "disputed") => {
    const res = await axiosQuery({ url: `/purchases/${purchase.id}`, method: "patch", payload: { status: status } });
    setStatus(status);
  };

  const toggleReviewForm = () => {
    setReviewForm((prev) => !prev);
  };

  const Status = () => {
    //   'created',
    // 'disputed',
    // 'completed',
    // 'cancelled',
    switch (status) {
      case "created":
        return (
          <>
            <button className='btn btn_deal btn_deal-confirm gradient_green' onClick={() => changePurchaseStatus("completed")}>
              Подтвердить
            </button>
            <button className='btn btn_deal btn_deal-tribunal' onClick={() => changePurchaseStatus("disputed")}>
              Оспорить
            </button>
          </>
        );
      case "completed":
        return (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
            <div className='item-tag gradient_green d-flex align-items-center justify-content-center mx-auto'>Подтвержден</div>
            <div
              onClick={() => {
                if (reviewLeft) return;
                toggleReviewForm();
              }}
              style={{
                cursor: reviewLeft ? "default" : "pointer",
              }}
              className='leave-review'>
              {reviewLeft ? "Отзыв оставлен" : "Оставить отзыв"}
            </div>
          </div>
        );
      case "disputed":
        return <div className='item-tag gradient d-flex align-items-center justify-content-center mx-auto'>Идет спор</div>;
      case "cancelled":
        return <div className='item-tag gradient d-flex align-items-center justify-content-center mx-auto'>Отменен</div>;
    }
  };

  return (
    <div className='history-table-item d-flex align-items-center justify-content-between w-100'>
      <div className='history-table-item_info'>
        <div className='history-table-item_info_num'>№{purchase.id}</div>
        <div className='history-table-item_info_date'>{currentDatetime(purchase.createdAt)}</div>
      </div>
      <div className='history-table-item_cat'>
        <Link href='/catalog/' className='product-cat d-flex'>
          <div className='product-cat-icon'>
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/apps/${purchase.product.category.app.miniPic}`}
              className='w-100 h-100'
              alt=''
            />
          </div>
          <div className='product-cat-info d-flex flex-column justify-content-between'>
            <div className='product-game-name'>{purchase.product.category.app.name}</div>
            <div className='product-cat-name'>{purchase.product.category.name}</div>
          </div>
        </Link>
      </div>
      <div className='history-table-item_name two-lines'>{purchase.product.name}</div>
      <div className='history-table-item_price text-center'>{purchase.sum} ₽</div>
      <div className='history-table-item_status'>
        <Status />
      </div>
      {reviewForm && (
        <ReviewForm productId={purchase.product.id} onClose={() => setReviewForm(false)} onReviewCreated={() => setReviewLeft(true)} />
      )}
    </div>
  );
};
export default function Purchases() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  const getPurchases = async () => {
    const res = await axiosQuery({ url: "/purchases/my" });
    setPurchases(res.data);
  };

  useEffect(() => {
    getPurchases();
  }, []);

  const filters = [
    { name: "Все", key: "all" },
    { name: "В обработке", key: "created" },
    { name: "Оспариваемые", key: "disputed" },
    { name: "Отмененные", key: "cancelled" },
    { name: "Завершенные", key: "completed" },
  ];
  const [filter, setFilter] = useState(filters[0]);

  return (
    <>
      <div className='profile-content_head d-flex align-items-center justify-content-between'>
        <div className='filter-wrapper d-flex align-items-center'>
          <div className='filters-horizontal_items'>
            <ScrollContainer className='filters_scroll d-flex align-items-center'>
              {filters.map((value, i) => (
                <button key={i} className={`btn btn_filter-item`} onClick={() => setFilter(value)}>
                  {value.name}
                </button>
              ))}
            </ScrollContainer>
          </div>
        </div>
        <BtnSort />
      </div>
      <div className='history_content history-purchases_content'>
        <div className='history-table'>
          {purchases
            .filter((item) => {
              return filter.key === filters[0].key || item.status === filter.key;
            })
            .map((item) => (
              <Purchase purchase={item} key={item.id} />
            ))}
        </div>
      </div>
    </>
  );
}
