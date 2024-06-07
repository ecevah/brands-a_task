// product.js
"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = "http://localhost:3001/";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("x-access-token", token);
      }
      return headers;
    },
  }),
  tagTypes: ["productApi"],
  endpoints: (builder) => ({
    fetchProducts: builder.query({
      providesTags: ["productApi"],
      query: () => ({
        url: "api/products",
        method: "GET",
      }),
    }),
    addProduct: builder.mutation({
      query: (product) => ({
        url: "api/products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["productApi"],
    }),
    updateProduct: builder.mutation({
      query: (product) => ({
        url: `api/products/${product.id}`,
        method: "PUT",
        body: product.id,
      }),
      invalidatesTags: ["productApi"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `api/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["productApi"],
    }),
  }),
});

export const {
  useFetchProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
