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

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from "./login/Signup";
import Login from "./login/Login";

import Admindashboard from "./dashboard/Admindashboard";
import Customerdashboard from "./dashboard/Customerdashboard";

import Home from "./home/Home";

import ManageUsers from "./users/ManageUsers";
import Adduser from "./users/Adduser";
import Listusers from "./users/Listusers";


import Addcategory from "./categories/Addcategory";
import Listcategory from "./categories/Listcategory";

import Manageproducts from "./products/Manageproducts";
import Addproducts from "./products/Addproducts";
import Listproducts from "./products/Listproducts";

import Cartpage from "./cart/Cartpage";
import CategoryProductPage from "./cart/CategoryProductPage";
import ProductDetailPage from "./cart/ProductDetailPage";

import MyOrdersPage from "./orders/MyOrdersPage";
import AdminOrderManagement from "./dashboard/AdminOrderManagement";

import NotFound from "./pages/NotFound";
import WhishlistPage from "./pages/WishlistPage";
import ProductsPage from "./components/AllProducts";

import ProtectedRoute from "./login/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
import AdminProfile from "./dashboard/AdminProfile";
import OrderSuccess from "./pages/OrderSuccess";
import CheckoutPage from "./cart/CheckoutPage";


const AppRoutes = () => {
  return (
    <Router>
      <Routes>

        {/* ===================== ADMIN PROTECTED ROUTES ===================== */}
        <Route
          path="/admindashboard"
          element={
            <ProtectedRoute>
              <Admindashboard />
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

          <Route
            path="adminordermanagement"
            element={<AdminOrderManagement />}
          />

          <Route path="profile" element={<AdminProfile />} />
        </Route>

        {/* ===================== PUBLIC CUSTOMER ROUTES ===================== */}
        {/* Anyone can access these (NO LOGIN REQUIRED) */}

        <Route path="/" element={<Customerdashboard />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/categories/:slug" element={<CategoryProductPage />} />
        <Route
          path="/products/:productId"
          element={<ProductDetailPage />}
        />

        {/* ===================== CUSTOMER PROTECTED ROUTES ===================== */}
        {/* Login REQUIRED */}

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cartpage />
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


        <Route
  path="/checkout"
  element={
    <ProtectedRoute>
      <CheckoutPage />
    </ProtectedRoute>
  }
/>


        {/* ===================== AUTH ROUTES ===================== */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* ===================== FALLBACK ===================== */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
};

export default AppRoutes;


