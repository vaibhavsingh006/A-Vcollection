import React from 'react';
import { useProductContext } from '../contexts/ProductContext'; // Make sure the context is imported
import ProductCardShop from './ProductCardShop'; // Assuming you have a ProductCardShop component

const SimilarProducts = () => {
    // Get the products from the context
    const { products } = useProductContext();

    return (
        <div className="bg-white py-12">
            <div className="max-w-screen-xl mx-auto">
                {/* Title Section */}
                <div className="text-center mb-8">
                    <h3 className="text-2xl font-semibold text-gray-800">Similar Products</h3>
                    <p className="mt-2 text-gray-600">Discover more products you might like</p>
                </div>

                {/* Product Grid */}
                <div className='w-full bg-black'>
                    <div className="overflow-x-auto bg-red-500">
                        <div className="flex space-x-6">
                            {products.length > 0 ? (
                                products.map((product) => {
                                    // console.log("Product in SimilarProducts:", product); // Log each product
                                    return (
                                        <div className='bg-red-500 h-auto min-w-[300px]'>
                                            <ProductCardShop key={product._id} product={product} />
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="col-span-full text-center text-gray-500">
                                    No products found.
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
}

export default SimilarProducts;