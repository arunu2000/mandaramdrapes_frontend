// //working codeeee

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Signup from "./login/Signup";
// import Login from "./login/Login";
// import Admindashboard from "./dashboard/Admindashboard";
// import Customerdashboard from "./dashboard/Customerdashboard";
// import Home from "./home/Home";
// import ManageUsers from "./users/ManageUsers";
// import Adduser from "./users/Adduser";
// import Listusers from "./users/Listusers";
// import Managecategories from "./categories/Managecategories";
// import Addcategory from "./categories/Addcategory";
// import Listcategory from "./categories/Listcategory";
// import Manageproducts from "./products/Manageproducts";
// import Addproducts from "./products/Addproducts";
// import Listproducts from "./products/Listproducts";
// import Cartpage from "./cart/Cartpage";
// import CategoryProductPage from "./cart/CategoryProductPage";
// import ProductDetailPage from "./cart/ProductDetailPage";
// import MyOrdersPage from "./orders/MyOrdersPage";
// import AdminOrderManagement from "./dashboard/AdminOrderManagement";
// import NotFound from "./pages/NotFound";
// import WhishlistPage from "./pages/WishlistPage";
// import ProductsPage from "./components/AllProducts";
// import ProtectedRoute from "./login/ProtectedRoute";
// import ProfilePage from "./pages/ProfilePage";
// import AdminProfile from "./dashboard/AdminProfile";
// import OrderSuccess from "./pages/OrderSuccess";


// const AppRoutes = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* ADMIN PROTECTED ROUTES */}
//         <Route
//           path="/admindashboard"
//           element={
//             <ProtectedRoute>
//               <Admindashboard />
//             </ProtectedRoute>
//           }
//         >
//           <Route index element={<Home />} />
//           <Route path="manageuser" element={<ManageUsers />} />
//           <Route path="manageuser/adduser" element={<Adduser />} />
//           <Route path="manageuser/listusers" element={<Listusers />} />
//           <Route path="managecategories" element={<Managecategories />} />
//           <Route
//             path="managecategories/addcategory"
//             element={<Addcategory />}
//           />
//           <Route
//             path="managecategories/listcategory"
//             element={<Listcategory />}
//           />
//           <Route path="manageproducts" element={<Manageproducts />} />
//           <Route path="manageproducts/addproducts" element={<Addproducts />} />
//           <Route
//             path="manageproducts/Listproducts"
//             element={<Listproducts />}
//           />
//           <Route
//             path="adminordermanagement"
//             element={<AdminOrderManagement />}
//           />

//           <Route path="profile" element={<AdminProfile />} />
//         </Route>

//         {/* CUSTOMER PROTECTED ROUTES */}

//         <Route
//   path="/order-success"
//   element={
//     <ProtectedRoute>
//       <OrderSuccess />
//     </ProtectedRoute>
//   }
// />


//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <Customerdashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/products"
//           element={
//             <ProtectedRoute>
//               <ProductsPage />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/WishlistPage"
//           element={
//             <ProtectedRoute>
//               <WhishlistPage />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/cart"
//           element={
//             <ProtectedRoute>
//               <Cartpage />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/categories/:slug"
//           element={
//             <ProtectedRoute>
//               <CategoryProductPage />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/products/:productId"
//           element={
//             <ProtectedRoute>
//               <ProductDetailPage />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/myorders"
//           element={
//             <ProtectedRoute>
//               <MyOrdersPage />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/profile"
//           element={
//             <ProtectedRoute>
//               <ProfilePage />
//             </ProtectedRoute>
//           }
//         />

//         {/* PUBLIC ROUTES */}
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </Router>
//   );
// };

// export default AppRoutes;

//updated code For All the Users  workflowwwwww

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Signup from "./login/Signup";
// import Login from "./login/Login";

// import Admindashboard from "./dashboard/Admindashboard";
// import Customerdashboard from "./dashboard/Customerdashboard";

// import Home from "./home/Home";

// import ManageUsers from "./users/ManageUsers";
// import Adduser from "./users/Adduser";
// import Listusers from "./users/Listusers";


// import Addcategory from "./categories/Addcategory";
// import Listcategory from "./categories/Listcategory";

// import Manageproducts from "./products/Manageproducts";
// import Addproducts from "./products/Addproducts";
// import Listproducts from "./products/Listproducts";

// import Cartpage from "./cart/Cartpage";
// import CategoryProductPage from "./cart/CategoryProductPage";
// import ProductDetailPage from "./cart/ProductDetailPage";

// import MyOrdersPage from "./orders/MyOrdersPage";
// import AdminOrderManagement from "./dashboard/AdminOrderManagement";

// import NotFound from "./pages/NotFound";
// import WhishlistPage from "./pages/WishlistPage";
// import ProductsPage from "./components/AllProducts";

// import ProtectedRoute from "./login/ProtectedRoute";
// import ProfilePage from "./pages/ProfilePage";
// import AdminProfile from "./dashboard/AdminProfile";
// import OrderSuccess from "./pages/OrderSuccess";
// import CheckoutPage from "./cart/CheckoutPage";
// import { NotificationProvider } from "./context/NotificationContext";
// import CuratedLooksGallery from './components/CuratedLooksGallery';




// const AppRoutes = () => {
//   return (
//     <Router>
//       <Routes>

//         {/* ===================== ADMIN PROTECTED ROUTES ===================== */}
//         {/* <Route
//           path="/admindashboard"
//           element={
//             <ProtectedRoute>
//               <Admindashboard />
//             </ProtectedRoute>
//           }
//         > */}

//         <Route
//   path="/admindashboard"
//   element={
//     <ProtectedRoute>
//       <NotificationProvider>
//         <Admindashboard />
//       </NotificationProvider>
//     </ProtectedRoute>
//   }
// >

//           <Route index element={<Home />} />
//           <Route path="manageuser" element={<ManageUsers />} />
//           <Route path="manageuser/adduser" element={<Adduser />} />
//           <Route path="manageuser/listusers" element={<Listusers />} />

          
//           <Route path="managecategories/addcategory" element={<Addcategory />} />
//           <Route path="managecategories/listcategory" element={<Listcategory />} />

//           <Route path="manageproducts" element={<Manageproducts />} />
//           <Route path="manageproducts/addproducts" element={<Addproducts />} />
//           <Route path="manageproducts/listproducts" element={<Listproducts />} />

//           <Route
//             path="adminordermanagement"
//             element={<AdminOrderManagement />}
//           />

//           <Route path="profile" element={<AdminProfile />} />
//         </Route>

//         {/* ===================== PUBLIC CUSTOMER ROUTES ===================== */}
//         {/* Anyone can access these (NO LOGIN REQUIRED) */}

//         <Route path="/" element={<Customerdashboard />} />
//         <Route path="/products" element={<ProductsPage />} />
//         <Route path="/categories/:slug" element={<CategoryProductPage />} />
//         <Route
//           path="/products/:productId"
//           element={<ProductDetailPage />}
//         />

//         {/* ===================== CUSTOMER PROTECTED ROUTES ===================== */}
//         {/* Login REQUIRED */}

//         <Route
//           path="/cart"
//           element={
//             <ProtectedRoute>
//               <Cartpage />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/WishlistPage"
//           element={
//             <ProtectedRoute>
//               <WhishlistPage />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/myorders"
//           element={
//             <ProtectedRoute>
//               <MyOrdersPage />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/profile"
//           element={
//             <ProtectedRoute>
//               <ProfilePage />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/order-success"
//           element={
//             <ProtectedRoute>
//               <OrderSuccess />
//             </ProtectedRoute>
//           }
//         />


//         <Route
//   path="/checkout"
//   element={
//     <ProtectedRoute>
//       <CheckoutPage />
//     </ProtectedRoute>
//   }
// />


//         {/* ===================== AUTH ROUTES ===================== */}
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />

//         {/* ===================== FALLBACK ===================== */}
//         <Route path="*" element={<NotFound />} />

//       </Routes>
//     </Router>
//   );
// };

// export default AppRoutes;



// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// /* ==================== CONTEXT HOOKS ==================== */
// import { useAuth } from "./context/AuthContext";
// import { useCart } from "./context/CartContext";

// /* ==================== GLOBAL COMPONENTS ==================== */
// import Navbar from "./components/Navbar";

// /* ==================== AUTH ==================== */
// import Signup from "./login/Signup";
// import Login from "./login/Login";
// import ProtectedRoute from "./login/ProtectedRoute";

// /* ==================== DASHBOARDS ==================== */
// import Admindashboard from "./dashboard/Admindashboard";
// import Customerdashboard from "./dashboard/Customerdashboard";

// /* ==================== ADMIN ==================== */
// import ManageUsers from "./users/ManageUsers";
// import Adduser from "./users/Adduser";
// import Listusers from "./users/Listusers";

// import Addcategory from "./categories/Addcategory";
// import Listcategory from "./categories/Listcategory";

// import Manageproducts from "./products/Manageproducts";
// import Addproducts from "./products/Addproducts";
// import Listproducts from "./products/Listproducts";

// import AdminOrderManagement from "./dashboard/AdminOrderManagement";
// import AdminProfile from "./dashboard/AdminProfile";

// /* ==================== CUSTOMER ==================== */
// import ProductsPage from "./components/AllProducts";
// import CategoryProductPage from "./cart/CategoryProductPage";
// import ProductDetailPage from "./cart/ProductDetailPage";

// import Cartpage from "./cart/Cartpage";
// import CheckoutPage from "./cart/CheckoutPage";

// import MyOrdersPage from "./orders/MyOrdersPage";
// import WhishlistPage from "./pages/WishlistPage";
// import ProfilePage from "./pages/ProfilePage";
// import OrderSuccess from "./pages/OrderSuccess";

// /* ==================== MISC ==================== */
// import Home from "./home/Home";
// import NotFound from "./pages/NotFound";

// /* ==================== NOTIFICATIONS ==================== */
// import { NotificationProvider } from "./context/NotificationContext";
// import { useLocation } from "react-router-dom";

// const location = useLocation();

// const isAdminRoute = location.pathname.startsWith("/admindashboard");



// const AppRoutes = () => {
//   const {  logout, user } = useAuth();
//   const { cartItems } = useCart();



//   return (
//     <Router>
//       {/* ==================== GLOBAL NAVBAR ==================== */}
//       {/* <Navbar
//         isAuthenticated={isAuthenticated}
//         role={user?.role}
//         cartItemCount={cartItems.length}
//         handleLogout={logout}
//       /> */}

//       <Navbar
//   user={user}
//   role={user.role}
//   cartItemCount={user.isAuthenticated ? cartItems.length : 0}
//   handleLogout={logout}
// />



//       {/* ==================== PAGE CONTENT ==================== */}
//       <div className="pt-20">
//         <Routes>

//           {/* ===================== ADMIN ROUTES ===================== */}
//           <Route
//             path="/admindashboard"
//             element={
//               <ProtectedRoute>
//                 <NotificationProvider>
//                   <Admindashboard />
//                 </NotificationProvider>
//               </ProtectedRoute>
//             }
//           >
//             <Route index element={<Home />} />

//             <Route path="manageuser" element={<ManageUsers />} />
//             <Route path="manageuser/adduser" element={<Adduser />} />
//             <Route path="manageuser/listusers" element={<Listusers />} />

//             <Route path="managecategories/addcategory" element={<Addcategory />} />
//             <Route path="managecategories/listcategory" element={<Listcategory />} />

//             <Route path="manageproducts" element={<Manageproducts />} />
//             <Route path="manageproducts/addproducts" element={<Addproducts />} />
//             <Route path="manageproducts/listproducts" element={<Listproducts />} />

//             <Route
//               path="adminordermanagement"
//               element={<AdminOrderManagement />}
//             />

//             <Route path="profile" element={<AdminProfile />} />
//           </Route>

//           {/* ===================== PUBLIC CUSTOMER ===================== */}
//           <Route path="/" element={<Customerdashboard />} />
//           <Route path="/products" element={<ProductsPage />} />
//           <Route path="/categories/:slug" element={<CategoryProductPage />} />
//           <Route
//             path="/products/:productId"
//             element={<ProductDetailPage />}
//           />

//           {/* ===================== CUSTOMER PROTECTED ===================== */}
//           <Route
//             path="/cart"
//             element={
//               <ProtectedRoute>
//                 <Cartpage />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/checkout"
//             element={
//               <ProtectedRoute>
//                 <CheckoutPage />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/WishlistPage"
//             element={
//               <ProtectedRoute>
//                 <WhishlistPage />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/myorders"
//             element={
//               <ProtectedRoute>
//                 <MyOrdersPage />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/profile"
//             element={
//               <ProtectedRoute>
//                 <ProfilePage />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/order-success"
//             element={
//               <ProtectedRoute>
//                 <OrderSuccess />
//               </ProtectedRoute>
//             }
//           />

//           {/* ===================== AUTH ===================== */}
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/login" element={<Login />} />

//           {/* ===================== FALLBACK ===================== */}
//           <Route path="*" element={<NotFound />} />

//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default AppRoutes;






// import { Routes, Route, useLocation } from "react-router-dom";

// /* ==================== CONTEXT HOOKS ==================== */
// import { useAuth } from "./context/AuthContext";
// import { useCart } from "./context/CartContext";

// /* ==================== GLOBAL COMPONENTS ==================== */
// import Navbar from "./components/Navbar";

// /* ==================== AUTH ==================== */
// import Signup from "./login/Signup";
// import Login from "./login/Login";
// import ProtectedRoute from "./login/ProtectedRoute";

// /* ==================== DASHBOARDS ==================== */
// import Admindashboard from "./dashboard/Admindashboard";
// import Customerdashboard from "./dashboard/Customerdashboard";

// /* ==================== ADMIN ==================== */
// import ManageUsers from "./users/ManageUsers";
// import Adduser from "./users/Adduser";
// import Listusers from "./users/Listusers";

// import Addcategory from "./categories/Addcategory";
// import Listcategory from "./categories/Listcategory";

// import Manageproducts from "./products/Manageproducts";
// import Addproducts from "./products/Addproducts";
// import Listproducts from "./products/Listproducts";

// import AdminOrderManagement from "./dashboard/AdminOrderManagement";
// import AdminProfile from "./dashboard/AdminProfile";

// /* ==================== CUSTOMER ==================== */
// import ProductsPage from "./components/AllProducts";
// import CategoryProductPage from "./cart/CategoryProductPage";
// import ProductDetailPage from "./cart/ProductDetailPage";

// import Cartpage from "./cart/Cartpage";
// import CheckoutPage from "./cart/CheckoutPage";

// import MyOrdersPage from "./orders/MyOrdersPage";
// import WhishlistPage from "./pages/WishlistPage";
// import ProfilePage from "./pages/ProfilePage";
// import OrderSuccess from "./pages/OrderSuccess";

// /* ==================== MISC ==================== */
// import Home from "./home/Home";
// import NotFound from "./pages/NotFound";

// /* ==================== NOTIFICATIONS ==================== */
// import { NotificationProvider } from "./context/NotificationContext";
// import { UserNotificationProvider } from "./context/UserNotificationContext";


// const AppRoutes = () => {
//   const { logout, user } = useAuth();
//   const { cartItems } = useCart();

//   const location = useLocation();
//   const isAdminRoute = location.pathname.startsWith("/admindashboard");
//   const isAuthRoute = ["/login", "/signup"].includes(location.pathname);
//   const showNavbar = !isAdminRoute && !isAuthRoute;

//   return (
//     <>
//       {/* ==================== GLOBAL NAVBAR ==================== */}
//       {/* {!isAdminRoute && (
//         <Navbar
//           user={user}
//           role={user.role}
//           cartItemCount={user.isAuthenticated ? cartItems.length : 0}
//           handleLogout={logout}
//         />
//       )} */}

//       {showNavbar && (
//         <Navbar
//           user={user}
//           role={user.role}
//           cartItemCount={user.isAuthenticated ? cartItems.length : 0}
//           handleLogout={logout}
//         />
//       )}

//       {/* ==================== PAGE CONTENT ==================== */}
//       {/* <div className="pt-20"> */}
//       <div className={(isAdminRoute || isAuthRoute) ? "pt-0" : "pt-20"}>

//         <Routes>

//           {/* ===================== ADMIN ROUTES ===================== */}
//           <Route
//             path="/admindashboard"
//             element={
//               <ProtectedRoute>
//                 <NotificationProvider>
//                   <Admindashboard />
//                 </NotificationProvider>
//               </ProtectedRoute>
//             }
//           >
//             <Route index element={<Home />} />
//             <Route path="manageuser" element={<ManageUsers />} />
//             <Route path="manageuser/adduser" element={<Adduser />} />
//             <Route path="manageuser/listusers" element={<Listusers />} />
//             <Route path="managecategories/addcategory" element={<Addcategory />} />
//             <Route path="managecategories/listcategory" element={<Listcategory />} />
//             <Route path="manageproducts" element={<Manageproducts />} />
//             <Route path="manageproducts/addproducts" element={<Addproducts />} />
//             <Route path="manageproducts/listproducts" element={<Listproducts />} />
//             <Route path="adminordermanagement" element={<AdminOrderManagement />} />
//             <Route path="profile" element={<AdminProfile />} />
//           </Route>

//           {/* ===================== CUSTOMER ===================== */}
//           <Route path="/" element={<Customerdashboard />} />
//           <Route path="/products" element={<ProductsPage />} />
//           <Route path="/categories/:slug" element={<CategoryProductPage />} />
//           <Route path="/products/:productId" element={<ProductDetailPage />} />

//           <Route path="/cart" element={<ProtectedRoute><Cartpage /></ProtectedRoute>} />
//           <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
//           <Route path="/WishlistPage" element={<ProtectedRoute><WhishlistPage /></ProtectedRoute>} />
//           <Route path="/myorders" element={<ProtectedRoute><MyOrdersPage /></ProtectedRoute>} />
//           <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
//           <Route path="/order-success" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />

//           {/* ===================== AUTH ===================== */}
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/login" element={<Login />} />

//           {/* ===================== FALLBACK ===================== */}
//           <Route path="*" element={<NotFound />} />

//         </Routes>
//       </div>
//     </>
//   );
// };

// export default AppRoutes;







import { Routes, Route, useLocation, Outlet, } from "react-router-dom";
import { useEffect } from "react";

/* ==================== CONTEXT HOOKS ==================== */
import { useAuth } from "./context/AuthContext";
import { useCart } from "./context/CartContext";

/* ==================== GLOBAL COMPONENTS ==================== */
import Navbar from "./components/Navbar";

/* ==================== AUTH ==================== */
import Signup from "./login/Signup";
import Login from "./login/Login";
import ProtectedRoute from "./login/ProtectedRoute";

/* ==================== DASHBOARDS ==================== */
import Admindashboard from "./dashboard/Admindashboard";
import Customerdashboard from "./dashboard/Customerdashboard";

/* ==================== ADMIN ==================== */
import ManageUsers from "./users/ManageUsers";
import Adduser from "./users/Adduser";
import Listusers from "./users/Listusers";

import Addcategory from "./categories/Addcategory";
import Listcategory from "./categories/Listcategory";

import Manageproducts from "./products/Manageproducts";
import Addproducts from "./products/Addproducts";
import Listproducts from "./products/Listproducts";

import AdminOrderManagement from "./dashboard/AdminOrderManagement";
import AdminProfile from "./dashboard/AdminProfile";

/* ==================== CUSTOMER ==================== */
import ProductsPage from "./components/AllProducts";
import CategoryProductPage from "./cart/CategoryProductPage";
import ProductDetailPage from "./cart/ProductDetailPage";

import Cartpage from "./cart/Cartpage";
import CheckoutPage from "./cart/CheckoutPage";

import MyOrdersPage from "./orders/MyOrdersPage";
import WhishlistPage from "./pages/WishlistPage";
import ProfilePage from "./pages/ProfilePage";
import OrderSuccess from "./pages/OrderSuccess";
import DiscountPage from "./components/DiscountPage";
import AnnouncementBar from "./components/AnnouncementBar";

/* ==================== MISC ==================== */
import Home from "./home/Home";
import NotFound from "./pages/NotFound";

/* ==================== NOTIFICATIONS ==================== */
import { NotificationProvider } from "./context/NotificationContext";
import { UserNotificationProvider } from "./context/UserNotificationContext";

/* ======================================================= */
/* ==================== CUSTOMER LAYOUT ================== */
/* ======================================================= */

const CustomerLayout = () => {
  const { logout, user } = useAuth();
  const { cartItems } = useCart();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // use "smooth" if you want animation
    });
  }, [location.pathname]);

  return (
    <UserNotificationProvider>
      <Navbar
        user={user}
        role={user.role}
        cartItemCount={user.isAuthenticated ? cartItems.length : 0}
        handleLogout={logout}
      />

      {/* Padding below navbar */}
      <div className="pt-5">
        <Outlet />
      </div>
    </UserNotificationProvider>
  );
};

/* ======================================================= */
/* ==================== MAIN ROUTES ====================== */
/* ======================================================= */

const AppRoutes = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admindashboard");
  const isAuthRoute = ["/login", "/signup"].includes(location.pathname);

  return (
    <Routes>

      {/* ===================== ADMIN ROUTES ===================== */}
      <Route
        path="/admindashboard"
        element={
          <ProtectedRoute>
            <NotificationProvider>
              <Admindashboard />
            </NotificationProvider>
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="manageuser" element={<ManageUsers />} />
        <Route path="manageuser/adduser" element={<Adduser />} />
        <Route path="manageuser/listusers" element={<Listusers />} />
        <Route path="managecategories/addcategory" element={<Addcategory />} />
        <Route path="managecategories/listcategory" element={<Listcategory />} />
        <Route path="manageproducts" element={<Manageproducts />} />
        <Route path="manageproducts/addproducts" element={<Addproducts />} />
        <Route path="manageproducts/listproducts" element={<Listproducts />} />
        <Route path="adminordermanagement" element={<AdminOrderManagement />} />
        <Route path="profile" element={<AdminProfile />} />
      </Route>

      {/* ===================== CUSTOMER ROUTES ===================== */}
      <Route element={<CustomerLayout />}>
        <Route path="/" element={<Customerdashboard />} />
        <Route path="/discounts" element={<DiscountPage />} />
         <Route path="/announcementbar" element={<AnnouncementBar />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/categories/:slug" element={<CategoryProductPage />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cartpage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/WishlistPage"
          element={
            <ProtectedRoute>
              <WhishlistPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/myorders"
          element={
            <ProtectedRoute>
              <MyOrdersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/order-success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* ===================== AUTH ROUTES ===================== */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* ===================== FALLBACK ===================== */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};

export default AppRoutes;
