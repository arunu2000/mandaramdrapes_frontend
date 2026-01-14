// import React from "react";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";

// // --- Import your images ---
// import CarouselImg4 from "../assets/carousel_img4.png";
// import CarouselImg5 from "../assets/carousel_img5.jpg";
// import CarouselImg8 from "../assets/carousel_img8.jpg";
// import CarouselImg9 from "../assets/carousel_img9.jpg";
// import CarouselImg10 from "../assets/carousel_img10.jpg";

// const HeroCarousel = () => {
//   // --- Optional: Add carousel image data ---
//   const slides = [
//     { src: CarouselImg4, alt: "Model wearing stylish outfit" },
//     { src: CarouselImg5, alt: "Clothing displayed on a rack" },
//     { src: CarouselImg8, alt: "Fashion show event" },
//     { src: CarouselImg9, alt: "Close-up of textile pattern" },
//     { src: CarouselImg10, alt: "Woman posing in a designer outfit" },
//   ];

//   return (
//     <div className=" relative w-full ">
//       <Carousel
//         autoPlay
//         infiniteLoop
//         showThumbs={false}
//         showStatus={false}
//         interval={1800}
//         transitionTime={700}
//         emulateTouch
//         stopOnHover={false}

//       >
//         {slides.map((slide, index) => (
//           <div key={index}>
//             <img
//               src={slide.src}
//               alt={slide.alt}
//               className="object-cover w-full h-auto max-h-[500px]"
//               loading="lazy"
//             />
//           </div>
//         ))}
//       </Carousel>
//     </div>
//   );
// };

// export default HeroCarousel

// import img1 from "../assets/youngpretty.jpg";
// import img2 from "../assets/Blur2.png";
// import { useNavigate } from "react-router-dom";



// export default function SummerStylesHero() {
//    const navigate = useNavigate();

//   const handleNavigate = () => {
//   navigate("/products");
// };

//   return (
//     <div className="relative overflow-hidden bg-white mt-25">
//       <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
//         <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
//           <div className="sm:max-w-lg">
//             <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
//               Summer styles are finally here
//             </h1>
//             <p className="mt-4 text-xl text-gray-500">
//               This year, our new summer collection will shelter you from the
//               harsh elements of a world that doesn't care if you live or die.
//             </p>
//           </div>
//           <div>
//             <div className="mt-10">
//               {/* Decorative image grid */}
//               <div
//                 aria-hidden="true"
//                 className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
//               >
//                 <div className="absolute transform sm:top-0 sm:left-1/2 sm:translate-x-8 lg:top-1/2 lg:left-1/2 lg:translate-x-8 lg:-translate-y-1/2">
//                   <div className="flex items-center space-x-6 lg:space-x-8">
//                     <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
//                       <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
//                         <img
//                           alt=""
//                           src={img1}
//                           className="size-full object-cover"
//                         />
//                       </div>
//                       <div className="h-64 w-44 overflow-hidden rounded-lg">
//                         <img
//                           alt=""
//                           src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg"
//                           className="size-full object-cover"
//                         />
//                       </div>
//                     </div>
//                     <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
//                       <div className="h-64 w-44 overflow-hidden rounded-lg">
//                         <img
//                           alt=""
//                           src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg"
//                           className="size-full object-cover"
//                         />
//                       </div>
//                       <div className="h-64 w-44 overflow-hidden rounded-lg">
//                         <img
//                           alt=""
//                           src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg"
//                           className="size-full object-cover"
//                         />
//                       </div>
//                       <div className="h-64 w-44 overflow-hidden rounded-lg">
//                         <img
//                           alt=""
//                           src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg"
//                           className="size-full object-cover"
//                         />
//                       </div>
//                     </div>
//                     <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
//                       <div className="h-64 w-44 overflow-hidden rounded-lg">
//                         <img
//                           alt=""
//                           src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg"
//                           className="size-full object-cover"
//                         />
//                       </div>
//                       <div className="h-64 w-44 overflow-hidden rounded-lg">
//                         <img
//                           alt=""
//                           src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg"
//                           className="size-full object-cover"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* <a
//                 href="#"
//                 className="inline-block rounded-md border border-transparent bg-black px-8 py-3 text-center font-medium text-white hover:bg-gray-500"
//               >
//                 Shop Collection
//               </a> */}

//               <button
//                 className="inline-block rounded-md border border-transparent bg-black px-8 py-3 text-center font-medium text-white hover:bg-gray-500"
//                 onClick={handleNavigate}
//               >
//                 Shop Collection
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { ArrowRight } from "lucide-react";
// import image1 from "../assets/1000.jpeg";
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


// // Assets
// import img1 from "../assets/youngpretty.jpg";
// // Assuming you have these or similar placeholders
// const imgPlaceholder = "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-";

// export default function SummerStylesHero() {
//   const navigate = useNavigate();

//   const handleNavigate = () => {
//     navigate("/products");
//   };

//   // Animation Variants for smooth staggered entrance
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.1, delayChildren: 0.2 },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0, scale: 0.95 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       scale: 1,
//       transition: { duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }, // Custom bezier for "premium" feel
//     },
//   };

//   // Hover effect for images: Scale up + Shadow + slight Rotation
//   const imageHover = {
//     scale: 1.05,
//     rotate: 1,
//     zIndex: 10,
//     boxShadow: "0px 20px 40px rgba(0,0,0,0.2)",
//     transition: { duration: 0.4, ease: "easeOut" },
//   };

//   return (
//     <div className="relative overflow-hidden  mt-25">
//       {/* Decorative subtle background gradient for depth */}
//       <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-gray-100 via-transparent to-transparent opacity-70 pointer-events-none" />

//       <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48 relative z-10">
//         <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          
//           {/* Text Section */}
//           <motion.div 
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, ease: "easeOut" }}
//             className="sm:max-w-lg"
//           >
            



//             {/* <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl">
//                Summer styles are finally here
//              </h1>
//              <p className="mt-8 text-l text-gray-500 ">
//                This year, our new summer collection will shelter you from the
//                harsh elements of a world that doesn't care if you live or die.
//              </p> */}
            
//             <div className="sm:max-w-lg">
//   <h1 className="text-3xl font-bold tracking-tighter sm:text-6xl">
//     <span className="bg-gradient-to-r from-gray-900 via-indigo-800 to-rose-700 bg-clip-text text-transparent">
//       Summer styles are finally here
//     </span>
//   </h1>
//   <p className="mt-8 text-lg font-medium text-gray-600   pl-4">
//     This year, our new summer collection will shelter you from the
//     harsh elements of a world that doesn't care if you live or die.
//   </p>
// </div>
            
//             <div className="mt-10">
//               <motion.button
//                 onClick={handleNavigate}
//                 whileHover={{ scale: 1.02, paddingRight: "2.5rem" }}
//                 whileTap={{ scale: 0.95 }}
//                 className="group relative inline-flex items-center justify-center overflow-hidden rounded-sm bg-black px-8 py-4 text-white transition-all duration-300 hover:bg-gray-900 hover:shadow-xl"
//               >
//                 <span className="mr-2 font-medium tracking-wide">Shop Collection</span>
//                 <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
//               </motion.button>
//             </div>
//           </motion.div>

//           {/* Image Grid Section */}
//           <div>
//             <div className="mt-10">
//               {/* Decorative image grid */}
//               <div
//                 aria-hidden="true"
//                 className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
//               >
//                 <div className="absolute transform sm:top-0 sm:left-1/2 sm:translate-x-8 lg:top-1/2 lg:left-1/2 lg:translate-x-8 lg:-translate-y-1/2">
//                   <motion.div 
//                     variants={containerVariants}
//                     initial="hidden"
//                     animate="visible"
//                     className="flex items-center space-x-6 lg:space-x-8"
//                   >
                    
//                     {/* Column 1 */}
//                     <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
//                       <motion.div variants={itemVariants} className="h-64 w-44 overflow-hidden rounded-2xl shadow-lg border border-white/50">
//                         <motion.img
//                           whileHover={imageHover}
//                           src={image1}
//                           alt="Fashion 1"
//                           className="size-full object-cover object-center"
//                         />
//                       </motion.div>
//                       <motion.div variants={itemVariants} className="h-64 w-44 overflow-hidden rounded-2xl shadow-lg border border-white/50">
//                         <motion.img
//                           whileHover={imageHover}
//                           src={image2}
//                           alt="Fashion 2"
//                           className="size-full object-cover object-center"
//                         />
//                       </motion.div>
//                     </div>

//                     {/* Column 2 */}
//                     <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
//                       <motion.div variants={itemVariants} className="h-64 w-44 overflow-hidden rounded-2xl shadow-lg border border-white/50">
//                         <motion.img
//                           whileHover={imageHover}
//                           src={image10}
//                           alt="Fashion 3"
//                           className="size-full object-cover object-center"
//                         />
//                       </motion.div>
//                       <motion.div variants={itemVariants} className="h-64 w-44 overflow-hidden rounded-2xl shadow-lg border border-white/50">
//                         <motion.img
//                           whileHover={imageHover}
//                           src={image4}
//                           alt="Fashion 4"
//                           className="size-full object-cover object-center"
//                         />
//                       </motion.div>
//                       <motion.div variants={itemVariants} className="h-64 w-44 overflow-hidden rounded-2xl shadow-lg border border-white/50">
//                         <motion.img
//                           whileHover={imageHover}
//                           src={image5}
//                           alt="Fashion 5"
//                           className="size-full object-cover object-center"
//                         />
//                       </motion.div>
//                     </div>

//                     {/* Column 3 */}
//                     <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
//                       <motion.div variants={itemVariants} className="h-64 w-44 overflow-hidden rounded-2xl shadow-lg border border-white/50">
//                         <motion.img
//                           whileHover={imageHover}
//                           src={image6}
//                           alt="Fashion 6"
//                           className="size-full object-cover object-center"
//                         />
//                       </motion.div>
//                       <motion.div variants={itemVariants} className="h-64 w-44 overflow-hidden rounded-2xl shadow-lg border border-white/50">
//                         <motion.img
//                           whileHover={imageHover}
//                           src={image8}
//                           alt="Fashion 7"
//                           className="size-full object-cover object-center"
//                         />
//                       </motion.div>
//                     </div>

//                   </motion.div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import image1 from "../assets/1000.jpeg";
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
import image12 from "../assets/1016.jpeg"

export default function SummerStylesHero() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/products");
  };

  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] },
    },
  };

  const imageHover = {
    scale: 1.05,
    rotate: 1,
    zIndex: 10,
    boxShadow: "0px 20px 40px rgba(0,0,0,0.2)",
    transition: { duration: 0.4, ease: "easeOut" },
  };

  return (
    <div className="relative overflow-hidden w-full bg-white mt-16 sm:mt-20 lg:mt-24">
      {/* Decorative Gradient Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-gray-100 via-transparent to-transparent opacity-70 pointer-events-none" />

      {/* Main Container */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
        {/* CHANGED: lg:items-center -> lg:items-start (Aligns content to top) */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16">
          
          {/* --- LEFT: Text Section --- */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            /* CHANGED: Added lg:mt-16 to position it slightly down from the very top, but higher than center */
            className="w-full lg:w-1/2 text-center lg:text-left z-20 mb-12 lg:mb-0 lg:mt-16"
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-gray-900 via-indigo-800 to-rose-700 bg-clip-text text-transparent block pb-2">
                Summer styles are finally here
              </span>
            </h1>
            
            <p className="mt-6 text-base sm:text-lg font-medium text-gray-600 max-w-2xl mx-auto lg:mx-0">
              This year, our new summer collection will shelter you from the
              harsh elements of a world that doesn't care if you live or die.
            </p>

            <div className="mt-8 sm:mt-10 flex justify-center lg:justify-start">
              <motion.button
                onClick={handleNavigate}
                whileHover={{ scale: 1.02, paddingRight: "2.5rem" }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-sm bg-black px-8 py-4 text-white transition-all duration-300 hover:bg-gray-900 hover:shadow-xl"
              >
                <span className="mr-2 font-medium tracking-wide">Shop Collection</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </div>
          </motion.div>

          {/* --- RIGHT: Image Grid Section --- */}
          <div className="w-full lg:w-1/2 relative z-10">
            <div className="overflow-x-auto lg:overflow-visible pb-10 lg:pb-0 hide-scrollbar px-2">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex items-start justify-center lg:justify-end space-x-4 lg:space-x-6 min-w-max lg:min-w-0"
              >
                {/* Column 1 */}
                <div className="grid shrink-0 grid-cols-1 gap-y-4 lg:gap-y-6 pt-8 lg:pt-0">
                  <motion.div
                    variants={itemVariants}
                    className="h-40 w-28 sm:h-52 sm:w-36 lg:h-64 lg:w-44 overflow-hidden rounded-xl shadow-lg border border-white/50"
                  >
                    <motion.img
                      whileHover={imageHover}
                      src={image1}
                      alt="Fashion 1"
                      className="size-full object-cover object-center"
                    />
                  </motion.div>
                  <motion.div
                    variants={itemVariants}
                    className="h-40 w-28 sm:h-52 sm:w-36 lg:h-64 lg:w-44 overflow-hidden rounded-xl shadow-lg border border-white/50"
                  >
                    <motion.img
                      whileHover={imageHover}
                      src={image2}
                      alt="Fashion 2"
                      className="size-full object-cover object-center"
                    />
                  </motion.div>
                </div>

                {/* Column 2 */}
                <div className="grid shrink-0 grid-cols-1 gap-y-4 lg:gap-y-6 -mt-8 lg:-mt-12">
                  <motion.div
                    variants={itemVariants}
                    className="h-40 w-28 sm:h-52 sm:w-36 lg:h-64 lg:w-44 overflow-hidden rounded-xl shadow-lg border border-white/50"
                  >
                    <motion.img
                      whileHover={imageHover}
                      src={image10}
                      alt="Fashion 3"
                      className="size-full object-cover object-center"
                    />
                  </motion.div>
                  <motion.div
                    variants={itemVariants}
                    className="h-40 w-28 sm:h-52 sm:w-36 lg:h-64 lg:w-44 overflow-hidden rounded-xl shadow-lg border border-white/50"
                  >
                    <motion.img
                      whileHover={imageHover}
                      src={image12}
                      alt="Fashion 4"
                      className="size-full object-cover object-center"
                    />
                  </motion.div>
                  <motion.div
                    variants={itemVariants}
                    className="h-40 w-28 sm:h-52 sm:w-36 lg:h-64 lg:w-44 overflow-hidden rounded-xl shadow-lg border border-white/50"
                  >
                    <motion.img
                      whileHover={imageHover}
                      src={image5}
                      alt="Fashion 5"
                      className="size-full object-cover object-center"
                    />
                  </motion.div>
                </div>

                {/* Column 3 */}
                <div className="grid shrink-0 grid-cols-1 gap-y-4 lg:gap-y-6 pt-8 lg:pt-0">
                  <motion.div
                    variants={itemVariants}
                    className="h-40 w-28 sm:h-52 sm:w-36 lg:h-64 lg:w-44 overflow-hidden rounded-xl shadow-lg border border-white/50"
                  >
                    <motion.img
                      whileHover={imageHover}
                      src={image6}
                      alt="Fashion 6"
                      className="size-full object-cover object-center"
                    />
                  </motion.div>
                  <motion.div
                    variants={itemVariants}
                    className="h-40 w-28 sm:h-52 sm:w-36 lg:h-64 lg:w-44 overflow-hidden rounded-xl shadow-lg border border-white/50"
                  >
                    <motion.img
                      whileHover={imageHover}
                      src={image8}
                      alt="Fashion 7"
                      className="size-full object-cover object-center"
                    />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}