// import React, { useEffect } from "react";
// import { useProductContext } from "../contexts/ProductContext";
// import { Link } from "react-router-dom";

// const AddToCartContainer = () => {
//   const { cartItems, setProceedToPayProduct, setaddToCartContainerLength } =
//     useProductContext();

//   // Group items by product ID and calculate total quantity
//   const groupedCartItems = cartItems.reduce((acc, item) => {
//     const existingItem = acc.find((i) => i._id === item._id);
//     if (existingItem) {
//       existingItem.quantity += 1; // Increase quantity for the same product
//     } else {
//       acc.push({ ...item, quantity: 1 }); // Add new item with quantity 1
//     }
//     return acc;
//   }, []);


//   // Calculate total amount and total items
//   const totalAmount = groupedCartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );
//   const totalItems = groupedCartItems.reduce(
//     (sum, item) => sum + item.quantity,
//     0
//   );

//   // Update the length of items in the cart
//   useEffect(() => {
//     setaddToCartContainerLength(groupedCartItems.length);
//     console.log(groupedCartItems.length);
//   }, [groupedCartItems, setaddToCartContainerLength]);

//   return (
//     <div className="max-w-screen-xl mx-auto px-4 py-8">
//       <div className="text-center mb-8 w-full md:w-auto">
//         <h1 className="text-4xl font-bold sm:mt-12 text-secondary-background">
//           Your Cart
//         </h1>
//         <p className="w-full sm:w-[80%] mx-auto text-lg text-secondary-background mt-4">
//           Review the items you've added to your cart. Once you're ready, proceed
//           to checkout and complete your purchase. If you wish to make any
//           changes, you can easily modify your cart. Enjoy your shopping
//           experience and get the best of what we offer!
//         </p>
//       </div>

//       {groupedCartItems.length === 0 ? (
//         <div className="flex justify-center">
//           <p>Your cart is empty.</p>
//           <Link to={"/shop"}>
//             <span className="text-accent ml-2"> Go to Store</span>
//           </Link>
//         </div>
//       ) : (
//         <ul>
//           {groupedCartItems.map((item, index) => (
//             <li key={index} className="border-b py-4">
//               <div className="grid grid-cols-[60%_40%]">
//                 <div className="mx-auto">
//                   {/* Product Image with Link */}
//                   <Link to={`/product/${item._id}`}>
//                     <img
//                       src={item.image}
//                       alt={`Image of ${item.name}`}
//                       className="w-28 sm:w-48 h-28 sm:h-48 object-cover"
//                     />
//                   </Link>
//                 </div>
//                 <div>
//                   <p className="text-xl">{item.name}</p>
//                   <p className="text-xl mt-2">${item.price}</p>
//                   <p className="text-xl my-2 ">
//                     No of Product: {item.quantity}
//                   </p>
//                   <Link to="/product-payment" className="">
//                     <button
//                       className="bg-accent text-base sm:text-lg lg:text-xl text-gray-600 font-semibold py-2 px-4 hover:bg-White-text hover:text-button-hover transition-colors duration-300 rounded-lg"
//                       onClick={() => {
//                         console.log(
//                           "Selected Product ID Proceed to Pay in AddToCartContainer:",
//                           item._id
//                         );
//                         setProceedToPayProduct(item._id); // Set the product ID correctly
//                       }}
//                     >
//                       Proceed to Pay
//                     </button>
//                   </Link>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}

//       {/* Display Total Amount and Total Items */}
//       {groupedCartItems.length > 0 && (
//         <div className="mt-8 pt-4 flex justify-between items-center">
//           <div>
//             <p className="text-lg sm:text-2xl font-bold">
//               Total Items : {totalItems}
//             </p>
//           </div>
//           <div>
//             <p className="text-lg sm:text-2xl font-bold">
//               Total Amount :{" "}
//               <span className="text-2xl sm:text-3xl">
//                 ${totalAmount.toFixed(2)}
//               </span>
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddToCartContainer;


import React, { useEffect, useState } from "react";
import { useProductContext } from "../contexts/ProductContext";
import { Link, useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

const AddToCartContainer = () => {
  const { setProceedToPayProduct, setaddToCartContainerLength } =
    useProductContext();
  const [cartItems, setCartItems] = useState([]); // State to hold cart items
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await fetch(`${API_URL}/api/cart`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if required
          },
          credentials: "include", // Include cookies if using session auth
        });

        if (res.status === 401) {
          alert('You must have account !'); // Show message
          navigate('/register'); // Redirect to signup page
        }
        if (!res.ok) {
          throw new Error("Failed to fetch cart items");
        }

        const data = await res.json();
        console.log("Cart API Response:", data); // Log API response
        setCartItems(data.cartItems); // Assuming the API returns { cartItems: [...] }
        setaddToCartContainerLength(data.cartItems.length); // Update the cart length in context
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [setaddToCartContainerLength]);

  // Group items by product ID and calculate total quantity
  // const groupedCartItems = cartItems.reduce((acc, item) => {
  //   const existingItem = acc.find((i) => i._id === item._id);
  //   if (existingItem) {
  //     existingItem.quantity += 1; // Increase quantity for the same product
  //   } else {
  //     acc.push({ ...item, quantity: 1 }); // Add new item with quantity 1
  //   }
  //   return acc;
  // }, []);

  const groupedCartItems = cartItems.reduce((acc, item) => {
    // Check if the item already exists in the accumulator
    const existingItem = acc.find((i) => i._id === item._id);

    if (existingItem) {
      // If it exists, just update its quantity from the API value (no manual increment)
      existingItem.quantity = item.quantity;
    } else {
      // Otherwise, push the item as is
      acc.push(item);
    }

    return acc;
  }, []);


  // Calculate total amount and total items
  const totalAmount = groupedCartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalItems = groupedCartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  if (loading) {
    return <p>Loading cart...</p>;
  }

  if (error) {
    return <p className="text-red-600">Error: {error}</p>;
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <div className="text-center mb-8 w-full md:w-auto">
        <h1 className="text-4xl font-bold sm:mt-12 text-secondary-background">
          Your Cart
        </h1>
        <p className="w-full sm:w-[80%] mx-auto text-lg text-secondary-background mt-4">
          Review the items you've added to your cart. Once you're ready, proceed
          to checkout and complete your purchase. If you wish to make any
          changes, you can easily modify your cart. Enjoy your shopping
          experience and get the best of what we offer!
        </p>
      </div>

      {groupedCartItems.length === 0 ? (
        <div className="flex justify-center">
          <p>Your cart is empty.</p>
          <Link to={"/shop"}>
            <span className="text-accent ml-2"> Go to Store</span>
          </Link>
        </div>
      ) : (
        <ul>
          {groupedCartItems.map((item, index) => (
            <li key={index} className="border-b py-4">
              <div className="grid grid-cols-[60%_40%]">
                <div className="mx-auto">
                  <Link to={`/product/${item._id}`}>
                    <img
                      src={item.image}
                      alt={`Image of ${item.name}`}
                      className="w-28 sm:w-48 h-28 sm:h-48 object-cover"
                    />
                  </Link>
                </div>
                <div>
                  <p className="text-xl">{item.name}</p>
                  <p className="text-xl mt-2">${item.price}</p>
                  <p className="text-xl my-2 ">
                    No of Product: {item.quantity}
                  </p>
                  <Link to="/product-payment" className="">
                    <button
                      className="bg-accent text-base sm:text-lg lg:text-xl text-gray-600 font-semibold py-2 px-4 hover:bg-White-text hover:text-button-hover transition-colors duration-300 rounded-lg"
                      onClick={() => {
                        console.log(
                          "Selected Product ID Proceed to Pay in AddToCartContainer:",
                          item._id
                        );
                        setProceedToPayProduct(item._id); // Set the product ID correctly
                      }}
                    >
                      Proceed to Pay
                    </button>
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {groupedCartItems.length > 0 && (
        <div className="mt-8 pt-4 flex justify-between items-center">
          <div>
            <p className="text-lg sm:text-2xl font-bold">
              Total Items : {totalItems}
            </p>
          </div>
          <div>
            <p className="text-lg sm:text-2xl font-bold">
              Total Amount :{" "}
              <span className="text-2xl sm:text-3xl">
                ${totalAmount.toFixed(2)}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddToCartContainer;
