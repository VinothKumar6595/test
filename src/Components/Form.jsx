import React, { useContext } from "react";
import { useState } from "react";
import { url } from "../utils/url";
import { useNavigate } from "react-router-dom";
import CartContext from "../Store/Cart-Context";

const Form = () => {
  const ctx = useContext(CartContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };
  const [desc, setDesc] = useState("");
  const descChangeHandler = (event) => {
    setDesc(event.target.value);
  };
  const [price, setPrice] = useState("");
  const priceChangeHandler = (event) => {
    setPrice(event.target.value);
  };
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const myMed = {
      name: name,
      desc: desc,
      price: price,
    };
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(myMed),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    ctx.addToProductList(data);
    navigate("/products");
    console.log(data);
  };
  return (
    <div className=" bg-gray-200 flex justify-around align-middle p-4  ">
      {" "}
      <form onSubmit={formSubmitHandler}>
        <label className="mr-2" htmlFor="medName">
          Medicine Name
        </label>
        <input
          className="mr-2"
          type="text"
          id="medName"
          onChange={nameChangeHandler}
          value={name}
        />
        <label className="mr-2" htmlFor="desc">
          Description
        </label>
        <input
          className="mr-2"
          type="text"
          id="desc"
          onChange={descChangeHandler}
          value={desc}
        />
        <label className="mr-2" htmlFor="price">
          Price
        </label>
        <input
          className="mr-2"
          type="number"
          id="price"
          onChange={priceChangeHandler}
          value={price}
        />
        <button className="ml-24 bg-blue-300 p-1.5 rounded-lg">
          Add Medicine
        </button>
      </form>
    </div>
  );
};

export default Form;
