import * as actionTypes from "./types";
import axios from "../axios";
import { logoutUserWhenExpired } from "./user";
import { clearCartItems } from "./cart";

export const createOrder = (data) => async (dispatch, getState) => {
  dispatch({
    type: actionTypes.ORDER_CREATE_REQUEST,
  });
  const {
    userInfo: { token },
  } = getState().user;
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.post("/api/v1/orders", data, config);
    dispatch({
      type: actionTypes.ORDER_CREATE_SUCCESS,
      payload: res.data,
    });
    dispatch(clearCartItems());
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch(
        logoutUserWhenExpired(error.response.data.msg, error.response.status)
      );
    }
    dispatch({
      type: actionTypes.ORDER_CREATE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetail = (orderId) => async (dispatch, getState) => {
  dispatch({
    type: actionTypes.ORDER_DETAIL_REQUEST,
  });
  const {
    userInfo: { token },
  } = getState().user;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.get(`/api/v1/orders/${orderId}`, config);
    dispatch({
      type: actionTypes.ORDER_DETAIL_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch(
        logoutUserWhenExpired(error.response.data.msg, error.response.status)
      );
    }
    dispatch({
      type: actionTypes.ORDER_DETAIL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: actionTypes.ORDER_PAY_REQUEST,
  });
  const {
    userInfo: { token },
  } = getState().user;
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.put(
      `/api/v1/orders/${orderId}/pay`,
      paymentResult,
      config
    );
    dispatch({
      type: actionTypes.ORDER_PAY_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch(
        logoutUserWhenExpired(error.response.data.msg, error.response.status)
      );
    }
    dispatch({
      type: actionTypes.ORDER_PAY_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getMyOrders = () => async (dispatch, getState) => {
  dispatch({
    type: actionTypes.ORDER_LIST_GET_MY_REQUEST,
  });
  const {
    userInfo: { token },
  } = getState().user;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.get(`/api/v1/orders/myorders`, config);
    dispatch({
      type: actionTypes.ORDER_LIST_GET_MY_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch(
        logoutUserWhenExpired(error.response.data.msg, error.response.status)
      );
    }
    dispatch({
      type: actionTypes.ORDER_LIST_GET_MY_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
