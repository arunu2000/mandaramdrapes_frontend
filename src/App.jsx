// import React, { useEffect, useState } from "react";
// import "./App.css";
// import { CartProvider } from "./context/CartContext";
// import AppRoutes from "./AppRoutes";
// import NoInternet from "./pages/NoInternet";
// import { AuthProvider } from "./context/AuthContext";

// function App() {
//   const [isOnline, setIsOnline] = useState(navigator.onLine);

//   useEffect(() => {
//     const handleOnline = () => setIsOnline(true);
//     const handleOffline = () => setIsOnline(false);

//     window.addEventListener("online", handleOnline);
//     window.addEventListener("offline", handleOffline);

//     return () => {
//       window.removeEventListener("online", handleOnline);
//       window.removeEventListener("offline", handleOffline);
//     };
//   }, []);

//   return (
//     <CartProvider>
//       {isOnline ? <AppRoutes /> : <NoInternet />}
//     </CartProvider>
//   );
// }

// export default App;

// import React, { useEffect, useState } from "react";
// import "./App.css";
// import { CartProvider } from "./context/CartContext";
// import { AuthProvider } from "./context/AuthContext";   // <-- ADD THIS
// import AppRoutes from "./AppRoutes";
// import NoInternet from "./pages/NoInternet";

// function App() {
//   const [isOnline, setIsOnline] = useState(navigator.onLine);

//   useEffect(() => {
//     const handleOnline = () => setIsOnline(true);
//     const handleOffline = () => setIsOnline(false);

//     window.addEventListener("online", handleOnline);
//     window.addEventListener("offline", handleOffline);

//     return () => {
//       window.removeEventListener("online", handleOnline);
//       window.removeEventListener("offline", handleOffline);
//     };
//   }, []);

//   return (
//     <AuthProvider>                {/* <-- MUST WRAP EVERYTHING */}
//       <CartProvider>
//         {isOnline ? <AppRoutes /> : <NoInternet />}
//       </CartProvider>
//     </AuthProvider>
//   );
// }

// export default App;

//workinggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg

// import React, { useEffect, useState } from "react";
// import "./App.css";
// import { CartProvider } from "./context/CartContext";
// import { AuthProvider } from "./context/AuthContext";
// import AppRoutes from "./AppRoutes";
// import NoInternet from "./pages/NoInternet";
// import { WishlistProvider } from "./context/WishlistContext";

// function App() {
//   const [isOnline, setIsOnline] = useState(navigator.onLine);

//   useEffect(() => {
//     const handleOnline = () => setIsOnline(true);
//     const handleOffline = () => setIsOnline(false);

//     window.addEventListener("online", handleOnline);
//     window.addEventListener("offline", handleOffline);

//     return () => {
//       window.removeEventListener("online", handleOnline);
//       window.removeEventListener("offline", handleOffline);
//     };
//   }, []);

//   return (
//     <AuthProvider>
//       <CartProvider>
//         <WishlistProvider>
//               {isOnline ? <AppRoutes /> : <NoInternet />}
//         </WishlistProvider>
//       </CartProvider>
//     </AuthProvider>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";
import "./App.css";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext"; // AuthProvider is imported
import { useAuth } from "./context/AuthContext"; // 👈 NEW: Import useAuth to get the status
import AppRoutes from "./AppRoutes";
import NoInternet from "./pages/NoInternet";
import { WishlistProvider } from "./context/WishlistContext";

// New component to wrap content that depends on AuthContext
function AppContent() {
    // ⭐️ Retrieve authentication status here
    const { isAuthenticated } = useAuth();

    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    return (
        <CartProvider>
            {/* ⭐️ Pass isAuthenticated as a prop to WishlistProvider */}
            <WishlistProvider isAuthenticated={isAuthenticated}>
                  {isOnline ? <AppRoutes /> : <NoInternet />}
            </WishlistProvider>
        </CartProvider>
    );
}

function App() {
    // AuthProvider must wrap AppContent for useAuth() to work
    return (
        
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;




