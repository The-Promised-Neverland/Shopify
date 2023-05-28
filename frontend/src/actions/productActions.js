import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DELETE_SUCCESS,
} from "../constants/productConstants";
import axios from "axios";

export const listProducts = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const { data } = await axios.get("/api/products");
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const listProductDetails = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_DETAIL_REQUEST });
      const { data } = await axios.get(`/api/products/${id}`);
      dispatch({
        type: PRODUCT_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAIL_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};


/******************************ADMIN ACCESS************************************* */

export const deleteProduct_ADMINS_ONLY = (ProductID) => {
  return async (dispatch, getState) => {
    try {
      const { userInfo } = getState().userLogin;

      const config = {
        // https://www.freecodecamp.org/news/what-is-the-correct-content-type-for-json-request-header-mime-type-explained/
        headers: {
          // This means when you're sending JSON to the server or receiving JSON from the server, you should always declare the Content-Type of the header as application/json as this is the standard that the client and server understand. Content-Type is required while sending post,put request as it requires sending data as json here
          Authorization: `Bearer ${userInfo.token}`, // Taken by protect middleware
        },
      }
      const { data } = await axios.delete(`/api/products/delete/${ProductID}`, config);
      dispatch({
        type: PRODUCT_DELETE_SUCCESS,
        payload: {
          PRODUCT_ID_Delete: data._id
        },
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAIL_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
