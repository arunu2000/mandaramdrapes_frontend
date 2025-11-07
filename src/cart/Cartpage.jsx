// import React from 'react'; 
// import { useCart } from '../context/CartContext'; 
// import { Link } from 'react-router-dom';
// import { domainUrl } from '../utils/constant';
// import { ChevronDownIcon } from '@heroicons/react/16/solid'
// import { useNavigate } from 'react-router-dom';
// import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid'
// import { useEffect } from 'react';
// import { ToastContainer, toast, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function Cartpage() {
//     const navigate = useNavigate(); 
//     const { 
//         cartItems, 
//         loading, 
//         error, 
//         removeFromCart, 
//         updateQuantity, 
//         cartTotal,
//         placeOrder
//     } = useCart();


   

//     // HANDLER 1: Handles quantity change from the dropdown
//     const handleQuantityChange = (item, event) => {
//         const newQuantity = parseInt(event.target.value);
//         if (newQuantity >= 1) {
//             // Pass the Product ID for the API call
//             console.log("productId" , item.productId);
            
//             updateQuantity(item.productId, newQuantity); 
//         }
//     };
    
//     // HANDLER 2: Handles item removal from the cart
//     const handleRemoveItem = (item) => {
//         // Pass the Product ID for the API call
//         removeFromCart(item.productId); 
//     };
    
//     // HANDLER 3: Handles the order placement
//     const handlePlaceOrder = async (e) => {
//         e.preventDefault(); 
//         if (cartItems.length === 0) return;
        
//         try {
//             await placeOrder();
//             // Redirect user to the Orders page
//             toast.success("Order Placed Successfully!", {
//            style: {
//                background: "#EEFFEB",
//                color: "#2f4f2f",
//                fontWeight: "500",
//            },
//            icon: "🌿",
//        });
//             navigate('/myorders'); 


//             // alert("Order Placed Successfully!");
//         } catch (error) {

//           toast.error(error.message || "Please Try Again", {
//             style: {
//                 background: "#FFEBEB",
//                 color: "#8B0000",
//                 fontWeight: "500",
//             },
//             icon: "⚠️",
//         });
//             // alert("Error placing order: " + (error.message || "Please check console."));
//         }
//     };
    
//     // Helper to format image URL
//     const getImageUrl = (imagePath) => {
//         if (!imagePath) return "https://via.placeholder.com/100?text=No+Image";
//         return imagePath.startsWith('http') ? imagePath : `${domainUrl}/${imagePath}`;
//     };


//     if (loading) {
//         return (
//             <div className="text-center py-20 text-lg text-indigo-600">
//                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-600 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Loading your cart...
//             </div>
//         );
//     }
    
//     if (error) {
//         return <div className="text-center py-20 text-red-600"> {error}</div>;
//     }

//     if (cartItems.length === 0) {
//         return (
//             <div className="text-center py-20">
//                 <h1 className="text-2xl font-bold">Your Cart is Empty</h1>
//                 <p className="mt-2 text-gray-500">Looks like you haven't added anything to your cart yet.</p>
//                 <Link to="/customerdashboard" className="mt-4 inline-block text-indigo-600 hover:text-indigo-500 font-medium"> Start Shopping</Link>
//             </div>
//         );
//     }
    
//     return (
//         <div className="bg-white">
//           <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
//             <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
//             <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
//               <section aria-labelledby="cart-heading" className="lg:col-span-7">
//                 <h2 id="cart-heading" className="sr-only">
//                   Items in your shopping cart
//                 </h2>
    
//                 <ul role="list" className="divide-y divide-gray-200 border-t border-b border-gray-200">
//                   {cartItems.map((item) => (
//                     <li key={item._id} className="flex py-6 sm:py-10">
//                       <div className="shrink-0">
//                         <img
//                           alt={item.name}
//                           src={getImageUrl(item.image)} 
//                           className="size-24 rounded-md object-cover sm:size-48"
//                         />
//                       </div>
    
//                       <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
//                         <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
//                           <div>
//                             <div className="flex justify-between">
//                               <h3 className="text-sm">
//                                 <Link to={`/products/{item.productId}`} className="font-medium text-gray-700 hover:text-gray-800">
//                                   {item.name}
//                                 </Link>
//                               </h3>
//                             </div>
//                             <div className="mt-1 flex text-sm">
//                                 {/* Displaying price per unit for clarity */}
//                                 <p className="text-sm text-gray-500">${item.price.toFixed(2)} / pc</p>
//                                 {item.selectedSize && (
//                                     <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">Size: {item.selectedSize}</p>
//                                 )}
//                             </div>
//                             {/* Display calculated total price for the line item */}
//                             <p className="mt-1 text-base font-medium text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</p>
//                           </div>
    
//                           <div className="mt-4 sm:mt-0 sm:pr-9">
//                             <div className="grid w-full max-w-16 grid-cols-1">
                                
//                               {/* QUANTITY DROPDOWN */}
//                               <select
//                                 name={`quantity-${item._id}`}
//                                 aria-label={`Quantity, ${item.name}`}
//                                 value={item.quantity} 
//                                 onChange={(e) => handleQuantityChange(item, e)} 
//                                 className="col-start-1 row-start-1 appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                               >
//                                 {Array.from({ length: 10 }, (_, i) => i + 1).map(qty => (
//                                     <option key={qty} value={qty}>{qty}</option>
//                                 ))}
//                               </select>
//                               <ChevronDownIcon
//                                 aria-hidden="true"
//                                 className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
//                               />
//                             </div>
    
//                             <div className="absolute top-0 right-0">
//                               {/* REMOVE BUTTON */}
//                               <button 
//                                 type="button" 
//                                 onClick={() => handleRemoveItem(item)} 
//                                 className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
//                               >
//                                 <span className="sr-only">Remove</span>
//                                 <XMarkIcon aria-hidden="true" className="size-5" />
//                               </button>
//                             </div>
//                           </div>
//                         </div>
    
//                         <p className="mt-4 flex space-x-2 text-sm text-gray-700">
//                           <CheckIcon aria-hidden="true" className="size-5 shrink-0 text-green-500" />
//                           <span>In stock</span>
//                         </p>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </section>
    
//               {/* Order summary */}
//               <section
//                 aria-labelledby="summary-heading"
//                 className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
//               >
//                 <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
//                   Order summary
//                 </h2>
    
//                 <dl className="mt-6 space-y-4">
//                   <div className="flex items-center justify-between border-t border-gray-200 pt-4">
//                     <dt className="text-base font-medium text-gray-900">Order total</dt>
//                     <dd className="text-base font-medium text-gray-900">₹{cartTotal}</dd>
//                   </div>
//                 </dl>
    
//                 <div className="mt-6">
//                   <button
//                     type="button" 
//                     onClick={handlePlaceOrder}
//                     disabled={loading || cartItems.length === 0}
//                     className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden"
//                   >
//                     {loading ? 'Processing...' : 'Place Order'}
//                   </button>
//                 </div>
//               </section>
//             </form>
//           </div>
//            <ToastContainer
//                   position="top-center"
//                   autoClose={2000}
//                   hideProgressBar={false}
//                   closeOnClick
//                   pauseOnHover
//                   draggable
//                   transition={Slide}
//                   toastStyle={{
//                     borderRadius: "10px",
//                     fontFamily: "Inter, sans-serif",
//                     boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//                   }}
//                 />
//         </div>
//     );
// }




// import React from 'react'; 
// import { useCart } from '../context/CartContext'; 
// import { Link } from 'react-router-dom';
// import { domainUrl } from '../utils/constant';
// import { ChevronDownIcon } from '@heroicons/react/16/solid'
// import { useNavigate } from 'react-router-dom';
// import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid'
// import { useEffect } from 'react';
// import { ToastContainer, toast, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function Cartpage() {
//     const navigate = useNavigate(); 
//     const { 
//         cartItems, 
//         loading, 
//         error, 
//         removeFromCart, 
//         updateQuantity, 
//         cartTotal,
//         placeOrder // Assuming this returns a Promise
//     } = useCart();


//     // HANDLER 1: Handles quantity change from the dropdown
//     const handleQuantityChange = (item, event) => {
//         const newQuantity = parseInt(event.target.value);
//         if (newQuantity >= 1) {
//             console.log("productId" , item.productId);
//             updateQuantity(item.productId, newQuantity); 
//         }
//     };
    
//     // HANDLER 2: Handles item removal from the cart
//     const handleRemoveItem = (item) => {
//         removeFromCart(item.productId); 
        
//         // Show confirmation toast for removal
//         toast.info(`${item.name} removed from cart.`, {
//             style: {
//                 background: "#E6F7FF",
//                 color: "#003A66",
//                 fontWeight: "500",
//             },
//             icon: "🗑️",
//             autoClose: 1500,
//         });
//     };
    
//     //  HANDLER 3: FIXED ORDER PLACEMENT WITH TOAST.PROMISE
//     const handlePlaceOrder = async (e) => {
//         e.preventDefault(); 
//         if (cartItems.length === 0) return;
        
//         // Wrap the asynchronous operation (placeOrder) in toast.promise
//         // The library automatically handles the 'pending', 'success', and 'error' states.
//         toast.promise(
//             placeOrder(), // placeOrder must return a Promise
//             {
//                 pending: {
//                     render: 'Processing your order...',
//                     icon: "⏳",
//                 },
//                 success: {
//                     render: 'Order Placed Successfully!',
//                     icon: "✅",
//                     //  CRITICAL FIX: The onClose ensures the toast displays for the full autoClose duration (2000ms)
//                     onClose: () => navigate('/myorders'),
//                     style: {
//                         background: "#EEFFEB",
//                         color: "#2f4f2f",
//                         fontWeight: "500",
//                     },
//                 },
//                 error: {
//                     render: ({ data }) => data.message || "Error placing order. Please Try Again.",
//                     icon: "❌",
//                     style: {
//                         background: "#FFEBEB",
//                         color: "#8B0000",
//                         fontWeight: "500",
//                     },
//                 }
//             },
//             // Global toast options for this promise
//             {
//                 position: "top-center",
//                 autoClose: 2000, 
//                 transition: Slide,
//             }
//         );
//     };

//     // ----------------------------------------------------------------------
//     //  NEW ADD-TO-CART TOAST LOGIC (FOR DEMONSTRATION)
//     // NOTE: This logic should be moved to the component where products are added.
//     // I'm using a placeholder to show how the toast logic works.
//     // ----------------------------------------------------------------------

//     const simulateAddToCart = (product) => {
//         // Hypothetical check to see if the product is already in the cart
//         const isAlreadyInCart = cartItems.some(item => item.productId === product.id);

//         if (isAlreadyInCart) {
//             // Show 'Already in cart' toast
//             toast.warn(`"${product.name}" is already in your cart!`, {
//                 style: {
//                     background: "#FFFBEB",
//                     color: "#A0522D",
//                     fontWeight: "500",
//                 },
//                 icon: "🛒",
//                 autoClose: 2000,
//             });
//         } else {
//             // Hypothetical call to add the product
//             // addToCart(product); 

//             // Show 'Added to cart' success toast
//             toast.success(`"${product.name}" added to cart!`, {
//                 style: {
//                     background: "#EEFFEB",
//                     color: "#2f4f2f",
//                     fontWeight: "500",
//                 },
//                 icon: "🛍️",
//                 autoClose: 1500,
//             });
//         }
//     };
//     // ----------------------------------------------------------------------
    

//     // Helper to format image URL
//     const getImageUrl = (imagePath) => {
//         if (!imagePath) return "https://via.placeholder.com/100?text=No+Image";
//         return imagePath.startsWith('http') ? imagePath : `${domainUrl}/${imagePath}`;
//     };


//     if (loading) {
//         return (
//             <div className="text-center py-20 text-lg text-indigo-600">
//                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-600 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Loading your cart...
//             </div>
//         );
//     }
    
//     if (error) {
//         return <div className="text-center py-20 text-red-600"> {error}</div>;
//     }

//     if (cartItems.length === 0) {
//         return (
//             <div className="text-center py-20">
//                 <h1 className="text-2xl font-bold">Your Cart is Empty</h1>
//                 <p className="mt-2 text-gray-500">Looks like you haven't added anything to your cart yet.</p>
//                 <Link to="/" className="mt-4 inline-block text-indigo-600 hover:text-indigo-500 font-medium"> Start Shopping</Link>
                
//                 {/* DEMO BUTTON FOR ADD-TO-CART TOAST */}
//                 {/* <button 
//                     onClick={() => simulateAddToCart({ id: 'demo1', name: 'Demo Product' })}
//                     className="mt-4 ml-4 inline-block text-gray-600 hover:text-gray-500 font-medium border p-2 rounded"
//                 >
//                     Test Add-to-Cart Toast
//                 </button> */}
//             </div>
//         );
//     }
    
//     return (
//         <div className="bg-white">
//           <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
//             <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
//             <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
//               <section aria-labelledby="cart-heading" className="lg:col-span-7">
//                 <h2 id="cart-heading" className="sr-only">
//                   Items in your shopping cart
//                 </h2>
    
//                 <ul role="list" className="divide-y divide-gray-200 border-t border-b border-gray-200">
//                   {cartItems.map((item) => (
//                     <li key={item._id} className="flex py-6 sm:py-10">
//                       <div className="shrink-0">
//                         <img
//                           alt={item.name}
//                           src={getImageUrl(item.image)} 
//                           className="size-24 rounded-md object-cover sm:size-48"
//                         />
//                       </div>
    
//                       <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
//                         <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
//                           <div>
//                             <div className="flex justify-between">
//                               <h3 className="text-sm">
//                                 <Link to={`/products/${item.productId}`} className="font-medium text-gray-700 hover:text-gray-800">
//                                   {item.name}
//                                 </Link>
//                               </h3>
//                             </div>
//                             <div className="mt-1 flex text-sm">
//                                 {/* Displaying price per unit for clarity */}
//                                 <p className="text-sm text-gray-500">₹{item.price.toFixed(2)} / pc</p>
//                                 {item.selectedSize && (
//                                     <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">Size: {item.selectedSize}</p>
//                                 )}
//                             </div>
//                             {/* Display calculated total price for the line item */}
//                             <p className="mt-1 text-base font-medium text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</p>
//                           </div>
    
//                           <div className="mt-4 sm:mt-0 sm:pr-9">
//                             <div className="grid w-full max-w-16 grid-cols-1">
                                
//                               {/* QUANTITY DROPDOWN */}
//                               <select
//                                 name={`quantity-${item._id}`}
//                                 aria-label={`Quantity, ${item.name}`}
//                                 value={item.quantity} 
//                                 onChange={(e) => handleQuantityChange(item, e)} 
//                                 className="col-start-1 row-start-1 appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                               >
//                                 {Array.from({ length: 10 }, (_, i) => i + 1).map(qty => (
//                                     <option key={qty} value={qty}>{qty}</option>
//                                 ))}
//                               </select>
//                               <ChevronDownIcon
//                                 aria-hidden="true"
//                                 className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
//                               />
//                             </div>
    
//                             <div className="absolute top-0 right-0">
//                               {/* REMOVE BUTTON */}
//                               <button 
//                                 type="button" 
//                                 onClick={() => handleRemoveItem(item)} 
//                                 className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
//                               >
//                                 <span className="sr-only">Remove</span>
//                                 <XMarkIcon aria-hidden="true" className="size-5" />
//                               </button>
//                             </div>
//                           </div>
//                         </div>
    
//                         <p className="mt-4 flex space-x-2 text-sm text-gray-700">
//                           <CheckIcon aria-hidden="true" className="size-5 shrink-0 text-green-500" />
//                           <span>In stock</span>
//                         </p>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </section>
    
//               {/* Order summary */}
//               <section
//                 aria-labelledby="summary-heading"
//                 className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
//               >
//                 <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
//                   Order summary
//                 </h2>
    
//                 <dl className="mt-6 space-y-4">
//                   <div className="flex items-center justify-between border-t border-gray-200 pt-4">
//                     <dt className="text-base font-medium text-gray-900">Order total</dt>
//                     <dd className="text-base font-medium text-gray-900">₹{cartTotal}</dd>
//                   </div>
//                 </dl>
    
//                 <div className="mt-6">
//                   <button
//                     type="button" 
//                     onClick={handlePlaceOrder}
//                     disabled={loading || cartItems.length === 0}
//                     className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden disabled:opacity-50"
//                   >
//                     {loading ? 'Processing...' : 'Place Order'}
//                   </button>
//                 </div>
//               </section>
//             </form>
//           </div>
//            <ToastContainer
//                   position="top-center"
//                   autoClose={2000}
//                   hideProgressBar={false}
//                   closeOnClick
//                   pauseOnHover
//                   draggable
//                   transition={Slide}
//                   toastStyle={{
//                     borderRadius: "10px",
//                     fontFamily: "Inter, sans-serif",
//                     boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//                   }}
//                 />
//         </div>
//     );
// }


// import React from "react";
// import { useCart } from "../context/CartContext";
// import { Link, useNavigate } from "react-router-dom";
// import { domainUrl } from "../utils/constant";
// import { ChevronDownIcon } from "@heroicons/react/16/solid";
// import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
// import { ToastContainer, toast, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function Cartpage() {
//   const navigate = useNavigate();
//   const {
//     cartItems,
//     loading,
//     error,
//     removeFromCart,
//     updateQuantity,
//     cartTotal,
//     placeOrder, // should return a Promise
//   } = useCart();

//   // 🟢 Update quantity
//   const handleQuantityChange = (item, event) => {
//     const newQty = parseInt(event.target.value);
//     if (newQty >= 1) {
//       updateQuantity(item.productId, newQty);
//       toast.info(`Updated ${item.name} to ${newQty}`, {
//         icon: "🔄",
//         autoClose: 1500,
//       });
//     }
//   };

//   // 🔴 Remove item
//   const handleRemoveItem = (item) => {
//     removeFromCart(item.productId);
//     toast.info(`${item.name} removed from cart 🗑️`, {
//       autoClose: 1500,
//       style: {
//         background: "#fff5f5",
//         color: "#a33",
//       },
//     });
//   };

//   // 🟢 Place order
//   const handlePlaceOrder = async (e) => {
//     e.preventDefault();
//     if (cartItems.length === 0) return;

//     toast.promise(
//       placeOrder(),
//       {
//         pending: "Processing your order...",
//         success: {
//           render: "✅ Order placed successfully!",
//           onClose: () => navigate("/myorders"),
//         },
//         error: "❌ Failed to place order. Try again.",
//       },
//       {
//         position: "top-center",
//         autoClose: 2000,
//         transition: Slide,
//       }
//     );
//   };

//   // 🖼️ Handle image
//   const getImageUrl = (path) => {
//     if (!path) return "https://via.placeholder.com/100?text=No+Image";
//     return path.startsWith("http") ? path : `${domainUrl}/${path}`;
//   };

//   // 🕒 Loading state
//   if (loading)
//     return (
//       <div className="text-center py-20 text-indigo-600 text-lg">
//         <svg
//           className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-600 inline"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//         >
//           <circle
//             className="opacity-25"
//             cx="12"
//             cy="12"
//             r="10"
//             stroke="currentColor"
//             strokeWidth="4"
//           ></circle>
//           <path
//             className="opacity-75"
//             fill="currentColor"
//             d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4zm2 5.29A7.96 7.96 0 014 12H0c0 3.04 1.13 5.82 3 7.94l3-2.65z"
//           ></path>
//         </svg>
//         Loading your cart...
//       </div>
//     );

//   // ❌ Error
//   if (error)
//     return <div className="text-center py-20 text-red-600">{error}</div>;

//   // 🛒 Empty cart
//   if (cartItems.length === 0)
//     return (
//       <div className="text-center py-20">
//         <h1 className="text-2xl font-bold">Your Cart is Empty</h1>
//         <p className="mt-2 text-gray-500">
//           Looks like you haven't added anything yet.
//         </p>
//         <Link
//           to="/"
//           className="mt-4 inline-block text-indigo-600 hover:text-indigo-500 font-medium"
//         >
//           Start Shopping
//         </Link>
//       </div>
//     );

//   // ✅ Cart layout
//   return (
//     <div className="bg-white">
//       <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
//         <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//           Shopping Cart
//         </h1>

//         <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
//           <section aria-labelledby="cart-heading" className="lg:col-span-7">
//             <ul
//               role="list"
//               className="divide-y divide-gray-200 border-t border-b border-gray-200"
//             >
//               {cartItems.map((item) => (
//                 <li key={item._id} className="flex py-6 sm:py-10">
//                   <div className="shrink-0">
//                     <img
//                       alt={item.name}
//                       src={getImageUrl(item.image)}
//                       className="size-24 rounded-md object-cover sm:size-48"
//                     />
//                   </div>

//                   <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
//                     <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
//                       <div>
//                         <div className="flex justify-between">
//                           <h3 className="text-sm">
//                             <Link
//                               to={`/products/${item.productId}`}
//                               className="font-medium text-gray-700 hover:text-gray-800"
//                             >
//                               {item.name}
//                             </Link>
//                           </h3>
//                         </div>
//                         <p className="mt-1 text-sm text-gray-500">
//                           ₹{item.price.toFixed(2)} / pc
//                         </p>
//                         <p className="mt-1 text-base font-medium text-gray-900">
//                           ₹{(item.price * item.quantity).toFixed(2)}
//                         </p>
//                       </div>

//                       <div className="mt-4 sm:mt-0 sm:pr-9">
//                         <div className="grid w-full max-w-16 grid-cols-1">
//                           <select
//                             name={`quantity-${item._id}`}
//                             value={item.quantity}
//                             onChange={(e) => handleQuantityChange(item, e)}
//                             className="col-start-1 row-start-1 rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-indigo-600 sm:text-sm"
//                           >
//                             {Array.from({ length: 10 }, (_, i) => i + 1).map(
//                               (q) => (
//                                 <option key={q} value={q}>
//                                   {q}
//                                 </option>
//                               )
//                             )}
//                           </select>
//                           <ChevronDownIcon
//                             aria-hidden="true"
//                             className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
//                           />
//                         </div>

//                         <div className="absolute top-0 right-0">
//                           <button
//                             type="button"
//                             onClick={() => handleRemoveItem(item)}
//                             className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
//                           >
//                             <XMarkIcon
//                               aria-hidden="true"
//                               className="size-5"
//                             />
//                           </button>
//                         </div>
//                       </div>
//                     </div>

//                     <p className="mt-4 flex space-x-2 text-sm text-gray-700">
//                       <CheckIcon
//                         aria-hidden="true"
//                         className="size-5 shrink-0 text-green-500"
//                       />
//                       <span>In stock</span>
//                     </p>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </section>

//           {/* Summary */}
//           <section className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
//             <h2 className="text-lg font-medium text-gray-900">
//               Order summary
//             </h2>

//             <dl className="mt-6 space-y-4">
//               <div className="flex items-center justify-between border-t border-gray-200 pt-4">
//                 <dt className="text-base font-medium text-gray-900">
//                   Order total
//                 </dt>
//                 <dd className="text-base font-medium text-gray-900">
//                   ₹{cartTotal}
//                 </dd>
//               </div>
//             </dl>

//             <div className="mt-6">
//               <button
//                 type="button"
//                 onClick={handlePlaceOrder}
//                 disabled={loading || cartItems.length === 0}
//                 className="w-full rounded-md bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50"
//               >
//                 {loading ? "Processing..." : "Place Order"}
//               </button>
//             </div>
//           </section>
//         </form>
//       </div>

//       {/* ✅ Local ToastContainer (only for this page) */}
//       <ToastContainer
//         position="top-center"
//         autoClose={2000}
//         hideProgressBar={false}
//         closeOnClick
//         pauseOnHover
//         draggable
//         transition={Slide}
//         toastStyle={{
//           borderRadius: "10px",
//           fontFamily: "Inter, sans-serif",
//           boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//         }}
//       />
//     </div>
//   );
// }


// import React from "react";
// import { useCart } from "../context/CartContext";
// import { Link, useNavigate } from "react-router-dom";
// import { domainUrl } from "../utils/constant";
// import { ChevronDownIcon } from "@heroicons/react/16/solid";
// import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
// import { ToastContainer, toast, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function Cartpage() {
//     const navigate = useNavigate();
//     const {
//         cartItems,
//         loading,
//         error,
//         removeFromCart,
//         updateQuantity,
//         cartTotal,
//         placeOrder, 
//     } = useCart();

//     // 🟢 Update quantity (FIX APPLIED HERE)
//     const handleQuantityChange = (item, event) => {
//         // Prevent event propagation to stop the page from reloading
//         event.stopPropagation();
        
//         const newQty = parseInt(event.target.value);
//         if (newQty >= 1) {
//             updateQuantity(item.productId, newQty);
//             toast.info(`Updated ${item.name} to ${newQty}`, {
//                 icon: "🔄",
//                 autoClose: 1500,
//             });
//         }
//     };

//     // 🔴 Remove item
//     const handleRemoveItem = (item) => {
//         removeFromCart(item.productId);
//         toast.info(`${item.name} removed from cart 🗑️`, {
//             autoClose: 1500,
//             style: {
//                 background: "#fff5f5",
//                 color: "#a33",
//             },
//         });
//     };

//     // 🟢 Place order - TOAST MESSAGE
//     const handlePlaceOrder = async (e) => {
//         e.preventDefault(); // This already prevents the form submission
//         if (cartItems.length === 0) return;

//         toast.promise(
//             placeOrder(),
//             {
//                 pending: "Processing your order...",
//                 success: {
//                     render: ({ data }) => {
//                         return (
//                             <div className="text-left">
//                                 <p className="font-bold text-lg">Order Success!</p>
//                                 <p className="text-sm">
//                                     Your order totaling <span className="font-semibold">₹{cartTotal}</span> has been confirmed.
//                                 </p>
//                                 <p className="text-xs mt-1 opacity-80">
//                                     You will be redirected to your orders page.
//                                 </p>
//                             </div>
//                         );
//                     },
//                     onClose: () => navigate("/myorders"),
//                 },
//                 error: ({ data }) => {
//                     const errorMessage = data?.message || "Failed to place order. Please try again.";
//                     return (
//                         <div className="text-left">
//                             <p className="font-bold text-lg">Order Failed</p>
//                             <p className="text-sm">{errorMessage}</p>
//                         </div>
//                     );
//                 },
//             },
//             {
//                 position: "top-center",
//                 autoClose: 3500, 
//                 transition: Slide,
//                 theme: "colored",
//             }
//         );
//     };

//     // 🖼️ Handle image
//     const getImageUrl = (path) => {
//         if (!path) return "https://via.placeholder.com/100?text=No+Image";
//         return path.startsWith("http") ? path : `${domainUrl}/${path}`;
//     };

//     // 🕒 Loading state
//     if (loading)
//         return (
//             <div className="text-center py-20 text-indigo-600 text-lg">
//                 <svg
//                     className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-600 inline"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                 >
//                     <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                     ></circle>
//                     <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4zm2 5.29A7.96 7.96 0 014 12H0c0 3.04 1.13 5.82 3 7.94l3-2.65z"
//                     ></path>
//                 </svg>
//                 Loading your cart...
//             </div>
//         );

//     // ❌ Error
//     if (error)
//         return <div className="text-center py-20 text-red-600">{error}</div>;

//     // 🛒 Empty cart
//     if (cartItems.length === 0)
//         return (
//             <div className="text-center py-20">
//                 <h1 className="text-2xl font-bold">Your Cart is Empty</h1>
//                 <p className="mt-2 text-gray-500">
//                     Looks like you haven't added anything yet.
//                 </p>
//                 <Link
//                     to="/"
//                     className="mt-4 inline-block text-indigo-600 hover:text-indigo-500 font-medium"
//                 >
//                     Start Shopping
//                 </Link>
//             </div>
//         );

//     // ✅ Cart layout
//     return (
//         <div className="bg-white">
//             <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
//                 <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//                     Shopping Cart
//                 </h1>

//                 {/* Using a div for the layout structure prevents unwanted form submission */}
//                 <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
//                     <section aria-labelledby="cart-heading" className="lg:col-span-7">
//                         <ul
//                             role="list"
//                             className="divide-y divide-gray-200 border-t border-b border-gray-200"
//                         >
//                             {cartItems.map((item) => (
//                                 <li key={item._id} className="flex py-6 sm:py-10">
//                                     <div className="shrink-0">
//                                         <img
//                                             alt={item.name}
//                                             src={getImageUrl(item.image)}
//                                             className="size-24 rounded-md object-cover sm:size-48"
//                                         />
//                                     </div>

//                                     <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
//                                         <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
//                                             <div>
//                                                 <div className="flex justify-between">
//                                                     <h3 className="text-sm">
//                                                         <Link
//                                                             to={`/products/${item.productId}`}
//                                                             className="font-medium text-gray-700 hover:text-gray-800"
//                                                         >
//                                                             {item.name}
//                                                         </Link>
//                                                     </h3>
//                                                 </div>
//                                                 <p className="mt-1 flex text-sm">
//                                                     <span className="text-gray-500">
//                                                         ₹{item.price.toFixed(2)} / pc
//                                                     </span>
//                                                     {item.selectedSize && (
//                                                         <span className="ml-4 border-l border-gray-200 pl-4 text-gray-500">Size: {item.selectedSize}</span>
//                                                     )}
//                                                 </p>
//                                                 <p className="mt-1 text-base font-medium text-gray-900">
//                                                     ₹{(item.price * item.quantity).toFixed(2)}
//                                                 </p>
//                                             </div>

//                                             <div className="mt-4 sm:mt-0 sm:pr-9">
//                                                 <div className="grid w-full max-w-16 grid-cols-1">
//                                                     <select
//                                                         name={`quantity-${item._id}`}
//                                                         value={item.quantity}
//                                                         onChange={(e) => handleQuantityChange(item, e)}
//                                                         className="col-start-1 row-start-1 appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-indigo-600 sm:text-sm"
//                                                     >
//                                                         {Array.from({ length: 10 }, (_, i) => i + 1).map(
//                                                             (q) => (
//                                                                 <option key={q} value={q}>
//                                                                     {q}
//                                                                 </option>
//                                                             )
//                                                         )}
//                                                     </select>
//                                                     <ChevronDownIcon
//                                                         aria-hidden="true"
//                                                         className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
//                                                     />
//                                                 </div>

//                                                 <div className="absolute top-0 right-0">
//                                                     <button
//                                                         type="button"
//                                                         onClick={() => handleRemoveItem(item)}
//                                                         className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
//                                                     >
//                                                         <span className="sr-only">Remove</span>
//                                                         <XMarkIcon
//                                                             aria-hidden="true"
//                                                             className="size-5"
//                                                         />
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         <p className="mt-4 flex space-x-2 text-sm text-gray-700">
//                                             <CheckIcon
//                                                 aria-hidden="true"
//                                                 className="size-5 shrink-0 text-green-500"
//                                             />
//                                             <span>In stock</span>
//                                         </p>
//                                     </div>
//                                 </li>
//                             ))}
//                         </ul>
//                     </section>

//                     {/* Summary */}
//                     <section className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
//                         <h2 className="text-lg font-medium text-gray-900">
//                             Order summary
//                         </h2>

//                         <dl className="mt-6 space-y-4">
//                             <div className="flex items-center justify-between border-t border-gray-200 pt-4">
//                                 <dt className="text-base font-medium text-gray-900">
//                                     Order total
//                                 </dt>
//                                 <dd className="text-base font-medium text-gray-900">
//                                     ₹{cartTotal}
//                                 </dd>
//                             </div>
//                         </dl>

//                         {/* This is the only form element */}
//                         <form onSubmit={handlePlaceOrder} className="mt-6">
//                             <button
//                                 type="submit" 
//                                 disabled={loading || cartItems.length === 0}
//                                 className="w-full rounded-md bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50"
//                             >
//                                 {loading ? "Processing..." : "Place Order"}
//                             </button>
//                         </form>
//                     </section>
//                 </div>
//             </div>

//             {/* Local ToastContainer */}
//             <ToastContainer
//                 position="top-center"
//                 autoClose={2000}
//                 hideProgressBar={false}
//                 closeOnClick
//                 pauseOnHover
//                 draggable
//                 transition={Slide}
//                 toastStyle={{
//                     borderRadius: "10px",
//                     fontFamily: "Inter, sans-serif",
//                     boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//                 }}
//             />
//         </div>
//     );
// }


import React from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { domainUrl } from "../utils/constant";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Cartpage() {
    const navigate = useNavigate();
    const {
        cartItems,
        loading,
        error,
        removeFromCart,
        updateQuantity,
        cartTotal,
        placeOrder, 
        clearCart, // <--- IMPORTED
    } = useCart();

    // 🟢 Update quantity
    const handleQuantityChange = (item, event) => {
        event.stopPropagation();
        
        const newQty = parseInt(event.target.value);
        if (newQty >= 1) {
            updateQuantity(item.productId, newQty);
            toast.info(`Updated ${item.name} to ${newQty}`, {
                icon: "🔄",
                autoClose: 1500,
            });
        }
    };

    // 🔴 Remove item
    const handleRemoveItem = (item) => {
        removeFromCart(item.productId);
        toast.info(`${item.name} removed from cart 🗑️`, {
            autoClose: 1500,
            style: {
                background: "#fff5f5",
                color: "#a33",
            },
        });
    };

    // 🟢 Place order - UPDATED SUCCESS HANDLER
    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        if (cartItems.length === 0) return;

        toast.promise(
            placeOrder(),
            {
                pending: "Processing your order...",
                success: {
                    render: ({ data }) => {
                        return (
                            <div className="text-left">
                                <p className="font-bold text-lg">Order Success!</p>
                                <p className="text-sm">
                                    Your order totaling <span className="font-semibold">₹{cartTotal}</span> has been confirmed.
                                </p>
                                <p className="text-xs mt-1 opacity-80">
                                    You will be redirected to your orders page.
                                </p>
                            </div>
                        );
                    },
                    onClose: () => {
                        clearCart(); // <--- FIX: Clear local state before navigation
                        navigate("/myorders");
                    },
                },
                error: ({ data }) => {
                    const errorMessage = data?.message || "Failed to place order. Please try again.";
                    return (
                        <div className="text-left">
                            <p className="font-bold text-lg">Order Failed</p>
                            <p className="text-sm">{errorMessage}</p>
                        </div>
                    );
                },
            },
            {
                position: "top-center",
                autoClose: 3500, 
                transition: Slide,
                theme: "colored",
            }
        );
    };

    // 🖼️ Handle image
    const getImageUrl = (path) => {
        if (!path) return "https://via.placeholder.com/100?text=No+Image";
        return path.startsWith("http") ? path : `${domainUrl}/${path}`;
    };

    // 🕒 Loading state
    if (loading)
        return (
            <div className="text-center py-20 text-indigo-600 text-lg">
                <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-600 inline"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4zm2 5.29A7.96 7.96 0 014 12H0c0 3.04 1.13 5.82 3 7.94l3-2.65z"
                    ></path>
                </svg>
                Loading your cart...
            </div>
        );

    // ❌ Error
    if (error)
        return <div className="text-center py-20 text-red-600">{error}</div>;

    // 🛒 Empty cart
    if (cartItems.length === 0)
        return (
            <div className="text-center py-20">
                <h1 className="text-2xl font-bold">Your Cart is Empty</h1>
                <p className="mt-2 text-gray-500">
                    Looks like you haven't added anything yet.
                </p>
                <Link
                    to="/"
                    className="mt-4 inline-block text-indigo-600 hover:text-indigo-500 font-medium"
                >
                    Start Shopping
                </Link>
            </div>
        );

    // ✅ Cart layout
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Shopping Cart
                </h1>

                <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                    <section aria-labelledby="cart-heading" className="lg:col-span-7">
                        <ul
                            role="list"
                            className="divide-y divide-gray-200 border-t border-b border-gray-200"
                        >
                            {cartItems.map((item) => (
                                <li key={item._id} className="flex py-6 sm:py-10">
                                    <div className="shrink-0">
                                        <img
                                            alt={item.name}
                                            src={getImageUrl(item.image)}
                                            className="size-24 rounded-md object-cover sm:size-48"
                                        />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                            <div>
                                                <div className="flex justify-between">
                                                    <h3 className="text-sm">
                                                        <Link
                                                            to={`/products/${item.productId}`}
                                                            className="font-medium text-gray-700 hover:text-gray-800"
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    </h3>
                                                </div>
                                                <p className="mt-1 flex text-sm">
                                                    <span className="text-gray-500">
                                                        ₹{item.price.toFixed(2)} / pc
                                                    </span>
                                                    {item.selectedSize && (
                                                        <span className="ml-4 border-l border-gray-200 pl-4 text-gray-500">Size: {item.selectedSize}</span>
                                                    )}
                                                </p>
                                                <p className="mt-1 text-base font-medium text-gray-900">
                                                    ₹{(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>

                                            <div className="mt-4 sm:mt-0 sm:pr-9">
                                                <div className="grid w-full max-w-16 grid-cols-1">
                                                    <select
                                                        name={`quantity-${item._id}`}
                                                        value={item.quantity}
                                                        onChange={(e) => handleQuantityChange(item, e)}
                                                        className="col-start-1 row-start-1 appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-indigo-600 sm:text-sm"
                                                    >
                                                        {Array.from({ length: 10 }, (_, i) => i + 1).map(
                                                            (q) => (
                                                                <option key={q} value={q}>
                                                                    {q}
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                    <ChevronDownIcon
                                                        aria-hidden="true"
                                                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                                    />
                                                </div>

                                                <div className="absolute top-0 right-0">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveItem(item)}
                                                        className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                                                    >
                                                        <span className="sr-only">Remove</span>
                                                        <XMarkIcon
                                                            aria-hidden="true"
                                                            className="size-5"
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                                            <CheckIcon
                                                aria-hidden="true"
                                                className="size-5 shrink-0 text-green-500"
                                            />
                                            <span>In stock</span>
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Summary */}
                    <section className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
                        <h2 className="text-lg font-medium text-gray-900">
                            Order summary
                        </h2>

                        <dl className="mt-6 space-y-4">
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt className="text-base font-medium text-gray-900">
                                    Order total
                                </dt>
                                <dd className="text-base font-medium text-gray-900">
                                    ₹{cartTotal}
                                </dd>
                            </div>
                        </dl>

                        <form onSubmit={handlePlaceOrder} className="mt-6">
                            <button
                                type="submit" 
                                disabled={loading || cartItems.length === 0}
                                className="w-full rounded-md bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50"
                            >
                                {loading ? "Processing..." : "Place Order"}
                            </button>
                        </form>
                    </section>
                </div>
            </div>

            {/* Local ToastContainer */}
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                transition={Slide}
                toastStyle={{
                    borderRadius: "10px",
                    fontFamily: "Inter, sans-serif",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
            />
        </div>
    );
}





