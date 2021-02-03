import * as actionTypes from "./types";
import axios from "../axios";

export const fetchProductList = () => async (dispatch) => {
  dispatch({
    type: actionTypes.PRODUCT_LIST_REQUEST,
  });
  try {
    const { data } = await axios.get("/api/v1/products");
    dispatch({
      type: actionTypes.PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchProductDetail = (id) => async (dispatch) => {
  dispatch({
    type: actionTypes.PRODUCT_DETAIL_REQUEST,
  });
  try {
    const { data } = await axios.get(`/api/v1/products/${id}`);
    dispatch({
      type: actionTypes.PRODUCT_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PRODUCT_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  dispatch({
    type: actionTypes.PRODUCT_DELETE_REQUEST,
  });
  try {
    const {
      userInfo: { token },
    } = getState().user;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    };
    await axios.delete(`/api/v1/products/${id}`, config);
    dispatch({
      type: actionTypes.PRODUCT_DELETE_FROM_STATE,
    });
    dispatch({
      type: actionTypes.PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = (product) => async (dispatch, getState) => {
  dispatch({
    type: actionTypes.PRODUCT_CREATE_REQUEST,
  });
  try {
    const {
      userInfo: { token },
    } = getState().user;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    };
    const res = await axios.post(`/api/v1/products`, product, config);
    dispatch({
      type: actionTypes.PRODUCT_CREATE_ADD_TO_STATE,
      payload: res.data,
    });
    dispatch({
      type: actionTypes.PRODUCT_CREATE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
