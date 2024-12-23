import React, { useState } from 'react';

const AddProductForm = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        image: '',
        price: '',
        size: '',
        category: 'men', // Default category
        newarrivals: '', // Optional
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

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
            });
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" name="name" value={product.name} onChange={handleChange} required />
            </label>
            <label>
                Description:
                <textarea name="description" value={product.description} onChange={handleChange} required />
            </label>
            <label>
                Image URL:
                <input type="text" name="image" value={product.image} onChange={handleChange} required />
            </label>
            <label>
                Price:
                <input type="number" name="price" value={product.price} onChange={handleChange} required />
            </label>
            <label>
                Size:
                <input type="text" name="size" value={product.size} onChange={handleChange} required />
            </label>
            <label>
                Category:
                <select name="category" value={product.category} onChange={handleChange} required>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kids">Kids</option>
                    <option value="others">Others</option>
                </select>
            </label>
            <label>
                New Arrivals (Optional):
                <select name="newarrivals" value={product.newarrivals} onChange={handleChange}>
                    <option value="">None</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </label>
            <button type="submit">Add Product</button>
        </form>
    );
};

export default AddProductForm;
