import React from "react";
import { ArrowRight } from "lucide-react";

// Import your images
import img1 from "../assets/img1.png";  // tall left
import img2 from "../assets/img2.png";  // tall green coat
import img3 from "../assets/img3.png";  // small center
import img4 from "../assets/img4.png";  // tall blue
import img5 from "../assets/img5.png";  // tall right
import img6 from "../assets/img6.png";  // bottom small left
import img7 from "../assets/img7.png";  // bottom small right

const FashionCarousel = () => {
  return (
    <div className="w-full min-h-screen bg-white py-16 px-6 md:px-16">

      {/* Top icons + heading */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600 text-sm tracking-wide">
          Learn about our latest fashion fits ✦
        </p>

        <div className="flex items-center -space-x-3">
          <img src="https://i.pravatar.cc/100?img=10" className="w-10 h-10 rounded-full border-2 border-white" />
          <img src="https://i.pravatar.cc/100?img=11" className="w-10 h-10 rounded-full border-2 border-white" />
          <img src="https://i.pravatar.cc/100?img=12" className="w-10 h-10 rounded-full border-2 border-white" />

          <button className="w-10 h-10 rounded-full bg-black text-white border-2 border-white flex items-center justify-center">
            +
          </button>
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-5xl md:text-7xl font-bold text-center mt-10 leading-tight">
        Elevate Your Style With <br /> Bold Fashion
      </h1>

      {/* Image Columns Section */}
      <div className="flex justify-center mt-16">
        <div className="flex gap-6">

          {/* Column 1 */}
          <div className="flex flex-col gap-6">
            <img src={img1} className="w-[260px] h-[380px] object-cover rounded-3xl" />
            <img src={img6} className="w-[260px] h-[160px] object-cover rounded-3xl" />
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-6">
            <img src={img2} className="w-[260px] h-[380px] object-cover rounded-3xl" />
          </div>

          {/* Column 3 (Small center card) */}
          <div className="flex flex-col justify-center">
            <img src={img3} className="w-[220px] h-[220px] object-cover rounded-3xl" />
          </div>

          {/* Column 4 */}
          <div className="flex flex-col gap-6">
            <img src={img4} className="w-[260px] h-[380px] object-cover rounded-3xl" />
            <img src={img7} className="w-[260px] h-[160px] object-cover rounded-3xl" />
          </div>

          {/* Column 5 */}
          <div className="flex flex-col gap-6">
            <img src={img5} className="w-[260px] h-[380px] object-cover rounded-3xl" />
          </div>

        </div>
      </div>

      {/* Button */}
      <div className="flex justify-center mt-14">
        <button className="bg-black text-white px-8 py-3 rounded-full text-lg font-medium flex items-center gap-2 hover:bg-gray-800 transition">
          Explore Collections <ArrowRight size={18} />
        </button>
      </div>

    </div>
  );
};

export default FashionCarousel;
