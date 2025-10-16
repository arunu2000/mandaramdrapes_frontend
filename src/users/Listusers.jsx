import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
// Assumes you have @heroicons/react installed
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'; 

// Utility component for the pagination controls
const PaginationControls = ({ currentPage, totalPages, onPageChange }) => (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700 px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
            >
                Previous
            </button>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
            >
                Next
            </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
                {/* Note: This is an approximation for total items, assuming all pages are full except the last */}
                <p className="text-sm text-gray-700 dark:text-gray-300">
                    Showing <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> to{' '}
                    <span className="font-medium">{Math.min(currentPage * 10, totalPages * 10)}</span> of{' '}
                    <span className="font-medium">{totalPages * 10}</span> results
                </p>
            </div>
            <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 dark:text-gray-300 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                    >
                        <span className="sr-only">Previous</span>
                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    {/* Simplified page number rendering */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            aria-current={page === currentPage ? 'page' : undefined}
                            className={`relative hidden items-center px-4 py-2 text-sm font-semibold focus:z-20 focus:outline-offset-0 md:inline-flex ${
                                page === currentPage
                                    ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                    : 'text-gray-900 dark:text-gray-300 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 dark:text-gray-300 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                    >
                        <span className="sr-only">Next</span>
                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                </nav>
            </div>
        </div>
    </div>
);

// Main ListUsers Component
const ListUsers = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const USERS_PER_PAGE = 10; // Define how many users per page

    useEffect(() => {
        const token = localStorage.getItem("token");
        setLoading(true);

        axios
            .get("http://192.168.29.217:5000/api/admin/users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setAllUsers(res.data.users || []);
                setError("");
                setCurrentPage(1); // Reset to page 1 on new data fetch
            })
            .catch((err) => {
                console.error("Error fetching users:", err);
                setError("Failed to load users. Please check your network or try again.");
                setAllUsers([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // Calculate total pages
    const totalPages = Math.ceil(allUsers.length / USERS_PER_PAGE);

    // Get the users for the current page using useMemo for efficiency
    const usersOnCurrentPage = useMemo(() => {
        const startIndex = (currentPage - 1) * USERS_PER_PAGE;
        const endIndex = startIndex + USERS_PER_PAGE;
        return allUsers.slice(startIndex, endIndex);
    }, [allUsers, currentPage, USERS_PER_PAGE]);

    // Handler for page change
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Removed handleAction function

    return (
        <div className="px-4 sm:px-6 lg:px-8 pt-8 min-h-screen bg-gray-50 dark:bg-gray-950">
            
            {/* Header only (Add User button removed) */}
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        Users List
                    </h1>
                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                        A list of all registered users.
                    </p>
                </div>
                {/* Add User Button div is removed */}
            </div>
            
            <hr className="my-5 border-gray-200 dark:border-gray-800" />
            
            {/* Status Messages */}
            {loading && (
                <p className="text-indigo-600 text-center text-md mt-6">Loading users...</p>
            )}

            {error && (
                <p className="text-red-500 text-center text-md mt-6 p-3 bg-red-50 rounded-md border border-red-200">
                    ⚠️ {error}
                </p>
            )}
            
            {/* User Table and Pagination */}
            {!loading && !error && (
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            {usersOnCurrentPage.length === 0 ? (
                                <p className="text-gray-600 text-center py-10 dark:text-gray-400">
                                    No users found.
                                </p>
                            ) : (
                                <div className="shadow-md rounded-lg overflow-hidden">
                                    <table className="min-w-full divide-y divide-gray-300 dark:divide-white/15">
                                        <thead className="bg-gray-50 dark:bg-gray-800">
                                            <tr>
                                                <th scope="col" className="py-3 pr-3 pl-4 text-left text-xs font-medium tracking-wide text-gray-500 uppercase sm:pl-6 dark:text-gray-400">Username</th>
                                                <th scope="col" className="px-3 py-3 text-left text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">Email</th>
                                                <th scope="col" className="px-3 py-3 text-left text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">Phone</th>
                                                <th scope="col" className="px-3 py-3 text-left text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">Role</th>
                                                {/* Edit column header is removed */}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                                            {usersOnCurrentPage.map((user) => (
                                                <tr key={user._id}>
                                                    <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6 dark:text-white">{user.username}</td>
                                                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">{user.email}</td>
                                                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">{user.phone || 'N/A'}</td>
                                                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400 capitalize">{user.role}</td>
                                                    {/* Edit button column is removed */}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    
                                    {/* Pagination Controls */}
                                    <PaginationControls
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListUsers;


