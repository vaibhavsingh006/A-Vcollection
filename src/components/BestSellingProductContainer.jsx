import React from "react";
import { useProductContext } from "../contexts/ProductContext"; // Import the custom hook
import ProductCardShop from "../components/ProductCardShop";
import { Link } from "react-router-dom";

const BestSellingProductContainer = () => {
  // Get the products and loading state from the context
  const { limitedbestsellingProducts } = useProductContext();

  return (
    <>
      {/* Render Best Selling when data is available */}
      <div className="container mx-auto pt-12 px-6 sm:px-10 bg-black-background text-button-text">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-8 gap-4 sm:gap-6">
          <div className="text-start">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-button-text">
              Best Selling Products
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mt-2">
              Explore our exclusive collection of products
            </p>
          </div>
          <div>
            <Link to={"/shop"}>
              <button className="bg-accent text-base sm:text-lg md:text-xl text-gray-600 font-semibold py-3 px-6 hover:bg-White-text hover:text-button-hover transition-colors duration-300 rounded-lg">
                Shop Now
              </button>
            </Link>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {limitedbestsellingProducts &&
          limitedbestsellingProducts.length > 0 ? (
            limitedbestsellingProducts.map((product) => (
              <ProductCardShop key={product._id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400 text-lg">
              No Best Selling Products Available
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BestSellingProductContainer;
