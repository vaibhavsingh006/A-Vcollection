import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LikedProductContainer from "../components/LikedProductContainer";
import { ToastContainer } from "react-toastify";

const LikedProductsPage = () => {

  return (
    <>
      <Header />
      <ToastContainer />
      <LikedProductContainer/>
      <Footer />
    </>
  );
};

export default LikedProductsPage;
