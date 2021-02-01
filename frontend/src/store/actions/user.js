import * as actionTypes from "./types";
import axios from "../axios";

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: actionTypes.USER_LOGIN_REQUEST });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const { data } = await axios.post(
      "/api/v1/users/login",
      { email, password },
      config
    );
    dispatch({
      type: actionTypes.USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: actionTypes.USER_LOGIN_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: actionTypes.USER_REGISTER_REQUEST });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const { data } = await axios.post(
      "/api/v1/users/register",
      { name, email, password },
      config
    );
    dispatch({
      type: actionTypes.USER_REGISTER_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: actionTypes.USER_REGISTER_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: actionTypes.USER_LOGOUT });
  dispatch({ type: actionTypes.USER_DETAIL_RESET });
  dispatch({ type: actionTypes.ORDER_LIST_GET_MY_RESET });
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  dispatch({ type: actionTypes.USER_DETAIL_REQUEST });
  try {
    const {
      userInfo: { token },
    } = getState().user;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`/api/v1/users/${id}`, config);
    dispatch({
      type: actionTypes.USER_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch(
        logoutUserWhenExpired(error.response.data.msg, error.response.status)
      );
    }
    dispatch({
      type: actionTypes.USER_DETAIL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  dispatch({ type: actionTypes.USER_UPDATE_PROFILE_REQUEST });
  try {
    const {
      userInfo: { token },
    } = getState().user;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(`/api/v1/users/profile`, user, config);
    dispatch({
      type: actionTypes.USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: actionTypes.USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch(
        logoutUserWhenExpired(error.response.data.msg, error.response.status)
      );
    }
    dispatch({
      type: actionTypes.USER_UPDATE_PROFILE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logoutUserWhenExpired = (msg, statusCode) => (dispatch) => {
  if (msg === "jwt expired" && statusCode === 401) dispatch(logout());
};
