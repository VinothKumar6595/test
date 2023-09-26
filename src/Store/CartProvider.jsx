import React, { useState } from "react";
import CartContext from "./Cart-Context";
import { carturl, url } from "../utils/url";

const CartProvider = (props) => {
  const [productList, setProductsList] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const addListHandler = (item) => {
    fetch(url).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setProductsList(data);
        });
      } else {
        console.log("Error Getting Data");
      }
    });
  };
  const addToCartHandler = (item) => {
    fetch(carturl).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          console.log(data);
          setCartItems(data);
        });
      }
    });
  };
  const cartContext = {
    setProducts: setProductsList,
    setCart: setCartItems,
    addToCart: addToCartHandler,
    addToProductList: addListHandler,
    setProducts: setProductsList,
    productList: productList,
    cartItems: cartItems,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
