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

import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { domainUrl } from "../utils/constant";
import Loader, { SmallLoader } from "./Loader";


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

const FeaturedProducts = ({
  featuredProducts,
  productsLoading,
  productsError,
  handleAddToCart,
  isAdding,
}) => {
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();

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

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/300?text=No+Image";
    return imagePath.startsWith("http")
      ? imagePath
      : `${domainUrl}/${imagePath}`;
  };

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Featured Products
        </h2>

        {productsLoading && (
          <div className="py-10">
            <Loader message="Fetching featured products..." />
          </div>
        )}

        {productsError && (
          <div className="text-center text-red-600">{productsError}</div>
        )}

        {!productsLoading && !productsError && featuredProducts.length > 0 ? (
          <div className="relative">
            {/*  Left Chevron only if scrollable */}
            {isScrollable && (
              <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-all"
              >
                <ChevronLeftIcon className="size-6 text-gray-700" />
              </button>
            )}

            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 -mx-4 px-4 gap-x-6 sm:gap-x-8"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {featuredProducts.map((product) => (
                <div
                  key={product._id}
                  className="w-64 sm:w-72 shrink-0 snap-start"
                >
                  <Link to={`/products/${product._id}`} className="block">
                    <div className="relative">
                      <div className="relative h-72 w-full overflow-hidden rounded-lg">
                        <img
                          alt={product.name}
                          src={getImageUrl(product.image)}
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                        <div
                          aria-hidden="true"
                          className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                        />
                        <p className="relative text-lg font-semibold text-white">
                          ₹{product.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="relative mt-4">
                      <h3 className="text-sm font-medium text-gray-900">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.category?.name || "General"}
                      </p>
                    </div>
                  </Link>

                  <div className="mt-6">
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={isAdding === product._id}
                      className="relative w-full flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isAdding === product._id ? (
                        <span className="flex items-center gap-2">
                          <SmallLoader /> Adding...
                        </span>
                      ) : (
                        "Add to bag"
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/*  Right Chevron only if scrollable */}
            {isScrollable && (
              <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-all"
              >
                <ChevronRightIcon className="size-6 text-gray-700" />
              </button>
            )}
          </div>
        ) : (
          !productsLoading &&
          featuredProducts.length === 0 && (
            <div className="text-center text-gray-500 py-10 border-t border-gray-100">
              No featured products available at this time.
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
