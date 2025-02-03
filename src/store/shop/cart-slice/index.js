import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { productId, quantity, price, image, name, pieces } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.productId === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cartItems.push({
          productId,
          quantity,
          price,
          image,
          name,
          pieces,
        });
      }
    },
    updateCartQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.productId === productId
      );
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
    deleteCartItem: (state, action) => {
      const { productId } = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== productId
      );
    },
    fetchCartItems: (state) => {
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      state.cartItems = cartItems;
    },
    saveCartItems: (state) => {
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const {
  addToCart,
  updateCartQuantity,
  deleteCartItem,
  fetchCartItems,
  saveCartItems,
} = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;