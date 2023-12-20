import { apiSlice } from "./apiSlice.js";
import { USER_URL } from "../constants.js";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: `${USER_URL}/auth`,
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
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
    profile: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/profile`,
        method: "put",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
} = usersApiSlice;
