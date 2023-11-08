import {
  ACTION_LOGIN,
  ACTION_LOGIN_FALSE,
  ACTION_LOGIN_TRUE,
  ACTION_REGISTRATION,
  ACTION_REGISTRATION_FALSE,
  ACTION_REGISTRATION_TRUE,
  ACTION_CATALOG,
  ACTION_CATALOG_FALSE,
  ACTION_CATALOG_TRUE,
  ACTION_EXIT,
  ACTION_EXIT_FALSE,
  ACTION_EXIT_TRUE,
  ACTION_SETTINGS,
  ACTION_SETTINGS_FALSE,
  ACTION_SETTINGS_TRUE,
  ACTION_CHAT,
  ACTION_CHAT_FALSE,
  ACTION_CHAT_TRUE,
  ACTION_PUBLISHED,
  ACTION_PUBLISHED_FALSE,
  ACTION_PUBLISHED_TRUE,
  ACTION_FILTER,
  ACTION_FILTER_FALSE,
  ACTION_FILTER_TRUE,
  ACTION_PAYMENT,
  ACTION_PAYMENT_FALSE,
  ACTION_PAYMENT_TRUE,
  ACTION_PAYOUT,
  ACTION_PAYOUT_FALSE,
  ACTION_PAYOUT_TRUE,
  ACTION_REVIEW_FORM,
  ACTION_REVIEW_FORM_FALSE,
  ACTION_REVIEW_FORM_TRUE,
} from "../actions/modal";

const initState = false;

export const modalLogin = (state = initState, action) => {
  switch (action.type) {
    case ACTION_LOGIN:
      return !state;
    case ACTION_LOGIN_FALSE:
      return false;
    case ACTION_LOGIN_TRUE:
      return true;
    default:
      return state;
  }
};

export const modalReg = (state = initState, action) => {
  switch (action.type) {
    case ACTION_REGISTRATION:
      return !state;
    case ACTION_REGISTRATION_FALSE:
      return false;
    case ACTION_REGISTRATION_TRUE:
      return true;
    default:
      return state;
  }
};

export const catalogMenu = (state = initState, action) => {
  switch (action.type) {
    case ACTION_CATALOG:
      return !state;
    case ACTION_CATALOG_FALSE:
      return false;
    case ACTION_CATALOG_TRUE:
      return true;
    default:
      return state;
  }
};

export const modalExit = (state = initState, action) => {
  switch (action.type) {
    case ACTION_EXIT:
      return !state;
    case ACTION_EXIT_FALSE:
      return false;
    case ACTION_EXIT_TRUE:
      return true;
    default:
      return state;
  }
};

export const modalSettings = (state = initState, action) => {
  switch (action.type) {
    case ACTION_SETTINGS:
      return !state;
    case ACTION_SETTINGS_FALSE:
      return false;
    case ACTION_SETTINGS_TRUE:
      return true;
    default:
      return state;
  }
};

export const modalChat = (state = !initState, action) => {
  switch (action.type) {
    case ACTION_CHAT:
      return !state;
    case ACTION_CHAT_FALSE:
      return false;
    case ACTION_CHAT_TRUE:
      return true;
    default:
      return state;
  }
};

export const modalPublished = (state = initState, action) => {
  switch (action.type) {
    case ACTION_PUBLISHED:
      return !state;
    case ACTION_PUBLISHED_FALSE:
      return false;
    case ACTION_PUBLISHED_TRUE:
      return true;
    default:
      return state;
  }
};

export const modalReviewForm = (state = !initState, action) => {
  switch (action.type) {
    case ACTION_REVIEW_FORM:
      return !state;
    case ACTION_REVIEW_FORM_FALSE:
      return false;
    case ACTION_REVIEW_FORM_TRUE:
      return true;
    default:
      return state;
  }
};

export const modalFilter = (state = initState, action) => {
  switch (action.type) {
    case ACTION_FILTER:
      return !state;
    case ACTION_FILTER_FALSE:
      return false;
    case ACTION_FILTER_TRUE:
      return true;
    default:
      return state;
  }
};

export const modalPayment = (state = initState, action) => {
  switch (action.type) {
    case ACTION_PAYMENT:
      return !state;
    case ACTION_PAYMENT_FALSE:
      return false;
    case ACTION_PAYMENT_TRUE:
      return true;
    default:
      return state;
  }
};

export const modalPayout = (state = initState, action) => {
  switch (action.type) {
    case ACTION_PAYOUT:
      return !state;
    case ACTION_PAYOUT_FALSE:
      return false;
    case ACTION_PAYOUT_TRUE:
      return true;
    default:
      return state;
  }
};
