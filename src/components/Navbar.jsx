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
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { Dialog, DialogPanel, DialogBackdrop, DialogTitle } from "@headlessui/react";
// import {
//   Bars3Icon,
//   ShoppingCartIcon,
//   UserIcon,
//   XMarkIcon,
//   HeartIcon as HeartOutline,
//   BellIcon,
//   ShoppingBagIcon,
//   ChevronDownIcon,
// } from "@heroicons/react/24/outline";
// import logo123 from "../assets/logo.png";
// import { useWishlist } from "../context/WishlistContext";
// import { useAuth } from "../context/AuthContext";
// import { Bell } from "lucide-react";
// import { useUserNotifications } from "../context/UserNotificationContext";

// const Navbar = ({ user, role, cartItemCount = 0, handleLogout }) => {

//   const navigate = useNavigate();
//   const location = useLocation();
//   const { logout } = useAuth();
//   const { wishlistCount } = useWishlist();

//   const { notifications, unreadCount, markAsRead } = useUserNotifications();


//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
//   const [notificationOpen, setNotificationOpen] = useState(false);



  

//   // --- 1. ACKNOWLEDGED COUNT STATE (Persisted) ---
//   const [ackCartCount, setAckCartCount] = useState(() => {
//     return parseInt(localStorage.getItem("ack_cart_count") || "0", 10);
//   });

//   const [ackWishlistCount, setAckWishlistCount] = useState(() => {
//     return parseInt(localStorage.getItem("ack_wishlist_count") || "0", 10);
//   });

 

//   // --- 2. MATCHING LOGIC ---
//   const currentPath = location.pathname.toLowerCase();
//   const isCartPage = currentPath.includes("cart");
//   const isWishlistPage = currentPath.includes("wishlist");

//   // --- 3. SYNC LOGIC ---
//   useEffect(() => {
//     if (isCartPage) {
//       setAckCartCount(cartItemCount);
//       localStorage.setItem("ack_cart_count", cartItemCount);
//     }
//   }, [isCartPage, cartItemCount]);

//   // useEffect(() => {
//   //   if (isWishlistPage) {
//   //     setAckWishlistCount(wishlistCount);
//   //     localStorage.setItem("ack_wishlist_count", wishlistCount);
//   //   }
//   // }, [isWishlistPage, wishlistCount]);


//   useEffect(() => {
//   if (!isWishlistPage) return;

//   setAckWishlistCount((prev) => {
//     const next = Math.max(prev, wishlistCount);
//     localStorage.setItem("ack_wishlist_count", next);
//     return next;
//   });
// }, [isWishlistPage, wishlistCount]);


//   // Scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     if (notificationOpen) {
//       notifications.forEach(n => {
//         if (!n.isRead) markAsRead(n._id);
//       });
//     }
//   }, [notificationOpen]);


//   if (user.isInitialLoad) {
//     return null;
//   }

  

//   const isAuthenticated = user.isAuthenticated;

//   // --- 4. BADGE VISIBILITY LOGIC ---
//   const showCartBadge = cartItemCount > ackCartCount;
//   const showWishlistBadge = wishlistCount > ackWishlistCount;
//   // const showWishlistBadge = wishlistCount > 0;

//   const handleCartClick = () => {
//     setAckCartCount(cartItemCount);
//     localStorage.setItem("ack_cart_count", cartItemCount);
//   };

//   const handleWishlistClick = (e) => {
//     handleGatedNavigation(e, "/WishlistPage", true);
//     // setAckWishlistCount(wishlistCount);
//     // localStorage.setItem("ack_wishlist_count", wishlistCount);
//     setAckWishlistCount((prev) => {
//   const next = Math.max(prev, wishlistCount);
//   localStorage.setItem("ack_wishlist_count", next);
//   return next;
// });
//   };

//   const handleUserIconClick = () => {
//     if (!isAuthenticated) {
//       navigate("/login");
//     } else {
//       setIsUserDropdownOpen(!isUserDropdownOpen);
//     }
//   };

//   const handleGatedNavigation = (e, path, isProtected) => {
//     e.preventDefault();
//     if (isProtected && !isAuthenticated) {
//       navigate("/login");
//     } else {
//       navigate(path);
//     }
//   };

//   const navigation = [
//     { name: "Home", href: "/", protected: false },
//     { name: "Products", href: "/products", protected: false },
//     { name: "My Orders", href: "/myorders", protected: true },
//   ];

//   // const userNotifCtx = useUserNotifications();
//   // if (!userNotifCtx) {
//   //   return null;
//   // }

  
//   // const { notifications, unreadCount, markAsRead } = userNotifCtx;

//   // Check active navigation
//   const isActive = (path) => {
//     if (path === "/") return location.pathname === "/";
//     return location.pathname.startsWith(path);
//   };

//   return (
//     // <header className="fixed top-0 left-0 w-full z-50 font-sans">
//     <header className="fixed top-0 left-0 w-full z-60 font-sans">
//       {/* Main Navigation Bar */}
//       <nav
//         className={`relative w-full transition-all duration-300 ${
//           scrolled 
//             ? "bg-white/95 backdrop-blur-md shadow-lg py-3" 
//             : "bg-white py-4"
//         }`}
//       >
//         <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between">
//             {/* LEFT: Mobile Menu & Logo */}
//             <div className="flex items-center gap-6">
//               <button
//                 type="button"
//                 className="lg:hidden p-2.5 rounded-lg hover:bg-gray-100 transition-colors"
//                 onClick={() => setMobileMenuOpen(true)}
//               >
//                 <Bars3Icon className="h-6 w-6 text-gray-700" />
//               </button>

//               <Link to="/" className="flex-shrink-0">
//                 <div className="flex items-center gap-3">
//                   <img
//                     src={logo123}
//                     alt="Mandaram Drapes"
//                     className="h-8 lg:h-10 w-auto object-contain transition-all duration-300"
//                   />
//                   <div className="hidden lg:block">
//                     <div className="text-xs font-semibold text-gray-500 tracking-wider">Mandharam Drapes</div>
//                   </div>
//                 </div>
//               </Link>
//             </div>

//             {/* CENTER: Desktop Navigation */}
//             <div className="hidden lg:flex items-center space-x-1">
//               {navigation.map((item) => (
//                 <Link
//                   key={item.name}
//                   to={item.href}
//                   onClick={(e) => item.protected && !isAuthenticated ? handleGatedNavigation(e, item.href, true) : null}
//                   className={`relative px-5 py-2.5 text-sm font-medium transition-all duration-300 group ${
//                     isActive(item.href)
//                       ? "text-gray-900"
//                       : "text-gray-600 hover:text-gray-900"
//                   }`}
//                 >
//                   {item.name}
//                   {/* Active Indicator */}
//                   {isActive(item.href) && (
//                     <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-0.5 bg-gradient-to-r from-gray-900 to-gray-700 rounded-full"></div>
//                   )}
//                   {/* Hover Effect */}
//                   <div className="absolute inset-0 bg-gray-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
//                 </Link>
//               ))}
//             </div>

//             {/* RIGHT: Icons & Auth */}
//             <div className="flex items-center gap-4">
//               {/* Desktop Auth Links */}
//               <div className="hidden lg:flex items-center gap-4 mr-4">
//                 {!isAuthenticated ? (
//                   <>
//                     <Link
//                       to="/login"
//                       className="text-sm font-medium text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
//                     >
//                       Sign In
//                     </Link>
//                     <Link
//                       to="/signup"
//                       className="text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 px-5 py-2.5 rounded-lg transition-colors shadow-sm hover:shadow"
//                     >
//                       Register
//                     </Link>
//                   </>
//                 ) : (
//                   <div className="relative">
//                     <button
//                       onClick={handleUserIconClick}
//                       className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group"
//                     >
//                       <div className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center cursor-pointer">
//                         <UserIcon className="h-4 w-4" />
//                       </div>
//                       <ChevronDownIcon className={`h-4 w-4 transition-transform duration-300 cursor-pointer ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
//                     </button>
                    
//                     {/* User Dropdown */}
//                     {isUserDropdownOpen && (
//                       <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
//                         <Link
//                           to="/profile"
//                           onClick={() => setIsUserDropdownOpen(false)}
//                           className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
//                         >
//                           <UserIcon className="h-4 w-4" />
//                           My Profile
//                         </Link>
//                         <div className="border-t border-gray-100 my-1"></div>
//                         <button
//                           onClick={() => {
//                             logout();
//                             setIsUserDropdownOpen(false);
//                           }}
//                           className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors rounded-lg mx-1"
//                         >
//                           <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                           </svg>
//                           Logout
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* Action Icons */}
//               <div className="flex items-center gap-3">
//                 {/* Wishlist Icon */}
//                 <button
//                   onClick={handleWishlistClick}
//                   className="relative p-2.5 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer"
//                 >
//                   <HeartOutline className="h-5 w-5 text-gray-700 group-hover:text-red-500 transition-colors " />
//                   {showWishlistBadge && (
//                     <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-[10px] text-white font-semibold rounded-full flex items-center justify-center px-1">
//                       {wishlistCount}
//                     </span>
//                   )}
//                 </button>

//                 {/* Cart Icon */}
//                 <Link
//                   to="/cart"
//                   onClick={handleCartClick}
//                   className="relative p-2.5 rounded-lg hover:bg-gray-50 transition-colors group"
//                 >
//                   <ShoppingBagIcon className="h-5 w-5 text-gray-700 group-hover:text-gray-900 transition-colors" />
//                   {showCartBadge && (
//                     <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-gray-900 text-[10px] text-white font-semibold rounded-full flex items-center justify-center px-1">
//                       {cartItemCount}
//                     </span>
//                   )}
//                 </Link>

//                 {/* Notification Icon */}
//                 <div className="relative">
//                   <button
//                     onClick={() => setNotificationOpen(true)}
//                     className="relative p-2.5 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer"
//                   >
//                     <Bell className="h-5 w-5 text-gray-700 group-hover:text-gray-900 transition-colors " />
//                     {unreadCount > 0 && (
//                       <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-blue-500 text-[10px] text-white font-semibold rounded-full flex items-center justify-center px-1">
//                         {unreadCount}
//                       </span>
//                     )}
//                   </button>
//                 </div>

//                 {/* User Icon for Mobile */}
//                 {/* {isAuthenticated && (
//                   <button
//                     onClick={handleUserIconClick}
//                     className="lg:hidden p-2.5 rounded-lg hover:bg-gray-50 transition-colors"
//                   >
//                     <UserIcon className="h-5 w-5 text-gray-700" />
//                   </button>
//                 )} */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* ------------------------------------------------ */}
//       {/* ENHANCED NOTIFICATION SIDEBAR */}
//       {/* ------------------------------------------------ */}
//       <Dialog
//         open={notificationOpen}
//         onClose={setNotificationOpen}
//         className="relative z-70"
//       >
//         <DialogBackdrop
//           transition
//           className="fixed inset-0 bg-black/20 backdrop-blur-sm transition-all duration-300 ease-out data-[closed]:opacity-0"
//         />

//         <div className="fixed inset-0 overflow-hidden">
//           <div className="absolute inset-0 overflow-hidden">
//             <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
//               <DialogPanel
//                 transition
//                 className="pointer-events-auto w-screen max-w-md transform transition-all duration-300 ease-out data-[closed]:translate-x-full bg-white shadow-2xl h-full flex flex-col"
//               >
//                 {/* Header */}
//                 <div className="flex-shrink-0 px-6 py-5 bg-gradient-to-b from-white to-gray-50 border-b border-gray-100">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <div className="p-2 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl ">
//                         <BellIcon className="h-5 w-5 text-blue-600 " />
//                       </div>
//                       <div>
//                         <DialogTitle className="text-xl font-bold text-gray-900">
//                           Notifications
//                         </DialogTitle>
//                         <p className="text-sm text-gray-500 mt-0.5">
//                           {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
//                         </p>
//                       </div>
//                     </div>
//                     <button
//                       onClick={() => setNotificationOpen(false)}
//                       className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                     >
//                       <XMarkIcon className="h-5 w-5 text-gray-500" />
//                     </button>
//                   </div>
//                 </div>

//                 {/* Notifications List */}


//                 {/* <div className="flex-1 overflow-y-auto">
//                   {notifications.length === 0 ? (
//                     <div className="flex flex-col items-center justify-center h-full p-6 text-center">
//                       <div className="p-4 bg-gray-50 rounded-full mb-4">
//                         <BellIcon className="h-8 w-8 text-gray-400" />
//                       </div>
//                       <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                         No notifications yet
//                       </h3>
//                       <p className="text-sm text-gray-500">
//                         We'll notify you when something arrives
//                       </p>
//                     </div>
//                   ) : (
//                     <div className="divide-y divide-gray-100">
//                       {notifications.map((n) => (
//                         <div
//                           key={n._id}
//                           onClick={() => markAsRead(n._id)}
//                           className={`p-4 transition-all duration-200 cursor-pointer ${
//                             n.isRead 
//                               ? 'bg-white hover:bg-gray-50' 
//                               : 'bg-blue-50/50 hover:bg-blue-100/50'
//                           }`}
//                         >
//                           <div className="flex gap-3">
//                             <div className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${
//                               n.isRead ? 'bg-gray-300' : 'bg-blue-500'
//                             }`}></div>
//                             <div className="flex-1">
//                               <p className="text-sm text-gray-900 font-medium leading-relaxed">
//                                 {n.message}
//                               </p>
//                               <p className="text-xs text-gray-500 mt-2">
//                                 {new Date(n.createdAt).toLocaleString('en-US', {
//                                   month: 'short',
//                                   day: 'numeric',
//                                   hour: '2-digit',
//                                   minute: '2-digit'
//                                 })}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div> */}

//                 <div className="flex-1 overflow-y-auto bg-gray-50 p-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
//   {notifications.length === 0 ? (
//     /* EMPTY STATE */
//     <div className="flex flex-col items-center justify-center h-full text-center animate-fadeIn">
//       <div className="p-5 bg-white rounded-full mb-4 shadow-sm ring-1 ring-gray-100">
//         <BellIcon className="h-8 w-8 text-gray-300" />
//       </div>
//       <h3 className="text-lg font-semibold text-gray-800 mb-1">
//         All caught up
//       </h3>
//       <p className="text-gray-500 text-sm max-w-[200px] mx-auto">
//         No new notifications. We'll notify you when updates arrive.
//       </p>
//     </div>
//   ) : (
//     /* LIST STATE - Updated to Card Style */
//     <div className="space-y-3">
//       {notifications.map((n) => (
//         <div
//           key={n._id}
//           onClick={() => markAsRead(n._id)}
//           className={`relative p-4 rounded-r-xl rounded-l-md shadow-sm bg-white transition-all duration-200 cursor-pointer border-l-[6px] hover:shadow-md
//             ${n.isRead 
//               ? 'border-gray-200 opacity-75' 
//               : 'border-pink-500 opacity-100'
//             }`}
//         >
//           <div className="flex justify-between items-start gap-3">
//             <div className="flex-1">
//               {/* Message */}
//               <p className={`text-[15px] leading-snug mb-2 ${
//                   n.isRead ? 'text-gray-600 font-normal' : 'text-gray-900 font-semibold'
//                 }`}
//               >
//                 {n.message}
//               </p>

//               {/* Status/Details Placeholder (Optional - helps visual balance) */}
//               {/* {!n.isRead && (
//                 <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-pink-50 text-pink-600 mb-1">
//                   NEW
//                 </span>
//               )} */}
//             </div>
//           </div>

//           {/* Timestamp - Aligned to bottom right like the reference image */}
//           <div className="mt-2 text-right">
//             <p className="text-xs text-gray-400 font-medium">
//               {new Date(n.createdAt).toLocaleString('en-US', {
//                 month: 'short',
//                 day: 'numeric',
//                 hour: '2-digit',
//                 minute: '2-digit'
//               })}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   )}
// </div>


                
//               </DialogPanel>
//             </div>
//           </div>
//         </div>
//       </Dialog>

//       {/* ------------------------------------------------ */}
//       {/* ENHANCED MOBILE MENU */}
//       {/* ------------------------------------------------ */}
//       <Dialog
//         open={mobileMenuOpen}
//         onClose={setMobileMenuOpen}
//         className="relative z-50 lg:hidden"
//       >
//         <DialogBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300" />

//         <div className="fixed inset-0 z-50 flex">
//           <DialogPanel className="relative mr-auto flex h-full w-[320px] flex-col overflow-y-auto bg-white shadow-2xl transition-transform duration-300">
//             {/* Header */}
//             <div className="px-6 py-5 border-b border-gray-100">
//               <div className="flex items-center justify-between">
//                 <Link to="/" onClick={() => setMobileMenuOpen(false)}>
//                   <img src={logo123} alt="Logo" className="h-8 w-auto" />
//                 </Link>
//                 <button
//                   onClick={() => setMobileMenuOpen(false)}
//                   className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                 >
//                   <XMarkIcon className="h-6 w-6 text-gray-700" />
//                 </button>
//               </div>
//             </div>

//             {/* Navigation Links */}
//             <div className="flex-1 px-4 py-6">
//               <div className="space-y-1">
//                 {navigation.map((item) => (
//                   <Link
//                     key={item.name}
//                     to={item.href}
//                     onClick={(e) => {
//                       if (item.protected && !isAuthenticated) {
//                         handleGatedNavigation(e, item.href, true);
//                       }
//                       setMobileMenuOpen(false);
//                     }}
//                     className={`flex items-center gap-3 px-4 py-3.5 rounded-lg transition-colors ${
//                       isActive(item.href)
//                         ? 'bg-gray-900 text-white'
//                         : 'text-gray-700 hover:bg-gray-50'
//                     }`}
//                   >
//                     <div className={`w-1.5 h-1.5 rounded-full ${
//                       isActive(item.href) ? 'bg-white' : 'bg-transparent'
//                     }`}></div>
//                     {item.name}
//                   </Link>
//                 ))}
//               </div>
//             </div>

//             {/* Auth Section */}
//             <div className="px-6 py-6 border-t border-gray-100">
//               {!isAuthenticated ? (
//                 <div className="space-y-3">
//                   <Link
//                     to="/login"
//                     onClick={() => setMobileMenuOpen(false)}
//                     className="block w-full text-center bg-gray-900 text-white py-3.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
//                   >
//                     Sign In
//                   </Link>
//                   <Link
//                     to="/signup"
//                     onClick={() => setMobileMenuOpen(false)}
//                     className="block w-full text-center border-2 border-gray-900 text-gray-900 py-3.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
//                   >
//                     Create Account
//                   </Link>
//                 </div>
//               ) : (
//                 <div className="space-y-3">
//                   <Link
//                     to="/profile"
//                     onClick={() => setMobileMenuOpen(false)}
//                     className="flex items-center justify-center gap-2 w-full text-center bg-gray-50 text-gray-700 py-3.5 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
//                   >
//                     <UserIcon className="h-4 w-4" />
//                     My Profile
//                   </Link>
//                   <button
//                     onClick={() => {
//                       logout();
//                       setMobileMenuOpen(false);
//                     }}
//                     className="flex items-center justify-center gap-2 w-full text-center border border-gray-200 text-red-600 py-3.5 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
//                   >
//                     <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                     </svg>
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

//working with new uiiiiiiiiiiiiiiiiiiiiiiiiiii 


// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { Dialog, DialogPanel, DialogBackdrop, DialogTitle } from "@headlessui/react";
// import {
//   Bars3Icon,
//   ShoppingCartIcon,
//   UserIcon,
//   XMarkIcon,
//   HeartIcon as HeartOutline,
//   BellIcon,
//   ShoppingBagIcon,
//   ChevronDownIcon,
// } from "@heroicons/react/24/outline";
// import logo123 from "../assets/logo.png";
// import { useWishlist } from "../context/WishlistContext";
// import { useAuth } from "../context/AuthContext";
// import { Bell } from "lucide-react";
// import { useUserNotifications } from "../context/UserNotificationContext";

// const Navbar = ({ user, role, cartItemCount = 0, handleLogout }) => {

//   const navigate = useNavigate();
//   const location = useLocation();
//   const { logout } = useAuth();
//   const { wishlistCount } = useWishlist();

//   const { notifications, unreadCount, markAsRead } = useUserNotifications();


//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
//   const [notificationOpen, setNotificationOpen] = useState(false);



  

//   // --- 1. ACKNOWLEDGED COUNT STATE (Persisted) ---
//   const [ackCartCount, setAckCartCount] = useState(() => {
//     return parseInt(localStorage.getItem("ack_cart_count") || "0", 10);
//   });

//   const [ackWishlistCount, setAckWishlistCount] = useState(() => {
//     return parseInt(localStorage.getItem("ack_wishlist_count") || "0", 10);
//   });

 

//   // --- 2. MATCHING LOGIC ---
//   const currentPath = location.pathname.toLowerCase();
//   const isCartPage = currentPath.includes("cart");
//   const isWishlistPage = currentPath.includes("wishlist");

//   // --- 3. SYNC LOGIC ---
//   useEffect(() => {
//     if (isCartPage) {
//       setAckCartCount(cartItemCount);
//       localStorage.setItem("ack_cart_count", cartItemCount);
//     }
//   }, [isCartPage, cartItemCount]);

//   // useEffect(() => {
//   //   if (isWishlistPage) {
//   //     setAckWishlistCount(wishlistCount);
//   //     localStorage.setItem("ack_wishlist_count", wishlistCount);
//   //   }
//   // }, [isWishlistPage, wishlistCount]);


//   useEffect(() => {
//   if (!isWishlistPage) return;

//   setAckWishlistCount((prev) => {
//     const next = Math.max(prev, wishlistCount);
//     localStorage.setItem("ack_wishlist_count", next);
//     return next;
//   });
// }, [isWishlistPage, wishlistCount]);


//   // Scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     if (notificationOpen) {
//       notifications.forEach(n => {
//         if (!n.isRead) markAsRead(n._id);
//       });
//     }
//   }, [notificationOpen]);


//   if (user.isInitialLoad) {
//     return null;
//   }

  

//   const isAuthenticated = user.isAuthenticated;

//   // --- 4. BADGE VISIBILITY LOGIC ---
//   const showCartBadge = cartItemCount > ackCartCount;
//   // const showWishlistBadge = wishlistCount > ackWishlistCount;
//   const showWishlistBadge = wishlistCount > 0;

//   const handleCartClick = () => {
//     setAckCartCount(cartItemCount);
//     localStorage.setItem("ack_cart_count", cartItemCount);
//   };

//   const handleWishlistClick = (e) => {
//     handleGatedNavigation(e, "/WishlistPage", true);
//     // setAckWishlistCount(wishlistCount);
//     // localStorage.setItem("ack_wishlist_count", wishlistCount);
//     setAckWishlistCount((prev) => {
//   const next = Math.max(prev, wishlistCount);
//   localStorage.setItem("ack_wishlist_count", next);
//   return next;
// });
//   };

//   const handleUserIconClick = () => {
//     if (!isAuthenticated) {
//       navigate("/login");
//     } else {
//       setIsUserDropdownOpen(!isUserDropdownOpen);
//     }
//   };

//   const handleGatedNavigation = (e, path, isProtected) => {
//     e.preventDefault();
//     if (isProtected && !isAuthenticated) {
//       navigate("/login");
//     } else {
//       navigate(path);
//     }
//   };

//   const navigation = [
//     { name: "Home", href: "/", protected: false },
//     { name: "Products", href: "/products", protected: false },
//     { name: "My Orders", href: "/myorders", protected: true },
//   ];

//   // const userNotifCtx = useUserNotifications();
//   // if (!userNotifCtx) {
//   //   return null;
//   // }

  
//   // const { notifications, unreadCount, markAsRead } = userNotifCtx;

//   // Check active navigation
//   const isActive = (path) => {
//     if (path === "/") return location.pathname === "/";
//     return location.pathname.startsWith(path);
//   };

//   return (
//     // <header className="fixed top-0 left-0 w-full z-50 font-sans">
//     <header className="fixed top-0 left-0 w-full z-60 font-sans ">
//       {/* Main Navigation Bar */}
//       <nav
//         className={`relative w-full transition-all duration-300 ${
//           scrolled 
//             ? "bg-white/95 backdrop-blur-md shadow-lg py-3" 
//             : "bg-white py-4"
//         }`}

       
//       >
//         <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between">
//             {/* LEFT: Mobile Menu & Logo */}
//             <div className="flex items-center gap-6">
//               <button
//                 type="button"
//                 className="lg:hidden p-2.5 rounded-lg hover:bg-gray-100 transition-colors"
//                 onClick={() => setMobileMenuOpen(true)}
//               >
//                 <Bars3Icon className="h-6 w-6 text-gray-700" />
//               </button>

//               <Link to="/" className="flex-shrink-0">
//                 <div className="flex items-center gap-3">
//                   <img
//                     src={logo123}
//                     alt="Mandaram Drapes"
//                     className="h-8 lg:h-10 w-auto object-contain transition-all duration-300"
//                   />
//                   <div className="hidden lg:block">
//                     <div className="text-xs font-semibold text-white tracking-wider">Mandharam Drapes</div>
//                   </div>
//                 </div>
//               </Link>
//             </div>

//             {/* CENTER: Desktop Navigation */}
//             <div className="hidden lg:flex items-center space-x-1">
//               {navigation.map((item) => (
//                 <Link
//                   key={item.name}
//                   to={item.href}
//                   onClick={(e) => item.protected && !isAuthenticated ? handleGatedNavigation(e, item.href, true) : null}
//                   className={`relative px-5 py-2.5 text-sm font-medium transition-all duration-300 group ${
//                     isActive(item.href)
//                       ? "text-white"
//                       : "text-gray-600 hover:text-gray-900"
                     
//                   }`}
//                 >
//                   {item.name}
//                   {/* Active Indicator */}
//                   {isActive(item.href) && (
//                     <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-0.5 bg-gradient-to-r from-gray-900 to-gray-700 rounded-full"></div>
//                   )}
//                   {/* Hover Effect */}
//                   <div className="absolute inset-0 bg-gray-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
//                 </Link>
//               ))}
//             </div>

//             {/* RIGHT: Icons & Auth */}
//             <div className="flex items-center gap-4">
//               {/* Desktop Auth Links */}
//               <div className="hidden lg:flex items-center gap-4 mr-4">
//                 {!isAuthenticated ? (
//                   <>
//                     <Link
//                       to="/login"
//                       className="text-sm font-medium text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
//                     >
//                       Sign In
//                     </Link>
//                     <Link
//                       to="/signup"
//                       className="text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 px-5 py-2.5 rounded-lg transition-colors shadow-sm hover:shadow"
//                     >
//                       Register
//                     </Link>
//                   </>
//                 ) : (
//                   <div className="relative">
//                     <button
//                       onClick={handleUserIconClick}
//                       className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors group"
//                     >
//                       <div className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center cursor-pointer">
//                         <UserIcon className="h-4 w-4" />
//                       </div>
//                       <ChevronDownIcon className={`h-4 w-4 transition-transform duration-300 cursor-pointer ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
//                     </button>
                    
//                     {/* User Dropdown */}
//                     {isUserDropdownOpen && (
//                       <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
//                         <Link
//                           to="/profile"
//                           onClick={() => setIsUserDropdownOpen(false)}
//                           className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
//                         >
//                           <UserIcon className="h-4 w-4" />
//                           My Profile
//                         </Link>
//                         <div className="border-t border-gray-100 my-1"></div>
//                         <button
//                           onClick={() => {
//                             logout();
//                             setIsUserDropdownOpen(false);
//                           }}
//                           className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors rounded-lg mx-1"
//                         >
//                           <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                           </svg>
//                           Logout
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* Action Icons */}
//               <div className="flex items-center gap-3">
//                 {/* Wishlist Icon */}
//                 <button
//                   onClick={handleWishlistClick}
//                   className="relative p-2.5 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer"
//                 >
//                   <HeartOutline className="h-5 w-5 text-gray-700 group-hover:text-red-500 transition-colors " />
//                   {showWishlistBadge && (
//                     <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-[10px] text-white font-semibold rounded-full flex items-center justify-center px-1">
//                       {wishlistCount}
//                     </span>
//                   )}
//                 </button>

//                 {/* Cart Icon */}
//                 <Link
//                   to="/cart"
//                   onClick={handleCartClick}
//                   className="relative p-2.5 rounded-lg hover:bg-gray-50 transition-colors group"
//                 >
//                   <ShoppingBagIcon className="h-5 w-5 text-gray-700 group-hover:text-gray-900 transition-colors" />
//                   {showCartBadge && (
//                     <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-gray-900 text-[10px] text-white font-semibold rounded-full flex items-center justify-center px-1">
//                       {cartItemCount}
//                     </span>
//                   )}
//                 </Link>

//                 {/* Notification Icon */}
//                 <div className="relative">
//                   <button
//                     onClick={() => setNotificationOpen(true)}
//                     className="relative p-2.5 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer"
//                   >
//                     <Bell className="h-5 w-5 text-gray-700 group-hover:text-gray-900 transition-colors " />
//                     {unreadCount > 0 && (
//                       <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-blue-500 text-[10px] text-white font-semibold rounded-full flex items-center justify-center px-1">
//                         {unreadCount}
//                       </span>
//                     )}
//                   </button>
//                 </div>

//                 {/* User Icon for Mobile */}
//                 {/* {isAuthenticated && (
//                   <button
//                     onClick={handleUserIconClick}
//                     className="lg:hidden p-2.5 rounded-lg hover:bg-gray-50 transition-colors"
//                   >
//                     <UserIcon className="h-5 w-5 text-gray-700" />
//                   </button>
//                 )} */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* ------------------------------------------------ */}
//       {/* ENHANCED NOTIFICATION SIDEBAR */}
//       {/* ------------------------------------------------ */}
//       <Dialog
//         open={notificationOpen}
//         onClose={setNotificationOpen}
//         className="relative z-70"
//       >
//         <DialogBackdrop
//           transition
//           className="fixed inset-0 bg-black/20 backdrop-blur-sm transition-all duration-300 ease-out data-[closed]:opacity-0"
//         />

//         <div className="fixed inset-0 overflow-hidden">
//           <div className="absolute inset-0 overflow-hidden">
//             <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
//               <DialogPanel
//                 transition
//                 className="pointer-events-auto w-screen max-w-md transform transition-all duration-300 ease-out data-[closed]:translate-x-full bg-white shadow-2xl h-full flex flex-col"
//               >
//                 {/* Header */}
//                 <div className="flex-shrink-0 px-6 py-5 bg-gradient-to-b from-white to-gray-50 border-b border-gray-100">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <div className="p-2 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl ">
//                         <BellIcon className="h-5 w-5 text-blue-600 " />
//                       </div>
//                       <div>
//                         <DialogTitle className="text-xl font-bold text-gray-900">
//                           Notifications
//                         </DialogTitle>
//                         <p className="text-sm text-gray-500 mt-0.5">
//                           {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
//                         </p>
//                       </div>
//                     </div>
//                     <button
//                       onClick={() => setNotificationOpen(false)}
//                       className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                     >
//                       <XMarkIcon className="h-5 w-5 text-gray-500" />
//                     </button>
//                   </div>
//                 </div>

//                 {/* Notifications List */}


//                 {/* <div className="flex-1 overflow-y-auto">
//                   {notifications.length === 0 ? (
//                     <div className="flex flex-col items-center justify-center h-full p-6 text-center">
//                       <div className="p-4 bg-gray-50 rounded-full mb-4">
//                         <BellIcon className="h-8 w-8 text-gray-400" />
//                       </div>
//                       <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                         No notifications yet
//                       </h3>
//                       <p className="text-sm text-gray-500">
//                         We'll notify you when something arrives
//                       </p>
//                     </div>
//                   ) : (
//                     <div className="divide-y divide-gray-100">
//                       {notifications.map((n) => (
//                         <div
//                           key={n._id}
//                           onClick={() => markAsRead(n._id)}
//                           className={`p-4 transition-all duration-200 cursor-pointer ${
//                             n.isRead 
//                               ? 'bg-white hover:bg-gray-50' 
//                               : 'bg-blue-50/50 hover:bg-blue-100/50'
//                           }`}
//                         >
//                           <div className="flex gap-3">
//                             <div className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${
//                               n.isRead ? 'bg-gray-300' : 'bg-blue-500'
//                             }`}></div>
//                             <div className="flex-1">
//                               <p className="text-sm text-gray-900 font-medium leading-relaxed">
//                                 {n.message}
//                               </p>
//                               <p className="text-xs text-gray-500 mt-2">
//                                 {new Date(n.createdAt).toLocaleString('en-US', {
//                                   month: 'short',
//                                   day: 'numeric',
//                                   hour: '2-digit',
//                                   minute: '2-digit'
//                                 })}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div> */}

//                 <div className="flex-1 overflow-y-auto bg-gray-50 p-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
//   {notifications.length === 0 ? (
//     /* EMPTY STATE */
//     <div className="flex flex-col items-center justify-center h-full text-center animate-fadeIn">
//       <div className="p-5 bg-white rounded-full mb-4 shadow-sm ring-1 ring-gray-100">
//         <BellIcon className="h-8 w-8 text-gray-300" />
//       </div>
//       <h3 className="text-lg font-semibold text-gray-800 mb-1">
//         All caught up
//       </h3>
//       <p className="text-gray-500 text-sm max-w-[200px] mx-auto">
//         No new notifications. We'll notify you when updates arrive.
//       </p>
//     </div>
//   ) : (
//     /* LIST STATE - Updated to Card Style */
//     <div className="space-y-3">
//       {notifications.map((n) => (
//         <div
//           key={n._id}
//           onClick={() => markAsRead(n._id)}
//           className={`relative p-4 rounded-r-xl rounded-l-md shadow-sm bg-white transition-all duration-200 cursor-pointer border-l-[6px] hover:shadow-md
//             ${n.isRead 
//               ? 'border-gray-200 opacity-75' 
//               : 'border-pink-500 opacity-100'
//             }`}
//         >
//           <div className="flex justify-between items-start gap-3">
//             <div className="flex-1">
//               {/* Message */}
//               <p className={`text-[15px] leading-snug mb-2 ${
//                   n.isRead ? 'text-gray-600 font-normal' : 'text-gray-900 font-semibold'
//                 }`}
//               >
//                 {n.message}
//               </p>

//               {/* Status/Details Placeholder (Optional - helps visual balance) */}
//               {/* {!n.isRead && (
//                 <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-pink-50 text-pink-600 mb-1">
//                   NEW
//                 </span>
//               )} */}
//             </div>
//           </div>

//           {/* Timestamp - Aligned to bottom right like the reference image */}
//           <div className="mt-2 text-right">
//             <p className="text-xs text-gray-400 font-medium">
//               {new Date(n.createdAt).toLocaleString('en-US', {
//                 month: 'short',
//                 day: 'numeric',
//                 hour: '2-digit',
//                 minute: '2-digit'
//               })}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   )}
// </div>


                
//               </DialogPanel>
//             </div>
//           </div>
//         </div>
//       </Dialog>

//       {/* ------------------------------------------------ */}
//       {/* ENHANCED MOBILE MENU */}
//       {/* ------------------------------------------------ */}
//       <Dialog
//         open={mobileMenuOpen}
//         onClose={setMobileMenuOpen}
//         className="relative z-50 lg:hidden"
//       >
//         <DialogBackdrop className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300" />

//         <div className="fixed inset-0 z-50 flex">
//           <DialogPanel className="relative mr-auto flex h-full w-[320px] flex-col overflow-y-auto bg-white shadow-2xl transition-transform duration-300">
//             {/* Header */}
//             <div className="px-6 py-5 border-b border-gray-100">
//               <div className="flex items-center justify-between">
//                 <Link to="/" onClick={() => setMobileMenuOpen(false)}>
//                   <img src={logo123} alt="Logo" className="h-8 w-auto" />
//                 </Link>
//                 <button
//                   onClick={() => setMobileMenuOpen(false)}
//                   className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                 >
//                   <XMarkIcon className="h-6 w-6 text-gray-700" />
//                 </button>
//               </div>
//             </div>

//             {/* Navigation Links */}
//             <div className="flex-1 px-4 py-6">
//               <div className="space-y-1">
//                 {navigation.map((item) => (
//                   <Link
//                     key={item.name}
//                     to={item.href}
//                     onClick={(e) => {
//                       if (item.protected && !isAuthenticated) {
//                         handleGatedNavigation(e, item.href, true);
//                       }
//                       setMobileMenuOpen(false);
//                     }}
//                     className={`flex items-center gap-3 px-4 py-3.5 rounded-lg transition-colors ${
//                       isActive(item.href)
//                         ? 'bg-gray-900 text-white'
//                         : 'text-gray-700 hover:bg-gray-50'
//                     }`}
//                   >
//                     <div className={`w-1.5 h-1.5 rounded-full ${
//                       isActive(item.href) ? 'bg-white' : 'bg-transparent'
//                     }`}></div>
//                     {item.name}
//                   </Link>
//                 ))}
//               </div>
//             </div>

//             {/* Auth Section */}
//             <div className="px-6 py-6 border-t border-gray-100">
//               {!isAuthenticated ? (
//                 <div className="space-y-3">
//                   <Link
//                     to="/login"
//                     onClick={() => setMobileMenuOpen(false)}
//                     className="block w-full text-center bg-gray-900 text-white py-3.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
//                   >
//                     Sign In
//                   </Link>
//                   <Link
//                     to="/signup"
//                     onClick={() => setMobileMenuOpen(false)}
//                     className="block w-full text-center border-2 border-gray-900 text-gray-900 py-3.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
//                   >
//                     Create Account
//                   </Link>
//                 </div>
//               ) : (
//                 <div className="space-y-3">
//                   <Link
//                     to="/profile"
//                     onClick={() => setMobileMenuOpen(false)}
//                     className="flex items-center justify-center gap-2 w-full text-center bg-gray-50 text-gray-700 py-3.5 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
//                   >
//                     <UserIcon className="h-4 w-4" />
//                     My Profile
//                   </Link>
//                   <button
//                     onClick={() => {
//                       logout();
//                       setMobileMenuOpen(false);
//                     }}
//                     className="flex items-center justify-center gap-2 w-full text-center border border-gray-200 text-red-600 py-3.5 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
//                   >
//                     <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                     </svg>
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



import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Dialog, DialogPanel, DialogBackdrop, DialogTitle } from "@headlessui/react";
import {
  Bars3Icon,
  UserIcon,
  XMarkIcon,
  HeartIcon as HeartOutline,
  BellIcon,
  ShoppingBagIcon,
  ChevronDownIcon,
  HomeIcon,
  CubeIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartSolid,
  ShoppingBagIcon as ShoppingBagSolid,
  BellIcon as BellSolid,
} from "@heroicons/react/24/solid";
import logo123 from "../assets/logo.png";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
// import { useUserNotifications } from "../context/UserNotificationContext";
import toast from "react-hot-toast";


const Navbar = ({ user, role, cartItemCount = 0, handleLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const { wishlistCount } = useWishlist();
  // const { notifications, unreadCount, markAsRead } = useUserNotifications();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  // const [notificationOpen, setNotificationOpen] = useState(false);

  // --- ACKNOWLEDGED COUNT STATE (Persisted) ---
  const [ackCartCount, setAckCartCount] = useState(() => {
    return parseInt(localStorage.getItem("ack_cart_count") || "0", 10);
  });

  const [ackWishlistCount, setAckWishlistCount] = useState(() => {
    return parseInt(localStorage.getItem("ack_wishlist_count") || "0", 10);
  });

  // --- MATCHING LOGIC ---
  const currentPath = location.pathname.toLowerCase();
  const isCartPage = currentPath.includes("cart");
  const isWishlistPage = currentPath.includes("wishlist");

  // --- SYNC LOGIC ---
  useEffect(() => {
    if (isCartPage) {
      setAckCartCount(cartItemCount);
      localStorage.setItem("ack_cart_count", cartItemCount);
    }
  }, [isCartPage, cartItemCount]);

  useEffect(() => {
    if (!isWishlistPage) return;
    setAckWishlistCount((prev) => {
      const next = Math.max(prev, wishlistCount);
      localStorage.setItem("ack_wishlist_count", next);
      return next;
    });
  }, [isWishlistPage, wishlistCount]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // useEffect(() => {
  //   if (notificationOpen) {
  //     notifications.forEach(n => {
  //       if (!n.isRead) markAsRead(n._id);
  //     });
  //   }
  // }, [notificationOpen]);

  // if (user.isInitialLoad) {
  //   return null;
  // }

  const isAuthenticated = user.isAuthenticated;

  // --- BADGE VISIBILITY LOGIC ---
  const showCartBadge = cartItemCount > ackCartCount;
  const showWishlistBadge = wishlistCount > 0;

  const handleCartClick = () => {
    setAckCartCount(cartItemCount);
    localStorage.setItem("ack_cart_count", cartItemCount);
  };

  const handleWishlistClick = (e) => {
    handleGatedNavigation(e, "/WishlistPage", true);
    setAckWishlistCount((prev) => {
      const next = Math.max(prev, wishlistCount);
      localStorage.setItem("ack_wishlist_count", next);
      return next;
    });
  };

  const handleUserIconClick = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      setIsUserDropdownOpen(!isUserDropdownOpen);
    }
  };

  // const handleGatedNavigation = (e, path, isProtected) => {
  //   e.preventDefault();
  //   if (isProtected && !isAuthenticated) {
  //     navigate("/login");
  //   } else {
  //     navigate(path);
  //   }
  // };


  const handleGatedNavigation = (e, path, isProtected) => {
  e.preventDefault();

  if (isProtected && !isAuthenticated) {
    toast.error("Please login to continue",
      {id:"please login to continue wishlist"});
    return;
  }

  navigate(path);
};


  const navigation = [
  { name: "Home", href: "/", protected: false, icon: HomeIcon },
  { name: "Products", href: "/products", protected: false, icon: CubeIcon },
  ...(isAuthenticated
    ? [{ name: "My Orders", href: "/myorders", protected: true, icon: ClipboardDocumentListIcon }]
    : []),
];


  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-60 font-sans ">
      {/* GLASSMORPHISM EFFECT (Light Black)
         - bg-black/40 or bg-gray-900/30: Semi-transparent dark background
         - backdrop-blur-xl or backdrop-blur-2xl: Strong blur for the "glass" look
         - border-white/10: Subtle light border for edge definition
      */}
      <nav className={`relative w-full transition-all duration-500 ${
        scrolled 
          ? "bg-black/60 backdrop-blur-2xl shadow-2xl shadow-black/20 py-4 border-b border-white/10" // Scrolled: slightly darker, strong blur
          : "bg-black/70 backdrop-blur-xl border-b border-white/5 py-6" // Top: very transparent, frosted
          // :"bg-gradient-to-r from-gray-900 via-indigo-900 to-rose-900 py-6"
      }`}>
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* LEFT: Logo & Mobile Menu */}
            <div className="flex items-center gap-4 lg:gap-8">
              <button
                type="button"
                className="lg:hidden p-2.5 rounded-lg hover:bg-white/10 transition-all duration-300 group"
                onClick={() => setMobileMenuOpen(true)}
              >
                {/* Text needs to be light (gray-300/white) because bg is dark glass */}
                <Bars3Icon className="h-6 w-6 text-gray-300 group-hover:text-white transition-colors" />
              </button>

              <Link to="/" className="flex-shrink-0">
                <div className="flex items-center gap-3">
                  <img
                    src={logo123}
                    alt="Mandaram Drapes"
                    className="h-9 lg:h-10 w-auto object-contain transition-all duration-300 filter brightness-125"
                  />
                  <div className="hidden lg:block">
                    <div className="text-sm font-bold text-white tracking-widest uppercase">Mandharam Drapes</div>
                    <div className="text-xs text-gray-400 tracking-wider">Premium Textiles</div>
                  </div>
                </div>
              </Link>
            </div>

            {/* CENTER: Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={(e) => item.protected && !isAuthenticated ? handleGatedNavigation(e, item.href, true) : null}
                    className={`relative flex items-center gap-2 px-5 py-3 text-md font-medium transition-all duration-300 group rounded-xl ${
                      active
                        ? "bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] border border-white/10" // Active state glass effect
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className={`h-4 w-4 transition-all duration-300 ${active ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'}`} />
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* RIGHT: Actions & Auth */}
            <div className="flex items-center gap-2 lg:gap-4">
              
              {/* Action Icons */}
              <div className="flex items-center gap-1 lg:gap-2">
                {/* Wishlist Icon */}
                <button
                  onClick={handleWishlistClick}
                  className="relative p-2.5 rounded-lg hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                >
                  {isActive('/wishlist') ? (
                    <HeartSolid className="h-5 w-5 text-pink-500 group-hover:text-pink-400 transition-colors" />
                  ) : (
                    <HeartOutline className="h-5 w-5 text-gray-400 group-hover:text-pink-400 transition-colors" />
                  )}
                  {showWishlistBadge && (
                    <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] bg-gradient-to-r from-pink-500 to-rose-500 text-[11px] text-white font-bold rounded-full flex items-center justify-center px-1 animate-pulse">
                      {wishlistCount}
                    </span>
                  )}
                </button>

                {/* Cart Icon */}
                <Link
  to="/cart"
  onClick={(e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      toast.error("Please login to continue",
        {id:"Navbar login to continue"});
      return;
    }
    handleCartClick();
  }}
  className="relative p-2.5 ..."
>

                  {isActive('/cart') ? (
                    <ShoppingBagSolid className="h-5 w-5 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                  ) : (
                    <ShoppingBagIcon className="h-5 w-5 text-gray-400 group-hover:text-emerald-300 transition-colors" />
                  )}
                  {showCartBadge && (
                    <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] bg-gradient-to-r from-emerald-500 to-teal-500 text-[11px] text-white font-bold rounded-full flex items-center justify-center px-1 animate-bounce">
                      {cartItemCount}
                    </span>
                  )}
                </Link>

                {/* Notification Icon */}
                {/* <div className="relative">
                  <button
                    onClick={() => setNotificationOpen(true)}
                    className="relative p-2.5 rounded-lg hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                  > */}

              

                  <div className="relative">
  {/* <button
    onClick={() => {
      if (!isAuthenticated) {
        navigate("/login");   // redirect logged-out users
        return;
      }
      setNotificationOpen(true);
    }}
    disabled={!isAuthenticated}
    className={`relative p-2.5 rounded-lg transition-all duration-300 group
      ${isAuthenticated
        ? "hover:bg-white/10 cursor-pointer"
        : "opacity-40 cursor-not-allowed"
      }
    `}
  > */}

                    {/* {unreadCount > 0 ? (
                      <BellSolid className="h-5 w-5 text-amber-400 group-hover:text-amber-300 transition-colors" />
                    ) : (
                      <BellIcon className="h-5 w-5 text-gray-400 group-hover:text-amber-300 transition-colors" />
                    )} */}

                    {/* {isAuthenticated && unreadCount > 0 ? (
  <BellSolid className="h-5 w-5 text-amber-400 group-hover:text-amber-300 transition-colors" />
) : (
  <BellIcon
    className={`h-5 w-5 ${
      isAuthenticated
        ? "h-5 w-5 text-gray-400 group-hover:text-amber-300 transition-colors"
        : "text-gray-600"
    }`}
  />
)} */}

                    {/* {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] bg-gradient-to-r from-amber-500 to-orange-500 text-[11px] text-white font-bold rounded-full flex items-center justify-center px-1">
                        {unreadCount}
                      </span> */}
                      {/* {isAuthenticated && unreadCount > 0 && (
  <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] bg-gradient-to-r from-amber-500 to-orange-500 text-[11px] text-white font-bold rounded-full flex items-center justify-center px-1">
    {unreadCount}
  </span>
)}

                  </button> */}
                </div>

                {/* Auth Section */}
                {!isAuthenticated ? (
                  <div className="hidden lg:flex items-center gap-3 ml-2">
                    <Link
                      to="/login"
                      className="px-4 py-2.5 text-sm font-semibold text-gray-300 hover:text-white transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-semibold rounded-lg transition-all duration-300 backdrop-blur-sm shadow-[0_0_10px_rgba(255,255,255,0.05)]"
                    >
                      Register
                    </Link>
                  </div>
                ) : (
                  <div className="relative">
                    <button
                      onClick={handleUserIconClick}
                      className="hidden lg:flex items-center gap-2 ml-2 p-2 rounded-lg hover:bg-white/10 transition-all duration-300 group"
                    >
                      <div className="w-9 h-9 bg-white/5 border border-white/10 rounded-full flex items-center justify-center group-hover:border-white/30 transition-colors backdrop-blur-md">
                        <UserIcon className="h-4 w-4 text-gray-300 group-hover:text-white" />
                      </div>
                      <ChevronDownIcon className={`h-4 w-4 text-gray-400 transition-all duration-300 ${isUserDropdownOpen ? 'rotate-180 text-white' : ''}`} />
                    </button>
                    
                    {/* User Dropdown */}
                    {isUserDropdownOpen && (
                      <div className="absolute top-full right-0 mt-3 w-56 bg-black/80  rounded-xl shadow-2xl shadow-black/50 border border-white/10 py-2 z-50">
                        {/* <div className="px-4 py-3 border-b border-white/10">
                          <p className="text-sm font-semibold text-white">Welcome back!</p>
                          <p className="text-xs text-gray-400 truncate">{user.email || "User"}</p>
                        </div> */}
                        <Link
                          to="/profile"
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          <UserIcon className="h-4 w-4" />
                          My Profile
                        </Link>
                        <div className="border-t border-white/10 my-2"></div>
                        <button
                          onClick={() => {
                            logout();
                            setIsUserDropdownOpen(false);
                          }}
                          className="flex items-center gap-3 w-full px-4 py-3 text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Mobile Auth Icon */}
                {/* {isAuthenticated && (
                  <button
                    onClick={handleUserIconClick}
                    className="lg:hidden p-2.5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </button>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ------------------------------------------------ */}
      {/* ENHANCED NOTIFICATION SIDEBAR */}
      {/* ------------------------------------------------ */}



      {/* <Dialog
        open={notificationOpen}
        onClose={setNotificationOpen}
        className="relative z-70"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300 ease-out data-[closed]:opacity-0"
        />
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel
                transition
                className="pointer-events-auto w-screen max-w-md transform transition-all duration-300 ease-out data-[closed]:translate-x-full bg-black/90 backdrop-blur-2xl shadow-2xl h-full flex flex-col border-l border-white/10"
              >
                {/* Header */}
                {/* <div className="flex-shrink-0 px-6 py-5 bg-black/40 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/5 rounded-xl border border-white/10">
                        <BellIcon className="h-5 w-5 text-white" />
                      </div>
                      <div> */}
                        {/* <DialogTitle className="text-xl font-bold text-white">
                          Notifications
                        </DialogTitle>
                        <p className="text-sm text-gray-400 mt-0.5">
                          {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setNotificationOpen(false)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors border border-white/10"
                    >
                      <XMarkIcon className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>
                </div> */}

                {/* Notifications List */}
                {/* <div className="flex-1 overflow-y-auto bg-black/20 p-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                  {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center animate-fadeIn">
                      <div className="p-5 bg-white/5 rounded-full mb-4 border border-white/10">
                        <BellIcon className="h-8 w-8 text-gray-500" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        All caught up
                      </h3>
                      <p className="text-gray-500 text-sm max-w-[200px] mx-auto">
                        No new notifications. We'll notify you when updates arrive.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {notifications.map((n) => (
                        <div
                          key={n._id}
                          onClick={() => markAsRead(n._id)}
                          className={`relative p-4 rounded-xl shadow-lg transition-all duration-200 cursor-pointer border ${
                            n.isRead 
                            ? 'border-white/5 bg-white/5 hover:bg-white/10' 
                            : 'border-white/20 bg-white/10 hover:bg-white/15'
                          }`}
                        >
                          <div className="flex justify-between items-start gap-3">
                            <div className="flex-1">
                              <p className={`text-[15px] leading-snug mb-2 ${
                                  n.isRead ? 'text-gray-400 font-normal' : 'text-white font-semibold'
                                }`}
                              >
                                {n.message}
                              </p>
                              {!n.isRead && (
                                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-white/20 text-white mb-1 border border-white/10">
                                  NEW
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="mt-2 text-right">
                            <p className="text-xs text-gray-500 font-medium">
                              {new Date(n.createdAt).toLocaleString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog> */} 

      {/* ------------------------------------------------ */}
      {/* ENHANCED MOBILE MENU */}
      {/* ------------------------------------------------ */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-opacity duration-300" />
        <div className="fixed inset-0 z-50 flex">
          <DialogPanel className="relative mr-auto flex h-full w-[320px] flex-col overflow-y-auto bg-black/90 backdrop-blur-2xl shadow-2xl transition-transform duration-300 border-r border-white/10">
            {/* Header */}
            <div className="px-6 py-5 border-b border-white/10">
              <div className="flex items-center justify-between">
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                  <div className="flex items-center gap-3">
                    <img src={logo123} alt="Logo" className="h-8 w-auto filter brightness-125" />
                    <div>
                      <div className="text-sm font-bold text-white">Mandharam Drapes</div>
                      <div className="text-xs text-gray-400">Premium Textiles</div>
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors border border-white/10"
                >
                  <XMarkIcon className="h-6 w-6 text-gray-300" />
                </button>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 px-2 py-4">
              <div className="space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={(e) => {
                        if (item.protected && !isAuthenticated) {
                          handleGatedNavigation(e, item.href, true);
                        }
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-lg transition-all duration-300 mx-2 ${
                        active
                          ? 'bg-white/10 text-white border border-white/10 shadow-[0_0_10px_rgba(255,255,255,0.05)]'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${active ? 'text-white' : 'text-gray-400'}`} />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Auth Section */}
            <div className="px-4 py-6 border-t border-white/10">
              {!isAuthenticated ? (
                <div className="space-y-3">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center bg-white/10 border border-white/10 text-white py-3.5 rounded-lg text-sm font-semibold hover:bg-white/20 transition-all backdrop-blur-md"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center border border-gray-600 text-gray-300 py-3.5 rounded-lg text-sm font-semibold hover:bg-white/5 hover:text-white transition-colors"
                  >
                    Create Account
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* <div className="px-4 py-3 bg-white/5 rounded-lg mb-3 border border-white/5">
                    <p className="text-sm font-semibold text-white">Welcome back!</p>
                    <p className="text-xs text-gray-400 truncate">{user.email || "User"}</p>
                  </div> */}
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full text-center bg-black/40 text-gray-300 py-3.5 rounded-lg text-sm font-semibold hover:bg-white/5 hover:text-white transition-colors border border-white/5"
                  >
                    <UserIcon className="h-4 w-4" />
                    My Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 w-full text-center border border-white/10 text-rose-400 py-3.5 rounded-lg text-sm font-semibold hover:bg-rose-500/10 hover:text-rose-300 transition-colors"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </header>
  );
};

export default Navbar;