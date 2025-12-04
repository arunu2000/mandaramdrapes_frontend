// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import ProductCard from "./ProductCard"; // Assuming you have a ProductCard component

// const CategoryProductsPage = () => {
//     // Get the dynamic part of the URL (the slug)
//     const { slug } = useParams();

//     // State for products, loading, and error
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // Backend base URL (Use your live URL)
//     const BASE_URL = "http://192.168.29.217:5000/api";

//     useEffect(() => {
//         const fetchProductsByCategory = async () => {
//             setLoading(true);
//             setError(null);
//             setProducts([]);

//             try {
//                 // Key Step: Fetch products using the category slug!
//                 // Your backend MUST have an endpoint that accepts a slug
//                 // and returns the products belonging to that category.
//                 // e.g., GET http://192.168.29.217:5000/api/products/category/shirts
//                 const response = await axios.get(`${BASE_URL}/products/category/${slug}`);

//                 // Assuming your backend response is similar to: { success: true, products: [...] }
//                 setProducts(response.data.products || []);
//             } catch (err) {
//                 console.error(`Error fetching products for category ${slug}:`, err);
//                 setError("Failed to load products. Please try again later.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (slug) {
//             fetchProductsByCategory();
//         }
//     }, [slug]); // Re-run the effect whenever the slug changes

//     // --- Rendering Logic ---

//     if (loading) {
//         return (
//             <div className="text-center py-20">
//                 <p className="text-xl font-medium text-gray-600">Loading products for "{slug}"...</p>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="text-center py-20 text-red-600">
//                 <p className="text-xl">{error}</p>
//             </div>
//         );
//     }

//     // Convert slug to a display-friendly title
//     const categoryTitle = slug.replace(/-/g, ' ').toUpperCase();

//     return (
//         <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
//             <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
//                 {categoryTitle}
//             </h1>

//             {products.length === 0 ? (
//                 <p className="text-xl text-gray-500 italic">
//                     No products found in the {categoryTitle} category.
//                 </p>
//             ) : (
//                 <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
//                     {products.map((product) => (
//                         // Replace <ProductCard> with your actual product rendering component
//                         <div key={product._id} className="border p-4 rounded-md shadow-sm">
//                             <h3 className="text-lg font-semibold">{product.name}</h3>
//                             <p className="text-gray-600">${product.price}</p>
//                             {/* Link to product detail page if needed */}
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CategoryProductsPage;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import ProductCard from "./ProductCard"; // Corrected path (assuming fix)

// // IMPORTANT: Define the base URL for your backend
// const BACKEND_BASE_URL = "http://192.168.29.217:5000";

// const CategoryProductsPage = () => {
//     // Get the dynamic part of the URL (the category slug)
//     const { slug } = useParams();

//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchProductsByCategory = async () => {
//             setLoading(true);
//             setError(null);

//             //  Ensure your backend has this endpoint!
//             const API_URL = `${BACKEND_BASE_URL}/api/products/category/${slug}`;

//             try {
//                 const res = await axios.get(API_URL);

//                 // Assuming your API returns an array of products in res.data
//                 setProducts(res.data);
//             } catch (err) {
//                 console.error("Error fetching category products:", err);
//                 // The error message might depend on how your backend handles missing categories
//                 setError(`Could not load products for category "${slug}". Please check the API.`);
//                 setProducts([]);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (slug) {
//             fetchProductsByCategory();
//         }
//     }, [slug]); // Reruns fetch when the category slug changes

//     // --- Render Loading/Error States ---
//     if (loading) {
//         return <div className="text-center py-20 text-xl font-medium">Loading products in {slug}...</div>;
//     }

//     if (error) {
//         return <div className="text-center py-20 text-red-600">{error}</div>;
//     }

//     const categoryTitle = slug.charAt(0).toUpperCase() + slug.slice(1);

//     return (
//         <div className="bg-white">
//             <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
//                 <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-8">
//                     {categoryTitle} Collection
//                 </h1>

//                 {products.length === 0 ? (
//                     <div className="text-center py-10 text-gray-500">
//                         No products are currently available in this category.
//                     </div>
//                 ) : (
//                     // Product grid structure
//                     <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
//                         {products.map((product) => (
//                             // Use the ProductCard for each item
//                             <ProductCard key={product._id} product={product} />
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default CategoryProductsPage;

// import React, { useEffect, useState, useCallback } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';

// // IMPORTANT: Define the base URL for your backend
// const BACKEND_BASE_URL = "http://192.168.29.217:5000";

// // --- START: SELF-CONTAINED PRODUCT CARD COMPONENT ---
// // This component is included here to prevent compilation errors and provide a complete visual output.
// const ProductCard = ({ product }) => {
//     // Fallback values in case the product data is incomplete
//     const name = product?.name || "Product Name Missing";
//     // Uses the fixed price formatting from previous discussion: $X.XX
//     const price = product?.price ? `$${product.price.toFixed(2)}` : "Price N/A";
//     const imageUrl = product?.image || "https://placehold.co/600x400/4c34a3/ffffff?text=Product";

//     // Determine the link target (using product ID for demonstration)
//     const productLink = `/products/${product?._id || 'unknown'}`;

//     return (
//         <div className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
//             <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden lg:aspect-none group-hover:opacity-75 h-64">
//                 <img
//                     src={imageUrl}
//                     alt={`Image of ${name}`}
//                     className="h-full w-full object-cover object-center lg:h-full lg:w-full"
//                     onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/e0e0e0/333333?text=Image+Error"; }}
//                 />
//             </div>
//             <div className="p-4 flex flex-col items-center text-center">
//                 <h3 className="text-lg font-medium text-gray-900">
//                     <Link to={productLink} className="hover:text-indigo-600 transition">
//                         <span aria-hidden="true" className="absolute inset-0" />
//                         {name}
//                     </Link>
//                 </h3>
//                 <p className="mt-1 text-sm text-gray-500">Category: {product?.category?.name || 'N/A'}</p>
//                 <p className="text-xl font-bold text-indigo-600 mt-2">{price}</p>
//             </div>
//         </div>
//     );
// };
// // --- END: SELF-CONTAINED PRODUCT CARD COMPONENT ---

// const CategoryProductsPage = () => {
//     // Retrieves the slug (e.g., 'shirts') from the URL: /category/shirts
//     const { slug } = useParams();

//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // Memoized function for fetching data
//     const fetchProductsByCategory = useCallback(async () => {
//         if (!slug) return;

//         setLoading(true);
//         setError(null);

//         console.log('!!!!!!!!!!',slug);

//         // API URL uses the slug, which is handled correctly by the backend controller
//         const API_URL = `${BACKEND_BASE_URL}/api/user/shop/categories/${slug}`;

//         try {
//             const res = await axios.get(API_URL);

//             // Accesses the 'getProducts' key from the backend response
//             setProducts(res.data.getProducts || []);

//         } catch (err) {
//             console.error(`Error fetching products for slug "${slug}":`, err);

//             const status = err.response?.status;
//             let errorMessage = `Could not load products. Status: ${status || 'Network Error'}.`;

//             if (status === 404) {
//                 errorMessage = `Category "${slug}" not found on the server. (Status 404)`;
//             } else if (status === 500) {
//                  errorMessage = "Server error (Status 500). Please check backend logs for Mongoose/database errors.";
//             }

//             setError(errorMessage);
//             setProducts([]);
//         } finally {
//             setLoading(false);
//         }
//     }, [slug]);

//     useEffect(() => {
//         fetchProductsByCategory();
//     }, [fetchProductsByCategory]);

//     if (loading) {
//         return <div className="text-center py-20 text-xl font-medium text-indigo-600">Loading products in {slug}...</div>;
//     }

//     if (error) {
//         return <div className="text-center py-20 text-red-600 bg-red-50 p-6 m-4 rounded-lg border border-red-300">{error}</div>;
//     }

//     // Capitalize the slug for display title and replace hyphens
//     const categoryTitle = slug ? slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ') : 'Category';

//     return (
//         <div className="bg-gray-50 min-h-screen">
//             <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
//                 <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-10 border-b-2 pb-3">
//                     Collection
//                 </h1>

//                 {products.length === 0 ? (
//                     <div className="text-center py-20 text-lg text-gray-500 bg-white p-10 rounded-xl shadow-lg border border-gray-200">
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto mb-4 text-indigo-500">
//                           <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.5 2.108 8.43c-.588.666-1.354 1.054-2.193 1.076H7.47c-.84 0-1.606-.39-2.194-1.076l2.108-8.433m10.742 2.871-2.493-2.492m-2.492 2.492-2.493-2.492" />
//                         </svg>
//                         <h2 className="text-xl font-semibold text-gray-800">No Products Found</h2>
//                         <p className="mt-2 text-sm">We couldn't find any products in the *{categoryTitle}* category.</p>
//                         <p className="mt-1 text-sm text-gray-400">If this is unexpected, please check your backend models and data.</p>
//                     </div>
//                 ) : (
//                     // Product grid structure
//                     <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//                         {products.map((product) => (
//                             <ProductCard key={product._id} product={product} />
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default CategoryProductsPage;

//working codeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee

// import React, { useEffect, useState, useCallback } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';

// // IMPORTANT: Define the base URL for your backend
// const BACKEND_BASE_URL = "http://192.168.29.217:5000";

// // --- PRODUCT CARD COMPONENT (Uses the desired Tailwind UI) ---
// const ProductCard = ({ product }) => {
//     // Map product data from your backend to the new UI structure
//     const name = product?.name || "Product Name Missing";
//     // Assuming 'price' is a number and needs formatting
//     const price = product?.price ? `$${product.price.toFixed(2)}` : "Price N/A";

//     // CRITICAL: Prepends the base URL for images if it's a relative path
//     const imageUrl = product?.image
//         ? (product.image.startsWith('http') ? product.image : `${BACKEND_BASE_URL}/${product.image}`)
//         : "https://placehold.co/600x400/e0e0e0/333333?text=Image+Error";

//     // Determine the link target (using Mongoose _id)
//     const productLink = `/products/${product?._id || 'unknown'}`;

//     // Get category name safely (assumes product.category is an object with a name property)
//     const categoryName = product?.category?.name || 'N/A';
//     const imageAlt = product?.imageAlt || `Image of ${name}`;

//     return (
//         <div key={product._id} className="group relative">

//             {/* Image Container */}
//             <div className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80 overflow-hidden">
//                 <img
//                     alt={imageAlt}
//                     src={imageUrl}
//                     className="h-full w-full object-cover object-center"
//                     onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/e0e0e0/333333?text=Image+Error"; }}
//                 />
//             </div>

//             {/* Text Details */}
//             <div className="mt-4 flex justify-between">
//                 <div>
//                     <h3 className="text-sm text-gray-700">
//                         <Link to={productLink} className="hover:text-indigo-600 transition">
//                             <span aria-hidden="true" className="absolute inset-0" />
//                             {name}
//                         </Link>
//                     </h3>
//                     <p className="mt-1 text-sm text-gray-500">{categoryName}</p>
//                 </div>
//                 <p className="text-sm font-medium text-gray-900">{price}</p>
//             </div>
//         </div>
//     );
// };
// // -----------------------------------------------------------------

// const CategoryProductsPage = () => {
//     // Retrieves the slug (e.g., 'shirts') from the URL
//     const { slug } = useParams();

//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // Function to extract the clean category name from the products array
//     const getCategoryName = () => {
//         // Find the name from the first product's category object
//         if (products.length > 0 && products[0].category && products[0].category.name) {
//             return products[0].category.name;
//         }
//         // Fallback: If no products or name is available, use the formatted slug
//         return slug ? slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ') : 'Category';
//     }

//     // Memoized function for fetching data by category slug
//     const fetchProductsByCategory = useCallback(async () => {
//         if (!slug) {
//             setLoading(false);
//             setError("No category selected in the URL.");
//             return;
//         }

//         setLoading(true);
//         setError(null);

//         // API URL uses the slug to target the specific category
//         const API_URL = `${BACKEND_BASE_URL}/api/user/shop/categories/${slug}`;

//         try {
//             const res = await axios.get(API_URL);

//             // Accesses the 'getProducts' key from the backend response
//             setProducts(res.data.getProducts || []);

//         } catch (err) {
//             console.error(`Error fetching products for slug "${slug}":`, err);

//             const status = err.response?.status;
//             let errorMessage = `Could not load products. Status: ${status || 'Network Error'}.`;

//             if (status === 404) {
//                 errorMessage = `Category "${slug}" not found on the server. (Status 404)`;
//             } else if (status === 500) {
//                  errorMessage = "Server error (Status 500). Please check backend logs for Mongoose/database errors.";
//             }

//             setError(errorMessage);
//             setProducts([]);
//         } finally {
//             setLoading(false);
//         }
//     }, [slug]);

//     useEffect(() => {
//         fetchProductsByCategory();
//     }, [fetchProductsByCategory]);

//     if (loading) {
//         return <div className="text-center py-20 text-xl font-medium text-indigo-600">Loading products in {slug}...</div>;
//     }

//     if (error) {
//         return <div className="text-center py-20 text-red-600 bg-red-50 p-6 m-4 rounded-lg border border-red-300">{error}</div>;
//     }

//     // Get the display title
//     const displayTitle = getCategoryName();

//     return (
//         <div className="bg-white min-h-screen">
//             <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
//                 {/* UPDATED HEADING: Displays only the Category Name */}
//                 <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-10 border-b-2 pb-3">
//                     {displayTitle}
//                 </h1>

//                 {products.length === 0 ? (
//                     <div className="text-center py-20 text-lg text-gray-500 bg-white p-10 rounded-xl shadow-lg border border-gray-200">
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto mb-4 text-indigo-500">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.5 2.108 8.43c-.588.666-1.354 1.054-2.193 1.076H7.47c-.84 0-1.606-.39-2.194-1.076l2.108-8.433m10.742 2.871-2.493-2.492m-2.492 2.492-2.493-2.492" />
//                         </svg>
//                         <h2 className="text-xl font-semibold text-gray-800">No Products Found</h2>
//                         <p className="mt-2 text-sm">We couldn't find any products in the **{displayTitle}** category.</p>
//                         <p className="mt-1 text-sm text-gray-400">If this is unexpected, please check your backend API.</p>
//                     </div>
//                 ) : (
//                     // This is the new Tailwind grid structure you requested
//                     <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
//                         {products.map((product) => (
//                             <ProductCard key={product._id} product={product} />
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default CategoryProductsPage;

// import React, { useEffect, useState, useCallback } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';
// import { domainUrl } from '../utils/constant';
// import Navbar from '../components/Navbar';
// import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/20/solid';

// // --- 1. ProductCard Component (Price Restored, Duplication Fixed) ---
// const ProductCard = ({ product }) => {
//     // Map product data from your backend to the new UI structure
//     const name = product?.name || "Product Name Missing";
//     // *** CRITICAL FIX: Price is correctly defined and will be displayed ***
//     const price = product?.price ? `₹${product.price.toFixed(2)}` : "Price N/A";

//     const imageUrl = product?.image
//         ? (product.image.startsWith('http') ? product.image : `${domainUrl}/${product.image}`)
//         : "https://placehold.co/600x400/e0e0e0/333333?text=Image+Error";

//     const productLink = `/products/${product?._id || 'unknown'}`;

//     const imageAlt = product?.imageAlt || `Image of ${name}`;

//     return (
//         <div key={product._id} className="group relative border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">

//             {/* Image Container */}
//             <div className="aspect-square w-full rounded-t-lg bg-gray-200 object-cover lg:aspect-auto lg:h-[28rem] overflow-hidden">
//                 <img
//                     alt={imageAlt}
//                     src={imageUrl}
//                     className="h-full w-full object-cover object-center"
//                     onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/e0e0e0/333333?text=Image+Error"; }}
//                 />
//             </div>

//             {/* Text Details */}
//             <div className="p-4 flex flex-col justify-between h-24">
//                 <div>
//                     {/* CRITICAL FIX: Product Name - Allowing text wrap and reserving space (h-10) */}
//                     <h3 className="text-base font-semibold text-gray-800 leading-tight h-10 overflow-hidden">
//                         <Link to={productLink} className="hover:text-indigo-600 transition">
//                             <span aria-hidden="true" className="absolute inset-0" />
//                             {name}
//                         </Link>
//                     </h3>

//                     {/* *** CRITICAL FIX: REMOVED THE DUPLICATE SECOND LINE OF TEXT *** */}
//                 </div>

//                 {/* *** CRITICAL FIX: Price is correctly placed here *** */}
//                 <div className="flex items-center ">
//                     <p className="text-lg font-bold text-gray-900">{price}</p>
//                 </div>
//             </div>
//         </div>
//     );
// };
// // -----------------------------------------------------------------------------

// const CategoryProductsPage = () => {
//     const { slug } = useParams();

//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // ... (Data fetching functions remain unchanged) ...
//     const getCategoryName = () => {
//         if (products.length > 0 && products[0].category && products[0].category.name) {
//             return products[0].category.name;
//         }
//         return slug ? slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ') : 'Category';
//     }

//     const fetchProductsByCategory = useCallback(async () => {
//         if (!slug) {
//             setLoading(false);
//             setError("No category selected in the URL.");
//             return;
//         }

//         setLoading(true);
//         setError(null);

//         const API_URL = `${domainUrl}/user/shop/categories/${slug}`;

//         try {
//             const res = await axios.get(API_URL);
//             setProducts(res.data.getProducts || []);
//         } catch (err) {
//             console.error(`Error fetching products for slug "${slug}":`, err);

//             const status = err.response?.status;
//             let errorMessage = `Could not load products. Status: ${status || 'Network Error'}.`;

//             if (status === 404) {
//                 errorMessage = `Category "${slug}" not found on the server. (Status 404)`;
//             } else if (status === 500) {
//                  errorMessage = "Server error (Status 500). Please check backend logs for Mongoose/database errors.";
//             }

//             setError(errorMessage);
//             setProducts([]);
//         } finally {
//             setLoading(false);
//         }
//     }, [slug]);

//     useEffect(() => {
//         fetchProductsByCategory();
//     }, [fetchProductsByCategory]);

//     const displayTitle = getCategoryName();
//     const productCount = products.length;

//     // --- Loading and Error States ---
//     if (loading) {
//         return <div className="text-center py-20 text-xl font-medium text-indigo-600">Loading products in {slug}...</div>;
//     }

//     if (error) {
//         return <div className="text-center py-20 text-red-600 bg-red-50 p-6 m-4 rounded-lg border border-red-300">{error}</div>;
//     }

//     // --- Main UI Structure ---
//     return (
//         <div className="bg-white min-h-screen">
//             <Navbar/>
//             <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">

//                 {/* Breadcrumbs and Category Name Header */}
//                 <div className="flex items-center text-sm mb-4 text-gray-500">
//                     <Link to="/" className="hover:text-indigo-600">Home</Link>
//                     <span className="mx-2">/</span>
//                     <Link to="/casual-wear" className="hover:text-indigo-600">Casual Wear</Link>
//                     <span className="mx-2">/</span>
//                     <span className="font-medium text-gray-900">{displayTitle}</span>
//                 </div>

//                 <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">
//                     {displayTitle.toUpperCase()} FOR MEN <span className="text-base font-normal text-gray-500">({productCount} Items)</span>
//                 </h1>

//                 {/* --- Main Content Grid (Filters + Products) --- */}
//                 <div className="flex flex-col lg:flex-row gap-8">

//                     {/* LEFT COLUMN: FILTERS (Fixed Width) */}
//                     <div className="w-full lg:w-1/4 xl:w-1/5">
//                         <h2 className="text-lg font-bold tracking-tight text-gray-900 mb-4 flex items-center pt-2">
//                             <FunnelIcon className="h-5 w-5 mr-2 text-gray-500" />
//                             FILTERS
//                         </h2>

//                         {/* Static/Placeholder Filter List */}
//                         <div className="space-y-4">
//                             {[
//                                 'Department', 'Categories', 'Sub-Categories', 'Brands',
//                                 'Product Type', 'Gender', 'Size', 'Price', 'Color',
//                                 'Offers', 'Discount', 'Fabric', 'Neckline'
//                             ].map((filter) => (
//                                 <div key={filter} className="py-2 border-b border-gray-100 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition">
//                                     <span className="text-sm font-medium text-gray-700">{filter}</span>
//                                     <ChevronDownIcon className="h-4 w-4 text-gray-400" />
//                                 </div>
//                             ))}
//                         </div>

//                         <h3 className="text-base font-bold tracking-tight text-gray-900 mt-6 mb-2">
//                             ADVANCE FILTERS
//                         </h3>
//                         <div className="py-2 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition">
//                             <span className="text-sm font-medium text-gray-700">Pattern</span>
//                             <ChevronDownIcon className="h-4 w-4 text-gray-400" />
//                         </div>
//                     </div>

//                     {/* RIGHT COLUMN: PRODUCTS (Flexible Width) */}
//                     <div className="w-full lg:w-3/4 xl:w-4/5">

//                         <div className="flex items-center justify-end mb-6"></div>

//                         {productCount === 0 ? (
//                             <div className="text-center py-20 text-lg text-gray-500 bg-gray-50 p-10 rounded-xl shadow-inner border border-gray-200">
//                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto mb-4 text-indigo-500">
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.5 2.108 8.43c-.588.666-1.354 1.054-2.193 1.076H7.47c-.84 0-1.606-.39-2.194-1.076l2.108-8.433m10.742 2.871-2.493-2.492m-2.492 2.492-2.493-2.492" />
//                                 </svg>
//                                 <h2 className="text-xl font-semibold text-gray-800">No products available in {displayTitle}.</h2>
//                                 <p className="mt-2 text-sm text-gray-500">Please check back later or try a different category.</p>
//                             </div>
//                         ) : (
//                             // Product Grid
//                             <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
//                                 {products.map((product) => (
//                                     <ProductCard key={product._id} product={product} />
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CategoryProductsPage;

// import React, { useEffect, useState, useCallback } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";
// import Navbar from "../components/Navbar";

// const BACKEND_BASE_URL = "http://192.168.29.217:5000";

// // PRODUCT CARD UI
// const ProductCard = ({ product }) => {
//   const name = product?.name || "Product Name Missing";
//   const price = product?.price ? `₹${product.price}` : "Price N/A";

//   const imageUrl = product?.image
//     ? product.image.startsWith("http")
//       ? product.image
//       : `${BACKEND_BASE_URL}/${product.image}`
//     : "https://placehold.co/500x500?text=No+Image";

//   return (
//     <div className="group relative w-full">
//       <img
//         alt={name}
//         src={imageUrl}
//         className="w-full h-64 object-cover rounded-md bg-gray-200 group-hover:opacity-80"
//       />

//       <div className="mt-3 flex justify-between">
//         <h3 className="text-sm text-gray-700">{name}</h3>
//         <p className="text-sm font-medium text-gray-900">{price}</p>
//       </div>
//     </div>
//   );
// };

// const CategoryProductsPage = () => {
//   const { slug } = useParams();

//   const [categoryName, setCategoryName] = useState("");
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 👉 Fetch Category Name + Products
//   const fetchCategoryData = useCallback(async () => {
//     try {
//       setLoading(true);

//       const res = await axios.get(
//         `${BACKEND_BASE_URL}/api/user/shop/categories/${slug}`
//       );

//       setProducts(res.data.getProducts || []);
//       setCategoryName(res.data.categoryName || "Category");
//     } catch (e) {
//       setCategoryName("Category");
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [slug]);

//   useEffect(() => {
//     fetchCategoryData();
//   }, [fetchCategoryData]);

//   if (loading) {
//     return <div className="text-center py-20">Loading...</div>;
//   }

//   return (
//     <div className="bg-white min-h-screen">
//       <Navbar />

//       {/* FIX — No touching navbar */}
//       <div className="pt-45 w-full px-35">

//         {/* FIX — CATEGORY NAME SHOWN CORRECTLY */}
//         <h2 className="text-3xl font-bold text-gray-900 mb-8">
//           {categoryName}
//         </h2>

//         {/* FIX — PRODUCTS FROM LEFT */}
//         {products.length === 0 ? (
//           <p className="text-gray-500">No products found.</p>
//         ) : (
//           <div className="
//             grid
//             grid-cols-1
//             sm:grid-cols-2
//             md:grid-cols-3
//             lg:grid-cols-4
//             gap-8
//             justify-start
//           ">
//             {products.map((product) => (
//               <ProductCard key={product._id} product={product} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CategoryProductsPage;

// import React, { useEffect, useState, useCallback } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";
// import Navbar from "../components/Navbar";

// const BACKEND_BASE_URL = "http://192.168.29.217:5000";

// // PRODUCT CARD (Matches Tailwind Template)
// const ProductCard = ({ product }) => {
//   const name = product?.name || "Product Name Missing";
//   const price = product?.price ? `₹${product.price}` : "Price N/A";

//   const imageUrl = product?.image
//     ? product.image.startsWith("http")
//       ? product.image
//       : `${BACKEND_BASE_URL}/${product.image}`
//     : "https://placehold.co/500x500?text=No+Image";

//   const productLink = `/products/${product?._id || "unknown"}`;

//   return (
//     <div key={product._id} className="group relative">
//       <img
//         alt={name}
//         src={imageUrl}
//         className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
//         onError={(e) => {
//           e.target.src = "https://placehold.co/500x500?text=Image+Error";
//         }}
//       />

//       <div className="mt-4 flex justify-between">
//         <div>
//           <h3 className="text-sm text-gray-700">
//             <Link to={productLink}>
//               <span aria-hidden="true" className="absolute inset-0" />
//               {name}
//             </Link>
//           </h3>
//         </div>

//         <p className="text-sm font-medium text-gray-900">{price}</p>
//       </div>
//     </div>
//   );
// };

// const CategoryProductsPage = () => {
//   const { slug } = useParams();

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   // State to store the proper category name extracted from the API response
//   const [categoryName, setCategoryName] = useState("");

//   const fetchProductsByCategory = useCallback(async () => {
//     if (!slug) return;

//     setLoading(true);
//     setError(null);
//     setCategoryName("");

//     try {
//       const res = await axios.get(
//         `${BACKEND_BASE_URL}/api/user/shop/categories/${slug}`
//       );

//       const fetchedProducts = res.data.getProducts || [];
//       setProducts(fetchedProducts);

//       // 🏆 Core Fix: Extract the category name from the first product
//       if (fetchedProducts.length > 0) {
//         // ASSUMPTION: The category name is stored in product.category.name OR product.categoryName
//         // Adjust the path based on your API response structure (e.g., product.category.name, product.category.title, or product.categoryName)
//         const nameFromProduct =
//           fetchedProducts[0].category?.name || fetchedProducts[0].categoryName;

//         if (nameFromProduct) {
//           setCategoryName(nameFromProduct);
//         } else {
//           // Fallback: Use the slug, formatted.
//           const formattedSlug =
//             slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ");
//           setCategoryName(formattedSlug);
//         }
//       } else {
//         // No products found, but we can still show a formatted slug
//         const formattedSlug =
//           slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ");
//         setCategoryName(formattedSlug);
//       }
//     } catch (err) {
//       setError("Failed to load products. Please try again.");
//       setProducts([]);
//       // On error, still try to set a formatted slug as a title
//       const formattedSlug =
//         slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ");
//       setCategoryName(formattedSlug);
//     } finally {
//       setLoading(false);
//     }
//   }, [slug]);

//   useEffect(() => {
//     fetchProductsByCategory();
//   }, [fetchProductsByCategory]);

//   if (loading) {
//     return (
//       <div className="text-center py-20 text-xl font-medium text-indigo-600">
//         Loading products...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center py-20 text-red-600 bg-red-50 p-6 m-4 rounded-lg border border-red-300">
//         {error}
//       </div>
//     );
//   }

//   // Use the state variable for the title, defaulting to a generic message if all else fails
//   const displayTitle = categoryName || "Products";

//   return (
//     <div className="bg-white min-h-screen">
//       <Navbar />

//       <div className="mt-25 w-full px-4 sm:px-6 lg:px-10 py-10 ">
//         <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-12 ">
//           {displayTitle}
//         </h2>

//         <div
//           className="
//       grid
//       grid-cols-2
//       sm:grid-cols-3
//       md:grid-cols-4
//       lg:grid-cols-6
//       gap-x-6
//       gap-y-20
//     "
//         >
//           {products.map((product) => (
//             <ProductCard key={product._id} product={product} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoryProductsPage;

// import React, { useEffect, useState, useCallback } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";
// import Navbar from "../components/Navbar";

// const BACKEND_BASE_URL = "http://192.168.29.217:5000";

// // PRODUCT CARD (IMPROVED ZOOM EFFECT & NO WHITE OVERLAY)
// const ProductCard = ({ product }) => {
//   const name = product?.name || "Product Name Missing";
//   const price = product?.price ? `₹${product.price}` : "Price N/A";

//   const imageUrl = product?.image
//     ? product.image.startsWith("http")
//       ? product.image
//       : `${BACKEND_BASE_URL}/${product.image}`
//     : "https://placehold.co/500x500?text=No+Image";

//   const productLink = `/products/${product?._id || "unknown"}`;

//   return (
//     //  UPDATED: Adjusted scale, added shadow for better effect
//     <div
//       key={product._id}
//       className="group relative
//                  transition-all duration-300 ease-in-out
//                  hover:scale-108 hover:shadow-xl rounded-md overflow-hidden" // Added rounded-md and overflow-hidden for shadow/zoom boundary
//     >
//       <img
//         alt={name}
//         src={imageUrl}
//         // ✨ REMOVED: group-hover:opacity-75 to prevent white overlay
//         className="aspect-square w-full rounded-md bg-gray-200 object-cover lg:aspect-auto lg:h-80"
//         onError={(e) => {
//           e.target.src = "https://placehold.co/500x500?text=Image+Error";
//         }}
//       />

//       <div className="mt-4 flex justify-between p-2"> {/* Added p-2 for some padding */}
//         <div>
//           <h3 className="text-sm text-gray-700">
//             <Link to={productLink}>
//               <span aria-hidden="true" className="absolute inset-0" />
//               {name}
//             </Link>
//           </h3>
//         </div>

//         <p className="text-sm font-medium text-gray-900">{price}</p>
//       </div>
//     </div>
//   );
// };

// // The rest of your CategoryProductsPage component remains unchanged
// const CategoryProductsPage = () => {
//   const { slug } = useParams();

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [categoryName, setCategoryName] = useState("");

//   const fetchProductsByCategory = useCallback(async () => {
//     if (!slug) return;

//     setLoading(true);
//     setError(null);
//     setCategoryName("");

//     try {
//       const res = await axios.get(
//         `${BACKEND_BASE_URL}/api/user/shop/categories/${slug}`
//       );

//       const fetchedProducts = res.data.getProducts || [];
//       setProducts(fetchedProducts);

//       if (fetchedProducts.length > 0) {
//         const nameFromProduct =
//           fetchedProducts[0].category?.name || fetchedProducts[0].categoryName;

//         if (nameFromProduct) {
//           setCategoryName(nameFromProduct);
//         } else {
//           const formattedSlug =
//             slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ");
//           setCategoryName(formattedSlug);
//         }
//       } else {
//         const formattedSlug =
//           slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ");
//         setCategoryName(formattedSlug);
//       }
//     } catch (err) {
//       setError("Failed to load products. Please try again.");
//       setProducts([]);
//       const formattedSlug =
//         slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ");
//       setCategoryName(formattedSlug);
//     } finally {
//       setLoading(false);
//     }
//   }, [slug]);

//   useEffect(() => {
//     fetchProductsByCategory();
//   }, [fetchProductsByCategory]);

//   if (loading) {
//     return (
//       <div className="text-center py-20 text-xl font-medium text-indigo-600">
//         Loading products...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center py-20 text-red-600 bg-red-50 p-6 m-4 rounded-lg border border-red-300">
//         {error}
//       </div>
//     );
//   }

//   const displayTitle = categoryName || "Products";

//   return (
//     <div className="bg-white min-h-screen">
//       <Navbar />

//       <div className="mt-30 w-full px-4 sm:px-6 lg:px-10 py-10">
//         <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-12 ml-15">
//           {displayTitle}
//         </h2>

//         <div className="flex justify-center">
//           <div
//             className="
//               grid
//               grid-cols-2
//               sm:grid-cols-3
//               md:grid-cols-4
//               lg:grid-cols-5
//               gap-x-6
//               gap-y-20
//             "
//           >
//             {products.map((product) => (
//               <ProductCard key={product._id} product={product} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoryProductsPage;

//updated code

// You can replace your existing ProductCard with this or merge changes.
// Example path: src/components/ProductCard.jsx

// src/pages/CategoryProductsPage.jsx  with wishlist working codeeeeeeeeeeeeeeeeeeeeeeeeeeeeee

// import React, { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import Navbar from "../components/Navbar";
// // 1. Import the new, shared ProductCard component
// import ProductCard from "../cart/ProductCard";
// import { useAuth } from "../context/AuthContext";
// import { useCart } from "../context/CartContext"; // if exists
// import { useParams, useNavigate } from "react-router-dom";

// const BACKEND_BASE_URL = "http://192.168.29.217:5000";

// // 2. The local ProductCard definition is removed from this file.

// const CategoryProductsPage = () => {
//   const { slug } = useParams();

//   const { user, logout } = useAuth();
//   const { cartItems } = useCart();
//   const navigate = useNavigate();

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [categoryName, setCategoryName] = useState("");

//   const fetchProductsByCategory = useCallback(async () => {
//     if (!slug) return;

//     setLoading(true);
//     setError(null);

//     try {
//       // Assuming the backend endpoint for products by category is correct
//       const res = await axios.get(
//         `${BACKEND_BASE_URL}/api/user/shop/categories/${slug}`
//       );

//       const fetchedProducts = res.data.getProducts || [];
//       setProducts(fetchedProducts);

//       if (fetchedProducts.length > 0) {
//         const nameFromProduct =
//           fetchedProducts[0].category?.name || fetchedProducts[0].categoryName;

//         if (nameFromProduct) {
//           setCategoryName(nameFromProduct);
//         } else {
//           const formattedSlug =
//             slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ");
//           setCategoryName(formattedSlug);
//         }
//       } else {
//         const formattedSlug =
//           slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ");
//         setCategoryName(formattedSlug);
//       }
//     } catch (err) {
//       setError("Failed to load products. Please try again.");
//       setProducts([]);
//       const formattedSlug =
//         slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ");
//       setCategoryName(formattedSlug);
//     } finally {
//       setLoading(false);
//     }
//   }, [slug]);

//   useEffect(() => {
//     fetchProductsByCategory();
//   }, [fetchProductsByCategory]);

//   if (loading) {
//     return (
//       <div className="text-center py-20 text-xl font-medium text-indigo-600">
//         Loading products...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center py-20 text-red-600 bg-red-50 p-6 m-4 rounded-lg border border-red-300">
//         {error}
//       </div>
//     );
//   }

//   const displayTitle = categoryName || "Products";

//   return (
//     <div className="bg-white min-h-screen">
//       {/* Navbar is included and will use the WishlistContext for the count badge */}

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

//       {/* Adjusted mt-30 to a standard Tailwind class or margin */}
//       <div className="pt-24 w-full px-4 sm:px-6 lg:px-10 mt-10 flex flex-col min-h-[calc(100vh-6rem)]">

//         {products.length > 0 && (
//           <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-12 text-left">
//             {displayTitle}
//           </h2>
//         )}

//        {products.length === 0 && (
//   <div className="flex items-center justify-center h-[calc(100vh-96px)] text-gray-500 text-lg font-medium">
//     No products available in this category.
//   </div>
// )}

//         {products.length > 0 && (
//           <div className="w-full">
//             <div
//               className="
//         grid
//         grid-cols-2
//         sm:grid-cols-3
//         md:grid-cols-4
//         lg:grid-cols-6
//         gap-x-6
//         gap-y-20
//       "
//             >
//               {products.map((product) => (
//                 <ProductCard key={product._id} product={product} />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CategoryProductsPage;

// updated with new uiiiiiiiiiiiiii and workingggggggggggggggggggggggggg

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ProductCard from "../cart/ProductCard";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext"; // if exists
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast, Slide } from "react-toastify";
import { BeatLoader } from "react-spinners";
import FashionposterCopy from "../assets/FashionposterCopy.jpg";

const BACKEND_BASE_URL = "http://192.168.29.217:5000";

const CategoryProductsPage = () => {
  const { slug } = useParams();
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [sortType, setSortType] = useState("newest");

  const fetchProductsByCategory = useCallback(async () => {
    if (!slug) return;

    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(
        `${BACKEND_BASE_URL}/api/user/shop/categories/${slug}?sort=${sortType}`
      );

      const fetchedProducts = res.data.getProducts || [];
      setProducts(fetchedProducts);

      if (fetchedProducts.length > 0) {
        const nameFromProduct =
          fetchedProducts[0].category?.name || fetchedProducts[0].categoryName;

        setCategoryName(
          nameFromProduct ||
            slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ")
        );
      } else {
        setCategoryName(
          slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ")
        );
      }
    } catch (err) {
      setError("Failed to load products. Please try again.");
      setProducts([]);
      setCategoryName(
        slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ")
      );
    } finally {
      setLoading(false);
    }
  }, [slug, sortType]); //  FIXED

  useEffect(() => {
    fetchProductsByCategory();
  }, [fetchProductsByCategory]);

  if (loading) {
    return (
      <div className="w-full h-[60vh] flex justify-center items-center">
        <BeatLoader color="#4f8a4c" size={15} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-400  p-6 m-4  ">{error}</div>
    );
  }

  const displayTitle = categoryName || "Products";

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar is included and will use the WishlistContext for the count badge */}
      <Navbar
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
      />
{/* 
       <div className="w-full flex justify-center pt-35">
        <img
          src={FashionposterCopy}
          alt="Fashion Poster"
          className="
      w-full
      max-w-7xl      
      rounded-lg      
      object-cover
    "
          style={{
            height: "420px"
          }}
        />
      </div>  */}

      {/* Main content area: Uses full available width, but kept padding */}

      <main className="px-4 sm:px-6 lg:px-8 pt-24 min-h-[calc(100vh-6rem)]">
        {products.length > 0 && (
          <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-3  border-gray-300 pt-10">
            {displayTitle}
          </h1>
        )}

        {/* Sort Dropdown/Toolbar */}
        {products.length > 0 && (
          <div className="flex justify-end  mb-7">
            <select
              className="p-2 border border-gray-300 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-300"
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="newest">Sort by: Newest</option>
              <option value="price-asc">Sort by: Price: Low to High</option>
              <option value="price-desc">Sort by: Price: High to Low</option>
              <option value="best">Sort by: Best Selling</option>
            </select>
          </div>
        )}

        {products.length === 0 && (
          <div className="flex items-center justify-center h-[calc(100vh-96px)] text-gray-500 text-lg font-medium">
            No products available in this category.
          </div>
        )}

        {products.length > 0 && (
          <div className="w-full ">
            {/* Increased columns to 5 on large screens and 6 on extra large screens to reduce card size and display more products */}
            <div
              className="
                grid
                grid-cols-2
                sm:grid-cols-3
                md:grid-cols-4
                lg:grid-cols-5 
                xl:grid-cols-6 
                gap-x-6 gap-y-20
              "
            >
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        )}


      

      </main>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}
      />
    </div>
  );
};

export default CategoryProductsPage;

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


