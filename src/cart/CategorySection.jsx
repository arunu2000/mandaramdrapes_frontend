//workingggggggggggggggggggg


import React, { useRef, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
// import axios from 'axios';
import { domainUrl } from '../utils/constant';
import api from '../utils/api';


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
 const res = await api.get("/user/shop/categories");
 
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
 <section className="bg-gray-50 py-20 relative mt-10">
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
 <div className="w-full h-100 overflow-hidden rounded-md bg-gray-200"> 
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


// import React, { useState, useEffect } from 'react';
// import { Link } from "react-router-dom";
// import api from '../utils/api';

// const CategorySection = () => {
//   // --- State to hold the fetched categories and loading status ---
//   // (Functionality kept exactly the same)
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Function to fetch category data from the backend
//   const fetchCategories = async () => {
//     setLoading(true);
//     try {
//       // YOUR LIVE BACKEND ENDPOINT
//       const res = await api.get("/user/shop/categories");

//       // Process fetched data
//       const fetchedCategories = res.data.categories || [];
//       const processedCategories = fetchedCategories.map(cat => ({
//         ...cat,
//         slug: cat.name.toLowerCase().replace(/\s+/g, '-'),
//       }));

//       setCategories(processedCategories);
//     } catch (err) {
//       console.error("Error fetching categories:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch data when the component mounts
//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   // --- Render Loading State ---
//   if (loading) {
//     return (
//       <section className="bg-white py-20 text-center">
//         <p className="text-xl font-medium text-gray-600">Loading Categories...</p>
//       </section>
//     );
//   }

//   // --- Main Render ---
//   return (
//     <section className="bg-white py-16 mt-10">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* Header - Centered as per image */}
//         <h2 className="text-2xl font-normal text-gray-900 text-center mb-10 tracking-wide">
//           Shop by Category
//         </h2>

//         {categories.length === 0 ? (
//           <p className="text-center text-gray-500 italic">No categories available to display.</p>
//         ) : (
//           /* GRID LAYOUT 
//              - grid-cols-2: 2 items per row on mobile
//              - md:grid-cols-3: 3 items per row on tablets
//              - lg:grid-cols-6: 6 items per row on large screens (Matches your screenshot)
//              - gap-4: Spacing between items
//           */
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-10">
//             {categories.map((category) => (
//               <div key={category._id} className="group relative">
//                 <Link to={`/categories/${category._id}`} className="block">
                  
//                   {/* Image Container - Aspect Ratio 3:4 for portrait look */}
//                   <div className="w-full aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
//                     <img
//                       src={category.image}
//                       alt={category.name}
//                       className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-in-out"
//                     />
//                   </div>
                  
//                   {/* Text Container - Uppercase and Underlined style */}
//                   <div className="text-center">
//                     <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest  decoration-gray-300 underline-offset-4 group-hover:text-gray-600 group-hover:decoration-gray-600 transition-all">
//                       {category.name}
//                     </h3>
//                   </div>

//                 </Link>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

// export default CategorySection;