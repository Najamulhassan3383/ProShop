import { PRODUCT_URL } from "../constants";

import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCT_URL,
      }),

      keepUnusedDataFor: 5,
    }),
    getProduct: builder.query({
      query: (id) => ({
        url: `${PRODUCT_URL}/${id}`,
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productApiSlice;
