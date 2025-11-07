import React, { useEffect, useState } from "react";
import "./App.css";
import { CartProvider } from "./context/CartContext";
import AppRoutes from "./AppRoutes";
import NoInternet from "./pages/NoInternet";

function App() {
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
      {isOnline ? <AppRoutes /> : <NoInternet />}
    </CartProvider>
  );
}

export default App;








