import {
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_REQUEST,
    USER_LOGOUT,
} from '../constants/userContants'
import axios from 'axios'

export const login = ({ email, password }) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: USER_LOGIN_REQUEST })

            const config = {
                // https://www.freecodecamp.org/news/what-is-the-correct-content-type-for-json-request-header-mime-type-explained/
                headers: {
                    'Content-Type': 'application/json'
                    // This means when you're sending JSON to the server or receiving JSON from the server, you should always declare the Content-Type of the header as application/json as this is the standard that the client and server understand.
                }
            }

            const { data } = await axios.post('/api/users/login', { email, password }, config); // userControllerAuth expects email and password
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data
            })
            localStorage.setItem('userInfo', JSON.stringify(getState().userLogin.userInfo)) // storing the userInfo in localStorage as JSON string
        } catch (error) {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            });
        }
    }
}

export const logout = () => {
    return async dispatch => {
        localStorage.removeItem('userInfo')  // removes the item from localstorage
        dispatch({
            type: USER_LOGOUT
        })
    }
}
