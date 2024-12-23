import React from "react";
import { useProductContext } from "../contexts/ProductContext";
import ProductCardShop from "./ProductCardShop";
import { Link } from "react-router-dom";

const NewArrivalsContainer = () => {
  const { limitednewarrivalsProducts = [] } = useProductContext();

  return (
    <div className="container mx-auto py-12 px-6 sm:px-10 bg-black-background text-button-text">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 sm:mb-8 gap-4 sm:gap-6">
        <div className="text-start">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-button-text">
            New Arrivals Products
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mt-2">
            Explore our exclusive new arrival collection of products
          </p>
        </div>
        <div>
          <Link to="/shop">
            <button className="bg-accent text-base sm:text-lg lg:text-xl text-gray-600 font-semibold py-3 px-6 hover:bg-White-text hover:text-button-hover transition-colors duration-300 rounded-lg">
              Shop Now
            </button>
          </Link>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {limitednewarrivalsProducts.length > 0 ? (
          limitednewarrivalsProducts.map((product) => (
            <ProductCardShop key={product._id} product={product} />
          ))
        ) : (
          <p className="text-center text-gray-400 col-span-full">
            No new arrivals available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default NewArrivalsContainer;