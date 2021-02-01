import * as actionTypes from './types';
import axios from '../axios';

export const fetchProductList = () => async (dispatch) => {
  dispatch({
    type: actionTypes.PRODUCT_LIST_REQUEST
  });
  try
  {
    const { data } = await axios.get('/api/v1/products');
    dispatch({
      type: actionTypes.PRODUCT_LIST_SUCCESS,
      payload: data
    });
  } catch (error)
  {
    dispatch({
      type: actionTypes.PRODUCT_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
}

export const fetchProductDetail = (id) => async (dispatch) => {
  dispatch({
    type: actionTypes.PRODUCT_DETAIL_REQUEST
  });
  try
  {
    const { data } = await axios.get(`/api/v1/products/${id}`);
    dispatch({
      type: actionTypes.PRODUCT_DETAIL_SUCCESS,
      payload: data
    });
  } catch (error)
  {
    dispatch({
      type: actionTypes.PRODUCT_DETAIL_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
}