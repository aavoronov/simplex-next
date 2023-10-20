import React from 'react'
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="container">
          <div className="footer-content-inner d-flex align-items-start justify-content-between">
            <div className="footer-left">
              <Link className="footer-logo d-block" href="/">
                <img src="../images/logo.svg" alt="" />
                <p className='text-uppercase text-end'>Играем вместе</p>
              </Link>
              <div className="footer-left-text">
                Simple — самый быстрорастущий магазин приложений и платформа распространения в мире. Мы глобальная платформа для глобальных талантов. Присоединяйтесь к нам.
              </div>
            </div>
            <div className="footer-center">
              <div className="footer-item">
                <div className="footer-title">Мы в соц. сетях</div>
                <div className="footer-item-row d-flex align-items-center">
                  <a className="social-item d-flex align-items-center justify-content-center" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" fill="none">
                      <g clipPath="url(#a)">
                        <path fill="#BDBDBD" d="m5.067 5.7.282-1.835H3.614v-1.17a.915.915 0 0 1 1.032-.99h.798V.143A9.58 9.58 0 0 0 4.026.017c-1.45 0-2.395.868-2.395 2.469v1.38H.021V5.7h1.61v4.303h1.983V5.701h1.453Z" />
                      </g>
                      <defs>
                        <clipPath id="a">
                          <path fill="#fff" d="M0 0h5.427v10H0z" />
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                  <a className="social-item d-flex align-items-center justify-content-center" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" fill="none">
                      <path fill="#BDBDBD" d="M11.925 1.196c-.388.172-.797.29-1.215.353.196 0 .483-.391.603-.537.18-.228.316-.488.4-.768V.183a.067.067 0 0 0-.068 0c-.455.247-.939.435-1.44.56a.09.09 0 0 1-.098 0c-.046-.046-.083-.092-.129-.13a2.444 2.444 0 0 0-.701-.43A2.31 2.31 0 0 0 8.206.006a2.442 2.442 0 0 0-1.011.292c-.317.168-.597.4-.823.683-.236.29-.404.631-.49.998a2.897 2.897 0 0 0 0 1.052c0 .061 0 .069-.045.061A7.635 7.635 0 0 1 .88.521C.82.459.79.459.745.52a2.587 2.587 0 0 0 .43 3.024c.095.095.196.185.302.269a2.568 2.568 0 0 1-.958-.27c-.06 0-.083 0-.09.047a1.28 1.28 0 0 0 0 .292c.06.456.24.887.52 1.249.28.362.65.64 1.071.808.1.049.207.083.317.1a2.662 2.662 0 0 1-.943 0c-.068 0-.09 0-.068.092.161.427.428.806.774 1.099.346.292.76.49 1.202.574h.264c-.218.345-.988.599-1.342.73a4.75 4.75 0 0 1-2.045.268H.013c-.03 0 0 .046 0 .069 0 .023.287.176.43.26.435.234.893.42 1.366.554a7.144 7.144 0 0 0 3.75.12 7.226 7.226 0 0 0 3.31-1.801 7.556 7.556 0 0 0 1.528-2.55c.337-.946.484-1.95.434-2.954 0-.077.09-.123.143-.161.366-.294.691-.637.966-1.021a.31.31 0 0 0 .06-.192s-.023.046-.075.07Z" />
                    </svg>
                  </a>
                  <a className="social-item d-flex align-items-center justify-content-center" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none">
                      <path fill="#BDBDBD" d="M7.645 1.784a.583.583 0 1 0 0 1.166.583.583 0 0 0 0-1.166ZM5.038 2.536a2.466 2.466 0 1 0-.012 4.933 2.466 2.466 0 0 0 .012-4.933Zm0 4.041a1.58 1.58 0 1 1 0-3.16 1.58 1.58 0 0 1 0 3.16Z" />
                      <path fill="#BDBDBD" d="M6.997 10H3.01A3.009 3.009 0 0 1 0 6.997V3.003A3.009 3.009 0 0 1 3.003 0h3.994A3.009 3.009 0 0 1 10 3.003v3.994A3.009 3.009 0 0 1 6.997 10ZM3.01.945A2.064 2.064 0 0 0 .945 3.003v3.994a2.064 2.064 0 0 0 2.064 2.058h3.988a2.064 2.064 0 0 0 2.064-2.058V3.003A2.064 2.064 0 0 0 6.997.945H3.01Z" />
                    </svg>
                  </a>
                  <a className="social-item d-flex align-items-center justify-content-center" href="#">
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 3.13393C14 2.30276 13.6768 1.50563 13.1016 0.917905C12.5263 0.330179 11.7461 0 10.9326 0H3.06743C2.2539 0 1.47367 0.330179 0.898418 0.917905C0.323165 1.50563 0 2.30276 0 3.13393V6.86608C0 7.27763 0.0793398 7.68515 0.233492 8.06538C0.387644 8.4456 0.613581 8.79108 0.898418 9.0821C1.18325 9.37311 1.52141 9.60395 1.89357 9.76145C2.26572 9.91894 2.66461 10 3.06743 10H10.9326C11.3354 10 11.7343 9.91894 12.1064 9.76145C12.4786 9.60395 12.8167 9.37311 13.1016 9.0821C13.3864 8.79108 13.6124 8.4456 13.7665 8.06538C13.9207 7.68515 14 7.27763 14 6.86608V3.13393ZM9.38577 5.27679L5.89013 7.06251C5.75905 7.13393 5.28713 7.0625 5.28713 6.875V3.22322C5.28713 3.0625 5.75906 2.95536 5.89888 3.03572L9.26343 4.91072C9.37704 4.99107 9.52559 5.20536 9.38577 5.29464V5.27679Z" fill="#BDBDBD" />
                    </svg>
                  </a>
                  <a className="social-item d-flex align-items-center justify-content-center" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="13" fill="none">
                      <path fill="#BDBDBD" d="M.178 4.62h2.294v7.376H.178V4.62ZM1.33.956a1.33 1.33 0 1 1 0 2.659 1.33 1.33 0 0 1 0-2.66ZM3.89 4.62h2.198v1.005A2.432 2.432 0 0 1 8.252 4.44c2.326 0 2.748 1.524 2.748 3.51v4.053H8.714v-3.59c0-.811 0-1.954-1.192-1.954-1.191 0-1.378.932-1.378 1.897v3.647H3.858l.033-7.384Z" />
                    </svg>
                  </a>
                  <a className="social-item d-flex align-items-center justify-content-center" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="11" fill="none">
                      <path fill="#BDBDBD" d="M9 4.445h-.259c-.466 0-.925-.121-1.336-.353a2.857 2.857 0 0 1-1.014-.977v4.53a3.456 3.456 0 0 1-.532 1.859c-.35.551-.847.982-1.43 1.237a3.064 3.064 0 0 1-1.846.197 3.153 3.153 0 0 1-1.639-.909 3.394 3.394 0 0 1-.88-1.709 3.489 3.489 0 0 1 .175-1.932A3.317 3.317 0 0 1 1.41 4.882a3.096 3.096 0 0 1 1.773-.57h.195V5.96h-.195a1.566 1.566 0 0 0-.654.1c-.209.079-.4.202-.562.362a1.71 1.71 0 0 0-.38.566 1.776 1.776 0 0 0 0 1.354c.089.214.218.407.38.566.162.16.353.283.562.363.21.08.432.113.654.1a1.6 1.6 0 0 0 .642-.11c.205-.08.393-.202.554-.359.16-.156.289-.344.38-.553.09-.208.14-.434.148-.663V0h1.506c.067.686.363 1.325.836 1.804.473.48 1.093.77 1.75.818v1.835" />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="footer-item">
                <div className="footer-title">Способы оплаты</div>
                <div className="footer-item-row">
                  <img src="../images/pays.png" alt="" />
                </div>
              </div>
            </div>
            <div className="footer-right">
              <div className="footer-title">Информация</div>
              <div className="footer-menu">
                <ul className='list-none p-0 m-0'>
                  <li>
                    <Link className='text-decoration-none' href="/">Отзывы</Link>
                  </li>
                  <li>
                    <Link className='text-decoration-none' href="/">Пользовательское соглашение</Link>
                  </li>
                  <li>
                    <Link className='text-decoration-none' href="/">Cookie</Link>
                  </li>
                  <li>
                    <Link className='text-decoration-none' href="/">Условия продаж</Link>
                  </li>
                  <li>
                    <Link className='text-decoration-none' href="/">Агентский договор</Link>
                  </li>
                  <li>
                    <Link className='text-decoration-none' href="/">Поддержка</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="under-footer">
        <div className="container d-flex align-items-center justify-content-between">
          <div className="copyright">©2023 Simple. Все права защищены</div>
          <Link className='under-footer-link' href="/">Политика конфидециальности</Link>
          <a href="https://is-art.ru/" target="_blank" className="under-footer-link isart-link d-flex align-items-center text-decoration-none">
                Разработано
                <img className="isart-svg" src="../images/isart.svg" alt=""/>
            </a>
        </div>
      </div>
    </footer>
  )
}
