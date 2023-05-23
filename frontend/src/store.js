import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productDetailReducer, productListReducer } from './reducer/productReducers'
import { cartReducer } from './reducer/cartReducers'
import { userLoginReducer } from './reducer/userReducers'

const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [] // if there is a cart in localStorage load it in the cart...This is so that the cart is in user's localStorage so every time the user logs, it is there

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null // if there is userInfo in localStorage, load it in userInfoFromStorage..

const initialState = {
    cart: { cartItems: cartItemsFromStorage }, // this will be kept locally
    userLogin: { userInfo: userInfoFromStorage }
}
 
const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;