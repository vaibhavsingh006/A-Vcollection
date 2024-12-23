import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; // Import useParams hook to access route params
import { useProductContext } from "../contexts/ProductContext"; // Assuming your product context provides products
import Header from "./Header";
import Footer from "./Footer";
import SimilarProducts from "./SimilarProducts";
import { IoStar } from "react-icons/io5";
import { ToastContainer } from "react-toastify";

const ProductDetailPage = () => {
  const { productId } = useParams(); // Get the productId from the URL
  const { products, addToCart, setProceedToPayProduct } = useProductContext(); // Get products from context

  // Log productId and products to check if they're available
  console.log("Product ID from URL:", productId); // Log productId
  console.log("Products from context:", products); // Log products

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // State to track product quantity

  useEffect(() => {
    // Log useEffect trigger
    console.log("useEffect triggered for productId:", productId);

    // If products are not available or productId is invalid, do nothing
    if (!products || products.length === 0 || !productId) {
      return;
    }

    // Find the product based on the productId from the URL
    const selectedProduct = products.find((p) => p._id == productId);

    // Log the selected product
    console.log("Selected Product:", selectedProduct);

    // If product is found, set it
    if (selectedProduct) {
      setProduct(selectedProduct);
    } else {
      console.log("Product not found.");
    }
  }, [productId, products]); // Run when productId or products change

  // Render product details if available
  if (!product) {
    return <div>Loading...</div>; // Show loading while fetching the product
  }

  // Handle quantity increase and decrease
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // Ensure quantity doesn't go below 1
  };

  const handleAddToCart = () => {
    addToCart(product); // Add product to cart when button is clicked
  };

  return (
    <div>
      <Header />
      <ToastContainer/>

      <div className="text-start w-full md:w-auto pt-16 pl-16">
        <h1 className="text-5xl font-bold text-button-text">Product Details</h1>
        <p className="text-xl text-white mt-2">
          Dive into the details of our latest product. Uncover the
          craftsmanship, design, and uniqueness behind every piece.
        </p>
      </div>

      <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 py-9 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Product Image Section */}
          <div className="w-full my-auto">
            {/* Thumbnail Image Preview */}
            <div className=" h-64 w-64 sm:h-96 sm:w-96 mx-auto">
              <img
                src={product.image}
                alt={`Product preview`}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </div>

          {/* Product Info Section */}
          <div className="w-full">
            <p className="text-sm text-gray-500">
              <Link to={"/"}>Home</Link> / <Link to={"/shop"}>Shop</Link> /{" "}
              {product.name}
            </p>
            <h2 className="font-semibold text-3xl leading-9 text-white mt-4">
              {product.name}
            </h2>

            <div className="flex items-center gap-2 mt-4">
              <div className="flex gap-1">
                <IoStar />
                <IoStar />
                <IoStar />
                <IoStar />
              </div>
              <p className="font-medium text-sm text-gray-600 dark:text-white">
                4 / 5 ( {product.reviews || 23} reviews )
              </p>
            </div>

            <p className="font-normal text-base text-white mt-7">
              {product.description}
            </p>

            {/* Price Section */}
            <div className="flex items-center justify-between mt-6">
              <p className="font-semibold text-2xl text-white dark:text-white">{`$${product.price}`}</p>
              <button className="text-sm text-white bg-yellow-500 py-2 px-4 rounded-lg hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600">
                10% Off
              </button>
            </div>

            {/* Quantity Selector */}
            <div className="flex flex-row justify-between items-center mt-8">
              <p className="font-medium text-base text-white">
                Select quantity
              </p>
              <div className="flex items-center gap-2">
                <span
                  onClick={decreaseQuantity}
                  className="cursor-pointer border border-gray-300 rounded-md w-7 h-7 flex justify-center items-center"
                >
                  -
                </span>
                <input
                  id="counter"
                  aria-label="input"
                  className="border border-gray-300 text-center w-14 py-2 rounded-md"
                  type="text"
                  value={quantity}
                  readOnly
                />
                <span
                  onClick={increaseQuantity}
                  className="cursor-pointer border border-gray-300 rounded-md w-7 h-7 flex justify-center items-center"
                >
                  +
                </span>
              </div>
            </div>

            <hr className="my-4 bg-gray-200" />

            {/* Add to Cart Button */}
            <div className="grid grid-cols-2 gap-4">
              <button
                className="w-full font-semibold text-md sm:text-lg py-4 px-2 sm:px-4 text-primary-text bg-accent rounded-lg hover:bg-accent hover:opacity-60 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-none transition"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              <Link to={"/product-payment"}>
                <button
                  className="w-full font-semibold text-md sm:text-lg py-4 px-2 sm:px-4 text-secondary-background bg-primary-background rounded-lg hover:primary-background hover:opacity-60 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-none transition"
                  onClick={() => {
                    console.log(
                      "Selected Product ID Proceed to Pay:",
                      product._id
                    );
                    setProceedToPayProduct(product._id); // Set the product ID correctly
                  }}
                >
                  Proceed to Pay
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Adding One Section */}
      <div
        className="relative bg-cover bg-center mt-5 mx-auto"
        style={{
          backgroundImage:
            'url("https://images.pexels.com/photos/6969962/pexels-photo-6969962.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
          backgroundAttachment: "fixed",
          maxWidth: "100%",
          height: "60vh",
        }}
      >
        {/* Overlay to darken the background */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Text content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-start px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-center">
            Product Details <br />
            <p className="text-4xl md:text-5xl lg:text-6xl text-secondary-text">
              A closer look at our{" "}
              <span className="text-accent">exclusive piece</span>
            </p>
          </h1>
          <p className="text-md sm:text-lg md:text-xl lg:text-2xl font-medium w-[80%] sm:w-[90%] text-center text-secondary-text mb-6">
            Discover the story and features behind this product. Elevate your
            experience with detailed insights and visuals.
          </p>

          <p className="text-lg sm:text-xl md:text-2xl text-center mb-8">
            Ready to explore more?
          </p>
          <a
            href="/shop"
            className="bg-accent text-base sm:text-lg lg:text-xl text-gray-600 font-semibold py-3 px-6 hover:bg-White-text hover:text-button-hover transition-colors duration-300 rounded-lg"
          >
            Back to Shop
          </a>
        </div>
      </div>

      {/* <SimilarProducts /> */}
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
