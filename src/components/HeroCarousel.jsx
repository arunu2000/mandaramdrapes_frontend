import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// --- Import your images ---
import CarouselImg4 from "../assets/carousel_img4.png";
import CarouselImg5 from "../assets/carousel_img5.jpg";
import CarouselImg8 from "../assets/carousel_img8.jpg";
import CarouselImg9 from "../assets/carousel_img9.jpg";
import CarouselImg10 from "../assets/carousel_img10.jpg";

const HeroCarousel = () => {
  // --- Optional: Add carousel image data ---
  const slides = [
    { src: CarouselImg4, alt: "Model wearing stylish outfit" },
    { src: CarouselImg5, alt: "Clothing displayed on a rack" },
    { src: CarouselImg8, alt: "Fashion show event" },
    { src: CarouselImg9, alt: "Close-up of textile pattern" },
    { src: CarouselImg10, alt: "Woman posing in a designer outfit" },
  ];

  return (
    <div className="mt-[6.5rem] relative w-full">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={4000}
        transitionTime={700}
        emulateTouch
      >
        {slides.map((slide, index) => (
          <div key={index}>
            <img
              src={slide.src}
              alt={slide.alt}
              className="object-cover w-full h-auto max-h-[500px]"
              loading="lazy"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
