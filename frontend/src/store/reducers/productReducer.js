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
        products: payload.products,
        loading: false,
        error: null,
        pages: payload.pages,
        page: payload.page,
      };
    case actionTypes.PRODUCT_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case actionTypes.PRODUCT_DELETE_FROM_STATE:
      return {
        ...state,
        products: state.products.filter((product) => product._id !== payload),
      };
    case actionTypes.PRODUCT_CREATE_ADD_TO_STATE:
      return {
        ...state,
        products: [payload, ...state.products],
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
    case actionTypes.PRODUCT_CREATE_REVIEW_IN_STATE:
      return {
        loading: false,
        product: payload,
      };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.PRODUCT_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
      };
    case actionTypes.PRODUCT_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.PRODUCT_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
      };
    case actionTypes.PRODUCT_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const productUpdateReducer = (
  state = {
    loading: false,
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.PRODUCT_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
      };
    case actionTypes.PRODUCT_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const productCreateReviewReducer = (
  state = {
    loading: false,
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.PRODUCT_CREATE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.PRODUCT_CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
      };
    case actionTypes.PRODUCT_CREATE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
