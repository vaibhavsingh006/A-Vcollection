import React from 'react';
import ProductCardShop from './ProductCardShop';

const AllProductContainer = ({ products }) => {
    console.log("AllProductContainer products", products);
    return (
        // <div>
        //     <h1>AllProductContainer</h1>
        // </div>
        <div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                <div className="flex justify-between items-center">
                    <div className="text-center mb-8 w-full md:w-2/3">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-4">All Product List</h2>
                        <p className="text-lg text-gray-600">
                            Browse through our collection of top-rated products. Find everything you need, from electronics to clothing and home goods!
                        </p>
                    </div>
                    <div className="flex justify-center md:justify-end w-full md:w-1/3">
                        <button className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>

            {/* Render Product Cards */}
            {products && products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map(product => (
                        <ProductCardShop key={product._id} products={product} />
                    ))}
                </div>
            ) : (
                <p>No products available</p>
            )}
        </div>
    );
};

export default AllProductContainer;