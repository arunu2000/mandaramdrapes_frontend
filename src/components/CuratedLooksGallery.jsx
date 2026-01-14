// // src/components/CuratedLooksGallery.jsx
// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ArrowLeft, ArrowRight } from "lucide-react";
// import image2 from "../assets/1001.jpeg";
// import image3 from "../assets/1002.jpeg";
// import image4 from "../assets/1003.jpeg";
// import image5 from "../assets/1004.jpeg";
// import image6 from "../assets/1005.jpeg";
// import image7 from "../assets/1006.jpeg";
// import image8 from "../assets/1007.jpeg";
// import image9 from "../assets/1008.jpeg";
// import image10 from "../assets/1009.jpeg";
// import image11 from "../assets/1010.jpeg";


// // Placeholder data - You can replace these with your API data later
// const items = [
//   {
//     id: 1,
//     image: image2,
//     title: "Velvet Evening",
//   },
//   {
//     id: 2,
//     image: image3,
//     title: "Summer Breeze",
//   },
//   {
//     id: 3,
//     image: image4, // Added image4 here
//     title: "Classic Look",
//   },
//   {
//     id: 4,
//     image: image5,
//     title: "Urban Chic",
//   },
//   {
//     id: 5,
//     image: image6,
//     title: "Classic Menswear",
//   },
//   {
//     id: 6,
//     image: image7,
//     title: "Boho Vibes",
//   },
//   {
//     id: 7,
//     image: image8,
//     title: "Night Out",
//   },
//   {
//     id: 8,
//     image: image9,
//     title: "Casual Friday",
//   },
//   {
//     id: 9,
//     image: image10,
//     title: "Winter Collection",
//   },
//   {
//     id: 10,
//     image: image11,
//     title: "Spring Forward",
//   },
// ];

// export default function CuratedLooksGallery() {
//   const [activeIndex, setActiveIndex] = useState(2); // Start with the middle image

//   const handleNext = () => {
//     setActiveIndex((prev) => (prev + 1) % items.length);
//   };

//   const handlePrev = () => {
//     setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
//   };

//   return (
//     <div className="relative w-full bg-white py-24 overflow-hidden">
//       {/* Title Section */}
//       <div className="text-center mb-16">
//         <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-serif">
//           Curated Looks For You
//         </h2>
//         <div className="h-1 w-20 bg-black mx-auto mt-4" />
//       </div>

//       {/* Carousel Container */}
//       <div className="relative h-[600px] w-full flex items-center justify-center">
//         <div className="relative w-full max-w-7xl h-full flex items-center justify-center">
          
//           <AnimatePresence initial={false}>
//             {items.map((item, index) => {
//               // Calculate distance from active index
//               let offset = index - activeIndex;
              
//               // Logic for infinite scrolling loop
//               if (offset > items.length / 2) offset -= items.length;
//               if (offset < -items.length / 2) offset += items.length;

//               // Hide items that are too far away to keep DOM clean
//               if (Math.abs(offset) > 2) return null;

//               return (
//                 <motion.div
//                   key={item.id}
//                   layout
//                   onClick={() => setActiveIndex(index)}
//                   className="absolute cursor-pointer rounded-2xl overflow-hidden shadow-2xl bg-white"
//                   // Animation States
//                   initial={{ opacity: 0, scale: 0.5 }}
//                   animate={{
//                     x: offset * 260, // Distance between cards
//                     scale: offset === 0 ? 1 : 0.8, // Center is big, sides are smaller
//                     zIndex: 100 - Math.abs(offset), // Center is on top
//                     opacity: offset === 0 ? 1 : 0.6, // Sides are faded
//                     rotateY: offset === 0 ? 0 : offset * 5, // Subtle 3D rotation
//                     filter: offset === 0 ? "blur(0px)" : "blur(2px) grayscale(100%)", // Focus effect
//                   }}
//                   transition={{
//                     type: "spring",
//                     stiffness: 260,
//                     damping: 20,
//                   }}
//                   style={{
//                     width: "360px",
//                     height: "520px",
//                     transformOrigin: "center bottom",
//                   }}
//                 >
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     className="w-full h-full object-cover pointer-events-none"
//                   />
                  
//                   {/* Title overlay - Only visible on active card */}
//                   {offset === 0 && (
//                     <motion.div 
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ delay: 0.3 }}
//                       className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white"
//                     >
//                       <h3 className="text-xl font-medium tracking-wide text-center">{item.title}</h3>
//                     </motion.div>
//                   )}
//                 </motion.div>
//               );
//             })}
//           </AnimatePresence>
//         </div>

//         {/* Navigation Buttons */}
//         <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-20 pointer-events-none">
//            <button
//             onClick={handlePrev}
//             className="pointer-events-auto p-4 rounded-full bg-white/80 backdrop-blur-md shadow-lg hover:bg-black hover:text-white transition-all duration-300"
//           >
//             <ArrowLeft size={24} />
//           </button>
//           <button
//             onClick={handleNext}
//             className="pointer-events-auto p-4 rounded-full bg-white/80 backdrop-blur-md shadow-lg hover:bg-black hover:text-white transition-all duration-300"
//           >
//             <ArrowRight size={24} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }




// src/components/CuratedLooksGallery.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

import image2 from "../assets/1001.jpeg";
import image3 from "../assets/1002.jpeg";
import image4 from "../assets/1003.jpeg";
import image5 from "../assets/1004.jpeg";
import image6 from "../assets/1005.jpeg";
import image7 from "../assets/1006.jpeg";
import image8 from "../assets/1007.jpeg";
import image9 from "../assets/1008.jpeg";
import image10 from "../assets/1009.jpeg";
import image11 from "../assets/1010.jpeg";
import image12 from "../assets/1015.jpeg";
import image13 from "../assets/1016.jpeg";
import image14 from "../assets/1017.jpeg";
import image15 from "../assets/1018.jpeg";
import image16 from "../assets/1019.jpeg";

const items = [
  { id: 1, image: image2, title: "Velvet Evening" },
  { id: 2, image: image3, title: "Summer Breeze" },
  { id: 3, image: image4, title: "Classic Look" },
  { id: 4, image: image5, title: "Urban Chic" },
  { id: 5, image: image6, title: "Classic Menswear" },
  { id: 6, image: image7, title: "Boho Vibes" },
  { id: 7, image: image8, title: "Night Out" },
  { id: 8, image: image9, title: "Casual Friday" },
  { id: 9, image: image10, title: "Winter Collection" },
  // { id: 10, image: image11, title: "Spring Forward" },
   { id: 11, image: image12, title: "Spring Forward" },
    { id: 12, image: image13, title: "Spring Forward" },
     { id: 13, image: image14, title: "Spring Forward" },
      { id: 14, image: image15, title: "Spring Forward" },
       { id: 15, image: image16, title: "Spring Forward" },
];

export default function CuratedLooksGallery() {
  const [activeIndex, setActiveIndex] = useState(2);

  const handleNext = () =>
    setActiveIndex((prev) => (prev + 1) % items.length);

  const handlePrev = () =>
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));

  return (
    <section className="relative w-full bg-white py-16 sm:py-24 overflow-hidden">
      {/* Title */}
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-gray-900">
          Curated Looks For You
        </h2>
        <div className="h-1 w-16 sm:w-20 bg-black mx-auto mt-4" />
      </div>

      {/* Carousel */}
      <div className="relative h-[480px] sm:h-[560px] flex items-center justify-center">
        <AnimatePresence initial={false}>
          {items.map((item, index) => {
            let offset = index - activeIndex;
            if (offset > items.length / 2) offset -= items.length;
            if (offset < -items.length / 2) offset += items.length;
            if (Math.abs(offset) > 2) return null;

            return (
              <motion.div
                key={item.id}
                className="absolute rounded-2xl overflow-hidden bg-white shadow-xl cursor-pointer"
                onClick={() => setActiveIndex(index)}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{
                  x: offset * (window.innerWidth < 640 ? 180 : 280),
                  scale: offset === 0 ? 1 : 0.85,
                  zIndex: 50 - Math.abs(offset),
                  opacity: offset === 0 ? 1 : 0.5,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                style={{
                  width: window.innerWidth < 640 ? 260 : 360,
                  height: window.innerWidth < 640 ? 380 : 520,
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  draggable={false}
                />

                {offset === 0 && (
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 sm:p-6 text-white">
                    <h3 className="text-sm sm:text-xl text-center font-medium">
                      {item.title}
                    </h3>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          aria-label="Previous"
          className="absolute left-2 sm:left-10 z-50 p-3 sm:p-4 rounded-full bg-white shadow-lg active:scale-95 cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next"
          className="absolute right-2 sm:right-10 z-50 p-3 sm:p-4 rounded-full bg-white shadow-lg active:scale-95 cursor-pointer"
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
}
