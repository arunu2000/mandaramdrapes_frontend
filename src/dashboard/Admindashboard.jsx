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


import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { ClipLoader } from "react-spinners"; // Ensure you import ClipLoader if you use it

const Admindashboard = () => {
  const [openMenu, setOpenMenu] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [adminInfo, setAdminInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 👈 NEW: State to track loading/validation
  const navigate = useNavigate();

  // Load and validate admin info from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // --- 🔑 Admin Protection Logic ---
    if (!token || role !== "admin") {
      // 1. If not logged in OR role is not 'admin', clear and redirect
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      
      // Navigate to /login (or / for customer home)
      navigate("/login", { replace: true });
      return; // Stop execution of the rest of the useEffect
    }

    // 2. Data Retrieval (Only runs if the protection check passes)
    // IMPORTANT: Since your Login component only stores token and role, 
    // we set a basic info object. If your API stored the full user object, 
    // you would fetch or retrieve it here.
    
    // For now, setting a basic info object based on existing data
    // Assuming you don't store the full JSON object under a single key.
    setAdminInfo({
        name: "Admin User", // Placeholder until you store the name on login
        role: role,
    });
    
    // 3. Mark loading complete
    setIsLoading(false); 
    
  }, [navigate]);

  // Toggle side menus
  const toggleMenu = (menuName) => {
    setOpenMenu(openMenu === menuName ? "" : menuName);
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role"); 
    setAdminInfo(null);
    setDropdownOpen(false); // Close dropdown on logout
    navigate("/login");
  };
  
  // 🛡️ Guard Clause: Show loading spinner until validation is complete
  if (isLoading) {
    return (
        // Position the spinner correctly in the viewport
        <div className="flex items-center justify-center h-screen w-full bg-gray-50">
            <ClipLoader color="#343e32" size={35} />
        </div>
    );
  }
  
  // If validation failed, the useEffect already redirected, so this part won't run.
  // If validation passed (isLoading is false), render the full dashboard:

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-[#343e32] text-white p-4 w-64 flex flex-col text-sm fixed h-screen">
        {/* Logo */}
        <div className="flex flex-col items-center pb-4 border-b border-gray-600">
          <img className="w-20 h-20" src="logo123.png" alt="Logo" />
        </div>

        {/* Menu Items */}
        <ul className="mt-8 space-y-1">
          <Link to="/admindashboard">
            <li className="hover:bg-[#5a6d57] p-2 rounded">Home</li>
          </Link>

          {/* Manage Users */}
          <li>
            <button
              onClick={() => toggleMenu("users")}
              className={`w-full text-left p-2 rounded transition-colors duration-200 ${
                openMenu === "users" ? "bg-[#5a6d57]" : "hover:bg-[#5a6d57]"
              }`}
            >
              Manage Users
            </button>
            <div
              className={`ml-4 transition-all duration-300 overflow-hidden ${
                openMenu === "users" ? "max-h-40 mt-1" : "max-h-0"
              }`}
            >
              <ul className="space-y-1 text-xs">
                <Link to="/admindashboard/manageuser/adduser">
                  <li className="hover:bg-[#5a6d57] p-2 rounded">Add Users</li>
                </Link>
                <Link to="/admindashboard/manageuser/listusers">
                  <li className="hover:bg-[#5a6d57] p-2 rounded">List Users</li>
                </Link>
              </ul>
            </div>
          </li>

          {/* Manage Category */}
          <li>
            <button
              onClick={() => toggleMenu("category")}
              className="w-full text-left hover:bg-[#5a6d57] p-2 rounded"
            >
              Manage Category
            </button>
            <div
              className={`ml-4 transition-all duration-300 overflow-hidden ${
                openMenu === "category" ? "max-h-48 mt-1" : "max-h-0"
              }`}
            >
              <ul className="space-y-1 text-xs">
                <Link to="/admindashboard/managecategories/addcategory">
                  <li className="hover:bg-[#5a6d57] p-2 rounded">
                    Add Categories
                  </li>
                </Link>
                <Link to="/admindashboard/managecategories/listcategory">
                  <li className="hover:bg-[#5a6d57] p-2 rounded">
                    List Categories
                  </li>
                </Link>
              </ul>
            </div>
          </li>

          {/* Manage Products */}
          <li>
            <button
              onClick={() => toggleMenu("products")}
              className="w-full text-left hover:bg-[#5a6d57] p-2 rounded"
            >
              Manage Products
            </button>
            <div
              className={`ml-4 transition-all duration-300 overflow-hidden ${
                openMenu === "products" ? "max-h-48 mt-1" : "max-h-0"
              }`}
            >
              <ul className="space-y-1 text-xs">
                <Link to="/admindashboard/manageproducts/addproducts">
                  <li className="hover:bg-[#5a6d57] p-2 rounded">
                    Add Products
                  </li>
                </Link>
                <Link to="/admindashboard/manageproducts/listproducts">
                  <li className="hover:bg-[#5a6d57] p-2 rounded">
                    List Products
                  </li>
                </Link>
              </ul>
            </div>
          </li>

          {/* Order Management */}
          <Link to="adminordermanagement">
           <li className="hover:bg-[#5a6d57] p-2 rounded cursor-pointer">
             Order Management
          </li>
          </Link>
          
        </ul>

        {/* Logout */}
        <div
          onClick={handleLogout}
          className="p-2 hover:bg-[#5a6d57] cursor-pointer mt-auto border-t border-gray-600"
        >
          Logout
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Top Navbar */}
        <div className="flex justify-end items-center bg-gray-100 p-4 shadow-md relative">
          <div
            className="flex items-center space-x-2 cursor-pointer select-none"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <FaUserCircle size={28} className="text-gray-700" />
            <span className="text-gray-800 text-sm font-medium">
              {adminInfo?.name || "Admin"}
            </span>
          </div>

          {/* Animated Dropdown */}
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-4 top-14 bg-white rounded-md shadow-lg border text-sm w-52 p-3 origin-top-right"
              >
                <p className="font-semibold border-b pb-1">
                  {adminInfo?.name || "Admin User"}
                </p>
                <p className="text-gray-500 text-xs mt-1 mb-3">
                  Role: {adminInfo?.role}
                </p>
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 text-white py-1 rounded hover:bg-red-600 transition-all"
                >
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Main Outlet */}
        <div className="p-6 flex-1 overflow-y-auto bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admindashboard;










