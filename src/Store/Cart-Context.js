import React from "react";

const CartContext = React.createContext({
  setCart: () => {},
  addToCart: () => {},
  addToProductList: () => {},
  setProducts: () => {},
  productList: [],
  cartItems: [],
});

export default CartContext;
