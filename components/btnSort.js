import React from 'react'

export default function BtnSort() {
    return (
        <button className="btn btn_sorting d-flex align-items-center">
            Сначала новые
            <div className="btn_sorting-icon">
                <img src="../images/dropdown.svg" alt="" />
            </div>
        </button>
    )
}
