import { apiSlice } from "./apiSlice";
import { ORDERS_URL, CREATE_STRIPE_SESSION } from "../constants";
import { PAYPAL_URL } from "../constants";
// /api/orders

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: { ...order },
      }),
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        body: { ...details },
      }),
    }),
    getPayPalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    StripeCheckoutSession: builder.mutation({
      query: ({
        orderItems,
        itemsPrice,
        userID,
        shippingAddress,
        shippingPrice,
        taxPrice,
      }) => ({
        url: CREATE_STRIPE_SESSION,
        method: "POST",
        body: {
          orderItems,
          itemsPrice,
          userID,
          shippingAddress,
          shippingPrice,
          taxPrice,
        },
      }),
    }),
    getUserOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/myOrders`,
        keepUnusedDataFor: 5,
      }),
    }),
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: "PUT",
      }),
    }),
    deleteOrders : builder.mutation({
      query: ({id}) => ({
        url: `${ORDERS_URL}/orderDelete`,
        method: 'DELETE',
        body: {id},
      })
    })
  }),
});

export const {
  usePlaceOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useGetUserOrdersQuery,
  useGetOrdersQuery,
  useDeliverOrderMutation,
  useStripeCheckoutSessionMutation,
  useDeleteOrdersMutation
} = ordersApiSlice;
