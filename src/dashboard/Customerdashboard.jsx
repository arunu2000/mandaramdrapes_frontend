//// workinggggggggg

"use client";

import React, { useRef, useState, useEffect, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import CategorySection from "../cart/CategorySection";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { domainUrl } from "../utils/constant";
import axios from "axios";
import Navbar from "../components/Navbar";
import FeaturedProducts from "../components/FeaturedProducts";
import { useAuth } from "../context/AuthContext";

import FooterSection from "../components/FooterSection";
import HeroCarousel from "../components/HeroCarousel";
import Loader from "../components/Loader";


// --- HOOKS & CONTEXT ---
import { useCart } from "../context/CartContext";
// import { ToastContainer, toast, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import toast, { Toaster, } from 'react-hot-toast';

import api from "../utils/api";
import SocialFooter from "../components/SocialFooter"

import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import SortDropdown from "../components/SortDropdown";
import ProductGrid from "../components/ProductGrid";
import { searchProducts } from "../api/productSearch";
import CuratedLooksGallery from "../components/CuratedLooksGallery";
import DiscountPage from "../components/DiscountPage";
import AnnouncementBar from "../components/AnnouncementBar";




// --- SIMPLIFIED NAVIGATION DATA ---
const simpleNavigation = {
  pages: [
    { name: "Home", href: "/", protected: false },
    { name: "Cart", href: "/cart", protected: true },
    { name: "My Orders", href: "/myorders", protected: true },
  ],
};

// Configure axios to send cookies (for session/JWT cookie)
// axios.defaults.withCredentials = true;

const Customerdashboard = () => {
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();
  // const token = localStorage.getItem("token"); // *** REMOVED: No longer reading token from localStorage ***
  const role = localStorage.getItem("role"); // --- STATE ---

  const [userProfile, setUserProfile] = useState(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  // Set isAuthenticated based on API response, not just local storage
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State for Featured Products

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState(null); // State for "Add to Bag" button loading
  const [isAdding, setIsAdding] = useState(null); // --- CART CONTEXT ---

  const { cartItems, fetchCart, notifyAuthChange } = useCart()
  
  const { user, checkAuthStatus, logout } = useAuth();
  const isAuthenticated = user.isAuthenticated;



  // SAFE fallback if parent has not passed the function yet


   

    // NEW: Protection Guard and Redirection
    useEffect(() => {
        if (user.isInitialLoad) return;
        
        // 1. If not authenticated, force to login
        // if (!user.isAuthenticated) {
        //     navigate("/login", { replace: true });
        //     return;
        // }
        if (user.role === 'admin') {
            navigate("/admindashboard", { replace: true });
        }
    }, [user.isInitialLoad, user.isAuthenticated, user.role, navigate]);; // --- ROLE REDIRECTION AND PROFILE FETCH ---

  useEffect(() => {
  const checkAuthAndFetchProfile = async () => {
    //  Skip profile fetch if logged out
    if (!isAuthenticated) {
      setIsProfileLoading(false);
      return;
    }

    setIsProfileLoading(true);

    try {
      const res = await api.get("/user/profile");

      setUserProfile(res.data.users);

      if (res.data.users?.role === "admin") {
        localStorage.setItem("role", "admin");
        navigate("/admindashboard", { replace: true });
        return;
      }
    } catch (err) {
      //  REMOVE console.error (this is normal)
      setUserProfile(null);
    } finally {
      setIsProfileLoading(false);
    }
  };

  checkAuthAndFetchProfile();
}, [isAuthenticated, navigate]);


  // --- DATA FETCHING --- // Fetch Featured Products
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setProductsLoading(true);
      setProductsError(null);
      try {
        // No header needed, this is public data
        const res = await api.get('/user/shop/products');
        if (res.data && res.data.products) {
          setFeaturedProducts(res.data.products);
        } else {
          setFeaturedProducts([]);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setProductsError("Could not load featured products.");
      } finally {
        setProductsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []); // --- HANDLERS ---




  
const handleLogoutClick = async () => {
  try {
    await api.post("/auth/logout");
  } catch (e) {}

  logout(); // AuthContext
  navigate("/", { replace: true });
};





  // Gated Navigation Handler for main navbar links
  const handleGatedNavigation = (e, path, isProtected) => {
    // Check if the page is protected AND the user is NOT authenticated
    if (isProtected && !isAuthenticated) {
      e.preventDefault();
      toast.warn("Please log in to view this page.", {
        onClose: () => navigate("/login"),
        autoClose: 2000,
        icon: "🔒",
      });
    } else if (isProtected && role === "admin") {
      e.preventDefault();
      navigate("/admindashboard");
    } else {
      navigate(path);
    }
  };
  // if (user.isInitialLoad || !user.isAuthenticated) {
  //       return <Loader message="Checking access..." />;
  //   }
  if (user.isInitialLoad ) {
        return <Loader message="Checking access..." />;
    }

  // Horizontal scroll handler (kept unchanged as it's UI logic)
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Add to Cart Handler
  const handleAddToCart = async (product) => {
    // Check for authentication state derived from API call, not local token
    if (!isAuthenticated || role !== "user") {
      toast.warn("Please log in to add items to your cart.", {
        onClose: () => navigate("/login"),
        autoClose: 2000,
      });
      return;
    }

    if (isAdding) return;

    setIsAdding(product._id);

    try {
      // Check if item is already in cart
      const isAlreadyInCart = cartItems.some(
        (item) => item.productId === product._id
      );

      if (isAlreadyInCart) {
        toast.info("Already in cart. Redirecting...", {
          icon: "🛒",
          autoClose: 1500,
          onClose: () => navigate("/cart"),
        });
        return;
      }
      // API call to add to cart - Cookie is sent automatically
      const cartData = { productId: product._id, quantity: 1 };
      // *** REMOVED `headers: { Authorization: ... }` from here and next function call ***
      await api.post('/cart/add', cartData);

      // Show success toast and redirect
      toast.success(`${product.name} added! Redirecting...`, {
        icon: "🛍️",
        autoClose: 1500,
        onClose: () => {
          fetchCart(); // Refresh cart context
          navigate("/cart");
        },
      });
    } catch (err) {
      console.error("Error adding to cart:", err);
      // If 401 Unauthorized, the user's session might have expired.
      if (err.response?.status === 401) {
          toast.error("Session expired. Please log in again.", {
            onClose: () => navigate("/login"),
          });
      } else {
        toast.error(err.response?.data?.message || "Failed to add to cart.");
      }
    } finally {
      setIsAdding(null);
    }
  };
  
  // Helper to format image URL (kept unchanged)
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/300?text=No+Image";
    return imagePath.startsWith("http")
      ? imagePath
      : `${domainUrl}/${imagePath}`;
  };

  // --- PROFILE ICON HANDLER ---
  const handleUserIconClick = () => {
    // If not logged in → login page
    if (!isAuthenticated || role !== "user") {
      navigate("/login");
      return;
    }

    // Logged-in customer → Profile page
    navigate("/profile");
  };


  // --- RENDER ---

  // Display loading screen while profile is being checked
  if (isProfileLoading) {
    return <Loader message="Loading..." />;
  }

  // FINAL CHECK: If role is confirmed as admin at this point, show redirect notice
  if (role === "admin") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-600 font-medium">Redirecting to Admin...</p>
      </div>
    );
  }

  const cartItemCount = cartItems.length;

  return (
    <div className="bg-white">
      {/* --- FIXED NAVBAR --- */}



      {/* <Navbar
        isAuthenticated={isAuthenticated} // *** CHANGED: Passing isAuthenticated prop instead of token ***
        role={role}
        cartItemCount={user.isAuthenticated ? cartItems.length : 0}
        handleLogout={handleLogoutClick}
        handleUserIconClick={handleUserIconClick}
        handleGatedNavigation={handleGatedNavigation} */}
      {/* /> */}


      
      {/* --- PROFILE MODAL (Your existing code) --- */}

      {/* --- END PROFILE MODAL --- */}
      {/* Hero Section Carousel */}
      <HeroCarousel />
      <AnnouncementBar/>
      {/* Category Section */}
      <CategorySection />
      <DiscountPage/>
      <CuratedLooksGallery />
      
      
      {/* --- UPDATED Product Section (Horizontal Scroll) --- */}
      <FeaturedProducts
        featuredProducts={featuredProducts}
        productsLoading={productsLoading}
        productsError={productsError}
        handleAddToCart={handleAddToCart}
        isAdding={isAdding}
      />
      {/* About Us Footer Section */}
      <FooterSection />
      {/* <SocialFooter/> */}
      {/* Toast Container for notifications */}
      {/* <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}
      /> */}

      <Toaster
                                position="top-right"
                                toastOptions={{
                                  duration: 2000,
                                  style: {
                                    borderRadius: "10px",
                                    fontFamily: "Inter, sans-serif",
                                  },
                                }}
                              />
    </div>
  );
};

export default Customerdashboard;





