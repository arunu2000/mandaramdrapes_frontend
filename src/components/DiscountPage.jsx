// import React from "react";
// import { motion } from "framer-motion";
// import Navbar from "../components/Navbar"; // Assuming you have this
// import FooterSection from "../components/FooterSection"; // Assuming you have this
// import image20 from "../assets/1020.jpeg";
// import image21 from "../assets/1021.jpeg";
// import image22 from "../assets/1022.jpeg";
// import image23 from "../assets/1023.jpeg";
// import {useNavigate} from "react-router-dom";
// // import AllProducts from "./AllProducts";




// const DiscountPage = () => {

//     const navigate = useNavigate();

// const navigateFunction = () =>{
//     navigate("/allproducts");
// }


//   return (
//     <div className="min-h-screen bg-white font-sans text-gray-900">
//       {/* Optional: Include your Navbar here */}
//       {/* <Navbar /> */}

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
//         {/* --- HEADER SECTION --- */}
//         <div className="mb-10">
//           <h4 className="text-indigo-900 font-bold uppercase tracking-wider text-sm mb-2">
//             Discount
//           </h4>
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//             SHOP NOW AND SAVE 30%
//           </h2>
//           <p className="text-gray-500 max-w-xl text-lg">
//             Grace at a Great Price! Sarees on Discount
//           </p>
//         </div>

//         {/* --- GRID LAYOUT --- */}
//         {/* We use a 3-column grid on large screens. 
//             Col 1 & 2 are tall. Col 3 is split into 2 rows. */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-auto lg:h-[600px]">
          
//           {/* 1. WOMEN'S COLLECTION (Tall - Left) */}
//           <div className="relative group overflow-hidden h-[500px] lg:h-full rounded-none">
//             <img
//               src={image20}
//               alt="Women's Collection"
//               className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
//             />
//             {/* Gradient Overlay */}
//             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
//             {/* Content */}
//             <div className="absolute bottom-10 left-8 text-white">
//               <h3 className="text-sm font-bold uppercase tracking-wider mb-2">
//                 Women's Collection
//               </h3>
//               <div className="text-5xl font-bold mb-4">20% OFF</div>
//               <p className="text-gray-200 text-sm mb-6 max-w-[200px]">
//                 Elegant kurtas and dresses designed for comfort, grace, and everyday style
//               </p>
//               <ShopNowButton />
//             </div>
//           </div>

//           {/* 2. MEN'S COLLECTION (Tall - Middle) */}
//           <div className="relative group overflow-hidden h-[500px] lg:h-full rounded-none">
//             <img
//               src={image21}
//               alt="Men's Collection"
//               className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
//             <div className="absolute bottom-10 left-8 text-white">
//               <h3 className="text-sm font-bold uppercase tracking-wider mb-2">
//                 Mohey Women's Festive Saree
//               </h3>
//               <div className="text-5xl font-bold mb-4">20% OFF</div>
//               <p className="text-gray-200 text-sm mb-6 max-w-[200px]">
//                 Smart casuals and everyday essentials crafted for comfort and confidence.
//               </p>
//               <ShopNowButton />
//             </div>
//           </div>

//           {/* 3. RIGHT COLUMN (Split into 2 Rows) */}
//           <div className="flex flex-col gap-6 h-[600px] lg:h-full">
            
//             {/* TOP CARD: Kids Collection */}
//             <div className="relative group overflow-hidden flex-1 w-full">
//               <img
//                 src={image23}
//                 alt="Kids Collection"
//                 className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
//               />
//               <div className="absolute inset-0 bg-black/30" />
              
//               <div className="absolute inset-0 flex flex-col justify-center px-8 text-white">
//                 <h3 className="text-sm font-bold uppercase tracking-wider mb-1">
//                  Moda Women's Rapido Sarees
//                 </h3>
//                 <div className="text-4xl font-bold mb-3">25% OFF</div>
//                 <p className="text-gray-200 text-xs mb-5 max-w-[200px]">
                  
//                 </p>
//                 <div><ShopNowButton /></div>
//               </div>
//             </div>

//             {/* BOTTOM CARD: Featured Collection */}
//             <div className="relative group overflow-hidden flex-1 w-full">
//               <img
//                 src={image22}
//                 alt="Featured Collection"
//                 className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
//               />
//               <div className="absolute inset-0 bg-black/30" />
              
//               {/* Aligned Right based on image */}
//               <div className="absolute inset-0 flex flex-col justify-center items-end px-8 text-right text-white">
//                 <h3 className="text-sm font-bold uppercase tracking-wider mb-1">
//                   Featured Collection
//                 </h3>
//                 <div className="text-4xl font-bold mb-3">25% OFF</div>
//                 <p className="text-gray-200 text-xs mb-5 max-w-[200px]">
//                   Our most-loved designs chosen for comfort, quality, and everyday wear.
//                 </p>
//                 <div><ShopNowButton /></div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>

//       {/* Optional: Include your Footer here */}
//       {/* <FooterSection /> */}
//     </div>
//   );
// };

// // Reusable Button Component specific to this design
// const ShopNowButton = () => (
//   <button onClick={navigateFunction} className="px-6 py-2 border border-white text-white text-sm font-semibold uppercase tracking-wider hover:bg-white hover:text-black transition-colors duration-300">
//     Shop Now
//   </button>
// );

// export default DiscountPage;






import React from "react";
import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar"; 
// import FooterSection from "../components/FooterSection"; 

// Ensure these paths are correct relative to this file
import image20 from "../assets/1020.jpeg";
import image21 from "../assets/1021.jpeg";
import image22 from "../assets/1022.jpeg";
import image23 from "../assets/1023.jpeg";

const DiscountPage = () => {
  const navigate = useNavigate();

  // Function to handle navigation
  const handleShopNow = () => {
    // Based on your AppRoutes.js, the path is "/products", not "/allproducts"
    navigate("/products");
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* <Navbar /> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* --- HEADER SECTION --- */}
        <div className="mb-10">
          <h4 className="text-indigo-900 font-bold uppercase tracking-wider text-sm mb-2">
            Discount
          </h4>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            SHOP NOW AND SAVE 30%
          </h2>
          <p className="text-gray-500 max-w-xl text-lg">
            Grace at a Great Price! Sarees on Discount
          </p>
        </div>

        {/* --- GRID LAYOUT --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-auto lg:h-[600px]">
          
          {/* 1. WOMEN'S COLLECTION */}
          <div className="relative group overflow-hidden h-[500px] lg:h-full rounded-none">
            <img
              src={image20}
              alt="Women's Collection"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            <div className="absolute bottom-10 left-8 text-white">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-2">
                Women's Collection
              </h3>
              <div className="text-5xl font-bold mb-4">20% OFF</div>
              <p className="text-gray-200 text-sm mb-6 max-w-[200px]">
                Elegant kurtas and dresses designed for comfort, grace, and everyday style
              </p>
              {/* Pass the function as a prop */}
              <ShopNowButton onClick={handleShopNow} />
            </div>
          </div>

          {/* 2. MEN'S COLLECTION */}
          <div className="relative group overflow-hidden h-[500px] lg:h-full rounded-none">
            <img
              src={image21}
              alt="Men's Collection"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            <div className="absolute bottom-10 left-8 text-white">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-2">
                Mohey Women's Festive Saree
              </h3>
              <div className="text-5xl font-bold mb-4">20% OFF</div>
              <p className="text-gray-200 text-sm mb-6 max-w-[200px]">
                Smart casuals and everyday essentials crafted for comfort and confidence.
              </p>
              <ShopNowButton onClick={handleShopNow} />
            </div>
          </div>

          {/* 3. RIGHT COLUMN */}
          <div className="flex flex-col gap-6 h-[600px] lg:h-full">
            
            {/* TOP CARD */}
            <div className="relative group overflow-hidden flex-1 w-full">
              <img
                src={image23}
                alt="Kids Collection"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30" />
              
              <div className="absolute inset-0 flex flex-col justify-center px-8 text-white">
                <h3 className="text-sm font-bold uppercase tracking-wider mb-1">
                 Moda Women's Rapido Sarees
                </h3>
                <div className="text-4xl font-bold mb-3">25% OFF</div>
                <div className="mt-4">
                    <ShopNowButton onClick={handleShopNow} />
                </div>
              </div>
            </div>

            {/* BOTTOM CARD */}
            <div className="relative group overflow-hidden flex-1 w-full">
              <img
                src={image22}
                alt="Featured Collection"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30" />
              
              <div className="absolute inset-0 flex flex-col justify-center items-end px-8 text-right text-white">
                <h3 className="text-sm font-bold uppercase tracking-wider mb-1">
                  Featured Collection
                </h3>
                <div className="text-4xl font-bold mb-3">25% OFF</div>
                <p className="text-gray-200 text-xs mb-5 max-w-[200px]">
                  Our most-loved designs chosen for comfort.
                </p>
                <div>
                    <ShopNowButton onClick={handleShopNow} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* <FooterSection /> */}
    </div>
  );
};

// Fixed: Now accepts onClick prop to trigger the navigation
const ShopNowButton = ({ onClick }) => (
  <button 
    onClick={onClick} 
    className="px-6 py-2 border border-white text-white text-sm font-semibold uppercase tracking-wider hover:bg-white hover:text-black transition-colors duration-300"
  >
    Shop Now
  </button>
);

export default DiscountPage;