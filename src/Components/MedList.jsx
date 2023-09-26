import React, { Fragment, useContext, useEffect, useState } from "react";
import CartContext from "../Store/Cart-Context";
import Input from "./Input";
import { carturl, url } from "../utils/url";
import { useNavigate } from "react-router-dom";

const MedList = (props) => {
  const ctx = useContext(CartContext);
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const inputChangeHandler = (event) => {
    setInput(event.target.value);
  };
  useEffect(() => {
    fetch(url).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          ctx.setProducts(data);
        });
      }
    });
  }, []);
  const addToCartHandler = (item) => {
    fetch(carturl, {
      method: "POST",
      body: JSON.stringify({
        name: item.name,
        desc: item.desc,
        price: item.price,
        quantity: input,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          console.log(data);
          console.log("Added To Cart SuccessFully");
        });
      }
    });
    ctx.addToCart();
    navigate("/cart");
  };
  const listOfMed = ctx.productList.map((item) => {
    return (
      <li key={item._id} className="p-1.5 mt-10">
        <div className="bg-gray-400 p-2 rounded-lg">
          <span className="mr-2 font-bold">
            Medicine Name : {" " + item.name}
          </span>
          <span className="mr-2 font-semibold">
            Medicine Description : {item.desc}
          </span>
          <span className="mr-2 font-semibold">Price : {item.price}</span>
          <Input
            label="Quantity"
            input={{
              className: "w-16 ml-2 rounded-lg h-8 mt-2",
              id: "amount_" + props.id,
              type: "number",
            }}
            onChange={inputChangeHandler}
          />
          <button
            className="bg-blue-300 ml-56 mb-6 mt-2 p-1 rounded-lg"
            onClick={() => addToCartHandler(item)}
          >
            Add To Cart
          </button>
        </div>
      </li>
    );
  });

  return (
    <Fragment>
      <ul className="bg-gray-200 flex flex-col align-middle items-center ">
        {listOfMed}
      </ul>
    </Fragment>
  );
};

export default MedList;
