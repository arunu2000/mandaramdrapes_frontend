import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const MainLayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated, role, logout } = useAuth();
  const { cartItemCount } = useCart();

  const handleGatedNavigation = (e, path, isProtected) => {
    e.preventDefault();

    if (isProtected && !isAuthenticated) {
      navigate("/login");
    } else if (isProtected && role === "admin") {
      navigate("/admindashboard");
    } else {
      navigate(path);
    }
  };

  const handleUserIconClick = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate("/profile");
    }
  };

  return (
    <>
      <Navbar
        isAuthenticated={isAuthenticated}
        role={role}
        cartItemCount={cartItemCount}
        handleLogout={logout}
        handleUserIconClick={handleUserIconClick}
        handleGatedNavigation={handleGatedNavigation}
      />

      {/* All pages render here */}
      <Outlet />
    </>
  );
};

export default MainLayout;
