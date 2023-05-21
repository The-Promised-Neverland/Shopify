import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find((eachItem) => eachItem.product === item.product)
            if (existItem) { // if item exists, just update it
                return {
                    ...state,
                    cartItems: state.cartItems.map((eachItem) => eachItem.product === existItem.product ? item : eachItem)
                }
            }
            else {  // else push it in cart
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((eachItem) => eachItem.product !== action.payload.product),
            };
        default:
            return state;
    }
}