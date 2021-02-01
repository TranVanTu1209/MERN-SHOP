import * as actionTypes from "../actions/types";

const initialState = {
  cartItems: [],
  shippingAddress: {},
  paymentMethod: "",
};

export const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.CART_ADD_ITEM:
      const existItem = state.cartItems.find(
        (it) => it.product === payload.product
      );
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((it) =>
            it.product === existItem.product ? payload : it
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, payload],
        };
      }
    case actionTypes.CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.product !== payload),
      };
    case actionTypes.CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: payload,
      };
    case actionTypes.CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: payload,
      };
    case actionTypes.CART_CLEAR_ITEMS:
      localStorage.removeItem("cartItems");
      localStorage.removeItem("shippingAddress");
      return {
        cartItems: [],
        shippingAddress: {},
        paymentMethod: "",
      };
    default:
      return state;
  }
};
