//workingggggggggggggggggggg


// import React, { useRef, useState, useEffect } from 'react';
// import { Link } from "react-router-dom";
// // import axios from 'axios';
// import { domainUrl } from '../utils/constant';
// import api from '../utils/api';


// // --- Utility Icons (Must be in this file or imported) ---
// const ChevronLeftIcon = (props) => (
//  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
//  </svg>
// );

// const ChevronRightIcon = (props) => (
//  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
//  </svg>
// );
// // --------------------

// const CategorySection = () => {
//  // State to hold the fetched categories and loading status
//  const [categories, setCategories] = useState([]);
//  const [loading, setLoading] = useState(true); 
 
//  const scrollContainerRef = useRef(null);

//  // Function to fetch category data from the backend
//  const fetchCategories = async () => {
//  setLoading(true);
//  try {
//  //  YOUR LIVE BACKEND ENDPOINT
//  const res = await api.get("/user/shop/categories");
 
//  // Process fetched data to add a 'slug' for the URL
//  const fetchedCategories=res.data.categories || []
//  const processedCategories = fetchedCategories.map(cat => ({
//  ...cat,
//  // Generate a URL-friendly slug from the category name
//  slug: cat.name.toLowerCase().replace(/\s+/g, '-'), 
//  }));
 
//  setCategories(processedCategories);
//  } catch (err) {
//  console.error("Error fetching categories:", err);
//  } finally {
//  setLoading(false);
//  }
//  };

//  // Fetch data when the component mounts
//  useEffect(() => {
//  fetchCategories();
//  }, []);

//  // Function to handle horizontal scrolling
//  const scroll = (direction) => {
//  if (scrollContainerRef.current) {
//  const scrollAmount = direction === 'left' ? -400 : 400; 
//  scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//  }
//  };

//  const showArrows = categories.length > 4;

//  // Render Loading State
//  if (loading) {
//  return (
//  <section className="bg-gray-50 py-20 text-center">
//  <p className="text-xl font-medium text-gray-600">Loading Categories...</p>
//  </section>
//  );
//  }
 
//  return (
//  <section className="bg-gray-50 py-20 relative mt-10">
//  <div className="max-w-7xl mx-auto px-6 lg:px-8">
//  <h2 className="text-3xl font-bold text-gray-800 text-center mb-14 tracking-tight">
//  Shop by Category
//  </h2>

//  {categories.length === 0 ? (
//  <p className="text-center text-gray-500 italic">No categories available to display.</p>
//  ) : (
//  <div className="relative">
//  {/* LEFT ARROW */}
//  {showArrows && (
//  <button
//  onClick={() => scroll('left')}
//  aria-label="Scroll categories left"
//  className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 p-2 text-gray-700 hover:text-gray-900 transition hidden lg:block"
// >
//  <ChevronLeftIcon />
//  </button>
//  )}

//  {/* SCROLLABLE WRAPPER */}
//  <div
//  ref={scrollContainerRef}
//  className="overflow-x-scroll whitespace-nowrap"
//  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
// >
//  <div className="inline-flex space-x-6 pb-4">
//  {categories.map((category) => (
//  <div 
//  key={category._id} // Using backend ID as key
//  className="group relative flex-shrink-0 w-[280px] sm:w-[300px] lg:w-[270px] xl:w-[280px]"
// >
//  {/* Link to dynamic route: uses the generated slug */}
//  <Link to={`/categories/${category._id}`} className='block'>
//  {/* Image container: Fixed height (h-64) for consistent size/alignment */}
//  <div className="w-full h-100 overflow-hidden rounded-md bg-gray-200"> 
//  <img
//  src={category.image}
//  // Uses the image URL from your backend data
//  alt={category.name}
//  className="h-full w-full object-cover object-center group-hover:opacity-75 transition duration-300"
//  />
//  </div>
//  {/* Text container: Displays the category name */}
//  <div className="mt-4 pb-4 text-center"> 
//  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[#5e785a] transition-colors duration-300">
//  {category.name}
//  </h3>
//  </div>
//  </Link>
// </div>
// ))}
//  </div>
//  </div>
 
//  {/* RIGHT ARROW */}
//  {showArrows && (
//  <button
//  onClick={() => scroll('right')}
//  aria-label="Scroll categories right"
//  className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 p-2 text-gray-700 hover:text-gray-900 transition hidden lg:block"
//  >
//  <ChevronRightIcon />
// </button>
//  )}

//  </div>
//  )}

// <p className="mt-4 text-center text-sm text-gray-500 lg:hidden">
//  Swipe horizontally to see more categories.
//  </p>
//  </div>
//  </section>

//  );
// }

// export default CategorySection;


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





import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react"; // Make sure to npm install lucide-react
import api from '../utils/api';

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Logic remains exactly the same ---
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await api.get("/user/shop/categories");
      const fetchedCategories = res.data.categories || [];
      const processedCategories = fetchedCategories.map(cat => ({
        ...cat,
        slug: cat.name.toLowerCase().replace(/\s+/g, '-'),
      }));
      setCategories(processedCategories);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // --- Loading Skeleton Component ---
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-10">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="w-full aspect-[3/4] bg-gray-200 rounded-xl mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      ))}
    </div>
  );

  // --- Main Render ---
  return (
    <section className="bg-white py-24 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with the "Midnight Summer" Gradient */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-bold tracking-tighter sm:text-5xl"
          >
             {/* <span className="bg-gradient-to-r from-gray-900 via-indigo-800 to-rose-700 bg-clip-text text-transparent"> */}
             <span className='bg-gradient-to-r from-gray-900 via-indigo-800 to-rose-700 bg-clip-text text-transparent text-3xl'> 
              Shop by Category
            </span>
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-1 bg-gray-900 mx-auto mt-4"
          />
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : categories.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-400 font-light">No collections found.</p>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-12"
          >
            {categories.map((category) => (
              <motion.div key={category._id} variants={cardVariants} className="group cursor-pointer">
                <Link to={`/categories/${category._id}`} className="block">
                  
                  {/* Image Container */}
                  <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100 shadow-sm transition-all duration-500 group-hover:shadow-xl">
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 z-10" />
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-full w-full object-cover object-center transform transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110"
                    />
                    
                    {/* Floating Icon on Hover */}
                    <div className="absolute top-3 right-3 z-20 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg">
                        <ArrowUpRight className="w-4 h-4 text-black" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Text Container */}
                  <div className="mt-5 text-center relative">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">
                      {category.name}
                    </h3>
                    {/* Animated Underline */}
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-px bg-gray-400 transition-all duration-300 group-hover:w-1/2"></span>
                  </div>

                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default CategorySection;