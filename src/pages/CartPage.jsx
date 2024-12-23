import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AddToCartContainer from "../components/AddToCartContainer"; // Ensure correct path
import { ToastContainer } from "react-toastify";

const CartPage = () => {
  return (
    <div>
      <Header />
      <ToastContainer />
      <AddToCartContainer />
      <Footer />
    </div>
  );
};

export default CartPage;
