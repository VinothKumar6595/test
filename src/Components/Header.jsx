import React, { useContext, useState } from "react";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import { useNavigate } from "react-router-dom";
import CartContext from "../Store/Cart-Context";

const Header = () => {
  const ctx = useContext(CartContext);
  const navigate = useNavigate();
  const CartToggle = () => {
    navigate("/cart");
  };
  const cartQty = ctx.cartItems.reduce((current, item) => {
    return current + Number(item.quantity);
  }, 0);
  return (
    <header className="flex justify-between items-center bg-gray-400 h-20 ">
      <h1 className="text-2xl font-bold ml-10">MEDICINE INVENTORY</h1>
      <button
        className="bg-white p-2 rounded-2xl mr-10 hover:bg-black hover:text-white "
        onClick={CartToggle}
      >
        <span>
          <ShoppingCartTwoToneIcon />
        </span>
        <span>Your Cart</span>
        <span>{cartQty}</span>
      </button>
    </header>
  );
};

export default Header;
