import { configureStore } from "@reduxjs/toolkit";
import {
  catalogMenu,
  modalChat,
  modalExit,
  modalFilter,
  modalLogin,
  modalPayment,
  modalPayout,
  modalPublished,
  modalReg,
  modalSettings,
} from "./reducers/modal";
import userReducer from "./userSlice";
import notificationsReducer from "./notificationsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationsReducer,
    modalLogin: modalLogin,
    modalReg: modalReg,
    catalogMenu: catalogMenu,
    modalExit: modalExit,
    modalSettings: modalSettings,
    modalChat: modalChat,
    modalPublished: modalPublished,
    modalFilter: modalFilter,
    modalPayment: modalPayment,
    modalPayout: modalPayout,
    // notification: notificationReducer,
    // loader: loaderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
