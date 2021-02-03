import * as actionTypes from "../actions/types";

const userInitialState = {
  loading: false,
  error: null,
  userInfo: null,
};

export const userReducer = (state = userInitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.USER_LOGIN_REQUEST:
    case actionTypes.USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.USER_LOGIN_SUCCESS:
    case actionTypes.USER_REGISTER_SUCCESS:
      return {
        ...state,
        userInfo: payload,
        loading: false,
        error: null,
      };
    case actionTypes.USER_LOGIN_FAILED:
    case actionTypes.USER_REGISTER_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case actionTypes.USER_LOGOUT:
      localStorage.removeItem("userInfo");
      return userInitialState;
    default:
      return state;
  }
};

const userDetailInitialState = {
  profile: null,
  loading: false,
  error: null,
};

export const userDetailReducer = (state = userDetailInitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.USER_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.USER_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: payload,
        error: null,
      };
    case actionTypes.USER_DETAIL_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case actionTypes.USER_DETAIL_RESET:
      return {
        profile: null,
      };
    default:
      return state;
  }
};

const userUpdateProfileInitialState = {
  profile: null,
  loading: false,
  error: null,
  success: false,
};

export const userUpdateProfileReducer = (
  state = userUpdateProfileInitialState,
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.USER_UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.USER_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: payload,
        success: true,
        error: null,
      };
    case actionTypes.USER_UPDATE_PROFILE_RESET:
      return {};
    case actionTypes.USER_UPDATE_PROFILE_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
        success: false,
      };
    default:
      return state;
  }
};

export const userListReducer = (
  state = { loading: true, users: [] },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.USER_GET_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.USER_GET_LIST_SUCCESS:
      return {
        ...state,
        users: payload,
        loading: false,
        error: null,
      };
    case actionTypes.USER_GET_LIST_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case actionTypes.USER_GET_LIST_RESET:
      return {
        users: [],
      };
    case actionTypes.USER_DELETE_FROM_STATE:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== payload),
      };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.USER_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.USER_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
      };
    case actionTypes.USER_DELETE_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.USER_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.USER_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
        message: "Updated user success",
      };
    case actionTypes.USER_UPDATE_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
        success: false,
        message: "",
      };
    case actionTypes.USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
