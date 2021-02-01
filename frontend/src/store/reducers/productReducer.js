import * as actionTypes from "../actions/types";

const productListInitialState = {
  products: [],
  error: null,
  loading: false,
};

export const productListReducer = (state = productListInitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.PRODUCT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        products: payload,
        loading: false,
        error: null,
      };
    case actionTypes.PRODUCT_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

const productDetailInitialState = {
  product: {
    reviews: [],
  },
};

export const productDetailReducer = (
  state = productDetailInitialState,
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.PRODUCT_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        product: payload,
        loading: false,
        error: null,
      };
    case actionTypes.PRODUCT_DETAIL_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
