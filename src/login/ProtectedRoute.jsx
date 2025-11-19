// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';

// const ProtectedRoute = ({ allowedRoles }) => {
//     // 1. Get token and role from storage
//     const token = localStorage.getItem('token');
//     const userRole = localStorage.getItem('role');

//     // 2. Check for token existence
//     // if (!token) {
//     //     // If no token, redirect to login
//     //     return <Navigate to="/login" replace />;
//     // }



//     // // // 3. Optional: Check for role (Authorization)
//     // if (allowedRoles && !allowedRoles.includes(userRole)) {
//     //     // If role doesn't match, redirect to an unauthorized page or login
//     //     return <Navigate to="/" replace />;
//     // }

    

    

//     // 4. If checks pass, render the child route (the dashboard)
//     return <Outlet />;
// };

// export default ProtectedRoute;



import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // Wait until AuthContext finishes initial auth check
  if (user.isInitialLoad) {
    return null; // Or loading spinner
  }

  if (!user.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;


