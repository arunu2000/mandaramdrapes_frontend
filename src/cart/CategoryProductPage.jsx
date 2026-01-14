//current



// import React, { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import Navbar from "../components/Navbar";
// import ProductCard from "../cart/ProductCard";
// import { useAuth } from "../context/AuthContext";
// import { useCart } from "../context/CartContext";
// import { useParams, useNavigate } from "react-router-dom";
// import { ToastContainer, Slide } from "react-toastify";
// import { BeatLoader } from "react-spinners";
// import FashionposterCopy from "../assets/FashionposterCopy.jpg";
// import { ChevronDownIcon } from "@heroicons/react/24/outline";

// const BACKEND_BASE_URL = "http://192.168.29.217:5000";

// const CategoryProductsPage = () => {
//   const { slug } = useParams();
//   const { user, logout } = useAuth();
//   const { cartItems } = useCart();
//   const navigate = useNavigate();

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [categoryName, setCategoryName] = useState("");
//   const [sortType, setSortType] = useState("newest");

//   const fetchProductsByCategory = useCallback(async () => {
//     if (!slug) return;
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await axios.get(
//         `${BACKEND_BASE_URL}/api/user/shop/categories/${slug}?sort=${sortType}`
//       );

//       const fetchedProducts = res.data.getProducts || [];
//       setProducts(fetchedProducts);

//       const formattedName =
//         fetchedProducts[0]?.category?.name ||
//         fetchedProducts[0]?.categoryName ||
//         slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ");

//       setCategoryName(formattedName);
//     } catch (err) {
//       setError("Failed to load products. Please try again.");
//       setProducts([]);
//       setCategoryName(
//         slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ")
//       );
//     } finally {
//       setLoading(false);
//     }
//   }, [slug, sortType]);

//   useEffect(() => {
//     fetchProductsByCategory();
//   }, [fetchProductsByCategory]);

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-[60vh]">
//         <BeatLoader color="#4f8a4c" size={14} />
//       </div>
//     );

//   if (error)
//     return (
//       <div className="text-center py-20 text-red-400 text-lg md:text-xl px-6">
//         {error}
//       </div>
//     );

//   const displayTitle = categoryName || "Products";

//   return (
//     <div className="bg-gray-50 min-h-screen pt-[6rem]">
//       <Navbar
//         isAuthenticated={user?.isAuthenticated}
//         role={user?.role}
//         cartItemCount={cartItems?.length || 0}
//         handleLogout={logout}
//         handleUserIconClick={() => navigate("/profile")}
//         handleGatedNavigation={(e, path, isProtected) => {
//           if (isProtected && !user?.isAuthenticated) {
//             e.preventDefault();
//             navigate("/login");
//           } else navigate(path);
//         }}
//       />

//       {/* POSTER IMAGE */}
//       {products.length>0&&
//       <div className="w-full flex justify-center py-6 px-2 sm:px-6 lg:px-8">
//         <div className="max-w-7xl w-full">
//           <img
//             src={FashionposterCopy}
//             alt="Fashion Poster"
//             className="w-full rounded-xl shadow-lg object-cover h-[250px] sm:h-[330px] md:h-[380px] lg:h-[420px]"
//           />
//         </div>
//       </div>
//       }

//       <main className="px-3 sm:px-6 lg:px-8 pt-6 min-h-[calc(100vh-6rem)]">
//         <div className="max-w-7xl mx-auto">
//           {products.length > 0 && (
//             <div className="flex flex-wrap justify-between items-center gap-3 mb-6 border-b pb-3 border-gray-300">
//               <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
//                 {displayTitle}
//               </h1>

//              <div className="relative">
//   <select
//     value={sortType}
//     onChange={(e) => setSortType(e.target.value)}
//     className="
//       p-2 pr-10
//       border border-gray-300
//       rounded-lg
//       text-sm text-gray-700 
//       bg-white
//       appearance-none
//       focus:outline-none focus:ring-1 focus:ring-gray-300
//       w-52 sm:w-56 md:w-64
//     "
//   >
//     <option value="newest">Sort by: Newest</option>
//     <option value="price-asc">Price: Low to High</option>
//     <option value="price-desc">Price: High to Low</option>
//     <option value="best">Best Selling</option>
//   </select>

//   <ChevronDownIcon
//     className="
//       absolute right-3 top-1/2 -translate-y-1/2
//       h-4 w-4 text-gray-500
//       pointer-events-none
//     "
//   />
// </div>
//             </div>
//           )}

//           {products.length === 0 && (
//             <div className="flex justify-center items-center h-[40vh] text-gray-500 text-base sm:text-lg font-medium">
//               No products available in this category.
//             </div>
//           )}

//           {products.length > 0 && (
//             <div
//               className="
//                 grid
//                 grid-cols-2
//                 sm:grid-cols-3
//                 md:grid-cols-4
//                 lg:grid-cols-5
//                 xl:grid-cols-6
//                 gap-x-4 sm:gap-x-6 gap-y-12 sm:gap-y-20
//                 pb-16
//               "
//             >
//               {products.map((p) => (
//                 <ProductCard key={p._id} product={p} />
//               ))}
//             </div>
//           )}
//         </div>
//       </main>

//       <ToastContainer
//         position="top-center"
//         autoClose={2000}
//         pauseOnHover
//         theme="colored"
//         transition={Slide}
//       />
//     </div>
//   );
// };

// export default CategoryProductsPage;


/// WORKING PAGE 


// import React, { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import Navbar from "../components/Navbar";
// import ProductCard from "../cart/ProductCard";
// import { useAuth } from "../context/AuthContext";
// import { useCart } from "../context/CartContext";
// import { useParams, useNavigate } from "react-router-dom";
// import { ToastContainer, Slide } from "react-toastify";

// const BACKEND_BASE_URL = "http://192.168.29.217:5000";

// // Custom hook for infinite scroll
// const useInfiniteScroll = (callback) => {
//   useEffect(() => {
//     const handleScroll = () => {
//       if (
//         window.innerHeight + document.documentElement.scrollTop >=
//         document.documentElement.offsetHeight - 500
//       ) {
//         callback();
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [callback]);
// };

// const CategoryProductsPage = () => {
//   const { slug } = useParams();
//   const { user, logout } = useAuth();
//   const { cartItems } = useCart();
//   const navigate = useNavigate();

//   const [products, setProducts] = useState([]);
//   const [displayedProducts, setDisplayedProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [initialLoading, setInitialLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [categoryName, setCategoryName] = useState("");
//   const [sortType, setSortType] = useState("featured");
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [view, setView] = useState("grid");
//   const [selectedFilters, setSelectedFilters] = useState({
//     price: null,
//     size: [],
//     color: [],
//     discount: false,
//     inStock: false
//   });

//   // Filter options
//   const priceRanges = [
//     { label: "Under ₹1000", min: 0, max: 1000 },
//     { label: "₹1000 - ₹3000", min: 1000, max: 3000 },
//     { label: "₹3000 - ₹5000", min: 3000, max: 5000 },
//     { label: "Over ₹5000", min: 5000, max: Infinity }
//   ];

//   const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

//   // Fetch products with pagination
//   const fetchProductsByCategory = useCallback(async (pageNum = 1, reset = false) => {
//     if (!slug) return;

//     if (reset) {
//       setLoading(true);
//       setInitialLoading(true);
//     }

//     try {
//       const res = await axios.get(
//         `${BACKEND_BASE_URL}/api/user/shop/categories/${slug}`,
//         {
//           params: {
//             sort: sortType,
//             page: pageNum,
//             limit: 12
//           }
//         }
//       );

//       const newProducts = res.data.getProducts || [];
//       const totalProducts = res.data.total || 0;

//       if (reset) {
//         setProducts(newProducts);
//         setDisplayedProducts(newProducts.slice(0, 12));
//       } else {
//         setProducts(prev => [...prev, ...newProducts]);
//         setDisplayedProducts(prev => [...prev, ...newProducts]);
//       }

//       if (newProducts.length > 0 && reset) {
//         const nameFromProduct = newProducts[0].category?.name || newProducts[0].categoryName;
//         setCategoryName(
//           nameFromProduct || slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ")
//         );
//       }

//       setHasMore(newProducts.length === 12);
//       setPage(pageNum);
//     } catch (err) {
//       setError("Unable to load products at this time");
//     } finally {
//       setLoading(false);
//       setInitialLoading(false);
//     }
//   }, [slug, sortType]);

//   // Load more products
//   const loadMore = useCallback(() => {
//     if (!loading && hasMore) {
//       fetchProductsByCategory(page + 1, false);
//     }
//   }, [loading, hasMore, page, fetchProductsByCategory]);

//   // Initialize
//   useEffect(() => {
//     fetchProductsByCategory(1, true);
//   }, [slug, sortType]);

//   // Infinite scroll
//   useInfiniteScroll(loadMore);

//   // Apply filters
//   const applyFilters = useCallback(() => {
//     let filtered = [...products];

//     // Price filter
//     if (selectedFilters.price !== null) {
//       const range = priceRanges[selectedFilters.price];
//       filtered = filtered.filter(p => p.price >= range.min && p.price <= range.max);
//     }

//     // Size filter
//     if (selectedFilters.size.length > 0) {
//       filtered = filtered.filter(p => 
//         p.sizes?.some(s => selectedFilters.size.includes(s)) || 
//         selectedFilters.size.includes(p.size)
//       );
//     }

//     // Color filter
//     if (selectedFilters.color.length > 0) {
//       filtered = filtered.filter(p => 
//         selectedFilters.color.includes(p.color?.toLowerCase())
//       );
//     }

//     // Discount filter
//     if (selectedFilters.discount) {
//       filtered = filtered.filter(p => p.discount > 0);
//     }

//     // In stock filter
//     if (selectedFilters.inStock) {
//       filtered = filtered.filter(p => p.stock > 0);
//     }

//     setDisplayedProducts(filtered);
//   }, [products, selectedFilters, priceRanges]);

//   // Reset filters
//   const resetFilters = () => {
//     setSelectedFilters({
//       price: null,
//       size: [],
//       color: [],
//       discount: false,
//       inStock: false
//     });
//     setDisplayedProducts(products);
//   };

//   if (initialLoading) {
//     return (
//       <div className="min-h-screen bg-white">
//         <div className="h-24 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200" />
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
//           <div className="space-y-8">
//             {/* Skeleton Header */}
//             <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse" />
//             <div className="h-4 bg-gray-200 rounded w-1/6 animate-pulse" />
            
//             {/* Skeleton Filters */}
//             <div className="flex gap-4">
//               {[1, 2, 3, 4].map(i => (
//                 <div key={i} className="h-10 bg-gray-200 rounded w-24 animate-pulse" />
//               ))}
//             </div>
            
//             {/* Skeleton Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
//                 <div key={i} className="space-y-3">
//                   <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
//                   <div className="h-4 bg-gray-200 rounded animate-pulse" />
//                   <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-6xl mb-6">🔍</div>
//           <h3 className="text-2xl font-semibold text-gray-900 mb-2">Something went wrong</h3>
//           <p className="text-gray-600 mb-6">{error}</p>
//           <button
//             onClick={() => fetchProductsByCategory(1, true)}
//             className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white">
//       <Navbar
//         isAuthenticated={user?.isAuthenticated}
//         role={user?.role}
//         cartItemCount={cartItems?.length || 0}
//         handleLogout={logout}
//         handleUserIconClick={() => navigate("/profile")}
//         handleGatedNavigation={(e, path, isProtected) => {
//           if (isProtected && !user?.isAuthenticated) {
//             e.preventDefault();
//             navigate("/login");
//           } else {
//             navigate(path);
//           }
//         }}
//       />

//       {/* Category Header */}
//     <div className="mt-28"> 
//       <div className=" ">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
//             <div>
//               <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
//                 {categoryName}
//               </h1>
//              <p className="text-gray-600 mt-2">
//   {products.length === 0
//     ? ""
//     : `${displayedProducts.length} products found`}
// </p>

//             </div>
            
//             <div className="flex items-center gap-4">

//               {/* Sort Dropdown */}
//               <div className="relative">
//                 <select
//                   value={sortType}
//                   onChange={(e) => setSortType(e.target.value)}
//                   className="pl-4 pr-10 py-2.5 border border-gray-200 rounded-lg appearance-none bg-white text-gray-700 focus:outline-none focus:border-gray-400"
//                 >
//                   <option value="featured">Featured</option>
//                   <option value="newest">Newest</option>
//                   <option value="price-asc">Price: Low to High</option>
//                   <option value="price-desc">Price: High to Low</option>
//                   <option value="popular">Most Popular</option>
//                 </select>
//                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Filters Sidebar */}

//             <div className="lg:w-64 flex-shrink-0">
//             <div className="sticky top-40 space-y-6">
//               <div className="flex items-center justify-between">
//                 <h3 className="font-semibold text-gray-900">Filters</h3>
//                 <button
//                   onClick={resetFilters}
//                   className="text-sm text-gray-600 hover:text-gray-900"
//                 >
//                   Clear all
//                 </button>
//               </div>

//               {/* Price Filter */}
//               <div className="space-y-3">
//                 <h4 className="text-sm font-medium text-gray-700">Price Range</h4>
//                 <div className="space-y-2">
//                   {priceRanges.map((range, index) => (
//                     <label key={index} className="flex items-center gap-3 cursor-pointer group">
//                       <input
//                         type="radio"
//                         name="price"
//                         checked={selectedFilters.price === index}
//                         onChange={() => setSelectedFilters(prev => ({
//                           ...prev,
//                           price: prev.price === index ? null : index
//                         }))}
//                         className="w-4 h-4 text-gray-900 border-gray-300 focus:ring-gray-900"
//                       />
//                       <span className="text-sm text-gray-600 group-hover:text-gray-900">
//                         {range.label}
//                       </span>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               {/* Size Filter */}
//               <div className="space-y-3">
//                 <h4 className="text-sm font-medium text-gray-700">Size</h4>
//                 <div className="flex flex-wrap gap-2">
//                   {sizeOptions.map(size => (
//                     <button
//                       key={size}
//                       onClick={() => setSelectedFilters(prev => ({
//                         ...prev,
//                         size: prev.size.includes(size)
//                           ? prev.size.filter(s => s !== size)
//                           : [...prev.size, size]
//                       }))}
//                       className={`px-3 py-1.5 text-sm border rounded-lg transition-colors ${
//                         selectedFilters.size.includes(size)
//                           ? "bg-gray-900 text-white border-gray-900"
//                           : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
//                       }`}
//                     >
//                       {size}
//                     </button>
//                   ))}
//                 </div>
//               </div>

              

//               {/* Checkbox Filters */}
//               <div className="space-y-3">
//                 <label className="flex items-center gap-3 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={selectedFilters.discount}
//                     onChange={(e) => setSelectedFilters(prev => ({
//                       ...prev,
//                       discount: e.target.checked
//                     }))}
//                     className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
//                   />
//                   <span className="text-sm text-gray-600">On Sale</span>
//                 </label>
//                 <label className="flex items-center gap-3 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={selectedFilters.inStock}
//                     onChange={(e) => setSelectedFilters(prev => ({
//                       ...prev,
//                       inStock: e.target.checked
//                     }))}
//                     className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
//                   />
//                   <span className="text-sm text-gray-600">In Stock Only</span>
//                 </label>
//               </div>

//               {/* Apply Filters Button */}
//               <button
//                 onClick={applyFilters}
//                 className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
//               >
//                 Apply Filters
//               </button>
//             </div>
//           </div>
          
        
//           {/* Products Grid */}
//   <div className="flex-1">
//     {displayedProducts.length === 0 ? (
//       <div className="text-center py-20">
//         <h3 className="text-xl font-semibold text-gray-900 mb-2">
//           No products match your filters
//         </h3>
//         <p className="text-gray-600 mb-6">
//           Try adjusting your filters or browse our other categories
//         </p>
//         <button
//           onClick={resetFilters}
//           className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors"
//         >
//           Clear Filters
//         </button>
//       </div>
//     ) : (
//       <>
// <div
//   className={
//     view === "grid"
//       ? `
//         grid gap-4
//         grid-cols-1
//         sm:grid-cols-2
//         md:grid-cols-3
//         lg:grid-cols-4
//         xl:grid-cols-3
//       `
//       : "space-y-4"
//   }
// >




//           {displayedProducts.map((product) => (
//             <ProductCard
//               key={product._id}
//               product={product}
//               variant={view}
//             />
//           ))}
//         </div>

//         {hasMore && (
//           <div className="text-center mt-12">
//             <button
//               onClick={loadMore}
//               disabled={loading}
//               className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors disabled:opacity-50"
//             >
//               {loading ? "Loading..." : "Load More"}
//             </button>
//           </div>
//         )}
//       </>
//     )}
//   </div>

//         </div>
//       </div>

//       {/* Toast Container */}
//       <ToastContainer
//         position="bottom-right"
//         autoClose={3000}
//         hideProgressBar
//         newestOnTop
//         closeOnClick
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//         transition={Slide}
//       />
//     </div>
//   </div>
//   );
// };

// export default CategoryProductsPage;



import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
// import { ToastContainer, Slide, toast } from "react-toastify";
import toast, { Toaster, } from 'react-hot-toast';
import { motion } from "framer-motion";
import { 
  Heart, 
  ShoppingBag, 
  ArrowRight, 
  Check, 
  Filter 
} from "lucide-react";

// Components
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
// 1. IMPORT THE WISHLIST HOOK
import { useWishlist } from "../context/WishlistContext"; 
// import "react-toastify/dist/ReactToastify.css";
import FooterSection from "../components/FooterSection";

const BACKEND_BASE_URL = "http://192.168.29.217:5000";

// --- CUSTOM HOOKS ---
const useInfiniteScroll = (callback) => {
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 500
      ) {
        callback();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [callback]);
};

// --- HELPER COMPONENTS ---

function classNames(...c) {
  return c.filter(Boolean).join(" ");
}

// MODERN SKELETON LOADER
const SkeletonCard = () => (
  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl bg-gray-200 animate-pulse">
    <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-gray-300" />
    <div className="absolute bottom-4 left-4 right-4 h-16 rounded-2xl bg-gray-300" />
  </div>
);

// 2. FIXED MODERN PRODUCT CARD (Connected to Wishlist Context)
const ModernProductCard = ({ product, addToCart, cartItems }) => {
  const navigate = useNavigate();
  
  // Get functions from Wishlist Context
  const { isProductInWishlist, toggleWishlist } = useWishlist();

  // Check global state to see if this specific product is wishlisted
  const isWishlisted = isProductInWishlist(product._id);

  // Check if product is in cart
  const isInCart = cartItems?.some((item) => {
    const cartId = item.product?._id || item.productId;
    return String(cartId) === String(product._id);
  });

  const imageUrl = product.image?.startsWith("http")
    ? product.image
    : `${BACKEND_BASE_URL}/${product.image}`;

  const handleCardClick = () => {
    navigate(`/products/${product._id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (isInCart) {
      toast.info("This item is already in your cart",{id:"already in the cartt"});
      return;
    }
    addToCart(product);
    toast.success(`Added ${product.name} to cart`,{id:"products addedd to the cartttt"});
  };

  // UPDATED: Calls the context function
  const handleToggleWishlist = async (e) => {
    e.stopPropagation();
    const success = await toggleWishlist(product._id);
    
    if (success) {
      // Message depends on the NEW state (if it WAS true, now it's removed, and vice versa)
      // Since isWishlisted updates reactively, we can infer:
      if (!isWishlisted) {
         toast.success("Added to wishlist",{id:"added to the wishlist from category"});
      } else {
         toast.success("Removed from wishlist",{id:"removed to the wishlist from category"});
      }
    } else {
      toast.error("Please login to use wishlist",{id:"please login to wishlist to product"});
    }
  };

  const categoryName = typeof product.category === 'object' 
    ? product.category?.name 
    : product.category || product.categoryName;

  return (
    <div 
      onClick={handleCardClick}
      className="group relative aspect-[3/4] w-full cursor-pointer overflow-hidden rounded-3xl bg-gray-100 transition-all hover:shadow-2xl hover:-translate-y-1"
    >
      {/* Background Image */}
      <img
        src={imageUrl}
        alt={product.name}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Category Tag */}
      <div className="absolute left-4 top-4">
        <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-900 backdrop-blur-md">
          {categoryName || "Collection"}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="absolute right-4 top-4 flex flex-col gap-3">
        <button
          onClick={handleToggleWishlist}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-md backdrop-blur-md transition-all hover:scale-110 active:scale-95"
        >
          {/* FILL LOGIC: Based on Global State now */}
          <Heart
            className={classNames(
              "h-5 w-5 transition-colors",
              isWishlisted ? "fill-red-500 text-red-500" : "text-gray-900"
            )}
          />
        </button>

        <button
          onClick={handleAddToCart}
          className={classNames(
            "flex h-10 w-10 items-center justify-center rounded-full shadow-md backdrop-blur-md transition-all hover:scale-110 active:scale-95",
            isInCart 
              ? "bg-green-100 text-green-700" 
              : "bg-white/90 text-gray-900 hover:bg-black hover:text-white"
          )}
        >
          {isInCart ? <Check className="h-5 w-5" /> : <ShoppingBag className="h-5 w-5" />}
        </button>
      </div>

      {/* Bottom Info Card */}
      <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-90 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <div className="flex items-center justify-between rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur-xl border border-white/50">
          <div className="flex flex-col truncate pr-2">
            <h3 className="truncate text-sm font-bold text-gray-900">
              {product.name}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
               <p className="text-xs font-bold text-gray-900">
                  ₹{product.price?.toFixed(0)}
               </p>
               {product.discount > 0 && (
                 <span className="text-[10px] text-green-600 font-bold bg-green-100 px-1.5 rounded-full">
                   -{product.discount}%
                 </span>
               )}
            </div>
          </div>
          
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 group-hover:bg-black group-hover:text-white transition-colors duration-300">
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
};


// --- MAIN PAGE COMPONENT ---

const CategoryProductsPage = () => {
  const { slug } = useParams();
  const { user, logout } = useAuth();
  const { cartItems, addToCart } = useCart();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [sortType, setSortType] = useState("featured");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const [selectedFilters, setSelectedFilters] = useState({
    price: null,
    size: [],
    color: [],
    discount: false,
    inStock: false
  });

  const priceRanges = [
    { label: "Under ₹1000", min: 0, max: 1000 },
    { label: "₹1000 - ₹3000", min: 1000, max: 3000 },
    { label: "₹3000 - ₹5000", min: 3000, max: 5000 },
    { label: "Over ₹5000", min: 5000, max: Infinity }
  ];

  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

  // --- API CALLS ---
  const fetchProductsByCategory = useCallback(async (pageNum = 1, reset = false) => {
    if (!slug) return;
    if (reset) {
      setLoading(true);
      setInitialLoading(true);
    }

    try {
      const res = await axios.get(
        `${BACKEND_BASE_URL}/api/user/shop/categories/${slug}`,
        {
          params: {
            sort: sortType,
            page: pageNum,
            limit: 12
          }
        }
      );

      const newProducts = res.data.getProducts || [];
      
      if (reset) {
        setProducts(newProducts);
        setDisplayedProducts(newProducts); 
      } else {
        setProducts(prev => [...prev, ...newProducts]);
        setDisplayedProducts(prev => [...prev, ...newProducts]);
      }

      if (newProducts.length > 0 && reset) {
        const nameFromProduct = newProducts[0].category?.name || newProducts[0].categoryName;
        setCategoryName(
          nameFromProduct || slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ")
        );
      }

      setHasMore(newProducts.length === 12);
      setPage(pageNum);
    } catch (err) {
      setError("Unable to load products at this time");
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, [slug, sortType]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchProductsByCategory(page + 1, false);
    }
  }, [loading, hasMore, page, fetchProductsByCategory]);

  useEffect(() => {
    fetchProductsByCategory(1, true);
  }, [slug, sortType]);

  useInfiniteScroll(loadMore);

  // --- FILTER LOGIC ---
  const applyFilters = useCallback(() => {
    let filtered = [...products];

    if (selectedFilters.price !== null) {
      const range = priceRanges[selectedFilters.price];
      filtered = filtered.filter(p => p.price >= range.min && p.price <= range.max);
    }

    if (selectedFilters.size.length > 0) {
      filtered = filtered.filter(p => 
        p.sizes?.some(s => selectedFilters.size.includes(s)) || 
        selectedFilters.size.includes(p.size)
      );
    }

    if (selectedFilters.color.length > 0) {
      filtered = filtered.filter(p => 
        selectedFilters.color.includes(p.color?.toLowerCase())
      );
    }

    if (selectedFilters.discount) {
      filtered = filtered.filter(p => p.discount > 0);
    }

    if (selectedFilters.inStock) {
      filtered = filtered.filter(p => p.stock > 0);
    }

    setDisplayedProducts(filtered);
  }, [products, selectedFilters, priceRanges]);

  const resetFilters = () => {
    setSelectedFilters({
      price: null,
      size: [],
      color: [],
      discount: false,
      inStock: false
    });
    setDisplayedProducts(products);
  };

  // --- RENDER ---

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="h-24 bg-gradient-to-r from-gray-50 to-white" />
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <SkeletonCard key={i} />)}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          {/* <div className="text-6xl mb-6">🔍</div> */}
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">Something went wrong</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => fetchProductsByCategory(1, true)}
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* <Navbar
        isAuthenticated={user?.isAuthenticated}
        role={user?.role}
        cartItemCount={cartItems?.length || 0}
        handleLogout={logout}
        handleUserIconClick={() => navigate("/profile")}
        handleGatedNavigation={(e, path, isProtected) => {
          if (isProtected && !user?.isAuthenticated) {
            e.preventDefault();
            navigate("/login");
          } else {
            navigate(path);
          }
        }}
      /> */}

      {/* ANIMATED HEADER */}
      <div className="pt-32 pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold tracking-tighter sm:text-5xl"
            >
              <span className="bg-gradient-to-r from-gray-900 via-indigo-800 to-rose-700 bg-clip-text text-transparent capitalize">
                {categoryName}
              </span>
            </motion.h2>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "80px" }}
              transition={{ duration: 0.8 }}
              className="h-1 bg-gray-900 mx-auto mt-4 rounded-full"
            />
            <p className="text-gray-500 mt-4">
              {displayedProducts.length} items curated for you
            </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex flex-col lg:flex-row gap-12 ">
          
          {/* SIDEBAR */}
          {/* <div className="lg:w-64 flex-shrink-0 flex flex-col top-10 "> */}
          <div className="lg:w-64 flex-shrink-0 hidden lg:block">

            {/* <div className=" space-y-8 p-6 bg-gray-50 rounded-2xl border border-gray-100 "> */}
            <div className="sticky top-24 space-y-8 p-6 bg-gray-50 rounded-2xl border border-gray-100">

              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <div className="flex items-center gap-2 text-gray-900 font-bold">
                    <Filter className="w-5 h-5" />
                    <span>Filters</span>
                </div>
                <button
                  onClick={resetFilters}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-800 uppercase tracking-wide"
                >
                  Clear
                </button>
              </div>

              {/* Price Filter */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Price</h4>
                <div className="space-y-2">
                  {priceRanges.map((range, index) => (
                    <label key={index} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="price"
                        checked={selectedFilters.price === index}
                        onChange={() => setSelectedFilters(prev => ({
                          ...prev,
                          price: prev.price === index ? null : index
                        }))}
                        className="w-4 h-4 text-gray-900 border-gray-300 focus:ring-gray-900"
                      />
                      <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                        {range.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Size</h4>
                <div className="flex flex-wrap gap-2">
                  {sizeOptions.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedFilters(prev => ({
                        ...prev,
                        size: prev.size.includes(size)
                          ? prev.size.filter(s => s !== size)
                          : [...prev.size, size]
                      }))}
                      className={`h-10 w-10 flex items-center justify-center text-sm font-medium rounded-full transition-all ${
                        selectedFilters.size.includes(size)
                          ? "bg-gray-900 text-white shadow-md"
                          : "bg-white text-gray-700 border border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Utility Filters */}
              <div className="space-y-3 pt-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFilters.discount}
                    onChange={(e) => setSelectedFilters(prev => ({ ...prev, discount: e.target.checked }))}
                    className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                  />
                  <span className="text-sm text-gray-600">On Sale</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedFilters.inStock}
                    onChange={(e) => setSelectedFilters(prev => ({ ...prev, inStock: e.target.checked }))}
                    className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                  />
                  <span className="text-sm text-gray-600">In Stock Only</span>
                </label>
              </div>

              <button
                onClick={applyFilters}
                className="w-full py-3 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-black transition-all shadow-lg hover:shadow-xl transform active:scale-95"
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* PRODUCTS GRID */}
          <div className="flex-1">
            <div className="flex justify-end mb-8">
               <select
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
                className="pl-4 pr-10 py-2 border border-gray-200 rounded-full text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-gray-200 cursor-pointer hover:bg-gray-50"
              >
                <option value="featured">Sort by Featured</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            {displayedProducts.length === 0 ? (
              <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                <ShoppingBag className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                  We couldn't find any products matching your current filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2 bg-white border border-gray-300 text-gray-900 font-medium rounded-full hover:bg-gray-50 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                  {displayedProducts.map((product) => (
                    <ModernProductCard
                      key={product._id}
                      product={product}
                      cartItems={cartItems}
                      addToCart={addToCart}
                    />
                  ))}
                </div>

                {hasMore && (
                  <div className="text-center mt-16">
                    <button
                      onClick={loadMore}
                      disabled={loading}
                      className="px-8 py-3 border border-gray-200 text-gray-600 font-medium rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50"
                    >
                      {loading ? "Loading more styles..." : "Load More Products"}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <FooterSection/>
      <Toaster
                                position="top-right"
                                toastOptions={{
                                  duration: 3000,
                                  style: {
                                    borderRadius: "10px",
                                    fontFamily: "Inter, sans-serif",
                                  },
                                }}
                              />
    </div>
  );
};

export default CategoryProductsPage;