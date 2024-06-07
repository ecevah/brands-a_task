// store.js
"use client";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./apis/users";
import { productApi } from "./apis/product";
import selectedProductsReducer from "./apis/controller";

export const store = configureStore({
  reducer: {
    selectedProducts: selectedProductsReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      authApi.middleware,
      productApi.middleware
    );
  },
});

setupListeners(store.dispatch);

export { useLoginMutation, useRegisterMutation } from "./apis/users.js";

export {
  useAddProductMutation,
  useDeleteProductMutation,
  useFetchProductsQuery,
  useUpdateProductMutation,
} from "./apis/product.js";
