// src/context/AuthContext.jsx (NEW FILE)
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import api from "../utils/api"

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({ 
        role: null, 
        isAuthenticated: false,
        isInitialLoad: true // Tracks initial check
    });

    // Configure axios to send cookies globally
    axios.defaults.withCredentials = true;

    // Core logic to check cookie status on the server
    const checkAuthStatus = async () => {
        try {
            const res = await api.get(`/auth/status`); 
            console.log('!!!!!!!!!!!!!!!!!!!',res.data)
            
            if (res.data.isLoggedIn) {
                // Update non-sensitive role in localStorage for future quick checks
                localStorage.setItem('role', res.data.role); 
                
                setUser({
                    role: res.data.role,
                    isAuthenticated: true,  
                    isInitialLoad: false
                });
            } else {
                // Server confirmed no valid cookie/session
                localStorage.removeItem('role');
                setUser({ role: null, isAuthenticated: false, isInitialLoad: false });
            }
        } catch (error) {
            // General failure (network/server down)
            localStorage.removeItem('role');
            setUser({ role: null, isAuthenticated: false, isInitialLoad: false });
        }
    };

    // Run once on mount to check cookie validity
    useEffect(() => {
        checkAuthStatus();
    }, []);

    // Function to manually clear state (used in logout)
    const handleClientLogout = () => {
        localStorage.removeItem('role');
        setUser({ role: null, isAuthenticated: false, isInitialLoad: false });
    };

    const value = {
        user,
        setUser,
        checkAuthStatus,
        handleClientLogout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};