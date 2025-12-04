// // src/components/ProductCard.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';

// const ProductCard = ({ product }) => {
//     // You will typically use the product's unique ID for the link
//     const productLink = `/product/${product._id}`;

//     return (
//         <Link to={productLink} className="group block border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
//             <div className="w-full h-64 bg-gray-100 overflow-hidden">
//                 <img
//                     src={`http://192.168.29.217:5000/${product.image}`} // Adjust to your backend image path
//                     alt={product.name}
//                     className="w-full h-full object-cover object-center group-hover:opacity-75"
//                 />
//             </div>
//             <div className="p-4">
//                 <h3 className="text-lg font-medium text-gray-900 truncate">
//                     {product.name}
//                 </h3>
//                 <p className="mt-1 text-sm text-gray-500">
//                     {product.category?.name || 'Category'}
//                 </p>
//                 <p className="mt-1 text-xl font-bold text-green-600">
//                     ${product.price.toFixed(2)}
//                 </p>
//             </div>
//         </Link>
//     );
// };

// export default ProductCard;

//working codeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { domainUrl } from '../utils/constant';

// // IMPORTANT: Define the base URL for your backend to load images

// const ProductCard = ({ product }) => {
//     // Ensure product data is valid before rendering
//     if (!product || !product._id) return null;

//     // Link uses the product's unique ID for navigation to the detail page
//     const productLink = `/product/${product._id}`;

//     // Construct image URL
//     const imageUrl = product.image
//         ? `${domainUrl}/${product.image}`
//         : 'https://via.placeholder.com/300x300?text=No+Image';

//     return (
//         <div className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition">
//             {/* Link wrapper for the whole card */}
//             <Link to={productLink}>
//                 <div className="w-full h-64 overflow-hidden lg:aspect-none aspect-h-1 aspect-w-1">
//                     <img
//                         src={imageUrl}
//                         alt={product.name}
//                         className="h-full w-full object-cover object-center group-hover:opacity-75"
//                     />
//                 </div>
//                 <div className="p-4">
//                     <h3 className="text-sm text-gray-700 truncate">
//                         {/* Link to Product Detail Page */}
//                         <span aria-hidden="true" className="absolute inset-0" />
//                         {product.name}
//                     </h3>
//                     <p className="mt-1 text-xs text-gray-500">
//                         {product.brand || 'No Brand'}
//                     </p>
//                     <p className="text-lg font-medium text-green-600">
//                         ${product.price ? product.price.toFixed(2) : 'N/A'}
//                     </p>
//                 </div>
//             </Link>
//         </div>
//     );
// };

// export default ProductCard;

// with wishlight

// src/components/ProductCard.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import { HeartIcon } from "@heroicons/react/24/solid"; // Use solid icon for filled state
// import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline"; // Use outline icon for empty state
// import { useWishlist } from "../context/WishlistContext"; // Import the new hook

// // Assuming these utilities are available globally
// const BACKEND_BASE_URL = "http://192.168.29.217:5000";

// // --- ProductCard Component ---
// const ProductCard = ({ product }) => {
//   // Ensure product data is valid
//   if (!product || !product._id) return null;

//   // Use the context hook
//   const { isProductInWishlist, toggleWishlist } = useWishlist();

//   const productId = product._id;
//   const isSaved = isProductInWishlist(productId);

//   // Link uses the product's unique ID for navigation to the detail page
//   const productLink = `/products/${productId}`;

//   // Construct image URL
//   const imageUrl = product?.image
//     ? product.image.startsWith("http")
//       ? product.image
//       : `${BACKEND_BASE_URL}/${product.image}`
//     : "https://placehold.co/500x500?text=No+Image";

//   const name = product?.name || "Product Name Missing";
//   const price = product?.price ? `₹${product.price}` : "Price N/A";

//   // Handler for the heart icon click
//   const handleToggleWishlist = (e) => {
//     // Stop the event from propagating to the Link/parent div
//     e.preventDefault();
//     e.stopPropagation();

//     toggleWishlist(productId, isSaved);
//   };

//   return (
//     <div className="group relative transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl rounded-md overflow-hidden bg-white">
//       <Link to={productLink}>
//         {/* Image Container with Wishlist Icon */}
//         <div className="aspect-square w-full rounded-md bg-gray-200 object-cover relative">
//           <img
//             alt={name}
//             src={imageUrl}
//             className="h-full w-full object-cover"
//             onError={(e) => {
//               e.target.src = "https://placehold.co/500x500?text=Image+Error";
//             }}
//           />

//           {/* Wishlist Toggle Button - Positioned Top Right */}
//           <button
//             onClick={handleToggleWishlist}
//             // 👇 Key Change: Add opacity-0 to hide it by default, and group-hover:opacity-100 to show it on hover.
//             // We also use transition-opacity for a smooth fade-in/out effect.
//             className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300
//                transition-transform hover:scale-110 focus:outline-none"
//             aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
//             title={isSaved ? "Remove from wishlist" : "Add to wishlist"}
//           >
//             {isSaved ? (
//               // Saved state: Solid red heart, visible on hover.
//               <HeartIcon
//                 className="h-6 w-6 text-red-600 [text-shadow:0_0_2px_#ffffff]"
//                 aria-hidden="true"
//               />
//             ) : (
//               // Unsaved state: White outline heart, visible on hover.
//               <HeartOutlineIcon
//                 className="h-6 w-6 text-white drop-shadow-md group-hover:text-red-500"
//                 aria-hidden="true"
//               />
//             )}
//           </button>
//         </div>

//         {/* Product Details */}
//         <div className="mt-4 flex justify-between p-2">
//           <div>
//             <h3 className="text-sm text-gray-700">
//               <span aria-hidden="true" className="absolute inset-0" />
//               {name}
//             </h3>
//           </div>
//           <p className="text-sm font-medium text-gray-900">{price}</p>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default ProductCard;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline';
// import { HeartIcon } from '@heroicons/react/24/solid';
// import { useWishlist } from '../context/WishlistContext';

// const BACKEND_BASE_URL = "http://192.168.29.217:5000";

// const ProductCard = ({ product }) => {
//     if (!product || !product._id) return null;

//     const { isProductInWishlist, toggleWishlist } = useWishlist();

//     const productId = product._id;
//     const isSaved = isProductInWishlist(productId);

//     const productLink = `/products/${productId}`;
//     const name = product?.name || "Product Name Missing";
//     const price = product?.price ? `₹${product.price}` : "Price N/A";

//     const imageUrl = product?.image
//         ? product.image.startsWith("http")
//             ? product.image
//             : `${BACKEND_BASE_URL}/${product.image}`
//         : "https://placehold.co/500x500?text=No+Image";

//     const handleToggleWishlist = (e) => {
//         e.preventDefault();
//         e.stopPropagation();

//         toggleWishlist(productId, isSaved);
//     };

//     return (
//         <div className="group relative bg-white rounded-md overflow-hidden
//                         transition-all duration-300 ease-in-out
//                         hover:scale-105 hover:shadow-xl">

//             {/* Clickable product area */}
//             <Link to={productLink}>
//                 <div className="w-full aspect-square bg-gray-200 overflow-hidden">
//                     <img
//                         alt={name}
//                         src={imageUrl}
//                         className="h-full w-full object-cover"
//                         onError={(e) => {
//                             e.target.src = "https://placehold.co/500x500?text=Image+Error";
//                         }}
//                     />
//                 </div>

//                 <div className="mt-3 flex justify-between px-2 pb-3">
//                     <h3 className="text-sm text-gray-700 font-medium line-clamp-2">
//                         {name}
//                     </h3>
//                     <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">
//                         {price}
//                     </p>
//                 </div>
//             </Link>

//             {/* Wishlist Button */}
//             <button
//                 onClick={handleToggleWishlist}
//                 className="
//                     absolute top-2 right-2 z-20
//                     opacity-100 md:opacity-0 md:group-hover:opacity-100
//                     transition-all duration-300
//                     focus:outline-none
//                 "
//                 aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
//             >
//                 {isSaved ? (
//                     <HeartIcon
//                         className="
//                             h-7 w-7 text-red-600
//                             heart-animate heart-animate-active
//                         "
//                     />
//                 ) : (
//                     <HeartOutlineIcon
//                         className="
//                             h-7 w-7 text-white drop-shadow-md
//                             group-hover:text-red-500
//                             heart-animate heart-animate-inactive
//                         "
//                     />
//                 )}
//             </button>
//         </div>
//     );
// };

// export default ProductCard;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { HeartIcon as HeartOutlineIcon, PlusIcon } from '@heroicons/react/24/outline';
// import { HeartIcon } from '@heroicons/react/24/solid';
// import { useWishlist } from '../context/WishlistContext';
// import { useCart } from '../context/CartContext';

// const BACKEND_BASE_URL = "http://192.168.29.217:5000";

// const ProductCard = ({ product }) => {
//     if (!product || !product._id) return null;

//     const { isProductInWishlist, toggleWishlist } = useWishlist();
//     const { addToCart } = useCart();   // ✅ Correct function name

//     const productId = product._id;
//     const isSaved = isProductInWishlist(productId);

//     const productLink = `/products/${productId}`;
//     const name = product?.name || "Product Name Missing";
//     const price = product?.price ? `₹${product.price}` : "Price N/A";

//     const imageUrl = product?.image
//         ? product.image.startsWith("http")
//             ? product.image
//             : `${BACKEND_BASE_URL}/${product.image}`
//         : "https://placehold.co/500x500?text=No+Image";

//     const handleToggleWishlist = (e) => {
//         e.preventDefault();
//         e.stopPropagation();
//         toggleWishlist(productId, isSaved);
//     };

//     // ✅ FIXED: Correct add-to-cart function
//     const handleAddToCart = (e) => {
//         e.preventDefault();
//         e.stopPropagation();

//         addToCart(productId, { quantity: 1, selectedSize: null });
//     };

//     return (
//         <div className="group relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer
//                          transition-all duration-300 ease-in-out
//                          hover:-translate-y-1 hover:shadow-2xl">

//             <Link to={productLink} className="block">
//                 <div className="w-full aspect-square bg-gray-200 overflow-hidden">
//                     <img
//                         alt={name}
//                         src={imageUrl}
//                         className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//                         onError={(e) => {
//                             e.target.src = "https://placehold.co/500x500?text=Image+Error";
//                         }}
//                     />
//                 </div>

//                 <div className="p-4">
//                     <h4 className="text-base font-medium text-gray-900 line-clamp-2">{name}</h4>

//                     <div className="flex justify-between items-center mt-3">
//                         <span className="text-xl font-bold text-gray-900">{price}</span>

//                         {/* ADD TO CART BUTTON */}
//                         <button
//                             onClick={handleAddToCart}
//                             className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition duration-200"
//                             aria-label="Add to Cart"
//                         >
//                             <PlusIcon className="w-4 h-4" />
//                         </button>
//                     </div>
//                 </div>
//             </Link>

//             {/* Wishlist Button */}
//             <button
//                 onClick={handleToggleWishlist}
//                 className="
//                     absolute top-3 right-3 z-20
//                     opacity-100 md:opacity-0 md:group-hover:opacity-100
//                     transition-all duration-300 bg-white bg-opacity-70 p-1.5 rounded-full
//                     focus:outline-none
//                 "
//                 aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
//             >
//                 {isSaved ? (
//                     <HeartIcon className="h-6 w-6 text-red-600 heart-animate heart-animate-active" />
//                 ) : (
//                     <HeartOutlineIcon className="h-6 w-6 text-gray-700 group-hover:text-red-500 heart-animate heart-animate-inactive" />
//                 )}
//             </button>
//         </div>
//     );
// };

// export default ProductCard;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HeartIcon as HeartOutlineIcon,
  PlusIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { MoonLoader } from "react-spinners";

const BACKEND_BASE_URL = "http://192.168.29.217:5000";

const ProductCard = ({ product }) => {
  if (!product || !product._id) return null;

  const { isProductInWishlist, toggleWishlist } = useWishlist();
  const { addToCart, cartItems } = useCart(); // ✅ get cartItems to check if already in cart
  const [loading, setLoading] = useState(false);
  const productId = product._id;
  const isSaved = isProductInWishlist(productId);

  //  CHECK IF PRODUCT IS ALREADY IN CART
  const alreadyInCart = cartItems.some((item) => item.productId === productId);

  const productLink = `/products/${productId}`;
  const name = product?.name || "Product Name Missing";
  const price = product?.price ? `₹${product.price}` : "Price N/A";

  const imageUrl = product?.image
    ? product.image.startsWith("http")
      ? product.image
      : `${BACKEND_BASE_URL}/${product.image}`
    : "https://placehold.co/500x500?text=No+Image";

  const handleToggleWishlist = (e) => {
  e.preventDefault();
  e.stopPropagation();

  toggleWishlist(productId, isSaved);

  if (isSaved) {
    toast.info("Removed from favourites ", {
      autoClose: 1500,
      position: "top-center",
    });
  } else {
    toast.success("Added to favourites ", {
      autoClose: 1500,
      position: "top-center",
    });
  }
};


  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (alreadyInCart) {
      toast.info("Already in cart ✔", {
        autoClose: 1500,
        position: "top-center",
      });
      return;
    }
    
    setLoading(true);
    const resp = await addToCart(productId, {
      quantity: 1,
      selectedSize: null,
    });
    if (resp.data) {
      setLoading(false);
    }

    // toast.success("Added to cart 🛒", {
    //   autoClose: 1500,
    //   position: "top-center",
    // });
  };

  return (
    <div
      className="group relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer
                         transition-all duration-300 ease-in-out
                         hover:-translate-y-1 hover:shadow-2xl"
    >
      <Link to={productLink} className="block">
        <div className="w-full aspect-square bg-gray-200 overflow-hidden">
          <img
            alt={name}
            src={imageUrl}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="p-4">
          <h4 className="text-base font-medium text-gray-900 line-clamp-2">
            {name}
          </h4>

          <div className="flex justify-between items-center mt-3">
            <span className="text-xl font-bold text-gray-900">{price}</span>

            {/* ⭐ NEW ICON LOGIC */}
            {loading ? (
                <div className="py-[6px] justify-center items-center">

              <MoonLoader color="#da1818" size={16}/>
              </div>
              
            ) : (
              <button
                onClick={handleAddToCart}
                className={`p-2 rounded-full transition duration-200 
                                ${
                                  alreadyInCart
                                    ? "bg-green-100 text-green-600 hover:bg-green-600 hover:text-white"
                                    : "bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white"
                                }`}
                aria-label="Add to Cart"
              >
                {alreadyInCart ? (
                  <CheckIcon className="w-4 h-4" />
                ) : (
                  <PlusIcon className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
        </div>
      </Link>

      <button
        onClick={handleToggleWishlist}
        className="absolute top-3 right-3 z-20 opacity-100 md:opacity-0 md:group-hover:opacity-100
                           transition-all duration-300 bg-white bg-opacity-70 p-1.5 rounded-full"
      >
        {isSaved ? (
          <HeartIcon className="h-6 w-6 text-red-600" />
        
        ) : (
          <HeartOutlineIcon className="h-6 w-6 text-gray-700 group-hover:text-red-500" />
        )}
      </button>
    </div>
  );
};

export default ProductCard;
