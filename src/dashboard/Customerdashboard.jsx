// import React, { useRef, useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import CategorySection from "../cart/CategorySection";
// import { Dialog } from "@headlessui/react";
// import { domainUrl } from "../utils/constant";
// import axios from "axios";

// // Imported Headless UI Menu components

// import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// // Assuming these assets exist in your project structure
// import CarouselImg1 from "../assets/carousel_img1.jpg";
// import CarouselImg2 from "../assets/carousel_img2.jpg";
// import CarouselImg3 from "../assets/carousel_img3.jpg";
// import CarouselImg8 from "../assets/carousel_img8.jpg";
// import CarouselImg9 from "../assets/carousel_img9.jpg";
// import CarouselImg10 from "../assets/carousel_img10.jpg";
// import CarouselImg4 from "../assets/carousel_img4.png";
// import CarouselImg5 from "../assets/carousel_img5.jpg";

// // --- Utility Icons --- (Kept for completeness, though not actively used in the Menu)
// const ChevronLeftIcon = (props) => (
//   <svg
//     {...props}
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     className="w-6 h-6"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M15.75 19.5L8.25 12l7.5-7.5"
//     />
//   </svg>
// );

// const ChevronRightIcon = (props) => (
//   <svg
//     {...props}
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     className="w-6 h-6"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M8.25 4.5l7.5 7.5-7.5 7.5"
//     />
//   </svg>
// );
// // --------------------

// // Combined/Updated Product Data
// const products = [
//   {
//     id: 1,
//     name: "Zip Tote Basket",
//     color: "White and black",
//     href: "#",
//     imageSrc:
//       "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-03-related-product-01.jpg",
//     imageAlt:
//       "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
//     price: "$140",
//   },
//   {
//     id: 2,
//     name: "Zip High Wall Tote",
//     color: "White and blue",
//     href: "#",
//     imageSrc:
//       "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-03-related-product-02.jpg",
//     imageAlt:
//       "Front of zip tote bag with white canvas, blue canvas straps and handle, and front zipper pocket.",
//     price: "$150",
//   },
//   {
//     id: 3,
//     name: "Halfsize Tote",
//     color: "Clay",
//     href: "#",
//     imageSrc:
//       "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-03-related-product-03.jpg",
//     imageAlt:
//       "Front of tote with monochrome natural canvas body, straps, roll top, and handles.",
//     price: "$210",
//   },
//   {
//     id: 4,
//     name: "High Wall Tote",
//     color: "Black and orange",
//     href: "#",
//     href: "#",
//     imageSrc:
//       "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-03-related-product-04.jpg",
//     imageAlt:
//       "Front of zip tote bag with black canvas, black handles, and orange drawstring top.",
//     price: "$210",
//   },
// ];

// // Footer navigation data (Social Icons)
// const navigation = [
//   {
//     name: "Facebook",
//     href: "#",
//     icon: (props) => (
//       <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
//         <path
//           fillRule="evenodd"
//           d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
//           clipRule="evenodd"
//         />
//       </svg>
//     ),
//   },
//   {
//     name: "Instagram",
//     href: "#",
//     icon: (props) => (
//       <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
//         <path
//           fillRule="evenodd"
//           d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
//           clipRule="evenodd"
//         />
//       </svg>
//     ),
//   },
//   {
//     name: "X",
//     href: "#",
//     icon: (props) => (
//       <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
//         <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
//       </svg>
//     ),
//   },
//   {
//     name: "GitHub",
//     href: "#",
//     icon: (props) => (
//       <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
//         <path
//           fillRule="evenodd"
//           d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
//           clipRule="evenodd"
//         />
//       </svg>
//     ),
//   },
//   {
//     name: "YouTube",
//     href: "#",
//     icon: (props) => (
//       <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
//         <path
//           fillRule="evenodd"
//           d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
//           clipRule="evenodd"
//         />
//       </svg>
//     ),
//   },
// ];

// // ** CONFIGURATION: Update this URL to your actual profile endpoint **

// const Customerdashboard = () => {
//   const scrollContainerRef = useRef(null);
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   // State to store the fetched user profile data
//   const [userProfile, setUserProfile] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const [showModal, setShowModal] = useState(false);

//   // --- Profile Fetch Logic ---
//   useEffect(() => {

//      if (token && role === "user") {
//       const fetchProfile = async () => {
//         setIsLoading(true);
//         try {
//           const res = await axios.get(`${domainUrl}/user/profile`, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           setUserProfile(res.data.users);
//         } catch (err) {
//           console.error("Error fetching profile:", err);
//         } finally {
//           setIsLoading(false);
//         }
//       };
//       fetchProfile();
//     }
//   }, [token, role]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     setUserProfile(null);
//     navigate("/login");
//   };

//     // If logged in, the MenuButton handles the click to open the dropdown, so no action needed here.

//   return (
//     <div>
//       {/* Navbar */}
//       <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
//         <div className="flex justify-around items-center text-[#5e785a] p-3">
//           <div>
//             <img className="h-10 w-auto" src="logo123.png" alt="Modimal Logo" />
//           </div>
//           <ul className="flex justify-center gap-10 text-sm items-center font-medium">
//             <Link to={"/"} className="flex justify-center gap-10 text-sm items-center font-medium">Home</Link>

//             {/* Conditional Links (kept as-is) */}
//             <Link
//               to="/cart"
//               className="p-2 text-gray-400 hover:text-gray-500"
//             >
//               <span className="ml-2 text-sm font-medium text-gray-700">
//                 Cart
//               </span>
//             </Link>
//             <Link
//               to="/myorders"
//               className="hover:text-gray-900 transition-colors"
//             >
//               My Orders
//             </Link>
//           </ul>

//           {/* --- PROFILE DROPDOWN (Headless UI Menu) --- */}
//             <div>
//   <button
//     onClick={() => {
//       if (!token || role !== "user") {
//         navigate("/login");
//       } else {
//         setShowModal(true);
//       }
//     }}
//     className="focus:outline-none"
//   >
//     {token && role === "user" ? (
//       <img
//         alt="User Avatar"
//         src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&w=256&h=256&q=80"
//         className="inline-block size-8 rounded-full cursor-pointer"
//       />
//     ) : (
//       <button className="text-gray-600 hover:text-[#5e785a] font-medium transition-colors">
//         Login
//       </button>
//     )}
//   </button>

//   {/* MODAL */}
//   <Dialog
//     open={showModal}
//     onClose={() => setShowModal(false)}
//     className="relative z-50"
//   >
//     <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
//     <div className="fixed inset-0 flex items-center justify-center p-4">
//       <Dialog.Panel className="mx-auto w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
//         <Dialog.Title className="text-lg font-semibold text-[#5e785a] mb-4">
//           Profile Details
//         </Dialog.Title>

//         {isLoading ? (
//           <p className="text-gray-500 text-sm">Loading...</p>
//         ) : userProfile ? (
//           <div className="space-y-3">
//             <div>
//               <p className="text-gray-700 text-sm font-medium">Name:</p>
//               <p className="text-gray-900 font-semibold">{userProfile.username}</p>
//             </div>
//             <div>
//               <p className="text-gray-700 text-sm font-medium">Email:</p>
//               <p className="text-gray-900 font-semibold">{userProfile.email}</p>
//             </div>
//             <button
//               onClick={() => {
//                 handleLogout();
//                 setShowModal(false);
//               }}
//               className="mt-4 w-full rounded-md bg-red-500 text-white py-2 hover:bg-red-600 transition"
//             >
//               Logout
//             </button>
//           </div>
//         ) : (
//           <p className="text-gray-500 text-sm">Failed to load profile</p>
//         )}
//       </Dialog.Panel>
//     </div>
//   </Dialog>
// </div>
//           {/* --- END PROFILE DROPDOWN --- */}
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <div className="mt-16 relative w-full ">
//         <Carousel autoPlay infiniteLoop showThumbs={true}>
//           <div>
//             <img
//               src={CarouselImg4}
//               alt="Model wearing stylish outfit"
//               className="object-cover w-full h-auto max-h-[500px]"
//             />
//           </div>
//           <div>
//             <img
//               src={CarouselImg5}
//               alt="Clothing displayed on a rack"
//               className="object-cover w-full h-auto max-h-[500px]"
//             />
//           </div>
//           <div>
//             <img
//               src={CarouselImg8}
//               alt="Fashion show event"
//               className="object-cover w-full h-auto max-h-[500px]"
//             />
//           </div>
//           <div>
//             <img
//               src={CarouselImg9}
//               alt="Close up of a unique textile pattern"
//               className="object-cover w-full h-auto max-h-[500px]"
//             />
//           </div>
//           <div>
//             <img
//               src={CarouselImg10}
//               alt="Woman posing in a designer outfit"
//               className="object-cover w-full h-auto max-h-[500px]"
//             />
//           </div>
//         </Carousel>
//       </div>

//       {/* Category Section (Uses external component) */}
//       <CategorySection />

//       {/* Product Section */}
//       <section className="bg-white">
//         <div className="mx-auto max-w-7xl px-6 py-16 sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
//             Featured Products
//           </h2>

//           <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
//             {products.map((product) => (
//               <div key={product.id}>
//                 <div className="relative">
//                   <div className="relative h-72 w-full overflow-hidden rounded-lg">
//                     <img
//                       alt={product.imageAlt}
//                       src={product.imageSrc}
//                       className="size-full object-cover"
//                     />
//                   </div>

//                   {/* Price overlay */}
//                   <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
//                     <div
//                       aria-hidden="true"
//                       className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
//                     />
//                     <p className="relative text-lg font-semibold text-white">
//                       {product.price}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Product Name/Color Info */}
//                 <div className="relative mt-4">
//                   <h3 className="text-sm font-medium text-gray-900">
//                     {product.name}
//                   </h3>
//                   <p className="mt-1 text-sm text-gray-500">{product.color}</p>
//                 </div>

//                 {/* Add to Bag Option */}
//                 <div className="mt-6">
//                   <a
//                     href={product.href}
//                     className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 transition-colors"
//                   >
//                     Add to bag<span className="sr-only">, {product.name}</span>
//                   </a>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* About Us Footer Section */}
//       <footer className="bg-white border-t border-gray-100 py-16 lg:py-24">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-2 lg:gap-x-16 lg:items-center">
//             {/* Left Column: Fixed Size Image */}
//             <div className="flex justify-center lg:justify-start">
//               <div className="w-full max-w-lg lg:max-w-none h-96">
//                 <img
//                   src="product1.jpg"
//                   alt="Company introduction image"
//                   className="w-full h-full object-cover rounded-lg shadow-xl"
//                 />
//               </div>
//             </div>

//             {/* Right Column: Text Content */}
//             <div className="flex flex-col justify-center">
//               <div className="max-w-prose">
//                 <p className="text-sm font-semibold uppercase tracking-wider text-black mb-2">
//                   ABOUT US
//                 </p>
//                 <h2 className="text-3xl font-extrabold tracking-tight text-[#5e785a] mb-6">
//                   Mandaram Drapes
//                 </h2>

//                 <div className="text-base text-gray-400 space-y-4">
//                   <p>
//                     Welcome to Mandaram Drapes where tradition meets timeless
//                     fashion. Born from a deep love for Indian craftsmanship,
//                     Mandaram is more than just a clothing label — it’s a journey
//                     through threads of heritage, art, and individuality. Every
//                     saree and churidar in our collection is carefully curated,
//                     highlighting handpicked fabrics, intricate weaves, and
//                     soulful details that celebrate the beauty of Indian culture.
//                   </p>
//                   <p>
//                     From the graceful drape of a Banarasi saree to the soft flow
//                     of a linen churidar, our designs are made to make you feel
//                     confident, elegant, and connected to your roots. Whether
//                     you’re dressing up for a celebration or adding ethnic flair
//                     to your everyday look, Mandaram ensures that style and
//                     comfort walk hand in hand.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>

//       {/* Socials Footer */}
//       <footer className="bg-white dark:bg-gray-900">
//         <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
//           <div className="flex justify-center gap-x-6 md:order-2">
//             {navigation.map((item) => (
//               <a
//                 key={item.name}
//                 href={item.href}
//                 className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
//               >
//                 <span className="sr-only">{item.name}</span>
//                 <item.icon aria-hidden="true" className="size-6" />
//               </a>
//             ))}
//           </div>
//           <p className="mt-8 text-center text-sm/6 text-gray-600 md:order-1 md:mt-0 dark:text-gray-400">
//             &copy; 2024 Your Company, Inc. All rights reserved.
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Customerdashboard;

// import React, { useRef, useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import CategorySection from "../cart/CategorySection";
// import { Dialog } from "@headlessui/react";
// import { domainUrl } from "../utils/constant";
// import axios from "axios";

// // Imported Headless UI Menu components

// import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// // Assuming these assets exist in your project structure
// import CarouselImg1 from "../assets/carousel_img1.jpg";
// import CarouselImg2 from "../assets/carousel_img2.jpg";
// import CarouselImg3 from "../assets/carousel_img3.jpg";
// import CarouselImg8 from "../assets/carousel_img8.jpg";
// import CarouselImg9 from "../assets/carousel_img9.jpg";
// import CarouselImg10 from "../assets/carousel_img10.jpg";
// import CarouselImg4 from "../assets/carousel_img4.png";
// import CarouselImg5 from "../assets/carousel_img5.jpg";

// // --- Utility Icons --- (Kept for completeness, though not actively used in the Menu)
// const ChevronLeftIcon = (props) => (
//   <svg
//     {...props}
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     className="w-6 h-6"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M15.75 19.5L8.25 12l7.5-7.5"
//     />
//   </svg>
// );

// const ChevronRightIcon = (props) => (
//   <svg
//     {...props}
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     className="w-6 h-6"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M8.25 4.5l7.5 7.5-7.5 7.5"
//     />
//   </svg>
// );
// // --------------------

// // Combined/Updated Product Data
// const products = [
//   {
//     id: 1,
//     name: "Zip Tote Basket",
//     color: "White and black",
//     href: "#",
//     imageSrc:
//       "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-03-related-product-01.jpg",
//     imageAlt:
//       "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
//     price: "$140",
//   },
//   {
//     id: 2,
//     name: "Zip High Wall Tote",
//     color: "White and blue",
//     href: "#",
//     imageSrc:
//       "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-03-related-product-02.jpg",
//     imageAlt:
//       "Front of zip tote bag with white canvas, blue canvas straps and handle, and front zipper pocket.",
//     price: "$150",
//   },
//   {
//     id: 3,
//     name: "Halfsize Tote",
//     color: "Clay",
//     href: "#",
//     imageSrc:
//       "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-03-related-product-03.jpg",
//     imageAlt:
//       "Front of tote with monochrome natural canvas body, straps, roll top, and handles.",
//     price: "$210",
//   },
//   {
//     id: 4,
//     name: "High Wall Tote",
//     color: "Black and orange",
//     href: "#",
//     href: "#",
//     imageSrc:
//       "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-03-related-product-04.jpg",
//     imageAlt:
//       "Front of zip tote bag with black canvas, black handles, and orange drawstring top.",
//     price: "$210",
//   },
// ];

// // Footer navigation data (Social Icons)
// const navigation = [
//   {
//     name: "Facebook",
//     href: "#",
//     icon: (props) => (
//       <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
//         <path
//           fillRule="evenodd"
//           d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
//           clipRule="evenodd"
//         />
//       </svg>
//     ),
//   },
//   {
//     name: "Instagram",
//     href: "#",
//     icon: (props) => (
//       <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
//         <path
//           fillRule="evenodd"
//           d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
//           clipRule="evenodd"
//         />
//       </svg>
//     ),
//   },
//   {
//     name: "X",
//     href: "#",
//     icon: (props) => (
//       <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
//         <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
//       </svg>
//     ),
//   },
//   {
//     name: "GitHub",
//     href: "#",
//     icon: (props) => (
//       <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
//         <path
//           fillRule="evenodd"
//           d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
//           clipRule="evenodd"
//         />
//       </svg>
//     ),
//   },
//   {
//     name: "YouTube",
//     href: "#",
//     icon: (props) => (
//       <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
//         <path
//           fillRule="evenodd"
//           d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
//           clipRule="evenodd"
//         />
//       </svg>
//     ),
//   },
// ];

// // ** CONFIGURATION: Update this URL to your actual profile endpoint **

// const Customerdashboard = () => {
//   const scrollContainerRef = useRef(null);
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   // State to store the fetched user profile data
//   const [userProfile, setUserProfile] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const [showModal, setShowModal] = useState(false);

//   // --- Profile Fetch Logic ---
//   useEffect(() => {

//      if (token && role === "user") {
//       const fetchProfile = async () => {
//         setIsLoading(true);
//         try {
//           const res = await axios.get(`${domainUrl}/user/profile`, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           setUserProfile(res.data.users);
//         } catch (err) {
//           console.error("Error fetching profile:", err);
//         } finally {
//           setIsLoading(false);
//         }
//       };
//       fetchProfile();
//     }
//   }, [token, role]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     setUserProfile(null);
//     navigate("/login");
//   };

//     // If logged in, the MenuButton handles the click to open the dropdown, so no action needed here.

//   return (
//     <div>
//       {/* Navbar */}
//       <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
//         <div className="flex justify-around items-center text-[#5e785a] p-3">
//           <div>
//             <img className="h-10 w-auto" src="logo123.png" alt="Modimal Logo" />
//           </div>
//           <ul className="flex justify-center gap-10 text-sm items-center font-medium">
//             <Link to="/" className="flex justify-center gap-10 text-sm items-center font-medium">Home</Link>

//             {/* Conditional Links (kept as-is) */}
//             <Link
//               to="/cart"
//               className="p-2 text-gray-400 hover:text-gray-500"
//             >
//               <span className="ml-2 text-sm font-medium text-gray-700">
//                 Cart
//               </span>
//             </Link>
//             <Link
//               to="/myorders"
//               className="hover:text-gray-900 transition-colors"
//             >
//               My Orders
//             </Link>
//           </ul>

//           {/* --- PROFILE DROPDOWN (Headless UI Menu) --- */}
//             <div>
//   <button
//     onClick={() => {
//       if (!token || role !== "user") {
//         navigate("/login");
//       } else {
//         setShowModal(true);
//       }
//     }}
//     className="focus:outline-none"
//   >
//     {token && role === "user" ? (
//       <img
//         alt="User Avatar"
//         src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&w=256&h=256&q=80"
//         className="inline-block size-8 rounded-full cursor-pointer"
//       />
//     ) : (
//       <span className="text-gray-600 hover:text-[#5e785a] font-medium transition-colors">
//       Login
//     </span>
//     )}
//   </button>

//   {/* MODAL */}
//   <Dialog
//   open={showModal}
//   onClose={() => setShowModal(false)}
//   className="relative z-50"
// >
//   {/* Background overlay with blur */}
//   <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

//   <div className="fixed inset-0 flex items-center justify-center p-4">
//     {/* Glassmorphism modal */}
//     <Dialog.Panel
//       className="mx-auto w-full max-w-sm rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 p-6 shadow-2xl"
//     >
//       <Dialog.Title className="text-lg font-semibold text-white mb-4 text-center">
//         Profile Details
//       </Dialog.Title>

//       {isLoading ? (
//         <p className="text-gray-200 text-sm text-center">Loading...</p>
//       ) : userProfile ? (
//         <div className="space-y-3 text-white">
//           <div>
//             <p className="text-sm font-medium text-gray-300">Name:</p>
//             <p className="font-semibold">{userProfile.username}</p>
//           </div>
//           <div>
//             <p className="text-sm font-medium text-gray-300">Email:</p>
//             <p className="font-semibold">{userProfile.email}</p>
//           </div>
//           <button
//             onClick={() => {
//               handleLogout();
//               setShowModal(false);
//             }}
//             className="mt-4 w-full rounded-md bg-red-500 text-white py-2 hover:bg-red-600 transition"
//           >
//             Logout
//           </button>
//         </div>
//       ) : (
//         <p className="text-gray-200 text-sm text-center">Failed to load profile</p>
//       )}
//     </Dialog.Panel>
//   </div>
// </Dialog>

// </div>
//           {/* --- END PROFILE DROPDOWN --- */}
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <div className="mt-16 relative w-full ">
//         <Carousel autoPlay infiniteLoop showThumbs={true}>
//           <div>
//             <img
//               src={CarouselImg4}
//               alt="Model wearing stylish outfit"
//               className="object-cover w-full h-auto max-h-[500px]"
//             />
//           </div>
//           <div>
//             <img
//               src={CarouselImg5}
//               alt="Clothing displayed on a rack"
//               className="object-cover w-full h-auto max-h-[500px]"
//             />
//           </div>
//           <div>
//             <img
//               src={CarouselImg8}
//               alt="Fashion show event"
//               className="object-cover w-full h-auto max-h-[500px]"
//             />
//           </div>
//           <div>
//             <img
//               src={CarouselImg9}
//               alt="Close up of a unique textile pattern"
//               className="object-cover w-full h-auto max-h-[500px]"
//             />
//           </div>
//           <div>
//             <img
//               src={CarouselImg10}
//               alt="Woman posing in a designer outfit"
//               className="object-cover w-full h-auto max-h-[500px]"
//             />
//           </div>
//         </Carousel>
//       </div>

//       {/* Category Section (Uses external component) */}
//       <CategorySection />

//       {/* Product Section */}
//       <section className="bg-white">
//         <div className="mx-auto max-w-7xl px-6 py-16 sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
//             Featured Products
//           </h2>

//           <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
//             {products.map((product) => (
//               <div key={product.id}>
//                 <div className="relative">
//                   <div className="relative h-72 w-full overflow-hidden rounded-lg">
//                     <img
//                       alt={product.imageAlt}
//                       src={product.imageSrc}
//                       className="size-full object-cover"
//                     />
//                   </div>

//                   {/* Price overlay */}
//                   <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
//                     <div
//                       aria-hidden="true"
//                       className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
//                     />
//                     <p className="relative text-lg font-semibold text-white">
//                       {product.price}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Product Name/Color Info */}
//                 <div className="relative mt-4">
//                   <h3 className="text-sm font-medium text-gray-900">
//                     {product.name}
//                   </h3>
//                   <p className="mt-1 text-sm text-gray-500">{product.color}</p>
//                 </div>

//                 {/* Add to Bag Option */}
//                 <div className="mt-6">
//                   <a
//                     href={product.href}
//                     className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 transition-colors"
//                   >
//                     Add to bag<span className="sr-only">, {product.name}</span>
//                   </a>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* About Us Footer Section */}
//       <footer className="bg-white border-t border-gray-100 py-16 lg:py-24">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-2 lg:gap-x-16 lg:items-center">
//             {/* Left Column: Fixed Size Image */}
//             <div className="flex justify-center lg:justify-start">
//               <div className="w-full max-w-lg lg:max-w-none h-96">
//                 <img
//                   src="product1.jpg"
//                   alt="Company introduction image"
//                   className="w-full h-full object-cover rounded-lg shadow-xl"
//                 />
//               </div>
//             </div>

//             {/* Right Column: Text Content */}
//             <div className="flex flex-col justify-center">
//               <div className="max-w-prose">
//                 <p className="text-sm font-semibold uppercase tracking-wider text-black mb-2">
//                   ABOUT US
//                 </p>
//                 <h2 className="text-3xl font-extrabold tracking-tight text-[#5e785a] mb-6">
//                   Mandaram Drapes
//                 </h2>

//                 <div className="text-base text-gray-400 space-y-4">
//                   <p>
//                     Welcome to Mandaram Drapes where tradition meets timeless
//                     fashion. Born from a deep love for Indian craftsmanship,
//                     Mandaram is more than just a clothing label — it’s a journey
//                     through threads of heritage, art, and individuality. Every
//                     saree and churidar in our collection is carefully curated,
//                     highlighting handpicked fabrics, intricate weaves, and
//                     soulful details that celebrate the beauty of Indian culture.
//                   </p>
//                   <p>
//                     From the graceful drape of a Banarasi saree to the soft flow
//                     of a linen churidar, our designs are made to make you feel
//                     confident, elegant, and connected to your roots. Whether
//                     you’re dressing up for a celebration or adding ethnic flair
//                     to your everyday look, Mandaram ensures that style and
//                     comfort walk hand in hand.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>

//       {/* Socials Footer */}
//       <footer className="bg-white dark:bg-gray-900">
//         <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
//           <div className="flex justify-center gap-x-6 md:order-2">
//             {navigation.map((item) => (
//               <a
//                 key={item.name}
//                 href={item.href}
//                 className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
//               >
//                 <span className="sr-only">{item.name}</span>
//                 <item.icon aria-hidden="true" className="size-6" />
//               </a>
//             ))}
//           </div>
//           <p className="mt-8 text-center text-sm/6 text-gray-600 md:order-1 md:mt-0 dark:text-gray-400">
//             &copy; 2024 Your Company, Inc. All rights reserved.
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Customerdashboard;

// import React, { useRef, useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import CategorySection from "../cart/CategorySection";
// import { Dialog } from "@headlessui/react";
// import { domainUrl } from "../utils/constant";
// import axios from "axios";

// // --- HOOKS & CONTEXT ---
// import { useCart } from "../context/CartContext";
// import { ToastContainer, toast, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // --- CAROUSEL ---
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// // Assuming these assets exist in your project structure
// import CarouselImg1 from "../assets/carousel_img1.jpg";
// import CarouselImg2 from "../assets/carousel_img2.jpg";
// import CarouselImg3 from "../assets/carousel_img3.jpg";
// import CarouselImg8 from "../assets/carousel_img8.jpg";
// import CarouselImg9 from "../assets/carousel_img9.jpg";
// import CarouselImg10 from "../assets/carousel_img10.jpg";
// import CarouselImg4 from "../assets/carousel_img4.png";
// import CarouselImg5 from "../assets/carousel_img5.jpg";

// // --- Utility Icons ---
// const ChevronLeftIcon = (props) => (
//   <svg
//     {...props}
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     className="w-6 h-6"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M15.75 19.5L8.25 12l7.5-7.5"
//     />
//   </svg>
// );

// const ChevronRightIcon = (props) => (
//   <svg
//     {...props}
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     className="w-6 h-6"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M8.25 4.5l7.5 7.5-7.5 7.5"
//     />
//   </svg>
// );
// // --------------------

// // Footer navigation data (Social Icons)
// const navigation = [
//   {
//     name: "Facebook",
//     href: "#",
//     icon: (props) => (
//       <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
//         <path
//           fillRule="evenodd"
//           d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
//           clipRule="evenodd"
//         />
//       </svg>
//     ),
//   },
//   {
//     name: "Instagram",
//     href: "#",
//     icon: (props) => (
//       <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
//         <path
//           fillRule="evenodd"
//           d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
//           clipRule="evenodd"
//         />
//       </svg>
//     ),
//   },
//   {
//     name: "X",
//     href: "#",
//     icon: (props) => (
//       <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
//         <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
//       </svg>
//     ),
//   },
//   {
//     name: "GitHub",
//     href: "#",
//     icon: (props) => (
//       <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
//         <path
//           fillRule="evenodd"
//           d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
//           clipRule="evenodd"
//         />
//       </svg>
//     ),
//   },
//   {
//     name: "YouTube",
//     href: "#",
//     icon: (props) => (
//       <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
//         <path
//           fillRule="evenodd"
//           d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
//           clipRule="evenodd"
//         />
//       </svg>
//     ),
//   },
// ];

// const Customerdashboard = () => {
//   const scrollContainerRef = useRef(null);
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   // --- STATE ---
//   const [userProfile, setUserProfile] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);

//   // State for Featured Products
//   const [featuredProducts, setFeaturedProducts] = useState([]);
//   const [productsLoading, setProductsLoading] = useState(true);
//   const [productsError, setProductsError] = useState(null);

//   // State for "Add to Bag" button loading
//   const [isAdding, setIsAdding] = useState(null); // Will store the ID of the product being added

//   // --- CART CONTEXT ---
//   const { cartItems, fetchCart } = useCart();

//   // --- DATA FETCHING ---

//   // Fetch User Profile
//   useEffect(() => {
//     if (token && role === "user") {
//       const fetchProfile = async () => {
//         setIsLoading(true);
//         try {
//           const res = await axios.get(`${domainUrl}/user/profile`, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           setUserProfile(res.data.users);
//         } catch (err) {
//           console.error("Error fetching profile:", err);
//         } finally {
//           setIsLoading(false);
//         }
//       };
//       fetchProfile();
//     }
//   }, [token, role]);

//   // Fetch Featured Products
//   useEffect(() => {
//     const fetchFeaturedProducts = async () => {
//       setProductsLoading(true);
//       setProductsError(null);
//       try {
//         const res = await axios.get(`${domainUrl}/user/shop/products`);

//         if (res.data && res.data.products) {
//           setFeaturedProducts(res.data.products);
//         } else {
//           setFeaturedProducts([]);
//         }

//       } catch (err) {
//         console.error("Error fetching products:", err);
//         setProductsError("Could not load featured products.");
//       } finally {
//         setProductsLoading(false);
//       }
//     };

//     fetchFeaturedProducts();
//   }, []);

//   // --- HANDLERS ---

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     setUserProfile(null);
//     navigate("/login");
//   };

//   // Horizontal scroll handler
//   const scroll = (direction) => {
//     if (scrollContainerRef.current) {
//       const scrollAmount = direction === 'left' ? -300 : 300;
//       scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//     }
//   };

//   // Add to Cart Handler
//   const handleAddToCart = async (product) => {
//     if (!token || role !== "user") {
//       toast.warn("Please log in to add items to your cart.", {
//         onClose: () => navigate("/login"),
//         autoClose: 2000,
//       });
//       return;
//     }

//     if (isAdding) return; // Prevent multiple clicks

//     setIsAdding(product._id);

//     try {
//       // Check if item is already in cart
//       const isAlreadyInCart = cartItems.some(item => item.productId === product._id);

//       if (isAlreadyInCart) {
//         toast.info("Already in cart. Redirecting...", {
//           icon: "🛒",
//           autoClose: 1500,
//           onClose: () => navigate("/cart"),
//         });
//         return;
//       }

//       // API call to add to cart
//       const cartData = { productId: product._id, quantity: 1 };
//       await axios.post(`${domainUrl}/cart/add`, cartData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       // Show success toast and redirect
//       toast.success(`${product.name} added! Redirecting...`, {
//         icon: "🛍️",
//         autoClose: 1500,
//         onClose: () => {
//           fetchCart(); // Refresh cart context
//           navigate("/cart");
//         },
//       });

//     } catch (err) {
//       console.error("Error adding to cart:", err);
//       toast.error(err.response?.data?.message || "Failed to add to cart.");
//     } finally {
//       setIsAdding(null);
//     }
//   };

//   // Helper to format image URL
//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return "https://via.placeholder.com/300?text=No+Image";
//     // Assuming 'image' field from product is a full URL as seen in ProductDetailPage
//     return imagePath.startsWith('http') ? imagePath : `${domainUrl}/${imagePath}`;
//   };

//   return (
//     <div>
//       {/* Navbar */}
//       <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
//         <div className="flex justify-around items-center text-[#5e785a] p-3">
//           <div>
//             <img className="h-10 w-auto" src="logo123.png" alt="Modimal Logo" />
//           </div>
//           <ul className="flex justify-center gap-10 text-sm items-center font-medium">
//             <Link to="/" className="hover:text-gray-900 transition-colors">Home</Link>

//             <Link
//               to="/cart"
//               className="hover:text-gray-900 transition-colors"
//             >
//               Cart
//             </Link>
//             <Link
//               to="/myorders"
//               className="hover:text-gray-900 transition-colors"
//             >
//               My Orders
//             </Link>
//           </ul>

//           {/* --- PROFILE & MODAL --- */}
//             <div>
//               <button
//                 onClick={() => {
//                   if (!token || role !== "user") {
//                     navigate("/login");
//                   } else {
//                     setShowModal(true);
//                   }
//                 }}
//                 className="focus:outline-none"
//               >
//                 {token && role === "user" ? (
//                   <img
//                     alt="User Avatar"
//                     src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&w=256&h=256&q=80"
//                     className="inline-block size-8 rounded-full cursor-pointer"
//                   />
//                 ) : (
//                   <span className="text-gray-600 hover:text-[#5e785a] font-medium transition-colors">
//                   Login
//                 </span>
//                 )}
//               </button>

//               {/* MODAL */}
//               <Dialog
//                 open={showModal}
//                 onClose={() => setShowModal(false)}
//                 className="relative z-50"
//               >
//                 <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
//                 <div className="fixed inset-0 flex items-center justify-center p-4">
//                   <Dialog.Panel
//                     className="mx-auto w-full max-w-sm rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 p-6 shadow-2xl"
//                   >
//                     <Dialog.Title className="text-lg font-semibold text-white mb-4 text-center">
//                       Profile Details
//                     </Dialog.Title>
//                     {isLoading ? (
//                       <p className="text-gray-200 text-sm text-center">Loading...</p>
//                     ) : userProfile ? (
//                       <div className="space-y-3 text-white">
//                         <div>
//                           <p className="text-sm font-medium text-gray-300">Name:</p>
//                           <p className="font-semibold">{userProfile.username}</p>
//                         </div>
//                         <div>
//                           <p className="text-sm font-medium text-gray-300">Email:</p>
//                           <p className="font-semibold">{userProfile.email}</p>
//                         </div>
//                         <button
//                           onClick={() => {
//                             handleLogout();
//                             setShowModal(false);
//                           }}
//                           className="mt-4 w-full rounded-md bg-red-500 text-white py-2 hover:bg-red-600 transition"
//                         >
//                           Logout
//                         </button>
//                       </div>
//                     ) : (
//                       <p className="text-gray-200 text-sm text-center">Failed to load profile</p>
//                     )}
//                   </Dialog.Panel>
//                 </div>
//               </Dialog>
//             </div>
//           {/* --- END PROFILE --- */}
//         </div>
//       </nav>

//       {/* Hero Section Carousel */}
//       <div className="mt-16 relative w-full ">
//         <Carousel autoPlay infiniteLoop showThumbs={true} showStatus={false}>
//           <div>
//             <img
//               src={CarouselImg4}
//               alt="Model wearing stylish outfit"
//               className="object-cover w-full h-auto max-h-[500px]"
//             />
//           </div>
//           <div>
//             <img
//               src={CarouselImg5}
//               alt="Clothing displayed on a rack"
//               className="object-cover w-full h-auto max-h-[500px]"
//             />
//           </div>
//           <div>
//             <img
//               src={CarouselImg8}
//               alt="Fashion show event"
//               className="object-cover w-full h-auto max-h-[500px]"
//             />
//           </div>
//            <div>
//             <img
//               src={CarouselImg9}
//               alt="Close up of a unique textile pattern"
//               className="object-cover w-full h-auto max-h-[500px]"
//             />
//           </div>
//           <div>
//             <img
//               src={CarouselImg10}
//               alt="Woman posing in a designer outfit"
//               className="object-cover w-full h-auto max-h-[500px]"
//             />
//           </div>
//         </Carousel>
//       </div>

//       {/* Category Section */}
//       <CategorySection />

//       {/* --- UPDATED Product Section --- */}
//       <section className="bg-white">
//         <div className="mx-auto max-w-7xl px-6 py-16 sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
//             Featured Products
//           </h2>

//           {/* Loading and Error States */}
//           {productsLoading && (
//             <div className="text-center text-gray-600">Loading products...</div>
//           )}
//           {productsError && (
//              <div className="text-center text-red-600">{productsError}</div>
//           )}

//           {/* Horizontal Scroll Container */}
//           {!productsLoading && !productsError && (
//             <div className="relative">
//               {/* Left Chevron */}
//               <button
//                 onClick={() => scroll('left')}
//                 className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/70 rounded-full p-2 shadow-md hover:bg-white transition-all"
//               >
//                 <ChevronLeftIcon className="size-6 text-gray-700" />
//               </button>

//               {/* Product List */}
//               <div
//                 ref={scrollContainerRef}
//                 className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 -mx-4 px-4 gap-x-6 sm:gap-x-8"
//                 style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}
//               >
//                 {featuredProducts.map((product) => (
//                   // Each Product Card
//                   <div key={product._id} className="w-64 sm:w-72 shrink-0 snap-start">
//                     <Link to={`/products/${product._id}`} className="block">
//                       <div className="relative">
//                         <div className="relative h-72 w-full overflow-hidden rounded-lg">
//                           <img
//                             alt={product.name}
//                             src={getImageUrl(product.image)}
//                             className="size-full object-cover"
//                           />
//                         </div>
//                         <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
//                           <div
//                             aria-hidden="true"
//                             className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
//                           />
//                           <p className="relative text-lg font-semibold text-white">
//                             ₹{product.price.toFixed(2)}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="relative mt-4">
//                         <h3 className="text-sm font-medium text-gray-900">
//                           {product.name}
//                         </h3>
//                         {/* ⭐⭐⭐ FIX IS HERE: changed product.category to product.category.name */}
//                         <p className="mt-1 text-sm text-gray-500">{product.category?.name || 'General'}</p>
//                       </div>
//                     </Link>

//                     {/* Add to Bag Button */}
//                     <div className="mt-6">
//                       <button
//                         onClick={() => handleAddToCart(product)}
//                         disabled={isAdding === product._id}
//                         className="relative w-full flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         {isAdding === product._id ? 'Adding...' : 'Add to bag'}
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Right Chevron */}
//               <button
//                 onClick={() => scroll('right')}
//                 className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/70 rounded-full p-2 shadow-md hover:bg-white transition-all"
//               >
//                 <ChevronRightIcon className="size-6 text-gray-700" />
//               </button>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* About Us Footer Section */}
//       <footer className="bg-white border-t border-gray-100 py-16 lg:py-24">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-2 lg:gap-x-16 lg:items-center">
//             {/* Left Column: Fixed Size Image */}
//             <div className="flex justify-center lg:justify-start">
//               <div className="w-full max-w-lg lg:max-w-none h-96">
//                 <img
//                   src="product1.jpg"
//                   alt="Company introduction image"
//                   className="w-full h-full object-cover rounded-lg shadow-xl"
//                 />
//               </div>
//             </div>

//             {/* Right Column: Text Content */}
//             <div className="flex flex-col justify-center">
//               <div className="max-w-prose">
//                 <p className="text-sm font-semibold uppercase tracking-wider text-black mb-2">
//                   ABOUT US
//                 </p>
//                 <h2 className="text-3xl font-extrabold tracking-tight text-[#5e785a] mb-6">
//                   Mandaram Drapes
//                 </h2>

//                 <div className="text-base text-gray-400 space-y-4">
//                   <p>
//                     Welcome to Mandaram Drapes where tradition meets timeless
//                     fashion. Born from a deep love for Indian craftsmanship,
//                     Mandaram is more than just a clothing label — it’s a journey
//                     through threads of heritage, art, and individuality. Every
//                     saree and churidar in our collection is carefully curated,
//                     highlighting handpicked fabrics, intricate weaves, and
//                     soulful details that celebrate the beauty of Indian culture.
//                   </p>
//                   <p>
//                     From the graceful drape of a Banarasi saree to the soft flow
//                     of a linen churidar, our designs are made to make you feel
//                     confident, elegant, and connected to your roots. Whether
//                     you’re dressing up for a celebration or adding ethnic flair
//                     to your everyday look, Mandaram ensures that style and
//                     comfort walk hand in hand.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>

//       {/* Socials Footer */}
//       <footer className="bg-white dark:bg-gray-900">
//         <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
//           <div className="flex justify-center gap-x-6 md:order-2">
//             {navigation.map((item) => (
//               <a
//                 key={item.name}
//                 href={item.href}
//                 className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
//               >
//                 <span className="sr-only">{item.name}</span>
//                 <item.icon aria-hidden="true" className="size-6" />
//               </a>
//             ))}
//           </div>
//           <p className="mt-8 text-center text-sm/6 text-gray-600 md:order-1 md:mt-0 dark:text-gray-400">
//             &copy; 2024 Your Company, Inc. All rights reserved.
//           </p>
//         </div>
//       </footer>

//       {/* Toast Container for notifications */}
//       <ToastContainer
//         position="top-center"
//         autoClose={2000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored"
//         transition={Slide}
//       />
//     </div>
//   );
// };

// export default Customerdashboard;

// 'use client'

// import React, { useRef, useState, useEffect, Fragment } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import CategorySection from "../cart/CategorySection";
// import { Dialog, DialogBackdrop, DialogPanel, Popover, PopoverButton, PopoverGroup, PopoverPanel, Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
// import { Bars3Icon, MagnifyingGlassIcon, ShoppingCartIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline';
// import { ChevronDownIcon } from '@heroicons/react/20/solid';
// import { domainUrl } from "../utils/constant";
// import axios from "axios";

// // --- HOOKS & CONTEXT ---
// import { useCart } from "../context/CartContext";
// import { ToastContainer, toast, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // --- CAROUSEL ---
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// // Assuming these assets exist in your project structure
// import CarouselImg4 from "../assets/carousel_img4.png";
// import CarouselImg5 from "../assets/carousel_img5.jpg";
// import CarouselImg8 from "../assets/carousel_img8.jpg";
// import CarouselImg9 from "../assets/carousel_img9.jpg";
// import CarouselImg10 from "../assets/carousel_img10.jpg";

// // --- Utility Icons ---
// const ChevronLeftIcon = (props) => (
//   <svg
//     {...props}
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     className="w-6 h-6"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M15.75 19.5L8.25 12l7.5-7.5"
//     />
//   </svg>
// );

// const ChevronRightIcon = (props) => (
//   <svg
//     {...props}
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     className="w-6 h-6"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M8.25 4.5l7.5 7.5-7.5 7.5"
//     />
//   </svg>
// );
// // --------------------

// // --- NEW NAVIGATION DATA ---
// const availableCurrencies = ['USD', 'AUD', 'EUR', 'GBP']; // CAD removed
// const newNavigation = {
//   categories: [
//     {
//       name: 'Women',
//       featured: [
//         { name: 'Sleepwear', href: '#' },
//         { name: 'Swimwear', href: '#' },
//         { name: 'Underwear', href: '#' },
//       ],
//       collection: [
//         { name: 'All Women’s', href: '/products?category=women' }, // Updated to a more realistic link
//         { name: 'New Arrivals', href: '#' },
//         { name: 'Sale', href: '#' },
//       ],
//       categories: [
//         { name: 'Sarees', href: '#' },
//         { name: 'Churidars', href: '#' },
//         { name: 'Kurtas & Tunics', href: '#' },
//         { name: 'Dupattas', href: '#' },
//         { name: 'Accessories', href: '#' },
//       ],
//       brands: [
//         { name: 'Mandaram Select', href: '#' },
//         { name: 'Handloom Artisans', href: '#' },
//         { name: 'Contemporary Line', href: '#' },
//       ],
//     },
//     {
//       name: 'Men', // Placeholder for Men's section, you can customize this later
//       featured: [
//         { name: 'Casual Wear', href: '#' },
//         { name: 'Formal Shirts', href: '#' },
//         { name: 'Accessories', href: '#' },
//       ],
//       collection: [
//         { name: 'All Men’s', href: '/products?category=men' },
//         { name: 'New Arrivals', href: '#' },
//         { name: 'Sale', href: '#' },
//       ],
//       categories: [
//         { name: 'Traditional', href: '#' },
//         { name: 'Pants', href: '#' },
//         { name: 'Footwear', href: '#' },
//         { name: 'Gifts', href: '#' },
//       ],
//       brands: [
//         { name: 'Significant Other', href: '#' },
//         { name: 'Full Nelson', href: '#' },
//       ],
//     },
//   ],
//   pages: [
//     { name: 'Cart', href: '/cart' },
//     { name: 'My Orders', href: '/myorders' },
//   ],
// };

// // Footer navigation data (Social Icons) - using a different name to avoid conflict
// const footerNavigation = [
//   {
//     name: "Facebook",
//     href: "#",
//     icon: (props) => (
//       <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
//         <path
//           fillRule="evenodd"
//           d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
//           clipRule="evenodd"
//         />
//       </svg>
//     ),
//   },
//   {
//     name: "Instagram",
//     href: "#",
//     icon: (props) => (
//       <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
//         <path
//           fillRule="evenodd"
//           d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
//           clipRule="evenodd"
//         />
//       </svg>
//     ),
//   },
//   {
//     name: "X",
//     href: "#",
//     icon: (props) => (
//       <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
//         <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
//       </svg>
//     ),
//   },
//   {
//     name: "YouTube",
//     href: "#",
//     icon: (props) => (
//       <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
//         <path
//           fillRule="evenodd"
//           d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
//           clipRule="evenodd"
//         />
//       </svg>
//     ),
//   },
// ];

// const Customerdashboard = () => {
//   const scrollContainerRef = useRef(null);
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   // --- STATE ---
//   const [userProfile, setUserProfile] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // New state for mobile menu

//   // State for Featured Products
//   const [featuredProducts, setFeaturedProducts] = useState([]);
//   const [productsLoading, setProductsLoading] = useState(true);
//   const [productsError, setProductsError] = useState(null);

//   // State for "Add to Bag" button loading
//   const [isAdding, setIsAdding] = useState(null);

//   // --- CART CONTEXT ---
//   const { cartItems, fetchCart } = useCart();

//   // --- DATA FETCHING ---

//   // Fetch User Profile
//   useEffect(() => {
//     if (token && role === "user") {
//       const fetchProfile = async () => {
//         setIsLoading(true);
//         try {
//           const res = await axios.get(`${domainUrl}/user/profile`, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           setUserProfile(res.data.users);
//         } catch (err) {
//           console.error("Error fetching profile:", err);
//         } finally {
//           setIsLoading(false);
//         }
//       };
//       fetchProfile();
//     } else {
//       setIsLoading(false); // Set loading to false if no token/role
//     }
//   }, [token, role]);

//   // Fetch Featured Products
//   useEffect(() => {
//     const fetchFeaturedProducts = async () => {
//       setProductsLoading(true);
//       setProductsError(null);
//       try {
//         const res = await axios.get(`${domainUrl}/user/shop/products`);

//         if (res.data && res.data.products) {
//           setFeaturedProducts(res.data.products);
//         } else {
//           setFeaturedProducts([]);
//         }

//       } catch (err) {
//         console.error("Error fetching products:", err);
//         setProductsError("Could not load featured products.");
//       } finally {
//         setProductsLoading(false);
//       }
//     };

//     fetchFeaturedProducts();
//   }, []);

//   // --- HANDLERS ---

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     setUserProfile(null);
//     navigate("/login");
//   };

//   // Horizontal scroll handler
//   const scroll = (direction) => {
//     if (scrollContainerRef.current) {
//       const scrollAmount = direction === 'left' ? -300 : 300;
//       scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//     }
//   };

//   // Add to Cart Handler
//   const handleAddToCart = async (product) => {
//     if (!token || role !== "user") {
//       toast.warn("Please log in to add items to your cart.", {
//         onClose: () => navigate("/login"),
//         autoClose: 2000,
//       });
//       return;
//     }

//     if (isAdding) return; // Prevent multiple clicks

//     setIsAdding(product._id);

//     try {
//       // Check if item is already in cart
//       const isAlreadyInCart = cartItems.some(item => item.productId === product._id);

//       if (isAlreadyInCart) {
//         toast.info("Already in cart. Redirecting...", {
//           icon: "🛒",
//           autoClose: 1500,
//           onClose: () => navigate("/cart"),
//         });
//         return;
//       }

//       // API call to add to cart
//       const cartData = { productId: product._id, quantity: 1 };
//       await axios.post(`${domainUrl}/cart/add`, cartData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       // Show success toast and redirect
//       toast.success(`${product.name} added! Redirecting...`, {
//         icon: "🛍️",
//         autoClose: 1500,
//         onClose: () => {
//           fetchCart(); // Refresh cart context
//           navigate("/cart");
//         },
//       });

//     } catch (err) {
//       console.error("Error adding to cart:", err);
//       toast.error(err.response?.data?.message || "Failed to add to cart.");
//     } finally {
//       setIsAdding(null);
//     }
//   };

//   // Helper to format image URL
//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return "https://via.placeholder.com/300?text=No+Image";
//     return imagePath.startsWith('http') ? imagePath : `${domainUrl}/${imagePath}`;
//   };

//   // --- PROFILE ICON HANDLER ---
//   const handleUserIconClick = () => {
//     if (!token || role !== "user") {
//       navigate("/login"); // Redirect to login if not logged in
//     } else {
//       setShowModal(true); // Open the profile modal
//     }
//   };

//   // --- RENDER ---

//   const cartItemCount = cartItems.length;

//   return (
//     <div className="bg-white">
//       {/* --- MOBILE MENU --- */}
//       <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="relative z-40 lg:hidden">
//         <DialogBackdrop
//           transition
//           className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
//         />
//         <div className="fixed inset-0 z-40 flex">
//           <DialogPanel
//             transition
//             className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
//           >
//             <div className="flex px-4 pt-5 pb-2">
//               <button
//                 type="button"
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
//               >
//                 <span className="absolute -inset-0.5" />
//                 <span className="sr-only">Close menu</span>
//                 <XMarkIcon aria-hidden="true" className="size-6" />
//               </button>
//             </div>

//             {/* Mobile Links */}
//             <TabGroup className="mt-2">
//               <div className="border-b border-gray-200">
//                 <TabList className="-mb-px flex space-x-8 px-4">
//                   {newNavigation.categories.map((category) => (
//                     <Tab
//                       key={category.name}
//                       className="flex-1 border-b-2 border-transparent px-1 py-4 text-base font-medium whitespace-nowrap text-gray-900 data-selected:border-indigo-600 data-selected:text-indigo-600"
//                     >
//                       {category.name}
//                     </Tab>
//                   ))}
//                 </TabList>
//               </div>
//               <TabPanels as={Fragment}>
//                 {newNavigation.categories.map((category, categoryIdx) => (
//                   <TabPanel key={category.name} className="space-y-12 px-4 pt-10 pb-6">
//                     <div className="grid grid-cols-1 items-start gap-x-6 gap-y-10">
//                       <div className="grid grid-cols-1 gap-x-6 gap-y-10">
//                         <div>
//                           <p id={`mobile-featured-heading-${categoryIdx}`} className="font-medium text-gray-900">
//                             Featured
//                           </p>
//                           <ul
//                             role="list"
//                             aria-labelledby={`mobile-featured-heading-${categoryIdx}`}
//                             className="mt-6 space-y-6"
//                           >
//                             {category.featured.map((item) => (
//                               <li key={item.name} className="flex">
//                                 <a href={item.href} className="text-gray-500">
//                                   {item.name}
//                                 </a>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                         <div>
//                           <p id="mobile-categories-heading" className="font-medium text-gray-900">
//                             Categories
//                           </p>
//                           <ul role="list" aria-labelledby="mobile-categories-heading" className="mt-6 space-y-6">
//                             {category.categories.map((item) => (
//                               <li key={item.name} className="flex">
//                                 <a href={item.href} className="text-gray-500">
//                                   {item.name}
//                                 </a>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       </div>
//                       <div className="grid grid-cols-1 gap-x-6 gap-y-10">
//                         <div>
//                           <p id="mobile-collection-heading" className="font-medium text-gray-900">
//                             Collection
//                           </p>
//                           <ul role="list" aria-labelledby="mobile-collection-heading" className="mt-6 space-y-6">
//                             {category.collection.map((item) => (
//                               <li key={item.name} className="flex">
//                                 <a href={item.href} className="text-gray-500">
//                                   {item.name}
//                                 </a>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>

//                         <div>
//                           <p id="mobile-brand-heading" className="font-medium text-gray-900">
//                             Brands
//                           </p>
//                           <ul role="list" aria-labelledby="mobile-brand-heading" className="mt-6 space-y-6">
//                             {category.brands.map((item) => (
//                               <li key={item.name} className="flex">
//                                 <a href={item.href} className="text-gray-500">
//                                   {item.name}
//                                 </a>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       </div>
//                     </div>
//                   </TabPanel>
//                 ))}
//               </TabPanels>
//             </TabGroup>

//             {/* Main Pages - Home, Cart, My Orders */}
//             <div className="space-y-6 border-t border-gray-200 px-4 py-6">
//               <div className="flow-root">
//                 <Link to="/" className="-m-2 block p-2 font-medium text-gray-900" onClick={() => setMobileMenuOpen(false)}>
//                   Home
//                 </Link>
//               </div>
//               {newNavigation.pages.map((page) => (
//                 <div key={page.name} className="flow-root">
//                   <Link to={page.href} className="-m-2 block p-2 font-medium text-gray-900" onClick={() => setMobileMenuOpen(false)}>
//                     {page.name}
//                   </Link>
//                 </div>
//               ))}
//             </div>

//             {/* Auth Links */}
//             <div className="space-y-6 border-t border-gray-200 px-4 py-6">
//                 {!token ? (
//                     <>
//                         <div className="flow-root">
//                             <Link to="/login" className="-m-2 block p-2 font-medium text-gray-900" onClick={() => setMobileMenuOpen(false)}>
//                                 Sign in
//                             </Link>
//                         </div>
//                         <div className="flow-root">
//                             <Link to="/register" className="-m-2 block p-2 font-medium text-gray-900" onClick={() => setMobileMenuOpen(false)}>
//                                 Create an account
//                             </Link>
//                         </div>
//                     </>
//                 ) : (
//                     <div className="flow-root">
//                         <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="-m-2 block p-2 font-medium text-gray-900">
//                             Logout
//                         </button>
//                     </div>
//                 )}
//             </div>

//             {/* Currency selector */}
//             <div className="space-y-6 border-t border-gray-200 px-4 py-6">
//               <form>
//                 <div className="-ml-2 inline-grid grid-cols-1">
//                   <select
//                     id="mobile-currency"
//                     name="currency"
//                     aria-label="Currency"
//                     className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-0.5 pr-7 pl-2 text-base font-medium text-gray-700 group-hover:text-gray-800 focus:outline-2 sm:text-sm/6"
//                   >
//                     {availableCurrencies.map((currency) => (
//                       <option key={currency}>{currency}</option>
//                     ))}
//                   </select>
//                   <ChevronDownIcon
//                     aria-hidden="true"
//                     className="pointer-events-none col-start-1 row-start-1 mr-1 size-5 self-center justify-self-end fill-gray-500"
//                   />
//                 </div>
//               </form>
//             </div>
//           </DialogPanel>
//         </div>
//       </Dialog>

//       <header className="relative z-30">
//         <nav aria-label="Top">
//           {/* Top navigation - Info Banner */}
//           <div className="bg-gray-900">
//             <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
//               {/* Currency selector (Desktop) */}
//               <form className="hidden lg:block lg:flex-1">
//                 <div className="-ml-2 inline-grid grid-cols-1">
//                   <select
//                     id="desktop-currency"
//                     name="currency"
//                     aria-label="Currency"
//                     className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-gray-900 py-0.5 pr-7 pl-2 text-left text-base font-medium text-white focus:outline-2 focus:-outline-offset-1 focus:outline-white sm:text-sm/6"
//                   >
//                     {availableCurrencies.map((currency) => (
//                       <option key={currency}>{currency}</option>
//                     ))}
//                   </select>
//                   <ChevronDownIcon
//                     aria-hidden="true"
//                     className="pointer-events-none col-start-1 row-start-1 mr-1 size-5 self-center justify-self-end fill-gray-300"
//                   />
//                 </div>
//               </form>

//               <p className="flex-1 text-center text-sm font-medium text-white lg:flex-none">
//                 Get free delivery on orders over $100
//               </p>

//               {/* Auth Links (Desktop) */}
//               <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
//                 {!token ? (
//                     <>
//                         <Link to="/login" className="text-sm font-medium text-white hover:text-gray-100">
//                             Sign in
//                         </Link>
//                         <span aria-hidden="true" className="h-6 w-px bg-gray-600" />
//                         <Link to="/register" className="text-sm font-medium text-white hover:text-gray-100">
//                             Create an account
//                         </Link>
//                     </>
//                 ) : (
//                     <button onClick={handleLogout} className="text-sm font-medium text-white hover:text-gray-100">
//                         Logout
//                     </button>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Secondary navigation - Main Menu */}
//           <div className="bg-white">
//             <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//               <div className="border-b border-gray-200">
//                 <div className="flex h-16 items-center justify-between">
//                   {/* Mobile Menu Icon (lg-) */}
//                   <div className="flex flex-1 items-center lg:hidden">
//                     <button
//                       type="button"
//                       onClick={() => setMobileMenuOpen(true)}
//                       className="-ml-2 rounded-md bg-white p-2 text-gray-400"
//                     >
//                       <span className="sr-only">Open menu</span>
//                       <Bars3Icon aria-hidden="true" className="size-6" />
//                     </button>
//                     {/* Search Icon (Mobile) */}
//                     <a href="#" className="ml-2 p-2 text-gray-400 hover:text-gray-500">
//                       <span className="sr-only">Search</span>
//                       <MagnifyingGlassIcon aria-hidden="true" className="size-6" />
//                     </a>
//                   </div>

//                   {/* Logo */}
//                   <div className="flex items-center justify-center lg:flex-none lg:justify-start">
//                     <Link to="/">
//                       <span className="sr-only">Mandaram Drapes</span>
//                       <img
//                         alt="Mandaram Drapes Logo"
//                         src="/logo123.png" // Use your logo image
//                         className="h-10 w-auto"
//                       />
//                     </Link>
//                   </div>

//                   {/* Main Navigation (Desktop) */}
//                   <div className="hidden h-full lg:flex flex-1 items-center justify-center">
//                     <PopoverGroup className="inset-x-0 bottom-0 px-4">
//                       <div className="flex h-full justify-center space-x-8">

//                         {/* Home Link (Direct) */}
//                         <Link
//                             to="/"
//                             className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
//                         >
//                             Home
//                         </Link>

//                         {/* Shop Category Mega Menu */}
//                         {newNavigation.categories.map((category, categoryIdx) => (
//                           <Popover key={category.name} className="flex">
//                             <div className="relative flex">
//                               <PopoverButton className="group relative flex items-center justify-center text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-open:text-indigo-600">
//                                 {category.name}
//                                 <span
//                                   aria-hidden="true"
//                                   className="absolute inset-x-0 -bottom-px z-30 h-0.5 transition duration-200 ease-out group-data-open:bg-indigo-600"
//                                 />
//                               </PopoverButton>
//                             </div>
//                             <PopoverPanel
//                               transition
//                               className="absolute inset-x-0 top-full z-20 w-full bg-white text-sm text-gray-500 transition data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
//                             >
//                               <div aria-hidden="true" className="absolute inset-0 top-1/2 bg-white shadow-sm" />
//                               <div className="relative bg-white">
//                                 <div className="mx-auto max-w-7xl px-8">
//                                   <div className="grid grid-cols-2 items-start gap-x-8 gap-y-10 pt-10 pb-12">
//                                     <div className="grid grid-cols-2 gap-x-8 gap-y-10">
//                                       {/* Featured */}
//                                       <div>
//                                         <p
//                                           id={`desktop-featured-heading-${categoryIdx}`}
//                                           className="font-medium text-gray-900"
//                                         >
//                                           Featured
//                                         </p>
//                                         <ul
//                                           role="list"
//                                           aria-labelledby={`desktop-featured-heading-${categoryIdx}`}
//                                           className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
//                                         >
//                                           {category.featured.map((item) => (
//                                             <li key={item.name} className="flex">
//                                               <Link to={item.href} className="hover:text-gray-800">
//                                                 {item.name}
//                                               </Link>
//                                             </li>
//                                           ))}
//                                         </ul>
//                                       </div>
//                                       {/* Categories */}
//                                       <div>
//                                         <p id="desktop-categories-heading" className="font-medium text-gray-900">
//                                           Categories
//                                         </p>
//                                         <ul
//                                           role="list"
//                                           aria-labelledby="desktop-categories-heading"
//                                           className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
//                                         >
//                                           {category.categories.map((item) => (
//                                             <li key={item.name} className="flex">
//                                               <Link to={item.href} className="hover:text-gray-800">
//                                                 {item.name}
//                                               </Link>
//                                             </li>
//                                           ))}
//                                         </ul>
//                                       </div>
//                                     </div>
//                                     <div className="grid grid-cols-2 gap-x-8 gap-y-10">
//                                       {/* Collection */}
//                                       <div>
//                                         <p id="desktop-collection-heading" className="font-medium text-gray-900">
//                                           Collection
//                                         </p>
//                                         <ul
//                                           role="list"
//                                           aria-labelledby="desktop-collection-heading"
//                                           className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
//                                         >
//                                           {category.collection.map((item) => (
//                                             <li key={item.name} className="flex">
//                                               <Link to={item.href} className="hover:text-gray-800">
//                                                 {item.name}
//                                               </Link>
//                                             </li>
//                                           ))}
//                                         </ul>
//                                       </div>

//                                       {/* Brands */}
//                                       <div>
//                                         <p id="desktop-brand-heading" className="font-medium text-gray-900">
//                                           Brands
//                                         </p>
//                                         <ul
//                                           role="list"
//                                           aria-labelledby="desktop-brand-heading"
//                                           className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
//                                         >
//                                           {category.brands.map((item) => (
//                                             <li key={item.name} className="flex">
//                                               <Link to={item.href} className="hover:text-gray-800">
//                                                 {item.name}
//                                               </Link>
//                                             </li>
//                                           ))}
//                                         </ul>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </PopoverPanel>
//                           </Popover>
//                         ))}

//                         {/* Other Pages */}
//                         {newNavigation.pages.map((page) => (
//                           <Link
//                             key={page.name}
//                             to={page.href}
//                             className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
//                           >
//                             {page.name}
//                           </Link>
//                         ))}
//                       </div>
//                     </PopoverGroup>
//                   </div>

//                   {/* Icons (Search, Account, Cart) */}
//                   <div className="flex flex-1 items-center justify-end">
//                     <div className="flex items-center lg:ml-8">
//                       <div className="flex space-x-8">
//                         {/* Search Icon (Desktop only) */}
//                         <div className="hidden lg:flex">
//                           <a href="#" className="-m-2 p-2 text-gray-400 hover:text-gray-500">
//                             <span className="sr-only">Search</span>
//                             <MagnifyingGlassIcon aria-hidden="true" className="size-6" />
//                           </a>
//                         </div>

//                         {/* Account/User Icon */}
//                         <div className="flex">
//                           <button onClick={handleUserIconClick} className="-m-2 p-2 text-gray-400 hover:text-gray-500 focus:outline-none">
//                             <span className="sr-only">Account</span>
//                             <UserIcon aria-hidden="true" className="size-6" />
//                           </button>
//                         </div>
//                       </div>

//                       <span aria-hidden="true" className="mx-4 h-6 w-px bg-gray-200 lg:mx-6" />

//                       {/* Cart Icon */}
//                       <div className="flow-root">
//                         <Link to="/cart" className="group -m-2 flex items-center p-2">
//                           <ShoppingCartIcon
//                             aria-hidden="true"
//                             className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
//                           />
//                           <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
//                             {cartItemCount}
//                           </span>
//                           <span className="sr-only">items in cart, view bag</span>
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </nav>
//       </header>

//       {/* --- PROFILE MODAL (Your existing code) --- */}
//       <Dialog
//         open={showModal}
//         onClose={() => setShowModal(false)}
//         className="relative z-50"
//       >
//         <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
//         <div className="fixed inset-0 flex items-center justify-center p-4">
//           <Dialog.Panel
//             className="mx-auto w-full max-w-sm rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 p-6 shadow-2xl"
//           >
//             <Dialog.Title className="text-lg font-semibold text-white mb-4 text-center">
//               Profile Details
//             </Dialog.Title>
//             {isLoading ? (
//               <p className="text-gray-200 text-sm text-center">Loading...</p>
//             ) : userProfile ? (
//               <div className="space-y-3 text-white">
//                 <div>
//                   <p className="text-sm font-medium text-gray-300">Name:</p>
//                   <p className="font-semibold">{userProfile.username}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-300">Email:</p>
//                   <p className="font-semibold">{userProfile.email}</p>
//                 </div>
//                 <button
//                   onClick={() => {
//                     handleLogout();
//                     setShowModal(false);
//                   }}
//                   className="mt-4 w-full rounded-md bg-red-500 text-white py-2 hover:bg-red-600 transition"
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <p className="text-gray-200 text-sm text-center">Failed to load profile</p>
//             )}
//           </Dialog.Panel>
//         </div>
//       </Dialog>
//       {/* --- END PROFILE MODAL --- */}

//       {/* Hero Section Carousel */}
//       <div className="mt-16 relative w-full ">
//         <Carousel autoPlay infiniteLoop showThumbs={true} showStatus={false}>
//           <div>
//             <img
//               src={CarouselImg4}
//               alt="Model wearing stylish outfit"
//               className="object-cover w-full h-auto max-h-[500px]"
//             />
//           </div>
//           <div>
//             <img
//               src={CarouselImg5}
//               alt="Clothing displayed on a rack"
//               className="object-cover w-full h-auto max-h-[500px]"
//             />
//           </div>
//           <div>
//             <img
//               src={CarouselImg8}
//               alt="Fashion show event"
//               className="object-cover w-full h-auto max-h-[500px]"
//             />
//           </div>
//            <div>
//             <img
//               src={CarouselImg9}
//               alt="Close up of a unique textile pattern"
//               className="object-cover w-full h-auto max-h-[500px]"
//             />
//           </div>
//           <div>
//             <img
//               src={CarouselImg10}
//               alt="Woman posing in a designer outfit"
//               className="object-cover w-full h-auto max-h-[500px]"
//             />
//           </div>
//         </Carousel>
//       </div>

//       {/* Category Section */}
//       <CategorySection />

//       {/* --- UPDATED Product Section (Horizontal Scroll) --- */}
//       <section className="bg-white">
//         <div className="mx-auto max-w-7xl px-6 py-16 sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
//             Featured Products
//           </h2>

//           {/* Loading and Error States */}
//           {productsLoading && (
//             <div className="text-center text-gray-600">Loading products...</div>
//           )}
//           {productsError && (
//              <div className="text-center text-red-600">{productsError}</div>
//           )}

//           {/* Horizontal Scroll Container */}
//           {!productsLoading && !productsError && (
//             <div className="relative">
//               {/* Left Chevron */}
//               <button
//                 onClick={() => scroll('left')}
//                 className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/70 rounded-full p-2 shadow-md hover:bg-white transition-all"
//               >
//                 <ChevronLeftIcon className="size-6 text-gray-700" />
//               </button>

//               {/* Product List */}
//               <div
//                 ref={scrollContainerRef}
//                 className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 -mx-4 px-4 gap-x-6 sm:gap-x-8"
//                 style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//               >
//                 {featuredProducts.map((product) => (
//                   // Each Product Card
//                   <div key={product._id} className="w-64 sm:w-72 shrink-0 snap-start">
//                     <Link to={`/products/${product._id}`} className="block">
//                       <div className="relative">
//                         <div className="relative h-72 w-full overflow-hidden rounded-lg">
//                           <img
//                             alt={product.name}
//                             src={getImageUrl(product.image)}
//                             className="size-full object-cover"
//                           />
//                         </div>
//                         <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
//                           <div
//                             aria-hidden="true"
//                             className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
//                           />
//                           <p className="relative text-lg font-semibold text-white">
//                             ₹{product.price.toFixed(2)}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="relative mt-4">
//                         <h3 className="text-sm font-medium text-gray-900">
//                           {product.name}
//                         </h3>
//                         <p className="mt-1 text-sm text-gray-500">{product.category?.name || 'General'}</p>
//                       </div>
//                     </Link>

//                     {/* Add to Bag Button */}
//                     <div className="mt-6">
//                       <button
//                         onClick={() => handleAddToCart(product)}
//                         disabled={isAdding === product._id}
//                         className="relative w-full flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         {isAdding === product._id ? 'Adding...' : 'Add to bag'}
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Right Chevron */}
//               <button
//                 onClick={() => scroll('right')}
//                 className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/70 rounded-full p-2 shadow-md hover:bg-white transition-all"
//               >
//                 <ChevronRightIcon className="size-6 text-gray-700" />
//               </button>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* About Us Footer Section */}
//       <footer className="bg-white border-t border-gray-100 py-16 lg:py-24">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-2 lg:gap-x-16 lg:items-center">
//             {/* Left Column: Fixed Size Image */}
//             <div className="flex justify-center lg:justify-start">
//               <div className="w-full max-w-lg lg:max-w-none h-96">
//                 <img
//                   src="product1.jpg"
//                   alt="Company introduction image"
//                   className="w-full h-full object-cover rounded-lg shadow-xl"
//                 />
//               </div>
//             </div>

//             {/* Right Column: Text Content */}
//             <div className="flex flex-col justify-center">
//               <div className="max-w-prose">
//                 <p className="text-sm font-semibold uppercase tracking-wider text-black mb-2">
//                   ABOUT US
//                 </p>
//                 <h2 className="text-3xl font-extrabold tracking-tight text-[#5e785a] mb-6">
//                   Mandaram Drapes
//                 </h2>

//                 <div className="text-base text-gray-400 space-y-4">
//                   <p>
//                     Welcome to **Mandaram Drapes** where tradition meets timeless
//                     fashion. Born from a deep love for Indian craftsmanship,
//                     Mandaram is more than just a clothing label — it’s a journey
//                     through threads of heritage, art, and individuality. Every
//                     saree and churidar in our collection is carefully curated,
//                     highlighting handpicked fabrics, intricate weaves, and
//                     soulful details that celebrate the beauty of Indian culture.
//                   </p>
//                   <p>
//                     From the graceful drape of a Banarasi saree to the soft flow
//                     of a linen churidar, our designs are made to make you feel
//                     confident, elegant, and connected to your roots. Whether
//                     you’re dressing up for a celebration or adding ethnic flair
//                     to your everyday look, Mandaram ensures that style and
//                     comfort walk hand in hand.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>

//       {/* Socials Footer */}
//       <footer className="bg-white dark:bg-gray-900">
//         <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
//           <div className="flex justify-center space-x-6 md:order-2">
//             {footerNavigation.map((item) => (
//               <a
//                 key={item.name}
//                 href={item.href}
//                 className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
//               >
//                 <span className="sr-only">{item.name}</span>
//                 <item.icon aria-hidden="true" className="size-6" />
//               </a>
//             ))}
//           </div>
//           <p className="mt-8 text-center text-sm/6 text-gray-600 md:order-1 md:mt-0 dark:text-gray-400">
//             &copy; 2024 Your Company, Inc. All rights reserved.
//           </p>
//         </div>
//       </footer>

//       {/* Toast Container for notifications */}
//       <ToastContainer
//         position="top-center"
//         autoClose={2000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored"
//         transition={Slide}
//       />
//     </div>
//   );
// };

// export default Customerdashboard;

// 'use client'

// import React, { useRef, useState, useEffect, Fragment } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import CategorySection from "../cart/CategorySection";
// import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
// import { Bars3Icon, ShoppingCartIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'; // MagnifyingGlassIcon removed
// import { domainUrl } from "../utils/constant";
// import axios from "axios";

// // --- HOOKS & CONTEXT ---
// import { useCart } from "../context/CartContext";
// import { ToastContainer, toast, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // --- CAROUSEL ---
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// // Assuming these assets exist in your project structure
// import CarouselImg4 from "../assets/carousel_img4.png";
// import CarouselImg5 from "../assets/carousel_img5.jpg";
// import CarouselImg8 from "../assets/carousel_img8.jpg";
// import CarouselImg9 from "../assets/carousel_img9.jpg";
// import CarouselImg10 from "../assets/carousel_img10.jpg";

// // --- Utility Icons ---
// const ChevronLeftIcon = (props) => (
//   <svg
//     {...props}
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     className="w-6 h-6"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M15.75 19.5L8.25 12l7.5-7.5"
//     />
//   </svg>
// );

// const ChevronRightIcon = (props) => (
//   <svg
//     {...props}
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     className="w-6 h-6"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M8.25 4.5l7.5 7.5-7.5 7.5"
//     />
//   </svg>
// );
// // --------------------

// // --- SIMPLIFIED NAVIGATION DATA ---
// // Categories (for the complex mega menu) are removed entirely.
// const simpleNavigation = {
//   pages: [
//     { name: 'Home', href: '/' },
//     { name: 'Cart', href: '/cart' },
//     { name: 'My Orders', href: '/myorders' },
//   ],
// };

// // Footer navigation data (Social Icons)
// // In Customerdashboard.jsx, replace the existing footerNavigation array
// // with this corrected version:

// const footerNavigation = [
//   {
//     name: "Facebook",
//     href: "#",
//     icon: (props) => (
//       <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
//         <path
//           fillRule="evenodd"
//           d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
//           clipRule="evenodd"
//         />
//       </svg>
//     ),
//   },
//   {
//     name: "Instagram",
//     href: "#",
//     icon: (props) => (
//       <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
//         <path
//           fillRule="evenodd"
//           d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
//           clipRule="evenodd"
//         />
//       </svg>
//     ),
//   },
//   {
//     name: "X",
//     href: "#",
//     icon: (props) => (
//       <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
//         <path d="M18.89 2.08a1.25 1.25 0 00-1.25 0L10.8 10.38l-7.7-8.3a1.25 1.25 0 00-1.95 1.55l8.6 9.3L1.5 21.92a1.25 1.25 0 001.96 1.57l7.7-8.3 7.7 8.3a1.25 1.25 0 001.95-1.55l-8.6-9.3L22.5 2.08a1.25 1.25 0 00-1.25-1.95zM19.16 4.3l-8.4 9.1L4.85 4.3h-1.2L10 14.8l-5.14 5.56h1.2l8.4-9.1 5.14 5.56h1.2L14 10.7l8.4-9.1h-1.2z" />
//       </svg>
//     ),
//   },
//   {
//     name: "YouTube",
//     href: "#",
//     icon: (props) => (
//       <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
//         <path
//           fillRule="evenodd"
//           d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
//           clipRule="evenodd"
//         />
//       </svg>
//     ),
//   },
// ];

// const Customerdashboard = () => {
//   const scrollContainerRef = useRef(null);
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   // --- STATE ---
//   const [userProfile, setUserProfile] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   // State for Featured Products
//   const [featuredProducts, setFeaturedProducts] = useState([]);
//   const [productsLoading, setProductsLoading] = useState(true);
//   const [productsError, setProductsError] = useState(null);

//   // State for "Add to Bag" button loading
//   const [isAdding, setIsAdding] = useState(null);

//   // --- CART CONTEXT ---
//   const { cartItems, fetchCart } = useCart();

//   // --- DATA FETCHING ---

//   // Fetch User Profile
//   useEffect(() => {
//     if (token && role === "user") {
//       const fetchProfile = async () => {
//         setIsLoading(true);
//         try {
//           const res = await axios.get(`${domainUrl}/user/profile`, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           setUserProfile(res.data.users);
//         } catch (err) {
//           console.error("Error fetching profile:", err);
//         } finally {
//           setIsLoading(false);
//         }
//       };
//       fetchProfile();
//     } else {
//       setIsLoading(false);
//     }
//   }, [token, role]);

//   // Fetch Featured Products
//   useEffect(() => {
//     const fetchFeaturedProducts = async () => {
//       setProductsLoading(true);
//       setProductsError(null);
//       try {
//         const res = await axios.get(`${domainUrl}/user/shop/products`);

//         if (res.data && res.data.products) {
//           setFeaturedProducts(res.data.products);
//         } else {
//           setFeaturedProducts([]);
//         }

//       } catch (err) {
//         console.error("Error fetching products:", err);
//         setProductsError("Could not load featured products.");
//       } finally {
//         setProductsLoading(false);
//       }
//     };

//     fetchFeaturedProducts();
//   }, []);

//   // --- HANDLERS ---
// const {notifyAuthChange} = useCart();
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     notifyAuthChange(); // Notify other components about auth change
//     setUserProfile(null);
//     navigate("/login");
//   };

//   // Horizontal scroll handler
//   const scroll = (direction) => {
//     if (scrollContainerRef.current) {
//       const scrollAmount = direction === 'left' ? -300 : 300;
//       scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//     }
//   };

//   // Add to Cart Handler
//   const handleAddToCart = async (product) => {
//     if (!token || role !== "user") {
//       toast.warn("Please log in to add items to your cart.", {
//         onClose: () => navigate("/login"),
//         autoClose: 2000,
//       });
//       return;
//     }

//     if (isAdding) return;

//     setIsAdding(product._id);

//     try {
//       // Check if item is already in cart
//       const isAlreadyInCart = cartItems.some(item => item.productId === product._id);

//       if (isAlreadyInCart) {
//         toast.info("Already in cart. Redirecting...", {
//           icon: "🛒",
//           autoClose: 1500,
//           onClose: () => navigate("/cart"),
//         });
//         return;
//       }

//       // API call to add to cart
//       const cartData = { productId: product._id, quantity: 1 };
//       await axios.post(`${domainUrl}/cart/add`, cartData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       // Show success toast and redirect
//       toast.success(`${product.name} added! Redirecting...`, {
//         icon: "🛍️",
//         autoClose: 1500,
//         onClose: () => {
//           fetchCart(); // Refresh cart context
//           navigate("/cart");
//         },
//       });

//     } catch (err) {
//       console.error("Error adding to cart:", err);
//       toast.error(err.response?.data?.message || "Failed to add to cart.");
//     } finally {
//       setIsAdding(null);
//     }
//   };

//   // Helper to format image URL
//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return "https://via.placeholder.com/300?text=No+Image";
//     return imagePath.startsWith('http') ? imagePath : `${domainUrl}/${imagePath}`;
//   };

//   // --- PROFILE ICON HANDLER ---
//   const handleUserIconClick = () => {
//     if (!token || role !== "user") {
//       navigate("/login");
//     } else {
//       setShowModal(true);
//     }
//   };

//   // --- RENDER ---

//   const cartItemCount = cartItems.length;

//   return (
//     <div className="bg-white">
//       {/* --- MOBILE MENU --- */}
//       <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="relative z-40 lg:hidden">
//         <DialogBackdrop
//           transition
//           className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
//         />
//         <div className="fixed inset-0 z-40 flex">
//           <DialogPanel
//             transition
//             className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
//           >
//             <div className="flex px-4 pt-5 pb-2">
//               <button
//                 type="button"
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
//               >
//                 <span className="absolute -inset-0.5" />
//                 <span className="sr-only">Close menu</span>
//                 <XMarkIcon aria-hidden="true" className="size-6" />
//               </button>
//             </div>

//             {/* Mobile Navigation Links */}
//             <div className="space-y-6 border-t border-gray-200 px-4 py-6">
//               {simpleNavigation.pages.map((page) => (
//                 <div key={page.name} className="flow-root">
//                   <Link to={page.href} className="-m-2 block p-2 font-medium text-gray-900" onClick={() => setMobileMenuOpen(false)}>
//                     {page.name}
//                   </Link>
//                 </div>
//               ))}
//             </div>

//             {/* Auth Links */}
//             <div className="space-y-6 border-t border-gray-200 px-4 py-6">
//                 {!token ? (
//                     <>
//                         <div className="flow-root">
//                             <Link to="/login" className="-m-2 block p-2 font-medium text-gray-900" onClick={() => setMobileMenuOpen(false)}>
//                                 Sign in
//                             </Link>
//                         </div>
//                         <div className="flow-root">
//                             <Link to="/register" className="-m-2 block p-2 font-medium text-gray-900" onClick={() => setMobileMenuOpen(false)}>
//                                 Create an account
//                             </Link>
//                         </div>
//                     </>
//                 ) : (
//                     <div className="flow-root">
//                         <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="-m-2 block p-2 font-medium text-gray-900">
//                             Logout
//                         </button>
//                     </div>
//                 )}
//             </div>

//           </DialogPanel>
//         </div>
//       </Dialog>

//    <header className="relative z-30">
//     {/* *** FIX APPLIED: Single Fixed Wrapper for Both Bars *** */}
//     <div className="fixed top-0 w-full z-40 shadow-lg">
//         <nav aria-label="Top">
//             {/* Top navigation - Info Banner (Now inside the fixed container) */}
//             <div className="bg-gray-900">
//                 <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

//                     {/* Spacer on the left (replaces currency selector) */}
//                     <div className="hidden lg:block lg:flex-1" />

//                     <p className="flex-1 text-center text-sm font-medium text-white lg:flex-none">
//                         Get free delivery on orders over ₹100
//                     </p>

//                     {/* Auth Links (Desktop) */}
//                     <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
//                         {!token ? (
//                             <>
//                                 <Link to="/login" className="text-sm font-medium text-white hover:text-gray-100">
//                                     Sign in
//                                 </Link>
//                                 <span aria-hidden="true" className="h-6 w-px bg-gray-600" />
//                                 <Link to="/signup" className="text-sm font-medium text-white hover:text-gray-100">
//                                     Create an account
//                                 </Link>
//                             </>
//                         ) : (
//                             <button onClick={handleLogout} className="text-sm font-medium text-white hover:text-gray-100">
//                                 Logout
//                             </button>
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {/* Secondary navigation - Main Menu (Now inside the fixed container) */}
//             <div className="bg-white">
//                 <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//                     <div className="border-b border-gray-200">
//                         <div className="flex h-16 items-center justify-between">

//                             {/* Mobile Menu Icon (lg-) */}
//                             <div className="flex flex-1 items-center lg:hidden">
//                                 <button
//                                     type="button"
//                                     onClick={() => setMobileMenuOpen(true)}
//                                     className="-ml-2 rounded-md bg-white p-2 text-gray-400"
//                                 >
//                                     <span className="sr-only">Open menu</span>
//                                     <Bars3Icon aria-hidden="true" className="size-6" />
//                                 </button>
//                                 {/* Spacer (replaces mobile search) */}
//                                 <div className="ml-2 p-2 w-6 h-6" aria-hidden="true" />
//                             </div>

//                             {/* Logo */}
//                             <div className="flex items-center justify-center lg:flex-none lg:justify-start">
//                                 <Link to="/">
//                                     <span className="sr-only">Mandaram Drapes</span>
//                                     <img
//                                         alt="Mandaram Drapes Logo"
//                                         src="/logo123.png"
//                                         className="h-10 w-auto"
//                                     />
//                                 </Link>
//                             </div>

//                             {/* Main Navigation (Desktop) */}
//                             <div className="hidden h-full lg:flex flex-1 items-center justify-center">
//                                 <div className="flex h-full justify-center space-x-8">
//                                     {simpleNavigation.pages.map((page) => (
//                                         <Link
//                                             key={page.name}
//                                             to={page.href}
//                                             className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
//                                         >
//                                             {page.name}
//                                         </Link>
//                                     ))}
//                                 </div>
//                             </div>

//                             {/* Icons (Account, Cart) */}
//                             <div className="flex flex-1 items-center justify-end">
//                                 <div className="flex items-center lg:ml-8">
//                                     <div className="flex space-x-8">
//                                         {/* Spacer (replaces desktop search) */}
//                                         <div className="hidden lg:flex w-6 h-6" aria-hidden="true" />

//                                         {/* Account/User Icon */}
//                                         <div className="flex">
//                                             <button onClick={handleUserIconClick} className="-m-2 p-2 text-gray-400 hover:text-gray-500 focus:outline-none">
//                                                 <span className="sr-only">Account</span>
//                                                 <UserIcon aria-hidden="true" className="size-6" />
//                                             </button>
//                                         </div>
//                                     </div>

//                                     <span aria-hidden="true" className="mx-4 h-6 w-px bg-gray-200 lg:mx-6" />

//                                     {/* Cart Icon */}
//                                     <div className="flow-root">
//                                         <Link to="/cart" className="group -m-2 flex items-center p-2">
//                                             <ShoppingCartIcon
//                                                 aria-hidden="true"
//                                                 className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
//                                             />
//                                             <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
//                                                 {cartItemCount}
//                                             </span>
//                                             <span className="sr-only">items in cart, view bag</span>
//                                         </Link>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     </div>
// </header>

//       {/* --- PROFILE MODAL (Your existing code) --- */}
//       <Dialog
//         open={showModal}
//         onClose={() => setShowModal(false)}
//         className="relative z-50"
//       >
//         <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
//         <div className="fixed inset-0 flex items-center justify-center p-4">
//           <Dialog.Panel
//             className="mx-auto w-full max-w-sm rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 p-6 shadow-2xl"
//           >
//             <Dialog.Title className="text-lg font-semibold text-white mb-4 text-center">
//               Profile Details
//             </Dialog.Title>
//             {isLoading ? (
//               <p className="text-gray-200 text-sm text-center">Loading...</p>
//             ) : userProfile ? (
//               <div className="space-y-3 text-white">
//                 <div>
//                   <p className="text-sm font-medium text-gray-300">Name:</p>
//                   <p className="font-semibold">{userProfile.username}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-300">Email:</p>
//                   <p className="font-semibold">{userProfile.email}</p>
//                 </div>
//                 <button
//                   onClick={() => {
//                     handleLogout();
//                     setShowModal(false);
//                   }}
//                   className="mt-4 w-full rounded-md bg-red-500 text-white py-2 hover:bg-red-600 transition"
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <p className="text-gray-200 text-sm text-center">Failed to load profile</p>
//             )}
//           </Dialog.Panel>
//         </div>
//       </Dialog>
//       {/* --- END PROFILE MODAL --- */}

//       {/* Hero Section Carousel */}
//       {/* Note: Added a margin-top to account for the fixed header, even though it's sticky now */}
//      <div className="mt-[6.5rem] relative w-full ">
//          <Carousel autoPlay infiniteLoop showThumbs={true} showStatus={false}>
//           <div>
//             <img
//               src={CarouselImg4}
//               alt="Model wearing stylish outfit"
//               className="object-cover w-full h-auto max-h-[500px]"
//             />
//           </div>
//           <div>
//             <img
//               src={CarouselImg5}
//               alt="Clothing displayed on a rack"
//               className="object-cover w-full h-auto max-h-[500px]"
//             />
//           </div>
//           <div>
//             <img
//               src={CarouselImg8}
//               alt="Fashion show event"
//               className="object-cover w-full h-auto max-h-[500px]"
//             />
//           </div>
//            <div>
//             <img
//               src={CarouselImg9}
//               alt="Close up of a unique textile pattern"
//               className="object-cover w-full h-auto max-h-[500px]"
//             />
//           </div>
//           <div>
//             <img
//               src={CarouselImg10}
//               alt="Woman posing in a designer outfit"
//               className="object-cover w-full h-auto max-h-[500px]"
//             />
//           </div>
//         </Carousel>
//       </div>

//       {/* Category Section */}
//       <CategorySection />

//       {/* --- UPDATED Product Section (Horizontal Scroll) --- */}
//       <section className="bg-white">
//         <div className="mx-auto max-w-7xl px-6 py-16 sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
//             Featured Products
//           </h2>

//           {/* Loading and Error States */}
//           {productsLoading && (
//             <div className="text-center text-gray-600">Loading products...</div>
//           )}
//           {productsError && (
//              <div className="text-center text-red-600">{productsError}</div>
//           )}

//           {/* Horizontal Scroll Container */}
//           {!productsLoading && !productsError && (
//             <div className="relative">
//               {/* Left Chevron */}
//               <button
//                 onClick={() => scroll('left')}
//                 className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/70 rounded-full p-2 shadow-md hover:bg-white transition-all"
//               >
//                 <ChevronLeftIcon className="size-6 text-gray-700" />
//               </button>

//               {/* Product List */}
//               <div
//                 ref={scrollContainerRef}
//                 className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 -mx-4 px-4 gap-x-6 sm:gap-x-8"
//                 style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//               >
//                 {featuredProducts.map((product) => (
//                   // Each Product Card
//                   <div key={product._id} className="w-64 sm:w-72 shrink-0 snap-start">
//                     <Link to={`/products/${product._id}`} className="block">
//                       <div className="relative">
//                         <div className="relative h-72 w-full overflow-hidden rounded-lg">
//                           <img
//                             alt={product.name}
//                             src={getImageUrl(product.image)}
//                             className="size-full object-cover"
//                           />
//                         </div>
//                         <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
//                           <div
//                             aria-hidden="true"
//                             className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
//                           />
//                           <p className="relative text-lg font-semibold text-white">
//                             ₹{product.price.toFixed(2)}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="relative mt-4">
//                         <h3 className="text-sm font-medium text-gray-900">
//                           {product.name}
//                         </h3>
//                         <p className="mt-1 text-sm text-gray-500">{product.category?.name || 'General'}</p>
//                       </div>
//                     </Link>

//                     {/* Add to Bag Button */}
//                     <div className="mt-6">
//                       <button
//                         onClick={() => handleAddToCart(product)}
//                         disabled={isAdding === product._id}
//                         className="relative w-full flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         {isAdding === product._id ? 'Adding...' : 'Add to bag'}
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Right Chevron */}
//               <button
//                 onClick={() => scroll('right')}
//                 className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/70 rounded-full p-2 shadow-md hover:bg-white transition-all"
//               >
//                 <ChevronRightIcon className="size-6 text-gray-700" />
//               </button>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* About Us Footer Section */}
//       <footer className="bg-white border-t border-gray-100 py-16 lg:py-24">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-2 lg:gap-x-16 lg:items-center">
//             {/* Left Column: Fixed Size Image */}
//             <div className="flex justify-center lg:justify-start">
//               <div className="w-full max-w-lg lg:max-w-none h-96">
//                 <img
//                   src="product1.jpg"
//                   alt="Company introduction image"
//                   className="w-full h-full object-cover rounded-lg shadow-xl"
//                 />
//               </div>
//             </div>

//             {/* Right Column: Text Content */}
//             <div className="flex flex-col justify-center md:justify-center">
//               <div className="max-w-prose">
//                 <p className="text-sm font-semibold uppercase tracking-wider text-black mb-2 px-5   ">
//                   ABOUT US
//                 </p>
//                 <h2 className="text-3xl font-extrabold tracking-tight text-[#5e785a] mb-6 px-5 ">
//                   Mandaram Drapes
//                 </h2>

//                 <div className="text-base text-gray-400 space-y-4 p-5  ">
//                   <p>
//                     Welcome to Mandaram Drapes where tradition meets timeless
//                     fashion. Born from a deep love for Indian craftsmanship,
//                     Mandaram is more than just a clothing label — it's a journey
//                     through threads of heritage, art, and individuality. Every
//                     saree and churidar in our collection is carefully curated,
//                     highlighting handpicked fabrics, intricate weaves, and
//                     soulful details that celebrate the beauty of Indian culture.
//                   </p>
//                   <p>
//                     From the graceful drape of a Banarasi saree to the soft flow
//                     of a linen churidar, our designs are made to make you feel
//                     confident, elegant, and connected to your roots. Whether
//                     you're dressing up for a celebration or adding ethnic flair
//                     to your everyday look, Mandaram ensures that style and
//                     comfort walk hand in hand.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>

//       {/* Socials Footer */}
//       <footer className="bg-white dark:bg-gray-900">
//         <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
//           <div className="flex justify-center space-x-6 md:order-2">
//             {footerNavigation.map((item) => (
//               <a
//                 key={item.name}
//                 href={item.href}
//                 className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
//               >
//                 <span className="sr-only">{item.name}</span>
//                 <item.icon aria-hidden="true" className="size-6" />
//               </a>
//             ))}
//           </div>
//           <p className="mt-8 text-center text-sm/6 text-gray-600 md:order-1 md:mt-0 dark:text-gray-400">
//             &copy; 2024 Your Company, Inc. All rights reserved.
//           </p>
//         </div>
//       </footer>

//       {/* Toast Container for notifications */}
//       <ToastContainer
//         position="top-center"
//         autoClose={2000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored"
//         transition={Slide}
//       />
//     </div>
//   );
// };

// export default Customerdashboard;

//updated code with login issues

// 'use client'

// import React, { useRef, useState, useEffect, Fragment } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import CategorySection from "../cart/CategorySection";
// import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
// import { Bars3Icon, ShoppingCartIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline';
// import { domainUrl } from "../utils/constant";
// import axios from "axios";

// // --- HOOKS & CONTEXT ---
// import { useCart } from "../context/CartContext";
// import { ToastContainer, toast, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // --- CAROUSEL ---
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// // Assuming these assets exist in your project structure
// import CarouselImg4 from "../assets/carousel_img4.png";
// import CarouselImg5 from "../assets/carousel_img5.jpg";
// import CarouselImg8 from "../assets/carousel_img8.jpg";
// import CarouselImg9 from "../assets/carousel_img9.jpg";
// import CarouselImg10 from "../assets/carousel_img10.jpg";

// // --- Utility Icons ---
// const ChevronLeftIcon = (props) => (
//   <svg
//     {...props}
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     className="w-6 h-6"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M15.75 19.5L8.25 12l7.5-7.5"
//     />
//   </svg>
// );

// const ChevronRightIcon = (props) => (
//   <svg
//     {...props}
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     className="w-6 h-6"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M8.25 4.5l7.5 7.5-7.5 7.5"
//     />
//   </svg>
// );
// // --------------------

// // --- SIMPLIFIED NAVIGATION DATA ---
// const simpleNavigation = {
//   pages: [
//     { name: 'Home', href: '/' },
//     { name: 'Cart', href: '/cart' },
//     { name: 'My Orders', href: '/myorders' },
//   ],
// };

// // Footer navigation data (Social Icons) - Assuming correct paths
// const footerNavigation = [
//   {
//     name: "Facebook",
//     href: "#",
//     icon: (props) => (
//       <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
//         <path
//           fillRule="evenodd"
//           d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
//           clipRule="evenodd"
//         />
//       </svg>
//     ),
//   },
//   {
//     name: "X",
//     href: "#",
//     icon: (props) => (
//       <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
//         <path d="M18.89 2.08a1.25 1.25 0 00-1.25 0L10.8 10.38l-7.7-8.3a1.25 1.25 0 00-1.95 1.55l8.6 9.3L1.5 21.92a1.25 1.25 0 001.96 1.57l7.7-8.3 7.7 8.3a1.25 1.25 0 001.95-1.55l-8.6-9.3L22.5 2.08a1.25 1.25 0 00-1.25-1.95zM19.16 4.3l-8.4 9.1L4.85 4.3h-1.2L10 14.8l-5.14 5.56h1.2l8.4-9.1 5.14 5.56h1.2L14 10.7l8.4-9.1h-1.2z" />
//       </svg>
//     ),
//   },
//   {
//     name: "YouTube",
//     href: "#",
//     icon: (props) => (
//       <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
//         <path
//           fillRule="evenodd"
//           d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
//           clipRule="evenodd"
//         />
//       </svg>
//     ),
//   },
// ];

// const Customerdashboard = () => {
//   const scrollContainerRef = useRef(null);
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   // --- STATE ---
//   const [userProfile, setUserProfile] = useState(null);
//   const [isProfileLoading, setIsProfileLoading] = useState(true); // Renamed loading state
//   const [showModal, setShowModal] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   // State for Featured Products
//   const [featuredProducts, setFeaturedProducts] = useState([]);
//   const [productsLoading, setProductsLoading] = useState(true);
//   const [productsError, setProductsError] = useState(null);
//
//   // State for "Add to Bag" button loading
//   const [isAdding, setIsAdding] = useState(null);

//   // --- CART CONTEXT ---
//   const { cartItems, fetchCart, notifyAuthChange } = useCart();

//   // --- ROLE REDIRECTION AND PROFILE FETCH ---
//   useEffect(() => {
//     const checkAuthAndFetchProfile = async () => {
//         setIsProfileLoading(true);

//         // 1. Check for redirection FIRST
//         if (token && role === "admin") {
//             // Immediately redirect if local storage confirms admin role
//             console.log("Admin detected locally. Redirecting...");
//             navigate("/admindashboard");
//             return; // Stop further execution
//         }

//         // 2. Fetch profile only if user/customer role is possible
//         if (token && role === "user") {
//             try {
//                 const res = await axios.get(`${domainUrl}/user/profile`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });

//                 // FINAL SAFETY CHECK: If API returns admin role, redirect (shouldn't happen often)
//                 if (res.data.users?.role === 'admin') {
//                     localStorage.setItem('role', 'admin'); // Correct local storage
//                     navigate("/admindashboard");
//                     return;
//                 }

//                 setUserProfile(res.data.users);
//             } catch (err) {
//                 console.error("Error fetching profile:", err);
//                 // On failure, treat as not logged in or session expired
//             } finally {
//                 setIsProfileLoading(false);
//             }
//         } else {
//             setIsProfileLoading(false); // Not logged in
//         }
//     };

//     checkAuthAndFetchProfile();
//   }, [token, role, navigate]);

//   // --- DATA FETCHING ---

//   // Fetch Featured Products
//   useEffect(() => {
//     const fetchFeaturedProducts = async () => {
//       setProductsLoading(true);
//       setProductsError(null);
//       try {
//         const res = await axios.get(`${domainUrl}/user/shop/products`);
//
//         if (res.data && res.data.products) {
//           setFeaturedProducts(res.data.products);
//         } else {
//           setFeaturedProducts([]);
//         }
//
//       } catch (err) {
//         console.error("Error fetching products:", err);
//         setProductsError("Could not load featured products.");
//       } finally {
//         setProductsLoading(false);
//       }
//     };

//     fetchFeaturedProducts();
//   }, []);

//   // --- HANDLERS ---
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     notifyAuthChange(); // Notify other components about auth change
//     setUserProfile(null);
//     navigate("/login");
//   };

//   // Horizontal scroll handler
//   const scroll = (direction) => {
//     if (scrollContainerRef.current) {
//       const scrollAmount = direction === 'left' ? -300 : 300;
//       scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//     }
//   };

//   // Add to Cart Handler
//   const handleAddToCart = async (product) => {
//     if (!token || role !== "user") {
//       toast.warn("Please log in to add items to your cart.", {
//         onClose: () => navigate("/login"),
//         autoClose: 2000,
//       });
//       return;
//     }

//     if (isAdding) return;

//     setIsAdding(product._id);

//     try {
//       // Check if item is already in cart
//       const isAlreadyInCart = cartItems.some(item => item.productId === product._id);

//       if (isAlreadyInCart) {
//         toast.info("Already in cart. Redirecting...", {
//           icon: "🛒",
//           autoClose: 1500,
//           onClose: () => navigate("/cart"),
//         });
//         return;
//       }

//       // API call to add to cart
//       const cartData = { productId: product._id, quantity: 1 };
//       await axios.post(`${domainUrl}/cart/add`, cartData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       // Show success toast and redirect
//       toast.success(`${product.name} added! Redirecting...`, {
//         icon: "🛍️",
//         autoClose: 1500,
//         onClose: () => {
//           fetchCart(); // Refresh cart context
//           navigate("/cart");
//         },
//       });

//     } catch (err) {
//       console.error("Error adding to cart:", err);
//       toast.error(err.response?.data?.message || "Failed to add to cart.");
//     } finally {
//       setIsAdding(null);
//     }
//   };

//   // Helper to format image URL
//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return "https://via.placeholder.com/300?text=No+Image";
//     return imagePath.startsWith('http') ? imagePath : `${domainUrl}/${imagePath}`;
//   };

//   // --- PROFILE ICON HANDLER ---
//   const handleUserIconClick = () => {
//     if (!token || role !== "user") {
//       navigate("/login");
//     } else {
//       setShowModal(true);
//     }
//   };

//   // --- RENDER ---

//   // Display loading screen or null if profile is still being checked
//   if (isProfileLoading) {
//       return (
//           <div className="flex items-center justify-center min-h-screen bg-gray-50">
//               <p className="text-gray-600 font-medium">Checking authentication...</p>
//           </div>
//       );
//   }

//   // FINAL CHECK: If role is somehow admin at this point, show redirect notice
//   if (token && role === 'admin') {
//       return (
//           <div className="flex items-center justify-center min-h-screen bg-gray-50">
//               <p className="text-gray-600 font-medium">Redirecting to Admin...</p>
//           </div>
//       );
//   }

//   const cartItemCount = cartItems.length;

//   return (
//     <div className="bg-white">
//       {/* --- MOBILE MENU --- */}
//       <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="relative z-40 lg:hidden">
//         <DialogBackdrop
//           transition
//           className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
//         />
//         <div className="fixed inset-0 z-40 flex">
//           <DialogPanel
//             transition
//             className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
//           >
//             <div className="flex px-4 pt-5 pb-2">
//               <button
//                 type="button"
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
//               >
//                 <span className="absolute -inset-0.5" />
//                 <span className="sr-only">Close menu</span>
//                 <XMarkIcon aria-hidden="true" className="size-6" />
//               </button>
//             </div>

//             {/* Mobile Navigation Links */}
//             <div className="space-y-6 border-t border-gray-200 px-4 py-6">
//               {simpleNavigation.pages.map((page) => (
//                 <div key={page.name} className="flow-root">
//                   <Link to={page.href} className="-m-2 block p-2 font-medium text-gray-900" onClick={() => setMobileMenuOpen(false)}>
//                     {page.name}
//                   </Link>
//                 </div>
//               ))}
//             </div>

//             {/* Auth Links */}
//             <div className="space-y-6 border-t border-gray-200 px-4 py-6">
//                 {!token ? (
//                     <>
//                         <div className="flow-root">
//                             <Link to="/login" className="-m-2 block p-2 font-medium text-gray-900" onClick={() => setMobileMenuOpen(false)}>
//                                 Sign in
//                             </Link>
//                         </div>
//                         <div className="flow-root">
//                             <Link to="/register" className="-m-2 block p-2 font-medium text-gray-900" onClick={() => setMobileMenuOpen(false)}>
//                                 Create an account
//                             </Link>
//                         </div>
//                     </>
//                 ) : (
//                     <div className="flow-root">
//                         <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="-m-2 block p-2 font-medium text-gray-900">
//                             Logout
//                         </button>
//                     </div>
//                 )}
//             </div>
//
//           </DialogPanel>
//         </div>
//       </Dialog>

//    {/* --- FIXED NAVBAR --- */}
//     <header className="relative z-30">
//       <div className="fixed top-0 w-full z-40 shadow-lg">
//         <nav aria-label="Top">
//             {/* Top navigation - Info Banner */}
//             <div className="bg-gray-900">
//                 <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
//
//                     {/* Spacer on the left */}
//                     <div className="hidden lg:block lg:flex-1" />

//                     <p className="flex-1 text-center text-sm font-medium text-white lg:flex-none">
//                         Get free delivery on orders over ₹100
//                     </p>

//                     {/* Auth Links (Desktop) */}
//                     <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
//                         {!token ? (
//                             <>
//                                 <Link to="/login" className="text-sm font-medium text-white hover:text-gray-100">
//                                     Sign in
//                                 </Link>
//                                 <span aria-hidden="true" className="h-6 w-px bg-gray-600" />
//                                 <Link to="/signup" className="text-sm font-medium text-white hover:text-gray-100">
//                                     Create an account
//                                 </Link>
//                             </>
//                         ) : (
//                             <button onClick={handleLogout} className="text-sm font-medium text-white hover:text-gray-100">
//                                 Logout
//                             </button>
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {/* Secondary navigation - Main Menu */}
//             <div className="bg-white">
//                 <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//                     <div className="border-b border-gray-200">
//                         <div className="flex h-16 items-center justify-between">
//
//                             {/* Mobile Menu Icon (lg-) */}
//                             <div className="flex flex-1 items-center lg:hidden">
//                                 <button
//                                     type="button"
//                                     onClick={() => setMobileMenuOpen(true)}
//                                     className="-ml-2 rounded-md bg-white p-2 text-gray-400"
//                                 >
//                                     <span className="sr-only">Open menu</span>
//                                     <Bars3Icon aria-hidden="true" className="size-6" />
//                                 </button>
//                                 {/* Spacer (replaces mobile search) */}
//                                 <div className="ml-2 p-2 w-6 h-6" aria-hidden="true" />
//                             </div>

//                             {/* Logo */}
//                             <div className="flex items-center justify-center lg:flex-none lg:justify-start">
//                                 <Link to="/">
//                                     <span className="sr-only">Mandaram Drapes</span>
//                                     <img
//                                         alt="Mandaram Drapes Logo"
//                                         src="/logo123.png"
//                                         className="h-10 w-auto"
//                                     />
//                                 </Link>
//                             </div>

//                             {/* Main Navigation (Desktop) */}
//                             <div className="hidden h-full lg:flex flex-1 items-center justify-center">
//                                 <div className="flex h-full justify-center space-x-8">
//                                     {simpleNavigation.pages.map((page) => (
//                                         <Link
//                                             key={page.name}
//                                             to={page.href}
//                                             className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
//                                         >
//                                             {page.name}
//                                         </Link>
//                                     ))}
//                                 </div>
//                             </div>

//                             {/* Icons (Account, Cart) */}
//                             <div className="flex flex-1 items-center justify-end">
//                                 <div className="flex items-center lg:ml-8">
//                                     <div className="flex space-x-8">
//                                         {/* Spacer (replaces desktop search) */}
//                                         <div className="hidden lg:flex w-6 h-6" aria-hidden="true" />

//                                         {/* Account/User Icon */}
//                                         <div className="flex">
//                                             <button onClick={handleUserIconClick} className="-m-2 p-2 text-gray-400 hover:text-gray-500 focus:outline-none">
//                                                 <span className="sr-only">Account</span>
//                                                 <UserIcon aria-hidden="true" className="size-6" />
//                                             </button>
//                                         </div>
//                                     </div>

//                                     <span aria-hidden="true" className="mx-4 h-6 w-px bg-gray-200 lg:mx-6" />

//                                     {/* Cart Icon */}
//                                     <div className="flow-root">
//                                         <Link to="/cart" className="group -m-2 flex items-center p-2">
//                                             <ShoppingCartIcon
//                                                 aria-hidden="true"
//                                                 className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
//                                             />
//                                             <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
//                                                 {cartItemCount}
//                                             </span>
//                                             <span className="sr-only">items in cart, view bag</span>
//                                         </Link>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     </div>
// </header>

//       {/* --- PROFILE MODAL (Your existing code) --- */}
//       <Dialog
//         open={showModal}
//         onClose={() => setShowModal(false)}
//         className="relative z-50"
//       >
//         <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
//         <div className="fixed inset-0 flex items-center justify-center p-4">
//           <Dialog.Panel
//             className="mx-auto w-full max-w-sm rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 p-6 shadow-2xl"
//           >
//             <Dialog.Title className="text-lg font-semibold text-white mb-4 text-center">
//               Profile Details
//             </Dialog.Title>
//            {isProfileLoading ? (
//               <p className="text-gray-200 text-sm text-center">Loading...</p>
//             ) : userProfile ? (
//               <div className="space-y-3 text-white">
//                 <div>
//                   <p className="text-sm font-medium text-gray-300">Name:</p>
//                   <p className="font-semibold">{userProfile.username}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-300">Email:</p>
//                   <p className="font-semibold">{userProfile.email}</p>
//                 </div>
//                 <button
//                   onClick={() => {
//                     handleLogout();
//                     setShowModal(false);
//                   }}
//                   className="mt-4 w-full rounded-md bg-red-500 text-white py-2 hover:bg-red-600 transition"
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <p className="text-gray-200 text-sm text-center">Failed to load profile</p>
//             )}
//           </Dialog.Panel>
//         </div>
//       </Dialog>
//       {/* --- END PROFILE MODAL --- */}

//       {/* Hero Section Carousel */}
//       {/* Note: Added a margin-top to account for the fixed header, even though it's sticky now */}
//      <div className="mt-[6.5rem] relative w-full ">
//          <Carousel autoPlay infiniteLoop showThumbs={true} showStatus={false}>
//           <div>
//             <img
//               src={CarouselImg4}
//               alt="Model wearing stylish outfit"
//               className="object-cover w-full h-auto max-h-[500px]"
//             />
//           </div>
//           <div>
//             <img
//               src={CarouselImg5}
//               alt="Clothing displayed on a rack"
//               className="object-cover w-full h-auto max-h-[500px]"
//             />
//           </div>
//           <div>
//             <img
//               src={CarouselImg8}
//               alt="Fashion show event"
//               className="object-cover w-full h-auto max-h-[500px]"
//             />
//           </div>
//            <div>
//             <img
//               src={CarouselImg9}
//               alt="Close up of a unique textile pattern"
//               className="object-cover w-full h-auto max-h-[500px]"
//             />
//           </div>
//           <div>
//             <img
//               src={CarouselImg10}
//               alt="Woman posing in a designer outfit"
//               className="object-cover w-full h-auto max-h-[500px]"
//             />
//           </div>
//         </Carousel>
//       </div>

//       {/* Category Section */}
//       <CategorySection />

//       {/* --- UPDATED Product Section (Horizontal Scroll) --- */}
//       <section className="bg-white">
//         <div className="mx-auto max-w-7xl px-6 py-16 sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
//             Featured Products
//           </h2>

//           {/* Loading and Error States */}
//           {productsLoading && (
//             <div className="text-center text-gray-600">Loading products...</div>
//           )}
//           {productsError && (
//              <div className="text-center text-red-600">{productsError}</div>
//           )}

//           {/* Horizontal Scroll Container */}
//           {!productsLoading && !productsError && (
//             <div className="relative">
//               {/* Left Chevron */}
//               <button
//                 onClick={() => scroll('left')}
//                 className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/70 rounded-full p-2 shadow-md hover:bg-white transition-all"
//               >
//                 <ChevronLeftIcon className="size-6 text-gray-700" />
//               </button>
//
//               {/* Product List */}
//               <div
//                 ref={scrollContainerRef}
//                 className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 -mx-4 px-4 gap-x-6 sm:gap-x-8"
//                 style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//               >
//                 {featuredProducts.map((product) => (
//                   // Each Product Card
//                   <div key={product._id} className="w-64 sm:w-72 shrink-0 snap-start">
//                     <Link to={`/products/${product._id}`} className="block">
//                       <div className="relative">
//                         <div className="relative h-72 w-full overflow-hidden rounded-lg">
//                           <img
//                             alt={product.name}
//                             src={getImageUrl(product.image)}
//                             className="size-full object-cover"
//                           />
//                         </div>
//                         <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
//                           <div
//                             aria-hidden="true"
//                             className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
//                           />
//                           <p className="relative text-lg font-semibold text-white">
//                             ₹{product.price.toFixed(2)}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="relative mt-4">
//                         <h3 className="text-sm font-medium text-gray-900">
//                           {product.name}
//                         </h3>
//                         <p className="mt-1 text-sm text-gray-500">{product.category?.name || 'General'}</p>
//                       </div>
//                     </Link>

//                     {/* Add to Bag Button */}
//                     <div className="mt-6">
//                       <button
//                         onClick={() => handleAddToCart(product)}
//                         disabled={isAdding === product._id}
//                         className="relative w-full flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         {isAdding === product._id ? 'Adding...' : 'Add to bag'}
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Right Chevron */}
//               <button
//                 onClick={() => scroll('right')}
//                 className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/70 rounded-full p-2 shadow-md hover:bg-white transition-all"
//               >
//                 <ChevronRightIcon className="size-6 text-gray-700" />
//               </button>
//             </div>
//           )}
//         </div>
//       </section>

//

//       {/* About Us Footer Section */}
//       <footer className="bg-white border-t border-gray-100 py-16 lg:py-24">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-2 lg:gap-x-16 lg:items-center">
//             {/* Left Column: Fixed Size Image */}
//             <div className="flex justify-center lg:justify-start">
//               <div className="w-full max-w-lg lg:max-w-none h-96">
//                 <img
//                   src="product1.jpg"
//                   alt="Company introduction image"
//                   className="w-full h-full object-cover rounded-lg shadow-xl"
//                 />
//               </div>
//             </div>

//

//             {/* Right Column: Text Content */}
//             <div className="flex flex-col justify-center md:justify-center">
//               <div className="max-w-prose">
//                 <p className="text-sm font-semibold uppercase tracking-wider text-black mb-2 px-5   ">
//                   ABOUT US
//                 </p>
//                 <h2 className="text-3xl font-extrabold tracking-tight text-[#5e785a] mb-6 px-5 ">
//                   Mandaram Drapes
//                 </h2>

//                 <div className="text-base text-gray-400 space-y-4 p-5  ">
//                   <p>
//                     Welcome to Mandaram Drapes where tradition meets timeless
//                     fashion. Born from a deep love for Indian craftsmanship,
//                     Mandaram is more than just a clothing label — it's a journey
//                     through threads of heritage, art, and individuality. Every
//                     saree and churidar in our collection is carefully curated,
//                     highlighting handpicked fabrics, intricate weaves, and
//                     soulful details that celebrate the beauty of Indian culture.
//                   </p>
//                   <p>
//                     From the graceful drape of a Banarasi saree to the soft flow
//                     of a linen churidar, our designs are made to make you feel
//                     confident, elegant, and connected to your roots. Whether
//                     you're dressing up for a celebration or adding ethnic flair
//                     to your everyday look, Mandaram ensures that style and
//                     comfort walk hand in hand.
//                   </p>
//                 </div>
//
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>

//       {/* Socials Footer */}
//       <footer className="bg-white dark:bg-gray-900">
//         <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
//           <div className="flex justify-center space-x-6 md:order-2">
//             {footerNavigation.map((item) => (
//               <a
//                 key={item.name}
//                 href={item.href}
//                 className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
//               >
//                 <span className="sr-only">{item.name}</span>
//                 <item.icon aria-hidden="true" className="size-6" />
//               </a>
//             ))}
//           </div>
//           <p className="mt-8 text-center text-sm/6 text-gray-600 md:order-1 md:mt-0 dark:text-gray-400">
//             &copy; 2024 Your Company, Inc. All rights reserved.
//           </p>
//         </div>
//         <ToastContainer for notifications />
//       </footer>

//       {/* Toast Container for notifications */}
//       <ToastContainer
//         position="top-center"
//         autoClose={2000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored"
//         transition={Slide}
//       />
//     </div>
//   );
// };

// export default Customerdashboard;

// "use client";

// import React, { useRef, useState, useEffect, Fragment } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import CategorySection from "../cart/CategorySection";
// import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
// import {
//   Bars3Icon,
//   ShoppingCartIcon,
//   UserIcon,
//   XMarkIcon,
// } from "@heroicons/react/24/outline";
// import { domainUrl } from "../utils/constant";
// import axios from "axios";
// import Navbar from "../components/Navbar";
// import FeaturedProducts from "../components/FeaturedProducts";



// import FooterSection from "../components/FooterSection";
// import HeroCarousel from "../components/HeroCarousel";
// import Loader from "../components/Loader";
// import CustomerLayout from "../layouts/CustomerLayout";

// // --- HOOKS & CONTEXT ---
// import { useCart } from "../context/CartContext";
// import { ToastContainer, toast, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // --- SIMPLIFIED NAVIGATION DATA ---
// const simpleNavigation = {
//   pages: [
//     { name: "Home", href: "/", protected: false },
//     { name: "Cart", href: "/cart", protected: true },
//     { name: "My Orders", href: "/myorders", protected: true },
//   ],
// };

// const Customerdashboard = () => {
//   const scrollContainerRef = useRef(null);
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role"); // --- STATE ---

//   const [userProfile, setUserProfile] = useState(null);
//   const [isProfileLoading, setIsProfileLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State for Featured Products

//   const [featuredProducts, setFeaturedProducts] = useState([]);
//   const [productsLoading, setProductsLoading] = useState(true);
//   const [productsError, setProductsError] = useState(null); // State for "Add to Bag" button loading
//   const [isAdding, setIsAdding] = useState(null); // --- CART CONTEXT ---

//   const { cartItems, fetchCart, notifyAuthChange } = useCart(); // --- ROLE REDIRECTION AND PROFILE FETCH ---

//   useEffect(() => {
//     const checkAuthAndFetchProfile = async () => {
//       setIsProfileLoading(true); // 1. Check for redirection FIRST

//       if (token && role === "admin") {
//         console.log("Admin detected locally. Redirecting...");
//         navigate("/admindashboard", { replace: true }); // *** FIX 1: Use { replace: true } ***
//         return;
//       } // 2. Fetch profile only if user/customer role is possible
//       if (token && role === "user") {
//         try {
//           const res = await axios.get(`${domainUrl}/user/profile`, {
//             headers: { Authorization: `Bearer ${token}` },
//           }); // FINAL SAFETY CHECK: If API returns admin role, redirect (shouldn't happen often)
//           if (res.data.users?.role === "admin") {
//             localStorage.setItem("role", "admin");
//             navigate("/admindashboard", { replace: true }); // *** FIX 2: Use { replace: true } ***
//             return;
//           }
//           setUserProfile(res.data.users);
//         } catch (err) {
//           console.error("Error fetching profile:", err);
//         } finally {
//           setIsProfileLoading(false);
//         }
//       } else {
//         setIsProfileLoading(false); // Not logged in
//       }
//     };

//     checkAuthAndFetchProfile();
//   }, [token, role, navigate]); // --- DATA FETCHING --- // Fetch Featured Products

//   useEffect(() => {
//     const fetchFeaturedProducts = async () => {
//       setProductsLoading(true);
//       setProductsError(null);
//       try {
//         const res = await axios.get(`${domainUrl}/user/shop/products`);
//         if (res.data && res.data.products) {
//           setFeaturedProducts(res.data.products);
//         } else {
//           setFeaturedProducts([]);
//         }
//       } catch (err) {
//         console.error("Error fetching products:", err);
//         setProductsError("Could not load featured products.");
//       } finally {
//         setProductsLoading(false);
//       }
//     };

//     fetchFeaturedProducts();
//   }, []); // --- HANDLERS ---

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     notifyAuthChange();
//     setUserProfile(null);
//     navigate("/login");
//   }; // Gated Navigation Handler for main navbar links
//   const handleGatedNavigation = (e, path, isProtected) => {
//     if (isProtected && !token) {
//       e.preventDefault();
//       toast.warn("Please log in to view this page.", {
//         onClose: () => navigate("/login"),
//         autoClose: 2000,
//         icon: "🔒",
//       });
//     } else if (isProtected && role === "admin") {
//       e.preventDefault();
//       navigate("/admindashboard");
//     } else {
//       navigate(path);
//     }
//   }; // Horizontal scroll handler

//   const scroll = (direction) => {
//     if (scrollContainerRef.current) {
//       const scrollAmount = direction === "left" ? -300 : 300;
//       scrollContainerRef.current.scrollBy({
//         left: scrollAmount,
//         behavior: "smooth",
//       });
//     }
//   }; // Add to Cart Handler

//   const handleAddToCart = async (product) => {
//     if (!token || role !== "user") {
//       toast.warn("Please log in to add items to your cart.", {
//         onClose: () => navigate("/login"),
//         autoClose: 2000,
//       });
//       return;
//     }

//     if (isAdding) return;

//     setIsAdding(product._id);

//     try {
//       // Check if item is already in cart
//       const isAlreadyInCart = cartItems.some(
//         (item) => item.productId === product._id
//       );

//       if (isAlreadyInCart) {
//         toast.info("Already in cart. Redirecting...", {
//           icon: "🛒",
//           autoClose: 1500,
//           onClose: () => navigate("/cart"),
//         });
//         return;
//       } // API call to add to cart

//       const cartData = { productId: product._id, quantity: 1 };
//       await axios.post(`${domainUrl}/cart/add`, cartData, {
//         headers: { Authorization: `Bearer ${token}` },
//       }); // Show success toast and redirect

//       toast.success(`${product.name} added! Redirecting...`, {
//         icon: "🛍️",
//         autoClose: 1500,
//         onClose: () => {
//           fetchCart(); // Refresh cart context
//           navigate("/cart");
//         },
//       });
//     } catch (err) {
//       console.error("Error adding to cart:", err);
//       toast.error(err.response?.data?.message || "Failed to add to cart.");
//     } finally {
//       setIsAdding(null);
//     }
//   }; // Helper to format image URL

//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return "https://via.placeholder.com/300?text=No+Image";
//     return imagePath.startsWith("http")
//       ? imagePath
//       : `${domainUrl}/${imagePath}`;
//   }; // --- PROFILE ICON HANDLER ---

//   const handleUserIconClick = () => {
//     if (!token || role !== "user") {
//       navigate("/login");
//     } else {
//       setShowModal(true);
//     }
//   }; // --- RENDER ---

//   // Display loading screen while profile is being checked
//   if (isProfileLoading) {
//     return <Loader message="Loading..." />;
//   }

//   // FINAL CHECK: If role is confirmed as admin at this point, show redirect notice
//   if (token && role === "admin") {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50">
//         <p className="text-gray-600 font-medium">Redirecting to Admin...</p>
//       </div>
//     );
//   }

//   const cartItemCount = cartItems.length;

//   return (
//     <div className="bg-white">
//             {/* --- MOBILE MENU --- */}     {" "}
//       <Dialog
//         open={mobileMenuOpen}
//         onClose={setMobileMenuOpen}
//         className="relative z-40 lg:hidden"
//       >
//                {" "}
//         <DialogBackdrop
//           transition
//           className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
//         />
//                {" "}
//         <div className="fixed inset-0 z-40 flex">
//                    {" "}
//           <DialogPanel
//             transition
//             className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
//           >
//                        {" "}
//             <div className="flex px-4 pt-5 pb-2">
//                            {" "}
//               <button
//                 type="button"
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
//               >
//                                 <span className="absolute -inset-0.5" />       
//                         <span className="sr-only">Close menu</span>             
//                   <XMarkIcon aria-hidden="true" className="size-6" />           
//                  {" "}
//               </button>
//                          {" "}
//             </div>
//                         {/* Mobile Navigation Links */}           {" "}
//             <div className="space-y-6 border-t border-gray-200 px-4 py-6">
//                            {" "}
//               {simpleNavigation.pages.map((page) => (
//                 <div key={page.name} className="flow-root">
//                                     {/* Use handler for protected pages */}     
//                              {" "}
//                   <a
//                     href={page.href}
//                     className="-m-2 block p-2 font-medium text-gray-900"
//                     onClick={(e) => {
//                       handleGatedNavigation(e, page.href, page.protected);
//                       setMobileMenuOpen(false);
//                     }}
//                   >
//                                         {page.name}                 {" "}
//                   </a>
//                                  {" "}
//                 </div>
//               ))}
//                          {" "}
//             </div>
//                         {/* Auth Links */}           {" "}
//             <div className="space-y-6 border-t border-gray-200 px-4 py-6">
//                              {" "}
//               {!token ? (
//                 <>
//                                          {" "}
//                   <div className="flow-root">
//                                                {" "}
//                     <Link
//                       to="/login"
//                       className="-m-2 block p-2 font-medium text-gray-900"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                                                       Sign in                  
//                                {" "}
//                     </Link>
//                                            {" "}
//                   </div>
//                                          {" "}
//                   <div className="flow-root">
//                                                {" "}
//                     <Link
//                       to="/register"
//                       className="-m-2 block p-2 font-medium text-gray-900"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                                                       Create an account        
//                                          {" "}
//                     </Link>
//                                            {" "}
//                   </div>
//                                      {" "}
//                 </>
//               ) : (
//                 <div className="flow-root">
//                                          {" "}
//                   <button
//                     onClick={() => {
//                       handleLogout();
//                       setMobileMenuOpen(false);
//                     }}
//                     className="-m-2 block p-2 font-medium text-gray-900"
//                   >
//                                                 Logout                        {" "}
//                   </button>
//                                      {" "}
//                 </div>
//               )}
//                          {" "}
//             </div>
//                                  {" "}
//           </DialogPanel>
//                  {" "}
//         </div>
//              {" "}
//       </Dialog>
//          {/* --- FIXED NAVBAR --- */}
//       <Navbar
//         token={token}
//         role={role}
//         cartItemCount={cartItems.length}
//         handleLogout={handleLogout}
//         handleUserIconClick={handleUserIconClick}
//         handleGatedNavigation={handleGatedNavigation}
//       />
//             {/* --- PROFILE MODAL (Your existing code) --- */}     {" "}
//       <Dialog
//         open={showModal}
//         onClose={() => setShowModal(false)}
//         className="relative z-50"
//       >
//                {" "}
//         <div
//           className="fixed inset-0 bg-black/30 backdrop-blur-sm"
//           aria-hidden="true"
//         />
//                {" "}
//         <div className="fixed inset-0 flex items-center justify-center p-4">
//                    {" "}
//           <Dialog.Panel className="mx-auto w-full max-w-sm rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 p-6 shadow-2xl">
//                        {" "}
//             <Dialog.Title className="text-lg font-semibold text-white mb-4 text-center">
//                             Profile Details            {" "}
//             </Dialog.Title>
//                        
//             {isProfileLoading ? (
//               <p className="text-gray-200 text-sm text-center">Loading...</p>
//             ) : userProfile ? (
//               <div className="space-y-3 text-white">
//                                {" "}
//                 <div>
//                                    {" "}
//                   <p className="text-sm font-medium text-gray-300">Name:</p>   
//                                {" "}
//                   <p className="font-semibold">{userProfile.username}</p>       
//                          {" "}
//                 </div>
//                                {" "}
//                 <div>
//                                    {" "}
//                   <p className="text-sm font-medium text-gray-300">Email:</p>   
//                                {" "}
//                   <p className="font-semibold">{userProfile.email}</p>         
//                        {" "}
//                 </div>
//                                {" "}
//                 <button
//                   onClick={() => {
//                     handleLogout();
//                     setShowModal(false);
//                   }}
//                   className="mt-4 w-full rounded-md bg-red-500 text-white py-2 hover:bg-red-600 transition"
//                 >
//                                     Logout                {" "}
//                 </button>
//                              {" "}
//               </div>
//             ) : (
//               <p className="text-gray-200 text-sm text-center">
//                 Failed to load profile
//               </p>
//             )}
//                      {" "}
//           </Dialog.Panel>
//                  {" "}
//         </div>
//              {" "}
//       </Dialog>
//             {/* --- END PROFILE MODAL --- */}      {/* Hero Section Carousel */}
//            {" "}
//       {/* Note: Added a margin-top to account for the fixed header, even though it's sticky now */}
//            
//       <HeroCarousel />      {/* Category Section */}
//             <CategorySection />     {" "}
//       {/* --- UPDATED Product Section (Horizontal Scroll) --- */}
//            
//       <FeaturedProducts
//         featuredProducts={featuredProducts}
//         productsLoading={productsLoading}
//         productsError={productsError}
//         handleAddToCart={handleAddToCart}
//         isAdding={isAdding}
//       />
//                   {/* About Us Footer Section */}
//            <FooterSection />           {" "}
//       {/* Toast Container for notifications */}     {" "}
//       <ToastContainer
//         position="top-center"
//         autoClose={2000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored"
//         transition={Slide}
//       />
//          {" "}
//     </div>
//   );
// };

// export default Customerdashboard;




"use client";

import React, { useRef, useState, useEffect, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import CategorySection from "../cart/CategorySection";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { domainUrl } from "../utils/constant";
import axios from "axios";
import Navbar from "../components/Navbar";
import FeaturedProducts from "../components/FeaturedProducts";

import FooterSection from "../components/FooterSection";
import HeroCarousel from "../components/HeroCarousel";
import Loader from "../components/Loader";
import CustomerLayout from "../layouts/CustomerLayout";

// --- HOOKS & CONTEXT ---
import { useCart } from "../context/CartContext";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// --- SIMPLIFIED NAVIGATION DATA ---
const simpleNavigation = {
  pages: [
    { name: "Home", href: "/", protected: false },
    { name: "Cart", href: "/cart", protected: true },
    { name: "My Orders", href: "/myorders", protected: true },
  ],
};

// Configure axios to send cookies (for session/JWT cookie)
axios.defaults.withCredentials = true;

const Customerdashboard = () => {
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();
  // const token = localStorage.getItem("token"); // *** REMOVED: No longer reading token from localStorage ***
  const role = localStorage.getItem("role"); // --- STATE ---

  const [userProfile, setUserProfile] = useState(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  // Set isAuthenticated based on API response, not just local storage
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State for Featured Products

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState(null); // State for "Add to Bag" button loading
  const [isAdding, setIsAdding] = useState(null); // --- CART CONTEXT ---

  const { cartItems, fetchCart, notifyAuthChange } = useCart(); // --- ROLE REDIRECTION AND PROFILE FETCH ---

  useEffect(() => {
    const checkAuthAndFetchProfile = async () => {
      setIsProfileLoading(true);

      // 1. Check for local admin redirection first (role is still in localStorage)
      if (role === "admin") {
        console.log("Admin detected locally. Redirecting...");
        navigate("/admindashboard", { replace: true });
        return;
      }

      // 2. Attempt to fetch profile. Success implies authentication via cookie.
      try {
        // API call to check profile. Cookie is sent automatically by the browser.
        const res = await axios.get(`${domainUrl}/user/profile`);

        // If successful, set authenticated state and user profile
        setIsAuthenticated(true);

        // FINAL SAFETY CHECK: If API returns admin role, redirect
        if (res.data.users?.role === "admin") {
          localStorage.setItem("role", "admin"); // Update local storage
          navigate("/admindashboard", { replace: true });
          return;
        }

        // Standard user/customer flow
        setUserProfile(res.data.users);
        localStorage.setItem("role", res.data.users?.role || "user"); // Ensure role is 'user' in storage if successful
      } catch (err) {
        // An error (e.g., 401 Unauthorized) means no valid session cookie/token
        console.error("Error fetching profile, assuming not logged in:", err.response?.status);
        setIsAuthenticated(false);
        setUserProfile(null);
        // localStorage.removeItem("role"); // OPTIONAL: You might clear the role here too
      } finally {
        setIsProfileLoading(false);
      }
    };

    checkAuthAndFetchProfile();
  }, [role, navigate]); // Removed 'token' from dependency array

  // --- DATA FETCHING --- // Fetch Featured Products
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setProductsLoading(true);
      setProductsError(null);
      try {
        // No header needed, this is public data
        const res = await axios.get(`${domainUrl}/user/shop/products`);
        if (res.data && res.data.products) {
          setFeaturedProducts(res.data.products);
        } else {
          setFeaturedProducts([]);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setProductsError("Could not load featured products.");
      } finally {
        setProductsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []); // --- HANDLERS ---




  const handleLogout = async () => {
    try {
      // 1. Invalidate session cookie on the server (best practice)
      await axios.post(`${domainUrl}/user/logout`);
    } catch (error) {
      console.error("Logout API failed (cookie may still be cleared by browser soon):", error);
    }

    // 2. Clear local storage and state on the client
    // localStorage.removeItem("token"); // *** REMOVED ***
    localStorage.removeItem("role"); // Keep role clear as requested
    notifyAuthChange();
    setUserProfile(null);
    setIsAuthenticated(false);
    navigate("/login");
  };

  // Gated Navigation Handler for main navbar links
  const handleGatedNavigation = (e, path, isProtected) => {
    // Check if the page is protected AND the user is NOT authenticated
    if (isProtected && !isAuthenticated) {
      e.preventDefault();
      toast.warn("Please log in to view this page.", {
        onClose: () => navigate("/login"),
        autoClose: 2000,
        icon: "🔒",
      });
    } else if (isProtected && role === "admin") {
      e.preventDefault();
      navigate("/admindashboard");
    } else {
      navigate(path);
    }
  };

  // Horizontal scroll handler (kept unchanged as it's UI logic)
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Add to Cart Handler
  const handleAddToCart = async (product) => {
    // Check for authentication state derived from API call, not local token
    if (!isAuthenticated || role !== "user") {
      toast.warn("Please log in to add items to your cart.", {
        onClose: () => navigate("/login"),
        autoClose: 2000,
      });
      return;
    }

    if (isAdding) return;

    setIsAdding(product._id);

    try {
      // Check if item is already in cart
      const isAlreadyInCart = cartItems.some(
        (item) => item.productId === product._id
      );

      if (isAlreadyInCart) {
        toast.info("Already in cart. Redirecting...", {
          icon: "🛒",
          autoClose: 1500,
          onClose: () => navigate("/cart"),
        });
        return;
      }
      // API call to add to cart - Cookie is sent automatically
      const cartData = { productId: product._id, quantity: 1 };
      // *** REMOVED `headers: { Authorization: ... }` from here and next function call ***
      await axios.post(`${domainUrl}/cart/add`, cartData);

      // Show success toast and redirect
      toast.success(`${product.name} added! Redirecting...`, {
        icon: "🛍️",
        autoClose: 1500,
        onClose: () => {
          fetchCart(); // Refresh cart context
          navigate("/cart");
        },
      });
    } catch (err) {
      console.error("Error adding to cart:", err);
      // If 401 Unauthorized, the user's session might have expired.
      if (err.response?.status === 401) {
          toast.error("Session expired. Please log in again.", {
            onClose: () => navigate("/login"),
          });
      } else {
        toast.error(err.response?.data?.message || "Failed to add to cart.");
      }
    } finally {
      setIsAdding(null);
    }
  };
  
  // Helper to format image URL (kept unchanged)
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/300?text=No+Image";
    return imagePath.startsWith("http")
      ? imagePath
      : `${domainUrl}/${imagePath}`;
  };

  // --- PROFILE ICON HANDLER ---
  const handleUserIconClick = () => {
    // Check for authentication state, not local token
    if (!isAuthenticated || role !== "user") {
      navigate("/login");
    } else {
      setShowModal(true);
    }
  }; 

  // --- RENDER ---

  // Display loading screen while profile is being checked
  if (isProfileLoading) {
    return <Loader message="Loading..." />;
  }

  // FINAL CHECK: If role is confirmed as admin at this point, show redirect notice
  if (role === "admin") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-600 font-medium">Redirecting to Admin...</p>
      </div>
    );
  }

  const cartItemCount = cartItems.length;

  return (
    <div className="bg-white">
      {/* --- MOBILE MENU --- */}      
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="relative z-40 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            {/* Mobile Navigation Links */}
            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {simpleNavigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  {/* Use handler for protected pages */}
                  <a
                    href={page.href}
                    className="-m-2 block p-2 font-medium text-gray-900"
                    onClick={(e) => {
                      handleGatedNavigation(e, page.href, page.protected);
                      setMobileMenuOpen(false);
                    }}
                  >
                    {page.name}
                  </a>
                </div>
              ))}
            </div>
            {/* Auth Links */}
            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {!isAuthenticated ? ( // *** CHANGED: Check isAuthenticated state ***
                <>
                  <div className="flow-root">
                    <Link
                      to="/login"
                      className="-m-2 block p-2 font-medium text-gray-900"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign in
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link
                      to="/register"
                      className="-m-2 block p-2 font-medium text-gray-900"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Create an account
                    </Link>
                  </div>
                </>
              ) : (
                <div className="flow-root">
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </DialogPanel>
        </div>
      </Dialog>
      {/* --- FIXED NAVBAR --- */}
      <Navbar
        isAuthenticated={isAuthenticated} // *** CHANGED: Passing isAuthenticated prop instead of token ***
        role={role}
        cartItemCount={cartItems.length}
        handleLogout={handleLogout}
        handleUserIconClick={handleUserIconClick}
        handleGatedNavigation={handleGatedNavigation}
      />
      {/* --- PROFILE MODAL (Your existing code) --- */}
      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="mx-auto w-full max-w-sm rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 p-6 shadow-2xl">
            <Dialog.Title className="text-lg font-semibold text-white mb-4 text-center">
              Profile Details
            </Dialog.Title>
            
            {isProfileLoading ? (
              <p className="text-gray-200 text-sm text-center">Loading...</p>
            ) : userProfile ? (
              <div className="space-y-3 text-white">
                <div>
                  <p className="text-sm font-medium text-gray-300">Name:</p>
                  <p className="font-semibold">{userProfile.username}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-300">Email:</p>
                  <p className="font-semibold">{userProfile.email}</p>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setShowModal(false);
                  }}
                  className="mt-4 w-full rounded-md bg-red-500 text-white py-2 hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <p className="text-gray-200 text-sm text-center">
                Failed to load profile
              </p>
            )}
          </DialogPanel>
        </div>
      </Dialog>
      {/* --- END PROFILE MODAL --- */}
      {/* Hero Section Carousel */}
      <HeroCarousel />
      {/* Category Section */}
      <CategorySection />
      {/* --- UPDATED Product Section (Horizontal Scroll) --- */}
      <FeaturedProducts
        featuredProducts={featuredProducts}
        productsLoading={productsLoading}
        productsError={productsError}
        handleAddToCart={handleAddToCart}
        isAdding={isAdding}
      />
      {/* About Us Footer Section */}
      <FooterSection />
      {/* Toast Container for notifications */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}
      />
    </div>
  );
};

export default Customerdashboard;
