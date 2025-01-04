import React, { useState } from "react";
import { FaUserAlt, FaCartPlus, FaRegHeart } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import LOGO from "../IMG/A&V_logo.png";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../contexts/ProductContext";
import { GoDotFill } from "react-icons/go";

const Header = () => {
  const { likedProducts, cartItems } = useProductContext();

  // console.log("Liked products count:", Object.keys(likedProducts).length);
  // console.log("Cart items count:", cartItems.length);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      {/* Sub-header - Positioned Above the Main Header */}
      <div className="hidden md:block bg-accent text-primary-text py-1 md:py-2">
        <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
          <div className="text-sm font-medium">
            <p>🎉 Free shipping on orders over $50! 🎉</p>
          </div>
          <div className="flex space-x-8 text-sm md:flex">
            <Link to="/shop" className="hover:text-secondary-text">
              Sale
            </Link>
            <Link to="/shop" className="hover:text-secondary-text">
              New Arrivals
            </Link>
            <Link to="/shop" className="hover:text-secondary-text">
              Best Sellers
            </Link>
            <Link to="/contact" className="hover:text-secondary-text">
              Subscribe to Newsletter
            </Link>
          </div>
        </div>
      </div>

      {/* Logo Section */}
      <div className="hidden md:flex flex-col items-center pt-6 bg-section-background text-primary-text">
        <img src={LOGO} alt="A&V Logo" className="h-24 w-auto" />
      </div>

      {/* Main Header */}
      <header className="hidden md:block bg-section-background text-primary-text w-full">
        <div className="max-w-screen-xl mx-auto px-4 pb-6 flex justify-between items-center">
          <nav className="flex space-x-8 md:flex">
            <Link to="/" className="text-normal hover:text-secondary-text">
              Home
            </Link>
            <Link to="/shop" className="text-normal hover:text-secondary-text">
              Shop
            </Link>
            <Link
              to="/contact"
              className="text-normal hover:text-secondary-text"
            >
              Contact
            </Link>
            <Link
              to="/login"
              className="text-normal hover:text-secondary-text"
            >
              login
            </Link>
            <Link
              to="/ownerlogin"
              className="text-normal hover:text-secondary-text"
            >
              owner
            </Link>
            <Link
              to="/admin"
              className="text-normal hover:text-secondary-text"
            >
              create product
            </Link>
            <Link
              to="/ownerdashboard"
              className="text-normal hover:text-secondary-text"
            >
              Dashboard
            </Link>
          </nav>

          {/* Right Side: Icons */}
          <div className="flex items-center space-x-6">
            {/* Search Bar */}
            {/* <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 bg-secondary-background rounded-full border border-border-light text-black"
              />
            </div> */}
            {/* Heart Icon */}
            <div className="relative">
              {Object.keys(likedProducts).length > 0 && (
                <span className="absolute bg-white -right-2 -top-1 rounded-full text-red-700 hover:cursor-pointer hover:text-secondary-text">
                  <GoDotFill />
                </span>
              )}
              <FaRegHeart
                className="text-2xl cursor-pointer hover:text-secondary-text"
                onClick={() => navigate("/liked-products")}
              />
            </div>

            {/* Cart Icon */}
            <div className="relative">
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
              <FaCartPlus
                className="text-2xl cursor-pointer hover:text-secondary-text"
                onClick={() => navigate("/cart")}
              />
            </div>

            {/* Login Icon */}
            <div className="flex items-center space-x-2 cursor-pointer">
              <FaUserAlt className="text-2xl hover:text-secondary-text" />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile View */}
      <div className="md:hidden bg-black text-white px-4 py-2">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center">
            <img src={LOGO} alt="A&V Logo" className="h-16 sm:h-20 lg:h-28" />
          </div>
          <button
            className="text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="block w-6 h-0.5 bg-white mb-2"></span>
            <span className="block w-6 h-0.5 bg-white mb-2"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </button>
        </div>

        <div
          className={`fixed top-0 right-0 h-full z-50 bg-black text-white px-12 transform transition-transform duration-500 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <button
            className="absolute top-4 right-4 text-3xl z-1000 text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaTimes className="z-1000" />
          </button>

          <div className="flex flex-col items-center space-y-6 py-16">
            <Link to="/" className="text-white text-xl hover:text-secondary-text">
              Home
            </Link>
            <Link
              to="/shop"
              className="text-white text-xl hover:text-secondary-text"
            >
              Shop
            </Link>
            <Link
              to="/contact"
              className="text-white text-xl hover:text-secondary-text"
            >
              Contact
            </Link>
            <Link
              to="/sale"
              className="text-white text-xl hover:text-secondary-text"
            >
              Sale
            </Link>
            <Link
              to="/new-arrivals"
              className="text-white text-xl hover:text-secondary-text"
            >
              New Arrivals
            </Link>
            <Link
              to="/best-sellers"
              className="text-white text-xl hover:text-secondary-text"
            >
              Best Sellers
            </Link>
            <Link
              to="/newsletter"
              className="text-white text-xl hover:text-secondary-text"
            >
              Subscribe to Newsletter
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
