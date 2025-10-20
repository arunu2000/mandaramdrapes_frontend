// import React from 'react'

// const Customerdashboard = () => {
//   return (
//     <nav>
    
//       <div className='flex  justify-around items-center  text-[#5e785a]   p-2'>
//       <div><img className='h-10 w-10' src="logo123.png" alt="" /></div>
//       <ul className='flex justify-center  gap-12 text-sm items-center '>
//         <li>Home</li>
//         <li>Shop</li>
//         <li>Cart</li>
//         <li>My Orders</li>
//       </ul>
//       <div><img
//         alt=""
//         src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//         className="inline-block size-6 rounded-full outline -outline-offset-1 outline-black/5 dark:outline-white/10"
//       /></div>
//       </div>

//         <div><img className='object-cover w-full h-ful' src="image2.jpg" alt="" /></div>

      
      

      
//     </nav>

     
      
    
//   )
// }

// export default Customerdashboard

// import React from 'react'

// const products = [
//   {
//     id: 1,
//     name: 'Shirts',
//     href: '#',
//     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg',
//     imageAlt: "",
//       },
//   {
//     id: 2,
//     name: 'Basic Tee',
//     href: '#',
//     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg',
//     imageAlt: "Front of men's Basic Tee in white.",
//     price: '$35',
//     color: 'Aspen White',
//   },
//   {
//     id: 3,
//     name: 'Basic Tee',
//     href: '#',
//     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg',
//     imageAlt: "Front of men's Basic Tee in dark gray.",
//     price: '$35',
//     color: 'Charcoal',
//   },
//   {
//     id: 4,
//     name: 'Artwork Tee',
//     href: '#',
//     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-04.jpg',
//     imageAlt: "Front of men's Artwork Tee in peach with white and brown dots forming an isometric cube.",
//     price: '$35',
//     color: 'Iso Dots',
//   },
//    {
//     id: 4,
//     name: 'Artwork Tee',
//     href: '#',
//     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-04.jpg',
//     imageAlt: "Front of men's Artwork Tee in peach with white and brown dots forming an isometric cube.",
//     price: '$35',
//     color: 'Iso Dots',
//   },
//   {
//     id: 3,
//     name: 'Basic Tee',
//     href: '#',
//     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg',
//     imageAlt: "Front of men's Basic Tee in dark gray.",
//     price: '$35',
//     color: 'Charcoal',
//   },
//    {
//     id: 2,
//     name: 'Basic Tee',
//     href: '#',
//     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg',
//     imageAlt: "Front of men's Basic Tee in white.",
//     price: '$35',
//     color: 'Aspen White',
//   },
//   {
//     id: 1,
//     name: 'Basic Tee',
//     href: '#',
//     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg',
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: '$35',
//     color: 'Black',
//   },
// ]


// const Customerdashboard = () => {
//   return (
//     <div> {/* Added a wrapping div for the entire component */}
//       {/* Navigation Bar */}
//       <nav className='fixed top-0 left-0 w-full bg-white shadow-lg z-50 '> {/* Added shadow and bg for better separation */}
//         <div className='flex justify-around items-center text-[#5e785a] p-2 '>
//           <div><img className='h-10 w-auto' src="logo123.png" alt="Modimal Logo" /></div> {/* Added alt text and w-auto */}
//           <ul className='flex justify-center gap-12 text-sm items-center font-medium'> {/* Added font-medium */}
//             <li><a href="#" className="hover:text-gray-900 transition-colors">Home</a></li> {/* Added anchor tags for navigation */}
//             <li><a href="#" className="hover:text-gray-900 transition-colors">Shop</a></li>
//             <li><a href="#" className="hover:text-gray-900 transition-colors">Cart</a></li>
//             <li><a href="#" className="hover:text-gray-900 transition-colors">My Orders</a></li>
//           </ul>
//           <div>
//             <img
//               alt="User Avatar" // Added alt text
//               src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//               className="inline-block size-8 rounded-full outline -outline-offset-1 outline-black/5 dark:outline-white/10" // Increased size to size-8 for visibility
//             />
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section Image */}
//       <div className='mt-12'>
//         <img className='object-cover w-full h-auto max-h-[500px]' src="image2.jpg" alt="Hero Section Banner" /> {/* Changed h-full to h-auto max-h-[500px] for better responsiveness and to prevent excessive height */}
//       </div>

//       {/* Products List Section */}
//       <div className="bg-white">
//         <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
//           <h2 className="text-2xl font-bold tracking-tight text-gray-900">Categories</h2>

//           <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
//             {products.map((product) => (
//               <div key={product.id} className="group relative">
//                 <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-h-8 lg:aspect-w-7"> {/* Added aspect ratio divs for consistent image sizing */}
//                   <img
//                     alt={product.imageAlt}
//                     src={product.imageSrc}
//                     className="h-full w-full object-cover object-center group-hover:opacity-75"
//                   />
//                 </div>
//                 <div className="mt-4 flex justify-between">
//                   <div>
//                     <h3 className="text-sm text-gray-700">
//                       <a href={product.href}>
//                         <span aria-hidden="true" className="absolute inset-0" />
//                         {product.name}
//                       </a>
//                     </h3>
//                     <p className="mt-1 text-sm text-gray-500">{product.color}</p>
//                   </div>
//                   <p className="text-sm font-medium text-gray-900">{product.price}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Customerdashboard


// import React from 'react'

// const categories = [
//   {
//     id: 1,
//     name: 'Shirts',
//     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg',
//   },
//   {
//     id: 2,
//     name: 'Trousers',
//     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-02-image-card-02.jpg',
//   },
//   {
//     id: 3,
//     name: 'Jackets',
//     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-02-image-card-03.jpg',
//   },
//   {
//     id: 4,
//     name: 'Accessories',
//     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-02-image-card-04.jpg',
//   },
// ]

// const products = [
//   {
//     id: 1,
//     name: 'Basic Tee',
//     href: '#',
//     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg',
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: '$35',
//     color: 'Black',
//   },
//   {
//     id: 2,
//     name: 'Basic Tee',
//     href: '#',
//     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg',
//     imageAlt: "Front of men's Basic Tee in white.",
//     price: '$35',
//     color: 'Aspen White',
//   },
//   {
//     id: 3,
//     name: 'Basic Tee',
//     href: '#',
//     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg',
//     imageAlt: "Front of men's Basic Tee in dark gray.",
//     price: '$35',
//     color: 'Charcoal',
//   },
//   {
//     id: 4,
//     name: 'Artwork Tee',
//     href: '#',
//     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-04.jpg',
//     imageAlt: "Front of men's Artwork Tee in peach with dots.",
//     price: '$35',
//     color: 'Iso Dots',
//   },
// ]

// const Customerdashboard = () => {
//   return (
//     <div>
//       {/* Navbar */}
//       <nav className='fixed top-0 left-0 w-full bg-white shadow-md z-50'>
//         <div className='flex justify-around items-center text-[#5e785a] p-3'>
//           <div><img className='h-10 w-auto' src="logo123.png" alt="Modimal Logo" /></div>
//           <ul className='flex justify-center gap-10 text-sm items-center font-medium'>
//             <li><a href="#" className="hover:text-gray-900 transition-colors">Home</a></li>
//             <li><a href="#" className="hover:text-gray-900 transition-colors">Shop</a></li>
//             <li><a href="#" className="hover:text-gray-900 transition-colors">Cart</a></li>
//             <li><a href="#" className="hover:text-gray-900 transition-colors">My Orders</a></li>
//           </ul>
//           <div>
//             <img
//               alt="User Avatar"
//               src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&w=256&h=256&q=80"
//               className="inline-block size-8 rounded-full outline -outline-offset-1 outline-black/5"
//             />
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <div className='mt-16'>
//         <img
//           className='object-cover w-full h-auto max-h-[500px]'
//           src="image2.jpg"
//           alt="Hero Section Banner"
//         />
//       </div>

//       {/* Category Section */}
// <section className="bg-gray-50 py-20">
//   <div className="max-w-7xl mx-auto px-6 lg:px-8">
//     <h2 className="text-3xl font-bold text-gray-800 text-center mb-14 tracking-tight">
//       Shop by Category
//     </h2>

//     <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
//       {categories.map((category) => (
//         <div key={category.id} className="group relative">
//           {/* Image container with aspect ratio like product section */}
//           <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-h-8 lg:aspect-w-7">
//             <img
//               src={category.imageSrc}
//               alt={category.name}
//               className="h-full w-full object-cover object-center group-hover:opacity-75 transition duration-300"
//             />
//           </div>

//           {/* Centered name below image */}
//           <div className="mt-4 text-center">
//             <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[#5e785a] transition-colors duration-300">
//               {category.name}
//             </h3>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// </section>



//       {/* Product Section */}
//       <section className="bg-white">
//         <div className="max-w-7xl mx-auto px-6 py-16">
//           <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Popular Products</h2>

//           <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
//             {products.map((product) => (
//               <div key={product.id} className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
//                 <img
//                   alt={product.imageAlt}
//                   src={product.imageSrc}
//                   className="h-64 w-full object-cover group-hover:scale-105 transition-transform duration-500"
//                 />
//                 <div className="p-4">
//                   <h3 className="text-sm text-gray-700 font-medium">{product.name}</h3>
//                   <p className="text-sm text-gray-500">{product.color}</p>
//                   <p className="text-base font-semibold text-gray-900 mt-1">{product.price}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }

// export default Customerdashboard



// import React, { useRef } from 'react'

// // --- Utility Icons (assuming you have access to these, or use basic SVG) ---
// // If you use a library like 'heroicons/react', you'd import them.
// // For a standalone file, we define them here:
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
// // --------------------------------------------------------------------------

// const categories = [
//   {
//     id: 1,
//     name: 'Shirts',
//     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg',
//   },
//   {
//     id: 2,
//     name: 'Trousers',
//     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-02-image-card-02.jpg',
//   },
//   {
//     id: 3,
//     name: 'Jackets',
//     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-02-image-card-03.jpg',
//   },
//   {
//     id: 4,
//     name: 'Accessories',
//     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-02-image-card-04.jpg',
//   },
//   // Added a few more for demonstration of scrolling
//   {
//     id: 5,
//     name: 'Footwear',
//     imageSrc: 'https://tailwindcss.com/_next/static/media/classic-utility-jacket.0f14d3a0.jpg',
//   },
//   {
//     id: 6,
//     name: 'Hats',
//     imageSrc: 'https://tailwindcss.com/_next/static/media/machined-pen.d10f8487.jpg',
//   },
// ]

// const products = [
//   {
//     id: 1,
//     name: 'Basic Tee',
//     href: '#',
//     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg',
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: '$35',
//     color: 'Black',
//   },
//   {
//     id: 2,
//     name: 'Basic Tee',
//     href: '#',
//     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg',
//     imageAlt: "Front of men's Basic Tee in white.",
//     price: '$35',
//     color: 'Aspen White',
//   },
//   {
//     id: 3,
//     name: 'Basic Tee',
//     href: '#',
//     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg',
//     imageAlt: "Front of men's Basic Tee in dark gray.",
//     price: '$35',
//     color: 'Charcoal',
//   },
//   {
//     id: 4,
//     name: 'Artwork Tee',
//     href: '#',
//     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-04.jpg',
//     imageAlt: "Front of men's Artwork Tee in peach with dots.",
//     price: '$35',
//     color: 'Iso Dots',
//   },
// ]

// const Customerdashboard = () => {
//   const scrollContainerRef = useRef(null);

//   // Function to handle horizontal scrolling
//   const scroll = (direction) => {
//     if (scrollContainerRef.current) {
//       // Scroll by the width of approximately 2 items for a good jump
//       const scrollAmount = direction === 'left' ? -400 : 400; 
//       scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//     }
//   };

//   // Determine if arrows are needed (e.g., if more than 4 items exist)
//   const showArrows = categories.length > 4;

//   return (
//     <div>
//       {/* Navbar */}
//       <nav className='fixed top-0 left-0 w-full bg-white shadow-md z-50'>
//         <div className='flex justify-around items-center text-[#5e785a] p-3'>
//           <div><img className='h-10 w-auto' src="logo123.png" alt="Modimal Logo" /></div>
//           <ul className='flex justify-center gap-10 text-sm items-center font-medium'>
//             <li><a href="#" className="hover:text-gray-900 transition-colors">Home</a></li>
//             <li><a href="#" className="hover:text-gray-900 transition-colors">Shop</a></li>
//             <li><a href="#" className="hover:text-gray-900 transition-colors">Cart</a></li>
//             <li><a href="#" className="hover:text-gray-900 transition-colors">My Orders</a></li>
//           </ul>
//           <div>
//             <img
//               alt="User Avatar"
//               src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&w=256&h=256&q=80"
//               className="inline-block size-8 rounded-full outline -outline-offset-1 outline-black/5"
//             />
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <div className='mt-16'>
//         <img
//           className='object-cover w-full h-auto max-h-[500px]'
//           src="image2.jpg"
//           alt="Hero Section Banner"
//         />
//       </div>

//       {/* Category Section (REVISED) */}
//       <section className="bg-gray-50 py-20 relative">
//         <div className="max-w-7xl mx-auto px-6 lg:px-8">
//           <h2 className="text-3xl font-bold text-gray-800 text-center mb-14 tracking-tight">
//             Shop by Category
//           </h2>

//           <div className="relative">
//             {/* LEFT ARROW (Desktop only) */}
//             {showArrows && (
//               <button
//                 onClick={() => scroll('left')}
//                 aria-label="Scroll categories left"
//                 className="absolute left-0 top-1/2 -mt-6 z-10 p-2 rounded-full bg-white/80 shadow-lg ring-1 ring-gray-900/5 hover:bg-white transition hidden lg:block"
//               >
//                 <ChevronLeftIcon />
//               </button>
//             )}

//             {/* SCROLLABLE WRAPPER */}
//             <div
//               ref={scrollContainerRef}
//               // The key classes for horizontal scrolling
//               className="overflow-x-scroll whitespace-nowrap scrollbar-hide" 
//             >
//               {/* CATEGORY ITEMS: Use flex-shrink-0 for uniform size and alignment */}
//               <div className="inline-flex space-x-6 pb-4">
//                 {categories.map((category) => (
//                   <div 
//                     key={category.id} 
//                     className="group relative flex-shrink-0 w-[280px] sm:w-[300px] lg:w-[270px] xl:w-[280px]" // Fixed width for consistent alignment
//                   >
//                     <a href="#" className='block'>
//                       {/* Image container: Aspect ratio ensures uniformity */}
//                       <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-h-8 lg:aspect-w-7">
//                         <img
//                           src={category.imageSrc}
//                           alt={category.name}
//                           className="h-full w-full object-cover object-center group-hover:opacity-75 transition duration-300"
//                         />
//                       </div>

//                       {/* Centered name below image (Uniform alignment) */}
//                       <div className="mt-4 text-center">
//                         <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[#5e785a] transition-colors duration-300">
//                           {category.name}
//                         </h3>
//                       </div>
//                     </a>
//                   </div>
//                 ))}
//               </div>
//             </div>
            
//             {/* RIGHT ARROW (Desktop only) */}
//             {showArrows && (
//               <button
//                 onClick={() => scroll('right')}
//                 aria-label="Scroll categories right"
//                 className="absolute right-0 top-1/2 -mt-6 z-10 p-2 rounded-full bg-white/80 shadow-lg ring-1 ring-gray-900/5 hover:bg-white transition hidden lg:block"
//               >
//                 <ChevronRightIcon />
//               </button>
//             )}

//           </div>
          
//           {/* Subtle scroll hint for mobile users */}
//           <p className="mt-4 text-center text-sm text-gray-500 lg:hidden">
//               &larr; Swipe horizontally to see more categories &rarr;
//           </p>

//         </div>
//       </section>

//       {/* Product Section (Unchanged) */}
//       <section className="bg-white">
//         <div className="max-w-7xl mx-auto px-6 py-16">
//           <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Popular Products</h2>

//           <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
//             {products.map((product) => (
//               <div key={product.id} className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
//                 <img
//                   alt={product.imageAlt}
//                   src={product.imageSrc}
//                   className="h-64 w-full object-cover group-hover:scale-105 transition-transform duration-500"
//                 />
//                 <div className="p-4">
//                   <h3 className="text-sm text-gray-700 font-medium">{product.name}</h3>
//                   <p className="text-sm text-gray-500">{product.color}</p>
//                   <p className="text-base font-semibold text-gray-900 mt-1">{product.price}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }

// export default Customerdashboard


import React, { useRef } from 'react'
import { Link } from "react-router-dom";
import CategorySection from '../cart/CategorySection';

// --- Utility Icons ---
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

// const categories = [
//   {
//     id: 1,
//     name: 'Shirts',
//     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg',
//   },
//   {
//     id: 2,
//     name: 'Trousers',
//     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-02-image-card-02.jpg',
//   },
//   {
//     id: 3,
//     name: 'Jackets',
//     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-02-image-card-03.jpg',
//   },
//   {
//     id: 4,
//     name: 'Accessories',
//     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-02-image-card-04.jpg',
//   },
//   {
//     id: 5,
//     name: 'Footwear',
//     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-02-image-card-02.jpg',
//   },
//   {
//     id: 6,
//     name: 'Hats',
//     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg',
//   },
// ];

// Combined/Updated Product Data
const products = [
  {
    id: 1,
    name: 'Zip Tote Basket',
    color: 'White and black',
    href: '#',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-03-related-product-01.jpg',
    imageAlt: 'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
    price: '$140',
  },
  {
    id: 2,
    name: 'Zip High Wall Tote',
    color: 'White and blue',
    href: '#',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-03-related-product-02.jpg',
    imageAlt: 'Front of zip tote bag with white canvas, blue canvas straps and handle, and front zipper pocket.',
    price: '$150',
  },
  {
    id: 3,
    name: 'Halfsize Tote',
    color: 'Clay',
    href: '#',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-03-related-product-03.jpg',
    imageAlt: 'Front of tote with monochrome natural canvas body, straps, roll top, and handles.',
    price: '$210',
  },
  {
    id: 4,
    name: 'High Wall Tote',
    color: 'Black and orange',
    href: '#',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-03-related-product-04.jpg',
    imageAlt: 'Front of zip tote bag with black canvas, black handles, and orange drawstring top.',
    price: '$210',
  },
];

//footer

const navigation = [
  {
    name: 'Facebook',
    href: '#',
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: '#',
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: 'X',
    href: '#',
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    href: '#',
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: '#',
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
]


const Customerdashboard = () => {
  const scrollContainerRef = useRef(null);

  // Function to handle horizontal scrolling

  // const scroll = (direction) => {
  //   if (scrollContainerRef.current) {
  //     const scrollAmount = direction === 'left' ? -400 : 400; 
  //     scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  //   }
  // };

  // const showArrows = categories.length > 4;

  return (
    <div>
      {/* Navbar */}
      <nav className='fixed top-0 left-0 w-full bg-white shadow-md z-50'>
        <div className='flex justify-around items-center text-[#5e785a] p-3'>
          <div><img className='h-10 w-auto' src="logo123.png" alt="Modimal Logo" /></div>
          <ul className='flex justify-center gap-10 text-sm items-center font-medium'>
            <li to="/" className="hover:text-gray-900 transition-colors">Home</li>
            <li><a href="#" className="hover:text-gray-900 transition-colors">Shop</a></li>
            <Link to="/cart" className="p-2 text-gray-400 hover:text-gray-500">
                {/* Shopping Bag Icon or Text */}
                <span className="ml-2 text-sm font-medium text-gray-700">Cart</span>
            </Link>
            <Link to="/myorders" className="hover:text-gray-900 transition-colors" >My Orders</Link>
          </ul>
          <div>
            <img
              alt="User Avatar"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&w=256&h=256&q=80"
              className="inline-block size-8 rounded-full outline -outline-offset-1 outline-black/5"
            />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className='mt-16'>
        <img
          className='object-cover w-full h-auto max-h-[500px]'
          src="image2.jpg"
          alt="Hero Section Banner"
        />
      </div>ca

      {/* Category Section (Fixed Size & Transparent Arrows) */}

      {/* <section className="bg-gray-50 py-20 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-14 tracking-tight">
            Shop by Category
          </h2>

          <div className="relative"> */}

            {/* LEFT ARROW (Transparent background) */}

            {/* {showArrows && (
              <button
                onClick={() => scroll('left')}
                aria-label="Scroll categories left"
                className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 p-2 text-gray-700 hover:text-gray-900 transition hidden lg:block"
              >
                <ChevronLeftIcon />
              </button>
            )} */}

            {/* SCROLLABLE WRAPPER (hides scrollbar) */}
            
            {/* <div
              ref={scrollContainerRef}
              className="overflow-x-scroll whitespace-nowrap" */}
              {/* style={{
                scrollbarWidth: 'none',  
                msOverflowStyle: 'none',
              }}
            > */}
              {/* <div className="inline-flex space-x-6 pb-4">
                {categories.map((category) => (
                  <div 
                    key={category.id} 
                    className="group relative flex-shrink-0 w-[280px] sm:w-[300px] lg:w-[270px] xl:w-[280px]"
                  >
                    <a href="#" className='block'> */}

                      {/* Image container: Fixed height (h-64) for consistent size/alignment */}

                      {/* <div className="w-full h-64 overflow-hidden rounded-md bg-gray-200"> 
                        <img
                          src={category.imageSrc}
                          alt={category.name}
                          className="h-full w-full object-cover object-center group-hover:opacity-75 transition duration-300"
                        /> */}
                      {/* </div> */}
                      {/* Text alignment remains centered */}

                      {/* <div className="mt-4 pb-4 text-center"> 
                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[#5e785a] transition-colors duration-300">
                          {category.name}
                        </h3>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div> */}
            
            {/* RIGHT ARROW (Transparent background) */}
            {/* {showArrows && (
              <button
                onClick={() => scroll('right')}
                aria-label="Scroll categories right"
                className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 p-2 text-gray-700 hover:text-gray-900 transition hidden lg:block"
              >
                <ChevronRightIcon />
              </button>
            )} */}

          {/* </div>
          
          <p className="mt-4 text-center text-sm text-gray-500 lg:hidden">
              Swipe horizontally to see more categories.
          </p>
        </div>
      </section> */}

      <CategorySection />

      {/* Product Section (Combined from your Example components, with Add to Bag) */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Featured Products</h2>

          <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id}>
                <div className="relative">
                  <div className="relative h-72 w-full overflow-hidden rounded-lg">
                    <img alt={product.imageAlt} src={product.imageSrc} className="size-full object-cover" />
                  </div>
                  
                  {/* Price overlay (kept from the 'Example' code) */}
                  <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                    {/* Note: bg-linear-to-t is a non-standard Tailwind class. You might need to define it or use a gradient class if your config supports it. */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50" 
                    />
                    <p className="relative text-lg font-semibold text-white">{product.price}</p>
                  </div>
                </div>
                
                {/* Product Name/Color Info */}
                <div className="relative mt-4">
                  <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>

                {/* Add to Bag Option */}
                <div className="mt-6">
                  <a
                    href={product.href}
                    className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 transition-colors"
                  >
                    Add to bag<span className="sr-only">, {product.name}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-gray-100 py-16 lg:py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Content Grid: Use items-center for perfect vertical alignment */}
        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-2 lg:gap-x-16 lg:items-center">
            
            {/* Left Column: Fixed Size Image */}
            <div className="flex justify-center lg:justify-start">
                
                {/* Fixed container size: h-96 is a good standard height (24rem) */}
                <div className="w-full max-w-lg lg:max-w-none h-96">
                    <img
                        src="product1.jpg"
                        alt="Company introduction image"
                        // w-full h-full makes the image fill the fixed container
                        // object-cover ensures no stretching, maintaining aspect ratio
                        className="w-full h-full object-cover rounded-lg shadow-xl"
                    />
                </div>
            </div>

            {/* Right Column: Text Content (Professionally Aligned) */}
            <div className="flex flex-col justify-center">
                
                {/* Use max-w-prose for a text-line length considered readable and professional */}
                <div className="max-w-prose">
                    
                    {/* Professional, slightly subdued heading */}
                    <p className="text-sm font-semibold uppercase tracking-wider text-black mb-2">
                        ABOUT US
                    </p>
                    <h2 className="text-3xl font-extrabold tracking-tight text-[#5e785a] mb-6">
                        Mandaram Drapes
                    </h2>
                    
                    {/* Use proper <p> tags and space-y-4 for clear separation */}
                    <div className="text-base text-gray-400 space-y-4">
                        <p>
                            Welcome to Mandaram Drapes where tradition meets timeless fashion. 
                            Born from a deep love for Indian craftsmanship, Mandaram is more than just a clothing label — it’s a journey through threads of heritage, art, and individuality. 
                            Every saree and churidar in our collection is carefully curated, highlighting handpicked fabrics, intricate weaves, and soulful details that celebrate the beauty of Indian culture.
                        </p>
                        <p>
                            From the graceful drape of a Banarasi saree to the soft flow of a linen churidar, our designs are made to make you feel confident, elegant, and connected to your roots. 
                            Whether you’re dressing up for a celebration or adding ethnic flair to your everyday look, Mandaram ensures that style and comfort walk hand in hand.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>

<footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center gap-x-6 md:order-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon aria-hidden="true" className="size-6" />
            </a>
          ))}
        </div>
        <p className="mt-8 text-center text-sm/6 text-gray-600 md:order-1 md:mt-0 dark:text-gray-400">
          &copy; 2024 Your Company, Inc. All rights reserved.
        </p>
      </div>
    </footer>
    </div>
  )
}

export default Customerdashboard



