import React, { createContext, useState, useEffect, useContext } from "react";

// Create the Context
const ProductContext = createContext();

// Provider Component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]); // All products
  const [loading, setLoading] = useState(true); // Loading state
  const [likedProducts, setLikedProducts] = useState({}); // Liked products stored as an object
  const [cartItems, setCartItems] = useState([]);
  const [proceedToPayProduct, setProceedToPayProduct] = useState(null);
  const [addToCartContainerLength, setaddToCartContainerLength] = useState(null);
  // console.log("proceedToPayProduct in ProductContext", proceedToPayProduct)

  // Log to check the cart items
  // console.log("Cart items:", cartItems);

  const addToCart = (product) => {
    setCartItems((prevCartItems) => {
      // Log to check the function is being triggered
      // console.log("Adding to cart:", product);
      return [...prevCartItems, product];
    });
  };

  // Fetch Products on Component Mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch("https://api-ecomm-clothes.vercel.app/api/clothing");
        const response = await fetch("http://localhost:3000/api");
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

  // Toggle Liked State for Products
  const toggleLikeProduct = (productId) => {
    setLikedProducts((prevLikedProducts) => {
      const updatedLikedProducts = { ...prevLikedProducts };

      // Toggle like/unlike
      if (updatedLikedProducts[productId]) {
        delete updatedLikedProducts[productId]; // Remove if already liked
      } else {
        updatedLikedProducts[productId] = true; // Add if not liked
      }

      return updatedLikedProducts;
    });
  };

  // Helper Function: Filter Products Based on Key
  const filterProductsByKey = (key) =>
    Array.isArray(products)
      ? products.filter((product) => product[key] === "yes")
      : [];

  // Get Limited Products (e.g., First 4)
  const limitedProducts = Array.isArray(products) ? products.slice(0, 4) : [];
  const bestsellingProducts = filterProductsByKey("bestselling");
  const newarrivalsProducts = filterProductsByKey("newarrivals");
  const menProducts = filterProductsByKey("men");
  const womenProducts = filterProductsByKey("women");
  const kidsProducts = filterProductsByKey("kids");

  const limitedbestsellingProducts = bestsellingProducts.slice(0, 4);
  const limitednewarrivalsProducts = newarrivalsProducts.slice(0, 4);

  // console.log("newarrivalsProducts in Product Context", newarrivalsProducts);
  // console.log(
  //   "limitednewarrivalsProducts in Product Context",
  //   limitednewarrivalsProducts
  // );

  // Context Value
  const value = {
    products,
    limitedProducts,
    bestsellingProducts,
    limitedbestsellingProducts,
    newarrivalsProducts,
    limitednewarrivalsProducts,
    menProducts,
    womenProducts,
    kidsProducts,
    loading, // Expose loading state
    likedProducts, // Track liked products
    toggleLikeProduct, // Function to toggle product like state
    cartItems,
    addToCart,
    setProceedToPayProduct,
    proceedToPayProduct,
    addToCartContainerLength,
    setaddToCartContainerLength
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

// Custom Hook to Use the Product Context
export const useProductContext = () => useContext(ProductContext);
