// import React, { useState } from "react";
// import { Link, Outlet } from "react-router-dom";

// const Admindashboard = () => {
//   const [openMenu, setOpenMenu] = useState(""); 

//   // toggle function
//   const toggleMenu = (menuName) => {
//     setOpenMenu(openMenu === menuName ? "" : menuName);
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <div className="bg-[#343e32] text-white p-4 w-64 flex flex-col text-sm fixed h-screen">
//         {/* Logo */}
//         <div className="flex flex-col items-center pb-4 border-b border-gray-600">
//           <img className="w-20 h-20" src="logo123.png" alt="Logo" />
//         </div>

//         {/* Menu Items */}
//         <ul className="mt-8 space-y-1">
//           <Link to="/admindashboard">
//             <li className="hover:bg-[#5a6d57] p-2 rounded">Home</li>
//           </Link>

//           {/* Manage Users */}
//           <li>
//             <button
//               onClick={() => toggleMenu("users")}
//               className={`w-full text-left p-2 rounded transition-colors duration-200 ${
//               openMenu === "users" ? "bg-[#5a6d57]" : "hover:bg-[#5a6d57]"
//               }`}
//             >
//               Manage Users
//             </button>
//             <div
//               className={`ml-4 transition-all duration-300 overflow-hidden ${
//                 openMenu === "users" ? "max-h-40 mt-1" : "max-h-0"
//               }`}
//             >
//               <ul className="space-y-1 text-xs">
//                 <Link to="/admindashboard/manageuser/adduser">
//                   <li className="hover:bg-[#5a6d57] p-2 rounded">Add Users</li>
//                 </Link>
//                 <Link to="/admindashboard/manageuser/listusers">
//                   <li className="hover:bg-[#5a6d57] p-2 rounded">List Users</li>
//                 </Link>
//               </ul>
//             </div>
//           </li>

//           {/* Manage Category */}
//           <li>
//             <button
//               onClick={() => toggleMenu("category")}
//               className="w-full text-left hover:bg-[#5a6d57] p-2 rounded"
//             >
//               Manage Category
//             </button>
//             <div
//               className={`ml-4 transition-all duration-300 overflow-hidden ${
//                 openMenu === "category" ? "max-h-48 mt-1" : "max-h-0"
//               }`}
//             >
//               <ul className="space-y-1 text-xs">
//                 <Link to="/admindashboard/managecategories/addcategory">
//                   <li className="hover:bg-[#5a6d57] p-2 rounded">Add Categories</li>
//                 </Link>
//                 {/* <Link to="/admindashboard/managecategories/updatecategory">
//                   <li className="hover:bg-[#5a6d57] p-2 rounded">Update Categories</li>
//                 </Link> */}
//                 <Link to="/admindashboard/managecategories/listcategory">
//                   <li className="hover:bg-[#5a6d57] p-2 rounded">List Categories</li>
//                 </Link>
//                 {/* <Link to="/admindashboard/managecategories/deletecategory">
//                   <li className="hover:bg-[#5a6d57] p-2 rounded">Delete Categories</li>
//                 </Link> */}
                
//               </ul>
//             </div>
//           </li>

//           {/* Manage Products */}
//           <li>
//             <button
//               onClick={() => toggleMenu("products")}
              
//               className="w-full text-left hover:bg-[#5a6d57] p-2 rounded"
//             >
//               Manage Products
//             </button>
//             <div
//               className={`ml-4 transition-all duration-300 overflow-hidden ${
//                 openMenu === "products" ? "max-h-48 mt-1" : "max-h-0"
//               }`}
//             >
//               <ul className="space-y-1 text-xs">
//                 <Link to="/admindashboard/manageproducts/addproducts">
//                   <li className="hover:bg-[#5a6d57] p-2 rounded">Add Products</li>
//                 </Link>
//                 {/* <Link to="/admindashboard/manageproducts/updateproduct">
//                   <li className="hover:bg-[#5a6d57] p-2 rounded">Update Products</li>
//                 </Link>
//                 <Link to="/admindashboard/manageproducts/deleteproduct">
//                   <li className="hover:bg-[#5a6d57] p-2 rounded">Delete Products</li>
//                 </Link> */}
//                 <Link to="/admindashboard/manageproducts/listproducts">
//                   <li className="hover:bg-[#5a6d57] p-2 rounded">List Products</li>
//                 </Link>
//               </ul>
//             </div>
//           </li>

//           {/* Order Management */}
//           <li className="hover:bg-[#5a6d57] p-2 rounded cursor-pointer">
//             Order Management
//           </li>
//         </ul>

//         {/* Logout */}
//         <div className="p-2 hover:bg-[#5a6d57] cursor-pointer mt-auto border-t border-gray-600">
//           Logout
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col ml-64 p-6">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default Admindashboard;



// import React, { useState, useEffect } from "react";
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import { FaUserCircle } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";

// const Admindashboard = () => {
//   const [openMenu, setOpenMenu] = useState("");
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [adminInfo, setAdminInfo] = useState(null);
//   const navigate = useNavigate();

//   // Load admin info from localStorage
//   useEffect(() => {
//     const data = localStorage.getItem("admin");
//     if (data) {
//       setAdminInfo(JSON.parse(data));
//     } else {
//       navigate("/"); // redirect if not logged in
//     }
//   }, [navigate]);

//   // Toggle side menus
//   const toggleMenu = (menuName) => {
//     setOpenMenu(openMenu === menuName ? "" : menuName);
//   };

//   // Logout function
//   const handleLogout = () => {
//     localStorage.removeItem("admin");
//     navigate("/login");
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <div className="bg-[#343e32] text-white p-4 w-64 flex flex-col text-sm fixed h-screen">
//         {/* Logo */}
//         <div className="flex flex-col items-center pb-4 border-b border-gray-600">
//           <img className="w-20 h-20" src="logo123.png" alt="Logo" />
//         </div>

//         {/* Menu Items */}
//         <ul className="mt-8 space-y-1">
//           <Link to="/admindashboard">
//             <li className="hover:bg-[#5a6d57] p-2 rounded">Home</li>
//           </Link>

//           {/* Manage Users */}
//           <li>
//             <button
//               onClick={() => toggleMenu("users")}
//               className={`w-full text-left p-2 rounded transition-colors duration-200 ${
//                 openMenu === "users" ? "bg-[#5a6d57]" : "hover:bg-[#5a6d57]"
//               }`}
//             >
//               Manage Users
//             </button>
//             <div
//               className={`ml-4 transition-all duration-300 overflow-hidden ${
//                 openMenu === "users" ? "max-h-40 mt-1" : "max-h-0"
//               }`}
//             >
//               <ul className="space-y-1 text-xs">
//                 <Link to="/admindashboard/manageuser/adduser">
//                   <li className="hover:bg-[#5a6d57] p-2 rounded">Add Users</li>
//                 </Link>
//                 <Link to="/admindashboard/manageuser/listusers">
//                   <li className="hover:bg-[#5a6d57] p-2 rounded">List Users</li>
//                 </Link>
//               </ul>
//             </div>
//           </li>

//           {/* Manage Category */}
//           <li>
//             <button
//               onClick={() => toggleMenu("category")}
//               className="w-full text-left hover:bg-[#5a6d57] p-2 rounded"
//             >
//               Manage Category
//             </button>
//             <div
//               className={`ml-4 transition-all duration-300 overflow-hidden ${
//                 openMenu === "category" ? "max-h-48 mt-1" : "max-h-0"
//               }`}
//             >
//               <ul className="space-y-1 text-xs">
//                 <Link to="/admindashboard/managecategories/addcategory">
//                   <li className="hover:bg-[#5a6d57] p-2 rounded">
//                     Add Categories
//                   </li>
//                 </Link>
//                 <Link to="/admindashboard/managecategories/listcategory">
//                   <li className="hover:bg-[#5a6d57] p-2 rounded">
//                     List Categories
//                   </li>
//                 </Link>
//               </ul>
//             </div>
//           </li>

//           {/* Manage Products */}
//           <li>
//             <button
//               onClick={() => toggleMenu("products")}
//               className="w-full text-left hover:bg-[#5a6d57] p-2 rounded"
//             >
//               Manage Products
//             </button>
//             <div
//               className={`ml-4 transition-all duration-300 overflow-hidden ${
//                 openMenu === "products" ? "max-h-48 mt-1" : "max-h-0"
//               }`}
//             >
//               <ul className="space-y-1 text-xs">
//                 <Link to="/admindashboard/manageproducts/addproducts">
//                   <li className="hover:bg-[#5a6d57] p-2 rounded">
//                     Add Products
//                   </li>
//                 </Link>
//                 <Link to="/admindashboard/manageproducts/listproducts">
//                   <li className="hover:bg-[#5a6d57] p-2 rounded">
//                     List Products
//                   </li>
//                 </Link>
//               </ul>
//             </div>
//           </li>

//           {/* Order Management */}
//           <Link to="">
//            <li className="hover:bg-[#5a6d57] p-2 rounded cursor-pointer">
//             Order Management
//           </li>
//           </Link>
         
//         </ul>

//         {/* Logout */}
//         <div
//           onClick={handleLogout}
//           className="p-2 hover:bg-[#5a6d57] cursor-pointer mt-auto border-t border-gray-600"
//         >
//           Logout
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col ml-64">
//         {/* Top Navbar */}
//         <div className="flex justify-end items-center bg-gray-100 p-4 shadow-md relative">
//           <div
//             className="flex items-center space-x-2 cursor-pointer select-none"
//             onClick={() => setDropdownOpen(!dropdownOpen)}
//           >
//             <FaUserCircle size={28} className="text-gray-700" />
//             <span className="text-gray-800 text-sm font-medium">
//               {adminInfo?.name || "Admin"}
//             </span>
//           </div>

//           {/* Animated Dropdown */}
//           <AnimatePresence>
//             {dropdownOpen && (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9, y: -10 }}
//                 animate={{ opacity: 1, scale: 1, y: 0 }}
//                 exit={{ opacity: 0, scale: 0.9, y: -10 }}
//                 transition={{ duration: 0.2 }}
//                 className="absolute right-4 top-14 bg-white rounded-md shadow-lg border text-sm w-52 p-3 origin-top-right"
//               >
//                 <p className="font-semibold border-b pb-1">
//                   {adminInfo?.name}
//                 </p>
//                 <p className="text-gray-600 text-xs">{adminInfo?.email}</p>
//                 <p className="text-gray-500 text-xs mt-1 mb-3">
//                   Role: {adminInfo?.role}
//                 </p>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full bg-red-500 text-white py-1 rounded hover:bg-red-600 transition-all"
//                 >
//                   Logout
//                 </button>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Main Outlet */}
//         <div className="p-6 flex-1 overflow-y-auto bg-gray-50">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Admindashboard;


// import React, { useState, useEffect } from "react";
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import { FaUserCircle } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";

// const Admindashboard = () => {
//   const [openMenu, setOpenMenu] = useState("");
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [adminInfo, setAdminInfo] = useState(null); // Will now store role/name/email directly
//   const navigate = useNavigate();

//   // Load and validate admin info from localStorage
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const role = localStorage.getItem("role");
    
//     // --- 🔑 Admin Protection Logic ---
//     if (!token || role !== "admin") {
//       // 1. Clear any inconsistent storage
//       localStorage.removeItem("token");
//       localStorage.removeItem("role");
      
//       // 2. Redirect non-admins to the login page (or home)
//       navigate("/login", { replace: true }); 
//       return; 
//     }
//     // --- End Protection Logic ---

//     // NOTE: Since the full admin object (name/email) wasn't stored, 
//     // we set a placeholder based on what we know.
//     // Ideally, the Login component should store the full user object if you need name/email.
//     // For now, let's assume the admin has been successfully logged in and stored the role.
//     // If your Login API returned and stored the name, you would retrieve it here.
    
//     // Assuming you need to fetch the admin's name/email after successful login:
//     // For now, we'll use a placeholder until you can pass the admin object.
//     setAdminInfo({
//         name: "Admin User", // Replace with a fetch call if needed
//         role: role,
//     });
    
//   }, [navigate]);

//   // Toggle side menus (rest of the logic is fine)
//   const toggleMenu = (menuName) => {
//     setOpenMenu(openMenu === menuName ? "" : menuName);
//   };

//   // Logout function
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role"); // Clear both keys
//     setAdminInfo(null);
//     navigate("/login");
//   };
  
//   // Guard clause to prevent rendering sensitive content while redirecting
//   if (!adminInfo) {
//     return null; // Or return a simple loading spinner
//   }

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <div className="bg-[#343e32] text-white p-4 w-64 flex flex-col text-sm fixed h-screen">
//         {/* ... (Sidebar content remains the same) ... */}
//       </div>

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col ml-64">
//         {/* Top Navbar */}
//         <div className="flex justify-end items-center bg-gray-100 p-4 shadow-md relative">
//           <div
//             className="flex items-center space-x-2 cursor-pointer select-none"
//             onClick={() => setDropdownOpen(!dropdownOpen)}
//           >
//             <FaUserCircle size={28} className="text-gray-700" />
//             <span className="text-gray-800 text-sm font-medium">
//               {/* Use adminInfo.name if available, otherwise "Admin" */}
//               {adminInfo?.name || "Admin"}
//             </span>
//           </div>

//           {/* Animated Dropdown */}
//           <AnimatePresence>
//             {dropdownOpen && (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9, y: -10 }}
//                 animate={{ opacity: 1, scale: 1, y: 0 }}
//                 exit={{ opacity: 0, scale: 0.9, y: -10 }}
//                 transition={{ duration: 0.2 }}
//                 className="absolute right-4 top-14 bg-white rounded-md shadow-lg border text-sm w-52 p-3 origin-top-right"
//               >
//                 <p className="font-semibold border-b pb-1">
//                   {adminInfo?.name || "Admin User"}
//                 </p>
//                 {/* <p className="text-gray-600 text-xs">{adminInfo?.email}</p> // Email likely missing without a fetch */}
//                 <p className="text-gray-500 text-xs mt-1 mb-3">
//                   Role: {adminInfo?.role}
//                 </p>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full bg-red-500 text-white py-1 rounded hover:bg-red-600 transition-all"
//                 >
//                   Logout
//                 </button>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Main Outlet */}
//         <div className="p-6 flex-1 overflow-y-auto bg-gray-50">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Admindashboard;


// import React, { useState, useEffect } from "react";
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import { FaUserCircle } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import { ClipLoader } from "react-spinners"; // Ensure you import ClipLoader if you use it

// const Admindashboard = () => {
//   const [openMenu, setOpenMenu] = useState("");
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [adminInfo, setAdminInfo] = useState(null);
//   const [isLoading, setIsLoading] = useState(true); // 👈 NEW: State to track loading/validation
//   const navigate = useNavigate();

//   // Load and validate admin info from localStorage
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const role = localStorage.getItem("role");

//     // --- 🔑 Admin Protection Logic ---
//     if (!token || role !== "admin") {
//       // 1. If not logged in OR role is not 'admin', clear and redirect
//       localStorage.removeItem("token");
//       localStorage.removeItem("role");
      
//       // Navigate to /login (or / for customer home)
//       navigate("/login", { replace: true });
//       return; // Stop execution of the rest of the useEffect
//     }

//     // 2. Data Retrieval (Only runs if the protection check passes)
//     // IMPORTANT: Since your Login component only stores token and role, 
//     // we set a basic info object. If your API stored the full user object, 
//     // you would fetch or retrieve it here.
    
//     // For now, setting a basic info object based on existing data
//     // Assuming you don't store the full JSON object under a single key.
//     setAdminInfo({
//         name: "Admin User", // Placeholder until you store the name on login
//         role: role,
//     });
    
//     // 3. Mark loading complete
//     setIsLoading(false); 
    
//   }, [navigate]);

//   // Toggle side menus
//   const toggleMenu = (menuName) => {
//     setOpenMenu(openMenu === menuName ? "" : menuName);
//   };

//   // Logout function
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role"); 
//     setAdminInfo(null);
//     setDropdownOpen(false); // Close dropdown on logout
//     navigate("/login");
//   };
  
//   // 🛡️ Guard Clause: Show loading spinner until validation is complete
//   if (isLoading) {
//     return (
//         // Position the spinner correctly in the viewport
//         <div className="flex items-center justify-center h-screen w-full bg-gray-50">
//             <ClipLoader color="#343e32" size={35} />
//         </div>
//     );
//   }
  
//   // If validation failed, the useEffect already redirected, so this part won't run.
//   // If validation passed (isLoading is false), render the full dashboard:

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <div className="bg-[#343e32] text-white p-4 w-64 flex flex-col text-sm fixed h-screen">
//         {/* Logo */}
//         <div className="flex flex-col items-center pb-4 border-b border-gray-600">
//           <img className="w-20 h-20" src="logo123.png" alt="Logo" />
//         </div>

//         {/* Menu Items */}
//         <ul className="mt-8 space-y-1">
//           <Link to="/admindashboard">
//             <li className="hover:bg-[#5a6d57] p-2 rounded">Home</li>
//           </Link>

//           {/* Manage Users */}
//           <li>
//             <button
//               onClick={() => toggleMenu("users")}
//               className={`w-full text-left p-2 rounded transition-colors duration-200 ${
//                 openMenu === "users" ? "bg-[#5a6d57]" : "hover:bg-[#5a6d57]"
//               }`}
//             >
//               Manage Users
//             </button>
//             <div
//               className={`ml-4 transition-all duration-300 overflow-hidden ${
//                 openMenu === "users" ? "max-h-40 mt-1" : "max-h-0"
//               }`}
//             >
//               <ul className="space-y-1 text-xs">
//                 <Link to="/admindashboard/manageuser/adduser">
//                   <li className="hover:bg-[#5a6d57] p-2 rounded">Add Users</li>
//                 </Link>
//                 <Link to="/admindashboard/manageuser/listusers">
//                   <li className="hover:bg-[#5a6d57] p-2 rounded">List Users</li>
//                 </Link>
//               </ul>
//             </div>
//           </li>

//           {/* Manage Category */}
//           <li>
//             <button
//               onClick={() => toggleMenu("category")}
//               className="w-full text-left hover:bg-[#5a6d57] p-2 rounded"
//             >
//               Manage Category
//             </button>
//             <div
//               className={`ml-4 transition-all duration-300 overflow-hidden ${
//                 openMenu === "category" ? "max-h-48 mt-1" : "max-h-0"
//               }`}
//             >
//               <ul className="space-y-1 text-xs">
//                 <Link to="/admindashboard/managecategories/addcategory">
//                   <li className="hover:bg-[#5a6d57] p-2 rounded">
//                     Add Categories
//                   </li>
//                 </Link>
//                 <Link to="/admindashboard/managecategories/listcategory">
//                   <li className="hover:bg-[#5a6d57] p-2 rounded">
//                     List Categories
//                   </li>
//                 </Link>
//               </ul>
//             </div>
//           </li>

//           {/* Manage Products */}
//           <li>
//             <button
//               onClick={() => toggleMenu("products")}
//               className="w-full text-left hover:bg-[#5a6d57] p-2 rounded"
//             >
//               Manage Products
//             </button>
//             <div
//               className={`ml-4 transition-all duration-300 overflow-hidden ${
//                 openMenu === "products" ? "max-h-48 mt-1" : "max-h-0"
//               }`}
//             >
//               <ul className="space-y-1 text-xs">
//                 <Link to="/admindashboard/manageproducts/addproducts">
//                   <li className="hover:bg-[#5a6d57] p-2 rounded">
//                     Add Products
//                   </li>
//                 </Link>
//                 <Link to="/admindashboard/manageproducts/listproducts">
//                   <li className="hover:bg-[#5a6d57] p-2 rounded">
//                     List Products
//                   </li>
//                 </Link>
//               </ul>
//             </div>
//           </li>

//           {/* Order Management */}
//           <Link to="adminordermanagement">
//            <li className="hover:bg-[#5a6d57] p-2 rounded cursor-pointer">
//              Order Management
//           </li>
//           </Link>
          
//         </ul>

//         {/* Logout */}
//         <div
//           onClick={handleLogout}
//           className="p-2 hover:bg-[#5a6d57] cursor-pointer mt-auto border-t border-gray-600"
//         >
//           Logout
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col ml-64">
//         {/* Top Navbar */}
//         <div className="flex justify-end items-center bg-gray-100 p-4 shadow-md relative">
//           <div
//             className="flex items-center space-x-2 cursor-pointer select-none"
//             onClick={() => setDropdownOpen(!dropdownOpen)}
//           >
//             <FaUserCircle size={28} className="text-gray-700" />
//             <span className="text-gray-800 text-sm font-medium">
//               {adminInfo?.name || "Admin"}
//             </span>
//           </div>

//           {/* Animated Dropdown */}
//           <AnimatePresence>
//             {dropdownOpen && (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9, y: -10 }}
//                 animate={{ opacity: 1, scale: 1, y: 0 }}
//                 exit={{ opacity: 0, scale: 0.9, y: -10 }}
//                 transition={{ duration: 0.2 }}
//                 className="absolute right-4 top-14 bg-white rounded-md shadow-lg border text-sm w-52 p-3 origin-top-right"
//               >
//                 <p className="font-semibold border-b pb-1">
//                   {adminInfo?.name || "Admin User"}
//                 </p>
//                 <p className="text-gray-500 text-xs mt-1 mb-3">
//                   Role: {adminInfo?.role}
//                 </p>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full bg-red-500 text-white py-1 rounded hover:bg-red-600 transition-all"
//                 >
//                   Logout
//                 </button>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Main Outlet */}
//         <div className="p-6 flex-1 overflow-y-auto bg-gray-50">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Admindashboard;




// 'use client'

// import React, { useState, useEffect, Fragment } from 'react';
// import { Link, Outlet, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { motion, AnimatePresence } from "framer-motion"; // Keep AnimatePresence and motion if you use them elsewhere
// import { ClipLoader } from "react-spinners"; 
// import { FaUserCircle } from "react-icons/fa"; // Keep FaUserCircle if needed

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
//   UsersIcon, 
//   FolderIcon,
//   TagIcon, // Custom icon for Categories
//   CubeTransparentIcon, // Custom icon for Products
//   ShoppingBagIcon, // Custom icon for Orders
//   ChevronDownIcon, // From solid
//   // Removed: BellIcon, MagnifyingGlassIcon, ChartPieIcon, DocumentDuplicateIcon, CalendarIcon, Cog6ToothIcon
// } from '@heroicons/react/24/outline'

// // --- 1. ADMIN NAVIGATION DATA (MAPPED FROM YOUR LINKS) ---
// const adminNavigation = [
//   { 
//     name: 'Dashboard', 
//     href: '/admindashboard', 
//     icon: HomeIcon, 
//     current: true 
//   },
//   {
//     name: 'User Management',
//     icon: UsersIcon,
//     subLinks: [
//       { name: 'Add User', href: '/admindashboard/manageuser/adduser' },
//       { name: 'List Users', href: '/admindashboard/manageuser/listusers' },
//     ],
//   },
//   {
//     name: 'Category Management',
//     icon: TagIcon, // Using TagIcon for Categories
//     subLinks: [
//       { name: 'Add Category', href: '/admindashboard/managecategories/addcategory' },
//       { name: 'List Categories', href: '/admindashboard/managecategories/listcategory' },
//     ],
//   },
//   {
//     name: 'Product Management',
//     icon: CubeTransparentIcon, // Using CubeTransparentIcon for Products
//     subLinks: [
//       { name: 'Add Products', href: '/admindashboard/manageproducts/addproducts' },
//       { name: 'List Products', href: '/admindashboard/manageproducts/listproducts' },
//     ],
//   },
//   { 
//     name: 'Order Management', 
//     href: '/admindashboard/adminordermanagement', 
//     icon: ShoppingBagIcon, 
//     current: false 
//   },
// ]

// const userNavigation = [
//   { name: 'Your profile', href: '#' },
// ]

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

// // Custom Link Component to handle current state and collapse menus
// const NavLink = ({ item, openMenu, toggleMenu }) => {
//     // Determine if the link has sub-links (dropdown)
//     const hasSubLinks = item.subLinks && item.subLinks.length > 0;
    
//     // Check if the current route matches any link or sub-link
//     const isCurrent = item.href ? window.location.pathname === item.href : false;
//     const isActiveParent = hasSubLinks && openMenu === item.name;

//     const baseClasses = 'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold transition-colors duration-200 cursor-pointer';
//     const activeClasses = 'bg-white/10 text-white';
//     const inactiveClasses = 'text-gray-300 hover:bg-white/10 hover:text-white';

//     const renderLink = (
//         <li key={item.name}>
//             <div
//                 onClick={() => {
//                     if (hasSubLinks) {
//                         toggleMenu(item.name);
//                     } else {
//                         // For direct links, navigate and potentially close sidebar
//                         // For simplicity, we use Link if not a submenu item
//                     }
//                 }}
//                 className={classNames(
//                     isCurrent || isActiveParent ? activeClasses : inactiveClasses,
//                     baseClasses,
//                     // Apply appropriate navigation element
//                     !hasSubLinks && 'w-full' // Stretch if it's a primary link
//                 )}
//             >
//                 <item.icon aria-hidden="true" className="size-6 shrink-0" />
//                 {item.name}
//             </div>
//         </li>
//     );

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
    
//     // Render parent button and dropdown
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
//                 initial={false}
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
//     const [openMenu, setOpenMenu] = useState(""); // State for managing dropdown menus
//     const [adminInfo, setAdminInfo] = useState(null);
//     const [isLoading, setIsLoading] = useState(true); 
//     const navigate = useNavigate();
    
//     // Toggle side menus (integrated from your original logic)
//     const toggleMenu = (menuName) => {
//         setOpenMenu(openMenu === menuName ? "" : menuName);
//     };

//     // Logout function
//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("role"); 
//         setAdminInfo(null);
//         navigate("/login");
//     };

//     // Load and validate admin info from localStorage
//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         const role = localStorage.getItem("role");

//         // --- 🔑 Admin Protection Logic ---
//         if (!token || role !== "admin") {
//             localStorage.removeItem("token");
//             localStorage.removeItem("role");
//             navigate("/login", { replace: true });
//             return;
//         }
        
//         // Data Retrieval 
//         // IMPORTANT: In a real app, you would fetch the name/email from an API here.

//          const res = await axios.get(
//                 `${domainUrl}/admin/adminProfile`,
//                 data,
//                 {
//                     headers: {
//                         "Content-Type": "multipart/form-data",
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );


        

        
       
//         setAdminInfo({
//             name: "Admin User", // Placeholder name
//             role: role,
//         });
        
//         setIsLoading(false); 
        
//     }, [navigate]);
    
//     // 🛡️ Guard Clause: Show loading spinner until validation is complete
//     if (isLoading) {
//         return (
//             <div className="flex items-center justify-center h-screen w-full bg-gray-50">
//                 <ClipLoader color="#343e32" size={35} />
//             </div>
//         );
//     }

//   return (
//     <>
//       <div>
//         {/* Mobile sidebar */}
//         <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
//           <DialogBackdrop
//             transition
//             className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
//           />

//           <div className="fixed inset-0 flex">
//             <DialogPanel
//               transition
//               className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
//             >
//               <TransitionChild>
//                 <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
//                   <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
//                     <span className="sr-only">Close sidebar</span>
//                     <XMarkIcon aria-hidden="true" className="size-6 text-white" />
//                   </button>
//                 </div>
//               </TransitionChild>

//               {/* Sidebar component - Mobile */}
//               <div className="relative flex grow flex-col gap-y-5 overflow-y-auto bg-[#343e32] px-6 pb-4 ring-1 ring-white/10">
//                 <div className="relative flex h-16 shrink-0 items-center">
//                     {/* Your Logo (Mandaram Drapes) */}
//                     <img
//                         alt="Mandaram Drapes Logo"
//                         src="/logo123.png" // Use your actual logo path
//                         className="h-10 w-auto"
//                     />
//                 </div>
//                 <nav className="relative flex flex-1 flex-col">
//                   <ul role="list" className="flex flex-1 flex-col gap-y-7">
//                     <li>
//                       <ul role="list" className="-mx-2 space-y-1">
//                         {adminNavigation.map((item) => (
//                           <NavLink 
//                                 key={item.name} 
//                                 item={item} 
//                                 openMenu={openMenu} 
//                                 toggleMenu={toggleMenu} 
//                             />
//                         ))}
//                       </ul>
//                     </li>
//                   </ul>
//                     <a
//                         onClick={handleLogout}
//                         className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-white/10 hover:text-white mt-auto cursor-pointer"
//                     >
//                         <ShoppingBagIcon aria-hidden="true" className="size-6 shrink-0" />
//                         Logout
//                     </a>
//                 </nav>
//               </div>
//             </DialogPanel>
//           </div>
//         </Dialog>

//         {/* Static sidebar for desktop */}
//         <div className="hidden bg-[#343e32] lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
//           {/* Sidebar component - Desktop */}
//           <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 pb-4">
//             <div className="flex h-16 shrink-0 items-center">
//                 {/* Your Logo (Mandaram Drapes) */}
//                 <img
//                     alt="Mandaram Drapes Logo"
//                     src="/logo123.png" // Use your actual logo path
//                     className="h-10 w-auto"
//                 />
//             </div>
//             <nav className="flex flex-1 flex-col">
//               <ul role="list" className="flex flex-1 flex-col gap-y-7">
//                 <li>
//                   <ul role="list" className="-mx-2 space-y-1">
//                     {adminNavigation.map((item) => (
//                       <NavLink 
//                             key={item.name} 
//                             item={item} 
//                             openMenu={openMenu} 
//                             toggleMenu={toggleMenu} 
//                         />
//                     ))}
//                   </ul>
//                 </li>
//                 {/* Removed "Your teams" section as per provided data */}
//                 <li className="mt-auto">
//                   <a
//                     onClick={handleLogout}
//                     className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer"
//                   >
//                     <ShoppingBagIcon aria-hidden="true" className="size-6 shrink-0" />
//                     Logout
//                   </a>
//                 </li>
//               </ul>
//             </nav>
//           </div>
//         </div>

//         {/* Main Content Area */}
//         <div className="lg:pl-72">
//           
//             {/* Top Navbar (Integrated from Tailwind template, simplified) */}
//           <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-xs sm:gap-x-6 sm:px-6 lg:px-8">
//             <button
//               type="button"
//               onClick={() => setSidebarOpen(true)}
//               className="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900 lg:hidden"
//             >
//               <span className="sr-only">Open sidebar</span>
//               <Bars3Icon aria-hidden="true" className="size-6" />
//             </button>

//             {/* Separator */}
//             <div aria-hidden="true" className="h-6 w-px bg-gray-900/10 lg:hidden" />

//             <div className="flex flex-1 justify-end self-stretch">
//               <div className="flex items-center gap-x-4 lg:gap-x-6">
//                 {/* Removed Search and BellIcon */}

//                 {/* Separator */}
//                 <div
//                   aria-hidden="true"
//                   className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
//                 />

//                 {/* Profile dropdown (Combined with your adminInfo logic) */}
//                 <Menu as="div" className="relative">
//                   <MenuButton className="relative flex items-center">
//                     <span className="absolute -inset-1.5" />
//                     <span className="sr-only">Open user menu</span>
//                     {/* Using your FaUserCircle style here */}
//                     <FaUserCircle size={28} className="text-gray-700" />
//                     
//                     <span className="hidden lg:flex lg:items-center">
//                       <span aria-hidden="true" className="ml-4 text-sm/6 font-semibold text-gray-900">
//                         {adminInfo?.name || "Admin"}
//                       </span>
//                       <ChevronDownIcon aria-hidden="true" className="ml-2 size-5 text-gray-400" />
//                     </span>
//                   </MenuButton>
//                   <MenuItems
//                     transition
//                     className="absolute right-0 z-10 mt-2.5 w-48 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
//                   >
//                         <div className="px-3 py-1 text-sm text-gray-600 border-b mb-1">
//                             <p className="font-semibold">{adminInfo?.name || "Admin User"}</p>
//                             <p className="text-xs text-gray-500">Role: {adminInfo?.role || 'N/A'}</p>
//                         </div>
//                         <MenuItem>
//                             <a
//                                 onClick={handleLogout}
//                                 className="block px-3 py-1 text-sm/6 text-red-600 hover:bg-gray-50 cursor-pointer"
//                             >
//                                 Sign out
//                             </a>
//                         </MenuItem>
//                   </MenuItems>
//                 </Menu>
//               </div>
//             </div>
//           </div>

//           {/* Main Outlet for Content */}
//           <main>
//             <div>
//                 <Outlet />
//             </div>
//           </main>
//         </div>
//       </div>
//     </>
//   )
// }

// Export the component for use in your routing
// export default Admindashboard;


'use client'

import React, { useRef, useState, useEffect, Fragment } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion"; 
import { ClipLoader } from "react-spinners"; 
import { FaUserCircle } from "react-icons/fa"; 
import { domainUrl } from "../utils/constant"; // Assuming this path is correct


import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from '@headlessui/react'
import {
  Bars3Icon,
  HomeIcon,
  XMarkIcon,
  UsersIcon, 
  TagIcon, 
  CubeTransparentIcon, 
  ShoppingBagIcon, 
  ChevronDownIcon, 
} from '@heroicons/react/24/outline'

// --- 1. ADMIN NAVIGATION DATA (MAPPED FROM YOUR LINKS) ---
const adminNavigation = [
  { 
    name: 'Dashboard', 
    href: '/admindashboard', 
    icon: HomeIcon, 
    current: true 
  },
  {
    name: 'User Management',
    icon: UsersIcon,
    subLinks: [
      { name: 'Add User', href: '/admindashboard/manageuser/adduser' },
      { name: 'List Users', href: '/admindashboard/manageuser/listusers' },
    ],
  },
  {
    name: 'Category Management',
    icon: TagIcon, 
    subLinks: [
      { name: 'Add Category', href: '/admindashboard/managecategories/addcategory' },
      { name: 'List Categories', href: '/admindashboard/managecategories/listcategory' },
    ],
  },
  {
    name: 'Product Management',
    icon: CubeTransparentIcon, 
    subLinks: [
      { name: 'Add Products', href: '/admindashboard/manageproducts/addproducts' },
      { name: 'List Products', href: '/admindashboard/manageproducts/listproducts' },
    ],
  },
  { 
    name: 'Order Management', 
    href: '/admindashboard/adminordermanagement', 
    icon: ShoppingBagIcon, 
    current: false 
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

// Custom Link Component (Assumes motion is imported)
const NavLink = ({ item, openMenu, toggleMenu }) => {
    const hasSubLinks = item.subLinks && item.subLinks.length > 0;
    const isCurrent = item.href ? window.location.pathname === item.href : false;
    const isActiveParent = hasSubLinks && openMenu === item.name;

    const baseClasses = 'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold transition-colors duration-200 cursor-pointer';
    const activeClasses = 'bg-white/10 text-white';
    const inactiveClasses = 'text-gray-300 hover:bg-white/10 hover:text-white';

    if (!hasSubLinks) {
        return (
            <li key={item.name}>
                <Link to={item.href} className={classNames(
                    isCurrent ? activeClasses : inactiveClasses,
                    baseClasses,
                    'w-full'
                )}>
                    <item.icon aria-hidden="true" className="size-6 shrink-0" />
                    {item.name}
                </Link>
            </li>
        );
    }
    
    return (
        <li key={item.name}>
            <button
                onClick={() => toggleMenu(item.name)}
                className={classNames(
                    isActiveParent ? activeClasses : inactiveClasses,
                    baseClasses,
                    'w-full flex justify-between items-center'
                )}
            >
                <div className="flex items-center gap-x-3">
                    <item.icon aria-hidden="true" className="size-6 shrink-0" />
                    {item.name}
                </div>
                <ChevronDownIcon 
                    className={classNames(
                        'size-5 transition-transform duration-200',
                        isActiveParent ? 'rotate-180' : 'rotate-0'
                    )}
                />
            </button>
            <motion.ul
                initial={{ height: 0 }}
                animate={{ height: isActiveParent ? 'auto' : 0 }}
                transition={{ duration: 0.2 }}
                className={classNames(
                    'mt-1 space-y-1 overflow-hidden ml-4 p-1 rounded-md bg-black/20'
                )}
            >
                {item.subLinks.map((subItem) => (
                    <li key={subItem.name}>
                        <Link 
                            to={subItem.href} 
                            className="block p-2 text-sm text-gray-400 rounded-md hover:bg-black/30 hover:text-white transition-colors duration-200"
                        >
                            {subItem.name}
                        </Link>
                    </li>
                ))}
            </motion.ul>
        </li>
    );
};
// -----------------------------------------------------------------


export default function Admindashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(""); 
    const [adminInfo, setAdminInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true); 
    const navigate = useNavigate();
    
    const toggleMenu = (menuName) => {
        setOpenMenu(openMenu === menuName ? "" : menuName);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role"); 
        setAdminInfo(null);
        navigate("/login");
    };

    // 🔑 ADMIN PROFILE FETCHING FUNCTION
    const fetchAdminProfile = async (token) => {
        setIsLoading(true);
        try {
            const res = await axios.get(`${domainUrl}/admin/adminProfile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Use the specified response field: res.data.adminData
            const adminData = res.data.adminData; 
            
            // Set the state with the fetched admin's name and role
            setAdminInfo({
                name: adminData.username || adminData.name || "Administrator",
                role: adminData.role || "Admin",
            });

        } catch (error) {
            console.error("Error fetching admin profile:", error);
            // If fetching fails, clear tokens and redirect to login
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            navigate("/login", { replace: true });
        } finally {
            setIsLoading(false);
        }
    };


    // 🔑 AUTHENTICATION AND DATA FETCHING EFFECT
    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        // --- 1. Admin Protection Logic ---
        if (!token || role !== "admin") {
            // Not logged in or incorrect role - clear data and redirect
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            navigate("/login", { replace: true });
            return;
        }
        
        // --- 2. If valid, fetch profile data ---
        fetchAdminProfile(token);
        
    }, [navigate]);
    
    // 🛡️ Guard Clause: Show loading spinner until validation and data retrieval is complete
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen w-full bg-gray-50">
                <ClipLoader color="#343e32" size={35} />
            </div>
        );
    }

    // --- RENDER ---
    return (
        <>
            <div>
                {/* Mobile sidebar */}
                <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
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
                                    <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                                        <span className="sr-only">Close sidebar</span>
                                        <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                                    </button>
                                </div>
                            </TransitionChild>

                            {/* Sidebar component - Mobile */}
                            <div className="relative flex grow flex-col gap-y-5 overflow-y-auto bg-[#343e32] px-6 pb-4 ring-1 ring-white/10">
                                <div className="relative flex h-16 shrink-0 items-center">
                                    {/* Your Logo (Mandaram Drapes) */}
                                    <img
                                        alt="Mandaram Drapes Logo"
                                        src="/logo123.png" 
                                        className="h-10 w-auto"
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
                                                    />
                                                ))}
                                            </ul>
                                        </li>
                                        <a
                                            onClick={handleLogout}
                                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-white/10 hover:text-white mt-auto cursor-pointer"
                                        >
                                            <ShoppingBagIcon aria-hidden="true" className="size-6 shrink-0" />
                                            Logout
                                        </a>
                                    </ul>
                                </nav>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>

                {/* Static sidebar for desktop */}
                <div className="hidden bg-[#343e32] lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                    {/* Sidebar component - Desktop */}
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 pb-4">
                        <div className="flex h-16 shrink-0 items-center">
                            {/* Your Logo (Mandaram Drapes) */}
                            <img
                                alt="Mandaram Drapes Logo"
                                src="/logo123.png" 
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
                                        <ShoppingBagIcon aria-hidden="true" className="size-6 shrink-0" />
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="lg:pl-72">
                    
                    {/* Top Navbar (Integrated from Tailwind template, simplified) */}
                    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-xs sm:gap-x-6 sm:px-6 lg:px-8">
                        <button
                            type="button"
                            onClick={() => setSidebarOpen(true)}
                            className="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900 lg:hidden"
                        >
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon aria-hidden="true" className="size-6" />
                        </button>

                        {/* Separator */}
                        <div aria-hidden="true" className="h-6 w-px bg-gray-900/10 lg:hidden" />

                        <div className="flex flex-1 justify-end self-stretch">
                            <div className="flex items-center gap-x-4 lg:gap-x-6">

                                {/* Separator */}
                                <div
                                    aria-hidden="true"
                                    className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                                />

                                {/* Profile dropdown (Combined with your adminInfo logic) */}
                                <Menu as="div" className="relative">
                                    <MenuButton className="relative flex items-center">
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">Open user menu</span>
                                        {/* Using your FaUserCircle style here */}
                                        <FaUserCircle size={28} className="text-gray-700" />
                                        
                                        <span className="hidden lg:flex lg:items-center">
                                            <span aria-hidden="true" className="ml-4 text-sm/6 font-semibold text-gray-900">
                                                {adminInfo?.name || "Administrator"}
                                            </span>
                                            <ChevronDownIcon aria-hidden="true" className="ml-2 size-5 text-gray-400" />
                                        </span>
                                    </MenuButton>
                                    <MenuItems
                                        transition
                                        className="absolute right-0 z-10 mt-2.5 w-48 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                    >
                                        <div className="px-3 py-1 text-sm text-gray-600 border-b mb-1">
                                            <p className="font-semibold">{adminInfo?.name || "Administrator"}</p>
                                            <p className="text-xs text-gray-500">Role: {adminInfo?.role || 'N/A'}</p>
                                        </div>
                                        <MenuItem>
                                            <a
                                                onClick={handleLogout}
                                                className="block px-3 py-1 text-sm/6 text-red-600 hover:bg-gray-50 cursor-pointer"
                                            >
                                                Sign out
                                            </a>
                                        </MenuItem>
                                    </MenuItems>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    {/* Main Outlet for Content */}
                    <main>
                        <div>
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
















