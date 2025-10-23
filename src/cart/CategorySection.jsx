// import React, { useRef } from 'react';
// import { Link } from "react-router-dom";

// // --- Utility Icons (You must move these or import them) ---
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
// // --------------------

// //  Category Data (Use your latest data with 'slug')
// const categories = [
//  { id: 1, name: 'Shirts', imageSrc: 'YOUR_LIVE_URL_FOR_SHIRTS_CATEGORY_IMAGE', slug: 'shirts', },
//  { id: 2, name: 'Trousers', imageSrc: 'YOUR_LIVE_URL_FOR_TROUSERS_CATEGORY_IMAGE', slug: 'trousers', },
//  { id: 3, name: 'Jackets', imageSrc: 'YOUR_LIVE_URL_FOR_JACKETS_CATEGORY_IMAGE', slug: 'jackets', },
//  { id: 4, name: 'Accessories', imageSrc: 'YOUR_LIVE_URL_FOR_ACCESSORIES_CATEGORY_IMAGE', slug: 'accessories', },
//  { id: 5, name: 'Footwear', imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-02-image-card-02.jpg', slug: 'footwear', },
//  { id: 6, name: 'Hats', imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg', slug: 'hats', },
// ];


// const CategorySection = () => {
//   const scrollContainerRef = useRef(null);

//   // Function to handle horizontal scrolling
//   const scroll = (direction) => {
//     if (scrollContainerRef.current) {
//       const scrollAmount = direction === 'left' ? -400 : 400; 
//       scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//     }
//   };

//   const showArrows = categories.length > 4;

//   return (
//     <section className="bg-gray-50 py-20 relative">
//       <div className="max-w-7xl mx-auto px-6 lg:px-8">
//         <h2 className="text-3xl font-bold text-gray-800 text-center mb-14 tracking-tight">
//           Shop by Category
//         </h2>

//         <div className="relative">
//           {/* LEFT ARROW (Transparent background) */}
//           {showArrows && (
//             <button
//               onClick={() => scroll('left')}
//               aria-label="Scroll categories left"
//               className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 p-2 text-gray-700 hover:text-gray-900 transition hidden lg:block"
//             >
//               <ChevronLeftIcon />
//             </button>
//           )}

//           {/* SCROLLABLE WRAPPER (hides scrollbar) */}
//           <div
//             ref={scrollContainerRef}
//             className="overflow-x-scroll whitespace-nowrap"
//             style={{
//               scrollbarWidth: 'none', /* Firefox */
//               msOverflowStyle: 'none', /* IE and Edge */
//             }}
//           >
//             <div className="inline-flex space-x-6 pb-4">
//               {categories.map((category) => (
//                 <div 
//                   key={category.id} 
//                   className="group relative flex-shrink-0 w-[280px] sm:w-[300px] lg:w-[270px] xl:w-[280px]"
//                 >
//                   {/*  Link to dynamic route */}
//                   <Link to={`/categories/${category.slug}`} className='block'>
//                     {/* Image container: Fixed height (h-64) for consistent size/alignment */}
//                     <div className="w-full h-64 overflow-hidden rounded-md bg-gray-200"> 
//                       <img
//                         src={category.imageSrc}
//                         alt={category.name}
//                         className="h-full w-full object-cover object-center group-hover:opacity-75 transition duration-300"
//                       />
//                     </div>
//                     {/* Text alignment remains centered */}
//                     <div className="mt-4 pb-4 text-center"> 
//                       <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[#5e785a] transition-colors duration-300">
//                         {category.name}
//                       </h3>
//                     </div>
//                   </Link>
//                 </div>
//               ))}
//             </div>
//           </div>
          
//           {/* RIGHT ARROW (Transparent background) */}
//           {showArrows && (
//             <button
//               onClick={() => scroll('right')}
//               aria-label="Scroll categories right"
//               className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 p-2 text-gray-700 hover:text-gray-900 transition hidden lg:block"
//             >
//               <ChevronRightIcon />
//             </button>
//           )}

//         </div>
        
//         <p className="mt-4 text-center text-sm text-gray-500 lg:hidden">
//           Swipe horizontally to see more categories.
//         </p>
//       </div>
//     </section>
//   );
// }

// export default CategorySection;


import React, { useRef, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { domainUrl } from '../utils/constant';


// --- Utility Icons (Must be in this file or imported) ---
const ChevronLeftIcon = (props) => (
 <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
 <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
 </svg>
);

const ChevronRightIcon = (props) => (
 <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
 <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
 </svg>
);
// --------------------

const CategorySection = () => {
 // State to hold the fetched categories and loading status
 const [categories, setCategories] = useState([]);
 const [loading, setLoading] = useState(true); 
 
 const scrollContainerRef = useRef(null);

 // Function to fetch category data from the backend
 const fetchCategories = async () => {
 setLoading(true);
 try {
 //  YOUR LIVE BACKEND ENDPOINT
 const res = await axios.get(`${domainUrl}/user/shop/categories`);
 
 // Process fetched data to add a 'slug' for the URL
 const fetchedCategories=res.data.categories || []
 const processedCategories = fetchedCategories.map(cat => ({
 ...cat,
 // Generate a URL-friendly slug from the category name
 slug: cat.name.toLowerCase().replace(/\s+/g, '-'), 
 }));
 
 setCategories(processedCategories);
 } catch (err) {
 console.error("Error fetching categories:", err);
 } finally {
 setLoading(false);
 }
 };

 // Fetch data when the component mounts
 useEffect(() => {
 fetchCategories();
 }, []);

 // Function to handle horizontal scrolling
 const scroll = (direction) => {
 if (scrollContainerRef.current) {
 const scrollAmount = direction === 'left' ? -400 : 400; 
 scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
 }
 };

 const showArrows = categories.length > 4;

 // Render Loading State
 if (loading) {
 return (
 <section className="bg-gray-50 py-20 text-center">
 <p className="text-xl font-medium text-gray-600">Loading Categories...</p>
 </section>
 );
 }
 
 return (
 <section className="bg-gray-50 py-20 relative">
 <div className="max-w-7xl mx-auto px-6 lg:px-8">
 <h2 className="text-3xl font-bold text-gray-800 text-center mb-14 tracking-tight">
 Shop by Category
 </h2>

 {categories.length === 0 ? (
 <p className="text-center text-gray-500 italic">No categories available to display.</p>
 ) : (
 <div className="relative">
 {/* LEFT ARROW */}
 {showArrows && (
 <button
 onClick={() => scroll('left')}
 aria-label="Scroll categories left"
 className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 p-2 text-gray-700 hover:text-gray-900 transition hidden lg:block"
>
 <ChevronLeftIcon />
 </button>
 )}

 {/* SCROLLABLE WRAPPER */}
 <div
 ref={scrollContainerRef}
 className="overflow-x-scroll whitespace-nowrap"
 style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
>
 <div className="inline-flex space-x-6 pb-4">
 {categories.map((category) => (
 <div 
 key={category._id} // Using backend ID as key
 className="group relative flex-shrink-0 w-[280px] sm:w-[300px] lg:w-[270px] xl:w-[280px]"
>
 {/* Link to dynamic route: uses the generated slug */}
 <Link to={`/categories/${category._id}`} className='block'>
 {/* Image container: Fixed height (h-64) for consistent size/alignment */}
 <div className="w-full h-64 overflow-hidden rounded-md bg-gray-200"> 
 <img
 src={category.image}
 // Uses the image URL from your backend data
 alt={category.name}
 className="h-full w-full object-cover object-center group-hover:opacity-75 transition duration-300"
 />
 </div>
 {/* Text container: Displays the category name */}
 <div className="mt-4 pb-4 text-center"> 
 <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[#5e785a] transition-colors duration-300">
 {category.name}
 </h3>
 </div>
 </Link>
</div>
))}
 </div>
 </div>
 
 {/* RIGHT ARROW */}
 {showArrows && (
 <button
 onClick={() => scroll('right')}
 aria-label="Scroll categories right"
 className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 p-2 text-gray-700 hover:text-gray-900 transition hidden lg:block"
 >
 <ChevronRightIcon />
</button>
 )}

 </div>
 )}

<p className="mt-4 text-center text-sm text-gray-500 lg:hidden">
 Swipe horizontally to see more categories.
 </p>
 </div>
 </section>

 );
}

export default CategorySection;



