// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import { domainUrl } from '../utils/constant'; // Assuming domainUrl is accessible

// const AuthContext = createContext();

// export const useAuth = () => {
//     return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//     // State to hold user info fetched from the server via cookie validation
//     const [user, setUser] = useState({ 
//         role: null, 
//         isAuthenticated: false,
//         isLoading: true // Assume loading initially
//     });

//     const checkAuthStatus = async () => {
//         // Assume failure initially
//         let newRole = null;
//         let isAuthenticated = false;

//         try {
//             // Hit a theoretical endpoint to check for a valid cookie and return role
//             // NOTE: This endpoint must be implemented on your backend!
//             const res = await axios.get(`${domainUrl}/auth/status`, { withCredentials: true }); 
            
//             if (res.data.isLoggedIn && res.data.role) {
//                 newRole = res.data.role;
//                 isAuthenticated = true;
//             }
//         } catch (error) {
//             // If the cookie is expired or invalid, the request usually returns 401/403
//             // We ensure local storage is clean in this case
//             localStorage.removeItem('role'); 
//         }

//         // Update the global state
//         setUser({
//             role: newRole,
//             isAuthenticated: isAuthenticated,
//             isLoading: false
//         });
        
//         // Return the role for immediate use in redirecting inside App.jsx
//         return newRole; 
//     };

//     // Run once on mount to check cookie validity
//     useEffect(() => {
//         checkAuthStatus();
//     }, []);

//     // Provider Value
//     const value = {
//         user,
//         setUser, // Function to update user state after login/logout
//         checkAuthStatus, // Function to manually re-validate cookie (e.g., on logout)
//     };

//     return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };