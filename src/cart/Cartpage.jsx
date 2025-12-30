//working

// import React, { useEffect } from "react";
// import { useCart } from "../context/CartContext";
// import { Link, useNavigate } from "react-router-dom";
// import { domainUrl } from "../utils/constant";
// import { ChevronDownIcon } from "@heroicons/react/16/solid";
// import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
// import { ToastContainer, toast, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Cartpage() {
//   const navigate = useNavigate();
//   const {
//     cartItems,
//     loading,
//     error,
//     removeFromCart,
//     updateQuantity,
//     cartTotal,
//     placeOrder,
//     clearCart,
//   } = useCart();

//   console.log("Cart Items:", cartItems);

//   useEffect(() => {
//     if (!cartItems || cartItems.length === 0) return;

//     cartItems.forEach((item) => {
//       const stock = item.stock ?? 0;

//       // ONLY auto-fix quantity, NEVER remove
//       if (stock > 0 && item.quantity > stock) {
//         updateQuantity(item.productId, stock);

//         toast.warn(
//           `${item.name} quantity reduced to ${stock} due to stock change`,
//           { autoClose: 1500 }
//         );
//       }
//     });
//   }, [cartItems, updateQuantity]);

//   const handleQuantityChange = (item, event) => {
//     event.stopPropagation();
//     const newQty = parseInt(event.target.value);
//     const stock = item.stock ?? 0;

//     if (newQty > stock) {
//       toast.error(`Only ${stock} item(s) available`, {
//         autoClose: 1500,
//       });
//       return;
//     }

//     if (newQty >= 1) {
//       updateQuantity(item.productId, newQty);
//       toast.info(`Updated ${item.name} to ${newQty}`, {
//         icon: "🔄",
//         autoClose: 1500,
//       });
//     }
//   };
//       const handleRemoveItem = (item) => {
//         removeFromCart(item.productId);
//         toast.info(`${item.name} removed from cart 🗑️`, {
//             autoClose: 1500,
//             style: {
//                 background: "#fff5f5",
//                 color: "#a33",
//             },
//         });
//     };

//  const handlePlaceOrder = async (e) => {
//   e.preventDefault();
//   if (cartItems.length === 0) return;

//   try {
//     const result = await placeOrder();

//     if (result?.success) {
//       navigate("/order-success");
//     }
//   } catch (err) {
//     // errors already handled by context
//   }
// };

//   const getImageUrl = (path) => {
//     if (!path) return "https://via.placeholder.com/100?text=No+Image";
//     return path.startsWith("http") ? path : `${domainUrl}/${path}`;
//   };

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

//   if (error)
//     return <div className="text-center py-20 text-red-600">{error}</div>;

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

//   const hasOutOfStockItem = cartItems.some((item) => (item.stock ?? 0) === 0);

//   return (
//     <div className="bg-white">
//       <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
//         <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//           Shopping Cart
//         </h1>

//         <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
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
//                         <p className="mt-1 flex text-sm">
//                           <span className="text-gray-500">
//                             ₹{item.price.toFixed(2)} / pc
//                           </span>
//                           {item.selectedSize && (
//                             <span className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
//                               Size: {item.selectedSize}
//                             </span>
//                           )}
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
//                             className="col-start-1 row-start-1 appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-indigo-600 sm:text-sm"
//                           >
//                             {item.stock > 0 ? (
//                               Array.from(
//                                 { length: Math.min(item.stock, 10) },
//                                 (_, i) => i + 1
//                               ).map((q) => (
//                                 <option key={q} value={q}>
//                                   {q}
//                                 </option>
//                               ))
//                             ) : (
//                               <option value={0}>0</option>
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
//                             <span className="sr-only">Remove</span>
//                             <XMarkIcon aria-hidden="true" className="size-5" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>

//                     <p className="mt-4 flex space-x-2 text-sm text-gray-700">
//                       <CheckIcon
//                         aria-hidden="true"
//                         className="size-5 shrink-0 text-green-500"
//                       />
//                       {item.stock > 5 ? (
//                         <span className="text-green-600">In stock</span>
//                       ) : item.stock > 0 ? (
//                         <span className="text-orange-600">
//                           Only {item.stock} left
//                         </span>
//                       ) : (
//                         <span className="text-red-600">Out of stock</span>
//                       )}
//                     </p>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </section>

//           <section className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 sticky top-20">
//             <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

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

//             <form onSubmit={handlePlaceOrder} className="mt-6">
//               <button
//                 type="submit"
//                 disabled={
//                   loading || cartItems.length === 0 || hasOutOfStockItem
//                 }
//                 className="w-full rounded-md bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50"
//               >
//                 {loading ? "Processing..." : "Place Order"}
//               </button>
//             </form>
//           </section>
//         </div>
//       </div>

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

// export default Cartpage;

//checkout page with working code 

// import React, { useEffect } from "react";
// import { useCart } from "../context/CartContext";
// import { Link, useNavigate } from "react-router-dom";
// import { domainUrl } from "../utils/constant";
// import { ChevronDownIcon } from "@heroicons/react/16/solid";
// import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
// import { ToastContainer, toast, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import api from "../utils/api";


// function Cartpage() {
//   const navigate = useNavigate();
//   const {
//     cartItems,
//     loading,
//     error,
//     removeFromCart,
//     updateQuantity,
//     cartTotal,
//     placeOrder,
//     clearCart,
//   } = useCart();

//   console.log("Cart Items:", cartItems);

//   useEffect(() => {
//     if (!cartItems || cartItems.length === 0) return;

//     cartItems.forEach((item) => {
//       const stock = item.stock ?? 0;

//       // ONLY auto-fix quantity, NEVER remove
//       if (stock > 0 && item.quantity > stock) {
//         updateQuantity(item.productId, stock);

//         toast.warn(
//           `${item.name} quantity reduced to ${stock} due to stock change`,
//           { autoClose: 1500 }
//         );
//       }
//     });
//   }, [cartItems, updateQuantity]);

//   const handleQuantityChange = (item, event) => {
//     event.stopPropagation();
//     const newQty = parseInt(event.target.value);
//     const stock = item.stock ?? 0;

//     if (newQty > stock) {
//       toast.error(`Only ${stock} item(s) available`, {
//         autoClose: 1500,
//       });
//       return;
//     }

//     if (newQty >= 1) {
//       updateQuantity(item.productId, newQty);
//       toast.info(`Updated ${item.name} to ${newQty}`, {
//         icon: "🔄",
//         autoClose: 1500,
//       });
//     }
//   };
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

//   //  const handlePlaceOrder = async (e) => {
//   //   e.preventDefault();
//   //   if (cartItems.length === 0) return;

//   //   try {
//   //     const result = await placeOrder();

//   //     if (result?.success) {
//   //       navigate("/order-success");
//   //     }
//   //   } catch (err) {
//   //     // errors already handled by context
//   //   }
//   // };

//   // const handlePlaceOrder = async (e) => {
//   //   e.preventDefault();
//   //   if (cartItems.length === 0) return;

//   //   navigate("/checkout");
//   // };


//   const handleCheckoutClick = async () => {
//   try {
//     const res = await api.post("/order/pre-checkout");

//     toast.success(res.data.message);

//     if (res.data.redirect) {
//       navigate("/checkout");
//     }
//   } catch (err) {
//     toast.error(err.response?.data?.message || "Checkout failed");
//   }
// };


//   const getImageUrl = (path) => {
//     if (!path) return "https://via.placeholder.com/100?text=No+Image";
//     return path.startsWith("http") ? path : `${domainUrl}/${path}`;
//   };

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

//   if (error)
//     return <div className="text-center py-20 text-red-600">{error}</div>;

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

//   const hasOutOfStockItem = cartItems.some((item) => (item.stock ?? 0) === 0);

//   return (
//     <div className="bg-white">
//       <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
//         <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//           Shopping Cart
//         </h1>

//         <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
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
//                         <p className="mt-1 flex text-sm">
//                           <span className="text-gray-500">
//                             ₹{item.price.toFixed(2)} / pc
//                           </span>
//                           {item.selectedSize && (
//                             <span className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
//                               Size: {item.selectedSize}
//                             </span>
//                           )}
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
//                             className="col-start-1 row-start-1 appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-indigo-600 sm:text-sm"
//                           >
//                             {item.stock > 0 ? (
//                               Array.from(
//                                 { length: Math.min(item.stock, 10) },
//                                 (_, i) => i + 1
//                               ).map((q) => (
//                                 <option key={q} value={q}>
//                                   {q}
//                                 </option>
//                               ))
//                             ) : (
//                               <option value={0}>0</option>
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
//                             <span className="sr-only">Remove</span>
//                             <XMarkIcon aria-hidden="true" className="size-5" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>

//                     <p className="mt-4 flex space-x-2 text-sm text-gray-700">
//                       <CheckIcon
//                         aria-hidden="true"
//                         className="size-5 shrink-0 text-green-500"
//                       />
//                       {item.stock > 5 ? (
//                         <span className="text-green-600">In stock</span>
//                       ) : item.stock > 0 ? (
//                         <span className="text-orange-600">
//                           Only {item.stock} left
//                         </span>
//                       ) : (
//                         <span className="text-red-600">Out of stock</span>
//                       )}
//                     </p>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </section>

//           <section className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 sticky top-20">
//             <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

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

//             {/* <form onSubmit={handlePlaceOrder} className="mt-6">
//               <button className="w-full rounded-md bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50"
//               type="submit">Checkout
//               </button>
//             </form> */}

//             <button
//   onClick={handleCheckoutClick}
//   disabled={loading || cartItems.length === 0 || hasOutOfStockItem}
//   className="w-full rounded-md bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50 mt-10"
// >
//   Proceed to Checkout
// </button>

//           </section>
//         </div>
//       </div>

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

// export default Cartpage;



// new ui of cartpage 

import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { domainUrl } from "../utils/constant";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../utils/api";

function CartPage() {
  const navigate = useNavigate();
  const {
    cartItems,
    loading,
    error,
    removeFromCart,
    updateQuantity,
    cartTotal,
    clearCart,
  } = useCart();

  // --- Promo Code State (UI Only as per design) ---
  const [promoCode, setPromoCode] = useState('');
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  

  // --- 1. Stock Validation Logic (From your original code) ---
  useEffect(() => {
    if (!cartItems || cartItems.length === 0) return;

    cartItems.forEach((item) => {
      const stock = item.stock ?? 0;
      // ONLY auto-fix quantity, NEVER remove
      if (stock > 0 && item.quantity > stock) {
        updateQuantity(item.productId, stock);
        toast.warn(
          `${item.name} quantity reduced to ${stock} due to stock change`,
          { autoClose: 1500 }
        );
      }
    });
  }, [cartItems, updateQuantity]);

  // --- 2. Helper Functions ---
  const getImageUrl = (path) => {
    if (!path) return "https://via.placeholder.com/100?text=No+Image";
    return path.startsWith("http") ? path : `${domainUrl}/${path}`;
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  // Adapted Quantity Handlers for + / - buttons
  const handleIncrement = (item) => {
    const stock = item.stock ?? 0;
    if (item.quantity >= stock) {
      toast.error(`Only ${stock} item(s) available`, { autoClose: 1500 });
      return;
    }
    updateQuantity(item.productId, item.quantity + 1);
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.productId, item.quantity - 1);
    }
  };

  const handleRemoveItem = (item) => {
    removeFromCart(item.productId);
    toast.info(`${item.name} removed from cart 🗑️`, {
      autoClose: 1500,
      style: { background: "#fff5f5", color: "#a33" },
    });
  };

 const handleCheckoutClick = async () => {
  try {
    setCheckoutLoading(true);

    const res = await api.post("/order/pre-checkout");
    toast.success(res.data.message);

    if (res.data.redirect) {
      navigate("/checkout");
    }
  } catch (err) {
    toast.error(err.response?.data?.message || "Checkout failed");
  } finally {
    setCheckoutLoading(false);
  }
};


  const hasOutOfStockItem = cartItems.some((item) => (item.stock ?? 0) === 0);

  // --- 3. Loading & Error States (Styled to match new design) ---
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <svg className="animate-spin h-10 w-10 text-[#111827] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4zm2 5.29A7.96 7.96 0 014 12H0c0 3.04 1.13 5.82 3 7.94l3-2.65z"></path>
        </svg>
        <p className="text-[#9CA3AF] font-medium">Loading your cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-red-600 font-medium">
        {error}
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
        <h1 className="text-3xl font-bold text-[#111827] mb-2">Your Cart is Empty</h1>
        <p className="text-[#9CA3AF] mb-6">Looks like you haven't added anything yet.</p>
        <Link
          to="/"
          className="bg-[#111827] text-white rounded-full px-8 py-3 font-bold hover:bg-gray-900 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  // --- 4. Main Render ---
  return (
    <div className="min-h-screen bg-white font-sans p-6 md:p-10">
      
      {/* Header Section */}
      <div className="w-full mb-8 flex items-center gap-4">
        <button 
          onClick={handleGoBack}
          className="p-2 rounded-full hover:bg-[#F3F4F6] transition-colors group"
        >
          <svg 
            width="24" height="24" viewBox="0 0 24 24" fill="none" 
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="text-[#111827] group-hover:scale-110 transition-transform"
          >
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-3xl font-bold text-[#111827]">My Cart</h1>
      </div>

      {/* Main Content - Full Width */}
      <div className="w-full flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Cart Items List */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#111827]">
              Cart <span className="text-[#9CA3AF] text-base font-normal">({cartItems.length} products)</span>
            </h2>
            <button 
              onClick={clearCart} 
              className="text-[#EF4444] font-medium flex items-center gap-1 hover:text-red-700 transition-colors"
            >
              <span className="text-lg">×</span> Clear cart
            </button>
          </div>

          <div className="grid grid-cols-12 text-[#9CA3AF] font-medium mb-4 text-sm">
            <div className="col-span-6 pl-2">Product</div>
            <div className="col-span-3 text-center">Count</div>
            <div className="col-span-3 text-right pr-2">Price</div>
          </div>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.productId || item._id} className="grid grid-cols-12 items-center bg-[#F9FAFB] rounded-xl p-4">
                
                {/* Product Info */}
                <div className="col-span-6 flex items-center gap-4">
                  {/* Image Container with object-contain */}
                  <div className="w-16 h-16 rounded-lg bg-white flex items-center justify-center p-1 overflow-hidden shrink-0 border border-gray-100">
                    <img 
                      src={getImageUrl(item.image)} 
                      alt={item.name} 
                      className="w-full h-full object-contain" 
                    />
                  </div>
                  <div>
                    <Link to={`/products/${item.productId}`} className="font-bold text-[#111827] text-sm sm:text-base hover:underline block truncate max-w-[150px] sm:max-w-xs">
                      {item.name}
                    </Link>
                    {item.selectedSize && (
                      <p className="text-[#9CA3AF] text-sm">Size: {item.selectedSize}</p>
                    )}
                    {/* Stock Status Indicator */}
                    <p className="text-xs mt-1">
                       {item.stock > 5 ? (
                        <span className="text-green-600">In stock</span>
                      ) : item.stock > 0 ? (
                        <span className="text-orange-600">Only {item.stock} left</span>
                      ) : (
                        <span className="text-red-600">Out of stock</span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="col-span-3 flex justify-center items-center">
                  <div className="flex items-center bg-white border border-gray-200 rounded-lg">
                    <button 
                      onClick={() => handleDecrement(item)} 
                      className="px-3 py-1 text-[#9CA3AF] hover:text-[#111827] transition-colors disabled:opacity-50"
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span className="px-1 text-[#111827] font-medium text-sm w-8 text-center">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => handleIncrement(item)} 
                      className="px-3 py-1 text-[#9CA3AF] hover:text-[#111827] transition-colors disabled:opacity-50"
                      disabled={item.quantity >= item.stock}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Price & Remove */}
                <div className="col-span-3 flex justify-end items-center gap-4">
                  <span className="font-bold text-[#111827]">${(item.price * item.quantity).toFixed(2)}</span>
                  <button 
                    onClick={() => handleRemoveItem(item)} 
                    className="text-[#EF4444] text-xl hover:text-red-700 transition-colors"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="w-full lg:w-[400px] bg-[#F9FAFB] rounded-2xl p-6 h-fit">
          {/* <h3 className="text-xl font-bold text-[#111827] mb-4">Promo code</h3>
          <div className="flex gap-2 mb-6 relative">
            <input
              type="text"
              placeholder="Type here..."
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="w-full border border-gray-200 rounded-full pl-5 pr-24 py-3 text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#111827] bg-white shadow-sm"
            />
            <button 
              onClick={() => toast.info("Promo feature coming soon!")} 
              className="absolute right-1 top-1 bottom-1 bg-[#111827] text-white rounded-full px-6 font-medium hover:bg-gray-900 transition-colors"
            >
              Apply
            </button>
          </div> */}

          <div className="space-y-3 mb-8">
            <div className="flex justify-between text-[#9CA3AF]">
              <span>Subtotal</span>
              <span>₹{cartTotal}</span>
            </div>
            {/* If you have discount logic in context, add it here. 
               For now hardcoded 0 as per context not providing discount 
            */}
            <div className="flex justify-between text-[#9CA3AF]">
              <span>Discount</span>
              <span>-₹0.00</span>
            </div>
            <div className="flex justify-between font-bold text-[#111827] text-xl pt-4 border-t border-gray-200">
              <span>Total</span>
              <span>₹{cartTotal}</span>
            </div>
          </div>

 <button 
  onClick={handleCheckoutClick}
  disabled={
    checkoutLoading ||
    loading ||
    cartItems.length === 0 ||
    hasOutOfStockItem
  }
  className="w-full bg-[#111827] text-white rounded-xl py-4 font-bold hover:bg-gray-900 transition-colors text-lg shadow-lg shadow-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
>
  {checkoutLoading ? (
    <>
      <svg
        className="animate-spin h-5 w-5 text-white"
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
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v-4C5.37 0 0 5.37 0 12h4z"
        />
      </svg>
      <span>Processing...</span>
    </>
  ) : hasOutOfStockItem ? (
    "Remove Out of Stock Items"
  ) : (
    "Continue to checkout"
  )}
</button>

        </div>
      </div>

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

export default CartPage;