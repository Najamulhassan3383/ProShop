import { apiSlice } from "./apiSlice.js";
import { USER_URL, BASE_URL } from "../constants.js";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: `/api/users/auth`,
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `{USER_URL}/logout`,
        method: "POST",
      }),
    }),

    register: builder.mutation({
      query: (credentials) => ({
        url: `${USER_URL}/`,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  usersApiSlice;
