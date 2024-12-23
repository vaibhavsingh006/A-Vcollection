import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash } from "react-icons/fa";


const AdminComponent = () => {
  const [products, setProducts] = useState([]); // Stores the list of products
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    bestselling: "No",
    image: "",
  });

  const [editingProduct, setEditingProduct] = useState(null); // Tracks product being edited

  // Handle input change for the product form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Handle adding a new product
  const handleAddProduct = (e) => {
    e.preventDefault();

    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      toast.error("Please fill all the required fields!");
      return;
    }

    if (editingProduct) {
      // Update existing product
      setProducts((prev) =>
        prev.map((product) =>
          product.id === editingProduct.id ? { ...newProduct, id: product.id } : product
        )
      );
      setEditingProduct(null);
      toast.success("Product updated successfully!");
    } else {
      // Add new product
      setProducts((prev) => [
        ...prev,
        { ...newProduct, id: Date.now().toString() }, // Unique ID for each product
      ]);
      toast.success("Product added successfully!");
    }

    setNewProduct({ name: "", description: "", price: "", bestselling: "No", image: "" });
  };

  // Handle editing a product
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct(product);
  };

  // Handle deleting a product
  const handleDeleteProduct = (productId) => {
    setProducts((prev) => prev.filter((product) => product.id !== productId));
    toast.error("Product deleted!");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Panel - Manage Products</h1>

        {/* Add/Edit Product Form */}
        <form onSubmit={handleAddProduct} className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingProduct ? "Edit Product" : "Add New Product"}
          </h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Product Name</label>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter product name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter product description"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter product price"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Image URL</label>
            <input
              type="text"
              name="image"
              value={newProduct.image}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter product image URL"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Best Selling</label>
            <select
              name="bestselling"
              value={newProduct.bestselling}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            {editingProduct ? "Update Product" : "Add Product"}
          </button>
        </form>

        {/* Product List */}
        <h2 className="text-xl font-semibold mb-4">Product List</h2>
        {products.length === 0 ? (
          <p className="text-gray-700">No products added yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between border p-4 rounded-lg shadow-md"
              >
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                  <p className="text-sm text-gray-600">${product.price}</p>
                  <p className="text-sm text-gray-600">{product.description}</p>
                  <p
                    className={`text-sm font-semibold ${
                      product.bestselling === "Yes" ? "text-green-500" : "text-gray-500"
                    }`}
                  >
                    Best Selling: {product.bestselling}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="text-blue-500 hover:text-blue-700"
                    aria-label="Edit product"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-red-500 hover:text-red-700"
                    aria-label="Delete product"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminComponent;