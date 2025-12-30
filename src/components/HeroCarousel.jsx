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

import img1 from "../assets/youngpretty.jpg";
import img2 from "../assets/Blur2.png";
import { Navigate } from "react-router-dom";


export default function SummerStylesHero() {

  const handleNavigate = () => {
  Navigate("/allproducts");
};

  return (
    <div className="relative overflow-hidden bg-white mt-25">
      <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Summer styles are finally here
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              This year, our new summer collection will shelter you from the
              harsh elements of a world that doesn't care if you live or die.
            </p>
          </div>
          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:top-0 sm:left-1/2 sm:translate-x-8 lg:top-1/2 lg:left-1/2 lg:translate-x-8 lg:-translate-y-1/2">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <img
                          alt=""
                          src={img1}
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg"
                          className="size-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg"
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg"
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg"
                          className="size-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg"
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg"
                          className="size-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <a
                href="#"
                className="inline-block rounded-md border border-transparent bg-black px-8 py-3 text-center font-medium text-white hover:bg-gray-500"
              >
                Shop Collection
              </a> */}

              <button
                className="inline-block rounded-md border border-transparent bg-black px-8 py-3 text-center font-medium text-white hover:bg-gray-500"
                onClick={handleNavigate}
              >
                Shop Collection
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
