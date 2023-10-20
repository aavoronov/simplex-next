import React from "react";

export default function OneClick({ onClick }: { onClick: () => void }) {
  return (
    <button className='btn btn_submit gradient d-flex align-items-center justify-content-center' onClick={onClick}>
      Зарегистрироваться
    </button>
  );
}
