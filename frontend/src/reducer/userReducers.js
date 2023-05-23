import {
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
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
