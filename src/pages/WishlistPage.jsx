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


// // --- Main WishlistPage Component ---
// const WishlistPage = () => {
//     const { 
//         wishlistItems, // Array of populated product objects (assumed)
//         fetchWishlist, 
//         loading,
//         wishlistCount
//     } = useWishlist();

//     useEffect(() => {
//         // Fetch the detailed wishlist when the page loads
//         fetchWishlist(); 
//     }, [fetchWishlist]); 

//     // 🚨 TODO: Implement the Clear Wishlist handler
//     const handleClearWishlist = () => {
//         // This would call an API utility to hit the DELETE /api/wishlist endpoint
//         alert('Clear all logic goes here.');
//     };


//     if (loading) {
//         return (
//             <>
//                 <Navbar />
//                 <div className="min-h-screen pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <h1 className="text-3xl font-bold tracking-tight text-gray-900 my-8">
//                         My Wishlist
//                     </h1>
//                     <div className="text-center py-10 text-lg text-indigo-600">Loading your favorites...</div>
//                 </div>
//             </>
//         );
//     }

//     // --- Empty State ---
//     if (wishlistCount === 0 || wishlistItems.length === 0) {
//         return (
//             <>
//                 <Navbar />
//                 <div className="min-h-screen pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <h1 className="text-3xl font-bold tracking-tight text-gray-900 my-8">
//                         My Wishlist (0 Items)
//                     </h1>
//                     <div className="flex flex-col items-center justify-center py-20 ">
                        
//                         <h2 className="text-xl font-medium text-gray-700 mb-2">
//                             Your wishlist is empty!
//                         </h2>
//                         <p className="text-gray-500 mb-6">
//                             Add products you love and find them here later.
//                         </p>
//                         <Link
//                             to="/products"
//                             className="text-white bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-md text-base font-medium transition"
//                         >
//                             Start Shopping
//                         </Link>
//                     </div>
//                 </div>
//             </>
//         );
//     }

//     // --- Populated List ---
//     return (
//         <div className="bg-gray-100 min-h-screen">
//             <Navbar />
//             <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex justify-between items-center my-8">
//                     <h1 className="text-3xl font-bold tracking-tight text-gray-900">
//                         My Wishlist 
//                         <span className="text-xl font-normal text-gray-500 ml-3">({wishlistCount} items)</span>
//                     </h1>
//                     <button 
//                         onClick={handleClearWishlist} 
//                         className="text-sm font-medium text-red-600 hover:text-red-800 disabled:opacity-50"
//                         // Disable if the list is empty just in case
//                         disabled={wishlistCount === 0} 
//                     >
//                         <TrashIcon className="h-5 w-5 inline mr-1 -mt-0.5"/> 
//                         Remove All
//                     </button>
//                 </div>

//                 <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//                     {wishlistItems.map((product) => (
//                         // product is either a populated product object or a null/deleted placeholder
//                         <WishlistProductCard key={product?._id || product?.id} product={product} />
//                     ))}
//                 </div>

//                 <div className='h-20'></div>
//             </div>
//         </div>
//     );
// };

// export default WishlistPage;



import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import Navbar from '../components/Navbar';
import { TrashIcon, ShoppingCartIcon, EyeIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'; // Solid heart for the empty state

// Define the base URL for image loading
const BACKEND_BASE_URL = "http://192.168.29.217:5000"; 

// --- Component: WishlistProductCard ---
// Note: This component assumes the wishlistItems in the context are full product objects.
const WishlistProductCard = ({ product }) => {
    const { toggleWishlist } = useWishlist();
    
    if (!product || !product._id) {
        // Render a tile for a deleted/unavailable product as per user story
        return (
            <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-4 relative opacity-60">
                <p className="text-lg font-semibold text-gray-900">Unavailable Product</p>
                <p className="text-sm text-red-500">This product has been deleted or is unpublished.</p>
                <button
                    onClick={() => toggleWishlist(product.id, true)}
                    className="mt-2 text-sm text-red-600 hover:text-red-800"
                >
                    Remove from List
                </button>
            </div>
        );
    } 

    const productId = product._id;
    const name = product?.name || "Product Name Missing";
    const price = product?.price ? `₹${product.price}` : "Price N/A";
    const productLink = `/products/${productId}`;

    // Mock/placeholder data for features not fully implemented in the backend response provided:
    const isInStock = true; 
    const isAvailable = true; // Use this to check if the product is deleted (handled above)
    // 🚨 TODO: Integrate Cart Logic for handleAddToCart

    const imageUrl = product?.image
    ? product.image.startsWith("http")
      ? product.image
      : `${BACKEND_BASE_URL}/${product.image}`
    : "https://placehold.co/300x300?text=No+Image";

    const handleRemove = async () => {
        await toggleWishlist(productId, true); 
        console.log("Product removed successfully from wishlist.");
    };

    const handleAddToCart = () => {
        console.log(`Adding product ${productId} to cart (Implement CartContext logic here).`);
    };

    return (
        <div className="flex flex-col sm:flex-row bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 relative">
            
            <div className="w-full sm:w-32 h-32 flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover rounded-md"
                />
            </div>

            <div className="flex-grow flex flex-col justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{name}</h3>
                    <p className="text-2xl font-bold text-indigo-600 mt-1">{price}</p>
                    
                    {/* Stock Badge */}
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${
                        isInStock && isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                        {isInStock && isAvailable ? 'In Stock' : 'Out of Stock'}
                    </span>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 mt-4">
                    <button
                        onClick={handleAddToCart}
                        disabled={!isInStock || !isAvailable}
                        className={`flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm ${
                            isInStock && isAvailable
                                ? 'text-white bg-indigo-600 hover:bg-indigo-700' 
                                : 'text-gray-400 bg-gray-200 cursor-not-allowed'
                        }`}
                        title={isInStock ? "Add to Cart" : "Out of Stock"}
                    >
                        <ShoppingCartIcon className="h-5 w-5 mr-1" />
                        Add to Cart
                    </button>

                    <Link
                        to={productLink}
                        className="flex items-center justify-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                        <EyeIcon className="h-5 w-5 mr-1" />
                        View
                    </Link>

                     <button
                        onClick={handleRemove}
                        className="flex items-center justify-center p-2 rounded-full text-red-600 hover:bg-red-50 transition"
                        title="Remove from Wishlist"
                    >
                        <TrashIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}


// --- Main WishlistPage Component ---
const WishlistPage = () => {
    const { 
        wishlistItems, // Array of populated product objects (assumed)
        fetchWishlist, 
        loading,
        wishlistCount,
        clearWishlist // ⭐️ NEW: Destructure the clearWishlist function
    } = useWishlist();

    useEffect(() => {
        // Fetch the detailed wishlist when the page loads
        fetchWishlist(); 
    }, [fetchWishlist]); 

    // ✅ FIXED: Implement the Clear Wishlist handler
    const handleClearWishlist = async () => {
        if (window.confirm("Are you sure you want to remove ALL items from your wishlist?")) {
            await clearWishlist();
        }
    };


    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 my-8">
                        My Wishlist
                    </h1>
                    <div className="text-center py-10 text-lg text-indigo-600">Loading your favorites...</div>
                </div>
            </>
        );
    }

    // --- Empty State ---
    if (wishlistCount === 0 || wishlistItems.length === 0) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 my-8">
                        My Wishlist (0 Items)
                    </h1>
                    <div className="flex flex-col items-center justify-center py-20 ">
                        
                        <h2 className="text-xl font-medium text-gray-700 mb-2">
                            Your wishlist is empty!
                        </h2>
                        <p className="text-gray-500 mb-6">
                            Add products you love and find them here later.
                        </p>
                        <Link
                            to="/products"
                            className="text-white bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-md text-base font-medium transition"
                        >
                            Start Shopping
                        </Link>
                    </div>
                </div>
            </>
        );
    }

    // --- Populated List ---
    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center my-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        My Wishlist 
                        <span className="text-xl font-normal text-gray-500 ml-3">({wishlistCount} items)</span>
                    </h1>
                    <button 
                        onClick={handleClearWishlist} 
                        className="text-sm font-medium text-red-600 hover:text-red-800 disabled:opacity-50"
                        // Disable if the list is empty just in case
                        disabled={wishlistCount === 0} 
                    >
                        <TrashIcon className="h-5 w-5 inline mr-1 -mt-0.5"/> 
                        Remove All
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {wishlistItems.map((product) => (
                        // product is either a populated product object or a null/deleted placeholder
                        <WishlistProductCard key={product?._id || product?.id} product={product} />
                    ))}
                </div>

                <div className='h-20'></div>
            </div>
        </div>
    );
};

export default WishlistPage;