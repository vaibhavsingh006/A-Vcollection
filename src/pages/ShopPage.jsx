import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import GalleryHome from "../components/GalleryHome";
import AllProductContainer from "../components/AllProductContainer";
import BestSellingProductContainer from "../components/BestSellingProductContainer";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useProductContext } from "../contexts/ProductContext"; // Import the custom hook
import Loader from "../components/Loader"; // Loader component to show loading state
import ProductCardShop from "../components/ProductCardShop";
const ITEMS_PER_PAGE = 8; // Number of products per page

function ShopPage() {
  // State to store the search query, selected category, and price filter
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");

  // Get the products and loading state from the context
  const { products, limitedProducts, limitedbestsellingProducts } =
    useProductContext();

  // Log the data whenever it changes
  useEffect(() => {
    // console.log("limitedProducts in ShopPage:", limitedProducts);
    // console.log("limitedbestsellingProducts in ShopPage:", limitedbestsellingProducts);
  }, [limitedProducts, limitedbestsellingProducts]);

  // Filter products based on search query, category, and price
  const filteredProducts = products
    .filter((product) => {
      return product.name.toLowerCase().includes(searchQuery.toLowerCase()); // Search by name
    })
    .filter((product) => {
      // Filter by category
      if (categoryFilter === "all") return true;
      if (categoryFilter === "bestselling")
        return product.bestselling === "yes"; // Filter by best selling
      if (categoryFilter === "men") return product.category === "men"; // Filter by best selling
      if (categoryFilter === "women") return product.category === "women"; // Filter by best selling
      if (categoryFilter === "kids") return product.category === "kids"; // Filter by best selling
      return product.category.toLowerCase() === categoryFilter.toLowerCase(); // Filter by other categories
    })
    .sort((a, b) => {
      if (priceFilter === "low-to-high") {
        return a.price - b.price; // Price: Low to High
      } else if (priceFilter === "high-to-low") {
        return b.price - a.price; // Price: High to Low
      }
      return 0; // No price sorting
    });

  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  // Get products for the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <Header />
      <ToastContainer />

      {/* Show the product containers when data is available */}
      {/* Render All Product when data is available */}
      <div className="container mx-auto p-6">
        <div className="text-center mb-8 w-full md:w-auto">
          <h1 className="text-4xl font-bold mt-6 text-secondary-background">
            All Products
          </h1>
          <p className="text-lg text-secondary-background mt-2">
            Explore our exclusive collection of products
          </p>
        </div>

        {/* Filter and Search Section */}
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Search Input */}
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              className="bg-white text-gray-700 border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-200"
              value={searchQuery} // Bind input to searchQuery state
              onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery on input change
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* Filter Dropdown (Category Filter) */}
            <div className="relative">
              <select
                className="bg-white text-gray-700 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-200"
                value={categoryFilter} // Bind the select element to the state
                onChange={(e) => setCategoryFilter(e.target.value)} // Update categoryFilter on change
              >
                <option value="men">Men Collections</option>
                <option value="women">Women Collections</option>
                <option value="kids">Kids Collections</option>
                <option value="bestselling">Best Selling</option>
                {/* Add more categories as needed */}
              </select>
            </div>

            {/* Price Filter Dropdown */}
            <div className="relative mt-2 sm:mt-0">
              <select
                className="bg-white text-gray-700 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-200"
                value={priceFilter} // Bind the select element to the state
                onChange={(e) => setPriceFilter(e.target.value)} // Update priceFilter on change
              >
                <option value="all">All Prices</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <ProductCardShop key={product._id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                No products found.
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={handlePreviousPage}
              className={`px-4 py-2 text-white bg-gray-700 rounded-md hover:bg-gray-800 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              className={`px-4 py-2 text-white bg-gray-700 rounded-md hover:bg-gray-800 ${currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
                }`}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ShopPage;
