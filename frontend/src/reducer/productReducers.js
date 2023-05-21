import {
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_REQUEST,
    PRODUCT_DETAIL_FAIL,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS
} from '../constants/productConstants'

export const productListReducer = (state = { products: [] }, action) => { // products currently is empty state
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] } // returning a state that request is send and loading and also sending an empty products array since no products exist as of now

        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload } // no more loading and action.payload is data passed from action to reducer

        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload } // no more loading and returning error to reducer
        default:
            return state
    }
}


export const productDetailReducer = (state = { product: {} }, action) => { // product details  currently is empty state and reviews is empty array 
    switch (action.type) {
        case PRODUCT_DETAIL_REQUEST:
            return { loading: true, product: {} } // returning a state that request is send and loading and also sending an empty products array since no products exist as of now

        case PRODUCT_DETAIL_SUCCESS:
            return { loading: false, product: action.payload } // no more loading and action.payload is data passed from action to reducer

        case PRODUCT_DETAIL_FAIL:
            return { loading: false, error: action.payload } // no more loading and returning error to reducer
        default:
            return state
    }
}
