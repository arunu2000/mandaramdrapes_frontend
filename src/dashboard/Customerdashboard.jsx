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

const categories = [
  {
    id: 1,
    name: 'Shirts',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg',
  },
  {
    id: 2,
    name: 'Trousers',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-02-image-card-02.jpg',
  },
  {
    id: 3,
    name: 'Jackets',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-02-image-card-03.jpg',
  },
  {
    id: 4,
    name: 'Accessories',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-02-image-card-04.jpg',
  },
  {
    id: 5,
    name: 'Footwear',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-02-image-card-02.jpg',
  },
  {
    id: 6,
    name: 'Hats',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg',
  },
];

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

const Customerdashboard = () => {
  const scrollContainerRef = useRef(null);

  // Function to handle horizontal scrolling
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400; 
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const showArrows = categories.length > 4;

  return (
    <div>
      {/* Navbar */}
      <nav className='fixed top-0 left-0 w-full bg-white shadow-md z-50'>
        <div className='flex justify-around items-center text-[#5e785a] p-3'>
          <div><img className='h-10 w-auto' src="logo123.png" alt="Modimal Logo" /></div>
          <ul className='flex justify-center gap-10 text-sm items-center font-medium'>
            <li><a href="#" className="hover:text-gray-900 transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-gray-900 transition-colors">Shop</a></li>
            <Link to="/cart" className="p-2 text-gray-400 hover:text-gray-500">
                {/* Shopping Bag Icon or Text */}
                <span className="ml-2 text-sm font-medium text-gray-700">Cart</span>
            </Link>
            <li><a href="#" className="hover:text-gray-900 transition-colors">My Orders</a></li>
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
      </div>

      {/* Category Section (Fixed Size & Transparent Arrows) */}
      <section className="bg-gray-50 py-20 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-14 tracking-tight">
            Shop by Category
          </h2>

          <div className="relative">
            {/* LEFT ARROW (Transparent background) */}
            {showArrows && (
              <button
                onClick={() => scroll('left')}
                aria-label="Scroll categories left"
                className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 p-2 text-gray-700 hover:text-gray-900 transition hidden lg:block"
              >
                <ChevronLeftIcon />
              </button>
            )}

            {/* SCROLLABLE WRAPPER (hides scrollbar) */}
            <div
              ref={scrollContainerRef}
              className="overflow-x-scroll whitespace-nowrap"
              style={{
                scrollbarWidth: 'none', /* Firefox */
                msOverflowStyle: 'none', /* IE and Edge */
              }}
            >
              <div className="inline-flex space-x-6 pb-4">
                {categories.map((category) => (
                  <div 
                    key={category.id} 
                    className="group relative flex-shrink-0 w-[280px] sm:w-[300px] lg:w-[270px] xl:w-[280px]"
                  >
                    <a href="#" className='block'>
                      {/* Image container: Fixed height (h-64) for consistent size/alignment */}
                      <div className="w-full h-64 overflow-hidden rounded-md bg-gray-200"> 
                        <img
                          src={category.imageSrc}
                          alt={category.name}
                          className="h-full w-full object-cover object-center group-hover:opacity-75 transition duration-300"
                        />
                      </div>
                      {/* Text alignment remains centered */}
                      <div className="mt-4 pb-4 text-center"> 
                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[#5e785a] transition-colors duration-300">
                          {category.name}
                        </h3>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
            
            {/* RIGHT ARROW (Transparent background) */}
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
          
          <p className="mt-4 text-center text-sm text-gray-500 lg:hidden">
              Swipe horizontally to see more categories.
          </p>
        </div>
      </section>

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
                    <div className="text-base text-black space-y-4">
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
    </div>
  )
}

export default Customerdashboard



