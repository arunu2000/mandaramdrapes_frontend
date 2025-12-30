// worlinggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
// import {
//   Bars3Icon,
//   ShoppingCartIcon,
//   UserIcon,
//   XMarkIcon,
//   HeartIcon,
// } from "@heroicons/react/24/outline";
// import logo123 from "../assets/logo.png";
// import { useWishlist } from "../context/WishlistContext";
// import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
// import WishlistPage from "../pages/WishlistPage";

// const Navbar = ({
//   isAuthenticated,
//   role,
//   cartItemCount,
//   handleLogout,
//   handleUserIconClick,
//   handleGatedNavigation,
// }) => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const navigate = useNavigate();
//   const { wishlistCount } = useWishlist();


//     // Fallback handler if parent doesn't pass handleGatedNavigation yet
//   const safeHandleGatedNavigation =
//     handleGatedNavigation ||
//     ((e, path, isProtected) => {
//       if (isProtected && !isAuthenticated) {
//         e.preventDefault();
//         navigate("/login");
//       } else if (isProtected && role === "admin") {
//         e.preventDefault();
//         navigate("/admindashboard");
//       } else {
//         navigate(path);
//       }
//     });


//   console.log("isAuthenticated", isAuthenticated);
//   const simpleNavigation = {
//     pages: [
//       { name: "Home", href: "/", protected: false },
//       // { name: "Cart", href: "/cart", protected: true },
//       { name: "My Orders", href: "/myorders", protected: true },
//       { name: "Products", href: "/products", protected: false },
//     ],
//   };

//   return (
//     <header className="relative z-30">
//       <div className="fixed top-0 w-full z-40 shadow-lg bg-white">
//         <nav aria-label="Top">
//           {/* Top Info Bar */}
//           <div className="bg-gray-900">
//             <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
//               <div className="hidden lg:block lg:flex-1" />
//               <p className="flex-1 text-center text-sm font-medium text-white lg:flex-none">
//                 Get free delivery on orders over ₹100
//               </p>

//               {/* Auth Links (Desktop Only) */}
//               <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
//                 {!isAuthenticated ? (
//                   <>
//                     <Link
//                       to="/login"
//                       className="text-sm font-medium text-white hover:text-gray-100"
//                     >
//                       Sign in
//                     </Link>
//                     <span aria-hidden="true" className="h-6 w-px bg-gray-600" />
//                     <Link
//                       to="/signup"
//                       className="text-sm font-medium text-white hover:text-gray-100"
//                     >
//                       Create an account
//                     </Link>
//                   </>
//                 ) : (
//                   <button
//                     onClick={handleLogout}
//                     className="text-sm font-medium text-white hover:text-gray-100"
//                   >
//                     Logout
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Main Navbar */}
//           <div className="bg-white">
//             <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//               <div className="border-b border-gray-200">
//                 <div className="flex h-16 items-center justify-between">
//                   {/* Mobile Hamburger */}
//                   <div className="flex flex-1 items-center lg:hidden">
//                     <button
//                       type="button"
//                       onClick={() => setMobileMenuOpen(true)}
//                       className="-ml-2 rounded-md bg-white p-2 text-gray-500 hover:text-gray-700"
//                     >
//                       <span className="sr-only">Open menu</span>
//                       <Bars3Icon aria-hidden="true" className="h-6 w-6" />
//                     </button>
//                   </div>

//                   {/* Logo */}
//                   <div className="flex items-center justify-center lg:flex-none lg:justify-start">
//                     <Link to="/">
//                       <span className="sr-only">Mandaram Drapes</span>
//                       <img
//                         alt="Mandaram Drapes Logo"
//                         src={logo123}
//                         className="h-10 w-auto"
//                       />
//                     </Link>
//                   </div>

//                   {/* Desktop Navigation Links */}
//                   <div className="hidden h-full lg:flex flex-1 items-center justify-center">
//                     <div className="flex h-full justify-center space-x-8">
//                       {simpleNavigation.pages.map((page) => (
//                         <a
//                           key={page.name}
//                           href={page.href}
//                           className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
//                           onClick={(e) =>
//                             handleGatedNavigation(e, page.href, page.protected)
//                           }
//                         >
//                           {page.name}
//                         </a>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Icons (Desktop Only) */}
//                   <div className="hidden lg:flex flex-1 items-center justify-end space-x-6">
//                     {/* User Icon */}
//                     <button
//                       onClick={handleUserIconClick}
//                       className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
//                     >
//                       <span className="sr-only">Account</span>
//                       <UserIcon aria-hidden="true" className="h-6 w-6" />
//                     </button>

//                     {/* Favourites Icon */}
//                     {/* <button
//                       onClick={(e) =>
//                         handleGatedNavigation(e, "/favourites", true)
//                       }
//                       className="p-2 text-gray-500 hover:text-red-500 focus:outline-none"
//                     >
//                       <span className="sr-only">Favourites</span>
//                       <HeartIcon aria-hidden="true" className="h-6 w-6" />
//                     </button> */}

//                     <button
//                       onClick={(e) =>
//                         handleGatedNavigation(e, "/WishlistPage", true)
//                       }
//                       className="p-2 text-gray-500 hover:text-red-500 focus:outline-none relative"
//                     >
//                       <span className="sr-only">Favourites</span>
//                       <HeartOutline aria-hidden="true" className="h-6 w-6" />
//                       {wishlistCount > 0 && (
//                         <span className="absolute top-0 right-0 -mr-1 -mt-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
//                           {wishlistCount}
//                         </span>
//                       )}
//                     </button>

//                     {/* Cart Icon */}
//                     <Link
//                       to="/cart"
//                       className="group flex items-center p-2 hover:text-gray-700"
//                     >
//                       <ShoppingCartIcon
//                         aria-hidden="true"
//                         className="h-6 w-6 text-gray-500 group-hover:text-gray-700"
//                       />
//                       <span className="ml-1 text-sm font-medium text-gray-700 group-hover:text-gray-900">
//                         {cartItemCount}
//                       </span>
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </nav>
//       </div>

//       {/* Mobile Menu Drawer */}
//       <Dialog
//         open={mobileMenuOpen}
//         onClose={setMobileMenuOpen}
//         className="relative z-40 lg:hidden"
//       >
//         <DialogBackdrop className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear" />
//         <div className="fixed inset-0 z-40 flex">
//           <DialogPanel className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full">
//             <div className="flex px-4 pt-5 pb-2">
//               <button
//                 type="button"
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-600"
//               >
//                 <span className="sr-only">Close menu</span>
//                 <XMarkIcon aria-hidden="true" className="h-6 w-6" />
//               </button>
//             </div>

//             {/* Mobile Nav Links */}
//             <div className="space-y-6 border-t border-gray-200 px-4 py-6">
//               {simpleNavigation.pages.map((page) => (
//                 <div key={page.name} className="flow-root">
//                   <a
//                     href={page.href}
//                     className="-m-2 block p-2 font-medium text-gray-900"
//                     onClick={(e) => {
//                       handleGatedNavigation(e, page.href, page.protected);
//                       setMobileMenuOpen(false);
//                     }}
//                   >
//                     {page.name}
//                   </a>
//                 </div>
//               ))}

//               {/* Favourites (Mobile Link) */}
//               <div className="flow-root">
//                 <a
//                   href="/WishlistPage"
//                   onClick={(e) => {
//                     handleGatedNavigation(e, "/favourites", true);
//                     setMobileMenuOpen(false);
//                   }}
//                   className="-m-2 block p-2 font-medium text-gray-900"
//                 >
//                   Favourites
//                 </a>
//               </div>
//             </div>

//             {/* Auth Links */}
//             <div className="space-y-6 border-t border-gray-200 px-4 py-6">
//               {!isAuthenticated ? (
//                 <>
//                   <div className="flow-root">
//                     <Link
//                       to="/login"
//                       className="-m-2 block p-2 font-medium text-gray-900"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       Sign in
//                     </Link>
//                   </div>
//                   <div className="flow-root">
//                     <Link
//                       to="/signup"
//                       className="-m-2 block p-2 font-medium text-gray-900"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       Create an account
//                     </Link>
//                   </div>
//                 </>
//               ) : (
//                 <div className="flow-root">
//                   <button
//                     onClick={() => {
//                       handleLogout();
//                       setMobileMenuOpen(false);
//                     }}
//                     className="-m-2 block p-2 font-medium text-gray-900"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </DialogPanel>
//         </div>
//       </Dialog>
//     </header>
//   );
// };

// export default Navbar;




// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";
// import {
//   Bars3Icon,
//   ShoppingCartIcon,
//   UserIcon,
//   XMarkIcon,
//   HeartIcon as HeartOutline,
// } from "@heroicons/react/24/outline";
// import logo123 from "../assets/logo.png";
// import { useWishlist } from "../context/WishlistContext";

// const Navbar = ({
//   isAuthenticated,
//   role,
//   cartItemCount,
//   handleLogout,
//   handleUserIconClick,
//   handleGatedNavigation,
// }) => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const navigate = useNavigate();
//   const { wishlistCount } = useWishlist();

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Navigation Links
//   const navigation = [
//     { name: "Home", href: "/", protected: false },
//     { name: "My Orders", href: "/myorders", protected: true },
//     { name: "Products", href: "/products", protected: false },
//   ];

//   return (
//     <header className="relative z-50 w-full font-sans">
      
//       {/* 1. ANNOUNCEMENT BAR */}
//       <div className="bg-black text-white px-4 h-9 flex items-center justify-center text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-medium">
//         Free Delivery on orders over ₹100
//       </div>

//       {/* 2. MAIN NAVBAR */}
//       <nav
//         className={`bg-white w-full border-b border-gray-100 transition-all duration-300 ${
//           scrolled ? "shadow-sm py-3" : "py-5"
//         } sticky top-0 z-40`}
//       >
//         <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between">

//             {/* LEFT: Mobile Menu & Logo */}
//             <div className="flex items-center gap-4 lg:gap-0">
//               <button
//                 type="button"
//                 className="lg:hidden -ml-2 p-2 text-black"
//                 onClick={() => setMobileMenuOpen(true)}
//               >
//                 <Bars3Icon className="h-6 w-6" />
//               </button>

//               <Link to="/" className="flex-shrink-0">
//                 <img
//                   src={logo123}
//                   alt="Mandaram Drapes"
//                   className="h-8 lg:h-10 w-auto object-contain"
//                 />
//               </Link>
//             </div>

//             {/* CENTER: Desktop Links */}
//             <div className="hidden lg:flex items-center space-x-12">
//               {navigation.map((item) => (
//                 <a
//                   key={item.name}
//                   href={item.href}
//                   onClick={(e) =>
//                     handleGatedNavigation(e, item.href, item.protected)
//                   }
//                   className="text-[11px] font-bold text-black uppercase tracking-[0.15em] hover:text-gray-500 hover:underline underline-offset-4 transition-all duration-200"
//                 >
//                   {item.name}
//                 </a>
//               ))}
//             </div>

//             {/* RIGHT: Auth & Icons */}
//             <div className="flex items-center justify-end gap-6">
              
//               {/* --- AUTH TEXT LINKS (Desktop) --- */}
//               <div className="hidden lg:flex items-center gap-6 text-[11px] font-bold text-black uppercase tracking-wider border-r border-gray-200 pr-6 mr-1">
//                 {!isAuthenticated ? (
//                   <>
//                     <Link to="/login" className="hover:text-gray-500 transition">
//                       Sign In
//                     </Link>
//                     <Link to="/signup" className="hover:text-gray-500 transition">
//                       Register
//                     </Link>
//                   </>
//                 ) : (
//                   <button 
//                     onClick={handleLogout}
//                     className="hover:text-red-600 transition"
//                   >
//                     Logout
//                   </button>
//                 )}
//               </div>

//               {/* --- ICONS --- */}
//               <div className="flex items-center gap-4 sm:gap-5">
//                 {/* Wishlist */}
//                 <button
//                   onClick={(e) => handleGatedNavigation(e, "/WishlistPage", true)}
//                   className="group relative text-black hover:text-gray-600 transition"
//                 >
//                   <HeartOutline className="h-6 w-6 stroke-[1.5px]" />
//                   {wishlistCount > 0 && (
//                     <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-black text-[9px] text-white">
//                       {wishlistCount}
//                     </span>
//                   )}
//                 </button>

//                 {/* Cart */}
//                 <Link to="/cart" className="group relative text-black hover:text-gray-600 transition">
//                   <ShoppingCartIcon className="h-6 w-6 stroke-[1.5px]" />
//                   {cartItemCount > 0 && (
//                     <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-black text-[9px] text-white">
//                       {cartItemCount}
//                     </span>
//                   )}
//                 </Link>

//                 {/* User Icon (Only show if logged in, or always show if you prefer) */}
//                 {isAuthenticated && (
//                    <button
//                     onClick={handleUserIconClick}
//                     className="text-black hover:text-gray-600 transition"
//                   >
//                     <UserIcon className="h-6 w-6 stroke-[1.5px]" />
//                   </button>
//                 )}
//               </div>

//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* 3. MOBILE MENU DRAWER */}
//       <Dialog
//         as="div"
//         className="relative z-50 lg:hidden"
//         open={mobileMenuOpen}
//         onClose={setMobileMenuOpen}
//       >
//         <DialogBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />

//         <div className="fixed inset-0 z-50 flex">
//           <DialogPanel className="relative mr-auto flex h-full w-[85%] max-w-xs flex-col overflow-y-auto bg-white py-6 px-6 shadow-2xl">
            
//             <div className="flex items-center justify-between mb-12">
//               <img src={logo123} alt="Logo" className="h-8 w-auto" />
//               <button
//                 type="button"
//                 className="-m-2 p-2 text-black"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 <XMarkIcon className="h-6 w-6" />
//               </button>
//             </div>

//             <div className="space-y-6">
//               {navigation.map((item) => (
//                 <a
//                   key={item.name}
//                   href={item.href}
//                   onClick={(e) => {
//                     handleGatedNavigation(e, item.href, item.protected);
//                     setMobileMenuOpen(false);
//                   }}
//                   className="block text-sm font-bold text-black uppercase tracking-wider border-b border-gray-100 pb-3"
//                 >
//                   {item.name}
//                 </a>
//               ))}
//             </div>

//             <div className="mt-auto space-y-4">
//               {!isAuthenticated ? (
//                 <>
//                   <Link
//                     to="/login"
//                     onClick={() => setMobileMenuOpen(false)}
//                     className="block w-full text-center bg-black text-white py-4 text-xs font-bold uppercase tracking-widest"
//                   >
//                     Sign In
//                   </Link>
//                   <Link
//                     to="/signup"
//                     onClick={() => setMobileMenuOpen(false)}
//                     className="block w-full text-center border border-black text-black py-4 text-xs font-bold uppercase tracking-widest"
//                   >
//                     Register
//                   </Link>
//                 </>
//               ) : (
//                 <button
//                   onClick={() => {
//                     handleLogout();
//                     setMobileMenuOpen(false);
//                   }}
//                   className="block w-full text-center border border-gray-200 bg-gray-50 text-red-600 py-4 text-xs font-bold uppercase tracking-widest"
//                 >
//                   Logout
//                 </button>
//               )}
//             </div>
//           </DialogPanel>
//         </div>
//       </Dialog>
//     </header>
//   );
// };

// export default Navbar;


// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";
// import {
//   Bars3Icon,
//   ShoppingCartIcon,
//   UserIcon,
//   XMarkIcon,
//   HeartIcon as HeartOutline,
// } from "@heroicons/react/24/outline";
// import logo123 from "../assets/logo.png";
// import { useWishlist } from "../context/WishlistContext";

// const Navbar = ({
//   isAuthenticated,
//   role,
//   cartItemCount,
//   handleLogout,
//   handleUserIconClick,
//   handleGatedNavigation,
// }) => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const navigate = useNavigate();
//   const { wishlistCount } = useWishlist();

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const navigation = [
//     { name: "Home", href: "/", protected: false },
//     { name: "My Orders", href: "/myorders", protected: true },
//     { name: "Products", href: "/products", protected: false },
//   ];

//   return (
//     <header className="relative z-50 w-full font-sans">
      
//       {/* 1. TOP BAR REMOVED (As requested) */}

//       {/* 2. MAIN NAVBAR */}
//       <nav
//         className={`bg-white w-full border-b border-gray-100 transition-all duration-300 ${
//           scrolled ? "shadow-sm py-3" : "py-5"
//         } sticky top-0 z-40`}
//       >
//         <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between">

//             {/* LEFT: Mobile Menu & Logo */}
//             <div className="flex items-center gap-4 lg:gap-0">
//               <button
//                 type="button"
//                 className="lg:hidden -ml-2 p-2 text-black"
//                 onClick={() => setMobileMenuOpen(true)}
//               >
//                 <Bars3Icon className="h-6 w-6" />
//               </button>

//               <Link to="/" className="flex-shrink-0">
//                 <img
//                   src={logo123}
//                   alt="Mandaram Drapes"
//                   className="h-8 lg:h-10 w-auto object-contain"
//                 />
//               </Link>
//             </div>

//             {/* CENTER: Desktop Links */}
//             <div className="hidden lg:flex items-center space-x-12">
//               {navigation.map((item) => (
//                 <a
//                   key={item.name}
//                   href={item.href}
//                   onClick={(e) =>
//                     handleGatedNavigation(e, item.href, item.protected)
//                   }
//                   className="text-[11px] font-bold text-black uppercase tracking-[0.15em] hover:text-gray-500 hover:underline underline-offset-4 transition-all duration-200"
//                 >
//                   {item.name}
//                 </a>
//               ))}
//             </div>

//             {/* RIGHT: Auth & Icons */}
//             <div className="flex items-center justify-end gap-6">
              
//               {/* Auth Links */}
//               <div className="hidden lg:flex items-center gap-6 text-[11px] font-bold text-black uppercase tracking-wider border-r border-gray-200 pr-6 mr-1">
//                 {!isAuthenticated ? (
//                   <>
//                     <Link to="/login" className="hover:text-gray-500 transition">
//                       Sign In
//                     </Link>
//                     <Link to="/signup" className="hover:text-gray-500 transition">
//                       Register
//                     </Link>
//                   </>
//                 ) : (
//                   <button 
//                     onClick={handleLogout}
//                     className="hover:text-red-600 transition"
//                   >
//                     Logout
//                   </button>
//                 )}
//               </div>

//               {/* Icons with Light Grey Counters (Beside/Inline) */}
//               <div className="flex items-center gap-4 sm:gap-5">
                
//                 {/* Wishlist */}
//                 <button
//                   onClick={(e) => handleGatedNavigation(e, "/WishlistPage", true)}
//                   className="group flex items-center gap-2 text-black hover:text-gray-600 transition"
//                 >
//                   <HeartOutline className="h-6 w-6 stroke-[1.5px]" />
//                   {/* Light Grey Counter Bubble */}
//                   {wishlistCount > 0 && (
//                     <span className="flex items-center justify-center min-w-[20px] h-[20px] px-1 text-[10px] font-bold text-gray-700 bg-gray-100 rounded-full">
//                       {wishlistCount}
//                     </span>
//                   )}
//                 </button>

//                 {/* Cart */}
//                 <Link 
//                   to="/cart" 
//                   className="group flex items-center gap-2 text-black hover:text-gray-600 transition"
//                 >
//                   <ShoppingCartIcon className="h-6 w-6 stroke-[1.5px]" />
//                   {/* Light Grey Counter Bubble */}
//                   {cartItemCount > 0 && (
//                     <span className="flex items-center justify-center min-w-[20px] h-[20px] px-1 text-[10px] font-bold text-gray-700 bg-gray-100 rounded-full">
//                       {cartItemCount}
//                     </span>
//                   )}
//                 </Link>

//                 {/* User Icon */}
//                 {isAuthenticated && (
//                    <button
//                     onClick={handleUserIconClick}
//                     className="text-black hover:text-gray-600 transition"
//                   >
//                     <UserIcon className="h-6 w-6 stroke-[1.5px]" />
//                   </button>
//                 )}
//               </div>

//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* 3. MOBILE MENU DRAWER */}
//       <Dialog
//         as="div"
//         className="relative z-50 lg:hidden"
//         open={mobileMenuOpen}
//         onClose={setMobileMenuOpen}
//       >
//         <DialogBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />

//         <div className="fixed inset-0 z-50 flex">
//           <DialogPanel className="relative mr-auto flex h-full w-[85%] max-w-xs flex-col overflow-y-auto bg-white py-6 px-6 shadow-2xl">
            
//             <div className="flex items-center justify-between mb-12">
//               <img src={logo123} alt="Logo" className="h-8 w-auto" />
//               <button
//                 type="button"
//                 className="-m-2 p-2 text-black"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 <XMarkIcon className="h-6 w-6" />
//               </button>
//             </div>

//             <div className="space-y-6">
//               {navigation.map((item) => (
//                 <a
//                   key={item.name}
//                   href={item.href}
//                   onClick={(e) => {
//                     handleGatedNavigation(e, item.href, item.protected);
//                     setMobileMenuOpen(false);
//                   }}
//                   className="block text-sm font-bold text-black uppercase tracking-wider border-b border-gray-100 pb-3"
//                 >
//                   {item.name}
//                 </a>
//               ))}
//             </div>

//             <div className="mt-auto space-y-4">
//               {!isAuthenticated ? (
//                 <>
//                   <Link
//                     to="/login"
//                     onClick={() => setMobileMenuOpen(false)}
//                     className="block w-full text-center bg-black text-white py-4 text-xs font-bold uppercase tracking-widest"
//                   >
//                     Sign In
//                   </Link>
//                   <Link
//                     to="/signup"
//                     onClick={() => setMobileMenuOpen(false)}
//                     className="block w-full text-center border border-black text-black py-4 text-xs font-bold uppercase tracking-widest"
//                   >
//                     Register
//                   </Link>
//                 </>
//               ) : (
//                 <button
//                   onClick={() => {
//                     handleLogout();
//                     setMobileMenuOpen(false);
//                   }}
//                   className="block w-full text-center border border-gray-200 bg-gray-50 text-red-600 py-4 text-xs font-bold uppercase tracking-widest"
//                 >
//                   Logout
//                 </button>
//               )}
//             </div>
//           </DialogPanel>
//         </div>
//       </Dialog>
//     </header>
//   );
// };

// export default Navbar;


// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom"; 
// import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";
// import {
//   Bars3Icon,
//   ShoppingCartIcon,
//   UserIcon,
//   XMarkIcon,
//   HeartIcon as HeartOutline,
// } from "@heroicons/react/24/outline";
// import logo123 from "../assets/logo.png";
// import { useWishlist } from "../context/WishlistContext";

// const Navbar = ({
//   isAuthenticated,
//   role,
//   cartItemCount,
//   handleLogout,
//   handleUserIconClick,
//   handleGatedNavigation,
// }) => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation(); 
//   const { wishlistCount } = useWishlist();

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//   setCartClicked(false);
// }, [cartItemCount]);

// useEffect(() => {
//   setWishlistClicked(false);
// }, [wishlistCount]);


//   const navigation = [
//     { name: "Home", href: "/", protected: false },
//     { name: "My Orders", href: "/myorders", protected: true },
//     { name: "Products", href: "/products", protected: false },
//   ];

//   // --- FIX STARTS HERE ---
//   // Get current path in lowercase to match safely (e.g. "/WishlistPage" becomes "/wishlistpage")
//   const currentPath = location.pathname.toLowerCase();

//   // Hide badge if the URL contains "cart"
  
  
//   // Hide badge if the URL contains "wishlist"
  

//   const shouldShowCartBadge =
//   !cartClicked && cartItemCount > 0;
//   const shouldShowWishlistBadge =
//   !wishlistClicked && wishlistCount > 0;
//   // --- FIX ENDS HERE ---

//   return (
//     <header className="relative z-50 w-full font-sans">
      
//       {/* MAIN NAVBAR */}
//       <nav
//         className={`bg-white w-full border-b border-gray-100 transition-all duration-300 ${
//           scrolled ? "shadow-sm py-3" : "py-5"
//         } sticky top-0 z-40`}
//       >
//         <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between">

//             {/* LEFT: Mobile Menu & Logo */}
//             <div className="flex items-center gap-4 lg:gap-0">
//               <button
//                 type="button"
//                 className="lg:hidden -ml-2 p-2 text-black"
//                 onClick={() => setMobileMenuOpen(true)}
//               >
//                 <Bars3Icon className="h-6 w-6" />
//               </button>

//               <Link to="/" className="flex-shrink-0">
//                 <img
//                   src={logo123}
//                   alt="Mandaram Drapes"
//                   className="h-8 lg:h-10 w-auto object-contain"
//                 />
//               </Link>
//             </div>

//             {/* CENTER: Desktop Links */}
//             <div className="hidden lg:flex items-center space-x-12">
//               {navigation.map((item) => (
//                 <a
//                   key={item.name}
//                   href={item.href}
//                   onClick={(e) =>
//                     handleGatedNavigation(e, item.href, item.protected)
//                   }
//                   className="text-[11px] font-bold text-black uppercase tracking-[0.15em] hover:text-gray-500 hover:underline underline-offset-4 transition-all duration-200"
//                 >
//                   {item.name}
//                 </a>
//               ))}
//             </div>

//             {/* RIGHT: Auth & Icons */}
//             <div className="flex items-center justify-end gap-6">
              
//               {/* Auth Links (Desktop) */}
//               <div className="hidden lg:flex items-center gap-6 text-[11px] font-bold text-black uppercase tracking-wider border-r border-gray-200 pr-6 mr-1">
//                 {!isAuthenticated ? (
//                   <>
//                     <Link to="/login" className="hover:text-gray-500 transition">
//                       Sign In
//                     </Link>
//                     <Link to="/signup" className="hover:text-gray-500 transition">
//                       Register
//                     </Link>
//                   </>
//                 ) : (
//                   <button 
//                     onClick={handleLogout}
//                     className="hover:text-red-600 transition"
//                   >
//                     Logout
//                   </button>
//                 )}
//               </div>

//               {/* Icons */}
//               <div className="flex items-center gap-5 sm:gap-6">
                
//                 {/* Wishlist */}
//                 <button
//   onClick={(e) => {
//     setWishlistClicked(true);                 
//     handleGatedNavigation(e, "/WishlistPage", true);
//   }}
//   className="group flex items-center text-black hover:text-gray-600 transition"
// >
//   <HeartOutline className="h-6 w-6 stroke-[1.5px]" />
//   {shouldShowWishlistBadge && (
//     <span className="ml-1.5 text-xs font-medium">
//       {wishlistCount}
//     </span>
//   )}
// </button>


//                 {/* Cart */}
//                 <Link 
//                   to="/cart" 
//                    onClick={() => setCartClicked(true)}
//                   className="group flex items-center text-black hover:text-gray-600 transition"
//                 >
//                   <ShoppingCartIcon className="h-6 w-6 stroke-[1.5px]" />
//                   {/* Badge logic: Hides if on Cart Page */}
//                   {shouldShowCartBadge && (
//                     <span className="ml-1.5 text-xs font-medium">
//                       {cartItemCount}
//                     </span>
//                   )}
//                 </Link>

//                 {/* User Icon */}
//                 {isAuthenticated && (
//                    <button
//                     onClick={handleUserIconClick}
//                     className="text-black hover:text-gray-600 transition"
//                   >
//                     <UserIcon className="h-6 w-6 stroke-[1.5px]" />
//                   </button>
//                 )}
//               </div>

//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* MOBILE MENU DRAWER */}
//       <Dialog
//         as="div"
//         className="relative z-50 lg:hidden"
//         open={mobileMenuOpen}
//         onClose={setMobileMenuOpen}
//       >
//         <DialogBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />

//         <div className="fixed inset-0 z-50 flex">
//           <DialogPanel className="relative mr-auto flex h-full w-[85%] max-w-xs flex-col overflow-y-auto bg-white py-6 px-6 shadow-2xl">
            
//             <div className="flex items-center justify-between mb-12">
//               <img src={logo123} alt="Logo" className="h-8 w-auto" />
//               <button
//                 type="button"
//                 className="-m-2 p-2 text-black"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 <XMarkIcon className="h-6 w-6" />
//               </button>
//             </div>

//             <div className="space-y-6">
//               {navigation.map((item) => (
//                 <a
//                   key={item.name}
//                   href={item.href}
//                   onClick={(e) => {
//                     handleGatedNavigation(e, item.href, item.protected);
//                     setMobileMenuOpen(false);
//                   }}
//                   className="block text-sm font-bold text-black uppercase tracking-wider border-b border-gray-100 pb-3"
//                 >
//                   {item.name}
//                 </a>
//               ))}
//             </div>

//             <div className="mt-auto space-y-4">
//               {!isAuthenticated ? (
//                 <>
//                   <Link
//                     to="/login"
//                     onClick={() => setMobileMenuOpen(false)}
//                     className="block w-full text-center bg-black text-white py-4 text-xs font-bold uppercase tracking-widest"
//                   >
//                     Sign In
//                   </Link>
//                   <Link
//                     to="/signup"
//                     onClick={() => setMobileMenuOpen(false)}
//                     className="block w-full text-center border border-black text-black py-4 text-xs font-bold uppercase tracking-widest"
//                   >
//                     Register
//                   </Link>
//                 </>
//               ) : (
//                 <button
//                   onClick={() => {
//                     handleLogout();
//                     setMobileMenuOpen(false);
//                   }}
//                   className="block w-full text-center border border-gray-200 bg-gray-50 text-red-600 py-4 text-xs font-bold uppercase tracking-widest"
//                 >
//                   Logout
//                 </button>
//               )}
//             </div>
//           </DialogPanel>
//         </div>
//       </Dialog>
//     </header>
//   );
// };

// export default Navbar;


// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation, useMatch } from "react-router-dom"; 
// import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";
// import {
//   Bars3Icon,
//   ShoppingCartIcon,
//   UserIcon,
//   XMarkIcon,
//   HeartIcon as HeartOutline,
// } from "@heroicons/react/24/outline";
// import logo123 from "../assets/logo.png";
// import { useWishlist } from "../context/WishlistContext";

// const Navbar = ({
//   isAuthenticated,
//   role,
//   cartItemCount,
//   handleLogout,
//   handleUserIconClick,
//   handleGatedNavigation,
// }) => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation(); 
//   const { wishlistCount } = useWishlist();

//   // --- 1. ROBUST MATCHING LOGIC ---
//   // We use simple "includes" on the lowercased path to be safe against /Cart vs /cart
//   const currentPath = location.pathname.toLowerCase();
//   const isCartPage = currentPath.includes("cart");
//   const isWishlistPage = currentPath.includes("wishlist");

//   // --- 2. DEBUG LOGGING (Check your Browser Console F12) ---
//   useEffect(() => {
//     console.log("NAVBAR DEBUG:", {
//         path: currentPath,
//         isCartPage,
//         isWishlistPage,
//         cartItemCount
//     });
//   }, [currentPath, cartItemCount]);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const navigation = [
//     { name: "Home", href: "/", protected: false },
//     { name: "My Orders", href: "/myorders", protected: true },
//     { name: "Products", href: "/products", protected: false },
//   ];

//   return (
//     <header className="relative z-50 w-full font-sans">
      
//       {/* --- DEBUG STRIP (Remove this after fixing) --- */}
//       {/* This will show you EXACTLY what the app sees. If this says '/cart' and badge is there, the issue is caching. */}
//       <div className="bg-red-600 text-white text-[10px] font-mono p-1 text-center">
//         DEBUG: Current URL = "{currentPath}" | Cart Mode: {isCartPage ? "ON" : "OFF"}
//       </div>

//       {/* MAIN NAVBAR */}
//       <nav
//         className={`bg-white w-full border-b border-gray-100 transition-all duration-300 ${
//           scrolled ? "shadow-sm py-3" : "py-5"
//         } sticky top-0 z-40`}
//       >
//         <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between">

//             {/* LEFT: Mobile Menu & Logo */}
//             <div className="flex items-center gap-4 lg:gap-0">
//               <button
//                 type="button"
//                 className="lg:hidden -ml-2 p-2 text-black"
//                 onClick={() => setMobileMenuOpen(true)}
//               >
//                 <Bars3Icon className="h-6 w-6" />
//               </button>

//               <Link to="/" className="flex-shrink-0">
//                 <img
//                   src={logo123}
//                   alt="Mandaram Drapes"
//                   className="h-8 lg:h-10 w-auto object-contain"
//                 />
//               </Link>
//             </div>

//             {/* CENTER: Desktop Links */}
//             <div className="hidden lg:flex items-center space-x-12">
//               {navigation.map((item) => (
//                 <a
//                   key={item.name}
//                   href={item.href}
//                   onClick={(e) =>
//                     handleGatedNavigation(e, item.href, item.protected)
//                   }
//                   className="text-[11px] font-bold text-black uppercase tracking-[0.15em] hover:text-gray-500 hover:underline underline-offset-4 transition-all duration-200"
//                 >
//                   {item.name}
//                 </a>
//               ))}
//             </div>

//             {/* RIGHT: Auth & Icons */}
//             <div className="flex items-center justify-end gap-6">
              
//               {/* Auth Links (Desktop) */}
//               <div className="hidden lg:flex items-center gap-6 text-[11px] font-bold text-black uppercase tracking-wider border-r border-gray-200 pr-6 mr-1">
//                 {!isAuthenticated ? (
//                   <>
//                     <Link to="/login" className="hover:text-gray-500 transition">
//                       Sign In
//                     </Link>
//                     <Link to="/signup" className="hover:text-gray-500 transition">
//                       Register
//                     </Link>
//                   </>
//                 ) : (
//                   <button 
//                     onClick={handleLogout}
//                     className="hover:text-red-600 transition"
//                   >
//                     Logout
//                   </button>
//                 )}
//               </div>

//               {/* Icons */}
//               <div className="flex items-center gap-5 sm:gap-6">
                
//                 {/* Wishlist Icon */}
//                 <button
//                   onClick={(e) => handleGatedNavigation(e, "/WishlistPage", true)}
//                   className="group flex items-center text-black hover:text-gray-600 transition"
//                 >
//                   <HeartOutline className="h-6 w-6 stroke-[1.5px]" />
                  
//                   {/* LOGIC: Show Badge if Count > 0 AND NOT on Wishlist Page */}
//                   {(!isWishlistPage && wishlistCount > 0) && (
//                     <span className="ml-1.5 text-xs font-medium">
//                       {wishlistCount}
//                     </span>
//                   )}
//                 </button>

//                 {/* Cart Icon */}
//                 <Link 
//                   to="/cart" 
//                   className="group flex items-center text-black hover:text-gray-600 transition"
//                 >
//                   <ShoppingCartIcon className="h-6 w-6 stroke-[1.5px]" />
                  
//                   {/* LOGIC: Show Badge if Count > 0 AND NOT on Cart Page */}
//                   {(!isCartPage && cartItemCount > 0) && (
//                     <span className="ml-1.5 text-xs font-medium">
//                       {cartItemCount}
//                     </span>
//                   )}
//                 </Link>

//                 {/* User Icon */}
//                 {isAuthenticated && (
//                    <button
//                     onClick={handleUserIconClick}
//                     className="text-black hover:text-gray-600 transition"
//                   >
//                     <UserIcon className="h-6 w-6 stroke-[1.5px]" />
//                   </button>
//                 )}
//               </div>

//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* MOBILE MENU DRAWER */}
//       <Dialog
//         as="div"
//         className="relative z-50 lg:hidden"
//         open={mobileMenuOpen}
//         onClose={setMobileMenuOpen}
//       >
//         <DialogBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />

//         <div className="fixed inset-0 z-50 flex">
//           <DialogPanel className="relative mr-auto flex h-full w-[85%] max-w-xs flex-col overflow-y-auto bg-white py-6 px-6 shadow-2xl">
            
//             <div className="flex items-center justify-between mb-12">
//               <img src={logo123} alt="Logo" className="h-8 w-auto" />
//               <button
//                 type="button"
//                 className="-m-2 p-2 text-black"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 <XMarkIcon className="h-6 w-6" />
//               </button>
//             </div>

//             <div className="space-y-6">
//               {navigation.map((item) => (
//                 <a
//                   key={item.name}
//                   href={item.href}
//                   onClick={(e) => {
//                     handleGatedNavigation(e, item.href, item.protected);
//                     setMobileMenuOpen(false);
//                   }}
//                   className="block text-sm font-bold text-black uppercase tracking-wider border-b border-gray-100 pb-3"
//                 >
//                   {item.name}
//                 </a>
//               ))}
//             </div>

//             <div className="mt-auto space-y-4">
//               {!isAuthenticated ? (
//                 <>
//                   <Link
//                     to="/login"
//                     onClick={() => setMobileMenuOpen(false)}
//                     className="block w-full text-center bg-black text-white py-4 text-xs font-bold uppercase tracking-widest"
//                   >
//                     Sign In
//                   </Link>
//                   <Link
//                     to="/signup"
//                     onClick={() => setMobileMenuOpen(false)}
//                     className="block w-full text-center border border-black text-black py-4 text-xs font-bold uppercase tracking-widest"
//                   >
//                     Register
//                   </Link>
//                 </>
//               ) : (
//                 <button
//                   onClick={() => {
//                     handleLogout();
//                     setMobileMenuOpen(false);
//                   }}
//                   className="block w-full text-center border border-gray-200 bg-gray-50 text-red-600 py-4 text-xs font-bold uppercase tracking-widest"
//                 >
//                   Logout
//                 </button>
//               )}
//             </div>
//           </DialogPanel>
//         </div>
//       </Dialog>
//     </header>
//   );
// };

// export default Navbar;





import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; 
import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  UserIcon,
  XMarkIcon,
  HeartIcon as HeartOutline, // FIXED: Aliased correctly
} from "@heroicons/react/24/outline";
import logo123 from "../assets/logo.png";
import { useWishlist } from "../context/WishlistContext";

const Navbar = ({
  isAuthenticated,
  role,
  cartItemCount = 0, // Default value to prevent errors
  handleLogout,
  handleUserIconClick,
  handleGatedNavigation,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); 
  const { wishlistCount } = useWishlist();

  // --- 1. ACKNOWLEDGED COUNT STATE (Persisted) ---
  // This remembers what the count was the last time the user visited the page
  const [ackCartCount, setAckCartCount] = useState(() => {
    return parseInt(localStorage.getItem("ack_cart_count") || "0", 10);
  });
  
  const [ackWishlistCount, setAckWishlistCount] = useState(() => {
    return parseInt(localStorage.getItem("ack_wishlist_count") || "0", 10);
  });

  // --- 2. MATCHING LOGIC ---
  const currentPath = location.pathname.toLowerCase();
  const isCartPage = currentPath.includes("cart");
  const isWishlistPage = currentPath.includes("wishlist");

  // --- 3. SYNC LOGIC (The Fix) ---
  // When we visit the cart page, we "acknowledge" the current count
  useEffect(() => {
    if (isCartPage) {
      setAckCartCount(cartItemCount);
      localStorage.setItem("ack_cart_count", cartItemCount);
    }
  }, [isCartPage, cartItemCount]);

  useEffect(() => {
    if (isWishlistPage) {
      setAckWishlistCount(wishlistCount);
      localStorage.setItem("ack_wishlist_count", wishlistCount);
    }
  }, [isWishlistPage, wishlistCount]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- 4. BADGE VISIBILITY LOGIC ---
  // Only show badge if the actual count is HIGHER than what we last acknowledged
  const showCartBadge = cartItemCount > ackCartCount;
  const showWishlistBadge = wishlistCount > ackWishlistCount;

  // Helper to force immediate update on click (UX improvement)
  const handleCartClick = () => {
    setAckCartCount(cartItemCount);
    localStorage.setItem("ack_cart_count", cartItemCount);
  };

  const handleWishlistClick = (e) => {
    handleGatedNavigation(e, "/WishlistPage", true);
    setAckWishlistCount(wishlistCount);
    localStorage.setItem("ack_wishlist_count", wishlistCount);
  };

  const navigation = [
    { name: "Home", href: "/", protected: false },
    { name: "My Orders", href: "/myorders", protected: true },
    { name: "Products", href: "/products", protected: false },
    { name: "profile", href: "/profile", protected: true },
  ];

  return (
    // <header className="relative z-50 w-full font-sans">

    // Change your header to this:
<header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm font-sans">
  {/* Rest of your nav code */}

      
      {/* MAIN NAVBAR */}
      <nav
        className={`bg-white w-full transition-all duration-300 ${
          scrolled ? "shadow-sm py-3" : "py-5"
        } sticky top-0 z-40`}
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* LEFT: Mobile Menu & Logo */}
            <div className="flex items-center gap-4 lg:gap-0">
              <button
                type="button"
                className="lg:hidden -ml-2 p-2 text-black"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Bars3Icon className="h-6 w-6" />
              </button>

              <Link to="/" className="flex-shrink-0">
                <img
                  src={logo123}
                  alt="Mandaram Drapes"
                  className="h-7 lg:h-9 w-auto object-contain"
                />
              </Link>
            </div>

            {/* CENTER: Desktop Links */}
            <div className="hidden lg:flex items-center space-x-12">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) =>
                    handleGatedNavigation(e, item.href, item.protected)
                  }
                  className="text-[11px] font-bold text-black uppercase tracking-[0.15em] hover:text-gray-500 hover:underline underline-offset-4 transition-all duration-200"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* RIGHT: Auth & Icons */}
            <div className="flex items-center justify-end gap-6">
              
              {/* Auth Links (Desktop) */}
              <div className="hidden lg:flex items-center gap-6 text-[11px] font-bold text-black uppercase tracking-wider border-r border-gray-200 pr-6 mr-1">
                {!isAuthenticated ? (
                  <>
                    <Link to="/login" className="hover:text-gray-500 transition">
                      Sign In
                    </Link>
                    <Link to="/signup" className="hover:text-gray-500 transition">
                      Register
                    </Link>
                  </>
                ) : (
                  <button 
                    onClick={handleLogout}
                    className="hover:text-red-600 transition"
                  >
                    Logout
                  </button>
                )}
              </div>

              {/* Icons */}
              <div className="flex items-center gap-5 sm:gap-6">
                
                {/* Wishlist Icon */}
                <button
                  onClick={handleWishlistClick}
                  className="group flex items-center text-black hover:text-gray-600 transition"
                >
                  <HeartOutline className="h-5 w-5 stroke-[1.5px]" />
                  
                  {showWishlistBadge && (
                    <span className="ml-1.5 text-xs font-medium">
                      {wishlistCount}
                    </span>
                  )}
                </button>

                {/* Cart Icon */}
                <Link 
                  to="/cart" 
                  onClick={handleCartClick}
                  className="group flex items-center text-black hover:text-gray-600 transition"
                >
                  <ShoppingCartIcon className="h-5 w-5 stroke-[1.5px]" />
                  
                  {showCartBadge && (
                    <span className="ml-1.5 text-xs font-medium">
                      {cartItemCount}
                    </span>
                  )}
                </Link>

                {/* User Icon */}
                {isAuthenticated && (
                   <button
                    onClick={handleUserIconClick}
                    className="text-black hover:text-gray-600 transition hidden sm:block"
                  >
                    <UserIcon className="h-4 w-4 stroke-[1.5px]" />
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU DRAWER */}
      <Dialog
        as="div"
        className="relative z-50 lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <DialogBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />

        <div className="fixed inset-0 z-50 flex">
          <DialogPanel className="relative mr-auto flex h-full w-[85%] max-w-xs flex-col overflow-y-auto bg-white py-6 px-6 shadow-2xl">
            
            <div className="flex items-center justify-between mb-12">
              <img src={logo123} alt="Logo" className="h-3 w-3" />
              <button
                type="button"
                className="-m-2 p-2 text-black"
                onClick={() => setMobileMenuOpen(false)}
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    handleGatedNavigation(e, item.href, item.protected);
                    setMobileMenuOpen(false);
                  }}
                  className="block text-sm font-bold text-black uppercase tracking-wider border-b border-gray-100 pb-3"
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className="mt-auto space-y-4">
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center bg-black text-white py-4 text-xs font-bold uppercase tracking-widest"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center border border-black text-black py-4 text-xs font-bold uppercase tracking-widest"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-center border border-gray-200 bg-gray-50 text-red-600 py-4 text-xs font-bold uppercase tracking-widest"
                >
                  Logout
                </button>
              )}
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </header>
  );
};

export default Navbar;