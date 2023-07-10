import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : { cartItems: [], shippingAddress: {}, paymentMethod: 'Paypal' };

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;

            const existItem = state.cartItems.find((x) => x.product === item.product);


            if (existItem) {
                state.cartItems = state.cartItems.map((x) => x.product === existItem.product ? item : x);
            } else {
                state.cartItems = [...state.cartItems, item];
            }

            return updateCart(state);
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x.product !== action.payload);
            return updateCart(state);
        },
        saveShippingAddrress: (state, action) => {
            state.shippingAddress = action.payload;
            return updateCart(state);
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            return updateCart(state);
        },
        clearCartitems: (state, action) => {
            state.cartItems = [];
            return updateCart(state);
        }
    }
});

export const { addToCart, removeFromCart, saveShippingAddrress, savePaymentMethod , clearCartitems} = cartSlice.actions;

export default cartSlice.reducer;