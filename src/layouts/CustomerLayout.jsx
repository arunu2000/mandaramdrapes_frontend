import React from "react";
import Navbar from "../components/Navbar";
import FooterSection from "../components/FooterSection";

const CustomerLayout = ({
  children,
  token,
  role,
  cartItemCount,
  handleLogout,
  handleUserIconClick,
  handleGatedNavigation
}) => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Navbar always at top */}
      <Navbar
        token={token}
        role={role}
        cartItemCount={cartItemCount}
        handleLogout={handleLogout}
        handleUserIconClick={handleUserIconClick}
        handleGatedNavigation={handleGatedNavigation}
      />

      {/* Page content goes here */}
      <main className="flex-grow mt-[6.5rem]">
        {children}
      </main>

      {/* Footer always at bottom */}
      <FooterSection />
    </div>
  );
};

export default CustomerLayout;
