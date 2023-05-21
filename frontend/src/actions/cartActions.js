import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM
} from '../constants/cartConstants'
import axios from 'axios'

export const addToCart = (id, qty) => {
    return async (dispatch, getState) => {
        const { data } = await axios.get(`/api/products/${id}`)
        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                product: data._id,
                name:data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                quantity: qty
            }
        })
        localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems)) // storing the cart in localStorage as JSON string
    }
}

export const removeFromCart = (id) => {
    return async (dispatch, getState) => {
        const { data } = await axios.get(`/api/products/${id}`)
        dispatch({
            type: CART_REMOVE_ITEM,
            payload: {
                product: data._id
            }
        })
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems)) // storing the cart in localStorage as JSON string
    }
}