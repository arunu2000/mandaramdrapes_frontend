// import React, { useState } from "react";
// import { XMarkIcon } from "@heroicons/react/24/solid";

// const AnnouncementBar = () => {
//   const [isVisible, setIsVisible] = useState(true);

//   if (!isVisible) return null;

//   return (
//     <div className="bg-indigo-600 px-4 py-3 text-white relative">
//       <div className="max-w-7xl mx-auto flex items-center justify-center sm:justify-between relative z-10">
        
//         {/* Main Text */}
//         <p className="text-sm font-medium text-center sm:text-left pr-8 sm:pr-0">
//           <span className="font-bold">Cyber Monday Sale! </span> 
//           Get 50% off on all premium plans. use code:{" "}
//           <span className="font-mono bg-indigo-800 px-2 py-1 rounded ml-1">CYBER50</span>
//         </p>

//         {/* Optional CTA Link - Hidden on very small screens */}
//         <a
//           href="/sale"
//           className="hidden sm:inline-block text-sm font-bold underline underline-offset-4 hover:text-indigo-200 transition-colors"
//         >
//           Shop Now &rarr;
//         </a>
//       </div>

//       {/* Close Button */}
//       <div className="absolute inset-y-0 right-0 pt-3 pr-4 flex items-start sm:items-center sm:pt-0">
//         <button
//           type="button"
//           onClick={() => setIsVisible(false)}
//           className="rounded-md p-1 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white transition-colors"
//         >
//           <span className="sr-only">Dismiss</span>
//           <XMarkIcon className="h-5 w-5 text-white" aria-hidden="true" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AnnouncementBar;



// import React from "react";

// const AnnouncementBar = () => {
//   return (
//     <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//       {/* Container with rounded corners and background color */}
//       <div className="relative overflow-hidden bg-rose-50 rounded-[2rem] grid md:grid-cols-2 items-center">
        
//         {/* Left Column: Text Content */}
//         <div className="p-8 md:p-16 lg:p-24 order-2 md:order-1">
//           <h3 className="text-sm font-bold text-rose-600 uppercase tracking-wider mb-3">
//             Limited Time Offer
//           </h3>
//           <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
//             Get the Exclusive <br /> Summer Essentials Kit
//           </h2>
//           <p className="text-gray-600 text-lg mb-8 leading-relaxed">
//             Sign up for our newsletter today and get 30% off your first purchase of our curated summer kit. Don't miss out!
//           </p>
          
//           {/* Newsletter Form Example */}
//           <form className="flex flex-col sm:flex-row gap-3 max-w-md">
//             <input 
//               type="email" 
//               placeholder="Enter your email" 
//               className="flex-1 px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
//             />
//             <button className="px-8 py-4 bg-gray-900 text-white font-bold rounded-full hover:bg-gray-800 transition-transform active:scale-95">
//               Subscribe
//             </button>
//           </form>
//         </div>

//         {/* Right Column: Image */}
//         {/* order-1 md:order-2 ensures image is on top on mobile, right on desktop */}
//         <div className="relative h-64 md:h-full w-full order-1 md:order-2 min-h-[300px]">
//           <img
//             src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop"
//             alt="Promo Kit"
//             className="absolute inset-0 w-full h-full object-cover"
//           />
//            {/* Subtle tint overlay on the image side to blend with the background color */}
//            <div className="absolute inset-0 bg-rose-900/10 mix-blend-multiply" />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AnnouncementBar;




import React from "react";
// Make sure you have heroicons installed: npm install @heroicons/react
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import img75 from "../assets/1111.jpeg";

const HeroBanner = () => {
  const backgroundImage = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop";

  return (
    // WRAPPER: Used to provide external spacing so the banner doesn't touch the navbar

    <div></div>
    // <div className="w-full px-4 py-8">
      
    //   {/* --- BANNER CONTAINER ---
    //      1. max-w-6xl: Limits width so it's not full screen.
    //      2. mx-auto: Centers the banner horizontally.
    //      3. rounded-3xl: Adds curved corners (essential for the "floating" look).
    //      4. h-[450px]: Reduced height (was 650px).
    //      5. shadow-2xl: Adds depth.
    //   */}
    //   <div className="relative w-full max-w-6xl mx-auto h-[400px] lg:h-[500px] overflow-hidden rounded-3xl shadow-2xl">
        
    //     {/* 1. Background Image */}
    //     <img
    //       src={img75}
    //       alt="New Season Collection"
    //       className="absolute inset-0 w-full h-full object-cover object-center"
    //     />

    //     {/* 2. Dark Overlay Gradient */}
    //     <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />

    //     {/* 3. Content Container */}
    //     <div className="relative z-10 h-full w-full px-8 md:px-16 flex flex-col justify-center items-start text-white">
          
    //       {/* Small Tagline */}
    //       <span className="inline-block py-1 px-3 mb-4 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold uppercase tracking-widest border border-white/30">
    //         New Arrivals
    //       </span>

    //       {/* Main Headline - Adjusted text size slightly for smaller container */}
    //       <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-4 drop-shadow-lg">
    //         Summer Collection <br />
    //         2024
    //       </h1>

    //       {/* Subheadline */}
    //       <p className="text-base md:text-lg text-gray-200 max-w-lg mb-8 drop-shadow-md">
    //         Discover the latest trends with our new season pieces. crafted for comfort and style.
    //       </p>

    //       {/* Buttons */}
    //       <div className="flex flex-wrap gap-4">
    //         <button className="group flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-all active:scale-95 text-sm md:text-base">
    //           Shop Women
    //           <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    //         </button>
    //         <button className="flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/20 transition-all active:scale-95 text-sm md:text-base">
    //           Shop Men
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default HeroBanner;