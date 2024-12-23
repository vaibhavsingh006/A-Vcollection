import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const PrimaryCategoryHome = () => {
  const categories = [
    {
      id: 1,
      img: "https://images.pexels.com/photos/15647646/pexels-photo-15647646/free-photo-of-a-man-in-a-tank-top-and-pants-standing-outside.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Men's Collection",
    },
    {
      id: 2,
      img: "https://images.pexels.com/photos/17243506/pexels-photo-17243506/free-photo-of-a-man-in-a-crop-top-and-pants-poses-for-a-photo.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Women's Collection",
    },
    {
      id: 3,
      img: "https://images.pexels.com/photos/1620788/pexels-photo-1620788.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Kids' Collection",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      {categories.map((category) => (
        <div key={category.id} className="relative group overflow-hidden">
          {/* Image */}
          <img
            src={category.img}
            alt={category.title}
            className="w-full h-[300px] md:h-[800px] object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute top-6 left-6">
            <span className="font-bold text-4xl">{category.title}</span>
          </div>

          {/* Hover Button */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <Link to={`/shop?category=${category.title}`}>
              <button className="bg-accent text-base sm:text-lg lg:text-xl text-gray-600 font-semibold py-3 px-6 hover:bg-White-text hover:text-button-hover transition-colors duration-300 rounded-lg">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PrimaryCategoryHome;