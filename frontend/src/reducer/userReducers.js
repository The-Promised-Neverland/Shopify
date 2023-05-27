import {
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_DETAILS_RESET,
} from "../constants/userContants";

export const userLoginReducer = (state = {}, action) => {
  // empty object
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true, userInfo: null };

    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }; // no more loading and action.payload is data passed from action to reducer

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }; // no more loading and returning error to reducer

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  // empty object
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true, userInfo: null };

    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }; // no more loading and action.payload is data passed from action to reducer

    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }; // no more loading and returning error to reducer

    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: null, orderList: [] }, action) => {
  // empty object
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true, user: null, orderList: [] };

    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload.user, orderList: action.payload.orderList }; // no more loading and action.payload is data passed from action to reducer

    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload }; // no more loading and returning error to reducer

    case USER_DETAILS_RESET:
      return { user: null, orderList: [] }

    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  // empty object
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true, userInfo: null };

    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload }; // to notify the success notification on screens component

    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };

    case USER_UPDATE_PROFILE_RESET:
      return { userInfo: null };

    default:
      return state;
  }
};
