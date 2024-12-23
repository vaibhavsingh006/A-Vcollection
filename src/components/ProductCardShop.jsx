import React, { useState, useCallback, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useProductContext } from "../contexts/ProductContext"; // Import the context
import "react-toastify/dist/ReactToastify.css";

const ProductCardShop = ({ product }) => {
  const {
    likedProducts = {},
    toggleLikeProduct,
    addToCart,
  } = useProductContext(); // Default to empty object if undefined
  const [showFullTitle, setShowFullTitle] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Memoize truncateText function to avoid unnecessary recalculations
  const truncateText = useCallback((text, charLimit) => {
    return text.length > charLimit ? text.slice(0, charLimit) + "..." : text;
  }, []);

  // Detect screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640); // `sm` breakpoint is 640px in Tailwind
    };

    handleResize(); // Check initial screen size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle like/unlike toggle and show toast message
  const handleLikeToggle = useCallback(
    (productId) => {
      const isLiked = likedProducts[productId]; // Check current like status

      toggleLikeProduct(productId); // Toggle like state in the context

      // Show appropriate toast message based on current like status
      toast(isLiked ? "Product unliked!" : "Product liked!", {
        type: isLiked ? "error" : "success", // Use error for unliked and success for liked
      });
    },
    [likedProducts, toggleLikeProduct]
  );

  // Handle text truncation for title on small screens
  const titleContent = isSmallScreen ? (
    <>
      {showFullTitle ? product.name : truncateText(product.name, 40)}{" "}
      {!showFullTitle && product.name.length > 40 && (
        <span
          className="text-gray-800 cursor-pointer ml-2 text-md"
          onClick={() => setShowFullTitle(true)}
        >
          ...
        </span>
      )}
      {showFullTitle && (
        <span
          className="text-gray-800 cursor-pointer ml-2 text-sm font-semibold"
          onClick={() => setShowFullTitle(false)}
        >
          less
        </span>
      )}
    </>
  ) : (
    product.name
  );

  // Handle text truncation for description
  const descriptionContent = isExpanded
    ? product.description
    : truncateText(product.description, 40);

  const handleDescriptionToggle = () => setIsExpanded((prev) => !prev);

  const handleAddToCart = () => {
    addToCart(product); // Add product to cart when button is clicked
    toast("Product added to cart!", {
      type: "success", // Show success toast for adding to cart
    });
  };

  return (
    <div className="max-w-sm w-full bg-white border border-gray-200 overflow-hidden relative rounded-xl">
      {/* Best Selling Badge */}
      {String(product.bestselling).toLowerCase() === "yes" && (
        <div className="absolute top-2 left-2 bg-accent text-primary-text px-2 sm:px-4 py-2 text-sm sm:text-md font-semibold rounded-lg">
          Best Selling
        </div>
      )}

      {/* Product Image with Link */}
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={`Image of ${product.name}`} // More descriptive alt text
          className="w-full h-44 sm:h-64 object-cover"
        />
      </Link>

      {/* Like Button */}
      <div className="absolute right-2 sm:right-4 top-0">
        <button
          onClick={() => handleLikeToggle(product._id)}
          className={`text-2xl mt-2 sm:mt-4 ${
            likedProducts[product._id] ? "text-red-500" : "text-gray-400"
          }`}
          type="button"
          aria-label="Toggle like"
        >
          {likedProducts[product._id] ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      {/* Product Details */}
      <div className="p-2 sm:p-4">
        <h3 className="text-md sm:text-lg font-bold text-gray-800">
          {titleContent}
        </h3>
        <p className="text-sm text-gray-600 mt-2">
          {descriptionContent}
          {!isExpanded && product.description.length > 40 && (
            <span
              className="text-blue-500 cursor-pointer ml-2"
              onClick={handleDescriptionToggle}
            >
              Read more
            </span>
          )}
        </p>
        {isExpanded && (
          <span
            className="text-blue-500 cursor-pointer ml-2"
            onClick={handleDescriptionToggle}
          >
            Show less
          </span>
        )}
        <div className="flex justify-between items-center mt-4">
          <div>
            <p className="text-sm sm:text-xl font-bold text-gray-900">
              ${product.price}
            </p>
          </div>
          <div>
            <button
              className="bg-accent text-[12px] sm:text-sm text-gray-600 font-semibold py-2 px-2 sm:px-4 hover:bg-White-text hover:text-button-hover transition-colors duration-300 rounded-lg"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardShop;