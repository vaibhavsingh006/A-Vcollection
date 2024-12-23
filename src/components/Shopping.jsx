import React from "react";

const Shopping = () => {
  return (
    <>
      <div className="bg-black flex items-center justify-center py-12 px-6 mt-8">
        {/* Text Section */}
        <div className="text-white text-center max-w-md space-y-4">
          <h3 className="text-2xl font-semibold">Hurry Up!</h3>
          <h2 className="text-4xl font-bold">Deal of the Day!</h2>
          <p className="text-lg">
            Buy This T-shirt At 20% Discount, Use Code Off20
          </p>
          <button className="bg-accent text-base sm:text-lg lg:text-xl text-gray-600 font-semibold py-3 px-6 hover:bg-White-text hover:text-button-hover transition-colors duration-300 rounded-lg">
            SHOP Now
          </button>
        </div>

        {/* Image Section */}
        <div className="ml-12">
          <img
            src="https://websitedemos.net/custom-printing-02/wp-content/uploads/sites/459/2019/06/image26-free.png"
            alt="T-shirt"
            className="max-w-xs md:max-w-sm lg:max-w-md"
          />
        </div>
      </div>
    </>
  );
};

export default Shopping;
