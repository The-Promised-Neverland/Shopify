import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from '../constants/orderConstants'
import axios from 'axios'

export const createOrder = (order) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: ORDER_CREATE_REQUEST });

            const { userInfo } = getState().userLogin
            const config = {
                // https://www.freecodecamp.org/news/what-is-the-correct-content-type-for-json-request-header-mime-type-explained/
                headers: {
                    // This means when you're sending JSON to the server or receiving JSON from the server, you should always declare the Content-Type of the header as application/json as this is the standard that the client and server understand. Content-Type is required while sending post,put request as it requires sending data as json here
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}` // Taken by protect middleware
                },
            };

            const { data } = await axios.post(
                `/api/orders`,
                order, // to be accessed by req.body in orders controller
                config
            );
            dispatch({
                type: ORDER_CREATE_SUCCESS,
                payload: data,
            });

        } catch (error) {
            dispatch({
                type: ORDER_CREATE_FAIL,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
            });
        }
    };
};

export const getOrderDetails = (OrderId) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: ORDER_DETAILS_REQUEST });

            const { userInfo } = getState().userLogin
            const config = {
                // https://www.freecodecamp.org/news/what-is-the-correct-content-type-for-json-request-header-mime-type-explained/
                headers: {
                    // This means when you're sending JSON to the server or receiving JSON from the server, you should always declare the Content-Type of the header as application/json as this is the standard that the client and server understand.
                    Authorization: `Bearer ${userInfo.token}` // Taken by protect middleware
                },
            };

            const { data } = await axios.get(
                `/api/orders/${OrderId}`,
                config
            );
            dispatch({
                type: ORDER_DETAILS_SUCCESS,
                payload: data,
            });

        } catch (error) {
            dispatch({
                type: ORDER_DETAILS_FAIL,
                payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
            });
        }
    };
};
