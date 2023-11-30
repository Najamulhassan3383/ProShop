export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};


export const updateCart = (state) => {
  //calculate item price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((total, item) => total + item.price * item.qty, 0)
  );
  //calculate shipping price, if order is over 100, shipping is free, else 10 dollars
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

  //calculate tax price (15% tax)
  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

  //calculate total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  //store it in local storage
    localStorage.setItem("cart", JSON.stringify(state));
    
    return state
}