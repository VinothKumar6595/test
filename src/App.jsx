import { Fragment } from "react";
import Form from "./Components/Form";
import Header from "./Components/Header";
import { Route, Routes } from "react-router-dom";
import MedList from "./Components/MedList";
import Cart from "./Components/Cart";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <Header />
            <Form />
          </div>
        }
      />
      <Route path="/products" element={<MedList />} />
      <Route
        path="/cart"
        element={
          <div>
            <Header />
            <Cart />
          </div>
        }
      />
    </Routes>
  );
}
