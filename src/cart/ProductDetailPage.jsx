// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// // IMPORTANT: Define the base URL for your backend
// const BACKEND_BASE_URL = "http://192.168.29.217:5000"; //  VERIFY YOUR IP ADDRESS!

// const ProductDetailPage = () => {
//     // 1. Get the dynamic part of the URL (the productId)
//     const { productId } = useParams();
    
//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [quantity, setQuantity] = useState(1); // State for Add to Cart quantity

//     useEffect(() => {
//         const fetchProduct = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 // 2. Call the API to fetch the single product
//                 const res = await axios.get(
//                     `${BACKEND_BASE_URL}/api/product/${productId}` //  Ensure your backend has this endpoint!
//                 );
                
//                 // Assuming your API returns the product in res.data.product or just res.data
//                 setProduct(res.data.product || res.data); 
//             } catch (err) {
//                 console.error("Error fetching single product:", err);
//                 setError("Could not load product details. Please check the network and API endpoint.");
//                 setProduct(null);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProduct();
//     }, [productId]); // Dependency array ensures fetch runs when the ID changes

//     // Dummy function for Add to Cart (you'll implement the actual logic later)
//     const handleAddToCart = () => {
//         console.log(`Adding ${quantity} of product ${product.name} to cart.`);
//         // FUTURE: Add logic to update Cart context/state or send to backend
//     };

//     // --- Render Loading/Error States ---
//     if (loading) return <div className="text-center py-20 text-xl font-medium">Loading Product Details...</div>;
//     if (error) return <div className="text-center py-20 text-red-600"> {error}</div>;
//     if (!product) return <div className="text-center py-20 text-gray-700">Product details are unavailable.</div>;

//     // --- Main Component Render ---
//     return (
//         <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
//             <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                
//                 {/* Product Image Section */}
//                 <div className="flex flex-col-reverse">
//                     <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
//                         <img
//                             src={`${BACKEND_BASE_URL}/${product.image}`}
//                             alt={product.name}
//                             className="h-full w-full object-cover object-center"
//                         />
//                     </div>
//                 </div>

//                 {/* Product Info Section */}
//                 <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
//                     <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>
                    
//                     <div className="mt-3">
//                         <h2 className="sr-only">Product information</h2>
//                         <p className="text-3xl text-green-600">${product.price.toFixed(2)}</p>
//                     </div>

//                     <div className="mt-6">
//                         <h3 className="sr-only">Description</h3>
//                         <div className="space-y-6 text-base text-gray-700">
//                             <p>{product.description || "No description provided."}</p>
//                         </div>
//                     </div>
                    
//                     <div className="mt-4 border-t border-gray-200 pt-4">
//                         <p className="text-sm text-gray-500">
//                             **Brand:** {product.brand || 'N/A'}
//                         </p>
//                         <p className="text-sm text-gray-500">
//                             **In Stock:** {product.countInStock > 0 ? `${product.countInStock} items` : 'Out of Stock'}
//                         </p>
//                     </div>


//                     <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
//                         {/* Quantity Selector */}
//                         <div className="flex items-center space-x-2">
//                             <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
//                                 Qty:
//                             </label>
//                             <input
//                                 id="quantity"
//                                 type="number"
//                                 min="1"
//                                 max={product.countInStock}
//                                 value={quantity}
//                                 onChange={(e) => setQuantity(Math.max(1, Math.min(product.countInStock, Number(e.target.value))))}
//                                 className="w-16 border border-gray-300 rounded-md shadow-sm text-center focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                 disabled={product.countInStock === 0}
//                             />
//                         </div>

//                         {/* Add to Cart Button */}
//                         <button
//                             type="button"
//                             onClick={handleAddToCart}
//                             disabled={product.countInStock === 0}
//                             className={`flex-1 w-full py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
//                                 product.countInStock > 0 
//                                     ? 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' 
//                                     : 'bg-gray-400 cursor-not-allowed'
//                             }`}
//                         >
//                             {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
//                         </button>
//                     </div>

//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductDetailPage;




// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { CheckCircleIcon, CheckIcon, QuestionMarkCircleIcon, StarIcon } from '@heroicons/react/20/solid'
// import { ShieldCheckIcon } from '@heroicons/react/24/outline'
// import { useCart } from '../context/CartContext';

// // IMPORTANT: Define the base URL for your backend
// const BACKEND_BASE_URL = "http://192.168.29.217:5000"; // VERIFY YOUR IP ADDRESS!

// // Dummy reviews data (since your backend probably won't return this yet)
// const DUMMY_REVIEWS = { average: 4, totalCount: 1624 };

// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ')
// }

// // ----------------------------------------------------
// // PRODUCT DETAIL PAGE COMPONENT
// // ----------------------------------------------------
// export default function ProductDetailPage() {
//     // 1. Get the dynamic part of the URL (the productId)
//     const { categorySlug } = useParams();

//     // 2. State for dynamic product data
//     const [products, setProducts] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [selectedSize, setSelectedSize] = useState(null); // To handle the size selection

//     // 3. Data Fetching Effect
//     useEffect(() => {
//         const fetchProduct = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 // Call the API to fetch the single product
//                 const res = await axios.get(
//                     `${BACKEND_BASE_URL}/api/user/shop/products-by-category/${categorySlug}`
//                 );

//                 // Assuming your API returns the product in res.data.product or just res.data
//                 const fetchedProduct = res.data.getProducts || res.data;
//                 setProducts(fetchedProduct);
                
//                 // Initialize selected size if sizes are available
//                 if (fetchedProduct.sizes && fetchedProduct.sizes.length > 0) {
//                     setSelectedSize(fetchedProduct.sizes[0].name);
//                 }

//             } catch (err) {
//                 console.error("Error fetching single product:", err);
//                 setError(`Could not load products for category "${categorySlug}". Please check the API.`)
//                 setProducts(null);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (categorySlug) {
//             fetchProduct();
//         }
//     }, [categorySlug]);

//     // 4. Handle Add to Cart (Dummy implementation)
//     const handleAddToCart = (e) => {
//         e.preventDefault();
//         if (products.countInStock === 0) {
//             alert("This product is out of stock.");
//             return;
//         }
//         if (products.sizes && !selectedSize) {
//              alert("Please select a size before adding to cart.");
//              return;
//         }

//         console.log(`Adding ${products.name} (Size: ${selectedSize || 'N/A'}) to cart.`);
//         alert(`Added ${products.name} to cart!`);
//         // FUTURE: Implement actual cart logic (context/Redux/API call)
//     };

//     // --- Render Loading/Error States ---
//     if (loading) return <div className="text-center py-20 text-xl font-medium">Loading Product Details...</div>;
//     if (error) return <div className="text-center py-20 text-red-600"> {error}</div>;
//     if (!product) return <div className="text-center py-20 text-gray-700">Product details are unavailable.</div>;
    
//     // Derived properties for UI (Use fallback values)
//     const isInStock = products.countInStock > 0;
//     const productImageSrc = products.image ? `${BACKEND_BASE_URL}/${product.image}` : 'https://via.placeholder.com/500?text=No+Image';
//     const productPrice = products.price ? `$${product.price.toFixed(2)}` : 'Price Unavailable';
//     const productDescription = products.description || "No detailed description is available for this product.";
    
//     // --- Main Component Render (Using the fetched 'product' object) ---
//     return (
//         <div className="bg-white">
//             <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                
//                 {/* Product details */}
//                 <div className="lg:max-w-lg lg:self-end">
//                     <nav aria-label="Breadcrumb">
//                         {/*  NOTE: Breadcrumbs are hardcoded in your provided component. 
//                            In a real app, you would generate these using the product's category. */}
//                         <ol role="list" className="flex items-center space-x-2">
//                             {/* Assuming the product object contains a category property for the breadcrumb */}
//                             <li key={products._id}>
//                                 <div className="flex items-center text-sm">
//                                     <span className="font-medium text-gray-500">
//                                         {/* Display category name if available */}
//                                         {products.category?.name || 'Home'}
//                                     </span>
//                                     <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" className="ml-2 size-5 shrink-0 text-gray-300">
//                                         <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
//                                     </svg>
//                                 </div>
//                             </li>
//                             <li>
//                                 <div className="flex items-center text-sm">
//                                     <span className="font-medium text-gray-900">{products.name}</span>
//                                 </div>
//                             </li>
//                         </ol>
//                     </nav>

//                     <div className="mt-4">
//                         <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{products.name}</h1>
//                     </div>

//                     <section aria-labelledby="information-heading" className="mt-4">
//                         <h2 id="information-heading" className="sr-only">Product information</h2>

//                         <div className="flex items-center">
//                             {/* Dynamic Price */}
//                             <p className="text-lg text-gray-900 sm:text-xl">{productPrice}</p>

//                             <div className="ml-4 border-l border-gray-300 pl-4">
//                                 <h2 className="sr-only">Reviews</h2>
//                                 <div className="flex items-center">
//                                     <div>
//                                         <div className="flex items-center">
//                                             {[0, 1, 2, 3, 4].map((rating) => (
//                                                 <StarIcon
//                                                     key={rating}
//                                                     aria-hidden="true"
//                                                     className={classNames(
//                                                         DUMMY_REVIEWS.average > rating ? 'text-yellow-400' : 'text-gray-300',
//                                                         'size-5 shrink-0',
//                                                     )}
//                                                 />
//                                             ))}
//                                         </div>
//                                         <p className="sr-only">{DUMMY_REVIEWS.average} out of 5 stars</p>
//                                     </div>
//                                     <p className="ml-2 text-sm text-gray-500">{DUMMY_REVIEWS.totalCount} reviews</p>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="mt-4 space-y-6">
//                             {/* Dynamic Description */}
//                             <p className="text-base text-gray-500">{productDescription}</p>
//                         </div>

//                         <div className="mt-6 flex items-center">
//                             {/* Dynamic Stock Status */}
//                             {isInStock ? (
//                                 <>
//                                     <CheckIcon aria-hidden="true" className="size-5 shrink-0 text-green-500" />
//                                     <p className="ml-2 text-sm text-gray-500">In stock ({products.countInStock} available)</p>
//                                 </>
//                             ) : (
//                                 <p className="ml-2 text-sm text-red-500 font-medium">Out of stock</p>
//                             )}
//                         </div>
//                     </section>
//                 </div>

//                 {/* Product image */}
//                 <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
//                     {/* Dynamic Image Source */}
//                     <img 
//                         alt={products.name} 
//                         src={productImageSrc} 
//                         className="aspect-square w-full rounded-lg object-cover" 
//                     />
//                 </div>

//                 {/* Product form */}
//                 <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
//                     <section aria-labelledby="options-heading">
//                         <h2 id="options-heading" className="sr-only">Product options</h2>

//                         <form onSubmit={handleAddToCart}>
//                             <div className="sm:flex sm:justify-between">
//                                 {/* Size selector - uses product.sizes from fetched data */}
//                                 {products.sizes && products.sizes.length > 0 && (
//                                     <fieldset>
//                                         <legend className="block text-sm font-medium text-gray-700">Size</legend>
//                                         <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
//                                             {product.sizes.map((size) => (
//                                                 <label
//                                                     key={size.name}
//                                                     aria-label={size.name}
//                                                     aria-description={size.description}
//                                                     className={classNames(
//                                                         selectedSize === size.name 
//                                                             ? 'outline outline-2 -outline-offset-2 outline-indigo-600' 
//                                                             : 'border border-gray-300',
//                                                         'group relative flex rounded-lg bg-white p-4 cursor-pointer hover:border-indigo-600'
//                                                     )}
//                                                     onClick={() => setSelectedSize(size.name)}
//                                                 >
//                                                     <input
//                                                         type="radio"
//                                                         name="size"
//                                                         value={size.name}
//                                                         checked={selectedSize === size.name}
//                                                         readOnly // Use readOnly since state handles click
//                                                         className="absolute inset-0 appearance-none focus:outline-none"
//                                                     />
//                                                     <div className="flex-1">
//                                                         <span className="block text-base font-medium text-gray-900">{size.name}</span>
//                                                         <span className="mt-1 block text-sm text-gray-500">{size.description}</span>
//                                                     </div>
//                                                     {selectedSize === size.name && (
//                                                         <CheckCircleIcon aria-hidden="true" className="size-5 text-indigo-600" />
//                                                     )}
//                                                 </label>
//                                             ))}
//                                         </div>
//                                     </fieldset>
//                                 )}
//                                 {/* You can add the size guide link here if necessary */}
//                             </div>
                            
//                             {/* Add to Bag Button */}
//                             <div className="mt-10">
//                                 <button
//                                     type="submit"
//                                     disabled={!isInStock}
//                                     className={classNames(
//                                         isInStock 
//                                             ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500' 
//                                             : 'bg-gray-400 cursor-not-allowed',
//                                         "flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-white focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden"
//                                     )}
//                                 >
//                                     {isInStock ? 'Add to bag' : 'Out of Stock'}
//                                 </button>
//                             </div>
                            
//                             <div className="mt-6 text-center">
//                                 <a href="#" className="group inline-flex text-base font-medium">
//                                     <ShieldCheckIcon
//                                         aria-hidden="true"
//                                         className="mr-2 size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
//                                     />
//                                     <span className="text-gray-500 hover:text-gray-700">Lifetime Guarantee</span>
//                                 </a>
//                             </div>
//                         </form>
//                     </section>
//                 </div>
//             </div>
//         </div>
//     )
// }


// import React, { useEffect, useState } from 'react';
// // 💡 CHANGE: Import 'productId' instead of 'categorySlug'
// import { useParams } from 'react-router-dom'; 
// import axios from 'axios';
// import { CheckCircleIcon, CheckIcon, QuestionMarkCircleIcon, StarIcon } from '@heroicons/react/20/solid'
// import { ShieldCheckIcon } from '@heroicons/react/24/outline'
// import { useCart } from '../context/CartContext';

// // IMPORTANT: Define the base URL for your backend
// const BACKEND_BASE_URL = "http://192.168.29.217:5000";

// // Dummy reviews data (keeping it for UI rendering)
// const DUMMY_REVIEWS = { average: 4, totalCount: 1624 };

// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ')
// }

// // ----------------------------------------------------
// // PRODUCT DETAIL PAGE COMPONENT (FIXED)
// // ----------------------------------------------------
// export default function ProductDetailPage() {
//     // 1. 💡 CHANGE: Look for 'productId' in the URL params
//     const { productId } = useParams();

//     // 2. State for single product data (renamed from products to product for clarity)
//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [selectedSize, setSelectedSize] = useState(null);

//     // 💡 CART FIX (TEMPORARY): Check if useCart is defined before calling it
//     // The previous error images suggest useCart is causing an issue.
//     // If you need to use the cart context, you must ensure the export is correct.
//     // For now, let's keep it commented out to prevent crashing until you fix the export.
//     // const { addToCart } = useCart(); 

//     // 3. Data Fetching Effect
//     useEffect(() => {
//         const fetchProduct = async () => {
//             setLoading(true);
//             setError(null);
            
//             // 💡 CRITICAL CHANGE: Use productId and the new API endpoint
//             const API_URL = `${BACKEND_BASE_URL}/api/user/shop/product/${productId}`;

//             try {
//                 // Call the API to fetch the single product
//                 const res = await axios.get(API_URL);

//                 // Assuming your API returns the single product object directly: res.data
//                 const fetchedProduct = res.data; 
//                 setProduct(fetchedProduct);
                
//                 // Initialize selected size if sizes are available
//                 if (fetchedProduct.sizes && fetchedProduct.sizes.length > 0) {
//                     setSelectedSize(fetchedProduct.sizes[0].name);
//                 }

//             } catch (err) {
//                 console.error("Error fetching single product:", err);
//                 const status = err.response?.status;
                
//                 let errorMessage = `Could not load product ID "${productId}". Status: ${status || 'Network Error'}.`;
//                 if (status === 404) {
//                     errorMessage = `Product not found for ID: "${productId}". (Status 404)`;
//                 }

//                 setError(errorMessage);
//                 setProduct(null);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (productId) {
//             fetchProduct();
//         }
//     }, [productId]); // Dependent on the Product ID

//     // 4. Handle Add to Cart
//     const handleAddToCart = (e) => {
//         e.preventDefault();
//         if (!product) return;

//         if (product.countInStock === 0) {
//             alert("This product is out of stock.");
//             return;
//         }
//         if (product.sizes && !selectedSize) {
//              alert("Please select a size before adding to cart.");
//              return;
//         }

//         console.log(`Adding ${product.name} (Size: ${selectedSize || 'N/A'}) to cart.`);
//         alert(`Added ${product.name} to cart!`);
//         // FUTURE: addToCart({ ...product, size: selectedSize });
//     };

//     // --- Render Loading/Error States ---
//     if (loading) return <div className="text-center py-20 text-xl font-medium">Loading Product Details...</div>;
//     if (error) return <div className="text-center py-20 text-red-600"> {error}</div>;
//     // Check if the product is null after loading
//     if (!product) return <div className="text-center py-20 text-gray-700">Product details are unavailable.</div>;
    
//     // Derived properties for UI (Use the single 'product' object)
//     const isInStock = product.countInStock > 0;
//     const productImageSrc = product.image ? `${BACKEND_BASE_URL}/${product.image}` : 'https://via.placeholder.com/500?text=No+Image';
//     const productPrice = product.price ? `$${product.price.toFixed(2)}` : 'Price Unavailable';
//     const productDescription = product.description || "No detailed description is available for this product.";
    
//     // --- Main Component Render (Using the fetched 'product' object) ---
//     return (
//         <div className="bg-white">
//             {/* ... rest of the UI code using 'product' object ... */}
//             <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                
//                 {/* Product details */}
//                 <div className="lg:max-w-lg lg:self-end">
//                     <nav aria-label="Breadcrumb">
//                         <ol role="list" className="flex items-center space-x-2">
//                             {/* Breadcrumb using product.category.name */}
//                             <li key={product.category?._id || 'home'}>
//                                 <div className="flex items-center text-sm">
//                                     <span className="font-medium text-gray-500">
//                                         {/* Display category name if available */}
//                                         {product.category?.name || 'Home'}
//                                     </span>
//                                     <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" className="ml-2 size-5 shrink-0 text-gray-300">
//                                         <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
//                                     </svg>
//                                 </div>
//                             </li>
//                             <li>
//                                 <div className="flex items-center text-sm">
//                                     <span className="font-medium text-gray-900">{product.name}</span>
//                                 </div>
//                             </li>
//                         </ol>
//                     </nav>

//                     <div className="mt-4">
//                         <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{product.name}</h1>
//                     </div>

//                     <section aria-labelledby="information-heading" className="mt-4">
//                         <h2 id="information-heading" className="sr-only">Product information</h2>

//                         <div className="flex items-center">
//                             {/* Dynamic Price */}
//                             <p className="text-lg text-gray-900 sm:text-xl">{productPrice}</p>

//                             <div className="ml-4 border-l border-gray-300 pl-4">
//                                 <h2 className="sr-only">Reviews</h2>
//                                 <div className="flex items-center">
//                                     <div>
//                                         <div className="flex items-center">
//                                             {[0, 1, 2, 3, 4].map((rating) => (
//                                                 <StarIcon
//                                                     key={rating}
//                                                     aria-hidden="true"
//                                                     className={classNames(
//                                                         DUMMY_REVIEWS.average > rating ? 'text-yellow-400' : 'text-gray-300',
//                                                         'size-5 shrink-0',
//                                                     )}
//                                                 />
//                                             ))}
//                                         </div>
//                                         <p className="sr-only">{DUMMY_REVIEWS.average} out of 5 stars</p>
//                                     </div>
//                                     <p className="ml-2 text-sm text-gray-500">{DUMMY_REVIEWS.totalCount} reviews</p>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="mt-4 space-y-6">
//                             {/* Dynamic Description */}
//                             <p className="text-base text-gray-500">{productDescription}</p>
//                         </div>

//                         <div className="mt-6 flex items-center">
//                             {/* Dynamic Stock Status */}
//                             {isInStock ? (
//                                 <>
//                                     <CheckIcon aria-hidden="true" className="size-5 shrink-0 text-green-500" />
//                                     <p className="ml-2 text-sm text-gray-500">In stock ({product.countInStock} available)</p>
//                                 </>
//                             ) : (
//                                 <p className="ml-2 text-sm text-red-500 font-medium">Out of stock</p>
//                             )}
//                         </div>
//                     </section>
//                 </div>

//                 {/* Product image */}
//                 <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
//                     {/* Dynamic Image Source */}
//                     <img 
//                         alt={product.name} 
//                         src={productImageSrc} 
//                         className="aspect-square w-full rounded-lg object-cover" 
//                     />
//                 </div>

//                 {/* Product form */}
//                 <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
//                     <section aria-labelledby="options-heading">
//                         <h2 id="options-heading" className="sr-only">Product options</h2>

//                         <form onSubmit={handleAddToCart}>
//                             <div className="sm:flex sm:justify-between">
//                                 {/* Size selector - uses product.sizes from fetched data */}
//                                 {product.sizes && product.sizes.length > 0 && (
//                                     <fieldset>
//                                         <legend className="block text-sm font-medium text-gray-700">Size</legend>
//                                         <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
//                                             {product.sizes.map((size) => (
//                                                 <label
//                                                     key={size.name}
//                                                     aria-label={size.name}
//                                                     aria-description={size.description}
//                                                     className={classNames(
//                                                         selectedSize === size.name 
//                                                             ? 'outline outline-2 -outline-offset-2 outline-indigo-600' 
//                                                             : 'border border-gray-300',
//                                                         'group relative flex rounded-lg bg-white p-4 cursor-pointer hover:border-indigo-600'
//                                                     )}
//                                                     onClick={() => setSelectedSize(size.name)}
//                                                 >
//                                                     <input
//                                                         type="radio"
//                                                         name="size"
//                                                         value={size.name}
//                                                         checked={selectedSize === size.name}
//                                                         readOnly 
//                                                         className="absolute inset-0 appearance-none focus:outline-none"
//                                                     />
//                                                     <div className="flex-1">
//                                                         <span className="block text-base font-medium text-gray-900">{size.name}</span>
//                                                         <span className="mt-1 block text-sm text-gray-500">{size.description}</span>
//                                                     </div>
//                                                     {selectedSize === size.name && (
//                                                         <CheckCircleIcon aria-hidden="true" className="size-5 text-indigo-600" />
//                                                     )}
//                                                 </label>
//                                             ))}
//                                         </div>
//                                     </fieldset>
//                                 )}
//                             </div>
                            
//                             {/* Add to Bag Button */}
//                             <div className="mt-10">
//                                 <button
//                                     type="submit"
//                                     disabled={!isInStock}
//                                     className={classNames(
//                                         isInStock 
//                                             ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500' 
//                                             : 'bg-gray-400 cursor-not-allowed',
//                                         "flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-white focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden"
//                                     )}
//                                 >
//                                     {isInStock ? 'Add to bag' : 'Out of Stock'}
//                                 </button>
//                             </div>
                            
//                             <div className="mt-6 text-center">
//                                 <a href="#" className="group inline-flex text-base font-medium">
//                                     <ShieldCheckIcon
//                                         aria-hidden="true"
//                                         className="mr-2 size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
//                                     />
//                                     <span className="text-gray-500 hover:text-gray-700">Lifetime Guarantee</span>
//                                 </a>
//                             </div>
//                         </form>
//                     </section>
//                 </div>
//             </div>
//         </div>
//     )
// }


// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { StarIcon, CheckIcon, CheckCircleIcon } from "@heroicons/react/20/solid";
// import { ShieldCheckIcon } from "@heroicons/react/24/outline";
// import { domainUrl } from "../utils/constant";
// // import { useCart } from "../context/CartContext"; // Uncomment when ready



// // Dummy related products (Tailwind UI)
// const relatedProducts = [
//   {
//     id: 1,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc:
//       "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 2,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc:
//       "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg",
//     imageAlt: "Front of men's Basic Tee in white.",
//     price: "$35",
//     color: "Aspen White",
//   },
//   {
//     id: 3,
//     name: "Basic Tee",
//     href: "#",
//     imageSrc:
//       "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg",
//     imageAlt: "Front of men's Basic Tee in dark gray.",
//     price: "$35",
//     color: "Charcoal",
//   },
//   {
//     id: 4,
//     name: "Artwork Tee",
//     href: "#",
//     imageSrc:
//       "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-04.jpg",
//     imageAlt:
//       "Front of men's Artwork Tee in peach with white and brown dots forming an isometric cube.",
//     price: "$35",
//     color: "Iso Dots",
//   },
// ];

// const DUMMY_REVIEWS = { average: 4, totalCount: 1624 };

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function ProductDetailPage() {
//   const { productId } = useParams();
//   const [product, setProduct] = useState(null);
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   // const { addToCart } = useCart();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(
//           `${domainUrl}/user/shop/product/${productId}`
//         );
//         const fetchedProduct = res.data.product;
//         setProduct(fetchedProduct);

//         if (fetchedProduct.sizes?.length > 0) {
//           setSelectedSize(fetchedProduct.sizes[0].name);
//         }
//       } catch (err) {
//         const status = err.response?.status;
//         let msg = `Error loading product: ${status || "Network Error"}`;
//         if (status === 404)
//           msg = `Product not found for ID: "${productId}". (Status 404)`;
//         setError(msg);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (productId) fetchProduct();
//   }, [productId]);

//   const handleAddToCart = (e) => {
//     e.preventDefault();
//     if (!product) return;
//     if (product.countInStock === 0)
//       return alert("This product is out of stock.");
//     if (product.sizes && !selectedSize)
//       return alert("Please select a size before adding to cart.");
//     alert(`Added ${product.name} to cart!`);
//   };

//   if (loading)
//     return (
//       <div className="text-center py-20 text-lg text-gray-700">
//         Loading Product Details...
//       </div>
//     );
//   if (error)
//     return <div className="text-center py-20 text-red-600">{error}</div>;
//   if (!product)
//     return (
//       <div className="text-center py-20 text-gray-600">
//         Product details unavailable.
//       </div>
//     );

//   const productImageSrc = product.image
//     ? product.image
//     : "https://via.placeholder.com/500?text=No+Image";


//     console.log(productImageSrc);
    
//   const productPrice = product.price
//     ? `$${product.price.toFixed(2)}`
//     : "Price Unavailable";
//   const isInStock = product.countInStock > 0;

//   return (
//     <div className="bg-white">
//       {/* Product Info */}
//       <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-10 px-6 py-16">
//         {/* Left: Product Details */}
//         <div className="flex flex-col justify-between">
//           <div>
//             <h1 className="text-3xl font-bold tracking-tight text-gray-900">
//               {product.name}
//             </h1>

//             <div className="mt-2 flex items-center space-x-4">
//               <p className="text-lg text-gray-900">{productPrice}</p>
//               <div className="flex items-center text-yellow-400">
//                 {[...Array(5)].map((_, i) => (
//                   <StarIcon
//                     key={i}
//                     className={classNames(
//                       i < DUMMY_REVIEWS.average
//                         ? "text-yellow-400"
//                         : "text-gray-300",
//                       "w-5 h-5"
//                     )}
//                   />
//                 ))}
//               </div>
             
//             </div>

//             <p className="mt-6 text-gray-700 leading-relaxed">
//               {product.description ||
//                 "No detailed description is available for this product."}
//             </p>

//             <div className="mt-4 flex items-center">
//               {isInStock ? (
//                 <>
//                   <CheckIcon className="h-5 w-5 text-green-600" />
//                   <p className="ml-2 text-sm text-gray-600">
//                     In stock ({product.countInStock})
//                   </p>
//                 </>
//               ) : (
//                 <p className="text-sm text-red-600 font-medium">
//                   Out of stock
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* Size and Add to Cart */}
//           <form onSubmit={handleAddToCart} className="mt-10">
//             {product.sizes?.length > 0 && (
//               <fieldset>
//                 <legend className="text-sm font-medium text-gray-700">
//                   Choose Size
//                 </legend>
//                 <div className="mt-3 grid grid-cols-2 gap-3">
//                   {product.sizes.map((size) => (
//                     <label
//                       key={size.name}
//                       className={classNames(
//                         selectedSize === size.name
//                           ? "border-indigo-600 ring-2 ring-indigo-600"
//                           : "border-gray-300 hover:border-indigo-400",
//                         "border rounded-lg p-3 text-center cursor-pointer"
//                       )}
//                       onClick={() => setSelectedSize(size.name)}
//                     >
//                       <input
//                         type="radio"
//                         name="size"
//                         value={size.name}
//                         checked={selectedSize === size.name}
//                         readOnly
//                         className="hidden"
//                       />
//                       {size.name}
//                     </label>
//                   ))}
//                 </div>
//               </fieldset>
//             )}

//             <button
//               type="submit"
//               disabled={!isInStock}
//               className={classNames(
//                 isInStock
//                   ? "bg-indigo-600 hover:bg-indigo-700"
//                   : "bg-gray-400 cursor-not-allowed",
//                 "mt-6 w-full rounded-md px-8 py-3 text-white font-medium"
//               )}
//             >
//               {isInStock ? "Add to Bag" : "Out of Stock"}
//             </button>

//             <div className="mt-4 text-center text-sm text-gray-500">
//               <ShieldCheckIcon className="inline h-5 w-5 mr-1 text-gray-400" />
//               Lifetime Guarantee
//             </div>
//           </form>
//         </div>

//         {/* Right: Product Image */}
//         <div>
//           <img
//             src={productImageSrc}
//             alt={product.name}
//             className="w-full h-[500px] object-cover rounded-lg shadow"
//           />
//         </div>
//       </div>

      {/* Related Products*/}
      {/* <div className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">
          Customers also purchased
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.map((p) => (
            <div key={p.id} className="group relative">
              <img
                src={p.imageSrc}
                alt={p.imageAlt}
                className="w-full h-80 object-cover rounded-md bg-gray-100 group-hover:opacity-75"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={p.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {p.name}
                    </a>
                  </h3>
                  <p className="text-sm text-gray-500">{p.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{p.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div> */}
//     </div>
//   );
// } 


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { StarIcon, CheckIcon } from "@heroicons/react/20/solid";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { domainUrl } from "../utils/constant";
// import { useCart } from "../context/CartContext"; // ⬅ UNUSED: We are using a backend cart

// Dummy related products (Tailwind UI) - KEPT FOR UI COMPLETENESS
const relatedProducts = [
  // ... (relatedProducts array remains the same) ...
];

const DUMMY_REVIEWS = { average: 4, totalCount: 1624 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate(); // Hook to redirect users
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdding, setIsAdding] = useState(false); // New state for button loading

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // NOTE: The endpoint assumes domainUrl is the base URL
        const res = await axios.get(
          `${domainUrl}/user/shop/product/${productId}`
        );
        const fetchedProduct = res.data.product;
        setProduct(fetchedProduct);
        console.log(fetchedProduct);
        

        if (fetchedProduct.sizes?.length > 0) {
          setSelectedSize(fetchedProduct.sizes[0].name);
        }
      } catch (err) {
        const status = err.response?.status;
        let msg = `Error loading product: ${status || "Network Error"}`;
        if (status === 404)
          msg = `Product not found for ID: "${productId}". (Status 404)`;
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    if (productId) fetchProduct();
  }, [productId]);

  // ⬅️ UPDATED: Now performs the actual API call to add the product to the cart
  const handleAddToCart = async (e) => {
    e.preventDefault();
    
    // Frontend validation
    if (!product || isAdding || product.countInStock === 0) return;
    if (product.sizes && !selectedSize)
      return alert("Please select a size before adding to bag.");
    
    setIsAdding(true);

    try {
      const token = localStorage.getItem("token");
      const cartData = {
        productId: product._id,
        quantity: 1, // Start with 1. If you track size in backend, uncomment below:
        // size: selectedSize
      };


      
      //  IMPORTANT: Update this URL if your backend route is different
      const ADD_CART_URL = `${domainUrl}/cart/add`; 

      const response = await axios.post(
        ADD_CART_URL,
        cartData,
         {
                    headers: {
                        // "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                } // Required if your authentication uses cookies/sessions
      );

     console.log(response.data)
      
      // Navigate user to the cart page after successful addition
      navigate('/cart'); 

    } catch (err) {
      console.log("Error adding to cart:", err.response?.data || err.message);
      // Display a friendly error message to the user
     
    } finally {
      setIsAdding(false);
    }
  };

  if (loading)
    return (
      <div className="text-center py-20 text-lg text-gray-700">
        Loading Product Details...
      </div>
    );
  if (error)
    return <div className="text-center py-20 text-red-600">{error}</div>;
  if (!product)
    return (
      <div className="text-center py-20 text-gray-600">
        Product details unavailable.
      </div>
    );

  const productImageSrc = product.image
    ? product.image // Added domainUrl for images
    : "https://via.placeholder.com/500?text=No+Image";
    
  const productPrice = product.price
    ? `$${product.price.toFixed(2)}`
    : "Price Unavailable";
  const isInStock =true;
  // const isInStock = product.countInStock > 0;

  return (
    <div className="bg-white">
      {/* Product Info */}
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-10 px-6 py-16">
        {/* Left: Product Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {product.name}
            </h1>

            <div className="mt-2 flex items-center space-x-4">
              <p className="text-lg text-gray-900">{productPrice}</p>
              {/* Dummy Reviews */}
              <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={classNames(
                      i < DUMMY_REVIEWS.average
                        ? "text-yellow-400"
                        : "text-gray-300",
                      "w-5 h-5"
                    )}
                  />
                ))}
              </div>
            </div>

            <p className="mt-6 text-gray-700 leading-relaxed">
              {product.description ||
                "No detailed description is available for this product."}
            </p>

            <div className="mt-4 flex items-center">
              {isInStock ? (
                <>
                  <CheckIcon className="h-5 w-5 text-green-600" />
                  <p className="ml-2 text-sm text-gray-600">
                    In stock ({product.countInStock})
                  </p>
                </>
              ) : (
                <p className="text-sm text-red-600 font-medium">
                  Out of stock
                </p>
              )}
            </div>
          </div>

          {/* Size and Add to Cart */}
          <form onSubmit={handleAddToCart} className="mt-10">
            {product.sizes?.length > 0 && (
              <fieldset>
                <legend className="text-sm font-medium text-gray-700">
                  Choose Size
                </legend>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {product.sizes.map((size) => (
                    <label
                      key={size.name}
                      className={classNames(
                        selectedSize === size.name
                          ? "border-indigo-600 ring-2 ring-indigo-600"
                          : "border-gray-300 hover:border-indigo-400",
                        "border rounded-lg p-3 text-center cursor-pointer"
                      )}
                      onClick={() => setSelectedSize(size.name)}
                    >
                      <input
                        type="radio"
                        name="size"
                        value={size.name}
                        checked={selectedSize === size.name}
                        readOnly
                        className="hidden"
                      />
                      {size.name}
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            <button
              type="submit"
              disabled={!isInStock || isAdding}
              className={classNames(
                isInStock && !isAdding
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-gray-400 cursor-not-allowed",
                "mt-6 w-full rounded-md px-8 py-3 text-white font-medium"
              )}
            >
              {isAdding ? "Adding to Bag..." : (isInStock ? "Add to Bag" : "Out of Stock")}
            </button>

            <div className="mt-4 text-center text-sm text-gray-500">
              <ShieldCheckIcon className="inline h-5 w-5 mr-1 text-gray-400" />
              Lifetime Guarantee
            </div>
          </form>
        </div>

        {/* Right: Product Image */}
        <div>
          <img
            src={productImageSrc}
            alt={product.name}
            className="w-full h-[500px] object-cover rounded-lg shadow"
          />
        </div>
      </div>
    </div>
  );
}




