// import React, { useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { domainUrl } from "../utils/constant";

// const ChevronLeftIcon = (props) => (
//   <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
//   </svg>
// );

// const ChevronRightIcon = (props) => (
//   <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
//   </svg>
// );

// const FeaturedProducts = ({
//   featuredProducts,
//   productsLoading,
//   productsError,
//   handleAddToCart,
//   isAdding,
// }) => {
//   const scrollContainerRef = useRef(null);
//   const navigate = useNavigate();

//   // Scroll horizontally
//   const scroll = (direction) => {
//     if (scrollContainerRef.current) {
//       const scrollAmount = direction === "left" ? -300 : 300;
//       scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
//     }
//   };

//   // Helper for missing images
//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return "https://via.placeholder.com/300?text=No+Image";
//     return imagePath.startsWith("http") ? imagePath : `${domainUrl}/${imagePath}`;
//   };

//   return (
//     <section className="bg-white">
//       <div className="mx-auto max-w-7xl px-6 py-16 sm:px-6 lg:px-8">
//         <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
//           Featured Products
//         </h2>

//         {/* Loading and Error States */}
//         {productsLoading && (
//           <div className="text-center text-gray-600">Loading products...</div>
//         )}
//         {productsError && (
//           <div className="text-center text-red-600">{productsError}</div>
//         )}

//         {/* Horizontal Scroll Product List */}
//         {!productsLoading && !productsError && featuredProducts.length > 0 ? (
//           <div className="relative">
//             {/* Left Arrow */}
//             <button
//               onClick={() => scroll("left")}
//               className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/70 rounded-full p-2 shadow-md hover:bg-white transition-all"
//             >
//               <ChevronLeftIcon className="size-6 text-gray-700" />
//             </button>

//             <div
//               ref={scrollContainerRef}
//               className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 -mx-4 px-4 gap-x-6 sm:gap-x-8"
//               style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//             >
//               {featuredProducts.map((product) => (
//                 <div key={product._id} className="w-64 sm:w-72 shrink-0 snap-start">
//                   <Link to={`/products/${product._id}`} className="block">
//                     <div className="relative">
//                       <div className="relative h-72 w-full overflow-hidden rounded-lg">
//                         <img
//                           alt={product.name}
//                           src={getImageUrl(product.image)}
//                           className="size-full object-cover"
//                         />
//                       </div>
//                       <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
//                         <div
//                           aria-hidden="true"
//                           className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
//                         />
//                         <p className="relative text-lg font-semibold text-white">
//                           ₹{product.price.toFixed(2)}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="relative mt-4">
//                       <h3 className="text-sm font-medium text-gray-900">
//                         {product.name}
//                       </h3>
//                       <p className="mt-1 text-sm text-gray-500">
//                         {product.category?.name || "General"}
//                       </p>
//                     </div>
//                   </Link>

//                   {/* Add to Bag Button */}
//                   <div className="mt-6">
//                     <button
//                       onClick={() => handleAddToCart(product)}
//                       disabled={isAdding === product._id}
//                       className="relative w-full flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {isAdding === product._id ? "Adding..." : "Add to bag"}
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Right Arrow */}
//             <button
//               onClick={() => scroll("right")}
//               className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/70 rounded-full p-2 shadow-md hover:bg-white transition-all"
//             >
//               <ChevronRightIcon className="size-6 text-gray-700" />
//             </button>
//           </div>
//         ) : (
//           !productsLoading &&
//           featuredProducts.length === 0 && (
//             <div className="text-center text-gray-500 py-10 border-t border-gray-100">
//               No featured products available at this time.
//             </div>
//           )
//         )}
//       </div>
//     </section>
//   );
// };

// export default FeaturedProducts;

// import React, { useRef, useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { domainUrl } from "../utils/constant";
// import Loader  from "./Loader";


// const ChevronLeftIcon = (props) => (
//   <svg
//     {...props}
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     className="w-6 h-6"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M15.75 19.5L8.25 12l7.5-7.5"
//     />
//   </svg>
// );

// const ChevronRightIcon = (props) => (
//   <svg
//     {...props}
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     className="w-6 h-6"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M8.25 4.5l7.5 7.5-7.5 7.5"
//     />
//   </svg>
// );

// const FeaturedProducts = ({
//   featuredProducts,
//   productsLoading,
//   productsError,
//   handleAddToCart,
//   isAdding,
// }) => {
//   const scrollContainerRef = useRef(null);
//   const navigate = useNavigate();

//   const [isScrollable, setIsScrollable] = useState(false);

//   // --- Detect scrollability dynamically ---
//   useEffect(() => {
//     const checkScrollable = () => {
//       const container = scrollContainerRef.current;
//       if (container) {
//         setIsScrollable(container.scrollWidth > container.clientWidth);
//       }
//     };

//     checkScrollable();

//     // Recheck when window resizes or products change
//     window.addEventListener("resize", checkScrollable);
//     return () => window.removeEventListener("resize", checkScrollable);
//   }, [featuredProducts]);

//   const scroll = (direction) => {
//     if (scrollContainerRef.current) {
//       const scrollAmount = direction === "left" ? -300 : 300;
//       scrollContainerRef.current.scrollBy({
//         left: scrollAmount,
//         behavior: "smooth",
//       });
//     }
//   };

//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return "https://via.placeholder.com/300?text=No+Image";
//     return imagePath.startsWith("http")
//       ? imagePath
//       : `${domainUrl}/${imagePath}`;
//   };

//   return (
//     <section className="bg-white">
//       <div className="mx-auto max-w-7xl px-6 py-16 sm:px-6 lg:px-8">
//         <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
//           Featured Products
//         </h2>

//         {productsLoading && (
//           <div className="py-10">
//             <Loader message="Fetching featured products..." />
//           </div>
//         )}

//         {productsError && (
//           <div className="text-center text-red-600">{productsError}</div>
//         )}

//         {!productsLoading && !productsError && featuredProducts.length > 0 ? (
//           <div className="relative">
//             {/*  Left Chevron only if scrollable */}
//             {isScrollable && (
//               <button
//                 onClick={() => scroll("left")}
//                 className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-all"
//               >
//                 <ChevronLeftIcon className="size-6 text-gray-700" />
//               </button>
//             )}

//             <div
//               ref={scrollContainerRef}
//               className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 -mx-4 px-4 gap-x-6 sm:gap-x-8"
//               style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//             >
//               {featuredProducts.map((product) => (
//                 <div
//                   key={product._id}
//                   className="w-64 sm:w-72 shrink-0 snap-start"
//                 >
//                   <Link to={`/products/${product._id}`} className="block">
//                     <div className="relative">
//                       <div className="relative h-72 w-full overflow-hidden rounded-lg">
//                         <img
//                           alt={product.name}
//                           src={getImageUrl(product.image)}
//                           className="size-full object-cover"
//                         />
//                       </div>
//                       <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
//                         <div
//                           aria-hidden="true"
//                           className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
//                         />
//                         <p className="relative text-lg font-semibold text-white">
//                           ₹{product.price.toFixed(2)}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="relative mt-4">
//                       <h3 className="text-sm font-medium text-gray-900">
//                         {product.name}
//                       </h3>
//                       <p className="mt-1 text-sm text-gray-500">
//                         {product.category?.name || "General"}
//                       </p>
//                     </div>
//                   </Link>

//                   <div className="mt-6">
//                     <button
//                       onClick={() => handleAddToCart(product)}
//                       disabled={isAdding === product._id}
//                       className="relative w-full flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {isAdding === product._id ? (
//                         <span className="flex items-center gap-2">
//                           <Loader /> Adding...
//                         </span>
//                       ) : (
//                         "Add to bag"
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/*  Right Chevron only if scrollable */}
//             {isScrollable && (
//               <button
//                 onClick={() => scroll("right")}
//                 className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-all"
//               >
//                 <ChevronRightIcon className="size-6 text-gray-700" />
//               </button>
//             )}
//           </div>
//         ) : (
//           !productsLoading &&
//           featuredProducts.length === 0 && (
//             <div className="text-center text-gray-500 py-10 border-t border-gray-100">
//               No featured products available at this time.
//             </div>
//           )
//         )}
//       </div>
//     </section>
//   );
// };

// export default FeaturedProducts;



// import React, { useRef, useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { domainUrl } from "../utils/constant";
// import Loader from "./Loader";

// // Professional SVG Icons
// const ChevronLeftIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
//   </svg>
// );

// const ChevronRightIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
//   </svg>
// );

// const FeaturedProducts = ({
//   featuredProducts,
//   productsLoading,
//   productsError,
//   handleAddToCart,
//   isAdding,
// }) => {
//   const scrollContainerRef = useRef(null);
//   const [isScrollable, setIsScrollable] = useState(false);
//   const navigate = useNavigate();

//   // Professional color palette
//   const colors = {
//     primary: '#1a365d', // Deep navy
//     secondary: '#2d3748', // Charcoal
//     accent: '#c53030', // Rich burgundy
//     light: '#f7fafc',
//     medium: '#e2e8f0',
//     dark: '#2d3748',
//     text: '#2d3748',
//     lightText: '#718096'
//   };

//   // Detect scrollability
//   useEffect(() => {
//     const checkScrollable = () => {
//       const container = scrollContainerRef.current;
//       if (container) {
//         setIsScrollable(container.scrollWidth > container.clientWidth);
//       }
//     };

//     checkScrollable();
//     window.addEventListener("resize", checkScrollable);
//     return () => window.removeEventListener("resize", checkScrollable);
//   }, [featuredProducts]);

//   const scroll = (direction) => {
//     if (scrollContainerRef.current) {
//       const scrollAmount = direction === "left" ? -320 : 320;
//       scrollContainerRef.current.scrollBy({
//         left: scrollAmount,
//         behavior: "smooth",
//       });
//     }
//   };

//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
//     return imagePath.startsWith("http")
//       ? imagePath
//       : `${domainUrl}/${imagePath}`;
//   };

//   return (
//     <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20 md:py-28">
//       {/* Decorative Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-50/30 to-transparent rounded-full blur-3xl"></div>
//         <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-red-50/20 to-transparent rounded-full blur-3xl"></div>
//       </div>

//       {/* Featured Products Section */}
//       <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
//         {/* Section Header */}
        // <div className="text-center mb-16">
        //   <div className="inline-flex items-center gap-3 mb-6">
        //     <div className="h-px w-12" style={{ backgroundColor: colors.accent }}></div>
        //     <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: colors.accent }}>
        //       Curated Collection
        //     </span>
        //     <div className="h-px w-12" style={{ backgroundColor: colors.accent }}></div>
        //   </div>
        //   <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colors.primary }}>
        //     Featured <span className="font-light">Collections</span>
        //   </h2>
        //   <p className="text-lg max-w-2xl mx-auto" style={{ color: colors.text }}>
        //     A carefully selected range of our finest pieces, embodying the essence of Mandaram's craftsmanship
        //   </p>
        // </div>

//         {/* Loading State */}
//         {productsLoading && (
//           <div className="py-32 flex flex-col items-center justify-center">
//             <div className="relative mb-6">
//               <div className="w-12 h-12 border-4 rounded-full" style={{ borderColor: colors.medium }}></div>
//               <div className="absolute top-0 left-0 w-12 h-12 border-4 rounded-full animate-spin" style={{ borderColor: `${colors.accent} transparent transparent transparent` }}></div>
//             </div>
//             <p className="font-medium tracking-wide" style={{ color: colors.lightText }}>Loading Collections...</p>
//           </div>
//         )}

//         {/* Error State */}
//         {productsError && (
//           <div className="py-32 text-center bg-gradient-to-b from-red-50 to-white rounded-2xl border border-red-100">
//             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
//               <svg className="w-8 h-8" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//             </div>
//             <p className="text-lg font-semibold mb-2" style={{ color: colors.primary }}>Unable to load collections</p>
//             <p className="text-sm" style={{ color: colors.lightText }}>{productsError}</p>
//           </div>
//         )}

//         {/* Products Grid */}
//         {!productsLoading && !productsError && featuredProducts.length > 0 ? (
//           <div className="relative">
//             {/* Navigation Arrows */}
//             {isScrollable && (
//               <>
//                 <button
//                   onClick={() => scroll("left")}
//                   className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transform hover:-translate-x-1 transition-all duration-300 border border-gray-200"
//                   aria-label="Previous"
//                   style={{ color: colors.primary }}
//                 >
//                   <ChevronLeftIcon />
//                 </button>
//                 <button
//                   onClick={() => scroll("right")}
//                   className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transform hover:translate-x-1 transition-all duration-300 border border-gray-200"
//                   aria-label="Next"
//                   style={{ color: colors.primary }}
//                 >
//                   <ChevronRightIcon />
//                 </button>
//               </>
//             )}

//             {/* Products Container */}
//             <div
//               ref={scrollContainerRef}
//               className="flex overflow-x-auto scroll-smooth gap-8 pb-12 -mx-4 px-4"
//               style={{ 
//                 scrollbarWidth: "none", 
//                 msOverflowStyle: "none",
//                 WebkitOverflowScrolling: "touch"
//               }}
//             >
//               {featuredProducts.map((product, index) => (
//                 <div
//                   key={product._id}
//                   className="flex-shrink-0 w-80"
//                 >
//                   <div className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
//                     {/* Product Image */}
//                     <div className="relative overflow-hidden bg-gradient-to-b from-gray-100 to-gray-50">
//                       <Link to={`/products/${product._id}`} className="block">
//                         <div className="relative h-80">
//                           <img
//                             alt={product.name}
//                             src={getImageUrl(product.image)}
//                             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                             loading="lazy"
//                           />
//                           {/* Hover Overlay */}
//                           <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                         </div>
//                       </Link>
                      
//                       {/* Category Badge */}
//                       <div className="absolute top-4 left-4">
//                         <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-white/90 backdrop-blur-sm" style={{ color: colors.primary }}>
//                           {product.category?.name || "Premium"}
//                         </span>
//                       </div>
                      
//                       {/* Price Tag */}
//                       <div className="absolute top-4 right-4">
//                         <div className="px-3 py-2 rounded-lg bg-white/90 backdrop-blur-sm shadow-sm">
//                           <div className="text-lg font-bold" style={{ color: colors.primary }}>₹{product.price.toFixed(2)}</div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Product Info */}
//                     <div className="p-6">
//                       <div className="mb-4">
//                         <Link to={`/products/${product._id}`}>
//                           <h3 className="text-xl font-semibold mb-2 group-hover:underline" style={{ color: colors.primary }}>
//                             {product.name}
//                           </h3>
//                         </Link>
//                         <p className="text-sm line-clamp-2" style={{ color: colors.lightText }}>
//                           {product.description || "Premium quality product with exceptional craftsmanship"}
//                         </p>
//                       </div>

//                       {/* Rating */}
//                       {/* <div className="flex items-center gap-2 mb-6">
//                         <div className="flex" style={{ color: '#fbbf24' }}>
//                           {[1, 2, 3, 4, 5].map((star) => (
//                             <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
//                               <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
//                             </svg>
//                           ))}
//                         </div>
//                         <span className="text-sm font-medium" style={{ color: colors.text }}>4.8</span>
//                         <span className="text-sm" style={{ color: colors.lightText }}>(128 reviews)</span>
//                       </div> */}

//                       {/* Add to Cart Button */}
//                       <button
//                         onClick={() => handleAddToCart(product)}
//                         disabled={isAdding === product._id}
//                         className="w-full py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
//                         style={{ 
//                           backgroundColor: colors.primary,
//                           color: 'white'
//                         }}
//                       >
//                         {isAdding === product._id ? (
//                           <>
//                             <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                             <span>Adding to Cart...</span>
//                           </>
//                         ) : (
//                           <>
//                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                             </svg>
//                             <span>Add to Cart</span>
//                           </>
//                         )}
//                       </button>
//                     </div>

//                     {/* Quick View Button */}
//                     <button
//                       onClick={() => navigate(`/products/${product._id}`)}
//                       className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-white rounded-full p-4 shadow-xl hover:shadow-2xl transform hover:scale-110"
//                       style={{ color: colors.primary }}
//                       aria-label="Quick view"
//                     >
//                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* View All Link */}
//             <div className="text-center mt-16 pt-12 border-t border-gray-200">
//               <Link
//                 to="/products"
//                 className="inline-flex items-center gap-4 font-semibold group text-lg"
//                 style={{ color: colors.primary }}
//               >
//                 <span>Explore Full Collection</span>
//                 <div className="h-px w-12 bg-gradient-to-r from-transparent via-current to-transparent group-hover:w-20 transition-all duration-500"></div>
//                 <svg className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                 </svg>
//               </Link>
//             </div>
//           </div>
//         ) : (
//           !productsLoading &&
//           featuredProducts.length === 0 && (
//             <div className="py-32 text-center bg-gradient-to-b from-gray-50 to-white rounded-2xl border-2 border-dashed border-gray-200">
//               <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
//                 <svg className="w-10 h-10" style={{ color: colors.lightText }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold mb-3" style={{ color: colors.primary }}>No Collections Available</h3>
//               <p className="text-sm max-w-md mx-auto" style={{ color: colors.lightText }}>
//                 Our featured collections are currently being curated with the latest designs. Please check back soon.
//               </p>
//             </div>
//           )
//         )}

//         {/* Brand Philosophy Footer */}
//         <div className="mt-32 pt-20 border-t border-gray-200">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
//             <div className="text-center">
//               <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4" style={{ backgroundColor: `${colors.accent}20` }}>
//                 <svg className="w-6 h-6" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
//                 </svg>
//               </div>
//               <h4 className="text-lg font-semibold mb-3" style={{ color: colors.primary }}>Heritage</h4>
//               <p className="leading-relaxed" style={{ color: colors.text }}>
//                 Rooted in traditional Indian craftsmanship, we preserve ancient weaving techniques while embracing modern aesthetics.
//               </p>
//             </div>
            
//             <div className="text-center">
//               <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4" style={{ backgroundColor: `${colors.primary}20` }}>
//                 <svg className="w-6 h-6" style={{ color: colors.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                 </svg>
//               </div>
//               <h4 className="text-lg font-semibold mb-3" style={{ color: colors.primary }}>Quality</h4>
//               <p className="leading-relaxed" style={{ color: colors.text }}>
//                 Every thread is carefully selected, every stitch meticulously placed, ensuring enduring quality and comfort.
//               </p>
//             </div>
            
//             <div className="text-center">
//               <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4" style={{ backgroundColor: `${colors.accent}20` }}>
//                 <svg className="w-6 h-6" style={{ color: colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <h4 className="text-lg font-semibold mb-3" style={{ color: colors.primary }}>Elegance</h4>
//               <p className="leading-relaxed" style={{ color: colors.text }}>
//                 Creating timeless pieces that transcend trends, designed for those who value subtle sophistication.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturedProducts;



// import React, { useRef, useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { domainUrl } from "../utils/constant";
// import Loader from "./Loader";
// import { useCart } from "../context/CartContext";

// // Keep your original SVG icons
// const ChevronLeftIcon = (props) => (
//   <svg
//     {...props}
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     className="w-6 h-6"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M15.75 19.5L8.25 12l7.5-7.5"
//     />
//   </svg>
// );

// const ChevronRightIcon = (props) => (
//   <svg
//     {...props}
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     className="w-6 h-6"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M8.25 4.5l7.5 7.5-7.5 7.5"
//     />
//   </svg>
// );

//   const colors = {
//     primary: '#1a365d', // Deep navy
//     secondary: '#2d3748', // Charcoal
//     accent: '#c53030', // Rich burgundy
//     light: '#f7fafc',
//     medium: '#e2e8f0',
//     dark: '#2d3748',
//     text: '#2d3748',
//     lightText: '#718096'
//   };

// const FeaturedProducts = ({
//   featuredProducts,
//   productsLoading,
//   productsError,
//   handleAddToCart,
//   isAdding,
// }) => {
//   const scrollContainerRef = useRef(null);
//   const navigate = useNavigate();
//   const { cartItems } = useCart();


//   const [isScrollable, setIsScrollable] = useState(false);

//   // --- Detect scrollability dynamically ---
//   useEffect(() => {
//     const checkScrollable = () => {
//       const container = scrollContainerRef.current;
//       if (container) {
//         setIsScrollable(container.scrollWidth > container.clientWidth);
//       }
//     };

//     checkScrollable();

//     // Recheck when window resizes or products change
//     window.addEventListener("resize", checkScrollable);
//     return () => window.removeEventListener("resize", checkScrollable);
//   }, [featuredProducts]);

//   const scroll = (direction) => {
//     if (scrollContainerRef.current) {
//       const scrollAmount = direction === "left" ? -300 : 300;
//       scrollContainerRef.current.scrollBy({
//         left: scrollAmount,
//         behavior: "smooth",
//       });
//     }
//   };

// //   const isProductInCart = (productId) => {
// //   return cartItems?.some(
// //     (item) => item.product?._id === productId
// //   );
// // };

// const isProductInCart = (productId) => {
//   if (!cartItems || cartItems.length === 0) return false;

//   return cartItems.some(
//     (item) => String(item.product?._id) === String(productId)
//   );
// };






//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return "https://via.placeholder.com/300?text=No+Image";
//     return imagePath.startsWith("http")
//       ? imagePath
//       : `${domainUrl}/${imagePath}`;
//   };

//   return (
//     <section className="bg-white py-20 md:py-28">
//       {/* Professional Header Section */}
//       <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-16">
//         <div className="text-center">
//           {/* Subtle Badge */}

//           <div className="text-center mb-16">
//            <div className="inline-flex items-center gap-3 mb-6">
//              <div className="h-px w-12" style={{ backgroundColor: colors.accent }}></div>
//              <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: colors.accent }}>
//                Curated Products
//              </span>
//              <div className="h-px w-12" style={{ backgroundColor: colors.accent }}></div>
//            </div>
//            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colors.primary }}>
//              Featured <span className="font-light">Collections</span>
//           </h2>
//            <p className="text-lg max-w-2xl mx-auto" style={{ color: colors.text }}>
//              A carefully selected range of our finest pieces, embodying the essence of Mandaram's craftsmanship
//            </p>
//          </div>
          
          
//           {/* Main Heading */}
//           {/* <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//             Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-gray-900">Products</span>
//           </h2> */}
          
//           {/* Subtitle */}
//           {/* <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
//             Discover our carefully curated selection of premium products, each crafted with exceptional quality and attention to detail.
//           </p> */}
//         </div>
//       </div>

//       <div className="mx-auto max-w-7xl px-6 lg:px-8">
//         {productsLoading && (
//           <div className="py-20 flex flex-col items-center justify-center">
//             <div className="relative">
//               <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
//               <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
//             </div>
//             <p className="mt-6 text-gray-600 font-medium">Loading featured products...</p>
//           </div>
//         )}

//         {productsError && (
//           <div className="text-center py-20 bg-gradient-to-b from-gray-50 to-white rounded-2xl border border-gray-200">
//             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-600 mb-4">
//               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//             </div>
//             <p className="text-lg text-gray-900 font-medium mb-2">Unable to load products</p>
//             <p className="text-gray-500">{productsError}</p>
//           </div>
//         )}

//         {!productsLoading && !productsError && featuredProducts.length > 0 ? (
//           <div className="relative">
//             {/* Navigation Arrows - Professional Styling */}
//             {isScrollable && (
//               <>
//                 <button
//                   onClick={() => scroll("left")}
//                   className="absolute -left-4 lg:-left-8 top-1/2 -translate-y-1/2 z-20 bg-white border border-gray-300 rounded-full p-3 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 group"
//                   aria-label="Scroll left"
//                 >
//                   <ChevronLeftIcon className="size-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
//                 </button>
//                 <button
//                   onClick={() => scroll("right")}
//                   className="absolute -right-4 lg:-right-8 top-1/2 -translate-y-1/2 z-20 bg-white border border-gray-300 rounded-full p-3 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 group"
//                   aria-label="Scroll right"
//                 >
//                   <ChevronRightIcon className="size-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
//                 </button>
//               </>
//             )}

//             {/* Your Original Product Cards Container - With Professional Padding */}
//             <div
//               ref={scrollContainerRef}
//               className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 -mx-4 px-4 gap-x-6 sm:gap-x-8"
//               style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//             >
//               {featuredProducts.map((product) => (
          
                
//                 <div

//                   key={product._id}
                  
//                   className="w-64 sm:w-72 shrink-0 snap-start group"
//                 >
//                   {/* Card Container with Professional Enhancements */}
//                   <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden border border-gray-100">
//                     <Link to={`/products/${product._id}`} className="block">
//                       <div className="relative">
//                         <div className="relative h-72 w-full overflow-hidden rounded-t-xl bg-gray-100">
//                           <img
//                             alt={product.name}
//                             src={getImageUrl(product.image)}
//                             className="size-full object-cover group-hover:scale-110 transition-transform duration-700"
//                           />
//                         </div>
//                         <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden p-4">
//                           <div
//                             aria-hidden="true"
//                             className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/70 via-transparent to-transparent"
//                           />
//                           <p className="relative text-xl font-bold text-white">
//                             ₹{product.price.toFixed(2)}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="p-6">
//                         <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
//                           {product.name}
//                         </h3>
//                         <div className="flex items-center justify-between">
//                           <p className="text-sm text-gray-500">
//                             {product.category?.name || "General"}
//                           </p>
//                           {/* Rating Badge - Optional Professional Touch */}
//                           {/* <div className="flex items-center bg-blue-50 px-2 py-1 rounded-full"> */}
//                             {/* <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                               <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                             </svg> */}
//                             {/* <span className="text-xs font-medium text-blue-700">4.8</span> */}
//                           {/* </div> */}
//                         </div>
//                       </div>
//                     </Link>

//                     <div className="px-6 pb-6">
//                     <button
//   onClick={() => !alreadyInCart && handleAddToCart(product)}
//   disabled={alreadyInCart || isAdding === product._id}
//   className={`relative w-full flex items-center justify-center rounded-lg px-8 py-3 text-sm font-semibold transition-all
//     ${
//       alreadyInCart
//         ? "bg-gray-300 text-gray-600 cursor-not-allowed"
//         : "bg-gradient-to-r from-gray-900 to-blue-900 text-white hover:opacity-90"
//     }
//   `}
// >
//   {isAdding === product._id ? (
//     <span className="flex items-center gap-2">
//       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//       Adding...
//     </span>
//   ) : alreadyInCart ? (
//     "Already in Cart"
//   ) : (
//     "Add to Cart"
//   )}
// </button>


//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Professional "View All" Link */}
//             <div className="text-center mt-5 pt-4 border-t border-gray-200">
//               <Link
//                 to="/products"
//                 className="inline-flex items-center gap-3 text-gray-700 hover:text-blue-600 font-semibold text-lg group transition-colors"
//               >
//                 <span>View All Products</span>
//                 <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                 </svg>
//               </Link>
//             </div>
//           </div>
//         ) : (
//           !productsLoading &&
//           featuredProducts.length === 0 && (
//             <div className="text-center py-20 bg-gradient-to-b from-gray-50 to-white rounded-2xl border border-gray-200">
//               <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
//                 <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">No Featured Products</h3>
//               <p className="text-gray-600 max-w-md mx-auto">
//                 Our featured collection is currently being updated with new arrivals.
//               </p>
//             </div>
//           )
//         )}
//       </div>
//     </section>
//   );
// };

// export default FeaturedProducts;



import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { domainUrl } from "../utils/constant";
import Loader from "./Loader";
import { useCart } from "../context/CartContext";

// Keep your original SVG icons
const ChevronLeftIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 19.5L8.25 12l7.5-7.5"
    />
  </svg>
);

const ChevronRightIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 4.5l7.5 7.5-7.5 7.5"
    />
  </svg>
);

  const colors = {
    primary: '#1a365d', // Deep navy
    secondary: '#2d3748', // Charcoal
    accent: '#c53030', // Rich burgundy
    light: '#f7fafc',
    medium: '#e2e8f0',
    dark: '#2d3748',
    text: '#2d3748',
    lightText: '#718096'
  };

const FeaturedProducts = ({
  featuredProducts,
  productsLoading,
  productsError,
  handleAddToCart,
  isAdding,
}) => {
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();
  const { cartItems } = useCart();


  const [isScrollable, setIsScrollable] = useState(false);

  // --- Detect scrollability dynamically ---
  useEffect(() => {
    const checkScrollable = () => {
      const container = scrollContainerRef.current;
      if (container) {
        setIsScrollable(container.scrollWidth > container.clientWidth);
      }
    };

    checkScrollable();

    // Recheck when window resizes or products change
    window.addEventListener("resize", checkScrollable);
    return () => window.removeEventListener("resize", checkScrollable);
  }, [featuredProducts]);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };


const isProductInCart = (productId) => {
  if (!cartItems || cartItems.length === 0) return false;

  return cartItems.some((item) => {
    const cartProductId =
      item.product?._id ||
      item.productId?._id ||
      item.product ||
      item.productId;

    return String(cartProductId) === String(productId);
  });
};






  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/300?text=No+Image";
    return imagePath.startsWith("http")
      ? imagePath
      : `${domainUrl}/${imagePath}`;
  };

  return (
    <section className="bg-white py-20 md:py-28">
      {/* Professional Header Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-16">
        <div className="text-center">
          {/* Subtle Badge */}

          <div className="text-center mb-16">
           <div className="inline-flex items-center gap-3 mb-6">
             <div className="h-px w-12" style={{ backgroundColor: colors.accent }}></div>
             <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: colors.accent }}>
               Curated Products
             </span>
             <div className="h-px w-12" style={{ backgroundColor: colors.accent }}></div>
           </div>
           <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colors.primary }}>
             Featured <span className="font-light">Collections</span>
          </h2>
           <p className="text-lg max-w-2xl mx-auto" style={{ color: colors.text }}>
             A carefully selected range of our finest pieces, embodying the essence of Mandaram's craftsmanship
           </p>
         </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {productsLoading && (
          <div className="py-20 flex flex-col items-center justify-center">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="mt-6 text-gray-600 font-medium">Loading featured products...</p>
          </div>
        )}

        {productsError && (
          <div className="text-center py-20 bg-gradient-to-b from-gray-50 to-white rounded-2xl border border-gray-200">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-600 mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-lg text-gray-900 font-medium mb-2">Unable to load products</p>
            <p className="text-gray-500">{productsError}</p>
          </div>
        )}

        {!productsLoading && !productsError && featuredProducts.length > 0 ? (
          <div className="relative">
            {/* Navigation Arrows - Professional Styling */}
            {isScrollable && (
              <>
                <button
                  onClick={() => scroll("left")}
                  className="absolute -left-4 lg:-left-8 top-1/2 -translate-y-1/2 z-20 bg-white border border-gray-300 rounded-full p-3 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 group"
                  aria-label="Scroll left"
                >
                  <ChevronLeftIcon className="size-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="absolute -right-4 lg:-right-8 top-1/2 -translate-y-1/2 z-20 bg-white border border-gray-300 rounded-full p-3 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 group"
                  aria-label="Scroll right"
                >
                  <ChevronRightIcon className="size-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
                </button>
              </>
            )}

            {/* Your Original Product Cards Container - With Professional Padding */}
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 -mx-4 px-4 gap-x-6 sm:gap-x-8"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {featuredProducts.map((product) => { // CHANGED: Using block body {} to allow for variable declaration

                // FIX: Define 'alreadyInCart' using the existing helper function
                const alreadyInCart = isProductInCart(product._id); 
          
                
                return ( // CHANGED: Added return statement for block body
                <div

                  key={product._id}
                  
                  className="w-64 sm:w-72 shrink-0 snap-start group"
                >
                  {/* Card Container with Professional Enhancements */}
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden border border-gray-100">
                    <Link to={`/products/${product._id}`} className="block">
                      <div className="relative">
                        <div className="relative h-72 w-full overflow-hidden rounded-t-xl bg-gray-100">
                          <img
                            alt={product.name}
                            src={getImageUrl(product.image)}
                            className="size-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                        <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden p-4">
                          <div
                            aria-hidden="true"
                            className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/70 via-transparent to-transparent"
                          />
                          <p className="relative text-xl font-bold text-white">
                            ₹{product.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-500">
                            {product.category?.name || "General"}
                          </p>
                        </div>
                      </div>
                    </Link>

                    <div className="px-6 pb-6">
                    <button
                      onClick={() => !alreadyInCart && handleAddToCart(product)}
                      disabled={alreadyInCart || isAdding === product._id}
                      className={`relative w-full flex items-center justify-center rounded-lg px-8 py-3 text-sm font-semibold transition-all
                        ${
                          alreadyInCart
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                            : "bg-gradient-to-r from-gray-900 to-blue-900 text-white hover:opacity-90"
                        }
                      `}
                    >
                      {isAdding === product._id ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Adding...
                        </span>
                      ) : alreadyInCart ? (
                        "Already in Cart"
                      ) : (
                        "Add to Cart"
                      )}
                    </button>


                    </div>
                  </div>
                </div>
              )})} 
            </div>

            {/* Professional "View All" Link */}
            <div className="text-center mt-5 pt-4 border-t border-gray-200">
              <Link
                to="/products"
                className="inline-flex items-center gap-3 text-gray-700 hover:text-blue-600 font-semibold text-lg group transition-colors"
              >
                <span>View All Products</span>
                <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        ) : (
          !productsLoading &&
          featuredProducts.length === 0 && (
            <div className="text-center py-20 bg-gradient-to-b from-gray-50 to-white rounded-2xl border border-gray-200">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Featured Products</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Our featured collection is currently being updated with new arrivals.
              </p>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;


