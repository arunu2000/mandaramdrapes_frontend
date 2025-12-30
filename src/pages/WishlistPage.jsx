// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { TrashIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
// import { useWishlist } from '../context/WishlistContext';
// import { useCart } from '../context/CartContext';
// import { domainUrl } from '../utils/constant';
// import api from '../utils/api';
// import { toast } from 'react-toastify';

// const WishlistPage = () => {
//     const { wishlist, loading, removeFromWishlist, clearWishlist } = useWishlist();
//     const { fetchCart } = useCart(); // To update cart badge after moving
//     const navigate = useNavigate();

//     // Handle "Move to Cart" logic
//     const handleMoveToCart = async (product) => {
//         try {
//             // 1. Add to Cart
//             await api.post(`/cart/add`, {
//                 productId: product._id,
//                 quantity: 1,
//                 // If product has sizes, backend might require size.
//                 // If so, redirect to detail page instead:
//                 // selectedSize: product.sizes?.[0]?.name
//             });

//             toast.success("Moved to Cart!");
//             fetchCart(); // Update cart context

//             // 2. Remove from Wishlist
//             await removeFromWishlist(product._id);

//         } catch (err) {
//             if (err.response?.status === 400 && product.sizes?.length > 0) {
//                 // If failed because size is needed, go to product page
//                 toast.info("Please select a size");
//                 navigate(`/product/${product._id}`);
//             } else {
//                 toast.error("Could not move to cart");
//             }
//         }
//     };

//     if (loading) return <div className="text-center py-20">Loading Wishlist...</div>;

//     return (
//         <div className="bg-white min-h-screen">
//             <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
//                 <div className="flex justify-between items-center mb-8">
//                     <h1 className="text-3xl font-bold tracking-tight text-gray-900">My Wishlist ({wishlist.length})</h1>
//                     {wishlist.length > 0 && (
//                         <button
//                             onClick={clearWishlist}
//                             className="text-sm text-red-600 hover:text-red-800 font-medium underline"
//                         >
//                             Remove All
//                         </button>
//                     )}
//                 </div>

//                 {wishlist.length === 0 ? (
//                     <div className="text-center py-20 bg-gray-50 rounded-lg border border-gray-200 dashed">
//                         <h2 className="text-xl font-medium text-gray-900">Your wishlist is empty.</h2>
//                         <p className="mt-2 text-gray-500">Save items you like to buy them later.</p>
//                         <Link to="/products" className="mt-6 inline-block bg-indigo-600 px-6 py-3 rounded-md text-white font-medium hover:bg-indigo-700">
//                             Start Shopping
//                         </Link>
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
//                         {wishlist.map((product) => {
//                              const imageUrl = product.image
//                                 ? (product.image.startsWith('http') ? product.image : `${domainUrl}/${product.image}`)
//                                 : 'https://via.placeholder.com/300';

//                             return (
//                                 <div key={product._id} className="group relative border border-gray-200 rounded-lg p-4 flex flex-col">
//                                     <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-auto lg:h-60">
//                                         <img src={imageUrl} alt={product.name} className="h-full w-full object-cover object-center" />

//                                         {/* Overlay Remove Button */}
//                                         <button
//                                             onClick={() => removeFromWishlist(product._id)}
//                                             className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-sm hover:bg-red-50 text-gray-400 hover:text-red-600 transition"
//                                             title="Remove"
//                                         >
//                                             <TrashIcon className="h-5 w-5" />
//                                         </button>
//                                     </div>

//                                     <div className="mt-4 flex justify-between">
//                                         <div>
//                                             <h3 className="text-sm text-gray-700">
//                                                 <Link to={`/product/${product._id}`}>
//                                                     <span aria-hidden="true" className="absolute inset-0" />
//                                                     {product.name}
//                                                 </Link>
//                                             </h3>
//                                             <p className="mt-1 text-sm text-gray-500">{product.rating ? `★ ${product.rating}` : 'No rating'}</p>
//                                         </div>
//                                         <p className="text-sm font-medium text-gray-900">₹{product.price}</p>
//                                     </div>

//                                     {/* Actions */}
//                                     <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2 relative z-10">
//                                         <button
//                                             onClick={() => handleMoveToCart(product)}
//                                             className="flex-1 flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-2 py-2 text-sm font-medium text-white hover:bg-indigo-700"
//                                         >
//                                             <ShoppingBagIcon className="h-4 w-4 mr-2"/> Move to Cart
//                                         </button>
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default WishlistPage;

// import React from "react";
// import { useWishlist } from "../context/WishlistContext";

// const WishlistPage = () => {
//   const { items, wishlistCount } = useWishlist();

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">My Wishlist ({wishlistCount})</h1>

//       {items.length === 0 ? (
//         <p>No items in wishlist.</p>
//       ) : (
//         <pre>{JSON.stringify(items, null, 2)}</pre>
//       )}
//     </div>
//   );
// };

// export default WishlistPage;

// src/wishlist/WishlistPage.jsx

// src/pages/WishlistPage.jsx

// import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useWishlist } from '../context/WishlistContext';
// import Navbar from '../components/Navbar';
// import { TrashIcon, ShoppingCartIcon, EyeIcon, HeartIcon } from '@heroicons/react/24/outline';
// import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'; // Solid heart for the empty state

// // Define the base URL for image loading
// const BACKEND_BASE_URL = "http://192.168.29.217:5000";

// // --- Component: WishlistProductCard ---
// // Note: This component assumes the wishlistItems in the context are full product objects.
// const WishlistProductCard = ({ product }) => {
//     const { toggleWishlist } = useWishlist();

//     if (!product || !product._id) {
//          // Render a tile for a deleted/unavailable product as per user story
//         return (
//             <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-4 relative opacity-60">
//                 <p className="text-lg font-semibold text-gray-900">Unavailable Product</p>
//                 <p className="text-sm text-red-500">This product has been deleted or is unpublished.</p>
//                 <button
//                     onClick={() => toggleWishlist(product.id, true)}
//                     className="mt-2 text-sm text-red-600 hover:text-red-800"
//                 >
//                     Remove from List
//                 </button>
//             </div>
//         );
//     }

//     const productId = product._id;
//     const name = product?.name || "Product Name Missing";
//     const price = product?.price ? `₹${product.price}` : "Price N/A";
//     const productLink = `/products/${productId}`;

//     // Mock/placeholder data for features not fully implemented in the backend response provided:
//     const isInStock = true;
//     const isAvailable = true; // Use this to check if the product is deleted (handled above)
//     // 🚨 TODO: Integrate Cart Logic for handleAddToCart

//     const imageUrl = product?.image
//     ? product.image.startsWith("http")
//       ? product.image
//       : `${BACKEND_BASE_URL}/${product.image}`
//     : "https://placehold.co/300x300?text=No+Image";

//     const handleRemove = async () => {
//         await toggleWishlist(productId, true);
//         console.log("Product removed successfully from wishlist.");
//     };

//     const handleAddToCart = () => {
//         console.log(`Adding product ${productId} to cart (Implement CartContext logic here).`);
//     };

//     return (
//         <div className="flex flex-col sm:flex-row bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 relative">

//             <div className="w-full sm:w-32 h-32 flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
//                 <img
//                     src={imageUrl}
//                     alt={name}
//                     className="w-full h-full object-cover rounded-md"
//                 />
//             </div>

//             <div className="flex-grow flex flex-col justify-between">
//                 <div>
//                     <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{name}</h3>
//                     <p className="text-2xl font-bold text-indigo-600 mt-1">{price}</p>

//                     {/* Stock Badge */}
//                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${
//                         isInStock && isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                     }`}>
//                         {isInStock && isAvailable ? 'In Stock' : 'Out of Stock'}
//                     </span>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex flex-wrap gap-2 mt-4">
//                     <button
//                         onClick={handleAddToCart}
//                         disabled={!isInStock || !isAvailable}
//                         className={`flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm ${
//                             isInStock && isAvailable
//                                 ? 'text-white bg-indigo-600 hover:bg-indigo-700'
//                                 : 'text-gray-400 bg-gray-200 cursor-not-allowed'
//                         }`}
//                         title={isInStock ? "Add to Cart" : "Out of Stock"}
//                     >
//                         <ShoppingCartIcon className="h-5 w-5 mr-1" />
//                         Add to Cart
//                     </button>

//                     <Link
//                         to={productLink}
//                         className="flex items-center justify-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
//                     >
//                         <EyeIcon className="h-5 w-5 mr-1" />
//                         View
//                     </Link>

//                      <button
//                         onClick={handleRemove}
//                         className="flex items-center justify-center p-2 rounded-full text-red-600 hover:bg-red-50 transition"
//                         title="Remove from Wishlist"
//                     >
//                         <TrashIcon className="h-5 w-5" />
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// --- Main WishlistPage Component ---

// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useWishlist } from "../context/WishlistContext";
// import Navbar from "../components/Navbar";
// import {
//   TrashIcon,
//   ShoppingCartIcon,
//   EyeIcon,
//   HeartIcon,
// } from "@heroicons/react/24/outline";
// import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid"; // Solid heart for the empty state
// import WishlistProductCard from "../components/";

// const WishlistPage = () => {
//   const {
//     wishlistItems, // Array of populated product objects (assumed)
//     fetchWishlist,
//     loading,
//     wishlistCount,
//   } = useWishlist();

//   useEffect(() => {
//     // Fetch the detailed wishlist when the page loads
//     fetchWishlist();
//   }, [fetchWishlist]);

//   // 🚨 TODO: Implement the Clear Wishlist handler
//   const handleClearWishlist = () => {
//     // This would call an API utility to hit the DELETE /api/wishlist endpoint
//     alert("Clear all logic goes here.");
//   };

//   if (loading) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h1 className="text-3xl font-bold tracking-tight text-gray-900 my-8">
//             My Wishlist
//           </h1>
//           <div className="text-center py-10 text-lg text-indigo-600">
//             Loading your favorites...
//           </div>
//         </div>
//       </>
//     );
//   }

//   // --- Empty State ---
//   if (wishlistCount === 0 || wishlistItems.length === 0) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h1 className="text-3xl font-bold tracking-tight text-gray-900 my-8">
//             My Wishlist (0 Items)
//           </h1>
//           <div className="flex flex-col items-center justify-center py-20 ">
//             <h2 className="text-xl font-medium text-gray-700 mb-2">
//               Your wishlist is empty!
//             </h2>
//             <p className="text-gray-500 mb-6">
//               Add products you love and find them here later.
//             </p>
//             <Link
//               to="/products"
//               className="text-white bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-md text-base font-medium transition"
//             >
//               Start Shopping
//             </Link>
//           </div>
//         </div>
//       </>
//     );
//   }

//   // --- Populated List ---
//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <Navbar />
//       <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center my-8">
//           <h1 className="text-3xl font-bold tracking-tight text-gray-900">
//             My Wishlist
//             <span className="text-xl font-normal text-gray-500 ml-3">
//               ({wishlistCount} items)
//             </span>
//           </h1>
//           <button
//             onClick={handleClearWishlist}
//             className="text-sm font-medium text-red-600 hover:text-red-800 disabled:opacity-50"
//             // Disable if the list is empty just in case
//             disabled={wishlistCount === 0}
//           >
//             <TrashIcon className="h-5 w-5 inline mr-1 -mt-0.5" />
//             Remove All
//           </button>
//         </div>

//         <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//           {wishlistItems.map((product) => (
//             // product is either a populated product object or a null/deleted placeholder
//             <WishlistProductCard
//               key={product?._id || product?.id}
//               product={product}
//             />
//           ))}
//         </div>

//         <div className="h-20"></div>
//       </div>
//     </div>
//   );
// };

// export default WishlistPage;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
// import Navbar from '../components/Navbar';
// Using a slightly different set of icons for a cleaner look, but your originals work too
import { TrashIcon, ShoppingCartIcon, EyeIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';




// Define the base URL for image loading
// IMPORTANT: Keep this URL updated for your environment
const BACKEND_BASE_URL = "http://192.168.29.217:5000";

// --- Component: WishlistProductCard (Refined High-End Design) ---
const WishlistProductCard = ({ product }) => {
    const { toggleWishlist } = useWishlist();
   

    if (!product || !product._id) {
        // More sophisticated Unavailable Product Card
        return (
            <div className="flex items-center bg-white border border-red-200 rounded-xl shadow-inner p-6 opacity-70 transition duration-300">
                <TrashIcon className="h-6 w-6 text-red-500 mr-4 flex-shrink-0" />
                <div>
                    <p className="text-lg font-medium text-gray-800">Product Unavailable</p>
                    <p className="text-sm text-red-400">This item has been removed or is no longer for sale.</p>
                </div>
                <button
                    onClick={() => toggleWishlist(product.id, true)}
                    className="ml-auto text-sm font-semibold text-gray-500 hover:text-red-600 transition duration-150"
                >
                    Remove
                </button>
            </div>
        );
    }

    const productId = product._id;
    const name = product?.name || "Product Name Missing";
    // Using an advanced currency format for a premium feel
    const formattedPrice = product?.price ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(product.price) : "Price N/A";
    const productLink = `/products/${productId}`;

    // Mock data
    const isInStock = true;
    const isAvailable = true;

    const imageUrl = product?.image
        ? product.image.startsWith("http")
            ? product.image
            : `${BACKEND_BASE_URL}/${product.image}`
        : "https://placehold.co/300x300/F3F4F6/9CA3AF?text=No+Image";

    const handleRemove = async () => {
        await toggleWishlist(productId, true);
        console.log("Product removed successfully from wishlist.");
    };

    const handleAddToCart = () => {
        // 🚨 TODO: Integrate Cart Logic for handleAddToCart
        console.log(`Adding product ${productId} to cart (Implement CartContext logic here).`);
    };

    return (
        // Premium Card Styling: Larger padding, subtle hover effect, modern shadow
        <div className="flex bg-white border border-gray-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6">
            
            {/* Image Section */}
            <div className="w-28 h-28 sm:w-36 sm:h-36 flex-shrink-0 mr-6">
                <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover rounded-lg "
                />
            </div>

            {/* Details Section */}
            <div className="flex-grow flex flex-col justify-between">
                <div>
                    <Link to={productLink} className="text-xl font-semibold text-gray-900 hover:text-indigo-600 transition line-clamp-2">
                        {name}
                    </Link>
                    <p className="text-xl font-bold text-gray-900 mt-2">
                        {formattedPrice}
                    </p>

                    {/* Stock Status */}
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mt-3 uppercase ${
                        isInStock && isAvailable 
                            ? 'bg-green-50 text-green-700 border border-green-200' 
                            : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                        {isInStock && isAvailable ? 'In Stock' : 'Out of Stock'}
                    </span>
                </div>
            </div>

            {/* Actions Section (Fixed Width for Alignment) */}
            <div className="flex flex-col justify-center items-end ml-4 space-y-3 flex-shrink-0 w-36">
                
                {/* Primary Action: Add to Cart */}
                {/* <button
                    onClick={handleAddToCart}
                    disabled={!isInStock || !isAvailable}
                    className={`flex items-center justify-center w-full px-4 py-2 text-sm font-semibold rounded-lg transition duration-150 shadow-md ${
                        isInStock && isAvailable
                            ? 'text-white bg-indigo-600 hover:bg-indigo-700'
                            : 'text-gray-400 bg-gray-100 cursor-not-allowed'
                    }`}
                >
                    <ShoppingCartIcon className="h-5 w-5 mr-2" />
                    Buy Now
                </button> */}

                {/* Secondary Actions: View & Remove */}
                <div className="flex space-x-2">
                    <Link
                        to={productLink}
                        className="p-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition"
                        title="View Product"
                    >
                        <EyeIcon className="h-5 w-5" />
                    </Link>

                    <button
                        onClick={handleRemove}
                        className="p-2 border border-red-100 text-red-600 rounded-lg hover:bg-red-50 transition"
                        title="Remove from Wishlist"
                    >
                        <TrashIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}


// --- Main WishlistPage Component (Refined High-End Design) ---
const WishlistPage = () => {
    const {
        wishlistItems,
        fetchWishlist,
        loading,
        wishlistCount,
        clearWishlist
    } = useWishlist();

    useEffect(() => {
        fetchWishlist();
    }, [fetchWishlist]);

    const handleClearWishlist = async () => {
        if (window.confirm("Are you sure you want to remove ALL items from your wishlist? This action cannot be undone.")) {
            await clearWishlist();
        }
    };


    if (loading) {
        // Loading State: Clean and Centered
        return (
            <div className="bg-gray-50 min-h-screen">
                {/* <Navbar /> */}
                <div className="pt-24 w-full px-2">

                    <div className="h-64 flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-xl font-medium text-gray-700">Loading your exclusive favorites...</span>
                    </div>
                </div>
            </div>
        );
    }

    // --- Empty State (More visually appealing) ---
    if (wishlistCount === 0 || wishlistItems.length === 0) {
        return (
            <div className="bg-gray-50 min-h-screen">
                {/* <Navbar /> */}
                <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-center py-24  rounded-xl shadow-lg  mt-10">
                        {/* <HeartSolidIcon className="h-16 w-16 text-red-500 mb-4 opacity-70" /> */}
                        
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                            Your Favourites is Empty
                        </h2>
                        <p className="text-gray-500 mb-8 max-w-md text-center">
                            It looks like you haven't saved any products yet. Start exploring our collection and mark your favorites!
                        </p>
                        <Link
                            to="/products"
                            className="text-white bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-full text-base font-medium transition duration-200 shadow-md hover:shadow-lg"
                        >
                            Discover Products
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // --- Populated List ---
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* <Navbar /> */}
            <div className="pt-3 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Section: Title and Clear Button */}
                <div className="flex justify-between items-center py-8 border-b border-gray-200 mb-8 mt-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        My Exclusive Wishlist
                        <span className="text-xl font-light text-gray-500 ml-4">
                            ({wishlistCount} items)
                        </span>
                    </h1>
                    <button
                        onClick={handleClearWishlist}
                        className="flex items-center text-sm font-semibold text-gray-600 hover:text-red-600 transition duration-150 px-3 py-1 rounded-lg border border-transparent hover:border-red-200"
                        disabled={wishlistCount === 0}
                    >
                        <TrashIcon className="h-5 w-5 mr-1" />
                        Clear All Items
                    </button>
                </div>

                {/* Wishlist Items Grid/List */}
                {/* Using a single column for maximum card detail and readability on a list page */}
                <div className="space-y-6">
                    {wishlistItems.map((product) => (
                        <WishlistProductCard 
                            key={product?._id || product?.id || product} 
                            product={product} 
                        />
                    ))}
                </div>

                <div className='h-20'></div>
            </div>
        </div>
    );
};

export default WishlistPage;











