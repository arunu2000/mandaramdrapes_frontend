// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
// import { MinusIcon, PlusIcon, ArrowLeftIcon, ShieldCheckIcon, TruckIcon } from "@heroicons/react/24/outline";
// import { HeartIcon } from "@heroicons/react/24/outline";
// import { HeartIcon as HeartIconSolid } from "@heroicons/react/20/solid";
// import { BeatLoader } from "react-spinners";
// import toast, { Toaster } from 'react-hot-toast';


// // Context & Utils
// import api from "../utils/api";
// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishlistContext";
// import { useAuth } from "../context/AuthContext";

// // --- Helper to prevent crashes if data is an object instead of string ---
// const safeRender = (value, fallback = "") => {
//   if (!value) return fallback;
//   if (typeof value === 'object' && value.name) return value.name; // Handle object with name
//   if (typeof value === 'object') return JSON.stringify(value); // Fallback for other objects
//   return value; // Return if string/number
// };

// const STATIC_DETAILS = [
//   {
//     name: "Composition & Care",
//     icon: <ShieldCheckIcon className="h-4 w-4 text-gray-500 mr-2" />,
//     items: [
//       "Premium quality material",
//       "Designed for daily use",
//       "Comfortable fit",
//       "Durable construction",
//     ],
//   },
//   {
//     name: "Shipping & Returns",
//     icon: <TruckIcon className="h-4 w-4 text-gray-500 mr-2" />,
//     items: [
//       "Free shipping on orders over ₹1000",
//       "Fast delivery options available",
//       "Easy 30-day returns",
//       "Secure packaging",
//     ],
//   },
// ];

// export default function ProductDetailPage() {
//   const { productId } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isAdding, setIsAdding] = useState(false);
//   const [isAlreadyAdded, setIsAlreadyAdded] = useState(false);
//   const [isWishlistToggling, setIsWishlistToggling] = useState(false);
//   const [relatedProducts, setRelatedProducts] = useState([]);

//   const { cartItems, fetchCart } = useCart();
//   const { user } = useAuth();
//   const { isProductInWishlist, toggleWishlist } = useWishlist();

//   const isInWishlist = product ? isProductInWishlist(product._id) : false;

//   useEffect(() => {
//     if (!user.isAuthenticated && !user.isInitialLoad) {
//       window.history.pushState(null, "", window.location.href);
//       const handlePopState = () => navigate(0);
//       window.addEventListener("popstate", handlePopState);
//       return () => window.removeEventListener("popstate", handlePopState);
//     }
//   }, [user.isAuthenticated, user.isInitialLoad, navigate]);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         window.scrollTo(0, 0);
//         const res = await api.get(`/user/shop/product/${productId}`);
//         setProduct(res.data.product);
//         setRelatedProducts(res.data.relatedProducts || []);
//       } catch (err) {
//         console.error(err);
//         setError(err.response?.status === 404 ? "Product not found" : "Error loading product");
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (productId) fetchProduct();
//   }, [productId]);

//   useEffect(() => {
//     if (cartItems) {
//       setIsAlreadyAdded(cartItems.some((item) => item.productId === productId));
//     }
//   }, [cartItems, productId]);

//   const handleAddToCart = async (e) => {
//     e.preventDefault();
//     if (product.stock <= 0) return toast.error("Sorry, this product is out of stock.");
//     if (isAlreadyAdded) return navigate("/cart");

//     setIsAdding(true);
//     try {
//       const cartData = { productId: product._id, quantity: 1 };
//       await api.post(`/cart/add`, cartData);
//       toast.success(`${product.name} added to cart!`, {
//         onClose: () => {
//           fetchCart();
//           navigate("/cart");
//         },
//       });
//     } catch (err) {
//       if (err.response?.status === 401) {
//         toast.warn("Please log in first", { onClose: () => navigate("/login") });
//       } else {
//         toast.error("Failed to add to cart");
//       }
//     } finally {
//       setIsAdding(false);
//     }
//   };

//   const handleToggleWishlist = async () => {
//     if (!user.isAuthenticated) return toast.warn("Please log in to use wishlist");
//     setIsWishlistToggling(true);
//     const success = await toggleWishlist(product._id, isInWishlist);
//     if (success) {
//       toast.success(isInWishlist ? "Removed from Wishlist" : "Added to Wishlist!");
//     } else {
//       toast.error("Failed to update wishlist");
//     }
//     setIsWishlistToggling(false);
//   };

//   if (loading) return <div className="h-screen flex justify-center items-center bg-white"><BeatLoader color="#000" /></div>;
//   if (error || !product) return <div className="text-center py-20 text-red-600 font-semibold">{error || "Unavailable"}</div>;

//   // Data Preparation
//   const productImageSrc = product.image || "https://via.placeholder.com/1000x1000?text=No+Image";
//   const stock = product.stock ?? 0;
//   const isOutOfStock = stock <= 0;
//   const isLowStock = stock > 0 && stock <= 5;
//   const categoryName = safeRender(product.category, "General");

//   return (
//     <div className="bg-white min-h-screen font-sans text-gray-900">
      
//       {/* Navbar Placeholder / Back Button */}
//       {/* <nav className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-gray-100">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <button
//               onClick={() => navigate(-1)}
//               className="group flex items-center text-sm font-medium text-gray-500 hover:text-black transition-colors"
//             >
//               <ArrowLeftIcon className="mr-2 h-4 w-4" />
//               Back
//             </button>
//             <span className="text-xs font-bold tracking-widest uppercase text-black">
//               {categoryName}
//             </span>
//             <div className="w-16"></div>
//           </div>
//         </div>
//       </nav> */}

//       <main className="mx-auto max-w-7xl px-4 pt-10 pb-16 sm:px-6 lg:px-8 mt-50">
//         <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16 items-start">
          
//           {/* --- LEFT: PRODUCT IMAGE --- */}
//           <div className="flex flex-col gap-6">
//             <div className="relative overflow-hidden w-full bg-white">
//               {/* Using aspect-[4/5] for a nice portrait proportion that fits screens well */}
//               <div className="aspect-[4/5] w-full flex items-center justify-center rounded-2xl">
//                 <img
//                   src={productImageSrc}
//                   alt={safeRender(product.name)}
//                   className="max-h-full max-w-full object-contain"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* --- RIGHT: PRODUCT DETAILS --- */}
//           <div className="mt-10 px-2 sm:px-0 lg:mt-0 lg:sticky lg:top-24">

//             <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-3">
//               {safeRender(product.name)}
//             </h1>
            
//             {/* Stock Indicator (Outside Image) */}
//             <div className="mb-4">
//               {isOutOfStock ? (
//                 <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Out of Stock</span>
//               ) : isLowStock ? (
//                 <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Only {stock} Left</span>
//               ) : (
//                 <span className="text-xs font-bold text-green-700 uppercase tracking-wider">In Stock</span>
//               )}
//             </div>

//             {/* Title & Price */}
            
//             <p className="text-2xl font-medium text-gray-900 mb-6">
//               ₹{product.price?.toLocaleString()}
//             </p>

//             {/* Description */}
//             <div className="prose prose-sm text-gray-600 mb-8 leading-relaxed">
//               <div dangerouslySetInnerHTML={{ __html: product.description || "<p>No description available.</p>" }} />
//             </div>

//             {/* Add to Cart Section */}
//             <form onSubmit={handleAddToCart} className="flex flex-col gap-4">
//               <button
//                 type="submit"
//                 disabled={isAdding || isOutOfStock}
//                 className={`w-full flex items-center justify-center py-4 text-sm font-bold uppercase tracking-widest transition-all rounded
//                   ${isOutOfStock || isAdding 
//                     ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
//                     : "bg-black text-white hover:bg-gray-800 shadow-sm"
//                   }`}
//               >
//                 {isAdding ? <BeatLoader size={8} color="#fff" /> : 
//                  isOutOfStock ? "Sold Out" : 
//                  isAlreadyAdded ? "View Bag" : "Add to Bag"}
//               </button>

//               <button
//                 type="button"
//                 onClick={handleToggleWishlist}
//                 disabled={isWishlistToggling}
//                 className="w-full flex items-center justify-center py-3 text-sm font-medium text-gray-500 border border-gray-100 hover:border-gray-300 hover:text-black transition-all"
//               >
//                 {isInWishlist ? (
//                   <>
//                     <HeartIconSolid className="h-5 w-5 text-red-500 mr-2" />
//                     <span>Saved</span>
//                   </>
//                 ) : (
//                   <>
//                     <HeartIcon className="h-5 w-5 mr-2" />
//                     <span>Save to Wishlist</span>
//                   </>
//                 )}
//               </button>
//             </form>

//             {/* Accordions */}
//             <div className="mt-10 border-t border-gray-100">
//               {STATIC_DETAILS.map((detail) => (
//                 <Disclosure key={detail.name} as="div" className="border-b border-gray-100">
//                   {({ open }) => (
//                     <>
//                       <dt>
//                         <DisclosureButton className="flex w-full items-center justify-between py-5 text-left text-sm font-medium text-gray-900 hover:text-black">
//                           <span className="flex items-center">
//                             {detail.icon}
//                             {detail.name}
//                           </span>
//                           <span className="ml-6 flex items-center">
//                             {open ? (
//                               <MinusIcon className="h-4 w-4" aria-hidden="true" />
//                             ) : (
//                               <PlusIcon className="h-4 w-4" aria-hidden="true" />
//                             )}
//                           </span>
//                         </DisclosureButton>
//                       </dt>
//                       <DisclosurePanel as="dd" className="pb-5 pr-12">
//                         <ul className="list-disc pl-5 text-sm text-gray-500 space-y-1">
//                           {detail.items.map((item) => (
//                             <li key={item}>{item}</li>
//                           ))}
//                         </ul>
//                       </DisclosurePanel>
//                     </>
//                   )}
//                 </Disclosure>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* --- RELATED PRODUCTS (Left Aligned & Clean) --- */}
//         {relatedProducts.length > 0 && (
//           <section className="mt-24 border-t border-gray-100 pt-12">
//             <h2 className="text-lg font-bold text-gray-900 mb-8">You May Also Like</h2>
            
//             <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
//               {relatedProducts.map((item) => (
//                 <div 
//                   key={item._id || item.id} 
//                   className="group relative cursor-pointer"
//                   onClick={() => navigate(`/products/${item._id}`)}
//                 >
//                   <div className="aspect-[3/4] w-full overflow-hidden bg-white mb-3">
//                     <img
//                       src={item.image || "https://via.placeholder.com/300"}
//                       alt={safeRender(item.name)}
//                       className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
//                     />
//                   </div>
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h3 className="text-sm font-medium text-gray-900">
//                         <a href={`/products/${item._id}`}>
//                           <span aria-hidden="true" className="absolute inset-0" />
//                           {safeRender(item.name)}
//                         </a>
//                       </h3>
//                       <p className="mt-1 text-sm text-gray-500">{item.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
//                     </div>
//                     <p className="text-sm font-bold text-gray-900">₹{item.price}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>
//         )}
//       </main>

//       <Toaster position="top-right" />
//     </div>
//   );
// }




///workingggggggggggggggggggggggg


// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
// import { MinusIcon, PlusIcon, ArrowLeftIcon, ShieldCheckIcon, TruckIcon } from "@heroicons/react/24/outline";
// import { HeartIcon } from "@heroicons/react/24/outline";
// import { HeartIcon as HeartIconSolid } from "@heroicons/react/20/solid";
// import { BeatLoader } from "react-spinners";
// import toast, { Toaster } from 'react-hot-toast';

// // Components & Context
// import Navbar from "../components/Navbar"; // Adjust path based on your folder structure
// import api from "../utils/api";
// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishlistContext";
// import { useAuth } from "../context/AuthContext";

// // --- Helper to prevent crashes if data is an object instead of string ---
// const safeRender = (value, fallback = "") => {
//   if (!value) return fallback;
//   if (typeof value === 'object' && value.name) return value.name;
//   if (typeof value === 'object') return JSON.stringify(value);
//   return value;
// };

// const STATIC_DETAILS = [
//   {
//     name: "Composition & Care",
//     icon: <ShieldCheckIcon className="h-4 w-4 text-gray-500 mr-2" />,
//     items: [
//       "Premium quality material",
//       "Designed for daily use",
//       "Comfortable fit",
//       "Durable construction",
//     ],
//   },
//   {
//     name: "Shipping & Returns",
//     icon: <TruckIcon className="h-4 w-4 text-gray-500 mr-2" />,
//     items: [
//       "Free shipping on orders over ₹1000",
//       "Fast delivery options available",
//       "Easy 30-day returns",
//       "Secure packaging",
//     ],
//   },
// ];

// export default function ProductDetailPage() {
//   const { productId } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isAdding, setIsAdding] = useState(false);
//   const [isAlreadyAdded, setIsAlreadyAdded] = useState(false);
//   const [isWishlistToggling, setIsWishlistToggling] = useState(false);
//   const [relatedProducts, setRelatedProducts] = useState([]);

//   const { cartItems, fetchCart } = useCart();
//   const { user, logout } = useAuth(); // Assuming logout is available in useAuth
//   const { isProductInWishlist, toggleWishlist } = useWishlist();

//   const isInWishlist = product ? isProductInWishlist(product._id) : false;

//   // Sync Logic for Navbar Gated Navigation
//   const handleGatedNavigation = (e, path, isProtected) => {
//     if (isProtected && !user.isAuthenticated) {
//       e.preventDefault();
//       toast.warn("Please log in to access this page");
//       navigate("/login");
//     } else {
//       navigate(path);
//     }
//   };

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         window.scrollTo(0, 0);
//         const res = await api.get(`/user/shop/product/${productId}`);
//         setProduct(res.data.product);
//         setRelatedProducts(res.data.relatedProducts || []);
//       } catch (err) {
//         console.error(err);
//         setError(err.response?.status === 404 ? "Product not found" : "Error loading product");
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (productId) fetchProduct();
//   }, [productId]);

//   useEffect(() => {
//     if (cartItems) {
//       setIsAlreadyAdded(cartItems.some((item) => item.productId === productId));
//     }
//   }, [cartItems, productId]);

//   const handleAddToCart = async (e) => {
//     e.preventDefault();
//     if (product.stock <= 0) return toast.error("Sorry, this product is out of stock.");
//     if (isAlreadyAdded) return; // Prevent action if already added

//     setIsAdding(true);
//     try {
//       const cartData = { productId: product._id, quantity: 1 };
//       await api.post(`/cart/add`, cartData);
//       toast.success(`${product.name} added to cart!`);
//       fetchCart();
//     } catch (err) {
//       if (err.response?.status === 401) {
//         toast.warn("Please log in first", { onClose: () => navigate("/login") });
//       } else {
//         toast.error("Failed to add to cart");
//       }
//     } finally {
//       setIsAdding(false);
//     }
//   };

//   const handleToggleWishlist = async () => {
//     if (!user.isAuthenticated) return toast.warn("Please log in to use wishlist");
//     setIsWishlistToggling(true);
//     const success = await toggleWishlist(product._id, isInWishlist);
//     if (success) {
//       toast.success(isInWishlist ? "Removed from Wishlist" : "Added to Wishlist!");
//     } else {
//       toast.error("Failed to update wishlist");
//     }
//     setIsWishlistToggling(false);
//   };

//   if (loading) return <div className="h-screen flex justify-center items-center bg-white"><BeatLoader color="#000" /></div>;
//   if (error || !product) return <div className="text-center py-20 text-red-600 font-semibold">{error || "Unavailable"}</div>;

//   const productImageSrc = product.image || "https://via.placeholder.com/1000x1000?text=No+Image";
//   const stock = product.stock ?? 0;
//   const isOutOfStock = stock <= 0;
//   const isLowStock = stock > 0 && stock <= 5;
//   const categoryName = safeRender(product.category, "General");

//   return (
//     <div className="bg-white min-h-screen font-sans text-gray-900">
//       <Navbar 
//         isAuthenticated={user.isAuthenticated}
//         role={user.role}
//         cartItemCount={cartItems?.length || 0}
//         handleLogout={logout}
//         handleUserIconClick={() => navigate("/profile")}
//         handleGatedNavigation={handleGatedNavigation}
//       />

//       {/* --- BACK BUTTON & CATEGORY HEADER --- */}
//       <nav className="bg-white  mt-25">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-14">
//             <button
//               onClick={() => navigate(-1)}
//               className="group flex items-center text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
//             >
//               <ArrowLeftIcon className="mr-2 h-4 w-4" />
//               Back
//             </button>
//             {/* <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">
//               {categoryName}
//             </span> */}
//             {/* <div className="w-12"></div> Spacer for symmetry */}
//           </div>
//         </div>
//       </nav>

//       <main className="mx-auto max-w-7xl px-4 pt-10 pb-16 sm:px-6 lg:px-8">
//         <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16 items-start">
          
//           {/* LEFT: PRODUCT IMAGE */}
//         {/* --- LEFT: PRODUCT IMAGE --- */}
// <div className="flex flex-col gap-6">
//   {/* Added 'group' and 'overflow-hidden' to container */}
//   <div className="relative overflow-hidden w-full bg-white group rounded-2xl"> 
//     <div className="aspect-[4/5] w-full flex items-center justify-center">
//       <img
//         src={productImageSrc}
//         alt={safeRender(product.name)}
//         /* Added rounding, transition, and slight scale on hover */
//         className="max-h-full max-w-full object-contain rounded-2xl transition-transform duration-700 ease-in-out group-hover:scale-105"
//       />
//     </div>
//   </div>
// </div>

//           {/* RIGHT: PRODUCT DETAILS */}
//           <div className="mt-10 px-2 sm:px-0 lg:mt-0 lg:sticky lg:top-24">
//             <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-3">
//               {safeRender(product.name)}
//             </h1>
            
//             <div className="mb-4">
//               {isOutOfStock ? (
//                 <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Out of Stock</span>
//               ) : isLowStock ? (
//                 <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Only {stock} Left</span>
//               ) : (
//                 <span className="text-xs font-bold text-green-700 uppercase tracking-wider">In Stock</span>
//               )}
//             </div>

//             <p className="text-2xl font-medium text-gray-900 mb-6">
//               ₹{product.price?.toLocaleString()}
//             </p>

//             <div className="prose prose-sm text-gray-600 mb-8 leading-relaxed">
//               <div dangerouslySetInnerHTML={{ __html: product.description || "<p>No description available.</p>" }} />
//             </div>

//             {/* Add to Cart Section */}
//             <form onSubmit={handleAddToCart} className="flex flex-col gap-4">
//               <button
//                 type="submit"
//                 // DISABLED logic: disable if adding, if out of stock, OR if already in cart
//                 disabled={isAdding || isOutOfStock || isAlreadyAdded}
//                 className={`w-full flex items-center justify-center py-4 text-sm font-bold uppercase tracking-widest transition-all rounded
//                   ${(isOutOfStock || isAdding || isAlreadyAdded) 
//                     ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200" 
//                     : "bg-black text-white hover:bg-gray-800 shadow-sm"
//                   }`}
//               >
//                 {isAdding ? <BeatLoader size={8} color="#fff" /> : 
//                  isOutOfStock ? "Sold Out" : 
//                  isAlreadyAdded ? "Product Already in Cart" : "Add to Bag"}
//               </button>

//               <button
//                 type="button"
//                 onClick={handleToggleWishlist}
//                 disabled={isWishlistToggling}
//                 className="w-full flex items-center justify-center py-3 text-sm font-medium text-gray-500 border border-gray-100 hover:border-gray-300 hover:text-black transition-all"
//               >
//                 {isInWishlist ? (
//                   <>
//                     <HeartIconSolid className="h-5 w-5 text-red-500 mr-2" />
//                     <span>Saved</span>
//                   </>
//                 ) : (
//                   <>
//                     <HeartIcon className="h-5 w-5 mr-2" />
//                     <span>Save to Wishlist</span>
//                   </>
//                 )}
//               </button>
//             </form>

//             {/* Accordions */}
//             <div className="mt-10 border-t border-gray-100">
//               {STATIC_DETAILS.map((detail) => (
//                 <Disclosure key={detail.name} as="div" className="border-b border-gray-100">
//                   {({ open }) => (
//                     <>
//                       <dt>
//                         <DisclosureButton className="flex w-full items-center justify-between py-5 text-left text-sm font-medium text-gray-900 hover:text-black">
//                           <span className="flex items-center">
//                             {detail.icon}
//                             {detail.name}
//                           </span>
//                           <span className="ml-6 flex items-center">
//                             {open ? <MinusIcon className="h-4 w-4" /> : <PlusIcon className="h-4 w-4" />}
//                           </span>
//                         </DisclosureButton>
//                       </dt>
//                       <DisclosurePanel as="dd" className="pb-5 pr-12">
//                         <ul className="list-disc pl-5 text-sm text-gray-500 space-y-1">
//                           {detail.items.map((item) => (
//                             <li key={item}>{item}</li>
//                           ))}
//                         </ul>
//                       </DisclosurePanel>
//                     </>
//                   )}
//                 </Disclosure>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* RELATED PRODUCTS */}
//         {relatedProducts.length > 0 && (
//           <section className="mt-24 border-t border-gray-100 pt-12">
//             <h2 className="text-lg font-bold text-gray-900 mb-8">You May Also Like</h2>
//             <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
//               {relatedProducts.map((item) => (
//                 <div 
//                   key={item._id} 
//                   className="group relative cursor-pointer"
//                   onClick={() => navigate(`/products/${item._id}`)}
//                 >
//                   <div className="aspect-[3/4] w-full overflow-hidden bg-white mb-3">
//                     <img
//                       src={item.image || "https://via.placeholder.com/300"}
//                       alt={safeRender(item.name)}
//                       className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
//                     />
//                   </div>
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h3 className="text-sm font-medium text-gray-900">
//                         {safeRender(item.name)}
//                       </h3>
//                       <p className="mt-1 text-sm text-gray-500">{item.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
//                     </div>
//                     <p className="text-sm font-bold text-gray-900">₹{item.price}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>
//         )}
//       </main>

//       <Toaster position="top-right" />
//     </div>
//   );
// }


// "use client";

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
// import { 
//   MinusIcon, 
//   PlusIcon, 
//   ArrowLeftIcon, 
//   ShieldCheckIcon, 
//   TruckIcon 
// } from "@heroicons/react/24/outline";
// import { 
//   Heart, 
//   ShoppingBag, 
//   Check, 
//   ArrowRight,
//   Share2
// } from "lucide-react"; // Using Lucide to match AllProducts
// import { BeatLoader } from "react-spinners";
// import toast, { Toaster } from 'react-hot-toast';
// import { motion } from "framer-motion";
// import FooterSection from "../components/FooterSection";

// // Components & Context
// import Navbar from "../components/Navbar"; 
// import api from "../utils/api";
// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishlistContext";
// import { useAuth } from "../context/AuthContext";
// import { domainUrl } from "../utils/constant";

// // --- HELPERS ---
// const safeRender = (value, fallback = "") => {
//   if (!value) return fallback;
//   if (typeof value === 'object' && value.name) return value.name;
//   if (typeof value === 'object') return JSON.stringify(value);
//   return value;
// };

// function classNames(...c) {
//   return c.filter(Boolean).join(" ");
// }

// const STATIC_DETAILS = [
//   {
//     name: "Composition & Care",
//     icon: <ShieldCheckIcon className="h-5 w-5 text-gray-400" />,
//     items: [
//       "Premium quality material",
//       "Designed for daily use",
//       "Comfortable fit",
//       "Durable construction",
//     ],
//   },
//   {
//     name: "Shipping & Returns",
//     icon: <TruckIcon className="h-5 w-5 text-gray-400" />,
//     items: [
//       "Free shipping on orders over ₹1000",
//       "Fast delivery options available",
//       "Easy 30-day returns",
//       "Secure packaging",
//     ],
//   },
// ];

// // --- MODERN CARD COMPONENT (Reused from AllProducts for consistency) ---
// const ModernProductCard = ({ product, addToCart, cartItems }) => {
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const navigate = useNavigate();

//   // Check if product is already in cart
//   const isInCart = cartItems.some((item) => {
//     const cartId = item.product?._id || item.productId;
//     return String(cartId) === String(product._id);
//   });

//   const imageUrl = product.image?.startsWith("http")
//     ? product.image
//     : `${domainUrl}/${product.image}`;

//   const handleCardClick = () => {
//     navigate(`/products/${product._id}`);
//     window.scrollTo(0,0); // Ensure scroll to top
//   };

//   const handleAddToCart = (e) => {
//     e.stopPropagation();
//     if (isInCart) {
//       toast.error("This item is already in your cart");
//       return;
//     }
//     addToCart(product);
//   };

//   const toggleWishlist = (e) => {
//     e.stopPropagation();
//     setIsWishlisted(!isWishlisted);
//     toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
//   };

//   const categoryName = typeof product.category === 'object' 
//     ? product.category?.name 
//     : product.category;

//   return (
//     <div 
//       onClick={handleCardClick}
//       className="group relative aspect-[3/4] w-full cursor-pointer overflow-hidden rounded-3xl bg-gray-100 transition-all hover:shadow-2xl hover:-translate-y-1"
//     >
//       <img
//         src={imageUrl}
//         alt={product.name}
//         className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
//       />
//       <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
//       <div className="absolute left-4 top-4">
//         <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-900 backdrop-blur-md">
//           {categoryName || "Collection"}
//         </span>
//       </div>

//       <div className="absolute right-4 top-4 flex flex-col gap-3">
//         <button
//           onClick={toggleWishlist}
//           className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-md backdrop-blur-md transition-all hover:scale-110 active:scale-95"
//         >
//           <Heart className={classNames("h-5 w-5 transition-colors", isWishlisted ? "fill-red-500 text-red-500" : "text-gray-900")} />
//         </button>
//         <button
//           onClick={handleAddToCart}
//           className={classNames(
//             "flex h-10 w-10 items-center justify-center rounded-full shadow-md backdrop-blur-md transition-all hover:scale-110 active:scale-95",
//             isInCart ? "bg-green-100 text-green-700 cursor-default" : "bg-white/90 text-gray-900 hover:bg-black hover:text-white"
//           )}
//         >
//           {isInCart ? <Check className="h-5 w-5" /> : <ShoppingBag className="h-5 w-5" />}
//         </button>
//       </div>

//       <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-90 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
//         <div className="flex items-center justify-between rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur-xl border border-white/50">
//           <div className="flex flex-col truncate pr-2">
//             <h3 className="truncate text-sm font-bold text-gray-900">{product.name}</h3>
//             <p className="mt-0.5 text-xs font-bold text-gray-500">₹ {product.price?.toFixed(2)}</p>
//           </div>
//           <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 group-hover:bg-black group-hover:text-white transition-colors duration-300">
//             <ArrowRight className="h-4 w-4" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // --- MAIN DETAIL PAGE COMPONENT ---
// export default function ProductDetailPage() {
//   const { productId } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isAdding, setIsAdding] = useState(false);
//   const [relatedProducts, setRelatedProducts] = useState([]);

//   const { cartItems, addToCart, fetchCart } = useCart(); // Assuming addToCart is available here too
//   const { user, logout } = useAuth();
//   const { isProductInWishlist, toggleWishlist } = useWishlist();

//   const isInWishlist = product ? isProductInWishlist(product._id) : false;
  
//   // Check if current product is already in cart
//   const isAlreadyAdded = cartItems.some((item) => {
//     const cId = item.product?._id || item.productId;
//     return String(cId) === String(productId);
//   });

//   const handleGatedNavigation = (e, path, isProtected) => {
//     if (isProtected && !user.isAuthenticated) {
//       e.preventDefault();
//       toast.error("Please log in to access this page");
//       navigate("/login");
//     } else {
//       navigate(path);
//     }
//   };

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         window.scrollTo(0, 0);
//         const res = await api.get(`/user/shop/product/${productId}`);
//         setProduct(res.data.product);
//         setRelatedProducts(res.data.relatedProducts || []);
//       } catch (err) {
//         console.error(err);
//         setError(err.response?.status === 404 ? "Product not found" : "Error loading product");
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (productId) fetchProduct();
//   }, [productId]);

//   // Handle Add to Cart for the Main Product
//   const handleMainAddToCart = async (e) => {
//     e.preventDefault();
//     if (product.stock <= 0) return toast.error("Sorry, this product is out of stock.");
//     if (isAlreadyAdded) return toast.success("Already in your cart!");

//     setIsAdding(true);
//     try {
//       // Use API directly or context function
//       if (addToCart) {
//         await addToCart(product);
//         toast.success(`Added ${product.name} to cart`);
//       } else {
//         const cartData = { productId: product._id, quantity: 1 };
//         await api.post(`/cart/add`, cartData);
//         fetchCart();
//         toast.success(`${product.name} added to cart!`);
//       }
//     } catch (err) {
//       if (err.response?.status === 401) {
//         toast.error("Please log in first");
//         navigate("/login");
//       } else {
//         toast.error("Failed to add to cart");
//       }
//     } finally {
//       setIsAdding(false);
//     }
//   };

//   // Wrapper for Related Products Add to Cart
//   const handleRelatedAddToCart = (product) => {
//     if(addToCart) {
//       addToCart(product);
//       toast.success(`Added ${product.name} to cart`);
//     }
//   }

//   const handleToggleWishlist = async () => {
//     if (!user.isAuthenticated) return toast.error("Please log in to use wishlist");
//     const success = await toggleWishlist(product._id, isInWishlist);
//     if (success) {
//       toast.success(isInWishlist ? "Removed from Wishlist" : "Added to Wishlist!");
//     }
//   };

//   if (loading) return <div className="h-screen flex justify-center items-center bg-white"><BeatLoader color="#000" /></div>;
//   if (error || !product) return <div className="text-center py-20 text-red-600 font-semibold">{error || "Unavailable"}</div>;

//   const productImageSrc = product.image?.startsWith("http") ? product.image : `${domainUrl}/${product.image}`;
//   const stock = product.stock ?? 0;
//   const isOutOfStock = stock <= 0;
//   const isLowStock = stock > 0 && stock <= 5;
//   const categoryName = safeRender(product.category, "Collection");

//   return (
//     <div className="bg-white min-h-screen font-sans">
//       <Toaster position="top-right" reverseOrder={false} />
      
//       {/* <Navbar 
//         isAuthenticated={user.isAuthenticated}
//         role={user.role}
//         cartItemCount={cartItems?.length || 0}
//         handleLogout={logout}
//         handleUserIconClick={() => navigate("/profile")}
//         handleGatedNavigation={handleGatedNavigation}
//       /> */}

//       <main className="max-w-7xl mx-auto px-4 pt-8 pb-16 sm:px-6 lg:px-8 mt-24">
        
//         {/* --- BREADCRUMB / BACK --- */}
//         <div className="mb-8">
//             <button
//               onClick={() => navigate(-1)}
//               className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 text-sm font-medium text-gray-600 hover:bg-black hover:text-white transition-all duration-300"
//             >
//               <ArrowLeftIcon className="h-4 w-4" />
//               Back to shopping
//             </button>
//         </div>

//         <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16 items-start">
          
//           {/* --- LEFT: PRODUCT IMAGE (Styled like the Card) --- */}
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="flex flex-col gap-6"
//           >
//             <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2.5rem] bg-gray-100 shadow-sm border border-gray-100 group"> 
//                 <img
//                     src={productImageSrc}
//                     alt={safeRender(product.name)}
//                     className="h-full w-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-105"
//                 />
                
//                 {/* Overlay Badge */}
//                 <div className="absolute top-6 left-6">
//                      <span className="inline-flex items-center rounded-full bg-white/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-gray-900 backdrop-blur-md shadow-sm">
//                         {categoryName}
//                      </span>
//                 </div>
//             </div>
//           </motion.div>

//           {/* --- RIGHT: PRODUCT DETAILS --- */}
//           <motion.div 
//              initial={{ opacity: 0, x: 20 }}
//              animate={{ opacity: 1, x: 0 }}
//              transition={{ duration: 0.6, delay: 0.2 }}
//              className="mt-10 px-2 sm:px-0 lg:mt-0 lg:sticky lg:top-24"
//           >
//             {/* Title */}
//             <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 sm:text-5xl mb-4 font-sans">
//               {safeRender(product.name)}
//             </h1>

//             {/* Price & Stock */}
//             <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-8">
//                 <p className="text-3xl font-bold text-gray-900">
//                   ₹ {product.price?.toLocaleString()}
//                 </p>
//                 <div className="flex items-center gap-2">
//                     {isOutOfStock ? (
//                         <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">Out of Stock</span>
//                     ) : isLowStock ? (
//                         <span className="inline-flex items-center rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700 ring-1 ring-inset ring-orange-600/10">Only {stock} Left</span>
//                     ) : (
//                         <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">In Stock</span>
//                     )}
//                 </div>
//             </div>

//             {/* Description */}
//             <div className="prose prose-sm text-gray-500 mb-10 leading-relaxed max-w-none">
//               <div dangerouslySetInnerHTML={{ __html: product.description || "<p>No description available.</p>" }} />
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-col gap-4 mb-10">
//               <button
//                 onClick={handleMainAddToCart}
//                 disabled={isAdding || isOutOfStock || isAlreadyAdded}
//                 className={`w-full flex items-center justify-center gap-3 rounded-full py-4 text-sm font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0
//                   ${(isOutOfStock || isAdding || isAlreadyAdded) 
//                     ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none" 
//                     : "bg-black text-white hover:bg-gray-900"
//                   }`}
//               >
//                 {isAdding ? <BeatLoader size={8} color="#fff" /> : 
//                  isOutOfStock ? "Sold Out" : 
//                  isAlreadyAdded ? <><Check className="h-5 w-5"/> In Cart</> : 
//                  <><ShoppingBag className="h-5 w-5"/> Add to Cart</>}
//               </button>

//               <button
//                 onClick={handleToggleWishlist}
//                 className="w-full flex items-center justify-center gap-2 rounded-full py-4 text-sm font-bold uppercase tracking-wider border border-gray-200 text-gray-900 hover:bg-gray-50 transition-all hover:border-gray-300"
//               >
//                 <Heart className={classNames("h-5 w-5", isInWishlist ? "fill-red-500 text-red-500" : "")} />
//                 {isInWishlist ? "Saved to Wishlist" : "Save to Wishlist"}
//               </button>
//             </div>

//             {/* Accordions (Clean Style) */}
//             <div className="divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-gray-50/50 p-2">
//               {STATIC_DETAILS.map((detail) => (
//                 <Disclosure key={detail.name} as="div">
//                   {({ open }) => (
//                     <>
//                       <dt>
//                         <DisclosureButton className="flex w-full items-center justify-between p-4 text-left text-sm font-semibold text-gray-900 hover:bg-white rounded-xl transition-colors">
//                           <span className="flex items-center gap-3">
//                             {detail.icon}
//                             {detail.name}
//                           </span>
//                           <span className="ml-6 flex items-center text-gray-400">
//                             {open ? <MinusIcon className="h-4 w-4" /> : <PlusIcon className="h-4 w-4" />}
//                           </span>
//                         </DisclosureButton>
//                       </dt>
//                       <DisclosurePanel as="dd" className="px-4 pb-4 pt-1">
//                         <ul className="list-disc pl-11 text-sm text-gray-500 space-y-1">
//                           {detail.items.map((item) => (
//                             <li key={item}>{item}</li>
//                           ))}
//                         </ul>
//                       </DisclosurePanel>
//                     </>
//                   )}
//                 </Disclosure>
//               ))}
//             </div>
            
//             <div className="mt-8 flex items-center justify-center gap-4 text-sm text-gray-400">
//                 <span className="flex items-center gap-1 hover:text-gray-900 cursor-pointer transition-colors"><ShieldCheckIcon className="h-4 w-4"/> Authentic</span>
//                 <span className="h-4 w-px bg-gray-200"></span>
//                 <span className="flex items-center gap-1 hover:text-gray-900 cursor-pointer transition-colors"><Share2 className="h-4 w-4"/> Share</span>
//             </div>

//           </motion.div>
//         </div>

//         {/* --- RELATED PRODUCTS (Using ModernProductCard) --- */}
//         {relatedProducts.length > 0 && (
//           <section className="mt-32">
//              <div className="text-center mb-12">
//                 <motion.h2 
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   className="text-3xl font-bold tracking-tighter sm:text-4xl font-sans"
//                 >
//                   <span className="bg-gradient-to-r from-gray-900 via-indigo-800 to-rose-700 bg-clip-text text-transparent">
//                     You May Also Like
//                   </span>
//                 </motion.h2>
//                 <div className="h-1 bg-gray-900 mx-auto mt-4 rounded-full w-20" />
//             </div>

//             <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
//               {relatedProducts.map((item) => (
//                 <ModernProductCard 
//                     key={item._id} 
//                     product={item} 
//                     addToCart={handleRelatedAddToCart}
//                     cartItems={cartItems}
//                 />
//               ))}
//             </div>
//           </section>
//         )}
//       </main>
//       <FooterSection/>
//     </div>
//   );
// }



"use client";

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { 
  MinusIcon, 
  PlusIcon, 
  ArrowLeftIcon, 
  ShieldCheckIcon, 
  TruckIcon 
} from "@heroicons/react/24/outline";
import { 
  Heart, 
  ShoppingBag, 
  Check, 
  ArrowRight,
  Share2
} from "lucide-react"; // Using Lucide to match AllProducts
import { BeatLoader } from "react-spinners";
import toast, { Toaster } from 'react-hot-toast';
import { motion } from "framer-motion";
import FooterSection from "../components/FooterSection";

// Components & Context
import Navbar from "../components/Navbar"; 
import api from "../utils/api";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import { domainUrl } from "../utils/constant";


// --- HELPERS ---
const safeRender = (value, fallback = "") => {
  if (!value) return fallback;
  if (typeof value === 'object' && value.name) return value.name;
  if (typeof value === 'object') return JSON.stringify(value);
  return value;
};

function classNames(...c) {
  return c.filter(Boolean).join(" ");
}

const STATIC_DETAILS = [
  {
    name: "Composition & Care",
    icon: <ShieldCheckIcon className="h-5 w-5 text-gray-400" />,
    items: [
      "Premium quality material",
      "Designed for daily use",
      "Comfortable fit",
      "Durable construction",
    ],
  },
  {
    name: "Shipping & Returns",
    icon: <TruckIcon className="h-5 w-5 text-gray-400" />,
    items: [
      "Free shipping on orders over ₹1000",
      "Fast delivery options available",
      "Easy 30-day returns",
      "Secure packaging",
    ],
  },
];

// --- MODERN CARD COMPONENT (Reused from AllProducts for consistency) ---
const ModernProductCard = ({ product, addToCart, cartItems }) => {
  
  const navigate = useNavigate();

  // Check if product is already in cart
  const isInCart = cartItems.some((item) => {
    const cartId = item.product?._id || item.productId;
    return String(cartId) === String(product._id);
  });

  const imageUrl = product.image?.startsWith("http")
    ? product.image
    : `${domainUrl}/${product.image}`;

  const handleCardClick = () => {
    navigate(`/products/${product._id}`);
    window.scrollTo(0,0); // Ensure scroll to top
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (isInCart) {
      toast.error("This item is already in your cart",{id:"This item is already in your cartmnmnm"});
      return;
    }
    addToCart(product);
  };


  const { isProductInWishlist, toggleWishlist } = useWishlist();

const isWishlisted = isProductInWishlist(product._id);


  const handleToggleWishlist = async (e) => {
  e.stopPropagation();

  const success = await toggleWishlist(product._id, isWishlisted);
  if (success) {
    toast.success(
      isWishlisted ? "Removed from wishlist" : "Added to wishlist"
    ,{id:"This item is already in your cartbbbbb"});
  }
};


  const categoryName = typeof product.category === 'object' 
    ? product.category?.name 
    : product.category;

  return (
    <div 
      onClick={handleCardClick}
      className="group relative aspect-[3/4] w-full cursor-pointer overflow-hidden rounded-3xl bg-gray-100 transition-all hover:shadow-2xl hover:-translate-y-1"
    >
      <img
        src={imageUrl}
        alt={product.name}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="absolute left-4 top-4">
        <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-900 backdrop-blur-md">
          {categoryName || "Collection"}
        </span>
      </div>

      <div className="absolute right-4 top-4 flex flex-col gap-3">
        <button
          onClick={handleToggleWishlist}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-md backdrop-blur-md transition-all hover:scale-110 active:scale-95"
        >
          <Heart className={classNames("h-5 w-5 transition-colors", isWishlisted ? "fill-red-500 text-red-500" : "text-gray-900")} />
        </button>
        <button
          onClick={handleAddToCart}
          className={classNames(
            "flex h-10 w-10 items-center justify-center rounded-full shadow-md backdrop-blur-md transition-all hover:scale-110 active:scale-95",
            isInCart ? "bg-green-100 text-green-700 cursor-default" : "bg-white/90 text-gray-900 hover:bg-black hover:text-white"
          )}
        >
          {isInCart ? <Check className="h-5 w-5" /> : <ShoppingBag className="h-5 w-5" />}
        </button>
      </div>

      <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-90 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <div className="flex items-center justify-between rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur-xl border border-white/50">
          <div className="flex flex-col truncate pr-2">
            <h3 className="truncate text-sm font-bold text-gray-900">{product.name}</h3>
            <p className="mt-0.5 text-xs font-bold text-gray-500">₹ {product.price?.toFixed(2)}</p>
          </div>
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 group-hover:bg-black group-hover:text-white transition-colors duration-300">
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN DETAIL PAGE COMPONENT ---
export default function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const { cartItems, addToCart, fetchCart } = useCart(); // Assuming addToCart is available here too
  const { user, logout } = useAuth();
  const { isProductInWishlist, toggleWishlist } = useWishlist();

  const isInWishlist = product ? isProductInWishlist(product._id) : false;
  
  // Check if current product is already in cart
  const isAlreadyAdded = cartItems.some((item) => {
    const cId = item.product?._id || item.productId;
    return String(cId) === String(productId);
  });

  const handleGatedNavigation = (e, path, isProtected) => {
    if (isProtected && !user.isAuthenticated) {
      e.preventDefault();
      toast.error("Please log in to access this page",{id:"pllllllllease logged in"});
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        window.scrollTo(0, 0);
        const res = await api.get(`/user/shop/product/${productId}`);
        setProduct(res.data.product);
        setRelatedProducts(res.data.relatedProducts || []);
      } catch (err) {
        console.error(err);
        setError(err.response?.status === 404 ? "Product not found" : "Error loading product");
      } finally {
        setLoading(false);
      }
    };
    if (productId) fetchProduct();
  }, [productId]);

  // Handle Add to Cart for the Main Product
  const handleMainAddToCart = async (e) => {
    e.preventDefault();
    if (product.stock <= 0) return toast.error("Sorry, this product is out of stock.",{id:"sorry product is out of stooooooooooockkkk"});
    if (isAlreadyAdded) return toast.success("Already in your cart!"),{id:"sorry product is out of stooooooooooockkkkk"};

    setIsAdding(true);
    try {
      // Use API directly or context function
      if (addToCart) {
        await addToCart(product);
        toast.success(`Added ${product.name} to cart`,{id:"added productsss"});
      } else {
        const cartData = { productId: product._id, quantity: 1 };
        await api.post(`/cart/add`, cartData);
        fetchCart();
        toast.success(`${product.name} added to cart!`,{id:"added to cart done"});
      }
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Please log in first",{id:"sorry pleaselogged in"});
        navigate("/login");
      } else {
        toast.error("Failed to add to cart",{id:"failedddddddd"});
      }
    } finally {
      setIsAdding(false);
    }
  };

  // Wrapper for Related Products Add to Cart
  const handleRelatedAddToCart = (product) => {
    if(addToCart) {
      addToCart(product);
      toast.success(`Added ${product.name} to cart`,{id:"sorry product is adddedddd"});
    }
  }

  const handleToggleWishlist = async () => {
    if (!user.isAuthenticated) return toast.error("Please log in to use wishlist",{id:"please be login"});
    const success = await toggleWishlist(product._id, isInWishlist);
    if (success) {
      toast.success(isInWishlist ? "Removed from Wishlist" : "Added to Wishlist!",{id:"removed or add to wishlist"});
    }
  };

  if (loading) return <div className="h-screen flex justify-center items-center bg-white"><BeatLoader color="#000" /></div>;
  if (error || !product) return <div className="text-center py-20 text-red-600 font-semibold">{error || "Unavailable"}</div>;

  const productImageSrc = product.image?.startsWith("http") ? product.image : `${domainUrl}/${product.image}`;
  const stock = product.stock ?? 0;
  const isOutOfStock = stock <= 0;
  const isLowStock = stock > 0 && stock <= 5;
  const categoryName = safeRender(product.category, "Collection");

  return (
    <div className="bg-white min-h-screen font-sans">
      <Toaster position="top-right" reverseOrder={false} />
      
      {/* <Navbar 
        isAuthenticated={user.isAuthenticated}
        role={user.role}
        cartItemCount={cartItems?.length || 0}
        handleLogout={logout}
        handleUserIconClick={() => navigate("/profile")}
        handleGatedNavigation={handleGatedNavigation}
      /> */}

      <main className="max-w-7xl mx-auto px-4 pt-8 pb-16 sm:px-6 lg:px-8 mt-24">
        
        {/* --- BREADCRUMB / BACK --- */}
        <div className="mb-8">
            <button
              onClick={() => navigate(-1)}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 text-sm font-medium text-gray-600 hover:bg-black hover:text-white transition-all duration-300"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back to shopping
            </button>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16 items-start">
          
          {/* --- LEFT: PRODUCT IMAGE (Styled like the Card) --- */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2.5rem] bg-gray-100 shadow-sm border border-gray-100 group"> 
                <img
                    src={productImageSrc}
                    alt={safeRender(product.name)}
                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
                
                {/* Overlay Badge */}
                <div className="absolute top-6 left-6">
                     <span className="inline-flex items-center rounded-full bg-white/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-gray-900 backdrop-blur-md shadow-sm">
                        {categoryName}
                     </span>
                </div>
            </div>
          </motion.div>

          {/* --- RIGHT: PRODUCT DETAILS --- */}
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="mt-10 px-2 sm:px-0 lg:mt-0 lg:sticky lg:top-24"
          >
            {/* Title */}
            <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 sm:text-5xl mb-4 font-sans">
              {safeRender(product.name)}
            </h1>

            {/* Price & Stock */}
            <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-8">
                <p className="text-3xl font-bold text-gray-900">
                  ₹ {product.price?.toLocaleString()}
                </p>
                <div className="flex items-center gap-2">
                    {isOutOfStock ? (
                        <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">Out of Stock</span>
                    ) : isLowStock ? (
                        <span className="inline-flex items-center rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700 ring-1 ring-inset ring-orange-600/10">Only {stock} Left</span>
                    ) : (
                        <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">In Stock</span>
                    )}
                </div>
            </div>

            {/* Description */}
            <div className="prose prose-sm text-gray-500 mb-10 leading-relaxed max-w-none">
              <div dangerouslySetInnerHTML={{ __html: product.description || "<p>No description available.</p>" }} />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 mb-10">
              <button
                onClick={handleMainAddToCart}
                disabled={isAdding || isOutOfStock || isAlreadyAdded}
                className={`w-full flex items-center justify-center gap-3 rounded-full py-4 text-sm font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0
                  ${(isOutOfStock || isAdding || isAlreadyAdded) 
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none" 
                    : "bg-black text-white hover:bg-gray-900"
                  }`}
              >
                {isAdding ? <BeatLoader size={8} color="#fff" /> : 
                 isOutOfStock ? "Sold Out" : 
                 isAlreadyAdded ? <><Check className="h-5 w-5"/> In Cart</> : 
                 <><ShoppingBag className="h-5 w-5"/> Add to Cart</>}
              </button>

              <button
                onClick={handleToggleWishlist}
                className="w-full flex items-center justify-center gap-2 rounded-full py-4 text-sm font-bold uppercase tracking-wider border border-gray-200 text-gray-900 hover:bg-gray-50 transition-all hover:border-gray-300"
              >
                <Heart className={classNames("h-5 w-5", isInWishlist ? "fill-red-500 text-red-500" : "")} />
                {isInWishlist ? "Saved to Wishlist" : "Save to Wishlist"}
              </button>
            </div>

            {/* Accordions (Clean Style) */}
            <div className="divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-gray-50/50 p-2">
              {STATIC_DETAILS.map((detail) => (
                <Disclosure key={detail.name} as="div">
                  {({ open }) => (
                    <>
                      <dt>
                        <DisclosureButton className="flex w-full items-center justify-between p-4 text-left text-sm font-semibold text-gray-900 hover:bg-white rounded-xl transition-colors">
                          <span className="flex items-center gap-3">
                            {detail.icon}
                            {detail.name}
                          </span>
                          <span className="ml-6 flex items-center text-gray-400">
                            {open ? <MinusIcon className="h-4 w-4" /> : <PlusIcon className="h-4 w-4" />}
                          </span>
                        </DisclosureButton>
                      </dt>
                      <DisclosurePanel as="dd" className="px-4 pb-4 pt-1">
                        <ul className="list-disc pl-11 text-sm text-gray-500 space-y-1">
                          {detail.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              ))}
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1 hover:text-gray-900 cursor-pointer transition-colors"><ShieldCheckIcon className="h-4 w-4"/> Authentic</span>
                <span className="h-4 w-px bg-gray-200"></span>
                <span className="flex items-center gap-1 hover:text-gray-900 cursor-pointer transition-colors"><Share2 className="h-4 w-4"/> Share</span>
            </div>

          </motion.div>
        </div>

        {/* --- RELATED PRODUCTS (Using ModernProductCard) --- */}
        {relatedProducts.length > 0 && (
          <section className="mt-32">
             <div className="text-center mb-12">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl font-bold tracking-tighter sm:text-4xl font-sans"
                >
                  <span className="bg-gradient-to-r from-gray-900 via-indigo-800 to-rose-700 bg-clip-text text-transparent">
                    You May Also Like
                  </span>
                </motion.h2>
                <div className="h-1 bg-gray-900 mx-auto mt-4 rounded-full w-20" />
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {relatedProducts.map((item) => (
                <ModernProductCard 
                    key={item._id} 
                    product={item} 
                    addToCart={handleRelatedAddToCart}
                    cartItems={cartItems}
                />
              ))}
            </div>
          </section>
        )}
      </main>
      <FooterSection/>
    </div>
  );
}