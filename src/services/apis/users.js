import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = "http://localhost:3001/api/auth";

const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => {
    return {
      login: builder.mutation({
        query: (credentials) => ({
          url: "/loginbyusername",
          method: "POST",
          body: credentials,
        }),
        onSuccess: (data) => {
          document.cookie = `refresh-token=${data.refresh_token}`;
          localStorage.setItem("accessToken", data.access_token);
        },
      }),
      register: builder.mutation({
        query: (userData) => ({
          url: "/signup",
          method: "POST",
          body: userData,
        }),
      }),
    };
  },
});

export const { useLoginMutation, useRegisterMutation } = authApi;
export { authApi };
