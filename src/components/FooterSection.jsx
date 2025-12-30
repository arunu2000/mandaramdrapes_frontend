// import React from "react";
// import product4 from "../assets/product4.jpg"
// import blur from "../assets/Blur2.png"

// const FooterSection = () => {
//   return (
//     <>
//       {/* About Us Section */}
//       <footer className="bg-white border-t border-gray-100 py-16 lg:py-24">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-2 lg:gap-x-16 lg:items-center">
//             {/* Image */}
//             <div className="flex justify-center lg:justify-start">
//               <div className="w-full max-w-lg lg:max-w-none h-96">
//                 <img
//                   src={blur}
//                   alt="Company introduction image"
//                   className="w-full h-full object-cover "
//                 />
//               </div>
//             </div>

//             {/* Text */}
//             <div className="flex flex-col justify-center md:justify-center">
//               <div className="max-w-prose">
//                 <p className="text-sm font-semibold uppercase tracking-wider text-black mb-2 px-5">
//                   ABOUT US
//                 </p>
//                 <h2 className="text-3xl font-extrabold tracking-tight text-[#5e785a] mb-6 px-5">
//                   Mandaram Drapes
//                 </h2>

//                 <div className="text-base text-gray-400 space-y-4 p-5">
//                   <p>
//                     Welcome to Mandaram Drapes, where tradition meets timeless fashion.  
//                     Born from a deep love for Indian craftsmanship, Mandaram is more than just a clothing label —  
//                     it's a journey through threads of heritage, art, and individuality.  
//                     Every saree and churidar in our collection is carefully curated,  
//                     highlighting handpicked fabrics, intricate weaves, and soulful details  
//                     that celebrate the beauty of Indian culture.
//                   </p>
//                   <p>
//                     From the graceful drape of a Banarasi saree to the soft flow of a linen churidar,  
//                     our designs are made to make you feel confident, elegant, and connected to your roots.  
//                     Whether you're dressing up for a celebration or adding ethnic flair to your everyday look,  
//                     Mandaram ensures that style and comfort walk hand in hand.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>

    
//     </>
//   );
// };

// export default FooterSection;


//glassmorphism

import React from "react";
import blur from "../assets/Blur2.png";

const FooterSection = () => {
  return (
    <>
      {/* Modern Full-Width Hero Section */}
      <section className="relative min-h-screen lg:min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Full-Width Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={blur}
            alt="Luxurious textile background"
            className="w-full h-full object-contain"
          />
          {/* Gradient Overlay for Depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-[#5e785a]/10"></div>
          {/* Subtle Texture Overlay */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.3' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '20px 20px'
            }}
          ></div>
        </div>

        {/* Content Overlay - Modern Layout */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column - Text Content with Modern Typography */}
            <div className="lg:pr-12 max-w-xl">

              {/* Premium Badge */}
              <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <span className="w-2 h-2 bg-[#5e785a] rounded-full"></span>
                <span className="text-sm font-medium tracking-widest text-black uppercase">
                  Since 2010
                </span>
              </div>

              {/* Headline with Gradient Text */}
              <h2 className="text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                <span 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-black via-black to-black"
                >
                  Mandaram
                </span>
                <br />
                <span className="text-black">Drapes</span>
              </h2>

              {/* Subtitle */}
              <p className="text-xl text-black/90 font-light mb-10 leading-relaxed">
                Where heritage weaves meet contemporary elegance. Each piece is a
                story of craftsmanship, worn with pride.
              </p>

              {/* Enhanced Description with Cards */}
              <div className="space-y-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <h3 className="text- text-lg font-semibold mb-3">
                    Timeless Craftsmanship
                  </h3>
                  <p className="text-black/80 leading-relaxed">
                    Born from a deep love for Indian artistry, Mandaram is more than a
                    clothing label — it's a journey through threads of heritage. Every
                    saree and churidar showcases handpicked fabrics and intricate weaves
                    that celebrate cultural beauty.
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <h3 className="text-black text-lg font-semibold mb-3">
                    Elegance in Every Thread
                  </h3>
                  <p className="text-black/80 leading-relaxed">
                    From Banarasi sarees to linen churidars, our designs blend
                    confidence with comfort. Whether for celebrations or daily elegance,
                    Mandaram ensures style walks hand in hand with tradition.
                  </p>
                </div>
              </div>

              {/* Modern CTA Button */}
              <div className="mt-12">
                <button className="group relative px-8 py-4 bg-transparent border-2 border-black rounded-full overflow-hidden transition-all duration-300  hover:border-black">
                  <span className="relative z-10 text-black font-medium tracking-wide ">
                    Explore Collection
                  </span>
                  <div className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                  <div className="absolute top-0 right-0 w-12 h-12 bg-white/10 rounded-full translate-x-6 -translate-y-6 group-hover:scale-150 transition-transform duration-500"></div>
                </button>
              </div>
            </div>

            {/* Right Column - Decorative Elements & Stats */}
            <div className="relative hidden lg:flex flex-col items-end pr-10">

              {/* Floating Image Card */}
              <div className="relative">
                <div className="absolute -top-6 -right-6 w-64 h-64 bg-gradient-to-br from-white to-transparent rounded-3xl rotate-12 opacity-20"></div>
                <div className="absolute -bottom-6 -left-6 w-56 h-56 bg-gradient-to-tr from-white to-transparent rounded-3xl -rotate-12 opacity-10"></div>

                {/* Stats Cards */}
                <div className="space-y-6">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:-translate-y-2 transition-transform duration-300">
                    <div className="text-4xl font-bold text-black mb-2">500+</div>
                    <div className="text-black/80 text-sm uppercase tracking-widest">
                      Unique Designs
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:-translate-y-2 transition-transform duration-300">
                    <div className="text-4xl font-bold text-black mb-2">10K+</div>
                    <div className="text-black/80 text-sm uppercase tracking-widest">
                      Satisfied Clients
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:-translate-y-2 transition-transform duration-300">
                    <div className="text-4xl font-bold text-black mb-2">15</div>
                    <div className="text-black/80 text-sm uppercase tracking-widest">
                      Years of Excellence
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      {/* <footer className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Mandaram Drapes</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Elevating traditional wear with contemporary elegance since 2010.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-lg">Collections</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">Sarees</li>
                <li className="hover:text-white transition-colors cursor-pointer">Churidars</li>
                <li className="hover:text-white transition-colors cursor-pointer">Lehengas</li>
                <li className="hover:text-white transition-colors cursor-pointer">Bridal Wear</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-lg">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">Our Story</li>
                <li className="hover:text-white transition-colors cursor-pointer">Craftsmanship</li>
                <li className="hover:text-white transition-colors cursor-pointer">Sustainability</li>
                <li className="hover:text-white transition-colors cursor-pointer">Contact</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-lg">Connect</h4>
              <p className="text-gray-400 mb-6 text-sm">
                Subscribe for exclusive updates and new collections
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-white/10 border border-white/20 rounded-l-lg px-4 py-3 focus:outline-none focus:border-[#5e785a]"
                />
                <button className="bg-[#5e785a] px-6 rounded-r-lg font-medium hover:bg-[#4a6147] transition-colors">
                  →
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400 text-sm">
            <p>© 2024 Mandaram Drapes. All rights reserved. Crafted with tradition.</p>
          </div>
        </div>
      </footer> */}

      <footer className="bg-black text-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <h3 className="text-3xl font-light mb-6">Mandaram Drapes</h3>
            <p className="text-white/70 max-w-2xl mx-auto mb-12">
              Elevating traditional Indian wear with contemporary elegance. 
              Each piece tells a story of heritage and craftsmanship.
            </p>
            
            {/* Footer Links */}
            <div className="flex flex-wrap justify-center gap-8 mb-12 text-sm">
              <a href="#" className="text-white/70 hover:text-white transition-colors">Collections</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">Our Story</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">Craftsmanship</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">Contact</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">Lookbook</a>
            </div>
            
            {/* Newsletter */}
            {/* <div className="max-w-md mx-auto mb-12">
              <p className="text-white/70 mb-4 text-sm">
                Subscribe for updates on new collections
              </p> */}
              {/* <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-white/10 border border-white/20 px-6 py-3 focus:outline-none focus:border-white/40 rounded-l-lg"
                />
                <button className="bg-white text-black px-8 py-3 font-medium hover:bg-white/90 transition-colors rounded-r-lg">
                  Subscribe
                </button>
              </div>
            </div> */}
            
            {/* Copyright */}
            <div className="border-t border-white/10 pt-8">
              <p className="text-white/50 text-sm">
                © 2024 Mandaram Drapes. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterSection;


// import React from "react";
// import blur from "../assets/Blur2.png";

// const FooterSection = () => {
//   return (
//     <>
//       {/* Hero Section with Full-Screen Image */}
//       <section className="relative min-h-screen flex items-center">
//         {/* Full-Screen Background Image */}
//         <div className="absolute inset-0 z-0">
//           <img
//             src={blur}
//             alt="Luxurious textile background"
//             className="w-full h-full object-contain"
//             style={{ objectPosition: "left center" }}
//           />
//           {/* Subtle Dark Overlay for Text Readability */}
//           <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/10 to-black/20"></div>
//         </div>

//         {/* Content Overlay */}
//         <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8 py-12 lg:py-24">
//           <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
//             {/* Left Column - Text Content */}
//             <div className="text-white">
//               {/* Minimal Title */}
//               <div className="mb-8">
//                 <h1 className="text-5xl lg:text-7xl font-light tracking-tight mb-4">
//                   Mandaram
//                 </h1>
//                 <h2 className="text-4xl lg:text-6xl font-medium tracking-tight">
//                   Drapes
//                 </h2>
//               </div>

//               {/* Subtitle */}
//               <p className="text-xl lg:text-2xl font-light text-white/90 mb-12 leading-relaxed max-w-xl">
//                 Heritage weaves meet contemporary elegance. Each piece is a story 
//                 of craftsmanship, worn with pride.
//               </p>

//               {/* Craftsmanship Section */}
//               <div className="mb-12">
//                 <h3 className="text-2xl lg:text-3xl font-medium mb-6">
//                   Timeless Craftsmanship
//                 </h3>
//                 <p className="text-lg text-white/80 leading-relaxed max-w-2xl">
//                   Born from a deep love for Indian artistry, Mandaram is more than a 
//                   clothing label — it's a journey through threads of heritage. Every 
//                   saree and churidar showcases handpicked fabrics and intricate weaves 
//                   that celebrate cultural beauty.
//                 </p>
//               </div>

//               {/* Divider */}
//               <div className="w-24 h-px bg-white/30 mb-12"></div>

//               {/* Stats Section */}
//               <div className="grid grid-cols-2 gap-8">
//                 <div>
//                   <div className="text-5xl lg:text-6xl font-light mb-2">500+</div>
//                   <div className="text-sm uppercase tracking-widest text-white/70">
//                     Unique Designs
//                   </div>
//                 </div>
//                 <div>
//                   <div className="text-5xl lg:text-6xl font-light mb-2">10K+</div>
//                   <div className="text-sm uppercase tracking-widest text-white/70">
//                     Satisfied Clients
//                   </div>
//                 </div>
//               </div>

//               {/* CTA Button */}
//               <div className="mt-16">
//                 <button className="px-10 py-4 border-2 border-white/30 hover:border-white text-white text-lg font-medium tracking-wide transition-all duration-300 hover:bg-white/10 backdrop-blur-sm rounded-full">
//                   Explore Collection
//                 </button>
//               </div>
//             </div>

//             {/* Right Column - Empty for Image to Shine Through */}
//             <div className="hidden lg:block">
//               {/* This column intentionally left empty to give space for background image */}
//             </div>
//           </div>
//         </div>

//         {/* Scroll Indicator */}
//         <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
//           <div className="animate-pulse">
//             <div className="text-white/60 text-sm tracking-widest uppercase">
//               Scroll
//             </div>
//             <div className="mx-auto w-px h-12 bg-white/40 mt-2"></div>
//           </div>
//         </div>
//       </section>

//       {/* Minimal Footer */}
//       <footer className="bg-black text-white py-16">
//         <div className="max-w-4xl mx-auto px-6">
//           <div className="text-center">
//             <h3 className="text-3xl font-light mb-6">Mandaram Drapes</h3>
//             <p className="text-white/70 max-w-2xl mx-auto mb-12">
//               Elevating traditional Indian wear with contemporary elegance. 
//               Each piece tells a story of heritage and craftsmanship.
//             </p>
            
//             {/* Footer Links */}
//             <div className="flex flex-wrap justify-center gap-8 mb-12 text-sm">
//               <a href="#" className="text-white/70 hover:text-white transition-colors">Collections</a>
//               <a href="#" className="text-white/70 hover:text-white transition-colors">Our Story</a>
//               <a href="#" className="text-white/70 hover:text-white transition-colors">Craftsmanship</a>
//               <a href="#" className="text-white/70 hover:text-white transition-colors">Contact</a>
//               <a href="#" className="text-white/70 hover:text-white transition-colors">Lookbook</a>
//             </div>
            
//             {/* Newsletter */}
//             {/* <div className="max-w-md mx-auto mb-12">
//               <p className="text-white/70 mb-4 text-sm">
//                 Subscribe for updates on new collections
//               </p> */}
//               {/* <div className="flex">
//                 <input
//                   type="email"
//                   placeholder="Your email"
//                   className="flex-1 bg-white/10 border border-white/20 px-6 py-3 focus:outline-none focus:border-white/40 rounded-l-lg"
//                 />
//                 <button className="bg-white text-black px-8 py-3 font-medium hover:bg-white/90 transition-colors rounded-r-lg">
//                   Subscribe
//                 </button>
//               </div>
//             </div> */}
            
//             {/* Copyright */}
//             <div className="border-t border-white/10 pt-8">
//               <p className="text-white/50 text-sm">
//                 © 2024 Mandaram Drapes. All rights reserved.
//               </p>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default FooterSection;




// import React from "react";
// import blur from "../assets/Blur2.png";
// // import girlImage from "../assets/girl.jpg"; // <-- IMPORTANT: Uncomment this line if you have the actual image file

// const FooterSection = () => {
//   return (
//     <>
//       {/* Modern Full-Width Hero Section */}
//       <section className="relative min-h-screen lg:min-h-[90vh] flex items-center justify-center overflow-hidden">
//         {/* Full-Width Background Image with Overlay */}
//         <div className="absolute inset-0 z-0">
//           <img
//             src={blur}
//             alt="Luxurious textile background"
//             className="w-full h-full object-contain"
//           />
//           {/* Gradient Overlay for Depth */}
//           <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-[#5e785a]/10"></div>
//           {/* Subtle Texture Overlay */}
//           <div
//             className="absolute inset-0 opacity-10"
//             style={{
//               backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.3' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
//               backgroundSize: '20px 20px'
//             }}
//           ></div>
//         </div>

//         {/* Content Overlay - Modern Layout */}
//         <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
//           <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
//             {/* ⬅️ Left Column - Text Content (Unchanged) */}
//             <div className="lg:pr-12 max-w-xl">
//               {/* Premium Badge */}
//               <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
//                 <span className="w-2 h-2 bg-[#5e785a] rounded-full"></span>
//                 <span className="text-sm font-medium tracking-widest text-black uppercase">
//                   Since 2010
//                 </span>
//               </div>

//               {/* Headline with Gradient Text */}
//               <h2 className="text-5xl lg:text-6xl font-bold tracking-tight mb-6">
//                 <span
//                   className="text-transparent bg-clip-text bg-gradient-to-r from-black via-black to-white"
//                 >
//                   Mandaram
//                 </span>
//                 <br />
//                 <span className="text-black">Drapes</span>
//               </h2>

//               {/* Subtitle */}
//               <p className="text-xl text-black/90 font-light mb-10 leading-relaxed">
//                 Where heritage weaves meet contemporary elegance. Each piece is a
//                 story of craftsmanship, worn with pride.
//               </p>

//               {/* Enhanced Description with Cards */}
//               <div className="space-y-8">
//                 <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
//                   <h3 className="text-black text-lg font-semibold mb-3">
//                     Timeless Craftsmanship
//                   </h3>
//                   <p className="text-black/80 leading-relaxed">
//                     Born from a deep love for Indian artistry, Mandaram is more than a
//                     clothing label — it's a journey through threads of heritage. Every
//                     saree and churidar showcases handpicked fabrics and intricate weaves
//                     that celebrate cultural beauty.
//                   </p>
//                 </div>

//                 <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
//                   <h3 className="text-black text-lg font-semibold mb-3">
//                     Elegance in Every Thread
//                   </h3>
//                   <p className="text-black/80 leading-relaxed">
//                     From Banarasi sarees to linen churidars, our designs blend
//                     confidence with comfort. Whether for celebrations or daily elegance,
//                     Mandaram ensures style walks hand in hand with tradition.
//                   </p>
//                 </div>
//               </div>

//               {/* Modern CTA Button */}
//               <div className="mt-12">
//                 <button className="group relative px-8 py-4 bg-transparent border-2 border-black rounded-full overflow-hidden transition-all duration-300  hover:border-black">
//                   <span className="relative z-10 text-black font-medium tracking-wide ">
//                     Explore Collection
//                   </span>
//                   <div className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
//                   <div className="absolute top-0 right-0 w-12 h-12 bg-white/10 rounded-full translate-x-6 -translate-y-6 group-hover:scale-150 transition-transform duration-500"></div>
//                 </button>
//               </div>
//             </div>

//             {/* ➡️ Right Column - Image & Stats (Modified to prioritize image space) */}
//             <div className="relative hidden lg:flex flex-col items-center justify-center">

//                 {/* 1. Image Placeholder */}
//                 {/* <div className="w-full max-w-md h-[400px] mb-8 rounded-2xl overflow-hidden shadow-2xl">
//                     <img
//                         src={blur} // ⚠️ REPLACE with your actual image path (e.g., {girlImage})
//                         alt="Model showcasing Mandaram Drapes collection"
//                         className="w-full h-full object-cover object-top"
//                     />
//                 </div> */}
              
//                 {/* 2. Stats Cards Container */}
//                 <div className="flex justify-around w-full gap-4">
//                     {/* Unique Designs */}
//                     <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 flex-1 hover:-translate-y-2 transition-transform duration-300">
//                       <div className="text-3xl font-bold text-black mb-1">500+</div>
//                       <div className="text-black/80 text-xs uppercase tracking-widest">
//                         Unique Designs
//                       </div>
//                     </div>

//                     {/* Satisfied Clients */}
//                     <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 flex-1 hover:-translate-y-2 transition-transform duration-300">
//                       <div className="text-3xl font-bold text-black mb-1">10K+</div>
//                       <div className="text-black/80 text-xs uppercase tracking-widest">
//                         Satisfied Clients
//                       </div>
//                     </div>

//                     {/* Years of Excellence */}
//                     <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 flex-1 hover:-translate-y-2 transition-transform duration-300">
//                       <div className="text-3xl font-bold text-black mb-1">15</div>
//                       <div className="text-black/80 text-xs uppercase tracking-widest">
//                         Years of Excellence
//                       </div>
//                     </div>
//                 </div>
//             </div>
//           </div>
//         </div>

//         {/* Scroll Indicator (Unchanged) */}
//         <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
//           <div className="animate-bounce">
//             <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
//               <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Modern Footer (Unchanged) */}
//       <footer className="bg-black text-white py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid md:grid-cols-4 gap-12">
//             {/* ... Footer Content ... (Unchanged) */}
//             <div>
//               <h3 className="text-2xl font-bold mb-6">Mandaram Drapes</h3>
//               <p className="text-gray-400 text-sm leading-relaxed">
//                 Elevating traditional wear with contemporary elegance since 2010.
//               </p>
//             </div>

//             <div>
//               <h4 className="font-semibold mb-6 text-lg">Collections</h4>
//               <ul className="space-y-3 text-gray-400">
//                 <li className="hover:text-white transition-colors cursor-pointer">Sarees</li>
//                 <li className="hover:text-white transition-colors cursor-pointer">Churidars</li>
//                 <li className="hover:text-white transition-colors cursor-pointer">Lehengas</li>
//                 <li className="hover:text-white transition-colors cursor-pointer">Bridal Wear</li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="font-semibold mb-6 text-lg">Company</h4>
//               <ul className="space-y-3 text-gray-400">
//                 <li className="hover:text-white transition-colors cursor-pointer">Our Story</li>
//                 <li className="hover:text-white transition-colors cursor-pointer">Craftsmanship</li>
//                 <li className="hover:text-white transition-colors cursor-pointer">Sustainability</li>
//                 <li className="hover:text-white transition-colors cursor-pointer">Contact</li>
//               </ul>
//             </div>

//             {/* <div>
//               <h4 className="font-semibold mb-6 text-lg">Connect</h4>
//               <p className="text-gray-400 mb-6 text-sm">
//                 Subscribe for exclusive updates and new collections
//               </p>
//               <div className="flex">
//                 <input
//                   type="email"
//                   placeholder="Your email"
//                   className="flex-1 bg-white/10 border border-white/20 rounded-l-lg px-4 py-3 focus:outline-none focus:border-[#5e785a]"
//                 />
//                 <button className="bg-[#5e785a] px-6 rounded-r-lg font-medium hover:bg-[#4a6147] transition-colors">
//                   →
//                 </button>
//               </div>
//             </div> */}
//           </div>

//           <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400 text-sm">
//             <p>© 2024 Mandaram Drapes. All rights reserved. Crafted with tradition.</p>
//           </div>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default FooterSection;



// import React from "react";
// import blur from "../assets/Blur2.png";
// // import girlImage from "../assets/girl.jpg"; // <-- IMPORTANT: Uncomment this line if you have the actual image file

// const FooterSection = () => {
//   return (
//     <>
//       {/* Modern Full-Width Hero Section */}
//       <section className="relative min-h-screen lg:min-h-[90vh] flex items-center justify-center overflow-hidden">
//         {/* Full-Width Background Image with Overlay */}
//         <div className="absolute inset-0 z-0">
//           <img
//             src={blur}
//             alt="Luxurious textile background"
//             className="w-full h-full object-contain"
//           />
//           {/* Gradient Overlay for Depth */}
//           <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-[#5e785a]/10"></div>
//           {/* Subtle Texture Overlay */}
//           <div
//             className="absolute inset-0 opacity-10"
//             style={{
//               backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.3' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
//               backgroundSize: '20px 20px'
//             }}
//           ></div>
//         </div>

//         {/* Content Overlay - Modern Layout */}
//         <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
//           <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
//             {/* ⬅️ Left Column - Text Content */}
//             <div className="lg:pr-12 max-w-xl">
//               {/* Premium Badge */}
//               <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
//                 <span className="w-2 h-2 bg-[#5e785a] rounded-full"></span>
//                 <span className="text-sm font-medium tracking-widest text-black uppercase">
//                   Since 2010
//                 </span>
//               </div>

//               {/* Headline with Gradient Text */}
//               <h2 className="text-5xl lg:text-6xl font-bold tracking-tight mb-6">
//                 <span
//                   className="text-transparent bg-clip-text bg-gradient-to-r from-black via-black to-white"
//                 >
//                   Mandaram
//                 </span>
//                 <br />
//                 <span className="text-black">Drapes</span>
//               </h2>

//               {/* Subtitle */}
//               <p className="text-xl text-black/90 font-light mb-10 leading-relaxed">
//                 Where heritage weaves meet contemporary elegance. Each piece is a
//                 story of craftsmanship, worn with pride.
//               </p>

//               {/* Enhanced Description with Cards */}
//               <div className="space-y-8">
//                 <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
//                   <h3 className="text-black text-lg font-semibold mb-3">
//                     Timeless Craftsmanship
//                   </h3>
//                   <p className="text-black/80 leading-relaxed">
//                     Born from a deep love for Indian artistry, Mandaram is more than a
//                     clothing label — it's a journey through threads of heritage. Every
//                     saree and churidar showcases handpicked fabrics and intricate weaves
//                     that celebrate cultural beauty.
//                   </p>
//                 </div>

//                 <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
//                   <h3 className="text-black text-lg font-semibold mb-3">
//                     Elegance in Every Thread
//                   </h3>
//                   <p className="text-black/80 leading-relaxed">
//                     From Banarasi sarees to linen churidars, our designs blend
//                     confidence with comfort. Whether for celebrations or daily elegance,
//                     Mandaram ensures style walks hand in hand with tradition.
//                   </p>
//                 </div>
//               </div>

//               {/* Modern CTA Button */}
//               <div className="mt-12">
//                 <button className="group relative px-8 py-4 bg-transparent border-2 border-black rounded-full overflow-hidden transition-all duration-300  hover:border-black">
//                   <span className="relative z-10 text-black font-medium tracking-wide ">
//                     Explore Collection
//                   </span>
//                   <div className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
//                   <div className="absolute top-0 right-0 w-12 h-12 bg-white/10 rounded-full translate-x-6 -translate-y-6 group-hover:scale-150 transition-transform duration-500"></div>
//                 </button>
//               </div>
//             </div>

//             {/* ➡️ Right Column - Image & Stats */}
//             <div className="relative flex flex-col items-center justify-center">
//               {/* Image Placeholder */}
//               <div className="w-full max-w-lg h-[500px] mb-8 rounded-2xl overflow-hidden shadow-2xl">
//                 <img
//                   src={blur} // ⚠️ REPLACE with your actual image path (e.g., {girlImage})
//                   alt="Model showcasing Mandaram Drapes collection"
//                   className="w-full h-full object-cover object-top"
//                 />
//               </div>
              
//               {/* Stats Cards Container */}
//               <div className="flex justify-around w-full gap-4">
//                   {/* Unique Designs */}
//                   <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 flex-1 hover:-translate-y-2 transition-transform duration-300">
//                     <div className="text-3xl font-bold text-black mb-1">500+</div>
//                     <div className="text-black/80 text-xs uppercase tracking-widest">
//                       Unique Designs
//                     </div>
//                   </div>

//                   {/* Satisfied Clients */}
//                   <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 flex-1 hover:-translate-y-2 transition-transform duration-300">
//                     <div className="text-3xl font-bold text-black mb-1">10K+</div>
//                     <div className="text-black/80 text-xs uppercase tracking-widest">
//                       Satisfied Clients
//                     </div>
//                   </div>

//                   {/* Years of Excellence */}
//                   <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 flex-1 hover:-translate-y-2 transition-transform duration-300">
//                     <div className="text-3xl font-bold text-black mb-1">15</div>
//                     <div className="text-black/80 text-xs uppercase tracking-widest">
//                       Years of Excellence
//                     </div>
//                   </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Scroll Indicator */}
//         <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
//           <div className="animate-bounce">
//             <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
//               <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Modern Footer */}
//       <footer className="bg-black text-white py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid md:grid-cols-4 gap-12">
//             <div>
//               <h3 className="text-2xl font-bold mb-6">Mandaram Drapes</h3>
//               <p className="text-gray-400 text-sm leading-relaxed">
//                 Elevating traditional wear with contemporary elegance since 2010.
//               </p>
//             </div>

//             <div>
//               <h4 className="font-semibold mb-6 text-lg">Collections</h4>
//               <ul className="space-y-3 text-gray-400">
//                 <li className="hover:text-white transition-colors cursor-pointer">Sarees</li>
//                 <li className="hover:text-white transition-colors cursor-pointer">Churidars</li>
//                 <li className="hover:text-white transition-colors cursor-pointer">Lehengas</li>
//                 <li className="hover:text-white transition-colors cursor-pointer">Bridal Wear</li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="font-semibold mb-6 text-lg">Company</h4>
//               <ul className="space-y-3 text-gray-400">
//                 <li className="hover:text-white transition-colors cursor-pointer">Our Story</li>
//                 <li className="hover:text-white transition-colors cursor-pointer">Craftsmanship</li>
//                 <li className="hover:text-white transition-colors cursor-pointer">Sustainability</li>
//                 <li className="hover:text-white transition-colors cursor-pointer">Contact</li>
//               </ul>
//             </div>
//           </div>

//           <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400 text-sm">
//             <p>© 2024 Mandaram Drapes. All rights reserved. Crafted with tradition.</p>
//           </div>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default FooterSection;





