import React from "react";
import { Link } from "react-router-dom";

const HeroBack = () => {
  return (
    <div
      className="relative h-[60vh] sm:h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://websitedemos.net/t-shirts-store-04/wp-content/uploads/sites/1115/2022/07/bg-01.jpg")',
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay to darken the background */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Text content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-start sm:px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-center">
          <span className="text-3xl text-accent">View</span> <br />
          <p className="text-4xl md:text-5xl lg:text-6xl text-secondary-text">
            All <span className="text-secondary-text">Collection</span>
          </p>
        </h1>
        <p className="text-md sm:text-lg md:text-xl lg:text-2xl font-medium w-[80%] sm:w-[90%] text-center text-secondary-text mb-6">
          Be different in your own way! Embrace individuality, challenge the
          norm, and express yourself like never before. The world is your canvas
          — create a masterpiece.
        </p>

        <p className="text-lg sm:text-xl md:text-2xl text-center mb-8">
          Find your unique style.
        </p>
        <Link to={"/shop"}>
          <button className="bg-accent text-base sm:text-lg lg:text-xl text-gray-600 font-semibold py-3 px-6 hover:bg-White-text hover:text-button-hover transition-colors duration-300 rounded-lg outline-0 border-0">
            Shop Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HeroBack;
