import {
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_REQUEST,
    USER_LOGOUT,
} from '../constants/userContants'

export const userLoginReducer = (state = {}, action) => { // empty object
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true, userInfo: {} }

        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload } // no more loading and action.payload is data passed from action to reducer

        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload } // no more loading and returning error to reducer

        case USER_LOGOUT:
            return {}
            
        default:
            return state
    }
}