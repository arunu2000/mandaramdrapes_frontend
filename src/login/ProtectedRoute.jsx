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
import api from "../utils/api";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export default function ProtectedRoute({ children, allowedRole }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/getUserRole");

        if (res.data.role === allowedRole) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } catch (err) {
        setAuthorized(false);
      }

      setLoading(false);
    };

    checkAuth();
  }, [allowedRole]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={35} />
      </div>
    );
  }

  // ❗ If unauthorized → redirect to login
  if (!authorized) {
    return <Navigate to="/login" replace />;
  }

  return children;
}



