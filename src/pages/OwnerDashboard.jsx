import React, { useEffect, useState } from 'react'
import ProductCardShop from '../components/ProductCardShop';
import OwnerShowsProduct from '../components/OwnerShowsProduct';
const API_URL = import.meta.env.VITE_API_URL;

const OwnerDashboard = () => {

    const [products, setProducts] = useState([]); // All products
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await fetch("https://api-ecomm-clothes.vercel.app/api/clothing");
                const response = await fetch(`${API_URL}/api/`);
                if (!response.ok) {
                    throw new Error("Failed to fetch products.");
                }
                const data = await response.json();
                console.log(data);

                setProducts(data || []); // Ensure fallback to an empty array if data is null
            } catch (error) {
                console.error("Error fetching products:", error);
                setProducts([]); // Default to an empty array on error
            } finally {
                setLoading(false); // Stop loading once fetch completes
            }
        };

        fetchData();
    }, []);

    const handleProductDelete = (productId) => {
        setProducts(products.filter((product) => product._id !== productId));
    };


    if (loading) return <h1>Loading....</h1>

    return (
        <>
            <h1 className=' text-center font-extrabold text-2xl my-4'>This is Dashboard !</h1>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products &&
                    products.length > 0 ? (
                    products.map((product) => (
                        <OwnerShowsProduct key={product._id} product={product} onDelete={handleProductDelete} />
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-400 text-lg">
                        No Best Selling Products Available
                    </div>
                )}
            </div>
        </>
    )
}

export default OwnerDashboard