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

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   HeartIcon as HeartOutlineIcon,
//   PlusIcon,
//   CheckIcon,
// } from "@heroicons/react/24/outline";
// import { HeartIcon } from "@heroicons/react/24/solid";
// import { useWishlist } from "../context/WishlistContext";
// import { useCart } from "../context/CartContext";
// import { toast } from "react-toastify";
// import { MoonLoader } from "react-spinners";

// const BACKEND_BASE_URL = "http://192.168.29.217:5000";

// const ProductCard = ({ product }) => {
//   if (!product || !product._id) return null;

//   const { isProductInWishlist, toggleWishlist } = useWishlist();
//   const { addToCart, cartItems } = useCart(); // ✅ get cartItems to check if already in cart
//   const [loading, setLoading] = useState(false);
//   const productId = product._id;
//   const isSaved = isProductInWishlist(productId);

//   //  CHECK IF PRODUCT IS ALREADY IN CART
//   const alreadyInCart = cartItems.some((item) => item.productId === productId);

//   const productLink = `/products/${productId}`;
//   const name = product?.name || "Product Name Missing";
//   const price = product?.price ? `₹${product.price}` : "Price N/A";

//   const imageUrl = product?.image
//     ? product.image.startsWith("http")
//       ? product.image
//       : `${BACKEND_BASE_URL}/${product.image}`
//     : "https://placehold.co/500x500?text=No+Image";

//   const handleToggleWishlist = (e) => {
//   e.preventDefault();
//   e.stopPropagation();

//   toggleWishlist(productId, isSaved);

//   if (isSaved) {
//     toast.info("Removed from favourites ", {
//       autoClose: 1500,
//       position: "top-center",
//     });
//   } else {
//     toast.success("Added to favourites ", {
//       autoClose: 1500,
//       position: "top-center",
//     });
//   }
// };

//   const handleAddToCart = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (alreadyInCart) {
//       toast.info("Already in cart ✔", {
//         autoClose: 1500,
//         position: "top-center",
//       });
//       return;
//     }

//     setLoading(true);
//     const resp = await addToCart(productId, {
//       quantity: 1,
//       selectedSize: null,
//     });
//     if (resp.data) {
//       setLoading(false);
//     }

//     // toast.success("Added to cart 🛒", {
//     //   autoClose: 1500,
//     //   position: "top-center",
//     // });
//   };

//   return (
//     <div
//       className="group relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer
//                          transition-all duration-300 ease-in-out
//                          hover:-translate-y-1 hover:shadow-2xl"
//     >
//       <Link to={productLink} className="block">
//         <div className="w-full aspect-square bg-gray-200 overflow-hidden">
//           <img
//             alt={name}
//             src={imageUrl}
//             className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//           />
//         </div>

//         <div className="p-4">
//           <h4 className="text-base font-medium text-gray-900 line-clamp-2">
//             {name}
//           </h4>

//           <div className="flex justify-between items-center mt-3">
//             <span className="text-xl font-bold text-gray-900">{price}</span>

//             {/* ⭐ NEW ICON LOGIC */}
//             {loading ? (
//                 <div className="py-[6px] justify-center items-center">

//               <MoonLoader color="#da1818" size={16}/>
//               </div>

//             ) : (
//               <button
//                 onClick={handleAddToCart}
//                 className={`p-2 rounded-full transition duration-200
//                                 ${
//                                   alreadyInCart
//                                     ? "bg-green-100 text-green-600 hover:bg-green-600 hover:text-white"
//                                     : "bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white"
//                                 }`}
//                 aria-label="Add to Cart"
//               >
//                 {alreadyInCart ? (
//                   <CheckIcon className="w-4 h-4" />
//                 ) : (
//                   <PlusIcon className="w-4 h-4" />
//                 )}
//               </button>
//             )}
//           </div>
//         </div>
//       </Link>

//       <button
//         onClick={handleToggleWishlist}
//         className="absolute top-3 right-3 z-20 opacity-100 md:opacity-0 md:group-hover:opacity-100
//                            transition-all duration-300 bg-white bg-opacity-70 p-1.5 rounded-full"
//       >
//         {isSaved ? (
//           <HeartIcon className="h-6 w-6 text-red-600" />

//         ) : (
//           <HeartOutlineIcon className="h-6 w-6 text-gray-700 group-hover:text-red-500" />
//         )}
//       </button>
//     </div>
//   );
// };

// export default ProductCard;

// import React, { useState } from "react";
// import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
// import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
// import download from "../assets/download1.jpeg";

// const ProductCard = () => {
//   const [isFav, setIsFav] = useState(false);
//   const [activeImage, setActiveImage] = useState(0);

//   return (
//     <div className=" bg-white shadow-lg rounded-3xl p-4 transition-all ">
//       {/* Top Logo */}
//       <div className="flex justify-start mb-2"></div>

//       {/* Product Image */}
//       <div className="bg-gray-100 p-4 rounded-2xl flex justify-center relative">
//         <img
//           src={download}
//           alt="product"
//           className="w-52 transition-all duration-300"
//         />

//         {/* Favorite */}
//       </div>

//       {/* Best Seller Badge */}

//       {/* Title */}

//       <div className="flex justify-between items-center mt-3">
//         <h2 className=" text-lg font-bold text-gray-900">Dunk High</h2>

//           <button
//             onClick={() => setIsFav(!isFav)}
//             className="mr-5"
//           >
//             {isFav ? (
//               <HeartSolid className="w-5 h-5 text-red-500" />
//             ) : (
//               <HeartOutline className="w-5 h-5 text-red-500" />
//             )}
//           </button>

//       </div>
//       <div className="flex mt-4 justify-between items-center">

//       {/* Price */}
//       <div>

//       <p className="text-sm text-gray-700">
//         Price:
//       </p>
//         <span className="text-green-600 font-bold">$180.00</span>
//       </div>

//       {/* Buy Button */}
//       <button className="w-3/5 bg-black text-white  py-3 mr-4 rounded-xl text-sm font-semibold hover:opacity-90 transition-all">
//         Add to Cart
//       </button>
//       </div>

//     </div>
//   );
// };

// export default ProductCard;


//workinggggggg

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   HeartIcon as HeartOutline,
//   PlusIcon,
//   CheckIcon,
// } from "@heroicons/react/24/outline";
// import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
// import { SkewLoader } from "react-spinners";
// import { toast } from "react-toastify";
// import { useWishlist } from "../context/WishlistContext";
// import { useCart } from "../context/CartContext";

// const BACKEND_BASE_URL = "http://192.168.29.217:5000";

// const ProductCard = ({ product }) => {
//   if (!product || !product._id) return null;

//   const { isProductInWishlist, toggleWishlist } = useWishlist();
//   const { addToCart, cartItems } = useCart();

//   const [loading, setLoading] = useState(false);
//   const productId = product._id;
//   const isSaved = isProductInWishlist(productId);

//   const alreadyInCart = cartItems.some((item) => item.productId === productId);
//   const productLink = `/products/${productId}`;

//   const name = product?.name || "No Name";
//   const price = product?.price ? `₹${product.price}` : "N/A";

//   const imageUrl = product?.image
//     ? product.image.startsWith("http")
//       ? product.image
//       : `${BACKEND_BASE_URL}/${product.image}`
//     : "https://placehold.co/500x500?text=No+Image";

//   // WISHLIST FUNCTIONALITY
//   const handleToggleWishlist = (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     toggleWishlist(productId, isSaved);

//     isSaved
//       ? toast.info("Removed from favourites", {
//           autoClose: 1500,
//           position: "top-center",
//         })
//       : toast.success("Added to favourites", {
//           autoClose: 1500,
//           position: "top-center",
//         });
//   };

//   // ADD TO CART
//   const handleAddToCart = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (alreadyInCart) {
//       toast.info("Already in cart ✔", {
//         autoClose: 1500,
//         position: "top-center",
//       });
//       return;
//     }

//     try {
//       setLoading(true); // START LOADER

//       const resp = await addToCart(productId, {
//         quantity: 1,
//         selectedSize: null,
//       });

//       setLoading(false); // STOP LOADER

//       if (resp?.data?.success) {
//         toast.success("Added to cart 🛒", {
//           autoClose: 1500,
//           position: "top-center",
//         });
//       }
//     } catch (error) {
//       setLoading(false); // STOP LOADER ON ERROR
//       toast.error("Failed to add to cart", { position: "top-center" });
//     }
//   };

//   return (
//     <div className="bg-white shadow-xl rounded-3xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
//       <Link to={productLink} className="block">
//         {/* IMAGE */}
//        <div className="bg-gray-100 rounded-2xl overflow-hidden relative">
//   <div className="w-full h-[220px] sm:h-[280px] md:h-[300px] flex items-center justify-center">
//     {imageUrl ? (
//       <img
//         src={imageUrl}
//         alt={name}
//         className="
//           w-full h-full
//           object-contain sm:object-cover
//           object-center
//           transition-transform duration-300
//         "
//       />
//     ) : (
//       <div className="w-full h-full flex items-center justify-center text-[11px] text-gray-400">
//         No Image
//       </div>
//     )}
//   </div>
// </div>


//         {/* TITLE + HEART */}
//         <div className="flex justify-between items-center mt-4">
//           <h2 className="text-lg font-bold text-gray-900">{name}</h2>

//           <button onClick={handleToggleWishlist}>
//             {isSaved ? (
//               <HeartSolid className="w-6 h-6 text-red-600" />
//             ) : (
//               <HeartOutline className="w-6 h-6 text-gray-800 hover:text-red-500" />
//             )}
//           </button>
//         </div>

//         {/* PRICE + ADD TO CART */}
//         <div className="flex justify-between items-center mt-4">
//           <div>
//             <p className="text-xs text-gray-600">Price:</p>
//             <span className="text-green-600 font-bold text-lg">{price}</span>
//           </div>

//           <button
//             onClick={handleAddToCart}
//             className={`w-3/5 py-3 rounded-xl text-sm font-semibold transition-all
//     ${
//       alreadyInCart
//         ? "bg-green-600 text-white hover:opacity-90"
//         : "bg-black text-white hover:opacity-90"
//     }`}
//           >
//             {loading ? (
//               <div className="flex justify-center">
//                 <SkewLoader size={10} color="#ffffff" />
//               </div>
//             ) : alreadyInCart ? (
//               <span className="flex items-center justify-center gap-1">
//                 <CheckIcon className="w-4 h-4" /> Added
//               </span>
//             ) : (
//               <span className="flex items-center justify-center gap-1">
//                 <PlusIcon className="w-4 h-4" /> Add to Cart
//               </span>
//             )}
//           </button>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default ProductCard;






"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, Check, ArrowRight } from "lucide-react"; // Consistent icons
import { toast } from "react-hot-toast"; // Using hot-toast for consistency
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { domainUrl } from "../utils/constant";
// import { useAuth } from "../context/AuthContext";



function classNames(...c) {
  return c.filter(Boolean).join(" ");
}

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const { isProductInWishlist, toggleWishlist } = useWishlist();

  // const { user } = useAuth();


  // Safety check
  if (!product || !product._id) return null;

  // State
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  
  // Derived State
  const isSaved = isProductInWishlist(product._id);
  const isInCart = cartItems.some((item) => {
    const cartId = item.product?._id || item.productId;
    return String(cartId) === String(product._id);
  });

  // Image Helper
  const imageUrl = product.image?.startsWith("http")
    ? product.image
    : `${domainUrl}/${product.image}`;

  const categoryName = typeof product.category === 'object' 
    ? product.category?.name 
    : product.category;

  // Handlers
  const handleCardClick = () => {
    navigate(`/products/${product._id}`);
    window.scrollTo(0, 0);
  };

  const handleToggleWishlist = async (e) => {
    e.stopPropagation();
    if (isWishlistLoading) return;
    
    setIsWishlistLoading(true);
    try {
        await toggleWishlist(product._id, isSaved);
        toast.success(isSaved ? "Removed from favourites" : "Added to favourites",{id:"removed wishlist productcard"});
    } catch (error) {
        console.error(error);
    } finally {
        setIsWishlistLoading(false);
    }
  };





  const handleAddToCart = async (e) => {
    e.stopPropagation();

    if (isInCart) {
      toast.error("This item is already in your cart",{id:"already to cart allproducts"});
      return;
    }

    if (product.stock <= 0) {
        toast.error("This item is out of stock",{id:"out of stock product card"});
        return;
    }

    try {
      await addToCart(product);
      toast.success(`Added ${product.name} to cart`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add to cart");
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group relative aspect-[3/4] w-full cursor-pointer overflow-hidden rounded-[2rem] bg-gray-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
    >
      {/* 1. Background Image */}
      <img
        src={imageUrl}
        alt={product.name}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* 2. Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* 3. Top Left: Category Tag */}
      <div className="absolute left-4 top-4">
        <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-900 backdrop-blur-md shadow-sm">
          {categoryName || "Collection"}
        </span>
      </div>

      {/* 4. Top Right: Action Buttons */}
      <div className="absolute right-4 top-4 flex flex-col gap-3">
        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          disabled={isWishlistLoading}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-md backdrop-blur-md transition-all hover:scale-110 active:scale-95 disabled:opacity-70"
        >
          <Heart
            className={classNames(
              "h-5 w-5 transition-colors",
              isSaved ? "fill-red-500 text-red-500" : "text-gray-900"
            )}
          />
        </button>

        {/* Add To Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isInCart || product.stock <= 0}
          className={classNames(
            "flex h-10 w-10 items-center justify-center rounded-full shadow-md backdrop-blur-md transition-all hover:scale-110 active:scale-95",
            isInCart 
              ? "bg-green-100 text-green-700 cursor-default" 
              : "bg-white/90 text-gray-900 hover:bg-black hover:text-white"
          )}
        >
          {isInCart ? <Check className="h-5 w-5" /> : <ShoppingBag className="h-5 w-5" />}
        </button>
      </div>

      {/* 5. Bottom Info Card */}
      <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <div className="flex items-center justify-between rounded-2xl bg-white/95 p-4 shadow-xl backdrop-blur-md border border-white/50">
          <div className="flex flex-col truncate pr-2">
            <h3 className="truncate text-sm font-bold text-gray-900">
              {product.name}
            </h3>
            <p className="mt-0.5 text-xs font-bold text-gray-500">
              ₹ {product.price?.toLocaleString()}
            </p>
          </div>
          
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 group-hover:bg-black group-hover:text-white transition-colors duration-300">
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>

      


    </div>
  );
};

export default ProductCard;