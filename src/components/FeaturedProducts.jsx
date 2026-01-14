

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
// import { useCart } from "../context/CartContext";

// // Keep your original SVG icons
// const ChevronLeftIcon = (props) => (
//   <svg
//     {...props}
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     className="w-6 h-6"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M15.75 19.5L8.25 12l7.5-7.5"
//     />
//   </svg>
// );

// const ChevronRightIcon = (props) => (
//   <svg
//     {...props}
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     className="w-6 h-6"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M8.25 4.5l7.5 7.5-7.5 7.5"
//     />
//   </svg>
// );

//   const colors = {
//     primary: '#1a365d', // Deep navy
//     secondary: '#2d3748', // Charcoal
//     accent: '#c53030', // Rich burgundy
//     light: '#f7fafc',
//     medium: '#e2e8f0',
//     dark: '#2d3748',
//     text: '#2d3748',
//     lightText: '#718096'
//   };

// const FeaturedProducts = ({
//   featuredProducts,
//   productsLoading,
//   productsError,
//   handleAddToCart,
//   isAdding,
// }) => {
//   const scrollContainerRef = useRef(null);
//   const navigate = useNavigate();
//   const { cartItems } = useCart();


//   const [isScrollable, setIsScrollable] = useState(false);

//   // --- Detect scrollability dynamically ---
//   useEffect(() => {
//     const checkScrollable = () => {
//       const container = scrollContainerRef.current;
//       if (container) {
//         setIsScrollable(container.scrollWidth > container.clientWidth);
//       }
//     };

//     checkScrollable();

//     // Recheck when window resizes or products change
//     window.addEventListener("resize", checkScrollable);
//     return () => window.removeEventListener("resize", checkScrollable);
//   }, [featuredProducts]);

//   const scroll = (direction) => {
//     if (scrollContainerRef.current) {
//       const scrollAmount = direction === "left" ? -300 : 300;
//       scrollContainerRef.current.scrollBy({
//         left: scrollAmount,
//         behavior: "smooth",
//       });
//     }
//   };


// const isProductInCart = (productId) => {
//   if (!cartItems || cartItems.length === 0) return false;

//   return cartItems.some((item) => {
//     const cartProductId =
//       item.product?._id ||
//       item.productId?._id ||
//       item.product ||
//       item.productId;

//     return String(cartProductId) === String(productId);
//   });
// };






//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return "https://via.placeholder.com/300?text=No+Image";
//     return imagePath.startsWith("http")
//       ? imagePath
//       : `${domainUrl}/${imagePath}`;
//   };

//   return (
//     <section className="bg-white py-20 md:py-28">
//       {/* Professional Header Section */}
//       <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-16">
//         <div className="text-center">
//           {/* Subtle Badge */}

//           <div className="text-center mb-16">
//            <div className="inline-flex items-center gap-3 mb-6">
//              <div className="h-px w-12" style={{ backgroundColor: colors.accent }}></div>
//              <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: colors.accent }}>
//                Curated Products
//              </span>
//              <div className="h-px w-12" style={{ backgroundColor: colors.accent }}></div>
//            </div>
//            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colors.primary }}>
//              Featured <span className="font-light">Collections</span>
//           </h2>
//            <p className="text-lg max-w-2xl mx-auto" style={{ color: colors.text }}>
//              A carefully selected range of our finest pieces, embodying the essence of Mandaram's craftsmanship
//            </p>
//          </div>
//         </div>
//       </div>

//       <div className="mx-auto max-w-7xl px-6 lg:px-8">
//         {productsLoading && (
//           <div className="py-20 flex flex-col items-center justify-center">
//             <div className="relative">
//               <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
//               <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
//             </div>
//             <p className="mt-6 text-gray-600 font-medium">Loading featured products...</p>
//           </div>
//         )}

//         {productsError && (
//           <div className="text-center py-20 bg-gradient-to-b from-gray-50 to-white rounded-2xl border border-gray-200">
//             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-600 mb-4">
//               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//             </div>
//             <p className="text-lg text-gray-900 font-medium mb-2">Unable to load products</p>
//             <p className="text-gray-500">{productsError}</p>
//           </div>
//         )}

//         {!productsLoading && !productsError && featuredProducts.length > 0 ? (
//           <div className="relative">
//             {/* Navigation Arrows - Professional Styling */}
//             {isScrollable && (
//               <>
//                 <button
//                   onClick={() => scroll("left")}
//                   className="absolute -left-4 lg:-left-8 top-1/2 -translate-y-1/2 z-20 bg-white border border-gray-300 rounded-full p-3 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 group"
//                   aria-label="Scroll left"
//                 >
//                   <ChevronLeftIcon className="size-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
//                 </button>
//                 <button
//                   onClick={() => scroll("right")}
//                   className="absolute -right-4 lg:-right-8 top-1/2 -translate-y-1/2 z-20 bg-white border border-gray-300 rounded-full p-3 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 group"
//                   aria-label="Scroll right"
//                 >
//                   <ChevronRightIcon className="size-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
//                 </button>
//               </>
//             )}

//             {/* Your Original Product Cards Container - With Professional Padding */}
//             <div
//               ref={scrollContainerRef}
//               className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 -mx-4 px-4 gap-x-6 sm:gap-x-8"
//               style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//             >
//               {featuredProducts.map((product) => { // CHANGED: Using block body {} to allow for variable declaration

//                 // FIX: Define 'alreadyInCart' using the existing helper function
//                 const alreadyInCart = isProductInCart(product._id); 
//           
//                 
//                 return ( // CHANGED: Added return statement for block body
//                 <div

//                   key={product._id}
//                   
//                   className="w-64 sm:w-72 shrink-0 snap-start group"
//                 >
//                   {/* Card Container with Professional Enhancements */}
//                   <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden border border-gray-100">
//                     <Link to={`/products/${product._id}`} className="block">
//                       <div className="relative">
//                         <div className="relative h-72 w-full overflow-hidden rounded-t-xl bg-gray-100">
//                           <img
//                             alt={product.name}
//                             src={getImageUrl(product.image)}
//                             className="size-full object-cover group-hover:scale-110 transition-transform duration-700"
//                           />
//                         </div>
//                         <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden p-4">
//                           <div
//                             aria-hidden="true"
//                             className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/70 via-transparent to-transparent"
//                           />
//                           <p className="relative text-xl font-bold text-white">
//                             ₹{product.price.toFixed(2)}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="p-6">
//                         <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
//                           {product.name}
//                         </h3>
//                         <div className="flex items-center justify-between">
//                           <p className="text-sm text-gray-500">
//                             {product.category?.name || "General"}
//                           </p>
//                         </div>
//                       </div>
//                     </Link>

//                     <div className="px-6 pb-6">
//                     <button
//                       onClick={() => !alreadyInCart && handleAddToCart(product)}
//                       disabled={alreadyInCart || isAdding === product._id}
//                       className={`relative w-full flex items-center justify-center rounded-lg px-8 py-3 text-sm font-semibold transition-all
//                         ${
//                           alreadyInCart
//                             ? "bg-gray-300 text-gray-600 cursor-not-allowed"
//                             : "bg-gradient-to-r from-gray-900 to-blue-900 text-white hover:opacity-90"
//                         }
//                       `}
//                     >
//                       {isAdding === product._id ? (
//                         <span className="flex items-center gap-2">
//                           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                           Adding...
//                         </span>
//                       ) : alreadyInCart ? (
//                         "Already in Cart"
//                       ) : (
//                         "Add to Cart"
//                       )}
//                     </button>


//                     </div>
//                   </div>
//                 </div>
//               )})} 
//             </div>

//             {/* Professional "View All" Link */}
//             <div className="text-center mt-5 pt-4 border-t border-gray-200">
//               <Link
//                 to="/products"
//                 className="inline-flex items-center gap-3 text-gray-700 hover:text-blue-600 font-semibold text-lg group transition-colors"
//               >
//                 <span>View All Products</span>
//                 <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                 </svg>
//               </Link>
//             </div>
//           </div>
//         ) : (
//           !productsLoading &&
//           featuredProducts.length === 0 && (
//             <div className="text-center py-20 bg-gradient-to-b from-gray-50 to-white rounded-2xl border border-gray-200">
//               <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
//                 <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">No Featured Products</h3>
//               <p className="text-gray-600 max-w-md mx-auto">
//                 Our featured collection is currently being updated with new arrivals.
//               </p>
//             </div>
//           )
//         )}
//       </div>
//     </section>
//   );
// };

// export default FeaturedProducts;



import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { domainUrl } from "../utils/constant";
import FooterSection from "../components/FooterSection";

const FeaturedProducts = ({
  featuredProducts,
  productsLoading,
  productsError,
}) => {
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();
  const [isScrollable, setIsScrollable] = useState(false);

  // --- Scroll Logic ---
  useEffect(() => {
    const checkScrollable = () => {
      const container = scrollContainerRef.current;
      if (container) {
        setIsScrollable(container.scrollWidth > container.clientWidth);
      }
    };
    checkScrollable();
    window.addEventListener("resize", checkScrollable);
    return () => window.removeEventListener("resize", checkScrollable);
  }, [featuredProducts]);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      // Scroll amount matched to (Card Width + Gap) -> approx 280px
      const scrollAmount = direction === "left" ? -280 : 280;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/300?text=No+Image";
    return imagePath.startsWith("http")
      ? imagePath
      : `${domainUrl}/${imagePath}`;
  };

  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // --- Loading Skeleton ---
  const LoadingSkeleton = () => (
    <div className="flex overflow-x-hidden gap-x-8 pb-12">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="w-64 shrink-0 animate-pulse">
          <div className="w-full aspect-[3/4] bg-gray-200 rounded-xl mb-3"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="bg-white py-20 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="text-left">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold tracking-tighter sm:text-4xl"
            >
              <span className="bg-gradient-to-r from-gray-900 via-indigo-800 to-rose-700 bg-clip-text text-transparent">
                Featured Collections
              </span>
            </motion.h2>
            <div className="h-1 w-20 bg-gray-900 mt-4 rounded-full" />
          </div>

          {/* "See All" Link */}
          {!productsLoading && !productsError && (
            <Link
              to="/products"
              className="hidden md:flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-gray-500 hover:text-black transition-colors group"
            >
              See All
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>

        {/* --- Loading State --- */}
 {/* ================= CONTENT STATES ================= */}

{/* --- Loading State --- */}
{productsLoading && <LoadingSkeleton />}

{/* --- Error State (text only, no box) --- */}
{!productsLoading && productsError && (
  <div className="text-center py-20">
    <p className="text-gray-400 font-light">
      Could not load featured products.
    </p>
  </div>
)}

{/* --- Products Available --- */}
{!productsLoading &&
  !productsError &&
  featuredProducts.length > 0 && (
    <div className="relative group/carousel">

      {/* Navigation Arrows */}
      {isScrollable && (
        <>
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 top-[40%] -translate-y-1/2 z-30 p-2 rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-gray-100 text-gray-800 hover:bg-black hover:text-white transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 translate-x-4 group-hover/carousel:translate-x-0"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 top-[40%] -translate-y-1/2 z-30 p-2 rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-gray-100 text-gray-800 hover:bg-black hover:text-white transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 -translate-x-4 group-hover/carousel:translate-x-0"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Scrollable Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        ref={scrollContainerRef}
        // className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 -mx-4 px-4 gap-x-8 pb-8"

        className="
  flex overflow-x-auto scroll-smooth snap-x snap-mandatory
  py-6 pb-10
  -mx-4 px-6 sm:px-4
  gap-x-6 sm:gap-x-8
"

        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {featuredProducts.map((product) => (
          <motion.div
            key={product._id}
            variants={cardVariants}
            className="w-60 sm:w-64 shrink-0 snap-start"
          >
            <Link to={`/products/${product._id}`} className="group block">

              {/* Image */}
              <div className="relative overflow-hidden aspect-[3/4] rounded-xl bg-gray-100 border border-gray-100 shadow-sm transition-all duration-500 group-hover:shadow-lg group-hover:-translate-y-1">
                <img
                  src={getImageUrl(product.image)}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Info */}
              <div className="mt-4 px-1">
                <h3 className="text-base font-medium text-gray-900 truncate">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">
                    {product.category?.name || "Collection"}
                  </p>
                  <span className="text-sm font-bold text-gray-900">
                    ₹{product.price.toFixed(0)}
                  </span>
                </div>
              </div>

            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
)}

{/* --- Empty State (ONLY when no error) --- */}
{!productsLoading &&
  !productsError &&
  featuredProducts.length === 0 && (
    <div className="text-center py-20">
      <p className="text-gray-400 font-light">
        New collections arriving soon.
      </p>
    </div>
)}


      </div>
    </section>

   
  );
};

export default FeaturedProducts;