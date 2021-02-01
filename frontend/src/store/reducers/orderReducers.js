import * as actionTypes from "../actions/types";

export const orderCreateReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.ORDER_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.ORDER_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        order: payload,
        success: true,
        error: null,
      };
    case actionTypes.ORDER_CREATE_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const orderDetailReducer = (
  state = { loading: true, order: null },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.ORDER_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        order: payload,
        error: null,
      };
    case actionTypes.ORDER_DETAIL_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.ORDER_PAY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.ORDER_PAY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
      };
    case actionTypes.ORDER_PAY_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case actionTypes.ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const orderListMyReducer = (
  state = { loading: true, orders: [] },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.ORDER_LIST_GET_MY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.ORDER_LIST_GET_MY_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: payload,
        error: null,
      };
    case actionTypes.ORDER_LIST_GET_MY_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case actionTypes.ORDER_LIST_GET_MY_RESET:
      return {
        orders: [],
      };
    default:
      return state;
  }
};
