// 'use client'

// import React, { useRef, useState, useEffect, Fragment } from "react";
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { ClipLoader } from "react-spinners";
// import { FaUserCircle } from "react-icons/fa";
// import { domainUrl } from "../utils/constant"; // Assuming this path is correct

// import {
//   Dialog,
//   DialogBackdrop,
//   DialogPanel,
//   Menu,
//   MenuButton,
//   MenuItem,
//   MenuItems,
//   TransitionChild,
// } from '@headlessui/react'
// import {
//   Bars3Icon,
//   HomeIcon,
//   XMarkIcon,
//   UsersIcon,
//   TagIcon,
//   CubeTransparentIcon,
//   ShoppingBagIcon,
//   ChevronDownIcon,
// } from '@heroicons/react/24/outline'

// // --- 1. ADMIN NAVIGATION DATA (MAPPED FROM YOUR LINKS) ---
// const adminNavigation = [
//   {
//     name: 'Dashboard',
//     href: '/admindashboard',
//     icon: HomeIcon,
//     current: true
//   },
//   {
//     name: 'User Management',
//     icon: UsersIcon,
//     subLinks: [
//       { name: 'Add User', href: '/admindashboard/manageuser/adduser' },
//       { name: 'List Users', href: '/admindashboard/manageuser/listusers' },
//     ],
//   },
//   {
//     name: 'Category Management',
//     icon: TagIcon,
//     subLinks: [
//       { name: 'Add Category', href: '/admindashboard/managecategories/addcategory' },
//       { name: 'List Categories', href: '/admindashboard/managecategories/listcategory' },
//     ],
//   },
//   {
//     name: 'Product Management',
//     icon: CubeTransparentIcon,
//     subLinks: [
//       { name: 'Add Products', href: '/admindashboard/manageproducts/addproducts' },
//       { name: 'List Products', href: '/admindashboard/manageproducts/listproducts' },
//     ],
//   },
//   {
//     name: 'Order Management',
//     href: '/admindashboard/adminordermanagement',
//     icon: ShoppingBagIcon,
//     current: false
//   },
// ]

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

// // Custom Link Component (Assumes motion is imported)
// const NavLink = ({ item, openMenu, toggleMenu }) => {
//     const hasSubLinks = item.subLinks && item.subLinks.length > 0;
//     const isCurrent = item.href ? window.location.pathname === item.href : false;
//     const isActiveParent = hasSubLinks && openMenu === item.name;

//     const baseClasses = 'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold transition-colors duration-200 cursor-pointer';
//     const activeClasses = 'bg-white/10 text-white';
//     const inactiveClasses = 'text-gray-300 hover:bg-white/10 hover:text-white';

//     if (!hasSubLinks) {
//         return (
//             <li key={item.name}>
//                 <Link to={item.href} className={classNames(
//                     isCurrent ? activeClasses : inactiveClasses,
//                     baseClasses,
//                     'w-full'
//                 )}>
//                     <item.icon aria-hidden="true" className="size-6 shrink-0" />
//                     {item.name}
//                 </Link>
//             </li>
//         );
//     }

//     return (
//         <li key={item.name}>
//             <button
//                 onClick={() => toggleMenu(item.name)}
//                 className={classNames(
//                     isActiveParent ? activeClasses : inactiveClasses,
//                     baseClasses,
//                     'w-full flex justify-between items-center'
//                 )}
//             >
//                 <div className="flex items-center gap-x-3">
//                     <item.icon aria-hidden="true" className="size-6 shrink-0" />
//                     {item.name}
//                 </div>
//                 <ChevronDownIcon
//                     className={classNames(
//                         'size-5 transition-transform duration-200',
//                         isActiveParent ? 'rotate-180' : 'rotate-0'
//                     )}
//                 />
//             </button>
//             <motion.ul
//                 initial={{ height: 0 }}
//                 animate={{ height: isActiveParent ? 'auto' : 0 }}
//                 transition={{ duration: 0.2 }}
//                 className={classNames(
//                     'mt-1 space-y-1 overflow-hidden ml-4 p-1 rounded-md bg-black/20'
//                 )}
//             >
//                 {item.subLinks.map((subItem) => (
//                     <li key={subItem.name}>
//                         <Link
//                             to={subItem.href}
//                             className="block p-2 text-sm text-gray-400 rounded-md hover:bg-black/30 hover:text-white transition-colors duration-200"
//                         >
//                             {subItem.name}
//                         </Link>
//                     </li>
//                 ))}
//             </motion.ul>
//         </li>
//     );
// };
// // -----------------------------------------------------------------

// export default function Admindashboard() {
//     const [sidebarOpen, setSidebarOpen] = useState(false);
//     const [openMenu, setOpenMenu] = useState("");
//     const [adminInfo, setAdminInfo] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const navigate = useNavigate();

//     const toggleMenu = (menuName) => {
//         setOpenMenu(openMenu === menuName ? "" : menuName);
//     };

//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("role");
//         setAdminInfo(null);
//         navigate("/login");
//     };

//     // 🔑 ADMIN PROFILE FETCHING FUNCTION
//     const fetchAdminProfile = async (token) => {
//         setIsLoading(true);
//         try {
//             const res = await axios.get(`${domainUrl}/admin/adminProfile`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             // Use the specified response field: res.data.adminData
//             const adminData = res.data.adminData;

//             // Set the state with the fetched admin's name and role
//             setAdminInfo({
//                 name: adminData.username || adminData.name || "Administrator",
//                 role: adminData.role || "Admin",
//             });

//         } catch (error) {
//             console.error("Error fetching admin profile:", error);
//             // If fetching fails, clear tokens and redirect to login
//             localStorage.removeItem("token");
//             localStorage.removeItem("role");
//             navigate("/login", { replace: true });
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // 🔑 AUTHENTICATION AND DATA FETCHING EFFECT
//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         const role = localStorage.getItem("role");

//         // --- 1. Admin Protection Logic ---
//         if (!token || role !== "admin") {
//             // Not logged in or incorrect role - clear data and redirect
//             localStorage.removeItem("token");
//             localStorage.removeItem("role");
//             navigate("/login", { replace: true });
//             return;
//         }

//         // --- 2. If valid, fetch profile data ---
//         fetchAdminProfile(token);

//     }, [navigate]);

//     // 🛡️ Guard Clause: Show loading spinner until validation and data retrieval is complete
//     if (isLoading) {
//         return (
//             <div className="flex items-center justify-center h-screen w-full bg-gray-50">
//                 <ClipLoader color="#343e32" size={35} />
//             </div>
//         );
//     }

//     // --- RENDER ---
//     return (
//         <>
//             <div>
//                 {/* Mobile sidebar */}
//                 <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
//                     <DialogBackdrop
//                         transition
//                         className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
//                     />

//                     <div className="fixed inset-0 flex">
//                         <DialogPanel
//                             transition
//                             className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
//                         >
//                             <TransitionChild>
//                                 <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
//                                     <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
//                                         <span className="sr-only">Close sidebar</span>
//                                         <XMarkIcon aria-hidden="true" className="size-6 text-white" />
//                                     </button>
//                                 </div>
//                             </TransitionChild>

//                             {/* Sidebar component - Mobile */}
//                             <div className="relative flex grow flex-col gap-y-5 overflow-y-auto bg-[#343e32] px-6 pb-4 ring-1 ring-white/10">
//                                 <div className="relative flex h-16 shrink-0 items-center">
//                                     {/* Your Logo (Mandaram Drapes) */}
//                                     <img
//                                         alt="Mandaram Drapes Logo"
//                                         src="/logo123.png"
//                                         className="h-10 w-auto"
//                                     />
//                                 </div>
//                                 <nav className="relative flex flex-1 flex-col">
//                                     <ul role="list" className="flex flex-1 flex-col gap-y-7">
//                                         <li>
//                                             <ul role="list" className="-mx-2 space-y-1">
//                                                 {adminNavigation.map((item) => (
//                                                     <NavLink
//                                                         key={item.name}
//                                                         item={item}
//                                                         openMenu={openMenu}
//                                                         toggleMenu={toggleMenu}
//                                                     />
//                                                 ))}
//                                             </ul>
//                                         </li>
//                                         <a
//                                             onClick={handleLogout}
//                                             className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-white/10 hover:text-white mt-auto cursor-pointer"
//                                         >
//                                             <ShoppingBagIcon aria-hidden="true" className="size-6 shrink-0" />
//                                             Logout
//                                         </a>
//                                     </ul>
//                                 </nav>
//                             </div>
//                         </DialogPanel>
//                     </div>
//                 </Dialog>

//                 {/* Static sidebar for desktop */}
//                 <div className="hidden bg-[#343e32] lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
//                     {/* Sidebar component - Desktop */}
//                     <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 pb-4">
//                         <div className="flex h-16 shrink-0 items-center">
//                             {/* Your Logo (Mandaram Drapes) */}
//                             <img
//                                 alt="Mandaram Drapes Logo"
//                                 src="/logo123.png"
//                                 className="h-10 w-auto"
//                             />
//                         </div>
//                         <nav className="flex flex-1 flex-col">
//                             <ul role="list" className="flex flex-1 flex-col gap-y-7">
//                                 <li>
//                                     <ul role="list" className="-mx-2 space-y-1">
//                                         {adminNavigation.map((item) => (
//                                             <NavLink
//                                                 key={item.name}
//                                                 item={item}
//                                                 openMenu={openMenu}
//                                                 toggleMenu={toggleMenu}
//                                             />
//                                         ))}
//                                     </ul>
//                                 </li>
//                                 <li className="mt-auto">
//                                     <a
//                                         onClick={handleLogout}
//                                         className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer"
//                                     >
//                                         <ShoppingBagIcon aria-hidden="true" className="size-6 shrink-0" />
//                                         Logout
//                                     </a>
//                                 </li>
//                             </ul>
//                         </nav>
//                     </div>
//                 </div>

//                 {/* Main Content Area */}
//                 <div className="lg:pl-72">

//                     {/* Top Navbar (Integrated from Tailwind template, simplified) */}
//                     <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-xs sm:gap-x-6 sm:px-6 lg:px-8">
//                         <button
//                             type="button"
//                             onClick={() => setSidebarOpen(true)}
//                             className="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900 lg:hidden"
//                         >
//                             <span className="sr-only">Open sidebar</span>
//                             <Bars3Icon aria-hidden="true" className="size-6" />
//                         </button>

//                         {/* Separator */}
//                         <div aria-hidden="true" className="h-6 w-px bg-gray-900/10 lg:hidden" />

//                         <div className="flex flex-1 justify-end self-stretch">
//                             <div className="flex items-center gap-x-4 lg:gap-x-6">

//                                 {/* Separator */}
//                                 <div
//                                     aria-hidden="true"
//                                     className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
//                                 />

//                                 {/* Profile dropdown (Combined with your adminInfo logic) */}
//                                 <Menu as="div" className="relative">
//                                     <MenuButton className="relative flex items-center">
//                                         <span className="absolute -inset-1.5" />
//                                         <span className="sr-only">Open user menu</span>
//                                         {/* Using your FaUserCircle style here */}
//                                         <FaUserCircle size={28} className="text-gray-700" />

//                                         <span className="hidden lg:flex lg:items-center">
//                                             <span aria-hidden="true" className="ml-4 text-sm/6 font-semibold text-gray-900">
//                                                 {adminInfo?.name || "Administrator"}
//                                             </span>
//                                             <ChevronDownIcon aria-hidden="true" className="ml-2 size-5 text-gray-400" />
//                                         </span>
//                                     </MenuButton>
//                                     <MenuItems
//                                         transition
//                                         className="absolute right-0 z-10 mt-2.5 w-48 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
//                                     >
//                                         <div className="px-3 py-1 text-sm text-gray-600 border-b mb-1">
//                                             <p className="font-semibold">{adminInfo?.name || "Administrator"}</p>
//                                             <p className="text-xs text-gray-500">Role: {adminInfo?.role || 'N/A'}</p>
//                                         </div>
//                                         <MenuItem>
//                                             <a
//                                                 onClick={handleLogout}
//                                                 className="block px-3 py-1 text-sm/6 text-red-600 hover:bg-gray-50 cursor-pointer"
//                                             >
//                                                 Sign out
//                                             </a>
//                                         </MenuItem>
//                                     </MenuItems>
//                                 </Menu>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Main Outlet for Content */}
//                     <main>
//                         <div>
//                             <Outlet />
//                         </div>
//                     </main>
//                 </div>
//             </div>
//         </>
//     )
// }


// working codeeeeeeeeeeeeeeeeeeeeeeeee

// "use client";

// import React, { useState, useEffect } from "react";
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { ClipLoader } from "react-spinners";
// import { FaUserCircle } from "react-icons/fa";
// import api from "../utils/api";
// import { domainUrl } from "../utils/constant";
// import logo123 from "../assets/logo.png";
// import { useLocation } from "react-router-dom";


// import {
//   Dialog,
//   DialogBackdrop,
//   DialogPanel,
//   Menu,
//   MenuButton,
//   MenuItem,
//   MenuItems,
//   TransitionChild,
// } from "@headlessui/react";

// import {
//   Bars3Icon,
//   HomeIcon,
//   XMarkIcon,
//   UsersIcon,
//   TagIcon,
//   CubeTransparentIcon,
//   ShoppingBagIcon,
//   ChevronDownIcon,
// } from "@heroicons/react/24/outline";
// import { useAuth } from "../context/AuthContext";

// // ADMIN NAVIGATION (UI unchanged)
// const adminNavigation = [
//   { name: "Dashboard", href: "/admindashboard", icon: HomeIcon },
//   {
//     name: "User Management",
//     icon: UsersIcon,
//     subLinks: [
//       { name: "Add User", href: "/admindashboard/manageuser/adduser" },
//       { name: "List Users", href: "/admindashboard/manageuser/listusers" },
//     ],
//   },
//   {
//     name: "Category Management",
//     icon: TagIcon,
//     subLinks: [
//       {
//         name: "Add Category",
//         href: "/admindashboard/managecategories/addcategory",
//       },
//       {
//         name: "List Categories",
//         href: "/admindashboard/managecategories/listcategory",
//       },
//     ],
//   },
//   {
//     name: "Product Management",
//     icon: CubeTransparentIcon,
//     subLinks: [
//       {
//         name: "Add Products",
//         href: "/admindashboard/manageproducts/addproducts",
//       },
//       {
//         name: "List Products",
//         href: "/admindashboard/manageproducts/listproducts",
//       },
//     ],
//   },
//   {
//     name: "Order Management",
//     href: "/admindashboard/adminordermanagement",
//     icon: ShoppingBagIcon,
//   },
// ];

// const classNames = (...classes) => classes.filter(Boolean).join(" ");

// // const NavLink = ({ item, openMenu, toggleMenu }) => {
// //   const hasSubLinks = item.subLinks && item.subLinks.length > 0;
// //   const isCurrent = item.href ? window.location.pathname === item.href : false;
// //   const isActiveParent = hasSubLinks && openMenu === item.name;

// //   const baseClasses =
// //     "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold transition-colors duration-200 cursor-pointer";
// //   const activeClasses = "bg-white/10 text-white";
// //   const inactiveClasses = "text-gray-300 hover:bg-white/10 hover:text-white";

// //   if (!hasSubLinks) {
// //     return (
// //       <li key={item.name}>
// //         <Link
// //           to={item.href}
// //           className={classNames(
// //             isCurrent ? activeClasses : inactiveClasses,
// //             baseClasses,
// //             "w-full"
// //           )}
// //         >
// //           <item.icon aria-hidden="true" className="size-6 shrink-0" />
// //           {item.name}
// //         </Link>
// //       </li>
// //     );
// //   }

// //   return (
// //     <li key={item.name}>
// //       <button
// //         onClick={() => toggleMenu(item.name)}
// //         className={classNames(
// //           isActiveParent ? activeClasses : inactiveClasses,
// //           baseClasses,
// //           "w-full flex justify-between items-center"
// //         )}
// //       >
// //         <div className="flex items-center gap-x-3">
// //           <item.icon aria-hidden="true" className="size-6 shrink-0" />
// //           {item.name}
// //         </div>
// //         <ChevronDownIcon
// //           className={classNames(
// //             "size-5 transition-transform duration-200",
// //             isActiveParent ? "rotate-180" : "rotate-0"
// //           )}
// //         />
// //       </button>

// //       <motion.ul
// //         initial={{ height: 0 }}
// //         animate={{ height: isActiveParent ? "auto" : 0 }}
// //         transition={{ duration: 0.2 }}
// //         className="mt-1 space-y-1 overflow-hidden ml-4 p-1 rounded-md bg-black/20"
// //       >
// //         {item.subLinks.map((subItem) => (
// //           <li key={subItem.name}>
// //             <Link
// //               to={subItem.href}
// //               className="block p-2 text-sm text-gray-400 rounded-md hover:bg-black/30 hover:text-white transition-colors duration-200"
// //             >
// //               {subItem.name}
// //             </Link>
// //           </li>
// //         ))}
// //       </motion.ul>
// //     </li>
// //   );
// // };




// const NavLink = ({ item, openMenu, toggleMenu }) => {
//   const location = useLocation();

//   const hasSubLinks = item.subLinks && item.subLinks.length > 0;

//   // MAIN LINK ACTIVE CHECK
//   const isCurrent = item.href
//     ? location.pathname.startsWith(item.href)
//     : false;

//   // SUBMENU ACTIVE CHECK
//   const isActiveParent =
//     hasSubLinks &&
//     item.subLinks.some((sub) =>
//       location.pathname.startsWith(sub.href)
//     );

//   const baseClasses =
//     "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold transition-colors duration-200 cursor-pointer";
//   const activeClasses = "bg-white/10 text-white";
//   const inactiveClasses = "text-gray-300 hover:bg-white/10 hover:text-white";

//   // 🟢 NORMAL MENU ITEM (no submenu)
//   if (!hasSubLinks) {
//     return (
//       <li key={item.name}>
//         <Link
//           to={item.href}
//           className={classNames(
//             isCurrent ? activeClasses : inactiveClasses,
//             baseClasses,
//             "w-full"
//           )}
//         >
//           <item.icon aria-hidden="true" className="size-6 shrink-0" />
//           {item.name}
//         </Link>
//       </li>
//     );
//   }

//   // 🟢 MENU ITEM WITH SUBMENU
//   return (
//     <li key={item.name}>
//       <button
//         onClick={() => toggleMenu(item.name)}
//         className={classNames(
//           isActiveParent ? activeClasses : inactiveClasses,
//           baseClasses,
//           "w-full flex justify-between items-center"
//         )}
//       >
//         <div className="flex items-center gap-x-3">
//           <item.icon aria-hidden="true" className="size-6 shrink-0" />
//           {item.name}
//         </div>
//         <ChevronDownIcon
//           className={classNames(
//             "size-5 transition-transform duration-200",
//             isActiveParent ? "rotate-180" : "rotate-0"
//           )}
//         />
//       </button>

//       {/* Submenu */}
//       <motion.ul
//         initial={{ height: 0 }}
//         animate={{
//   height: openMenu === item.name || isActiveParent ? "auto" : 0
// }}

//         transition={{ duration: 0.2 }}
//         className="mt-1 space-y-1 overflow-hidden ml-4 p-1 rounded-md bg-black/20"
//       >
//         {item.subLinks.map((sub) => {
//           const isSubActive = location.pathname.startsWith(sub.href);

//           return (
//             <li key={sub.name}>
//              <Link
//   to={sub.href}
//   onClick={(e) => {
//     e.stopPropagation();
//     setOpenMenu(item.name); // keep parent open
//   }}
//   className={classNames(
//     isSubActive
//       ? "bg-white/20 text-white font-medium"
//       : "text-gray-400 hover:bg-white/10 hover:text-white",
//     "block px-3 py-2 rounded-md transition-colors duration-200"
//   )}
// >
//   {sub.name}
// </Link>


//             </li>
//           );
//         })}
//       </motion.ul>
//     </li>
//   );
// };


// // =========================
// // COOKIE-BASED ADMIN PANEL
// // =========================
// export default function Admindashboard() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [openMenu, setOpenMenu] = useState("");
//   const [adminInfo, setAdminInfo] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const { user, checkAuthStatus, logout } = useAuth();


//   const navigate = useNavigate();

//   const toggleMenu = (menuName) => {
//     setOpenMenu(openMenu === menuName ? "" : menuName);
//   };

//   // =========================
//   // LOGOUT USING COOKIES
//   // =========================
//   // Admindashboard.jsx

//  const handleLogout = async () => {
//   setAdminInfo(null);

//   try {
//     await api.post(
//       "/auth/logout",
//       {},
//       { withCredentials: true }
//     );
//   } catch (error) {
//     console.error("Logout failed:", error);
//   }

//   logout(); // ✅ correct function
//   navigate("/login", { replace: true });
// };


//   // =========================
//   // FETCH ADMIN PROFILE
//   // =========================
//   const fetchAdminProfile = async () => {
//     setIsLoading(true);
//     try {
//       const res = await api.get("/admin/adminProfile"); // cookie sent automatically

//       const data = res.data.adminData;

//       setAdminInfo({
//         name: data.username || data.name || "Administrator",
//         role: data.role || "Admin",
//       });
//     } catch (err) {
//       console.error("Admin auth failed:", err);
//       navigate("/login", { replace: true }); // cookie expired → go login
//     } finally {
//       setIsLoading(false);
//     }
//   };

  

//   // RUN ON MOUNT
//   useEffect(() => {
//     fetchAdminProfile();
//   }, []);

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen w-full bg-gray-50">
//         <ClipLoader color="#343e32" size={35} />
//       </div>
//     );
//   }

//   // =========================
//   // RENDER (UI UNCHANGED)
//   // =========================
//   return (
//     <>
//       <div>
//         {/* Mobile Sidebar */}
//         <Dialog
//           open={sidebarOpen}
//           onClose={setSidebarOpen}
//           className="relative z-50 lg:hidden"
//         >
//           <DialogBackdrop
//             transition
//             className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
//           />

//           <div className="fixed inset-0 flex">
//             <DialogPanel
//               transition
//               className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
//             >
//               <TransitionChild>
//                 <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
//                   <button
//                     type="button"
//                     onClick={() => setSidebarOpen(false)}
//                     className="-m-2.5 p-2.5"
//                   >
//                     <span className="sr-only">Close sidebar</span>
//                     <XMarkIcon
//                       aria-hidden="true"
//                       className="size-6 text-white"
//                     />
//                   </button>
//                 </div>
//               </TransitionChild>

//               <div className="relative flex grow flex-col gap-y-5 overflow-y-auto bg-gradient-to-r from-gray-900 to-gray-800  px-6 pb-4 ring-1 ring-white/10">
//                 <div className="relative flex h-16 shrink-0 items-center ">
//                   <img
//                     src='logo.png'
//                     alt="Mandaram Drapes Logo"
//                     className="h-25 "
//                   />
//                 </div>

//                 <nav className="relative flex flex-1 flex-col">
//                   <ul role="list" className="flex flex-1 flex-col gap-y-7">
//                     <li>
//                       <ul role="list" className="-mx-2 space-y-1">
//                         {adminNavigation.map((item) => (
//                           <NavLink
//                             key={item.name}
//                             item={item}
//                             openMenu={openMenu}
//                             toggleMenu={toggleMenu}
//                              setOpenMenu={setOpenMenu}
//                           />
//                         ))}
//                       </ul>
//                     </li>
//                     <a
//                       onClick={handleLogout}
//                       className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-white/10 hover:text-white mt-auto cursor-pointer"
//                     >
//                       <ShoppingBagIcon
//                         aria-hidden="true"
//                         className="size-6 shrink-0"
//                       />
//                       Logout
//                     </a>
//                   </ul>
//                 </nav>
//               </div>
//             </DialogPanel>
//           </div>
//         </Dialog>

//         {/* Desktop Sidebar bg-[#343e32] */} 
//         <div className="hidden  bg-gradient-to-r from-gray-900 to-gray-800 text-white lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
//           <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 pb-4">
//             <div className="flex h-16 shrink-0 items-center">
//               <img
//                 src={logo123}
//                 alt="Mandaram Drapes Logo"
//                 className="h-10 w-auto"
//               />
//             </div>

//             <nav className="flex flex-1 flex-col">
//               <ul role="list" className="flex flex-1 flex-col gap-y-7">
//                 <li>
//                   <ul role="list" className="-mx-2 space-y-1">
//                     {adminNavigation.map((item) => (
//                       <NavLink
//                         key={item.name}
//                         item={item}
//                         openMenu={openMenu}
//                         toggleMenu={toggleMenu}
//                       />
//                     ))}
//                   </ul>
//                 </li>

//                 <li className="mt-auto">
//                   <a
//                     onClick={handleLogout}
//                     className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer"
//                   >
//                     <ShoppingBagIcon
//                       aria-hidden="true"
//                       className="size-6 shrink-0"
//                     />
//                     Logout
//                   </a>
//                 </li>
//               </ul>
//             </nav>
//           </div>
//         </div>

//         {/* Top Navbar */}
//         <div className="lg:pl-72">
//           <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-xs sm:gap-x-6 sm:px-6 lg:px-8">
//             <button
//               type="button"
//               onClick={() => setSidebarOpen(true)}
//               className="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900 lg:hidden"
//             >
//               <Bars3Icon aria-hidden="true" className="size-6" />
//             </button>

//             <div
//               aria-hidden="true"
//               className="h-6 w-px bg-gray-900/10 lg:hidden"
//             />

//             <div className="flex flex-1 justify-end self-stretch">
//               <div className="flex items-center gap-x-4 lg:gap-x-6">
//                 <div
//                   aria-hidden="true"
//                   className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
//                 />

//                 <Menu as="div" className="relative">
//                   <MenuButton className="relative flex items-center">
//                     <span className="absolute -inset-1.5" />
//                     <span className="sr-only">Open user menu</span>

//                     <FaUserCircle size={28} className="text-gray-700" />

//                     <span className="hidden lg:flex lg:items-center">
//                       <span
//                         aria-hidden="true"
//                         className="ml-4 text-sm/6 font-semibold text-gray-900"
//                       >
//                         {adminInfo?.name || "Administrator"}
//                       </span>
//                       <ChevronDownIcon
//                         aria-hidden="true"
//                         className="ml-2 size-5 text-gray-400"
//                       />
//                     </span>
//                   </MenuButton>

//                   <MenuItems
//   transition
//   className="absolute right-0 z-10 mt-2.5 w-48 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition"
// >
//   <MenuItem>
//     <Link
//       to="/admindashboard/profile"
//       className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
//     >
//       View Profile
//     </Link>
//   </MenuItem>

//   <MenuItem>
//     <a
//       onClick={handleLogout}
//       className="block px-3 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
//     >
//       Sign out
//     </a>
//   </MenuItem>
// </MenuItems>

//                 </Menu>
//               </div>
//             </div>
//           </div>

//           {/* Main Content */}
//           <main>
//             <div>
//               <Outlet />
//             </div>
//           </main>
//         </div>
//       </div>
//     </>
//   );
// }




"use client";

import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";
import { FaUserCircle } from "react-icons/fa";
import api from "../utils/api";
import { domainUrl } from "../utils/constant";
import logo123 from "../assets/logo.png";
import { useLocation } from "react-router-dom";
import { BellIcon } from "@heroicons/react/24/outline";
import { useNotifications } from "../context/NotificationContext";
import NotificationSlideOver from "../components/NotificationSlideOver";





import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from "@headlessui/react";

import {
  Bars3Icon,
  HomeIcon,
  XMarkIcon,
  UsersIcon,
  TagIcon,
  CubeTransparentIcon,
  ShoppingBagIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../context/AuthContext";

// ADMIN NAVIGATION (UI unchanged)
const adminNavigation = [
  { name: "Dashboard", href: "/admindashboard", icon: HomeIcon },
  {
    name: "User Management",
    icon: UsersIcon,
    subLinks: [
      { name: "Add User", href: "/admindashboard/manageuser/adduser" },
      { name: "List Users", href: "/admindashboard/manageuser/listusers" },
    ],
  },
  {
    name: "Category Management",
    icon: TagIcon,
    subLinks: [
      {
        name: "Add Category",
        href: "/admindashboard/managecategories/addcategory",
      },
      {
        name: "List Categories",
        href: "/admindashboard/managecategories/listcategory",
      },
    ],
  },
  {
    name: "Product Management",
    icon: CubeTransparentIcon,
    subLinks: [
      {
        name: "Add Products",
        href: "/admindashboard/manageproducts/addproducts",
      },
      {
        name: "List Products",
        href: "/admindashboard/manageproducts/listproducts",
      },
    ],
  },
  {
    name: "Order Management",
    href: "/admindashboard/adminordermanagement",
    icon: ShoppingBagIcon,
  },
];

const classNames = (...classes) => classes.filter(Boolean).join(" ");

// const NavLink = ({ item, openMenu, toggleMenu }) => {
//   const hasSubLinks = item.subLinks && item.subLinks.length > 0;
//   const isCurrent = item.href ? window.location.pathname === item.href : false;
//   const isActiveParent = hasSubLinks && openMenu === item.name;

//   const baseClasses =
//     "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold transition-colors duration-200 cursor-pointer";
//   const activeClasses = "bg-white/10 text-white";
//   const inactiveClasses = "text-gray-300 hover:bg-white/10 hover:text-white";

//   if (!hasSubLinks) {
//     return (
//       <li key={item.name}>
//         <Link
//           to={item.href}
//           className={classNames(
//             isCurrent ? activeClasses : inactiveClasses,
//             baseClasses,
//             "w-full"
//           )}
//         >
//           <item.icon aria-hidden="true" className="size-6 shrink-0" />
//           {item.name}
//         </Link>
//       </li>
//     );
//   }

//   return (
//     <li key={item.name}>
//       <button
//         onClick={() => toggleMenu(item.name)}
//         className={classNames(
//           isActiveParent ? activeClasses : inactiveClasses,
//           baseClasses,
//           "w-full flex justify-between items-center"
//         )}
//       >
//         <div className="flex items-center gap-x-3">
//           <item.icon aria-hidden="true" className="size-6 shrink-0" />
//           {item.name}
//         </div>
//         <ChevronDownIcon
//           className={classNames(
//             "size-5 transition-transform duration-200",
//             isActiveParent ? "rotate-180" : "rotate-0"
//           )}
//         />
//       </button>

//       <motion.ul
//         initial={{ height: 0 }}
//         animate={{ height: isActiveParent ? "auto" : 0 }}
//         transition={{ duration: 0.2 }}
//         className="mt-1 space-y-1 overflow-hidden ml-4 p-1 rounded-md bg-black/20"
//       >
//         {item.subLinks.map((subItem) => (
//           <li key={subItem.name}>
//             <Link
//               to={subItem.href}
//               className="block p-2 text-sm text-gray-400 rounded-md hover:bg-black/30 hover:text-white transition-colors duration-200"
//             >
//               {subItem.name}
//             </Link>
//           </li>
//         ))}
//       </motion.ul>
//     </li>
//   );
// };




const NavLink = ({ item, openMenu, toggleMenu }) => {
  const location = useLocation();

  const hasSubLinks = item.subLinks && item.subLinks.length > 0;

  // MAIN LINK ACTIVE CHECK
  const isCurrent = item.href
    ? location.pathname.startsWith(item.href)
    : false;

  // SUBMENU ACTIVE CHECK
  const isActiveParent =
    hasSubLinks &&
    item.subLinks.some((sub) =>
      location.pathname.startsWith(sub.href)
    );

  const baseClasses =
    "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold transition-colors duration-200 cursor-pointer";
  const activeClasses = "bg-white/10 text-white";
  const inactiveClasses = "text-gray-300 hover:bg-white/10 hover:text-white";

  // 🟢 NORMAL MENU ITEM (no submenu)
  if (!hasSubLinks) {
    return (
      <li key={item.name}>
        <Link
          to={item.href}
          className={classNames(
            isCurrent ? activeClasses : inactiveClasses,
            baseClasses,
            "w-full"
          )}
        >
          <item.icon aria-hidden="true" className="size-6 shrink-0" />
          {item.name}
        </Link>
      </li>
    );
  }

  // 🟢 MENU ITEM WITH SUBMENU
  return (
    <li key={item.name}>
      <button
        onClick={() => toggleMenu(item.name)}
        className={classNames(
          isActiveParent ? activeClasses : inactiveClasses,
          baseClasses,
          "w-full flex justify-between items-center"
        )}
      >
        <div className="flex items-center gap-x-3">
          <item.icon aria-hidden="true" className="size-6 shrink-0" />
          {item.name}
        </div>
        <ChevronDownIcon
          className={classNames(
            "size-5 transition-transform duration-200",
            isActiveParent ? "rotate-180" : "rotate-0"
          )}
        />
      </button>

      {/* Submenu */}
      <motion.ul
        initial={{ height: 0 }}
        animate={{
  height: openMenu === item.name || isActiveParent ? "auto" : 0
}}

        transition={{ duration: 0.2 }}
        className="mt-1 space-y-1 overflow-hidden ml-4 p-1 rounded-md bg-black/20"
      >
        {item.subLinks.map((sub) => {
          const isSubActive = location.pathname.startsWith(sub.href);

          return (
            <li key={sub.name}>
             <Link
  to={sub.href}
  onClick={(e) => {
    e.stopPropagation();
    setOpenMenu(item.name); // keep parent open
  }}
  className={classNames(
    isSubActive
      ? "bg-white/20 text-white font-medium"
      : "text-gray-400 hover:bg-white/10 hover:text-white",
    "block px-3 py-2 rounded-md transition-colors duration-200"
  )}
>
  {sub.name}
</Link>


            </li>
          );
        })}
      </motion.ul>
    </li>
  );
};


// =========================
// COOKIE-BASED ADMIN PANEL
// =========================
export default function Admindashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState("");
  const [adminInfo, setAdminInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, checkAuthStatus, logout } = useAuth();
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);




  const navigate = useNavigate();

  const toggleMenu = (menuName) => {
    setOpenMenu(openMenu === menuName ? "" : menuName);
  };

  // =========================
  // LOGOUT USING COOKIES
  // =========================
  // Admindashboard.jsx

 const handleLogout = async () => {
  setAdminInfo(null);

  try {
    await api.post(
      "/auth/logout",
      {},
      { withCredentials: true }
    );
  } catch (error) {
    console.error("Logout failed:", error);
  }

  logout(); // ✅ correct function
  navigate("/login", { replace: true });
};


  // =========================
  // FETCH ADMIN PROFILE
  // =========================
  const fetchAdminProfile = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/admin/adminProfile"); // cookie sent automatically

      const data = res.data.adminData;

      setAdminInfo({
        name: data.username || data.name || "Administrator",
        role: data.role || "Admin",
      });
    } catch (err) {
      console.error("Admin auth failed:", err);
      navigate("/login", { replace: true }); // cookie expired → go login
    } finally {
      setIsLoading(false);
    }
  };

  

  // RUN ON MOUNT
  useEffect(() => {
    fetchAdminProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-gray-50">
        <ClipLoader color="#343e32" size={35} />
      </div>
    );
  }

  // =========================
  // RENDER (UI UNCHANGED)
  // =========================
  return (
    <>
    
      <div>
        {/* Mobile Sidebar */}
        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className="relative z-50 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="-m-2.5 p-2.5"
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      aria-hidden="true"
                      className="size-6 text-white"
                    />
                  </button>
                </div>
              </TransitionChild>

              <div className="relative flex grow flex-col gap-y-5 overflow-y-auto bg-gradient-to-r from-gray-900 to-gray-800  px-6 pb-4 ring-1 ring-white/10">
                <div className="relative flex h-16 shrink-0 items-center ">
                  <img
                    src='logo.png'
                    alt="Mandaram Drapes Logo"
                    className="h-25 "
                  />
                </div>

                <nav className="relative flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {adminNavigation.map((item) => (
                          <NavLink
                            key={item.name}
                            item={item}
                            openMenu={openMenu}
                            toggleMenu={toggleMenu}
                             setOpenMenu={setOpenMenu}
                          />
                        ))}
                      </ul>
                    </li>
                    <a
                      onClick={handleLogout}
                      className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-white/10 hover:text-white mt-auto cursor-pointer"
                    >
                      <ShoppingBagIcon
                        aria-hidden="true"
                        className="size-6 shrink-0"
                      />
                      Logout
                    </a>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Desktop Sidebar bg-[#343e32] */} 
        <div className="hidden  bg-gradient-to-r from-gray-900 to-gray-800 text-white lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <img
                src={logo123}
                alt="Mandaram Drapes Logo"
                className="h-10 w-auto"
              />
            </div>

            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {adminNavigation.map((item) => (
                      <NavLink
                        key={item.name}
                        item={item}
                        openMenu={openMenu}
                        toggleMenu={toggleMenu}
                      />
                    ))}
                  </ul>
                </li>

                <li className="mt-auto">
                  <a
                    onClick={handleLogout}
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer"
                  >
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="size-6 shrink-0"
                    />
                    Logout
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Top Navbar */}
        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-xs sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900 lg:hidden"
            >
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>

            <div
              aria-hidden="true"
              className="h-6 w-px bg-gray-900/10 lg:hidden"
            />

            <div className="flex flex-1 justify-end self-stretch">
              <div className="flex items-center gap-x-4 lg:gap-x-6">


                <div className="relative">



  {/* <button
  onClick={() => setIsNotificationOpen(true)}
  className="relative p-2 text-gray-600 hover:text-black"
>
  <BellIcon className="h-6 w-6" />

  {unreadCount > 0 && (
    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1.5">
      {unreadCount}
    </span>
  )}
</button> */}


  {/* {open && (
    <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-md border z-50">
      <div className="p-3 font-semibold border-b">
        Notifications
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 && (
          <p className="p-3 text-sm text-gray-500">
            No notifications
          </p>
        )}

        {notifications.map((n) => (
          <div
            key={n._id}
            onClick={() => {
              markAsRead(n._id);
              if (n.orderId) {
                navigate(`/admindashboard/adminordermanagement/${n.orderId}`);
              }
              setOpen(false);
            }}
            className={`p-3 cursor-pointer text-sm border-b hover:bg-gray-100 ${
              !n.isRead ? "bg-gray-50 font-medium" : ""
            }`}
          >
            {n.message}
          </div>
        ))}
      </div>
    </div>
  )} */}
</div>

                <div
                  aria-hidden="true"
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                />

                <Menu as="div" className="relative">
                  <MenuButton className="relative flex items-center">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>

                    <FaUserCircle size={28} className="text-gray-700" />

                    <span className="hidden lg:flex lg:items-center">
                      <span
                        aria-hidden="true"
                        className="ml-4 text-sm/6 font-semibold text-gray-900"
                      >
                        {adminInfo?.name || "Administrator"}
                      </span>
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="ml-2 size-5 text-gray-400"
                      />
                    </span>
                  </MenuButton>

                  <MenuItems
  transition
  className="absolute right-0 z-10 mt-2.5 w-48 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition"
>
  <MenuItem>
    <Link
      to="/admindashboard/profile"
      className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
    >
      View Profile
    </Link>
  </MenuItem>

  <MenuItem>
    <a
      onClick={handleLogout}
      className="block px-3 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
    >
      Sign out
    </a>
  </MenuItem>
</MenuItems>

                </Menu>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <main>
            <div>
              <Outlet />
            </div>
          </main>
        </div>
        <NotificationSlideOver
  open={isNotificationOpen}
  onClose={() => setIsNotificationOpen(false)}
/>

      </div>
      
    </>
  );
}
