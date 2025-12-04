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
// import ProductsPage from "./components/AllProducts";


// import ProtectedRoute from "./login/ProtectedRoute"; // 👈 ADD THIS

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
//         </Route>

//         {/* CUSTOMER PROTECTED ROUTES */}

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

//         {/* PUBLIC ROUTES */}
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </Router>
//   );
// };

// export default AppRoutes;

/////////////////////////////working codeeee



import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./login/Signup";
import Login from "./login/Login";
import Admindashboard from "./dashboard/Admindashboard";
import Customerdashboard from "./dashboard/Customerdashboard";
import Home from "./home/Home";
import ManageUsers from "./users/ManageUsers";
import Adduser from "./users/Adduser";
import Listusers from "./users/Listusers";
import Managecategories from "./categories/Managecategories";
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



const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* ADMIN PROTECTED ROUTES */}
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
          <Route path="managecategories" element={<Managecategories />} />
          <Route
            path="managecategories/addcategory"
            element={<Addcategory />}
          />
          <Route
            path="managecategories/listcategory"
            element={<Listcategory />}
          />
          <Route path="manageproducts" element={<Manageproducts />} />
          <Route path="manageproducts/addproducts" element={<Addproducts />} />
          <Route
            path="manageproducts/Listproducts"
            element={<Listproducts />}
          />
          <Route
            path="adminordermanagement"
            element={<AdminOrderManagement />}
          />
        </Route>

        {/* CUSTOMER PROTECTED ROUTES */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Customerdashboard />
            </ProtectedRoute>
          }
        />



        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/WishlistPage"
          element={
            <ProtectedRoute>
              <WhishlistPage/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cartpage />
            </ProtectedRoute>
          }
        />


        <Route
          path="/categories/:slug"
          element={
            <ProtectedRoute>
              <CategoryProductPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products/:productId"
          element={
            <ProtectedRoute>
              <ProductDetailPage />
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

        {/* PUBLIC ROUTES */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;