import React from "react";
import { Link } from "react-router-dom";
import { useProductContext } from "../contexts/ProductContext";
import ProductCardShop from "./ProductCardShop";

const LikedProductContainer = () => {
  const { likedProducts, products } = useProductContext(); // Access context

  // Filter liked products
  const likedProductList = products.filter(
    (product) => likedProducts[product._id]
  );
  return (
    <div className="container py-8 sm:py-10 px-6 sm:px-10 lg:px-20 w-full">
      <div className="text-center mb-8 w-full md:w-auto">
        <h1 className="text-4xl font-bold mt-12 text-secondary-background">
          Liked Products
        </h1>
        <p className=" w-[80%] mx-auto text-lg text-secondary-background mt-4">
          These are your favorite picks! Explore the products you love and
          revisit the ones that caught your attention. Don't miss out on owning
          these handpicked selections, tailored to your style and preferences.
          Shop now and make them yours today!
        </p>
      </div>
      {likedProductList.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {likedProductList.map((product) => (
            <ProductCardShop key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="w-full text-center">
          <p className="text-gray-600 mx-auto">
            You have not liked any products yet.
            <Link to={"/shop"}>
              <span className="text-accent"> Go to Store</span>
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default LikedProductContainer;
