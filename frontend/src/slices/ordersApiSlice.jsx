import apiSlice from "./apiSlice";
import { BASE_URL, ORDER_URL } from "../constants.js";

const ordersApiSlice = apiSlice.injectEndpoints({
  endpoint: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: `${BASE_URL}${ORDER_URL}`,
        method: "POST",
        body: { ...order },
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = ordersApiSlice;
