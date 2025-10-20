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


import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

// IMPORTANT: Define the base URL for your backend
const BACKEND_BASE_URL = "http://192.168.29.217:5000"; 

// --- START: SELF-CONTAINED PRODUCT CARD COMPONENT ---
// This component is included here to prevent compilation errors and provide a complete visual output.
const ProductCard = ({ product }) => {
    // Fallback values in case the product data is incomplete
    const name = product?.name || "Product Name Missing";
    // Uses the fixed price formatting from previous discussion: $X.XX
    const price = product?.price ? `$${product.price.toFixed(2)}` : "Price N/A";
    const imageUrl = product?.image || "https://placehold.co/600x400/4c34a3/ffffff?text=Product";
    
    // Determine the link target (using product ID for demonstration)
    const productLink = `/products/${product?._id || 'unknown'}`;

    return (
        <div className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden lg:aspect-none group-hover:opacity-75 h-64">
                <img
                    src={imageUrl}
                    alt={`Image of ${name}`}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/e0e0e0/333333?text=Image+Error"; }}
                />
            </div>
            <div className="p-4 flex flex-col items-center text-center">
                <h3 className="text-lg font-medium text-gray-900">
                    <Link to={productLink} className="hover:text-indigo-600 transition">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {name}
                    </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-500">Category: {product?.category?.name || 'N/A'}</p>
                <p className="text-xl font-bold text-indigo-600 mt-2">{price}</p>
            </div>
        </div>
    );
};
// --- END: SELF-CONTAINED PRODUCT CARD COMPONENT ---


const CategoryProductsPage = () => {
    // Retrieves the slug (e.g., 'shirts') from the URL: /category/shirts
    const { slug } = useParams();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Memoized function for fetching data
    const fetchProductsByCategory = useCallback(async () => {
        if (!slug) return;

        setLoading(true);
        setError(null);
        

        console.log('!!!!!!!!!!',slug);
        
        // API URL uses the slug, which is handled correctly by the backend controller
        const API_URL = `${BACKEND_BASE_URL}/api/user/shop/categories/${slug}`; 

        try {
            const res = await axios.get(API_URL);
            
            // Accesses the 'getProducts' key from the backend response
            setProducts(res.data.getProducts || []); 
            
        } catch (err) {
            console.error(`Error fetching products for slug "${slug}":`, err);
            
            const status = err.response?.status;
            let errorMessage = `Could not load products. Status: ${status || 'Network Error'}.`;

            if (status === 404) {
                errorMessage = `Category "${slug}" not found on the server. (Status 404)`;
            } else if (status === 500) {
                 errorMessage = "Server error (Status 500). Please check backend logs for Mongoose/database errors.";
            } 
            
            setError(errorMessage);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, [slug]);

    useEffect(() => {
        fetchProductsByCategory();
    }, [fetchProductsByCategory]);

    if (loading) {
        return <div className="text-center py-20 text-xl font-medium text-indigo-600">Loading products in {slug}...</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-red-600 bg-red-50 p-6 m-4 rounded-lg border border-red-300">{error}</div>;
    }
    
    // Capitalize the slug for display title and replace hyphens
    const categoryTitle = slug ? slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ') : 'Category';

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-10 border-b-2 pb-3">
                    Collection
                </h1>

                {products.length === 0 ? (
                    <div className="text-center py-20 text-lg text-gray-500 bg-white p-10 rounded-xl shadow-lg border border-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto mb-4 text-indigo-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.5 2.108 8.43c-.588.666-1.354 1.054-2.193 1.076H7.47c-.84 0-1.606-.39-2.194-1.076l2.108-8.433m10.742 2.871-2.493-2.492m-2.492 2.492-2.493-2.492" />
                        </svg>
                        <h2 className="text-xl font-semibold text-gray-800">No Products Found</h2>
                        <p className="mt-2 text-sm">We couldn't find any products in the *{categoryTitle}* category.</p>
                        <p className="mt-1 text-sm text-gray-400">If this is unexpected, please check your backend models and data.</p>
                    </div>
                ) : (
                    // Product grid structure
                    <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryProductsPage;