import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Admindashboard = () => {
  const [openMenu, setOpenMenu] = useState(""); 

  // toggle function
  const toggleMenu = (menuName) => {
    setOpenMenu(openMenu === menuName ? "" : menuName);
  };

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
                  <li className="hover:bg-[#5a6d57] p-2 rounded">Add Categories</li>
                </Link>
                {/* <Link to="/admindashboard/managecategories/updatecategory">
                  <li className="hover:bg-[#5a6d57] p-2 rounded">Update Categories</li>
                </Link> */}
                <Link to="/admindashboard/managecategories/listcategory">
                  <li className="hover:bg-[#5a6d57] p-2 rounded">List Categories</li>
                </Link>
                {/* <Link to="/admindashboard/managecategories/deletecategory">
                  <li className="hover:bg-[#5a6d57] p-2 rounded">Delete Categories</li>
                </Link> */}
                
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
                  <li className="hover:bg-[#5a6d57] p-2 rounded">Add Products</li>
                </Link>
                {/* <Link to="/admindashboard/manageproducts/updateproduct">
                  <li className="hover:bg-[#5a6d57] p-2 rounded">Update Products</li>
                </Link>
                <Link to="/admindashboard/manageproducts/deleteproduct">
                  <li className="hover:bg-[#5a6d57] p-2 rounded">Delete Products</li>
                </Link> */}
                <Link to="/admindashboard/manageproducts/listproducts">
                  <li className="hover:bg-[#5a6d57] p-2 rounded">List Products</li>
                </Link>
              </ul>
            </div>
          </li>

          {/* Order Management */}
          <li className="hover:bg-[#5a6d57] p-2 rounded cursor-pointer">
            Order Management
          </li>
        </ul>

        {/* Logout */}
        <div className="p-2 hover:bg-[#5a6d57] cursor-pointer mt-auto border-t border-gray-600">
          Logout
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Admindashboard;









