import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProductForm = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        image: '',
        price: '',
        size: '',
        category: 'men',
        newarrivals: '',
        bestselling: 'No', // Default value for Best Selling
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3000/admin', {
            method: 'GET',
            credentials: 'include', // Include cookies in the request
        })
            .then((response) => {
                console.log(response)
                if (response.status === 401 || response.status === 403) {
                    // Redirect to login or unauthorized page if not allowed
                    navigate('/login'); // Redirect to login page
                }
            })
            .catch((error) => {
                console.error('Error checking authorization:', error);
                navigate('/error'); // Redirect in case of fetch errors
            });
    }, [navigate]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };


    // logout code here
    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:3000/logout', {
                method: 'GET',
                credentials: 'include', // Include credentials (like cookies) in the request
            });

            if (response.ok) {
                alert('Logged out successfully');
                // Redirect using navigate
                navigate('/login');
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Logout failed', error);
            alert('Error logging out');
        }
    };
    // logout code here


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:3000/api/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            });

            const data = await res.json();
            alert(data.message);
            setProduct({
                name: '',
                description: '',
                image: '',
                price: '',
                size: '',
                category: 'men',
                newarrivals: '',
                bestselling: 'No',
            });
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold text-center mb-6">Admin Panel - Add Product</h1>
                <button onClick={handleLogout} className="logout-button">Logout</button>

                <form onSubmit={handleSubmit} className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Add New Product</h2>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter product name"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Description</label>
                        <textarea
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter product description"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Image URL</label>
                        <input
                            type="text"
                            name="image"
                            value={product.image}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter product image URL"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter product price"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Size</label>
                        <input
                            type="text"
                            name="size"
                            value={product.size}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter product size"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Category</label>
                        <select
                            name="category"
                            value={product.category}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        >
                            <option value="men">Men</option>
                            <option value="women">Women</option>
                            <option value="kids">Kids</option>
                            <option value="others">Others</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">New Arrivals</label>
                        <select
                            name="newarrivals"
                            value={product.newarrivals}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">None</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Best Selling</label>
                        <select
                            name="bestselling"
                            value={product.bestselling}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        >
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProductForm;
