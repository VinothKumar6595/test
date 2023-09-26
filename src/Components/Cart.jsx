import React, { Fragment, useContext, useEffect } from "react";
import CartContext from "../Store/Cart-Context";
import { carturl } from "../utils/url";
const Cart = (props) => {
  useEffect(() => {
    fetch(carturl).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          ctx.setCart(data);
        });
      }
    });
  }, []);
  const ctx = useContext(CartContext);

  const placeOrderHandler = () => {
    fetch(carturl).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          ctx.setCart(data);
          data.map((item) => {
            fetch(`carturl/${item._id}`, {
              method: "DELETE",
            }).then((res) => {
              res.json().then(alert("Thanks For Purchase"));
            });
          });
        });
      }
    });
  };

  const cartList = ctx.cartItems.map((item) => {
    return (
      <li key={item._id} className="m-2">
        <span className="mr-2">MedicineName : {item.name}</span>
        <span className="mr-2">Quantity: {item.quantity}</span>
        <span className="mr-2">Price: {item.quantity * item.price}</span>
      </li>
    );
  });

  const totalAmount = ctx.cartItems.reduce((current, item) => {
    return current + Number(item.price * item.quantity);
  }, 0);

  return (
    <div className="bg-gray-400 flex flex-col items-center mt-64 pt-2 w-[560px] m-auto rounded-lg">
      <div>
        <ul>{cartList}</ul>
        <span>
          <h3 className="font-bold mt-10 ml-56">
            Total Amount - Rs.{totalAmount.toFixed(2)}
          </h3>
        </span>
      </div>
      <div className="mt-10 flex mb-10">
        <button
          className="mr-10 bg-blue-200 p-2 rounded-lg hover:bg-green-200"
          onClick={placeOrderHandler}
        >
          Place Order
        </button>
        <button className="ml-10 bg-blue-200 w-24 p-2 rounded-lg hover:bg-red-200">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Cart;
