import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productDetailReducer, productListReducer } from './reducer/productReducers'
import { cartReducer } from './reducer/cartReducers'

const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [] // if there is a cart in localStorage load it in the cart...This is so that the cart is in user's localStorage so every time the user logs, it is there

const initialState = {
    cart: { cartItems: cartItemsFromStorage }, // this will be kept locally
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;