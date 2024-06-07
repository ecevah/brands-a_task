import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  quantity: 0,
  total: 0,
};

const selectedProduct = createSlice({
  name: "selectedProduct",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      state.quantity = 0;
      state.total = 0;
    },
    removeItemById: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== id);
      state.total = state.cartItems.reduce((sum, item) => sum + item.price, 0);
    },
    addItem: (state, action) => {
      const newItem = action.payload;
      state.cartItems.push(newItem);
      state.total = state.cartItems.reduce((sum, item) => sum + item.price, 0);
    },
  },
});

export const { clearCart, removeItemById, addItem } = selectedProduct.actions;
export default selectedProduct.reducer;
