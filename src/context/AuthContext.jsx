// // src/context/AuthContext.jsx (NEW FILE) working with recheck the backenddddddddddd


// import React, { createContext, useContext, useState, useEffect } from 'react';
// // import axios from 'axios';
// import api from "../utils/api"

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState({ 
//         role: null, 
//         isAuthenticated: false,
//         isInitialLoad: true // Tracks initial check
//     });

//     // Configure axios to send cookies globally
//     // axios.defaults.withCredentials = true;

//     // Core logic to check cookie status on the server
//     const checkAuthStatus = async () => {
//         try {
//             const res = await api.get(`/auth/status`); 
            
//             if (res.data.isLoggedIn) {
//                 // Update non-sensitive role in localStorage for future quick checks
//                 localStorage.setItem('role', res.data.role); 
                
//                 setUser({
//                     role: res.data.role,
//                     isAuthenticated: true,  
//                     isInitialLoad: false
//                 });
//             } else {
//                 // Server confirmed no valid cookie/session
//                 localStorage.removeItem('role');
//                 setUser({ role: null, isAuthenticated: false, isInitialLoad: false });
//             }
//         } catch (error) {
//             // General failure (network/server down)
//             localStorage.removeItem('role');
//             setUser({ role: null, isAuthenticated: false, isInitialLoad: false });
//         }
//     };

//     // Run once on mount to check cookie validity
//     useEffect(() => {
//         checkAuthStatus();
//     }, []);

//     // Function to manually clear state (used in logout)
//     const handleClientLogout = () => {
//         localStorage.removeItem('role');
//         setUser({ role: null, isAuthenticated: false, isInitialLoad: false });
//     };

//     const value = {
//         user,
//         setUser,
//         checkAuthStatus,
//         handleClientLogout,
//     };

//     return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };






// src/context/AuthContext.jsx (NEW FILE)with socketttttttttttttttttttttttttt


// import React, { createContext, useContext, useState, useEffect } from 'react';
// // import axios from 'axios';
// import api from "../utils/api";
// import socket from "../utils/socket";


// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState({ 
    
//         role: null, 
//         isAuthenticated: false,
//         isInitialLoad: true // Tracks initial check
//     });

//     // Configure axios to send cookies globally
//     // axios.defaults.withCredentials = true;

//     // Core logic to check cookie status on the server
//     const checkAuthStatus = async () => {
//         try {
//             const res = await api.get(`/auth/status`); 
            
//             if (res.data.isLoggedIn) {
//                 // Update non-sensitive role in localStorage for future quick checks
//                 localStorage.setItem('role', res.data.role); 
                
//                 setUser({
//                     role: res.data.role,
//                     isAuthenticated: true,  
//                     isInitialLoad: false
//                 });
//             } else {
//                 // Server confirmed no valid cookie/session
//                 localStorage.removeItem('role');
//                 setUser({ role: null, isAuthenticated: false, isInitialLoad: false });
//             }
//         } catch (error) {
//             // General failure (network/server down)
//             localStorage.removeItem('role');
//             setUser({ role: null, isAuthenticated: false, isInitialLoad: false });
//         }
//     };

//     // Run once on mount to check cookie validity
//     useEffect(() => {
//         checkAuthStatus();
//     }, []);

//     // Function to manually clear state (used in logout)
//     // const logout = () => {
//     //     localStorage.removeItem('role');
//     //     setUser({ role: null, isAuthenticated: false, isInitialLoad: false });
//     // };



// //     const logout = async () => {
// //   try {
// //     // 🔥 tell backend to clear cookies
// //     await api.post("/auth/logout", {}, { withCredentials: true });
// //   } catch (err) {
// //     console.error("Logout API failed", err);
// //   }

// //   // 🔥 clear frontend state
// //   localStorage.removeItem("role");
// //   localStorage.removeItem("ack_cart_count");
// //   localStorage.removeItem("ack_wishlist_count");

// //   setUser({
// //     role: null,
// //     isAuthenticated: false,
// //     isInitialLoad: false,
// //   });
// // };


// const logout = async () => {
//   try {
//     // 🔥 tell backend to clear cookies
//     await api.post("/auth/logout", {}, { withCredentials: true });
//   } catch (err) {
//     console.error("Logout API failed", err);
//   }

//   // ✅ IMPORTANT: disconnect socket ONCE
//   if (socket.connected) {
//     socket.disconnect();
//   }

//   // 🔥 clear frontend state
//   localStorage.removeItem("role");
//   localStorage.removeItem("ack_cart_count");
//   localStorage.removeItem("ack_wishlist_count");

//   setUser({
//     role: null,
//     isAuthenticated: false,
//     isInitialLoad: false,
//   });
// };



//     const value = {
//         user,
//         setUser,
//         checkAuthStatus,
//         logout,
//     };

//     return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };




import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/api";
import socket from "../utils/socket";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    role: null,
    isAuthenticated: false,
    isInitialLoad: true,
  });

  const checkAuthStatus = async () => {
    try {
      const res = await api.get("/auth/status", { withCredentials: true });

      if (res.data.isLoggedIn) {
        setUser({
          role: res.data.role,
          isAuthenticated: true,
          isInitialLoad: false,
        });
      } else {
        setUser({
          role: null,
          isAuthenticated: false,
          isInitialLoad: false,
        });
      }
    } catch (err) {
      setUser({
        role: null,
        isAuthenticated: false,
        isInitialLoad: false,
      });
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const logout = async () => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout API failed", err);
    }

    if (socket.connected) socket.disconnect();

    localStorage.removeItem("ack_cart_count");
    localStorage.removeItem("ack_wishlist_count");

    setUser({
      role: null,
      isAuthenticated: false,
      isInitialLoad: false,
    });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, checkAuthStatus, logout }}>
      {children}
    </AuthContext.Provider>
  );
};






