import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Bars3Icon, ShoppingCartIcon, UserIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import logo123 from "../assets/logo123.png";

const Navbar = ({ token, role, cartItemCount, handleLogout, handleUserIconClick, handleGatedNavigation }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Simplified navigation data (can be moved to a separate config file later)
  const simpleNavigation = {
    pages: [
      { name: "Home", href: "/", protected: false },
      { name: "Cart", href: "/cart", protected: true },
      { name: "My Orders", href: "/myorders", protected: true },
    ],
  };

  return (
    <header className="relative z-30">
      <div className="fixed top-0 w-full z-40 shadow-lg">
        <nav aria-label="Top">
          {/* Top navigation - Info Banner */}
          <div className="bg-gray-900">
            <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
              <div className="hidden lg:block lg:flex-1" />

              <p className="flex-1 text-center text-sm font-medium text-white lg:flex-none">
                Get free delivery on orders over ₹100
              </p>

              {/* Auth Links (Desktop) */}
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                {!token ? (
                  <>
                    <Link to="/login" className="text-sm font-medium text-white hover:text-gray-100">
                      Sign in
                    </Link>
                    <span aria-hidden="true" className="h-6 w-px bg-gray-600" />
                    <Link to="/signup" className="text-sm font-medium text-white hover:text-gray-100">
                      Create an account
                    </Link>
                  </>
                ) : (
                  <button onClick={handleLogout} className="text-sm font-medium text-white hover:text-gray-100">
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Secondary navigation - Main Menu */}
          <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="border-b border-gray-200">
                <div className="flex h-16 items-center justify-between">
                  {/* Mobile Menu Icon */}
                  <div className="flex flex-1 items-center lg:hidden">
                    <button
                      type="button"
                      onClick={() => setMobileMenuOpen(true)}
                      className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                    >
                      <span className="sr-only">Open menu</span>
                      <Bars3Icon aria-hidden="true" className="size-6" />
                    </button>
                    <div className="ml-2 p-2 w-6 h-6" aria-hidden="true" />
                  </div>

                  {/* Logo */}
                  <div className="flex items-center justify-center lg:flex-none lg:justify-start">
                    <Link to="/">
                      <span className="sr-only">Mandaram Drapes</span>
                      <img alt="Mandaram Drapes Logo" src={logo123} className="h-10 w-auto" />
                    </Link>
                  </div>

                  {/* Main Navigation (Desktop) */}
                  <div className="hidden h-full lg:flex flex-1 items-center justify-center">
                    <div className="flex h-full justify-center space-x-8">
                      {simpleNavigation.pages.map((page) => (
                        <a
                          key={page.name}
                          href={page.href}
                          className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                          onClick={(e) => handleGatedNavigation(e, page.href, page.protected)}
                        >
                          {page.name}
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Icons (Account, Cart) */}
                  <div className="flex flex-1 items-center justify-end">
                    <div className="flex items-center lg:ml-8">
                      <div className="flex space-x-8">
                        {/* Account/User Icon */}
                        <button
                          onClick={handleUserIconClick}
                          className="-m-2 p-2 text-gray-400 hover:text-gray-500 focus:outline-none"
                        >
                          <span className="sr-only">Account</span>
                          <UserIcon aria-hidden="true" className="size-6" />
                        </button>
                      </div>

                      <span aria-hidden="true" className="mx-4 h-6 w-px bg-gray-200 lg:mx-6" />

                      {/* Cart Icon */}
                      <Link to="/cart" className="group -m-2 flex items-center p-2">
                        <ShoppingCartIcon
                          aria-hidden="true"
                          className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                          {cartItemCount}
                        </span>
                        <span className="sr-only">items in cart, view bag</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* --- MOBILE MENU --- */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0" />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full">
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {simpleNavigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <a
                    href={page.href}
                    className="-m-2 block p-2 font-medium text-gray-900"
                    onClick={(e) => {
                      handleGatedNavigation(e, page.href, page.protected);
                      setMobileMenuOpen(false);
                    }}
                  >
                    {page.name}
                  </a>
                </div>
              ))}
            </div>

            {/* Auth Links */}
            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {!token ? (
                <>
                  <div className="flow-root">
                    <Link
                      to="/login"
                      className="-m-2 block p-2 font-medium text-gray-900"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign in
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link
                      to="/signup"
                      className="-m-2 block p-2 font-medium text-gray-900"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Create an account
                    </Link>
                  </div>
                </>
              ) : (
                <div className="flow-root">
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </header>
  );
};

export default Navbar;
