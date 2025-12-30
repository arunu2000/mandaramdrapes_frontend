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

{
  /* Related Products*/
}
{
  /* <div className="mx-auto max-w-7xl px-6 py-16">
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
      </div> */
}
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { StarIcon, CheckIcon } from "@heroicons/react/20/solid";
// import { ShieldCheckIcon } from "@heroicons/react/24/outline";
// import { domainUrl } from "../utils/constant";
// import { useCart } from "../context/CartContext";
// import { ToastContainer, toast, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Dummy reviews (for stars)
// const DUMMY_REVIEWS = { average: 4, totalCount: 1624 };

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function ProductDetailPage() {
//   const { productId } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isAdding, setIsAdding] = useState(false);
//   const [isAlreadyAdded, setIsAlreadyAdded] = useState(false);

//   const { cartItems, fetchCart } = useCart();

//   // Fetch product data
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(`${domainUrl}/user/shop/product/${productId}`);
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

//   // Check if product already in cart
//   useEffect(() => {
//     if (cartItems) {
//       const filteredCartProduct = cartItems.some(
//         (item) => item.productId === productId
//       );
//       setIsAlreadyAdded(filteredCartProduct);
//     } else {
//       setIsAlreadyAdded(false);
//     }
//   }, [cartItems, productId]);

//   // Add to cart handler
//   const handleAddToCart = async (e) => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     e.preventDefault();

//     if (!product || isAdding || product.countInStock === 0) return;
//     if (product.sizes && !selectedSize) {
//       toast.warn("Please select a size.", { autoClose: 1500 });
//       return;
//     }

//     if (isAlreadyAdded) {
//       toast.info("Product is already in your cart. Redirecting...", {
//         position: "top-center",
//         autoClose: 1500,
//         icon: "🛒",
//         onClose: () => navigate("/cart"),
//       });
//       return;
//     }

//     setIsAdding(true);

//     try {
//       const cartData = {
//         productId: product._id,
//         quantity: 1,
//         ...(product.sizes && { selectedSize: selectedSize }),
//       };

//       const ADD_CART_URL = `${domainUrl}/cart/add`;

//       await axios.post(ADD_CART_URL, cartData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       toast.success(`${product.name} added to cart!`, {
//         position: "top-center",
//         autoClose: 1500,
//         icon: "🛍️",
//         onClose: () => {
//           fetchCart();
//           navigate("/cart");
//         },
//       });
//     } catch (err) {
//       console.log("Error adding to cart:", err.response?.data || err.message);

//       toast.error(err.response?.data?.message || "Failed to add product to cart.", {
//         position: "top-center",
//         autoClose: 3000,
//       });
//     } finally {
//       setIsAdding(false);
//     }
//   };

//   // Loading & error states
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

//   const productPrice = product.price
//     ? `$${product.price.toFixed(2)}`
//     : "Price Unavailable";

//   const isInStock = true;

//   // --- UI STARTS HERE ---
//   return (
//     <div className="bg-gray-50 min-h-screen py-12">
//       <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
//         {/* Left: Product Image */}
//         <div className="flex justify-center lg:justify-start">
//           <img
//             src={productImageSrc}
//             alt={product.name}
//             className="w-full max-w-md h-[500px] object-cover rounded-2xl shadow-lg border border-gray-200"
//           />
//         </div>

//         {/* Right: Product Details */}
//         <div className="flex flex-col justify-start">
//           {/* Product Title */}
//           <h1 className="text-3xl font-semibold text-gray-900 leading-tight">
//             {product.name}
//           </h1>

//           {/* Price and Rating */}
//           <div className="mt-4 flex items-center gap-4">
//             <p className="text-2xl font-bold text-indigo-600">{productPrice}</p>
//             <div className="flex items-center">
//               {[...Array(5)].map((_, i) => (
//                 <StarIcon
//                   key={i}
//                   className={classNames(
//                     i < DUMMY_REVIEWS.average
//                       ? "text-yellow-400"
//                       : "text-gray-300",
//                     "w-5 h-5"
//                   )}
//                 />
//               ))}
//               <span className="ml-2 text-sm text-gray-600">
//                 ({DUMMY_REVIEWS.totalCount})
//               </span>
//             </div>
//           </div>

//           {/* Divider */}
//           <div className="border-t border-gray-200 my-4"></div>

//           {/* Description */}
//           <p className="text-gray-700 leading-relaxed text-base">
//             {product.description ||
//               "No detailed description is available for this product."}
//           </p>

//           {/* Stock Info */}
//           <div className="mt-4 flex items-center">
//             {isInStock ? (
//               <>
//                 <CheckIcon className="h-5 w-5 text-green-600" />
//                 <p className="ml-2 text-sm text-gray-600">
//                   In stock ({product.countInStock})
//                 </p>
//               </>
//             ) : (
//               <p className="text-sm text-red-600 font-medium">Out of stock</p>
//             )}
//           </div>

//           {/* Choose Size */}
//           {product.sizes?.length > 0 && (
//             <fieldset className="mt-8">
//               <legend className="text-sm font-medium text-gray-800 mb-3">
//                 Choose Size
//               </legend>
//               <div className="grid grid-cols-3 gap-3">
//                 {product.sizes.map((size) => (
//                   <label
//                     key={size.name}
//                     className={classNames(
//                       selectedSize === size.name
//                         ? "border-indigo-600 ring-2 ring-indigo-500"
//                         : "border-gray-300 hover:border-indigo-400",
//                       "border rounded-md px-4 py-2 text-center cursor-pointer bg-white transition-all duration-150"
//                     )}
//                     onClick={() => setSelectedSize(size.name)}
//                   >
//                     <input
//                       type="radio"
//                       name="size"
//                       value={size.name}
//                       checked={selectedSize === size.name}
//                       readOnly
//                       className="sr-only"
//                     />
//                     {size.name}
//                   </label>
//                 ))}
//               </div>
//             </fieldset>
//           )}

//           {/* Add to Cart Button */}
//           <button
//             type="submit"
//             onClick={handleAddToCart}
//             disabled={!isInStock || isAdding}
//             className={classNames(
//               isInStock && !isAdding
//                 ? "bg-indigo-600 hover:bg-indigo-700"
//                 : "bg-gray-400 cursor-not-allowed",
//               "mt-8 w-full lg:w-1/2 rounded-lg px-6 py-3 text-white font-medium shadow-md transition duration-200 ease-in-out"
//             )}
//           >
//             {isAdding
//               ? "Adding..."
//               : isInStock
//               ? isAlreadyAdded
//                 ? "Go to Cart"
//                 : "Add to Cart"
//               : "Out of Stock"}
//           </button>

//           <div className="mt-5 text-sm text-gray-500 flex items-center">
//             <ShieldCheckIcon className="h-5 w-5 mr-1 text-gray-400" />
//             Lifetime Guarantee
//           </div>
//         </div>

//         <ToastContainer
//           position="top-center"
//           autoClose={2000}
//           hideProgressBar={false}
//           closeOnClick
//           pauseOnHover
//           draggable
//           theme="colored"
//           transition={Slide}
//         />
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { StarIcon, CheckIcon } from "@heroicons/react/20/solid";
// import { ShieldCheckIcon, TruckIcon } from "@heroicons/react/24/outline";
// import { domainUrl } from "../utils/constant";
// import { useCart } from "../context/CartContext";
// import { ToastContainer, toast, Slide } from "react-toastify";
// // FIX APPLIED: Corrected the import path for the CSS
// import "react-toastify/dist/ReactToastify.css";

// // --- DUMMY DATA ---
// const DUMMY_REVIEWS = { average: 4, totalCount: 1624 };
// const deliveryInfo = "Standard delivery (5-7 days) | Free shipping on orders over ₹100";
// // ----------------------------------------------

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function ProductDetailPage() {
//   const { productId } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isAdding, setIsAdding] = useState(false);
//   const [isAlreadyAdded, setIsAlreadyAdded] = useState(false);

//   const { cartItems, fetchCart } = useCart();

//   // --- Data Fetching and Initialization ---

//   // Fetches product data
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
//           // Auto-select the first size by default
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

//   // Checks if the product is already in the cart every time cartItems updates
//   useEffect(() => {
//     if (cartItems) {
//       const filteredCartProduct = cartItems.some(
//         (item) => item.productId === productId
//       );
//       setIsAlreadyAdded(filteredCartProduct);
//     } else {
//       setIsAlreadyAdded(false);
//     }
//   }, [cartItems, productId]);

//   // --- Handlers ---

//   const handleAddToCart = async (e) => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       toast.warn("Please log in to add items to your cart.", {
//         position: "top-center",
//         autoClose: 1500,
//         onClose: () => navigate("/login"),
//       });
//       return;
//     }
//     e.preventDefault();

//     // Frontend validation: Stock is now always assumed TRUE based on your request
//     if (!product || isAdding) return;
//     if (product.sizes && product.sizes?.length > 0 && !selectedSize) {
//       toast.warn("Please select a size.", { autoClose: 1500 });
//       return;
//     }

//     // HANDLE ALREADY ADDED / GO TO CART LOGIC
//     if (isAlreadyAdded) {
//       toast.info("Product is already in your cart. Redirecting...", {
//         position: "top-center",
//         autoClose: 1500,
//         icon: "🛒",
//         onClose: () => navigate('/cart'),
//       });
//       return;
//     }

//     setIsAdding(true);

//     try {
//       const cartData = {
//         productId: product._id,
//         quantity: 1,
//         ...(product.sizes && { selectedSize: selectedSize }),
//       };

//       const ADD_CART_URL = `${domainUrl}/cart/add`;

//       // API Call to add to cart
//       await axios.post(
//         ADD_CART_URL,
//         cartData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       // SHOW SUCCESS TOAST AND DELAY REDIRECT
//       toast.success(`${product.name} added to cart!`, {
//         position: "top-center",
//         autoClose: 1500,
//         icon: "🛍️",
//         onClose: () => {
//           fetchCart(); // Refresh cart data
//           navigate("/cart");
//         },
//       });

//     } catch (err) {
//       console.log("Error adding to cart:", err.response?.data || err.message);

//       // Show error toast
//       toast.error(err.response?.data?.message || "Failed to add product to cart.", {
//         position: "top-center",
//         autoClose: 3000,
//       });

//     } finally {
//       setIsAdding(false);
//     }
//   };

//   // --- Render Logic ---

//   if (loading)
//     return (
//       <div className="text-center py-20 text-xl text-gray-700 font-semibold">
//         Loading Product Details...
//       </div>
//     );
//   if (error)
//     return <div className="text-center py-20 text-xl text-red-600 font-semibold">{error}</div>;
//   if (!product)
//     return (
//       <div className="text-center py-20 text-xl text-gray-600 font-semibold">
//         Product details unavailable.
//       </div>
//     );

//   const productImageSrc = product.image
//     ? product.image
//     : "https://via.placeholder.com/600x800?text=Product+Image+Unavailable";

//   // Assuming price is in INR (₹)
//   const productPrice = product.price
//     ? `₹${product.price.toFixed(2)}`
//     : "Price Unavailable";

//   // *** CRITICAL CHANGE: Force isInStock to true based on your confirmation ***
//   const isInStock = true;

//   return (
//     <div className="bg-white">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">

//         {/* --- Product Main Grid: Image and Details (Professional UI) --- */}
//         <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">

//           {/* 1. Left Column: Image Gallery (Sticky on large screens) */}
//           <div className="lg:sticky lg:top-20">
//             <div className="flex flex-col items-center">
//               {/* Main Image */}
//               <div className="w-full h-[550px] lg:h-[700px] overflow-hidden rounded-xl shadow-lg border border-gray-100">
//                 <img
//                   src={productImageSrc}
//                   alt={product.name}
//                   className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* 2. Right Column: Details and Purchase Form */}
//           <div className="mt-10 lg:mt-0">

//             {/* A. Product Overview */}
//             <div>
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
//                 {product.name}
//               </h1>

//               <div className="mt-4 flex items-center justify-between">
//                 <p className="text-3xl font-semibold text-gray-900">{productPrice}</p>

//                 {/* Reviews */}
//                 <div className="flex items-center space-x-2">
//                   <div className="flex items-center text-yellow-500">
//                     {[...Array(5)].map((_, i) => (
//                       <StarIcon
//                         key={i}
//                         className={classNames(
//                           i < DUMMY_REVIEWS.average ? "text-yellow-500" : "text-gray-300",
//                           "w-5 h-5 flex-shrink-0"
//                         )}
//                         aria-hidden="true"
//                       />
//                     ))}
//                   </div>
//                   <p className="text-sm text-gray-500">({DUMMY_REVIEWS.totalCount} reviews)</p>
//                 </div>
//               </div>

//               <div className="mt-4">
//                 {/* Stock is always displayed as IN STOCK now */}
//                 <p className="flex items-center text-md text-green-600 font-medium">
//                     <CheckIcon className="h-5 w-5 mr-1" aria-hidden="true" />
//                     In stock (99+)
//                 </p>
//               </div>

//               {/* Delivery Info */}
//               <div className="mt-6 border-t border-b border-gray-200 py-6">
//                 <p className="flex items-center text-sm text-gray-600">
//                   <TruckIcon className="h-5 w-5 mr-2 text-gray-400" aria-hidden="true" />
//                   {deliveryInfo}
//                 </p>
//               </div>

//             </div>

//             {/* B. Purchase Form */}
//             <form onSubmit={handleAddToCart} className="mt-10">

//               {/* Size Selector */}
//               {product.sizes?.length > 0 && (
//                 <div className="mb-8">
//                   <legend className="text-lg font-medium text-gray-700 border-b border-gray-100 pb-2 mb-4">
//                     Choose Size
//                   </legend>
//                   <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
//                     {product.sizes.map((size) => (
//                       <label
//                         key={size.name}
//                         className={classNames(
//                           selectedSize === size.name
//                             ? "border-indigo-600 ring-2 ring-indigo-600 bg-indigo-50 text-indigo-800"
//                             : "border-gray-300 hover:border-gray-500 text-gray-900",
//                           "border rounded-lg p-3 text-center text-sm font-medium cursor-pointer transition duration-150 ease-in-out"
//                         )}
//                         onClick={() => setSelectedSize(size.name)}
//                       >
//                         <input
//                           type="radio"
//                           name="size"
//                           value={size.name}
//                           checked={selectedSize === size.name}
//                           readOnly
//                           className="sr-only"
//                         />
//                         {size.name}
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Add to Bag Button */}
//               <button
//                 type="submit"
//                 // Disable if adding, or if sizes exist but none is selected
//                 disabled={isAdding || (product.sizes?.length > 0 && !selectedSize)}
//                 className={classNames(
//                   "bg-indigo-600 hover:bg-indigo-700", // Now always uses the active color
//                   "w-full rounded-md px-8 py-4 text-xl font-semibold text-white uppercase tracking-wider transition duration-150 ease-in-out shadow-lg disabled:opacity-60"
//                 )}
//               >
//                 {isAdding
//                   ? "Processing..."
//                   : isAlreadyAdded
//                     ? "Go to Cart"
//                     : "Add to Bag"}
//               </button>

//               {/* Security/Guarantee Info */}
//               <div className="mt-4 text-center text-sm text-gray-600 flex items-center justify-center">
//                 <ShieldCheckIcon className="h-5 w-5 mr-1 text-gray-400" aria-hidden="true" />
//                 <span className="font-medium">Secure Checkout</span> &bull; Lifetime Guarantee
//               </div>

//             </form>

//             {/* C. Product Description (Below the form) */}
//             <div className="mt-12 border-t border-gray-200 pt-8">
//               <h2 className="text-2xl font-bold text-gray-900 mb-4">
//                 Product Details
//               </h2>
//               <p className="text-base text-gray-700 leading-relaxed">
//                 {product.description ||
//                   "No detailed description is available for this product. High-quality fabric, comfortable fit, and timeless style."}
//               </p>
//             </div>

//             {/* D. Additional Information (e.g., Fabric care) */}
//             <div className="mt-8">
//                 <h3 className="text-lg font-medium text-gray-900">Fabric & Care</h3>
//                 <ul role="list" className="mt-4 space-y-2 text-sm text-gray-600 list-disc ml-5">
//                     <li>Material: 100% Pure Handloom Cotton/Silk (Placeholder)</li>
//                     <li>Care: Dry clean only or gentle hand wash.</li>
//                     <li>Origin: Sourced from local artisans in India.</li>
//                 </ul>
//             </div>

//           </div> {/* End Right Column */}
//         </div>

//       </div> {/* End Max Width Container */}

//       {/* Toast Container */}
//       <ToastContainer
//         position="top-center"
//         autoClose={2000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored"
//         transition={Slide}
//       />
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { StarIcon, CheckIcon } from "@heroicons/react/20/solid";
// import { ShieldCheckIcon, TruckIcon } from "@heroicons/react/24/outline";
// import { domainUrl } from "../utils/constant";
// import api from "../utils/api"; // 🔥 using cookie-based axios instance
// import { useCart } from "../context/CartContext";
// import { ToastContainer, toast, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useAuth } from "../context/AuthContext";

// // --- DUMMY DATA ---
// const DUMMY_REVIEWS = { average: 4, totalCount: 1624 };
// const deliveryInfo =
//   "Standard delivery (5-7 days) | Free shipping on orders over ₹100";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function ProductDetailPage() {
//   const { productId } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isAdding, setIsAdding] = useState(false);
//   const [isAlreadyAdded, setIsAlreadyAdded] = useState(false);

//   const { cartItems, fetchCart } = useCart();

//   const { user } = useAuth();

// useEffect(() => {
//     if (!user.isInitialLoad && !user.isAuthenticated) {
//         navigate("/login", { replace: true });
//     }
// }, [user.isInitialLoad, user.isAuthenticated]);

//   // -------------------------------
//   // Fetch Product
//   // -------------------------------
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         const res = await api.get(`/user/shop/product/${productId}`);
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

//   // -------------------------------
//   // Check if in cart already
//   // -------------------------------
//   useEffect(() => {
//     if (cartItems) {
//       const exists = cartItems.some(
//         (item) => item.productId === productId
//       );
//       setIsAlreadyAdded(exists);
//     } else {
//       setIsAlreadyAdded(false);
//     }
//   }, [cartItems, productId]);

//   // -------------------------------
//   // Add to Cart (Cookie Auth)
//   // -------------------------------
//   const handleAddToCart = async (e) => {
//     e.preventDefault();

//     if (!product || isAdding) return;

//     if (product.sizes?.length > 0 && !selectedSize) {
//       toast.warn("Please select a size.", { autoClose: 1500 });
//       return;
//     }

//     if (isAlreadyAdded) {
//       toast.info("Product is already in your cart. Redirecting...", {
//         position: "top-center",
//         autoClose: 1500,
//         icon: "🛒",
//         onClose: () => navigate("/cart"),
//       });
//       return;
//     }

//     setIsAdding(true);

//     try {
//       const cartData = {
//         productId: product._id,
//         quantity: 1,
//         ...(product.sizes && { selectedSize }),
//       };

//       // 🔥 Cookie auth (no token, no headers)
//       await api.post(`/cart/add`, cartData);

//       toast.success(`${product.name} added to cart!`, {
//         position: "top-center",
//         autoClose: 1500,
//         icon: "🛍️",
//         onClose: () => {
//           fetchCart();
//           navigate("/cart");
//         },
//       });
//     } catch (err) {
//       const status = err.response?.status;

//       if (status === 401) {
//         toast.warn("Please log in to add items to your cart.", {
//           position: "top-center",
//           autoClose: 1500,
//           onClose: () => navigate("/login"),
//         });
//         return;
//       }

//       toast.error(
//         err.response?.data?.message || "Failed to add product to cart.",
//         { position: "top-center", autoClose: 3000 }
//       );
//     } finally {
//       setIsAdding(false);
//     }
//   };

//   // -------------------------------
//   // Render
//   // -------------------------------
//   if (loading)
//     return (
//       <div className="text-center py-20 text-xl text-gray-700 font-semibold">
//         Loading Product Details...
//       </div>
//     );

//   if (error)
//     return (
//       <div className="text-center py-20 text-xl text-red-600 font-semibold">
//         {error}
//       </div>
//     );

//   if (!product)
//     return (
//       <div className="text-center py-20 text-xl text-gray-600 font-semibold">
//         Product details unavailable.
//       </div>
//     );

//   const productImageSrc = product.image
//     ? product.image
//     : "https://via.placeholder.com/600x800?text=Product+Image+Unavailable";

//   const productPrice = product.price
//     ? `₹${product.price.toFixed(2)}`
//     : "Price Unavailable";

//   const isInStock = true;

//   return (
//     <div className="bg-white">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">

//         <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">

//           {/* LEFT IMAGE */}
//           <div className="lg:sticky lg:top-20">
//             <div className="flex flex-col items-center">
//               <div className="w-full h-[550px] lg:h-[700px] overflow-hidden rounded-xl shadow-lg border border-gray-100">
//                 <img
//                   src={productImageSrc}
//                   alt={product.name}
//                   className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* RIGHT DETAILS */}
//           <div className="mt-10 lg:mt-0">

//             <div>
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
//                 {product.name}
//               </h1>

//               <div className="mt-4 flex items-center justify-between">
//                 <p className="text-3xl font-semibold text-gray-900">{productPrice}</p>

//                 <div className="flex items-center space-x-2">
//                   <div className="flex items-center text-yellow-500">
//                     {[...Array(5)].map((_, i) => (
//                       <StarIcon
//                         key={i}
//                         className={classNames(
//                           i < DUMMY_REVIEWS.average
//                             ? "text-yellow-500"
//                             : "text-gray-300",
//                           "w-5 h-5 flex-shrink-0"
//                         )}
//                       />
//                     ))}
//                   </div>
//                   <p className="text-sm text-gray-500">
//                     ({DUMMY_REVIEWS.totalCount} reviews)
//                   </p>
//                 </div>
//               </div>

//               <div className="mt-4">
//                 <p className="flex items-center text-md text-green-600 font-medium">
//                   <CheckIcon className="h-5 w-5 mr-1" />
//                   In stock (99+)
//                 </p>
//               </div>

//               <div className="mt-6 border-t border-b border-gray-200 py-6">
//                 <p className="flex items-center text-sm text-gray-600">
//                   <TruckIcon className="h-5 w-5 mr-2 text-gray-400" />
//                   {deliveryInfo}
//                 </p>
//               </div>
//             </div>

//             {/* FORM */}
//             <form onSubmit={handleAddToCart} className="mt-10">

//               {product.sizes?.length > 0 && (
//                 <div className="mb-8">
//                   <legend className="text-lg font-medium text-gray-700 border-b border-gray-100 pb-2 mb-4">
//                     Choose Size
//                   </legend>
//                   <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
//                     {product.sizes.map((size) => (
//                       <label
//                         key={size.name}
//                         onClick={() => setSelectedSize(size.name)}
//                         className={classNames(
//                           selectedSize === size.name
//                             ? "border-indigo-600 ring-2 ring-indigo-600 bg-indigo-50 text-indigo-800"
//                             : "border-gray-300 hover:border-gray-500 text-gray-900",
//                           "border rounded-lg p-3 text-center text-sm font-medium cursor-pointer transition duration-150 ease-in-out"
//                         )}
//                       >
//                         <input
//                           type="radio"
//                           className="sr-only"
//                           readOnly
//                           checked={selectedSize === size.name}
//                         />
//                         {size.name}
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               <button
//                 type="submit"
//                 disabled={isAdding || (product.sizes?.length > 0 && !selectedSize)}
//                 className={classNames(
//                   "bg-indigo-600 hover:bg-indigo-700",
//                   "w-full rounded-md px-8 py-4 text-xl font-semibold text-white uppercase tracking-wider transition duration-150 ease-in-out shadow-lg disabled:opacity-60"
//                 )}
//               >
//                 {isAdding
//                   ? "Processing..."
//                   : isAlreadyAdded
//                     ? "Go to Cart"
//                     : "Add to Bag"}
//               </button>

//               <div className="mt-4 text-center text-sm text-gray-600 flex items-center justify-center">
//                 <ShieldCheckIcon className="h-5 w-5 mr-1 text-gray-400" />
//                 <span className="font-medium">Secure Checkout</span> &bull; Lifetime Guarantee
//               </div>
//             </form>

//             <div className="mt-12 border-t border-gray-200 pt-8">
//               <h2 className="text-2xl font-bold text-gray-900 mb-4">
//                 Product Details
//               </h2>
//               <p className="text-base text-gray-700 leading-relaxed">
//                 {product.description ||
//                   "No detailed description is available for this product. High-quality fabric, comfortable fit, and timeless style."}
//               </p>
//             </div>

//             <div className="mt-8">
//               <h3 className="text-lg font-medium text-gray-900">Fabric & Care</h3>
//               <ul className="mt-4 space-y-2 text-sm text-gray-600 list-disc ml-5">
//                 <li>Material: 100% Pure Handloom Cotton/Silk (Placeholder)</li>
//                 <li>Care: Dry clean only or gentle hand wash.</li>
//                 <li>Origin: Sourced from local artisans in India.</li>
//               </ul>
//             </div>
//           </div>

//         </div>
//       </div>

//       <ToastContainer
//         position="top-center"
//         autoClose={2000}
//         hideProgressBar={false}
//         pauseOnHover
//         theme="colored"
//         transition={Slide}
//       />
//     </div>
//   );
// }



//working proper codeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee





// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { StarIcon, CheckIcon } from "@heroicons/react/20/solid";
// import { ShieldCheckIcon, TruckIcon } from "@heroicons/react/24/outline";
// import { domainUrl } from "../utils/constant";
// import api from "../utils/api";
// import { useCart } from "../context/CartContext";
// import { ToastContainer, toast, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useAuth } from "../context/AuthContext";
// import { BeatLoader } from "react-spinners";

// const DUMMY_REVIEWS = { average: 4, totalCount: 1624 };
// const deliveryInfo =
//   "Standard delivery (5-7 days) | Free shipping on orders over ₹100";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function ProductDetailPage() {
//   const { productId } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isAdding, setIsAdding] = useState(false);
//   const [isAlreadyAdded, setIsAlreadyAdded] = useState(false);

//   const { cartItems, fetchCart } = useCart();
//   const { user } = useAuth();

//   // -------------------------------------------
//   // FIX FOR FORWARD/BACK BUTTON CACHE ISSUE
//   // -------------------------------------------
//   // Fix forward button AFTER logout ONLY
//   useEffect(() => {
//     if (!user.isAuthenticated && !user.isInitialLoad) {
//       // user logged out → prevent accessing cached pages
//       window.history.pushState(null, "", window.location.href);

//       const handlePopState = () => {
//         navigate(0); // reload → redirect to login
//       };

//       window.addEventListener("popstate", handlePopState);

//       return () => {
//         window.removeEventListener("popstate", handlePopState);
//       };
//     }
//   }, [user.isAuthenticated, user.isInitialLoad, navigate]);

//   useEffect(() => {
//     // Disable browser Back-Forward cache for this page
//     window.addEventListener("pageshow", (event) => {
//       if (event.persisted) {
//         // Force reload if page restored from bfcache
//         navigate(0);
//       }
//     });
//   }, [navigate]);

//   // -------------------------------------------
//   // PROTECT PAGE WHEN USER LOGGED OUT
//   // -------------------------------------------
//   useEffect(() => {
//     if (!user.isInitialLoad && !user.isAuthenticated) {
//       navigate("/login", { replace: true });
//     }
//   }, [user.isInitialLoad, user.isAuthenticated, navigate]);

//   // -------------------------------------------
//   // Fetch Product
//   // -------------------------------------------
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         const res = await api.get(`/user/shop/product/${productId}`);
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

//   // -------------------------------------------
//   // Check if in cart already
//   // -------------------------------------------
//   useEffect(() => {
//     if (cartItems) {
//       const exists = cartItems.some((item) => item.productId === productId);
//       setIsAlreadyAdded(exists);
//     } else {
//       setIsAlreadyAdded(false);
//     }
//   }, [cartItems, productId]);

//   // -------------------------------------------
//   // Add to Cart
//   // -------------------------------------------
//   const handleAddToCart = async (e) => {
//     e.preventDefault();

//     if (!product || isAdding) return;

//     if (product.sizes?.length > 0 && !selectedSize) {
//       toast.warn("Please select a size.", { autoClose: 1500 });
//       return;
//     }

//     if (isAlreadyAdded) {
//       toast.info("Product is already in your cart. Redirecting...", {
//         position: "top-center",
//         autoClose: 1500,
//         icon: "🛒",
//         onClose: () => navigate("/cart"),
//       });
//       return;
//     }

//     setIsAdding(true);

//     try {
//       const cartData = {
//         productId: product._id,
//         quantity: 1,
//         ...(product.sizes && { selectedSize }),
//       };

//       await api.post(`/cart/add`, cartData);

//       toast.success(`${product.name} added to cart!`, {
//         position: "top-center",
//         autoClose: 1500,
//         icon: "🛍️",
//         onClose: () => {
//           fetchCart();
//           navigate("/cart");
//         },
//       });
//     } catch (err) {
//       const status = err.response?.status;

//       if (status === 401) {
//         toast.warn("Please log in to add items to your cart.", {
//           position: "top-center",
//           autoClose: 1500,
//           onClose: () => navigate("/login"),
//         });
//         return;
//       }

//       toast.error(
//         err.response?.data?.message || "Failed to add product to cart.",
//         { position: "top-center", autoClose: 3000 }
//       );
//     } finally {
//       setIsAdding(false);
//     }
//   };

//   // -------------------------------------------
//   // Render UI
//   // -------------------------------------------
//   if (loading)
//     return (

//        <div className="w-full h-[60vh] flex justify-center items-center">
//        <BeatLoader color="#4f8a4c" size={15}/>
//        {/* <div className=" text-xl text-gray-700 font-semibold">
//         Loading Product Details...
//       </div> */}
//     </div>
     
//     );

//   if (error)
//     return (
//       <div className="text-center py-20 text-xl text-red-600 font-semibold">
//         {error}
//       </div>
//     );

//   if (!product)
//     return (
//       <div className="text-center py-20 text-xl text-gray-600 font-semibold">
//         Product details unavailable.
//       </div>
//     );

//   const productImageSrc = product.image
//     ? product.image
//     : "https://via.placeholder.com/600x800?text=Product+Image+Unavailable";

//   const productPrice = product.price
//     ? `₹${product.price.toFixed(2)}`
//     : "Price Unavailable";

//   return (
//     <div className="bg-white">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
//         <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
//           {/* LEFT IMAGE */}
//           <div className="lg:sticky lg:top-20">
//             <div className="flex flex-col items-center">
//               <div className="w-full h-[550px] lg:h-[700px] overflow-hidden rounded-xl shadow-lg border border-gray-100">
//                 <img
//                   src={productImageSrc}
//                   alt={product.name}
//                   className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* RIGHT DETAILS */}
//           <div className="mt-10 lg:mt-0">
//             <div>
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
//                 {product.name}
//               </h1>

//               <div className="mt-4 flex items-center justify-between">
//                 <p className="text-3xl font-semibold text-gray-900">
//                   {productPrice}
//                 </p>

//                 <div className="flex items-center space-x-2">
//                   <div className="flex items-center text-yellow-500">
//                     {[...Array(5)].map((_, i) => (
//                       <StarIcon
//                         key={i}
//                         className={classNames(
//                           i < DUMMY_REVIEWS.average
//                             ? "text-yellow-500"
//                             : "text-gray-300",
//                           "w-5 h-5 flex-shrink-0"
//                         )}
//                       />
//                     ))}
//                   </div>
//                   <p className="text-sm text-gray-500">
//                     ({DUMMY_REVIEWS.totalCount} reviews)
//                   </p>
//                 </div>
//               </div>

//               <div className="mt-4">
//                 <p className="flex items-center text-md text-green-600 font-medium">
//                   <CheckIcon className="h-5 w-5 mr-1" />
//                   In stock (99+)
//                 </p>
//               </div>

//               <div className="mt-6 border-t border-b border-gray-200 py-6">
//                 <p className="flex items-center text-sm text-gray-600">
//                   <TruckIcon className="h-5 w-5 mr-2 text-gray-400" />
//                   {deliveryInfo}
//                 </p>
//               </div>
//             </div>

//             {/* FORM */}
//             <form onSubmit={handleAddToCart} className="mt-10">
//               {product.sizes?.length > 0 && (
//                 <div className="mb-8">
//                   <legend className="text-lg font-medium text-gray-700 border-b border-gray-100 pb-2 mb-4">
//                     Choose Size
//                   </legend>
//                   <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
//                     {product.sizes.map((size) => (
//                       <label
//                         key={size.name}
//                         onClick={() => setSelectedSize(size.name)}
//                         className={classNames(
//                           selectedSize === size.name
//                             ? "border-indigo-600 ring-2 ring-indigo-600 bg-indigo-50 text-indigo-800"
//                             : "border-gray-300 hover:border-gray-500 text-gray-900",
//                           "border rounded-lg p-3 text-center text-sm font-medium cursor-pointer transition duration-150 ease-in-out"
//                         )}
//                       >
//                         <input
//                           type="radio"
//                           className="sr-only"
//                           readOnly
//                           checked={selectedSize === size.name}
//                         />
//                         {size.name}
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               <button
//                 type="submit"
//                 disabled={
//                   isAdding || (product.sizes?.length > 0 && !selectedSize)
//                 }
//                 className={classNames(
//                   "bg-indigo-600 hover:bg-indigo-700",
//                   "w-full rounded-md px-8 py-4 text-xl font-semibold text-white uppercase tracking-wider transition duration-150 ease-in-out shadow-lg disabled:opacity-60"
//                 )}
//               >
//                 {isAdding
//                   ? "Processing..."
//                   : isAlreadyAdded
//                   ? "Go to Cart"
//                   : "Add to Bag"}
//               </button>

//               <div className="mt-4 text-center text-sm text-gray-600 flex items-center justify-center">
//                 <ShieldCheckIcon className="h-5 w-5 mr-1 text-gray-400" />
//                 <span className="font-medium">Secure Checkout</span> • Lifetime
//                 Guarantee
//               </div>
//             </form>

//             <div className="mt-12 border-t border-gray-200 pt-8">
//               <h2 className="text-2xl font-bold text-gray-900 mb-4">
//                 Product Details
//               </h2>
//               <p className="text-base text-gray-700 leading-relaxed">
//                 {product.description ||
//                   "No detailed description is available for this product. High-quality fabric, comfortable fit, and timeless style."}
//               </p>
//             </div>

//             <div className="mt-8">
//               <h3 className="text-lg font-medium text-gray-900">
//                 Fabric & Care
//               </h3>
//               <ul className="mt-4 space-y-2 text-sm text-gray-600 list-disc ml-5">
//                 <li>Material: 100% Pure Handloom Cotton/Silk (Placeholder)</li>
//                 <li>Care: Dry clean only or gentle hand wash.</li>
//                 <li>Origin: Sourced from local artisans in India.</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>

//       <ToastContainer
//         position="top-center"
//         autoClose={2000}
//         hideProgressBar={false}
//         pauseOnHover
//         theme="colored"
//         transition={Slide}
//       />
//     </div>
//   );
// }





//wishlight

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { StarIcon, CheckIcon } from "@heroicons/react/20/solid";
// import { 
//     ShieldCheckIcon, 
//     TruckIcon, 
//     HeartIcon as HeartOutline 
// } from "@heroicons/react/24/outline";
// import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid"; // Import Solid Heart
// import api from "../utils/api";
// import { useCart } from "../context/CartContext";
// import { useAuth } from "../context/AuthContext";
// import { useWishlist } from "../context/WishlistContext"; // Import Wishlist Context
// import { ToastContainer, toast, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const DUMMY_REVIEWS = { average: 4, totalCount: 1624 };
// const deliveryInfo = "Standard delivery (5-7 days) | Free shipping on orders over ₹100";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function ProductDetailPage() {
//   const { productId } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isAdding, setIsAdding] = useState(false);
//   const [isAlreadyAdded, setIsAlreadyAdded] = useState(false);

//   const { cartItems, fetchCart } = useCart();
//   const { user } = useAuth();
  
//   // Wishlist Hook
//   const { isInWishlist, toggleWishlist } = useWishlist();

//   // -------------------------------------------
//   // FIX FOR FORWARD/BACK BUTTON CACHE ISSUE
//   // -------------------------------------------
//   useEffect(() => {
//     if (!user.isAuthenticated && !user.isInitialLoad) {
//       window.history.pushState(null, "", window.location.href);
//       const handlePopState = () => {
//         navigate(0);
//       };
//       window.addEventListener("popstate", handlePopState);
//       return () => {
//         window.removeEventListener("popstate", handlePopState);
//       };
//     }
//   }, [user.isAuthenticated, user.isInitialLoad, navigate]);

//   useEffect(() => {
//     window.addEventListener("pageshow", (event) => {
//       if (event.persisted) {
//         navigate(0);
//       }
//     });
//   }, [navigate]);

//   // -------------------------------------------
//   // PROTECT PAGE WHEN USER LOGGED OUT
//   // -------------------------------------------
//   useEffect(() => {
//     if (!user.isInitialLoad && !user.isAuthenticated) {
//       navigate("/login", { replace: true });
//     }
//   }, [user.isInitialLoad, user.isAuthenticated, navigate]);

//   // -------------------------------------------
//   // Fetch Product
//   // -------------------------------------------
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         const res = await api.get(`/user/shop/product/${productId}`);
//         const fetchedProduct = res.data.product;

//         setProduct(fetchedProduct);

//         if (fetchedProduct.sizes?.length > 0) {
//           setSelectedSize(fetchedProduct.sizes[0].name);
//         }
//       } catch (err) {
//         const status = err.response?.status;
//         let msg = `Error loading product: ${status || "Network Error"}`;
//         if (status === 404) msg = `Product not found for ID: "${productId}". (Status 404)`;
//         setError(msg);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (productId) fetchProduct();
//   }, [productId]);

//   // -------------------------------------------
//   // Check if in cart already
//   // -------------------------------------------
//   useEffect(() => {
//     if (cartItems) {
//       const exists = cartItems.some((item) => item.productId === productId);
//       setIsAlreadyAdded(exists);
//     } else {
//       setIsAlreadyAdded(false);
//     }
//   }, [cartItems, productId]);

//   // -------------------------------------------
//   // Add to Cart Handler
//   // -------------------------------------------
//   const handleAddToCart = async (e) => {
//     e.preventDefault();

//     if (!product || isAdding) return;

//     if (product.sizes?.length > 0 && !selectedSize) {
//       toast.warn("Please select a size.", { autoClose: 1500 });
//       return;
//     }

//     if (isAlreadyAdded) {
//       toast.info("Product is already in your cart. Redirecting...", {
//         position: "top-center",
//         autoClose: 1500,
//         icon: "🛒",
//         onClose: () => navigate("/cart"),
//       });
//       return;
//     }

//     setIsAdding(true);

//     try {
//       const cartData = {
//         productId: product._id,
//         quantity: 1,
//         ...(product.sizes && { selectedSize }),
//       };

//       await api.post(`/cart/add`, cartData);

//       toast.success(`${product.name} added to cart!`, {
//         position: "top-center",
//         autoClose: 1500,
//         icon: "🛍️",
//         onClose: () => {
//           fetchCart();
//           navigate("/cart");
//         },
//       });
//     } catch (err) {
//       const status = err.response?.status;
//       if (status === 401) {
//         navigate("/login");
//         return;
//       }
//       toast.error(err.response?.data?.message || "Failed to add product to cart.");
//     } finally {
//       setIsAdding(false);
//     }
//   };

//   // -------------------------------------------
//   // Wishlist Handler
//   // -------------------------------------------
//   const handleWishlistToggle = () => {
//     if(product) {
//         toggleWishlist(product);
//     }
//   }

//   // Check if product is in wishlist (safely)
//   const isWishlisted = product ? isInWishlist(product._id) : false;

//   // -------------------------------------------
//   // Render UI
//   // -------------------------------------------
//   if (loading)
//     return (
//       <div className="text-center py-20 text-xl text-gray-700 font-semibold">
//         Loading Product Details...
//       </div>
//     );

//   if (error)
//     return (
//       <div className="text-center py-20 text-xl text-red-600 font-semibold">
//         {error}
//       </div>
//     );

//   if (!product) return null;

//   const productImageSrc = product.image || "https://via.placeholder.com/600x800";
//   const productPrice = product.price ? `₹${product.price.toFixed(2)}` : "Price Unavailable";

//   return (
//     <div className="bg-white">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
//         <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          
//           {/* LEFT IMAGE */}
//           <div className="lg:sticky lg:top-20">
//             <div className="flex flex-col items-center">
//               <div className="w-full h-[550px] lg:h-[700px] overflow-hidden rounded-xl shadow-lg border border-gray-100">
//                 <img
//                   src={productImageSrc}
//                   alt={product.name}
//                   className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* RIGHT DETAILS */}
//           <div className="mt-10 lg:mt-0">
//             <div>
//               <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
//                 {product.name}
//               </h1>

//               <div className="mt-4 flex items-center justify-between">
//                 <p className="text-3xl font-semibold text-gray-900">
//                   {productPrice}
//                 </p>
//                 <div className="flex items-center space-x-2">
//                   <div className="flex items-center text-yellow-500">
//                     {[...Array(5)].map((_, i) => (
//                       <StarIcon
//                         key={i}
//                         className={classNames(
//                           i < DUMMY_REVIEWS.average ? "text-yellow-500" : "text-gray-300",
//                           "w-5 h-5 flex-shrink-0"
//                         )}
//                       />
//                     ))}
//                   </div>
//                   <p className="text-sm text-gray-500">({DUMMY_REVIEWS.totalCount} reviews)</p>
//                 </div>
//               </div>

//               <div className="mt-4">
//                 <p className="flex items-center text-md text-green-600 font-medium">
//                   <CheckIcon className="h-5 w-5 mr-1" />
//                   In stock (99+)
//                 </p>
//               </div>

//               <div className="mt-6 border-t border-b border-gray-200 py-6">
//                 <p className="flex items-center text-sm text-gray-600">
//                   <TruckIcon className="h-5 w-5 mr-2 text-gray-400" />
//                   {deliveryInfo}
//                 </p>
//               </div>
//             </div>

//             {/* FORM */}
//             <form onSubmit={handleAddToCart} className="mt-10">
//               {product.sizes?.length > 0 && (
//                 <div className="mb-8">
//                   <legend className="text-lg font-medium text-gray-700 border-b border-gray-100 pb-2 mb-4">
//                     Choose Size
//                   </legend>
//                   <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
//                     {product.sizes.map((size) => (
//                       <label
//                         key={size.name}
//                         onClick={() => setSelectedSize(size.name)}
//                         className={classNames(
//                           selectedSize === size.name
//                             ? "border-indigo-600 ring-2 ring-indigo-600 bg-indigo-50 text-indigo-800"
//                             : "border-gray-300 hover:border-gray-500 text-gray-900",
//                           "border rounded-lg p-3 text-center text-sm font-medium cursor-pointer transition duration-150 ease-in-out"
//                         )}
//                       >
//                         <input
//                           type="radio"
//                           className="sr-only"
//                           readOnly
//                           checked={selectedSize === size.name}
//                         />
//                         {size.name}
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Action Buttons Container */}
//               <div className="flex gap-4">
//                 {/* Add to Cart Button */}
//                 <button
//                   type="submit"
//                   disabled={isAdding || (product.sizes?.length > 0 && !selectedSize)}
//                   className={classNames(
//                     "bg-indigo-600 hover:bg-indigo-700 flex-1",
//                     "rounded-md px-8 py-4 text-xl font-semibold text-white uppercase tracking-wider transition duration-150 ease-in-out shadow-lg disabled:opacity-60"
//                   )}
//                 >
//                   {isAdding ? "Processing..." : isAlreadyAdded ? "Go to Cart" : "Add to Bag"}
//                 </button>

//                 {/* Wishlist Button */}
//                 <button
//                     type="button"
//                     onClick={handleWishlistToggle}
//                     className={classNames(
//                         "rounded-md px-4 py-3 flex items-center justify-center border transition duration-150 ease-in-out shadow-sm",
//                         isWishlisted 
//                             ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100" 
//                             : "border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                     )}
//                     aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
//                 >
//                     {isWishlisted ? (
//                          <HeartSolid className="h-8 w-8" />
//                     ) : (
//                          <HeartOutline className="h-8 w-8" />
//                     )}
//                 </button>
//               </div>

//               <div className="mt-4 text-center text-sm text-gray-600 flex items-center justify-center">
//                 <ShieldCheckIcon className="h-5 w-5 mr-1 text-gray-400" />
//                 <span className="font-medium">Secure Checkout</span> • Lifetime Guarantee
//               </div>
//             </form>

//             <div className="mt-12 border-t border-gray-200 pt-8">
//               <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Details</h2>
//               <p className="text-base text-gray-700 leading-relaxed">
//                 {product.description || "No detailed description is available."}
//               </p>
//             </div>

//             <div className="mt-8">
//               <h3 className="text-lg font-medium text-gray-900">Fabric & Care</h3>
//               <ul className="mt-4 space-y-2 text-sm text-gray-600 list-disc ml-5">
//                 <li>Material: 100% Pure Handloom Cotton/Silk (Placeholder)</li>
//                 <li>Care: Dry clean only or gentle hand wash.</li>
//                 <li>Origin: Sourced from local artisans in India.</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>

//       <ToastContainer
//         position="top-center"
//         autoClose={2000}
//         hideProgressBar={false}
//         pauseOnHover
//         theme="colored"
//         transition={Slide}
//       />
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { ToastContainer, toast, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
// import { HeartIcon as HeartOutline, CheckIcon } from "@heroicons/react/24/outline";
// import { ShieldCheckIcon, TruckIcon, StarIcon } from "@heroicons/react/24/outline";

// import api from "../utils/api";
// import { useCart } from "../context/CartContext";
// import { useAuth } from "../context/AuthContext";
// import { useWishlist } from "../context/WishlistContext";
// import { BeatLoader } from "react-spinners";

// const DUMMY_REVIEWS = { average: 4, totalCount: 1624 };
// const deliveryInfo = "Standard delivery (5-7 days) | Free shipping over ₹100";

// export default function ProductDetailPage() {
//   const { productId } = useParams();
//   const navigate = useNavigate();

//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isAdding, setIsAdding] = useState(false);

//   const { cartItems, fetchCart } = useCart();
//   const { user } = useAuth();
//   const { toggleWishlist, isProductInWishlist } = useWishlist();

//   const alreadyInCart = cartItems?.some((item) => item.productId === productId) || false;
//   const wishlistStatus = isProductInWishlist(productId);

//   // -------------------------------------
//   // FETCH PRODUCT
//   // -------------------------------------
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await api.get(`/user/shop/product/${productId}`);
//         setProduct(res.data.product);
//       } catch (err) {
//         toast.error("Product not found!", { autoClose: 1500 });
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [productId]);

//   // -------------------------------------
//   // ADD TO CART
//   // -------------------------------------
//   const handleAddToCart = async () => {
//     if (alreadyInCart) {
//       toast.info("Product already in cart. Redirecting...");
//       return navigate("/cart");
//     }

//     try {
//       setIsAdding(true);
//       await api.post("/cart/add", { productId, quantity: 1 });
//       fetchCart();

//       toast.success(`${product.name} added to cart!`, {
//         icon: "🛍️",
//         onClose: () => navigate("/cart"),
//       });
//     } catch (err) {
//       toast.error("Failed to add product!");
//     } finally {
//       setIsAdding(false);
//     }
//   };

//   // -------------------------------------
//   // SIZE CLICK HANDLER (ONLY UI)
//   // -------------------------------------
//   const handleSizeClick = () => {
//     toast.info("This feature is not available yet");
//   };

//   // -------------------------------------
//   // WISHLIST HANDLER
//   // -------------------------------------
//   const handleWishlist = async () => {
//     const ok = await toggleWishlist(productId, wishlistStatus);

//     if (ok) {
//       wishlistStatus
//         ? toast.info("Removed from wishlist ❌")
//         : toast.success("Added to wishlist ❤️");
//     }
//   };

//   // -------------------------------------
//   // UI LOADING STATE
//   // -------------------------------------
//   if (loading)
//     return (
//       <div className="w-full h-[60vh] flex items-center justify-center">
//         <BeatLoader color="#4f8a4c" size={15} />
//       </div>
//     );

//   if (!product)
//     return (
//       <div className="text-center text-lg text-gray-600 py-20">
//         Product not available.
//       </div>
//     );

//   // -------------------------------------
//   // UI STARTS HERE
//   // -------------------------------------
//   return (
//     <div className="bg-white min-h-screen">
//       <div className="max-w-7xl mx-auto p-6 lg:p-12 grid lg:grid-cols-2 gap-12">

//         {/* PRODUCT IMAGE */}
//         <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-200 bg-gray-50 h-[700px]">
//           <img
//             src={product.image}
//             alt={product.name}
//             className="w-full h-full object-cover hover:scale-105 transition-all duration-500"
//           />
//         </div>

//         {/* PRODUCT DETAILS*/}
//         <div className="flex flex-col space-y-6">

//           {/* NAME + PRICE + WISHLIST */}
//           <div className="flex justify-between items-start">
//             <div>
//               <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
//                 {product.name}
//               </h1>
//               <p className="mt-2 text-3xl font-semibold text-indigo-700">
//                 ₹{product.price.toFixed(2)}
//               </p>
//             </div>

//             {/* WISHLIST BUTTON */}
//             <button
//               onClick={handleWishlist}
//               className="p-3 rounded-full border hover:bg-gray-100 transition"
//             >
//               {wishlistStatus ? (
//                 <HeartSolid className="h-8 w-8 text-red-500" />
//               ) : (
//                 <HeartOutline className="h-8 w-8 text-gray-600" />
//               )}
//             </button>
//           </div>

//           {/* REVIEWS */}
//           <div className="flex items-center space-x-3">
//             {[...Array(5)].map((_, i) => (
//               <StarIcon
//                 key={i}
//                 className={`h-5 w-5 ${
//                   i < DUMMY_REVIEWS.average ? "text-yellow-500" : "text-gray-300"
//                 }`}
//               />
//             ))}
//             <span className="text-gray-500 text-sm">
//               ({DUMMY_REVIEWS.totalCount} reviews)
//             </span>
//           </div>

//           {/* DELIVERY */}
//           <div className="flex items-center bg-gray-50 p-4 rounded-lg border">
//             <TruckIcon className="h-5 w-5 text-gray-400 mr-2" />
//             <p className="text-gray-700">{deliveryInfo}</p>
//           </div>

//           {/* SIZES – UI ONLY */}
//           <div>
//             <h3 className="text-lg font-semibold text-gray-800 mb-3">Choose Size</h3>
//             <div className="flex flex-wrap gap-3">
//               {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
//                 <button
//                   key={size}
//                   onClick={handleSizeClick}
//                   className="px-4 py-2 border rounded-lg text-sm
//                   hover:bg-gray-100 transition font-medium"
//                 >
//                   {size}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* ADD TO CART */}
//           <button
//             onClick={handleAddToCart}
//             disabled={isAdding}
//             className="w-full py-4 bg-indigo-600 text-white text-xl rounded-lg font-semibold
//             hover:bg-indigo-700 transition disabled:opacity-60 shadow-xl"
//           >
//             {alreadyInCart ? "Go to Cart" : isAdding ? "Processing..." : "Add to Bag"}
//           </button>

//           <div className="flex items-center justify-center text-sm text-gray-600">
//             <ShieldCheckIcon className="h-5 w-5 mr-1 text-gray-400" />
//             Secure Checkout • Lifetime Guarantee
//           </div>

//           {/* DESCRIPTION */}
//           <div className="pt-6 border-t">
//             <h2 className="text-2xl font-bold mb-3">Product Details</h2>
//             <p className="text-gray-700 leading-relaxed">
//               {product.description ||
//                 "Premium quality with exceptional comfort and timeless style."}
//             </p>
//           </div>

//         </div>
//       </div>

//       <ToastContainer transition={Slide} position="top-center" theme="colored" />
//     </div>
//   );
// }

///working now i am gonna change the ui

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { StarIcon } from "@heroicons/react/20/solid";
// import {
//   HeartIcon, // Outline icon for not-in-wishlist
//   ChevronDownIcon, // For the accordion details
// } from "@heroicons/react/24/outline";
// import { HeartIcon as HeartIconSolid } from "@heroicons/react/20/solid"; // Solid icon for in-wishlist

// import api from "../utils/api";
// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishlistContext";
// import { ToastContainer, toast, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useAuth } from "../context/AuthContext";
// import { BeatLoader } from "react-spinners";
// import ProductCard from "../cart/ProductCard";

// // NOTE: domainUrl is not used in the final JSX but kept in imports.
// // NOTE: deliveryInfo, DUMMY_REVIEWS are kept for existing feature parity.

// const DUMMY_REVIEWS = { average: 4, totalCount: 1624 };
// const deliveryInfo =
//   "Standard delivery (5-7 days) | Free shipping on orders over ₹100";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function ProductDetailPage() {
//   const { productId } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isAdding, setIsAdding] = useState(false);
//   const [isAlreadyAdded, setIsAlreadyAdded] = useState(false);
//   const [isWishlistToggling, setIsWishlistToggling] = useState(false);
//   const [openDetail, setOpenDetail] = useState("description"); // State for accordion
//   const [relatedProducts, setRelatedProducts] = useState([]); // ← NEW

//   const { cartItems, fetchCart } = useCart();
//   const { user } = useAuth();
//   const { isProductInWishlist, toggleWishlist } = useWishlist();

//   const isInWishlist = product ? isProductInWishlist(product._id) : false;

//   // --- Utility for Placeholder Size Feature ---
//   const handleSizeClick = (sizeName) => {
//     // Only update state if size is actually available
//     setSelectedSize(sizeName); 
//     toast.info("This feature is not available yet", { autoClose: 1500 });
//   };

//   // -------------------------------------------
//   // Wishlist Handler
//   // -------------------------------------------
//   const handleToggleWishlist = async () => {
//     if (!product || isWishlistToggling || !user.isAuthenticated) {
//       if (!user.isAuthenticated) {
//         toast.warn("Please log in to add items to your wishlist.", {
//           position: "top-center",
//           autoClose: 1500,
//           onClose: () => navigate("/login"),
//         });
//       }
//       return;
//     }

//     setIsWishlistToggling(true);
//     const success = await toggleWishlist(product._id, isInWishlist);

//     if (success) {
//       toast.success(
//         isInWishlist ? "Removed from Wishlist" : "Added to Wishlist!",
//         { position: "top-right", autoClose: 1500, icon: "💖" }
//       );
//     } else {
//       toast.error(
//         `Failed to ${isInWishlist ? "remove from" : "add to"} Wishlist.`,
//         { position: "top-right", autoClose: 3000 }
//       );
//     }

//     setIsWishlistToggling(false);
//   };

//   // --- EXISTING LOGIC (omitted for brevity, assume it's still here) ---

//   // FIX FOR FORWARD/BACK BUTTON CACHE ISSUE
//   useEffect(() => {
//     if (!user.isAuthenticated && !user.isInitialLoad) {
//       window.history.pushState(null, "", window.location.href);

//       const handlePopState = () => {
//         navigate(0);
//       };

//       window.addEventListener("popstate", handlePopState);

//       return () => {
//         window.removeEventListener("popstate", handlePopState);
//       };
//     }
//   }, [user.isAuthenticated, user.isInitialLoad, navigate]);

//   useEffect(() => {
//     window.addEventListener("pageshow", (event) => {
//       if (event.persisted) {
//         navigate(0);
//       }
//     });
//   }, [navigate]);

//   // PROTECT PAGE WHEN USER LOGGED OUT
//   useEffect(() => {
//     if (!user.isInitialLoad && !user.isAuthenticated) {
//       navigate("/login", { replace: true });
//     }
//   }, [user.isInitialLoad, user.isAuthenticated, navigate]);

//   // Fetch Product
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         const res = await api.get(`/user/shop/product/${productId}`);
//         const fetchedProduct = res.data.product;
//         setRelatedProducts(res.data.relatedProducts || []); // ← NEW

//         setProduct(fetchedProduct);

//         if (fetchedProduct.sizes?.length > 0) {
//           setSelectedSize(null);
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

//   // Check if in cart already
//   useEffect(() => {
//     if (cartItems) {
//       const exists = cartItems.some((item) => item.productId === productId);
//       setIsAlreadyAdded(exists);
//     } else {
//       setIsAlreadyAdded(false);
//     }
//   }, [cartItems, productId]);

//   // Add to Cart
//   const handleAddToCart = async (e) => {
//     e.preventDefault();

//     if (!product || isAdding) return;

//     if (product.sizes?.length > 0 && !selectedSize) {
//       toast.warn("Please select a size.", { autoClose: 1500 });
//       return;
//     }

//     if (isAlreadyAdded) {
//       toast.info("Product is already in your cart. Redirecting...", {
//         position: "top-center",
//         autoClose: 1500,
//         icon: "🛒",
//         onClose: () => navigate("/cart"),
//       });
//       return;
//     }

//     setIsAdding(true);

//     try {
//       const cartData = {
//         productId: product._id,
//         quantity: 1,
//         ...(product.sizes && selectedSize && { selectedSize }),
//       };

//       await api.post(`/cart/add`, cartData);

//       toast.success(`${product.name} added to cart!`, {
//         position: "top-center",
//         autoClose: 1500,
//         icon: "🛍️",
//         onClose: () => {
//           fetchCart();
//           navigate("/cart");
//         },
//       });
//     } catch (err) {
//       const status = err.response?.status;

//       if (status === 401) {
//         toast.warn("Please log in to add items to your cart.", {
//           position: "top-center",
//           autoClose: 1500,
//           onClose: () => navigate("/login"),
//         });
//         return;
//       }

//       toast.error(
//         err.response?.data?.message || "Failed to add product to cart.",
//         { position: "top-center", autoClose: 3000 }
//       );
//     } finally {
//       setIsAdding(false);
//     }
//   };
//   // --- END EXISTING LOGIC ---

//   // -------------------------------------------
//   // Render UI
//   // -------------------------------------------
//   if (loading)
//     return (
//       <div className="w-full h-[60vh] flex justify-center items-center">
//         <BeatLoader color="#4f8a4c" size={15} />
//       </div>
//     );

//   if (error)
//     return (
//       <div className="text-center py-20 text-xl text-red-600 font-semibold">
//         {error}
//       </div>
//     );

//   if (!product)
//     return (
//       <div className="text-center py-20 text-xl text-gray-600 font-semibold">
//         Product details unavailable.
//       </div>
//     );

//   const productImageSrc = product.image
//     ? product.image
//     : "https://via.placeholder.com/1000x1200?text=Product+Image+Unavailable";

//   const productPrice = product.price
//     ? `₹${product.price.toFixed(2)}`
//     : "Price Unavailable";
  
//   const formattedPrice = product.price ? `₹${(product.price / 4).toFixed(2)}` : 'N/A';
//   const paymentText = `or 4 payments of ${formattedPrice} by Afterpay / Sezzle`;

//   return (
//     <div className="bg-white">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
//         <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
          
//           {/* LEFT IMAGE GALLERY AREA (1/3 width on L, 2/3 on R) */}
//           {/* PRODUCT IMAGE SECTION */}
// <div className="lg:col-span-7 ">
//   <div className="w-full h-[650px] lg:h-[750px] overflow-hidden rounded-md bg-gray-100 shadow-sm">
//     <img
//       src={productImageSrc}
//       alt={product.name}
//       className="w-full h-full object-cover object-center"
//     />
//   </div>
// </div>


//           {/* RIGHT DETAILS/ORDERING AREA */}
//           <div className="lg:col-span-5 mt-10 lg:mt-0 lg:sticky lg:top-8 lg:h-fit">
            
//             {/* WISHLIST BUTTON (Top Right) */}
//             <div className="flex justify-end">
//                 <button
//                     type="button"
//                     onClick={handleToggleWishlist}
//                     disabled={isWishlistToggling || !user.isAuthenticated}
//                     aria-label={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
//                     className={classNames(
//                         "p-2 rounded-full",
//                         isInWishlist
//                             ? "text-red-500 hover:text-red-600"
//                             : "text-gray-400 hover:text-red-500",
//                         "transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                     )}
//                 >
//                     {isInWishlist ? (
//                         <HeartIconSolid className="h-6 w-6" aria-hidden="true" />
//                     ) : (
//                         <HeartIcon className="h-6 w-6" aria-hidden="true" />
//                     )}
//                 </button>
//             </div>

//             {/* Product Header and Price */}
//             <div className="mt-2">
//               <span className="text-sm font-semibold tracking-wider uppercase text-gray-500">
//                 New Season
//               </span>
//               <h1 className="mt-1 text-3xl sm:text-4xl font-light tracking-tight text-gray-900 leading-snug">
//                 {product.name}
//               </h1>

//               <p className="mt-4 text-3xl font-medium text-gray-900">
//                 {productPrice}
//               </p>
              
//               {/* Payment Placeholder */}
//               <p className="mt-2 text-sm text-gray-600 font-light">
//                 {paymentText}
//               </p>

//               {/* Reviews */}
//               <div className="mt-2 flex items-center space-x-2 border-b border-gray-100 pb-4">
//                 <div className="flex items-center text-yellow-500">
//                   {[...Array(5)].map((_, i) => (
//                     <StarIcon
//                       key={i}
//                       className={classNames(
//                         i < DUMMY_REVIEWS.average
//                           ? "text-yellow-500"
//                           : "text-gray-300",
//                         "w-4 h-4 flex-shrink-0"
//                       )}
//                     />
//                   ))}
//                 </div>
//                 <p className="text-xs text-gray-500">
//                   ({DUMMY_REVIEWS.totalCount} reviews)
//                 </p>
//               </div>
//             </div>

//             {/* FORM / ORDERING */}
//             <form onSubmit={handleAddToCart} className="mt-6">
              
//               {/* SIZE Selector */}
//               {product.sizes?.length > 0 && (
//                 <div className="mb-6">
//                   <div className="flex items-center justify-between mb-3">
//                     <legend className="text-sm font-medium text-gray-700 uppercase tracking-widest">
//                       Size:
//                     </legend>
//                     <Link
//                       to="#"
//                       onClick={(e) => { e.preventDefault(); toast.info("Size guide feature coming soon!", { autoClose: 1500 }); }}
//                       className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
//                     >
//                       View Size Guide
//                     </Link>
//                   </div>
//                   <div className="flex flex-wrap gap-2">
//                     {product.sizes.map((size) => (
//                       <div
//                         key={size.name}
//                         onClick={() => handleSizeClick(size.name)}
//                         className={classNames(
//                           selectedSize === size.name
//                             ? "ring-1 ring-black bg-black text-white"
//                             : "border-gray-300 text-gray-900 hover:border-gray-900",
//                           "border rounded-full py-2 px-4 text-sm font-medium cursor-pointer transition duration-150 ease-in-out select-none"
//                         )}
//                       >
//                         {size.name}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Add to Bag Button */}
//               <button
//                 type="submit"
//                 disabled={
//                   isAdding || (product.sizes?.length > 0 && !selectedSize)
//                 }
//                 className={classNames(
//                   "bg-black hover:bg-gray-800",
//                   "w-full rounded-none px-8 py-3 text-lg font-medium text-white uppercase tracking-wider transition duration-200 ease-in-out shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
//                 )}
//               >
//                 {isAdding
//                   ? "Processing..."
//                   : isAlreadyAdded
//                   ? "Go to Cart"
//                   : "Add to Bag"}
//               </button>

//               {/* Delivery Info */}
//               <p className="mt-4 text-center text-sm text-gray-500">
//                 {deliveryInfo}
//               </p>
//             </form>

//             {/* PRODUCT DETAILS ACCORDION STYLE */}
//             <div className="mt-10 divide-y divide-gray-200">
//                 {/* Product Description */}
//                 <div className="py-4">
//                     <button
//                         className="flex w-full items-center justify-between text-left text-gray-400 hover:text-gray-500"
//                         onClick={() => setOpenDetail(openDetail === 'description' ? null : 'description')}
//                     >
//                         <span className="text-base font-medium text-gray-900">
//                             Product Description
//                         </span>
//                         <ChevronDownIcon
//                             className={classNames(
//                                 openDetail === 'description' ? '-rotate-180' : 'rotate-0',
//                                 'h-5 w-5 transform transition duration-200'
//                             )}
//                         />
//                     </button>
//                     {openDetail === 'description' && (
//                         <div className="pt-4 pb-2">
//                             <p className="text-sm text-gray-600 leading-relaxed">
//                                 {product.description ||
//                                     "Indulge in timeless elegance. This product features a sophisticated blend of classic design and modern comfort, crafted to be a lasting addition to your collection. Fall/Winter 2025."}
//                             </p>
//                         </div>
//                     )}
//                 </div>

//                 {/* Product Details (Fabric & Care) */}
//                 <div className="py-4">
//                     <button
//                         className="flex w-full items-center justify-between text-left text-gray-400 hover:text-gray-500"
//                         onClick={() => setOpenDetail(openDetail === 'details' ? null : 'details')}
//                     >
//                         <span className="text-base font-medium text-gray-900">
//                             Product Details
//                         </span>
//                         <ChevronDownIcon
//                             className={classNames(
//                                 openDetail === 'details' ? '-rotate-180' : 'rotate-0',
//                                 'h-5 w-5 transform transition duration-200'
//                             )}
//                         />
//                     </button>
//                     {openDetail === 'details' && (
//                         <div className="pt-4 pb-2">
//                             <ul className="space-y-2 text-sm text-gray-600 list-disc ml-5">
//                                 <li>Material: 100% Pure Handloom Cotton/Silk (Placeholder)</li>
//                                 <li>Care: Dry clean only or gentle hand wash.</li>
//                                 <li>Origin: Sourced from local artisans in India.</li>
//                                 <li>SKU: {product._id.substring(0, 10).toUpperCase()}...</li>
//                             </ul>
//                         </div>
//                     )}
//                 </div>
                
//                 {/* Our Commitment (Placeholder) */}
//                 <div className="py-4">
//                     <button
//                         className="flex w-full items-center justify-between text-left text-gray-400 hover:text-gray-500"
//                         onClick={() => setOpenDetail(openDetail === 'commitment' ? null : 'commitment')}
//                     >
//                         <span className="text-base font-medium text-gray-900">
//                             Our Commitment
//                         </span>
//                         <ChevronDownIcon
//                             className={classNames(
//                                 openDetail === 'commitment' ? '-rotate-180' : 'rotate-0',
//                                 'h-5 w-5 transform transition duration-200'
//                             )}
//                         />
//                     </button>
//                     {openDetail === 'commitment' && (
//                         <div className="pt-4 pb-2">
//                             <p className="text-sm text-gray-600">
//                                 This item meets our standards for sustainability and ethical sourcing. We offer a 30-day return policy.
//                             </p>
//                         </div>
//                     )}
//                 </div>
//             </div>
//           </div>
//         </div>
//       </div>

      

//       {relatedProducts.length > 0 && (
//   <div className="w-full px-2 sm:px-4 md:px-6 lg:px-25 mt-20 mb-24">
//     <h2 className="text-2xl font-bold text-gray-900 mb-8">
//       Related Products
//     </h2>

//     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
//       {relatedProducts.map((item) => (
//         <ProductCard key={item._id} product={item} />
//       ))}
//     </div>
//   </div>
// )}



//       <ToastContainer
//         position="top-center"
//         autoClose={2000}
//         hideProgressBar={false}
//         pauseOnHover
//         theme="colored"
//         transition={Slide}
//       />
//     </div>
//   );
// }






//copy of the above code to activate quantity


// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { StarIcon } from "@heroicons/react/20/solid";
// import {
//   HeartIcon, // Outline icon for not-in-wishlist
//   ChevronDownIcon, // For the accordion details
// } from "@heroicons/react/24/outline";
// import { HeartIcon as HeartIconSolid } from "@heroicons/react/20/solid"; // Solid icon for in-wishlist

// import api from "../utils/api";
// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishlistContext";
// import { ToastContainer, toast, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useAuth } from "../context/AuthContext";
// import { BeatLoader } from "react-spinners";
// import ProductCard from "../cart/ProductCard";

// // NOTE: domainUrl is not used in the final JSX but kept in imports.
// // NOTE: deliveryInfo, DUMMY_REVIEWS are kept for existing feature parity.

// const DUMMY_REVIEWS = { average: 4, totalCount: 1624 };
// const deliveryInfo =
//   "Standard delivery (5-7 days) | Free shipping on orders over ₹100";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function ProductDetailPage() {
//   const { productId } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isAdding, setIsAdding] = useState(false);
//   const [isAlreadyAdded, setIsAlreadyAdded] = useState(false);
//   const [isWishlistToggling, setIsWishlistToggling] = useState(false);
//   const [openDetail, setOpenDetail] = useState("description"); // State for accordion
//   const [relatedProducts, setRelatedProducts] = useState([]); // ← NEW

//   const { cartItems, fetchCart } = useCart();
//   const { user } = useAuth();
//   const { isProductInWishlist, toggleWishlist } = useWishlist();

//   const isInWishlist = product ? isProductInWishlist(product._id) : false;

//   // --- Utility for Placeholder Size Feature ---
//   const handleSizeClick = (sizeName) => {
//     // Only update state if size is actually available
//     setSelectedSize(sizeName); 
//     toast.info("This feature is not available yet", { autoClose: 1500 });
//   };

//   // -------------------------------------------
//   // Wishlist Handler
//   // -------------------------------------------
//   const handleToggleWishlist = async () => {
//     if (!product || isWishlistToggling || !user.isAuthenticated) {
//       if (!user.isAuthenticated) {
//         toast.warn("Please log in to add items to your wishlist.", {
//           position: "top-center",
//           autoClose: 1500,
//           onClose: () => navigate("/login"),
//         });
//       }
//       return;
//     }

//     setIsWishlistToggling(true);
//     const success = await toggleWishlist(product._id, isInWishlist);

//     if (success) {
//       toast.success(
//         isInWishlist ? "Removed from Wishlist" : "Added to Wishlist!",
//         { position: "top-right", autoClose: 1500, icon: "💖" }
//       );
//     } else {
//       toast.error(
//         `Failed to ${isInWishlist ? "remove from" : "add to"} Wishlist.`,
//         { position: "top-right", autoClose: 3000 }
//       );
//     }

//     setIsWishlistToggling(false);
//   };

//   // --- EXISTING LOGIC (omitted for brevity, assume it's still here) ---

//   // FIX FOR FORWARD/BACK BUTTON CACHE ISSUE
//   useEffect(() => {
//     if (!user.isAuthenticated && !user.isInitialLoad) {
//       window.history.pushState(null, "", window.location.href);

//       const handlePopState = () => {
//         navigate(0);
//       };

//       window.addEventListener("popstate", handlePopState);

//       return () => {
//         window.removeEventListener("popstate", handlePopState);
//       };
//     }
//   }, [user.isAuthenticated, user.isInitialLoad, navigate]);

//   useEffect(() => {
//     window.addEventListener("pageshow", (event) => {
//       if (event.persisted) {
//         navigate(0);
//       }
//     });
//   }, [navigate]);

//   // PROTECT PAGE WHEN USER LOGGED OUT
//   useEffect(() => {
//     if (!user.isInitialLoad && !user.isAuthenticated) {
//       navigate("/login", { replace: true });
//     }
//   }, [user.isInitialLoad, user.isAuthenticated, navigate]);

//   // Fetch Product
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         const res = await api.get(`/user/shop/product/${productId}`);
//         const fetchedProduct = res.data.product;
//         setRelatedProducts(res.data.relatedProducts || []); // ← NEW

//         setProduct(fetchedProduct);

//         if (fetchedProduct.sizes?.length > 0) {
//           setSelectedSize(null);
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

//   // Check if in cart already
//   useEffect(() => {
//     if (cartItems) {
//       const exists = cartItems.some((item) => item.productId === productId);
//       setIsAlreadyAdded(exists);
//     } else {
//       setIsAlreadyAdded(false);
//     }
//   }, [cartItems, productId]);

//   // Add to Cart
//   const handleAddToCart = async (e) => {
//     e.preventDefault();

//     if (product.stock <= 0) {
//   toast.error("Sorry, this product is out of stock.", {
//     autoClose: 1500,
//   });
//   return;
// }


//     if (!product || isAdding) return;

//     if (product.sizes?.length > 0 && !selectedSize) {
//       toast.warn("Please select a size.", { autoClose: 1500 });
//       return;
//     }

//     if (isAlreadyAdded) {
//       toast.info("Product is already in your cart. Redirecting...", {
//         position: "top-center",
//         autoClose: 1500,
//         icon: "🛒",
//         onClose: () => navigate("/cart"),
//       });
//       return;
//     }

//     setIsAdding(true);

//     try {
//       const cartData = {
//         productId: product._id,
//         quantity: 1,
//         ...(product.sizes && selectedSize && { selectedSize }),
//       };

//       await api.post(`/cart/add`, cartData);

//       toast.success(`${product.name} added to cart!`, {
//         position: "top-center",
//         autoClose: 1500,
//         icon: "🛍️",
//         onClose: () => {
//           fetchCart();
//           navigate("/cart");
//         },
//       });
//     } catch (err) {
//       const status = err.response?.status;

//       if (status === 401) {
//         toast.warn("Please log in to add items to your cart.", {
//           position: "top-center",
//           autoClose: 1500,
//           onClose: () => navigate("/login"),
//         });
//         return;
//       }

//       toast.error(
//         err.response?.data?.message || "Failed to add product to cart.",
//         { position: "top-center", autoClose: 3000 }
//       );
//     } finally {
//       setIsAdding(false);
//     }
//   };
//   // --- END EXISTING LOGIC ---

//   // -------------------------------------------
//   // Render UI
//   // -------------------------------------------
//   if (loading)
//     return (
//       <div className="w-full h-[60vh] flex justify-center items-center">
//         <BeatLoader color="#4f8a4c" size={15} />
//       </div>
//     );

//   if (error)
//     return (
//       <div className="text-center py-20 text-xl text-red-600 font-semibold">
//         {error}
//       </div>
//     );

//   if (!product)
//     return (
//       <div className="text-center py-20 text-xl text-gray-600 font-semibold">
//         Product details unavailable.
//       </div>
//     );

//   const productImageSrc = product.image
//     ? product.image
//     : "https://via.placeholder.com/1000x1200?text=Product+Image+Unavailable";

//   const productPrice = product.price
//     ? `₹${product.price.toFixed(2)}`
//     : "Price Unavailable";

//     const stock = product.stock ?? 0;
// const isOutOfStock = stock <= 0;
// const isLowStock = stock > 0 && stock <= 5;

  
//   const formattedPrice = product.price ? `₹${(product.price / 4).toFixed(2)}` : 'N/A';
//   const paymentText = `or 4 payments of ${formattedPrice} by Afterpay / Sezzle`;

//   return (
//     <div className="bg-white">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
//         <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
          
//           {/* LEFT IMAGE GALLERY AREA (1/3 width on L, 2/3 on R) */}
//           {/* PRODUCT IMAGE SECTION */}
// <div className="lg:col-span-7 ">
//   <div className="w-full h-[650px] lg:h-[750px] overflow-hidden rounded-md bg-gray-100 shadow-sm">
//     <img
//       src={productImageSrc}
//       alt={product.name}
//       className="w-full h-full object-cover object-center"
//     />
//   </div>
// </div>


//           {/* RIGHT DETAILS/ORDERING AREA */}
//           <div className="lg:col-span-5 mt-10 lg:mt-0 lg:sticky lg:top-8 lg:h-fit">
            
//             {/* WISHLIST BUTTON (Top Right) */}
//             <div className="flex justify-end">
//                 <button
//                     type="button"
//                     onClick={handleToggleWishlist}
//                     disabled={isWishlistToggling || !user.isAuthenticated}
//                     aria-label={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
//                     className={classNames(
//                         "p-2 rounded-full",
//                         isInWishlist
//                             ? "text-red-500 hover:text-red-600"
//                             : "text-gray-400 hover:text-red-500",
//                         "transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                     )}
//                 >
//                     {isInWishlist ? (
//                         <HeartIconSolid className="h-6 w-6" aria-hidden="true" />
//                     ) : (
//                         <HeartIcon className="h-6 w-6" aria-hidden="true" />
//                     )}
//                 </button>
//             </div>

//             {/* Product Header and Price */}
//             <div className="mt-2">
//               <span className="text-sm font-semibold tracking-wider uppercase text-gray-500">
//                 New Season
//               </span>
//               <h1 className="mt-1 text-3xl sm:text-4xl font-light tracking-tight text-gray-900 leading-snug">
//                 {product.name}
//               </h1>

//               <p className="mt-4 text-3xl font-medium text-gray-900">
//                 {productPrice}
//               </p>

//               {/* Stock Status */}
// <div className="mt-2">
//   {isOutOfStock ? (
//     <p className="text-sm font-semibold text-red-600">
//       Out of Stock
//     </p>
//   ) : isLowStock ? (
//     <p className="text-sm font-medium text-orange-600">
//       Hurry! Only {stock} left
//     </p>
//   ) : (
//     <p className="text-sm font-medium text-green-600">
//       In Stock
//     </p>
//   )}
// </div>

              
//               {/* Payment Placeholder */}
//               <p className="mt-2 text-sm text-gray-600 font-light">
//                 {paymentText}
//               </p>

//               {/* Reviews */}
//               <div className="mt-2 flex items-center space-x-2 border-b border-gray-100 pb-4">
//                 <div className="flex items-center text-yellow-500">
//                   {[...Array(5)].map((_, i) => (
//                     <StarIcon
//                       key={i}
//                       className={classNames(
//                         i < DUMMY_REVIEWS.average
//                           ? "text-yellow-500"
//                           : "text-gray-300",
//                         "w-4 h-4 flex-shrink-0"
//                       )}
//                     />
//                   ))}
//                 </div>
//                 <p className="text-xs text-gray-500">
//                   ({DUMMY_REVIEWS.totalCount} reviews)
//                 </p>
//               </div>
//             </div>

//             {/* FORM / ORDERING */}
//             <form onSubmit={handleAddToCart} className="mt-6">
              
//               {/* SIZE Selector */}
//               {product.sizes?.length > 0 && (
//                 <div className="mb-6">
//                   <div className="flex items-center justify-between mb-3">
//                     <legend className="text-sm font-medium text-gray-700 uppercase tracking-widest">
//                       Size:
//                     </legend>
//                     <Link
//                       to="#"
//                       onClick={(e) => { e.preventDefault(); toast.info("Size guide feature coming soon!", { autoClose: 1500 }); }}
//                       className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
//                     >
//                       View Size Guide
//                     </Link>
//                   </div>
//                   <div className="flex flex-wrap gap-2">
//                     {product.sizes.map((size) => (
//                       <div
//                         key={size.name}
//                         onClick={() => handleSizeClick(size.name)}
//                         className={classNames(
//                           selectedSize === size.name
//                             ? "ring-1 ring-black bg-black text-white"
//                             : "border-gray-300 text-gray-900 hover:border-gray-900",
//                           "border rounded-full py-2 px-4 text-sm font-medium cursor-pointer transition duration-150 ease-in-out select-none"
//                         )}
//                       >
//                         {size.name}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Add to Bag Button */}
//               <button
//                 type="submit"
//                disabled={
//   isAdding ||
//   isOutOfStock ||
//   (product.sizes?.length > 0 && !selectedSize)
// }

//                 className={classNames(
//                   "bg-black hover:bg-gray-800",
//                   "w-full rounded-none px-8 py-3 text-lg font-medium text-white uppercase tracking-wider transition duration-200 ease-in-out shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
//                 )}
//               >
                
//                   {isOutOfStock
//   ? "Out of Stock"
//   : isAdding
//   ? "Processing..."
//   : isAlreadyAdded
//   ? "Go to Cart"
//   : "Add to Bag"}

//               </button>

//               {/* Delivery Info */}
//               <p className="mt-4 text-center text-sm text-gray-500">
//                 {deliveryInfo}
//               </p>
//             </form>

//             {/* PRODUCT DETAILS ACCORDION STYLE */}
//             <div className="mt-10 divide-y divide-gray-200">
//                 {/* Product Description */}
//                 <div className="py-4">
//                     <button
//                         className="flex w-full items-center justify-between text-left text-gray-400 hover:text-gray-500"
//                         onClick={() => setOpenDetail(openDetail === 'description' ? null : 'description')}
//                     >
//                         <span className="text-base font-medium text-gray-900">
//                             Product Description
//                         </span>
//                         <ChevronDownIcon
//                             className={classNames(
//                                 openDetail === 'description' ? '-rotate-180' : 'rotate-0',
//                                 'h-5 w-5 transform transition duration-200'
//                             )}
//                         />
//                     </button>
//                     {openDetail === 'description' && (
//                         <div className="pt-4 pb-2">
//                             <p className="text-sm text-gray-600 leading-relaxed">
//                                 {product.description ||
//                                     "Indulge in timeless elegance. This product features a sophisticated blend of classic design and modern comfort, crafted to be a lasting addition to your collection. Fall/Winter 2025."}
//                             </p>
//                         </div>
//                     )}
//                 </div>

//                 {/* Product Details (Fabric & Care) */}
//                 <div className="py-4">
//                     <button
//                         className="flex w-full items-center justify-between text-left text-gray-400 hover:text-gray-500"
//                         onClick={() => setOpenDetail(openDetail === 'details' ? null : 'details')}
//                     >
//                         <span className="text-base font-medium text-gray-900">
//                             Product Details
//                         </span>
//                         <ChevronDownIcon
//                             className={classNames(
//                                 openDetail === 'details' ? '-rotate-180' : 'rotate-0',
//                                 'h-5 w-5 transform transition duration-200'
//                             )}
//                         />
//                     </button>
//                     {openDetail === 'details' && (
//                         <div className="pt-4 pb-2">
//                             <ul className="space-y-2 text-sm text-gray-600 list-disc ml-5">
//                                 <li>Material: 100% Pure Handloom Cotton/Silk (Placeholder)</li>
//                                 <li>Care: Dry clean only or gentle hand wash.</li>
//                                 <li>Origin: Sourced from local artisans in India.</li>
//                                 <li>SKU: {product._id.substring(0, 10).toUpperCase()}...</li>
//                             </ul>
//                         </div>
//                     )}
//                 </div>
                
//                 {/* Our Commitment (Placeholder) */}
//                 <div className="py-4">
//                     <button
//                         className="flex w-full items-center justify-between text-left text-gray-400 hover:text-gray-500"
//                         onClick={() => setOpenDetail(openDetail === 'commitment' ? null : 'commitment')}
//                     >
//                         <span className="text-base font-medium text-gray-900">
//                             Our Commitment
//                         </span>
//                         <ChevronDownIcon
//                             className={classNames(
//                                 openDetail === 'commitment' ? '-rotate-180' : 'rotate-0',
//                                 'h-5 w-5 transform transition duration-200'
//                             )}
//                         />
//                     </button>
//                     {openDetail === 'commitment' && (
//                         <div className="pt-4 pb-2">
//                             <p className="text-sm text-gray-600">
//                                 This item meets our standards for sustainability and ethical sourcing. We offer a 30-day return policy.
//                             </p>
//                         </div>
//                     )}
//                 </div>
//             </div>
//           </div>
//         </div>
//       </div>

      

//       {relatedProducts.length > 0 && (
//   <div className="w-full px-2 sm:px-4 md:px-6 lg:px-25 mt-20 mb-24">
//     <h2 className="text-2xl font-bold text-gray-900 mb-8">
//       Related Products
//     </h2>

//     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
//       {relatedProducts.map((item) => (
//         <ProductCard key={item._id} product={item} />
//       ))}
//     </div>
//   </div>
// )}



//       <ToastContainer
//         position="top-center"
//         autoClose={2000}
//         hideProgressBar={false}
//         pauseOnHover
//         theme="colored"
//         transition={Slide}
//       />
//     </div>
//   );
// }

// // new ui with functional tailwind ui of product detail pagees



// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Disclosure,
//   DisclosureButton,
//   DisclosurePanel,
// } from "@headlessui/react";
// import { 
//   MinusIcon, 
//   PlusIcon, 
//   ArrowLeftIcon 
// } from "@heroicons/react/24/outline";
// import { HeartIcon } from "@heroicons/react/24/outline";
// import { HeartIcon as HeartIconSolid } from "@heroicons/react/20/solid";
// import { BeatLoader } from "react-spinners";
// import toast, { Toaster, } from 'react-hot-toast';

// // Context & Utils
// import api from "../utils/api";
// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishlistContext";
// import { useAuth } from "../context/AuthContext";
// import ProductCard from "../cart/ProductCard";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// const STATIC_DETAILS = [
//   {
//     name: "Features",
//     items: [
//       "Premium quality material",
//       "Designed for daily use",
//       "Comfortable fit",
//       "Durable construction",
//     ],
//   },
//   {
//     name: "Shipping & Returns",
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
//   const [selectedSize, setSelectedSize] = useState(null);
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

//   // --- Logic: Handle Browser Back Button Cache ---
//   useEffect(() => {
//     if (!user.isAuthenticated && !user.isInitialLoad) {
//       window.history.pushState(null, "", window.location.href);
//       const handlePopState = () => navigate(0);
//       window.addEventListener("popstate", handlePopState);
//       return () => window.removeEventListener("popstate", handlePopState);
//     }
//   }, [user.isAuthenticated, user.isInitialLoad, navigate]);

//   // --- Logic: Fetch Product ---
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         const res = await api.get(`/user/shop/product/${productId}`);
//         setProduct(res.data.product);
//         setRelatedProducts(res.data.relatedProducts || []);
//         if (res.data.product.sizes?.length > 0) {
//           setSelectedSize(null);
//         }
//       } catch (err) {
//         setError(err.response?.status === 404 ? "Product not found" : "Error loading product");
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (productId) fetchProduct();
//   }, [productId]);

//   // --- Logic: Check if in Cart ---
//   useEffect(() => {
//     if (cartItems) {
//       setIsAlreadyAdded(cartItems.some((item) => item.productId === productId));
//     }
//   }, [cartItems, productId]);

//   // --- Logic: Add to Cart ---
//   const handleAddToCart = async (e) => {
//     e.preventDefault();
//     if (product.stock <= 0) return toast.error("Sorry, this product is out of stock.");
//     if (product.sizes?.length > 0 && !selectedSize) return toast.warn("Please select a size.");
//     if (isAlreadyAdded) return navigate("/cart");

//     setIsAdding(true);
//     try {
//       const cartData = {
//         productId: product._id,
//         quantity: 1,
//         ...(product.sizes && selectedSize && { selectedSize }),
//       };
//       await api.post(`/cart/add`, cartData);
//       toast.success(`${product.name} added to cart!`, {
//         onClose: () => {
//           fetchCart();
//           navigate("/cart");
//         },
//       });
//     } catch (err) {
//         if (err.response?.status === 401) {
//             toast.warn("Please log in first", { onClose: () => navigate("/login") });
//         } else {
//             toast.error("Failed to add to cart");
//         }
//     } finally {
//       setIsAdding(false);
//     }
//   };

//   // --- Logic: Wishlist Toggle ---
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

//   if (loading) return <div className="h-[60vh] flex justify-center items-center"><BeatLoader color="#000" /></div>;
//   if (error || !product) return <div className="text-center py-20 text-red-600 font-semibold">{error || "Unavailable"}</div>;

//   // --- Stock Logic (Matches your previous code) ---
//   const productImageSrc = product.image || "https://via.placeholder.com/1000x1000?text=No+Image";
//   const stock = product.stock ?? 0;
//   const isOutOfStock = stock <= 0;
//   const isLowStock = stock > 0 && stock <= 5;

//   return (
//     <div className="bg-white">
//       {/* Heading and Back Button */}
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-4 flex items-center gap-4">
//         <button 
//           onClick={() => navigate(-1)} 
//           className="p-2 rounded-full hover:bg-gray-100 transition-colors"
//         >
//           <ArrowLeftIcon className="h-6 w-6 text-gray-900" />
//         </button>
//         <h1 className="text-xl font-bold tracking-tight text-gray-900">Shop</h1>
//       </div>

//       <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
//         <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          
//           {/* Image Section */}
//           <div className="flex flex-col-reverse">
//             <div className="aspect-square w-full">
//               <img
//                 alt={product.name}
//                 src={productImageSrc}
//                 className="h-full w-full object-cover object-center sm:rounded-lg bg-gray-100"
//               />
//             </div>
//           </div>

//           {/* Product Info */}
//           <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
//             <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>

//             <div className="mt-3">
//               <h2 className="sr-only">Product information</h2>
//               <p className="text-3xl tracking-tight text-gray-900">₹{product.price.toFixed(2)}</p>
//             </div>

//             {/* STOCK DISPLAY - Added specifically here */}
//             <div className="mt-2">
//                 {isOutOfStock ? (
//                     <p className="text-sm font-semibold text-red-600">Out of Stock</p>
//                 ) : isLowStock ? (
//                     <p className="text-sm font-medium text-orange-600">Hurry! Only {stock} left</p>
//                 ) : (
//                     <p className="text-sm font-medium text-green-600">In Stock</p>
//                 )}
//             </div>

//             <div className="mt-6">
//               <h3 className="sr-only">Description</h3>
//               <div
//                 className="space-y-6 text-base text-gray-700"
//                 dangerouslySetInnerHTML={{ __html: product.description || "<p>No description available.</p>" }}
//               />
//             </div>

//             <form className="mt-6" onSubmit={handleAddToCart}>
//               {/* Size Selector */}
//               {product.sizes?.length > 0 && (
//                 <div className="mb-8">
//                     <h3 className="text-sm font-medium text-gray-900">Size</h3>
//                     <div className="mt-2 flex gap-2">
//                         {product.sizes.map((size) => (
//                         <div
//                             key={size.name}
//                             onClick={() => setSelectedSize(size.name)}
//                             className={classNames(
//                                 selectedSize === size.name
//                                     ? "bg-black text-white ring-2 ring-black ring-offset-2"
//                                     : "bg-white text-gray-900 ring-1 ring-gray-200 hover:bg-gray-50",
//                                 "cursor-pointer rounded-md px-3 py-2 text-sm font-semibold uppercase sm:flex-1 text-center shadow-sm"
//                             )}
//                         >
//                             {size.name}
//                         </div>
//                         ))}
//                     </div>
//                 </div>
//               )}

//               <div className="flex">
//                 {/* Black Add to Bag Button with Out of Stock Logic */}
//                 <button
//                   type="submit"
//                   disabled={isAdding || isOutOfStock || (product.sizes?.length > 0 && !selectedSize)}
//                   className={classNames(
//                       "flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-full",
//                       (isOutOfStock || isAdding) 
//                         ? "bg-gray-400 cursor-not-allowed" 
//                         : "bg-black hover:bg-gray-800 focus:ring-black"
//                   )}
//                 >
//                   {isAdding 
//                     ? "Processing..." 
//                     : isOutOfStock 
//                         ? "Out of Stock" 
//                         : isAlreadyAdded 
//                             ? "Go to Cart" 
//                             : "Add to bag"}
//                 </button>

//                 <button
//                   type="button"
//                   onClick={handleToggleWishlist}
//                   disabled={isWishlistToggling}
//                   className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
//                 >
//                    {isInWishlist ? (
//                       <HeartIconSolid className="h-6 w-6 text-red-500" aria-hidden="true" />
//                    ) : (
//                       <HeartIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
//                    )}
//                   <span className="sr-only">Add to favorites</span>
//                 </button>
//               </div>
//             </form>

//             {/* Accordions */}
//             <section aria-labelledby="details-heading" className="mt-12">
//               <h2 id="details-heading" className="sr-only">Additional details</h2>
//               <div className="divide-y divide-gray-200 border-t border-gray-200">
                
//                 {/* Product Details Accordion */}
//                 <Disclosure as="div">
//                     {({ open }) => (
//                         <>
//                         <h3>
//                             <DisclosureButton className="group relative flex w-full items-center justify-between py-6 text-left">
//                             <span className={classNames(open ? 'text-indigo-600' : 'text-gray-900', 'text-sm font-medium')}>
//                                 Product Details
//                             </span>
//                             <span className="ml-6 flex items-center">
//                                 {open ? (
//                                     <MinusIcon className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500" aria-hidden="true" />
//                                 ) : (
//                                     <PlusIcon className="block h-6 w-6 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
//                                 )}
//                             </span>
//                             </DisclosureButton>
//                         </h3>
//                         <DisclosurePanel className="pb-6 prose prose-sm text-gray-500">
//                              <p>{product.description}</p>
//                         </DisclosurePanel>
//                         </>
//                     )}
//                 </Disclosure>

//                 {/* Static Accordions */}
//                 {STATIC_DETAILS.map((detail) => (
//                   <Disclosure key={detail.name} as="div">
//                      {({ open }) => (
//                         <>
//                         <h3>
//                             <DisclosureButton className="group relative flex w-full items-center justify-between py-6 text-left">
//                             <span className={classNames(open ? 'text-indigo-600' : 'text-gray-900', 'text-sm font-medium')}>
//                                 {detail.name}
//                             </span>
//                             <span className="ml-6 flex items-center">
//                                 {open ? (
//                                     <MinusIcon className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500" aria-hidden="true" />
//                                 ) : (
//                                     <PlusIcon className="block h-6 w-6 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
//                                 )}
//                             </span>
//                             </DisclosureButton>
//                         </h3>
//                         <DisclosurePanel className="pb-6">
//                             <ul role="list" className="list-disc space-y-1 pl-5 text-sm/6 text-gray-700 marker:text-gray-300">
//                             {detail.items.map((item) => (
//                                 <li key={item} className="pl-2">{item}</li>
//                             ))}
//                             </ul>
//                         </DisclosurePanel>
//                         </>
//                      )}
//                   </Disclosure>
//                 ))}
//               </div>
//             </section>
//           </div>
//         </div>
//       </div>

//       {/* Related Products */}
//       {relatedProducts.length > 0 && (
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10 mb-20">
//             <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
//             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
//             {relatedProducts.map((item) => (
//                 <ProductCard key={item._id} product={item} />
//             ))}
//             </div>
//         </div>
//       )}

//      <Toaster
//                                position="top-right"
//                                toastOptions={{
//                                  duration: 2000,
//                                  style: {
//                                    borderRadius: "10px",
//                                    fontFamily: "Inter, sans-serif",
//                                  },
//                                }}
//                              />
//     </div>
//   );
// }




//new update code with related product uiiiiiiiiiiiiiiiiii


// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Disclosure,
//   DisclosureButton,
//   DisclosurePanel,
// } from "@headlessui/react";
// import { 
//   MinusIcon, 
//   PlusIcon, 
//   ArrowLeftIcon 
// } from "@heroicons/react/24/outline";
// import { HeartIcon } from "@heroicons/react/24/outline";
// import { HeartIcon as HeartIconSolid } from "@heroicons/react/20/solid";
// import { BeatLoader } from "react-spinners";
// import toast, { Toaster } from 'react-hot-toast';

// // Context & Utils
// import api from "../utils/api";
// import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishlistContext";
// import { useAuth } from "../context/AuthContext";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// const STATIC_DETAILS = [
//   {
//     name: "Features",
//     items: [
//       "Premium quality material",
//       "Designed for daily use",
//       "Comfortable fit",
//       "Durable construction",
//     ],
//   },
//   {
//     name: "Shipping & Returns",
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

//   // --- Logic: Handle Browser Back Button Cache ---
//   useEffect(() => {
//     if (!user.isAuthenticated && !user.isInitialLoad) {
//       window.history.pushState(null, "", window.location.href);
//       const handlePopState = () => navigate(0);
//       window.addEventListener("popstate", handlePopState);
//       return () => window.removeEventListener("popstate", handlePopState);
//     }
//   }, [user.isAuthenticated, user.isInitialLoad, navigate]);

//   // --- Logic: Fetch Product ---
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         const res = await api.get(`/user/shop/product/${productId}`);
//         setProduct(res.data.product);
//         setRelatedProducts(res.data.relatedProducts || []);
//       } catch (err) {
//         setError(err.response?.status === 404 ? "Product not found" : "Error loading product");
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (productId) fetchProduct();
//   }, [productId]);

//   // --- Logic: Check if in Cart ---
//   useEffect(() => {
//     if (cartItems) {
//       setIsAlreadyAdded(cartItems.some((item) => item.productId === productId));
//     }
//   }, [cartItems, productId]);

//   // --- Logic: Add to Cart ---
//   const handleAddToCart = async (e) => {
//     e.preventDefault();
//     if (product.stock <= 0) return toast.error("Sorry, this product is out of stock.");
//     if (isAlreadyAdded) return navigate("/cart");

//     setIsAdding(true);
//     try {
//       const cartData = {
//         productId: product._id,
//         quantity: 1,
//       };
//       await api.post(`/cart/add`, cartData);
//       toast.success(`${product.name} added to cart!`, {
//         onClose: () => {
//           fetchCart();
//           navigate("/cart");
//         },
//       });
//     } catch (err) {
//         if (err.response?.status === 401) {
//             toast.warn("Please log in first", { onClose: () => navigate("/login") });
//         } else {
//             toast.error("Failed to add to cart");
//         }
//     } finally {
//       setIsAdding(false);
//     }
//   };

//   // --- Logic: Wishlist Toggle ---
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

//   if (loading) return <div className="h-[60vh] flex justify-center items-center"><BeatLoader color="#000" /></div>;
//   if (error || !product) return <div className="text-center py-20 text-red-600 font-semibold">{error || "Unavailable"}</div>;

//   // --- Stock Logic ---
//   const productImageSrc = product.image || "https://via.placeholder.com/1000x1000?text=No+Image";
//   const stock = product.stock ?? 0;
//   const isOutOfStock = stock <= 0;
//   const isLowStock = stock > 0 && stock <= 5;

//   return (
//     <div className="bg-white">
//       {/* Heading and Back Button */}
//       <div className="w-full px-4 sm:px-6 lg:px-8 pt-8 pb-4 flex items-center gap-4">
//   {/* <button 
//     onClick={() => navigate(-1)} 
//     className="p-2 rounded-full hover:bg-gray-100 transition-colors"
//   >
//     <ArrowLeftIcon className="h-6 w-6 text-gray-900" />
//   </button> */}

//    <button
//                   onClick={()=> navigate(-1)}
//                   className="flex items-center justify-center h-8 w-8 bg-white rounded-full shadow-sm border border-gray-200 hover:bg-gray-50 mr-3 transition-colors"
//                 >
//                   <ArrowLeftIcon className="h-4 w-4 text-gray-700" />
//                 </button>
//   <h1 className="text-2xl font-bold tracking-tight text-gray-900">Products</h1>
// </div>

//       <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
//         <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          
//           {/* Image Section */}
//           <div className="flex flex-col-reverse">
//             <div className="aspect-square w-full">
//               <img
//                 alt={product.name}
//                 src={productImageSrc}
//                 className="h-full w-full object-cover object-center sm:rounded-lg bg-gray-100"
//               />
//             </div>
//           </div>

//           {/* Product Info */}
//           <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
//             <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>

//             <div className="mt-3">
//               <h2 className="sr-only">Product information</h2>
//               <p className="text-3xl tracking-tight text-gray-900">₹{product.price.toFixed(2)}</p>
//             </div>

//             {/* STOCK DISPLAY */}
//             <div className="mt-2">
//                 {isOutOfStock ? (
//                     <p className="text-sm font-semibold text-red-600">Out of Stock</p>
//                 ) : isLowStock ? (
//                     <p className="text-sm font-medium text-orange-600">Hurry! Only {stock} left</p>
//                 ) : (
//                     <p className="text-sm font-medium text-green-600">In Stock</p>
//                 )}
//             </div>

//             <div className="mt-6">
//               <h3 className="sr-only">Description</h3>
//               <div
//                 className="space-y-6 text-base text-gray-700"
//                 dangerouslySetInnerHTML={{ __html: product.description || "<p>No description available.</p>" }}
//               />
//             </div>

//             <form className="mt-6" onSubmit={handleAddToCart}>
//               {/* REMOVED SIZE SELECTOR HERE */}

//               <div className="flex">
//                 {/* Black Add to Bag Button with Out of Stock Logic */}
//                 <button
//                   type="submit"
//                   disabled={isAdding || isOutOfStock}
//                   className={classNames(
//                       "flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-full",
//                       (isOutOfStock || isAdding) 
//                         ? "bg-gray-400 cursor-not-allowed" 
//                         : "bg-black hover:bg-gray-800 focus:ring-black"
//                   )}
//                 >
//                   {isAdding 
//                     ? "Processing..." 
//                     : isOutOfStock 
//                         ? "Out of Stock" 
//                         : isAlreadyAdded 
//                             ? "Go to Cart" 
//                             : "Add to bag"}
//                 </button>

//                 <button
//                   type="button"
//                   onClick={handleToggleWishlist}
//                   disabled={isWishlistToggling}
//                   className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
//                 >
//                    {isInWishlist ? (
//                       <HeartIconSolid className="h-6 w-6 text-red-500" aria-hidden="true" />
//                    ) : (
//                       <HeartIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
//                    )}
//                   <span className="sr-only">Add to favorites</span>
//                 </button>
//               </div>
//             </form>

//             {/* Accordions */}
//             <section aria-labelledby="details-heading" className="mt-12">
//               <h2 id="details-heading" className="sr-only">Additional details</h2>
//               <div className="divide-y divide-gray-200 border-t border-gray-200">
                
//                 {/* Product Details Accordion */}
//                 <Disclosure as="div">
//                     {({ open }) => (
//                         <>
//                         <h3>
//                             <DisclosureButton className="group relative flex w-full items-center justify-between py-6 text-left">
//                             <span className={classNames(open ? 'text-indigo-600' : 'text-gray-900', 'text-sm font-medium')}>
//                                 Product Details
//                             </span>
//                             <span className="ml-6 flex items-center">
//                                 {open ? (
//                                     <MinusIcon className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500" aria-hidden="true" />
//                                 ) : (
//                                     <PlusIcon className="block h-6 w-6 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
//                                 )}
//                             </span>
//                             </DisclosureButton>
//                         </h3>
//                         <DisclosurePanel className="pb-6 prose prose-sm text-gray-500">
//                              <p>{product.description}</p>
//                         </DisclosurePanel>
//                         </>
//                     )}
//                 </Disclosure>

//                 {/* Static Accordions */}
//                 {STATIC_DETAILS.map((detail) => (
//                   <Disclosure key={detail.name} as="div">
//                      {({ open }) => (
//                         <>
//                         <h3>
//                             <DisclosureButton className="group relative flex w-full items-center justify-between py-6 text-left">
//                             <span className={classNames(open ? 'text-indigo-600' : 'text-gray-900', 'text-sm font-medium')}>
//                                 {detail.name}
//                             </span>
//                             <span className="ml-6 flex items-center">
//                                 {open ? (
//                                     <MinusIcon className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500" aria-hidden="true" />
//                                 ) : (
//                                     <PlusIcon className="block h-6 w-6 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
//                                 )}
//                             </span>
//                             </DisclosureButton>
//                         </h3>
//                         <DisclosurePanel className="pb-6">
//                             <ul role="list" className="list-disc space-y-1 pl-5 text-sm/6 text-gray-700 marker:text-gray-300">
//                             {detail.items.map((item) => (
//                                 <li key={item} className="pl-2">{item}</li>
//                             ))}
//                             </ul>
//                         </DisclosurePanel>
//                         </>
//                      )}
//                   </Disclosure>
//                 ))}
//               </div>
//             </section>
//           </div>
//         </div>
//       </div>

//       {/* --- NEW GRID DESIGN: Related Products Section --- */}
//       {relatedProducts.length > 0 && (
//         <section aria-labelledby="related-heading" className="mt-10 border-t border-gray-200 px-4 py-16 sm:px-0 mx-auto max-w-7xl lg:px-8">
//            <h2 id="related-heading" className="text-xl font-bold text-gray-900">
//              Related Products
//            </h2>

//            <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
//              {relatedProducts.map((item) => (
//                <div key={item._id || item.id}>
//                  <div className="relative">
//                    <div className="relative h-72 w-full overflow-hidden rounded-lg">
//                      <img
//                        alt={item.name}
//                        src={item.image || "https://via.placeholder.com/300"}
//                        className="size-full object-cover"
//                      />
//                    </div>
//                    <div className="relative mt-4">
//                      <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
//                      <p className="mt-1 text-sm text-gray-500">
//                         {item.stock > 0 ? 'In Stock' : 'Out of Stock'}
//                      </p>
//                    </div>
//                    <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
//                      <div
//                        aria-hidden="true"
//                        className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
//                      />
//                      <p className="relative text-lg font-semibold text-white">₹{item.price}</p>
//                    </div>
//                  </div>
//                  <div className="mt-6">
//                    <button
//                      onClick={() => navigate(`/products/${item._id}`)}
//                      className="relative flex w-full items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
//                    >
//                      View Product<span className="sr-only">, {item.name}</span>
//                    </button>
//                  </div>
//                </div>
//              ))}
//            </div>
//         </section>
//       )}

//       <Toaster
//         position="top-right"
//         toastOptions={{
//           duration: 2000,
//           style: {
//             borderRadius: "10px",
//             fontFamily: "Inter, sans-serif",
//           },
//         }}
//       />
//     </div>
//   );
// }



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




import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { MinusIcon, PlusIcon, ArrowLeftIcon, ShieldCheckIcon, TruckIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/20/solid";
import { BeatLoader } from "react-spinners";
import toast, { Toaster } from 'react-hot-toast';

// Components & Context
import Navbar from "../components/Navbar"; // Adjust path based on your folder structure
import api from "../utils/api";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

// --- Helper to prevent crashes if data is an object instead of string ---
const safeRender = (value, fallback = "") => {
  if (!value) return fallback;
  if (typeof value === 'object' && value.name) return value.name;
  if (typeof value === 'object') return JSON.stringify(value);
  return value;
};

const STATIC_DETAILS = [
  {
    name: "Composition & Care",
    icon: <ShieldCheckIcon className="h-4 w-4 text-gray-500 mr-2" />,
    items: [
      "Premium quality material",
      "Designed for daily use",
      "Comfortable fit",
      "Durable construction",
    ],
  },
  {
    name: "Shipping & Returns",
    icon: <TruckIcon className="h-4 w-4 text-gray-500 mr-2" />,
    items: [
      "Free shipping on orders over ₹1000",
      "Fast delivery options available",
      "Easy 30-day returns",
      "Secure packaging",
    ],
  },
];

export default function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isAlreadyAdded, setIsAlreadyAdded] = useState(false);
  const [isWishlistToggling, setIsWishlistToggling] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const { cartItems, fetchCart } = useCart();
  const { user, logout } = useAuth(); // Assuming logout is available in useAuth
  const { isProductInWishlist, toggleWishlist } = useWishlist();

  const isInWishlist = product ? isProductInWishlist(product._id) : false;

  // Sync Logic for Navbar Gated Navigation
  const handleGatedNavigation = (e, path, isProtected) => {
    if (isProtected && !user.isAuthenticated) {
      e.preventDefault();
      toast.warn("Please log in to access this page");
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

  useEffect(() => {
    if (cartItems) {
      setIsAlreadyAdded(cartItems.some((item) => item.productId === productId));
    }
  }, [cartItems, productId]);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (product.stock <= 0) return toast.error("Sorry, this product is out of stock.");
    if (isAlreadyAdded) return; // Prevent action if already added

    setIsAdding(true);
    try {
      const cartData = { productId: product._id, quantity: 1 };
      await api.post(`/cart/add`, cartData);
      toast.success(`${product.name} added to cart!`);
      fetchCart();
    } catch (err) {
      if (err.response?.status === 401) {
        toast.warn("Please log in first", { onClose: () => navigate("/login") });
      } else {
        toast.error("Failed to add to cart");
      }
    } finally {
      setIsAdding(false);
    }
  };

  const handleToggleWishlist = async () => {
    if (!user.isAuthenticated) return toast.warn("Please log in to use wishlist");
    setIsWishlistToggling(true);
    const success = await toggleWishlist(product._id, isInWishlist);
    if (success) {
      toast.success(isInWishlist ? "Removed from Wishlist" : "Added to Wishlist!");
    } else {
      toast.error("Failed to update wishlist");
    }
    setIsWishlistToggling(false);
  };

  if (loading) return <div className="h-screen flex justify-center items-center bg-white"><BeatLoader color="#000" /></div>;
  if (error || !product) return <div className="text-center py-20 text-red-600 font-semibold">{error || "Unavailable"}</div>;

  const productImageSrc = product.image || "https://via.placeholder.com/1000x1000?text=No+Image";
  const stock = product.stock ?? 0;
  const isOutOfStock = stock <= 0;
  const isLowStock = stock > 0 && stock <= 5;
  const categoryName = safeRender(product.category, "General");

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900">
      <Navbar 
        isAuthenticated={user.isAuthenticated}
        role={user.role}
        cartItemCount={cartItems?.length || 0}
        handleLogout={logout}
        handleUserIconClick={() => navigate("/profile")}
        handleGatedNavigation={handleGatedNavigation}
      />

      {/* --- BACK BUTTON & CATEGORY HEADER --- */}
      <nav className="bg-white  mt-25">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
            >
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Back
            </button>
            {/* <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">
              {categoryName}
            </span> */}
            {/* <div className="w-12"></div> Spacer for symmetry */}
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 pt-10 pb-16 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16 items-start">
          
          {/* LEFT: PRODUCT IMAGE */}
        {/* --- LEFT: PRODUCT IMAGE --- */}
<div className="flex flex-col gap-6">
  {/* Added 'group' and 'overflow-hidden' to container */}
  <div className="relative overflow-hidden w-full bg-white group rounded-2xl"> 
    <div className="aspect-[4/5] w-full flex items-center justify-center">
      <img
        src={productImageSrc}
        alt={safeRender(product.name)}
        /* Added rounding, transition, and slight scale on hover */
        className="max-h-full max-w-full object-contain rounded-2xl transition-transform duration-700 ease-in-out group-hover:scale-105"
      />
    </div>
  </div>
</div>

          {/* RIGHT: PRODUCT DETAILS */}
          <div className="mt-10 px-2 sm:px-0 lg:mt-0 lg:sticky lg:top-24">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-3">
              {safeRender(product.name)}
            </h1>
            
            <div className="mb-4">
              {isOutOfStock ? (
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Out of Stock</span>
              ) : isLowStock ? (
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Only {stock} Left</span>
              ) : (
                <span className="text-xs font-bold text-green-700 uppercase tracking-wider">In Stock</span>
              )}
            </div>

            <p className="text-2xl font-medium text-gray-900 mb-6">
              ₹{product.price?.toLocaleString()}
            </p>

            <div className="prose prose-sm text-gray-600 mb-8 leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: product.description || "<p>No description available.</p>" }} />
            </div>

            {/* Add to Cart Section */}
            <form onSubmit={handleAddToCart} className="flex flex-col gap-4">
              <button
                type="submit"
                // DISABLED logic: disable if adding, if out of stock, OR if already in cart
                disabled={isAdding || isOutOfStock || isAlreadyAdded}
                className={`w-full flex items-center justify-center py-4 text-sm font-bold uppercase tracking-widest transition-all rounded
                  ${(isOutOfStock || isAdding || isAlreadyAdded) 
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200" 
                    : "bg-black text-white hover:bg-gray-800 shadow-sm"
                  }`}
              >
                {isAdding ? <BeatLoader size={8} color="#fff" /> : 
                 isOutOfStock ? "Sold Out" : 
                 isAlreadyAdded ? "Product Already in Cart" : "Add to Bag"}
              </button>

              <button
                type="button"
                onClick={handleToggleWishlist}
                disabled={isWishlistToggling}
                className="w-full flex items-center justify-center py-3 text-sm font-medium text-gray-500 border border-gray-100 hover:border-gray-300 hover:text-black transition-all"
              >
                {isInWishlist ? (
                  <>
                    <HeartIconSolid className="h-5 w-5 text-red-500 mr-2" />
                    <span>Saved</span>
                  </>
                ) : (
                  <>
                    <HeartIcon className="h-5 w-5 mr-2" />
                    <span>Save to Wishlist</span>
                  </>
                )}
              </button>
            </form>

            {/* Accordions */}
            <div className="mt-10 border-t border-gray-100">
              {STATIC_DETAILS.map((detail) => (
                <Disclosure key={detail.name} as="div" className="border-b border-gray-100">
                  {({ open }) => (
                    <>
                      <dt>
                        <DisclosureButton className="flex w-full items-center justify-between py-5 text-left text-sm font-medium text-gray-900 hover:text-black">
                          <span className="flex items-center">
                            {detail.icon}
                            {detail.name}
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? <MinusIcon className="h-4 w-4" /> : <PlusIcon className="h-4 w-4" />}
                          </span>
                        </DisclosureButton>
                      </dt>
                      <DisclosurePanel as="dd" className="pb-5 pr-12">
                        <ul className="list-disc pl-5 text-sm text-gray-500 space-y-1">
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
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <section className="mt-24 border-t border-gray-100 pt-12">
            <h2 className="text-lg font-bold text-gray-900 mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
              {relatedProducts.map((item) => (
                <div 
                  key={item._id} 
                  className="group relative cursor-pointer"
                  onClick={() => navigate(`/products/${item._id}`)}
                >
                  <div className="aspect-[3/4] w-full overflow-hidden bg-white mb-3">
                    <img
                      src={item.image || "https://via.placeholder.com/300"}
                      alt={safeRender(item.name)}
                      className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {safeRender(item.name)}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{item.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
                    </div>
                    <p className="text-sm font-bold text-gray-900">₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <Toaster position="top-right" />
    </div>
  );
}


