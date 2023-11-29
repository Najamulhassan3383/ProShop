import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      cartItems: [],
    };

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        state.cartItems = state.items.map((item) =>
          item.id === existingItem.id ? newItem : item
        );
      } else {
        state.cartItems = [...state.items, newItem];
      }

      //calculate item price
      state.itemsPrice = addDecimals(
        state.items.reduce((total, item) => total + item.price * item.qty, 0)
      );
      //calculate shipping price, if order is over 100, shipping is free, else 10 dollars
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

      //calculate tax price (15% tax)
      state.taxPrice = addDecimals(
        Number((0.15 * state.itemsPrice).toFixed(2))
      );

      //calculate total price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      //store it in local storage
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
      
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
