// import React, { useEffect, useState, useMemo } from "react";
// import axios from "axios";
// // Assumes you have @heroicons/react installed
// import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'; 
// import { domainUrl } from "../utils/constant";

// // Utility component for the pagination controls
// const PaginationControls = ({ currentPage, totalPages, onPageChange }) => (
//     <div className="flex items-center justify-between border-t border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700 px-4 py-3 sm:px-6">
//         <div className="flex flex-1 justify-between sm:hidden">
//             <button
//                 onClick={() => onPageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className="relative inline-flex items-center rounded-md border border-gray-300 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
//             >
//                 Previous
//             </button>
//             <button
//                 onClick={() => onPageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
//             >
//                 Next
//             </button>
//         </div>
//         <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
//             <div>
//                 {/* Note: This is an approximation for total items, assuming all pages are full except the last */}
//                 <p className="text-sm text-gray-700 dark:text-gray-300">
//                     Showing <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> to{' '}
//                     <span className="font-medium">{Math.min(currentPage * 10, totalPages * 10)}</span> of{' '}
//                     <span className="font-medium">{totalPages * 10}</span> results
//                 </p>
//             </div>
//             <div>
//                 <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
//                     <button
//                         onClick={() => onPageChange(currentPage - 1)}
//                         disabled={currentPage === 1}
//                         className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 dark:text-gray-300 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
//                     >
//                         <span className="sr-only">Previous</span>
//                         <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
//                     </button>
//                     {/* Simplified page number rendering */}
//                     {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                         <button
//                             key={page}
//                             onClick={() => onPageChange(page)}
//                             aria-current={page === currentPage ? 'page' : undefined}
//                             className={`relative hidden items-center px-4 py-2 text-sm font-semibold focus:z-20 focus:outline-offset-0 md:inline-flex ${
//                                 page === currentPage
//                                     ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
//                                     : 'text-gray-900 dark:text-gray-300 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
//                             }`}
//                         >
//                             {page}
//                         </button>
//                     ))}
//                     <button
//                         onClick={() => onPageChange(currentPage + 1)}
//                         disabled={currentPage === totalPages}
//                         className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 dark:text-gray-300 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
//                     >
//                         <span className="sr-only">Next</span>
//                         <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
//                     </button>
//                 </nav>
//             </div>
//         </div>
//     </div>
// );

// // Main ListUsers Component
// const ListUsers = () => {
//     const [allUsers, setAllUsers] = useState([]);
//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(true);
//     const [currentPage, setCurrentPage] = useState(1);
//     const USERS_PER_PAGE = 10; // Define how many users per page

//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         setLoading(true);

//         axios
//             .get(`${domainUrl}/admin/users`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             })
//             .then((res) => {
//                 setAllUsers(res.data.users || []);
//                 setError("");
//                 setCurrentPage(1); // Reset to page 1 on new data fetch
//             })
//             .catch((err) => {
//                 console.error("Error fetching users:", err);
//                 setError("Failed to load users. Please check your network or try again.");
//                 setAllUsers([]);
//             })
//             .finally(() => {
//                 setLoading(false);
//             });
//     }, []);

//     // Calculate total pages
//     const totalPages = Math.ceil(allUsers.length / USERS_PER_PAGE);

//     // Get the users for the current page using useMemo for efficiency
//     const usersOnCurrentPage = useMemo(() => {
//         const startIndex = (currentPage - 1) * USERS_PER_PAGE;
//         const endIndex = startIndex + USERS_PER_PAGE;
//         return allUsers.slice(startIndex, endIndex);
//     }, [allUsers, currentPage, USERS_PER_PAGE]);

//     // Handler for page change
//     const handlePageChange = (page) => {
//         if (page >= 1 && page <= totalPages) {
//             setCurrentPage(page);
//         }
//     };

//     // Removed handleAction function

//     return (
//         <div className="px-4 sm:px-6 lg:px-8 pt-8 min-h-screen bg-gray-50 dark:bg-gray-950">
            
//             {/* Header only (Add User button removed) */}
//             <div className="sm:flex sm:items-center">
//                 <div className="sm:flex-auto">
//                     <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
//                         Users List
//                     </h1>
//                     <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
//                         A list of all registered users.
//                     </p>
//                 </div>
//                 {/* Add User Button div is removed */}
//             </div>
            
//             <hr className="my-5 border-gray-200 dark:border-gray-800" />
            
//             {/* Status Messages */}
//             {loading && (
//                 <p className="text-indigo-600 text-center text-md mt-6">Loading users...</p>
//             )}

//             {error && (
//                 <p className="text-red-500 text-center text-md mt-6 p-3 bg-red-50 rounded-md border border-red-200">
//                     ⚠️ {error}
//                 </p>
//             )}
            
//             {/* User Table and Pagination */}
//             {!loading && !error && (
//                 <div className="mt-8 flow-root">
//                     <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//                         <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
//                             {usersOnCurrentPage.length === 0 ? (
//                                 <p className="text-gray-600 text-center py-10 dark:text-gray-400">
//                                     No users found.
//                                 </p>
//                             ) : (
//                                 <div className="shadow-md rounded-lg overflow-hidden">
//                                     <table className="min-w-full divide-y divide-gray-300 dark:divide-white/15">
//                                         <thead className="bg-gray-50 dark:bg-gray-800">
//                                             <tr>
//                                                 <th scope="col" className="py-3 pr-3 pl-4 text-left text-xs font-medium tracking-wide text-gray-500 uppercase sm:pl-6 dark:text-gray-400">Username</th>
//                                                 <th scope="col" className="px-3 py-3 text-left text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">Email</th>
//                                                 <th scope="col" className="px-3 py-3 text-left text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">Phone</th>
//                                                 <th scope="col" className="px-3 py-3 text-left text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">Role</th>
//                                                 {/* Edit column header is removed */}
//                                             </tr>
//                                         </thead>
//                                         <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
//                                             {usersOnCurrentPage.map((user) => (
//                                                 <tr key={user._id}>
//                                                     <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 dark:text-white">{user.username}</td>
//                                                     <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">{user.email}</td>
//                                                     <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">{user.phone || 'N/A'}</td>
//                                                     <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400 capitalize">{user.role}</td>
//                                                     {/* Edit button column is removed */}
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
                                    
//                                     {/* Pagination Controls */}
//                                     <PaginationControls
//                                         currentPage={currentPage}
//                                         totalPages={totalPages}
//                                         onPageChange={handlePageChange}
//                                     />
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ListUsers;

// import React, { useEffect, useState, useMemo } from "react";
// import axios from "axios";
// import { ChevronLeftIcon, ChevronRightIcon, UserGroupIcon } from "@heroicons/react/20/solid";
// import { domainUrl } from "../utils/constant";

// // Pagination Component
// const PaginationControls = ({ currentPage, totalPages, onPageChange }) => (
//   <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-b-xl">
//     <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
//       <p className="text-sm text-gray-600">
//         Showing <span className="font-semibold">{(currentPage - 1) * 10 + 1}</span> to{" "}
//         <span className="font-semibold">{Math.min(currentPage * 10, totalPages * 10)}</span> of{" "}
//         <span className="font-semibold">{totalPages * 10}</span> results
//       </p>
//       <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
//         <button
//           onClick={() => onPageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-40"
//         >
//           <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
//         </button>

//         {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//           <button
//             key={page}
//             onClick={() => onPageChange(page)}
//             className={`relative hidden md:inline-flex items-center px-4 py-2 text-sm font-medium ${
//               page === currentPage
//                 ? "z-10 bg-[#48633f] text-white"
//                 : "text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
//             }`}
//           >
//             {page}
//           </button>
//         ))}

//         <button
//           onClick={() => onPageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-40"
//         >
//           <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
//         </button>
//       </nav>
//     </div>
//   </div>
// );

// const ListUsers = () => {
//   const [allUsers, setAllUsers] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const USERS_PER_PAGE = 10;

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setLoading(true);

//     axios
//       .get(`${domainUrl}/admin/users`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         setAllUsers(res.data.users || []);
//         setError("");
//         setCurrentPage(1);
//       })
//       .catch(() => {
//         setError("Failed to load users. Please check your network or try again....");
//         setAllUsers([]);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   const totalPages = Math.ceil(allUsers.length / USERS_PER_PAGE);
//   const usersOnCurrentPage = useMemo(() => {
//     const startIndex = (currentPage - 1) * USERS_PER_PAGE;
//     const endIndex = startIndex + USERS_PER_PAGE;
//     return allUsers.slice(startIndex, endIndex);
//   }, [allUsers, currentPage]);

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) setCurrentPage(page);
//   };

//   return (
//     <div className="px-4 sm:px-6 lg:px-8 pt-10 pb-16 min-h-screen bg-gray-50 transition-all duration-300">
//       {/* Header */}
//       <div className="flex flex-col items-center mb-8 text-center animate-fadeIn">
//         <div className="flex items-center gap-2">
//           {/* <UserGroupIcon className="h-7 w-7 text-[#48633f]" /> */}
//           <h1 className="text-2xl font-semibold text-gray-900">Users List</h1>
//         </div>
//         <p className="mt-1 text-sm text-gray-600">
//           All Registered users Details .
//         </p>
//         <div className="mt-4 w-24 border-b-4 border-[#48633f] rounded-full"></div>
//       </div>

//       {/* Status Messages */}
//       {loading && (
//         <p className="text-[#48633f] text-center text-md mt-8 font-medium animate-pulse">
//           Loading users...
//         </p>
//       )}

//       {error && (
//         <p className="text-red-600 text-center text-md mt  py-3  shadow-sm">
//           ⚠️ {error}
//         </p>
//       )}

//       {/* Users Table */}
//       {!loading && !error && (
//         <div className="bg-white shadow-lg rounded-xl overflow-hidden animate-fadeIn">
//           {usersOnCurrentPage.length === 0 ? (
//             <p className="text-gray-600 text-center py-10 text-sm">No users found.</p>
//           ) : (
//             <>
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-100">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                       Username
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                       Email
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                       Phone
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                       Role
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-100 bg-white">
//                   {usersOnCurrentPage.map((user) => (
//                     <tr
//                       key={user._id}
//                       className="hover:bg-gray-50 transition-all duration-150"
//                     >
//                       <td className="px-6 py-4 text-sm text-gray-800 font-medium">
//                         {user.username}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
//                       <td className="px-6 py-4 text-sm text-gray-600">
//                         {user.phone || "N/A"}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-600 capitalize">
//                         {user.role}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               {/* Pagination */}
//               <PaginationControls
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 onPageChange={handlePageChange}
//               />
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ListUsers;


// import React, { useEffect, useState, useMemo } from "react";
// import axios from "axios";
// import {
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   UserGroupIcon,
// } from "@heroicons/react/20/solid";
// import { domainUrl } from "../utils/constant";

// // Pagination Component
// const PaginationControls = ({ currentPage, totalPages, onPageChange }) => (
//   <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-b-xl">
//     <p className="text-sm text-gray-600 mb-3 sm:mb-0 text-center sm:text-left">
//       Showing{" "}
//       <span className="font-semibold">
//         {(currentPage - 1) * 10 + 1}
//       </span>{" "}
//       to{" "}
//       <span className="font-semibold">
//         {Math.min(currentPage * 10, totalPages * 10)}
//       </span>{" "}
//       of <span className="font-semibold">{totalPages * 10}</span> results
//     </p>

//     <nav className="flex items-center justify-center space-x-1" aria-label="Pagination">
//       <button
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         className="flex items-center justify-center rounded-md px-2 py-2 text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-40"
//       >
//         <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
//       </button>

//       <div className="hidden md:flex">
//         {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//           <button
//             key={page}
//             onClick={() => onPageChange(page)}
//             className={`px-4 py-2 text-sm font-medium rounded-md ${
//               page === currentPage
//                 ? "bg-[#48633f] text-white"
//                 : "text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
//             }`}
//           >
//             {page}
//           </button>
//         ))}
//       </div>

//       <button
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className="flex items-center justify-center rounded-md px-2 py-2 text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-40"
//       >
//         <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
//       </button>
//     </nav>
//   </div>
// );

// const ListUsers = () => {
//   const [allUsers, setAllUsers] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const USERS_PER_PAGE = 10;

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setLoading(true);

//     axios
//       .get(`${domainUrl}/admin/users`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         setAllUsers(res.data.users || []);
//         setError("");
//         setCurrentPage(1);
//       })
//       .catch(() => {
//         setError("Failed to load users. Please check your network or try again...");
//         setAllUsers([]);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   const totalPages = Math.ceil(allUsers.length / USERS_PER_PAGE);
//   const usersOnCurrentPage = useMemo(() => {
//     const startIndex = (currentPage - 1) * USERS_PER_PAGE;
//     const endIndex = startIndex + USERS_PER_PAGE;
//     return allUsers.slice(startIndex, endIndex);
//   }, [allUsers, currentPage]);

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) setCurrentPage(page);
//   };

//   return (
//     <div className="px-4 sm:px-6 lg:px-8 pt-10 pb-16 min-h-screen bg-gray-50 transition-all duration-300">
//       {/* Header */}
//       <div className="flex flex-col items-center mb-8 text-center animate-fadeIn">
//         <div className="flex items-center gap-2">
//           <UserGroupIcon className="h-7 w-7 text-[#48633f]" />
//           <h1 className="text-2xl font-semibold text-gray-900">Users List</h1>
//         </div>
//         <p className="mt-1 text-sm text-gray-600">
//           All registered user details.
//         </p>
//         <div className="mt-4 w-24 border-b-4 border-[#48633f] rounded-full"></div>
//       </div>

//       {/* Status Messages */}
//       {loading && (
//         <p className="text-[#48633f] text-center text-md mt-8 font-medium animate-pulse">
//           Loading users...
//         </p>
//       )}

//       {error && (
//         <p className="text-red-600 text-center text-md mt-4 py-3 shadow-sm">
//           ⚠️ {error}
//         </p>
//       )}

//       {/* Users Table */}
//       {!loading && !error && (
//         <div className="bg-white shadow-lg rounded-xl overflow-hidden animate-fadeIn">
//           {usersOnCurrentPage.length === 0 ? (
//             <p className="text-gray-600 text-center py-10 text-sm">
//               No users found.
//             </p>
//           ) : (
//             <>
//               {/* Table for medium+ screens */}
//               <div className="hidden md:block overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-100">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                         Username
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                         Email
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                         Phone
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                         Role
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-100 bg-white">
//                     {usersOnCurrentPage.map((user) => (
//                       <tr
//                         key={user._id}
//                         className="hover:bg-gray-50 transition-all duration-150"
//                       >
//                         <td className="px-6 py-4 text-sm text-gray-800 font-medium">
//                           {user.username}
//                         </td>
//                         <td className="px-6 py-4 text-sm text-gray-600">
//                           {user.email}
//                         </td>
//                         <td className="px-6 py-4 text-sm text-gray-600">
//                           {user.phone || "N/A"}
//                         </td>
//                         <td className="px-6 py-4 text-sm text-gray-600 capitalize">
//                           {user.role}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Card view for mobile */}
//               <div className="md:hidden grid grid-cols-1 gap-4 p-4">
//                 {usersOnCurrentPage.map((user) => (
//                   <div
//                     key={user._id}
//                     className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition"
//                   >
//                     <p className="font-semibold text-gray-900 text-base">
//                       {user.username}
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       <span className="font-medium">Email: </span>
//                       {user.email}
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       <span className="font-medium">Phone: </span>
//                       {user.phone || "N/A"}
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       <span className="font-medium">Role: </span>
//                       {user.role}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               {/* Pagination */}
//               <PaginationControls
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 onPageChange={handlePageChange}
//               />
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ListUsers;




import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  UserGroupIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { domainUrl } from "../utils/constant";
import api from "../utils/api";

// Pagination Component (modern + accurate counts)
const PaginationControls = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
}) => {
  const hasResults = totalItems > 0;
  const start = hasResults ? (currentPage - 1) * pageSize + 1 : 0;
  const end = hasResults
    ? Math.min(currentPage * pageSize, totalItems)
    : 0;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-b-xl">
      <p className="text-sm text-gray-600 mb-3 sm:mb-0 text-center sm:text-left">
        {hasResults ? (
          <>
            Showing{" "}
            <span className="font-semibold">{start}</span> to{" "}
            <span className="font-semibold">{end}</span> of{" "}
            <span className="font-semibold">{totalItems}</span> results
          </>
        ) : (
          <>No results found</>
        )}
      </p>

      <nav
        className="flex items-center justify-center space-x-1"
        aria-label="Pagination"
      >
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || totalPages === 0}
          className="flex items-center justify-center rounded-md px-2 py-2 text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-40"
        >
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="hidden md:flex">
          {Array.from({ length: totalPages || 0 }, (_, i) => i + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition ${
                  page === currentPage
                    ? "bg-[#48633f] text-white shadow-sm"
                    : "text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            )
          )}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="flex items-center justify-center rounded-md px-2 py-2 text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-40"
        >
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </nav>
    </div>
  );
};

// Helper: Get initials from username/email
const getInitials = (user) => {
  const nameSource = user?.username || user?.email || "";
  const trimmed = nameSource.trim();
  if (!trimmed) return "?";
  const parts = trimmed.split(" ");
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
};

// Helper: Role badge styles
const RoleBadge = ({ role }) => {
  const normalized = (role || "").toLowerCase();

  let label = role || "N/A";
  let classes =
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium";

  if (normalized === "admin") {
    classes += " bg-red-50 text-red-700 ring-1 ring-red-100";
  } else if (normalized === "user" || normalized === "customer") {
    classes += " bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100";
  } else {
    classes += " bg-gray-100 text-gray-700 ring-1 ring-gray-200";
  }

  return <span className={classes}>{label}</span>;
};

const ListUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const USERS_PER_PAGE = 10;

 useEffect(() => {
  setLoading(true);

  api
    .get("/admin/users", {
      // withCredentials: true, // 🔥 cookies sent
    })
    .then((res) => {
      setAllUsers(res.data.users || []);
      setError("");
      setCurrentPage(1);
    })
    .catch(() => {
      setError(
        "Failed to load users. Please check your network or try again..."
      );
      setAllUsers([]);
    })
    .finally(() => setLoading(false));
}, []);


  // Reset page when search changes so user always sees first results
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Filtered users based on search term
  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return allUsers;
    const term = searchTerm.toLowerCase();
    return allUsers.filter((user) => {
      return (
        user?.username?.toLowerCase().includes(term) ||
        user?.email?.toLowerCase().includes(term) ||
        user?.phone?.toLowerCase?.().includes(term) ||
        user?.role?.toLowerCase().includes(term)
      );
    });
  }, [allUsers, searchTerm]);

  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / USERS_PER_PAGE) || 0;

  const usersOnCurrentPage = useMemo(() => {
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    const endIndex = startIndex + USERS_PER_PAGE;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Stats for the header summary
  const totalUsers = allUsers.length;
  const totalAdmins = useMemo(
    () =>
      allUsers.filter(
        (u) => (u.role || "").toLowerCase() === "admin"
      ).length,
    [allUsers]
  );
  const totalStandardUsers = useMemo(
    () =>
      allUsers.filter(
        (u) => (u.role || "").toLowerCase() === "user"
      ).length,
    [allUsers]
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-10 pb-16 min-h-screen bg-gray-50 transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-8 animate-fadeIn">
        <div>
          <div className="flex items-center gap-2">
            {/* <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#48633f]/10">
              <UserGroupIcon className="h-6 w-6 text-[#48633f]" />
            </div> */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Users
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Overview of all registered users in the system.
              </p>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3 lg:gap-4">
          <div className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 shadow-sm">
            <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
              Total Users
            </p>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {totalUsers}
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 shadow-sm">
            <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
              Admins
            </p>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {totalAdmins}
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 shadow-sm">
            <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">
              Standard Users
            </p>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {totalStandardUsers}
            </p>
          </div>
        </div>
      </div>

      {/* Search + content container */}
      <div className="bg-white shadow-lg rounded-2xl border border-gray-100 overflow-hidden animate-fadeIn">
        {/* Top bar: search */}
        <div className="border-b border-gray-100 px-4 py-4 sm:px-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-gray-50/60">
          <div className="flex flex-col">
            <h2 className="text-sm font-medium text-gray-900">
              Users List
            </h2>
            <p className="text-xs text-gray-500">
              Search and browse through all user accounts.
            </p>
          </div>

          {/* Search input (client-side only) */}
          <div className="w-full sm:w-72">
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, role..."
                className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#48633f] focus:outline-none focus:ring-1 focus:ring-[#48633f]"
              />
            </div>
          </div>
        </div>

        {/* Status Messages */}
        {loading && (
          <p className="text-[#48633f] text-center text-md mt-8 mb-8 font-medium animate-pulse">
            Loading users...
          </p>
        )}

        {error && !loading && (
          <p className="text-red-600 text-center text-sm mt-4 mb-4 py-3">
            ⚠️ {error}
          </p>
        )}

        {/* Users Table / Cards */}
        {!loading && !error && (
          <>
            {usersOnCurrentPage.length === 0 ? (
              <p className="text-gray-600 text-center py-10 text-sm">
                No users found for the current filters.
              </p>
            ) : (
              <>
                {/* Table for medium+ screens */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Phone
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Role
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                      {usersOnCurrentPage.map((user) => (
                        <tr
                          key={user._id}
                          className="hover:bg-gray-50 transition-colors duration-150"
                        >
                          <td className="px-6 py-4 text-sm text-gray-900">
                            <div className="flex items-center gap-3">
                              {/* Avatar initials */}
                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#48633f]/10 text-xs font-semibold text-[#48633f]">
                                {getInitials(user)}
                              </div>
                              <div className="flex flex-col">
                                <span className="font-medium">
                                  {user.username || "Unnamed"}
                                </span>
                                <span className="text-xs text-gray-500">
                                  ID: {user._id?.slice(-6) || ""}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {user.phone || "N/A"}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            <RoleBadge role={user.role} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Card view for mobile */}
                <div className="md:hidden grid grid-cols-1 gap-4 p-4">
                  {usersOnCurrentPage.map((user) => (
                    <div
                      key={user._id}
                      className="border border-gray-200 rounded-xl p-4 shadow-sm bg-white hover:shadow-md transition"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#48633f]/10 text-sm font-semibold text-[#48633f]">
                          {getInitials(user)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-base">
                            {user.username || "Unnamed"}
                          </p>
                          <p className="text-[11px] text-gray-500">
                            ID: {user._id?.slice(-6) || ""}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-1.5 text-sm">
                        <p className="text-gray-600">
                          <span className="font-medium">Email: </span>
                          {user.email}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Phone: </span>
                          {user.phone || "N/A"}
                        </p>
                        <p className="text-gray-600 flex items-center gap-2">
                          <span className="font-medium">Role: </span>
                          <RoleBadge role={user.role} />
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  pageSize={USERS_PER_PAGE}
                  totalItems={totalItems}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ListUsers;




