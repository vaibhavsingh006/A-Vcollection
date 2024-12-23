import React, { useEffect, useState } from "react";
import { FaShippingFast, FaCreditCard, FaMoneyBillAlt } from "react-icons/fa";
import { FaMobileAlt } from "react-icons/fa";
import { useProductContext } from "../contexts/ProductContext";

const ProceedToPayContainer = () => {
  const [proceedToPayProductfind, setProceedToPayProductfind] = useState(null);
  const { products, proceedToPayProduct } = useProductContext();

//   console.log(
//     "proceedToPayProduct in ProceedToPayContainer",
//     proceedToPayProduct
//   );

  useEffect(() => {
    // Find the product based on the productId from the context
    const selectedProceedToPayProduct = products.find(
      (p) => p._id === proceedToPayProduct
    );

    // Log the selected product
    // console.log("Selected Product:", selectedProceedToPayProduct);

    // If product is found, set it
    if (selectedProceedToPayProduct) {
      setProceedToPayProductfind(selectedProceedToPayProduct);
    } else {
    //   console.log("Product not found.");
    }
  }, [proceedToPayProduct, products]); // Watch for changes in proceedToPayProduct and products

  // Render product details if available
  if (!proceedToPayProductfind) {
    return <div>Loading...</div>; // Show loading while fetching the product
  }

  return (
    <div className="text-gray-800">
      {/* Page Hero Section */}
      <div className="text-start w-full px-3 sm:px-6 pt-4 sm:pt-16 md:pl-16">
        <h1 className="text-3xl sm:text-5xl font-bold text-secondary-background">
          Proceed to Payment
        </h1>
        <p className="text-lg sm:text-xl text-secondary-background mt-2">
          Choose your preferred payment method and complete your purchase.
        </p>
      </div>

      {/* Product Summary Section */}
      <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 py-4 sm:py-9 px-4">
        <div className=" shadow-lg rounded-lg p-3 sm:p-6 space-y-6">
          <h2 className="text-3xl font-semibold text-secondary-background">
            Product Summary
          </h2>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Product Image */}
            <div className="w-full md:w-1/3 flex justify-center items-center">
              <img
                src={proceedToPayProductfind.image}
                alt="Product"
                className="rounded-lg shadow-md"
              />
            </div>

            {/* Product Details */}
            <div className="w-full md:w-2/3 space-y-4">
              <h3 className="text-2xl font-bold text-secondary-background">
                {proceedToPayProductfind.name}
              </h3>
              <p className="text-lg text-secondary-background">
                {proceedToPayProductfind.description}
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-lg">
                  <FaShippingFast className="text-secondary-background mr-2" />
                  <span className="text-secondary-background">
                    Free Shipping
                  </span>
                </div>
                <div className="flex items-center text-lg">
                  <FaCreditCard className="text-secondary-background mr-2" />
                  <span className="text-secondary-background">
                    Secure Payment Options
                  </span>
                </div>
                <div className="flex items-center text-lg">
                  <FaMoneyBillAlt className="text-secondary-background mr-2" />
                  <span className="text-secondary-background">
                    30-Day Money Back Guarantee
                  </span>
                </div>
              </div>
              <div className="text-2xl font-bold text-secondary-background mt-4">
                Price: {proceedToPayProductfind.price}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Options Section */}
      <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 py-4 sm:py-9 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* COD Option */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <div className="text-center mb-4">
              <FaMoneyBillAlt className="text-4xl text-gray-800 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Cash on Delivery
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Pay for your order directly to the delivery agent once it arrives.
              Perfect for those who prefer a risk-free and convenient payment
              option.
            </p>
            <button className="w-full bg-accent text-base sm:text-lg lg:text-xl text-gray-600 font-semibold py-3 px-6 hover:bg-White-text hover:text-button-hover transition-colors duration-300 rounded-lg">
              Select COD
            </button>
          </div>

          {/* Online Payment Option */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <div className="text-center mb-4">
              <FaMobileAlt className="text-4xl text-gray-800 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Online Payment
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Complete your transaction securely using UPI, net banking, or
              e-wallets. Enjoy seamless payments from the comfort of your
              device.
            </p>
            <button className="w-full bg-accent text-base sm:text-lg lg:text-xl text-gray-600 font-semibold py-3 px-6 hover:bg-White-text hover:text-button-hover transition-colors duration-300 rounded-lg">
              Select Online Payment
            </button>
          </div>

          {/* Card Payment Option */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <div className="text-center mb-4">
              <FaCreditCard className="text-4xl text-gray-800 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Card Payment
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Pay using your credit or debit card for a hassle-free checkout
              experience. A reliable option with instant payment confirmation.
            </p>
            <button className="w-full bg-accent text-base sm:text-lg lg:text-xl text-gray-600 font-semibold py-3 px-6 hover:bg-White-text hover:text-button-hover transition-colors duration-300 rounded-lg">
              Select Card Payment
            </button>
          </div>
        </div>
      </div>

      {/* Payment Form */}
      <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 py-4 sm:py-9 px-4">
        <div className="shadow-lg rounded-lg bg-white p-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            Enter Payment Details
          </h2>
          <form className="space-y-6">
            <div>
              <label
                htmlFor="cardName"
                className="block text-lg font-medium text-gray-800"
              >
                Cardholder Name
              </label>
              <input
                type="text"
                id="cardName"
                className="w-full mt-2 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 outline-none"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label
                htmlFor="cardNumber"
                className="block text-lg font-medium text-gray-800"
              >
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                className="w-full mt-2 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 outline-none"
                placeholder="1234 5678 9012 3456"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="expiryDate"
                  className="block text-lg font-medium text-gray-800"
                >
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  className="w-full mt-2 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 outline-none"
                  placeholder="MM/YY"
                />
              </div>

              <div>
                <label
                  htmlFor="cvv"
                  className="block text-lg font-medium text-gray-800"
                >
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  className="w-full mt-2 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 outline-none"
                  placeholder="123"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-accent text-base sm:text-lg lg:text-xl text-gray-600 font-semibold py-3 px-6 hover:bg-White-text hover:text-button-hover transition-colors duration-300 rounded-lg"
            >
              Confirm Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProceedToPayContainer;
