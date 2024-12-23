import React from 'react';
import SliderHome from "../components/SliderHome";
import Header from "../components/Header";
import DiscountCoupon from '../components/DiscountCoupon';
import Poster from "../components/Poster"; 
// import Shopping from '../components/shopping';
import HeroBack from '../components/HeroBack';
import Footer from '../components/Footer';
import PrimaryCategoryHome from '../components/PrimaryCategoryHome';
import GalleryHome from '../components/GalleryHome';
import BestSellingProductContainer from '../components/BestSellingProductContainer';
import NewArrivalsContainer from '../components/NewArrivelsContainer';
import { ToastContainer } from 'react-toastify';

function HomePage() {
  return (
    <>
      <Header />
      <ToastContainer />
      <SliderHome />
      {/* <DiscountCoupon/> */}
      <PrimaryCategoryHome/>
      <Poster/>
      <GalleryHome/>
      <BestSellingProductContainer/>
      <NewArrivalsContainer/>
      {/* <Shopping/> */}
      <HeroBack/>
      <Footer/>
    </>
  );
}

export default HomePage;
