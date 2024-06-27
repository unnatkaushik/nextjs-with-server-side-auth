import { RootState } from "@/redux/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../auth/authSlice";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5005/api/v1/",
  }),
  endpoints: (builder) => ({
    refreshToken: builder.query({
      query: () => ({
        url: "auth/refresh/",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});
export const { useRefreshTokenQuery } = apiSlice;
