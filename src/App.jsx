import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css'
import Signup from './login/Signup'
import Login from './login/Login'
import Admindashboard from "./dashboard/Admindashboard";
import Customerdashboard from "./dashboard/Customerdashboard";
import Home from "./home/Home";
import ManageUsers from "./users/ManageUsers";
import Adduser from "./users/Adduser";
import Listusers from "./users/Listusers";
import Managecategories from "./categories/Managecategories";
import Addcategory from "./categories/Addcategory";
import Deletecategory from "./categories/Deletecategory"; 
import Manageproducts from "./products/Manageproducts";
import Addproducts from "./products/Addproducts";
import Updateproduct from "./products/Updateproduct";
import Deleteproduct from "./products/Deleteproduct";
import Listproducts from "./products/Listproducts";
import Listcategory from "./categories/Listcategory";
import Cartpage from "./cart/Cartpage";
import CategoryProductPage from "./cart/CategoryProductPage";
import ProductDetailPage from "./cart/ProductDetailPage";
import { CartProvider } from './context/CartContext';
import MyOrdersPage from "./orders/MyOrdersPage";



function App() {

  return (
    <>

    <Router>
      <CartProvider>
      <Routes>
        {/* Admin Layout */}
        <Route path="/admindashboard" element={<Admindashboard />}>
          <Route index element={<Home />} />
          <Route path="manageuser" element={<ManageUsers />} />
          <Route path="manageuser/adduser" element={<Adduser />} />
          <Route path="manageuser/listusers" element={<Listusers />} />
           <Route path="managecategories" element={<Managecategories />} />
          <Route path="managecategories/addcategory" element={<Addcategory/>} />
          {/* <Route path="managecategories/updatecategory" element={<Updatecategory />} /> */}
            {/* <Route path="managecategories/deletecategory" element={<Deletecategory/>} /> */}
             <Route path="managecategories/listcategory" element={<Listcategory/>} />
           <Route path="manageproducts" element={<Manageproducts />} />
            <Route path="manageproducts/addproducts" element={<Addproducts/>} />
            {/* <Route path="manageproducts/updateproduct" element={<Updateproduct/>} />
            <Route path="manageproducts/deleteproduct" element={<Deleteproduct/>} /> */}
             <Route path="manageproducts/Listproducts" element={<Listproducts/>} />
        </Route>

         <Route path="/customerdashboard" element={<Customerdashboard />} />
        <Route path="/cart" element={<Cartpage />} />

        <Route path="/categories/:slug" element={<CategoryProductPage />} />
       <Route path="/products/:productId" element={<ProductDetailPage />} />
        <Route path="/myorders" element={<MyOrdersPage />} />
        {/* Authentication */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
      </Routes>
      </CartProvider>
    </Router>
   
    </>
  )
}

export default App


// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import './App.css'
// import Signup from './login/Signup'
// import Login from './login/Login'
// import Admindashboard from "./dashboard/Admindashboard";
// import Customerdashboard from "./dashboard/Customerdashboard";
// import Home from "./home/Home";
// import ManageUsers from "./users/ManageUsers";
// import Adduser from "./users/Adduser";
// import Listusers from "./users/Listusers";
// import Managecategories from "./categories/Managecategories";
// import Addcategory from "./categories/Addcategory";
// import Deletecategory from "./categories/Deletecategory"; 
// import Manageproducts from "./products/Manageproducts";
// import Addproducts from "./products/Addproducts";
// import Updateproduct from "./products/Updateproduct";
// import Deleteproduct from "./products/Deleteproduct";
// import Listproducts from "./products/Listproducts";
// import Listcategory from "./categories/Listcategory";
// import Cartpage from "./cart/Cartpage";
// import CategoryProductPage from "./cart/CategoryProductPage";
// import ProductDetailPage from "./cart/ProductDetailPage";
// import { CartProvider } from './context/CartContext';
// import MyOrdersPage from "./orders/MyOrdersPage";

// // 👈 IMPORT THE PROTECTED ROUTE COMPONENT
// import ProtectedRoute from "./login/ProtectedRoute"; 

// function App() {

//   return (
//     <>
//       <Router>
//         <CartProvider>
//           <Routes>
            
//             {/* --------------------- PUBLIC/AUTHENTICATION ROUTES --------------------- */}
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/" element={<Login />} />
            
//             {/* --------------------------- PROTECTED ROUTES --------------------------- */}
            
//             {/* 🔐 PROTECTING CUSTOMER ROUTES */}
//             <Route element={<ProtectedRoute allowedRoles={['customer', 'admin']} />}>
//               <Route path="/customerdashboard" element={<Customerdashboard />} />
//               {/* Note: /cart, /myorders, etc., can be public or protected based on your design. 
//                  If you want to protect them, nest them here: */}
//                <Route path="/myorders" element={<MyOrdersPage />} />
//                {/* <Route path="/cart" element={<Cartpage />} /> // Uncomment to protect cart */}
//             </Route>

//             {/* 🔐 PROTECTING ADMIN LAYOUT AND ALL NESTED ROUTES */}
//             <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
//               <Route path="/admindashboard" element={<Admindashboard />}>
//                 <Route index element={<Home />} />
//                 <Route path="manageuser" element={<ManageUsers />} />
//                 <Route path="manageuser/adduser" element={<Adduser />} />
//                 <Route path="manageuser/listusers" element={<Listusers />} />
//                 <Route path="managecategories" element={<Managecategories />} />
//                 <Route path="managecategories/addcategory" element={<Addcategory/>} />
//                 <Route path="managecategories/listcategory" element={<Listcategory/>} />
//                 <Route path="manageproducts" element={<Manageproducts />} />
//                 <Route path="manageproducts/addproducts" element={<Addproducts/>} />
//                 <Route path="manageproducts/Listproducts" element={<Listproducts/>} />
//                 {/* Add other admin sub-routes here */}
//               </Route>
//             </Route>

//             {/* ------------------------- MIXED/PUBLIC ROUTES -------------------------- */}
//             {/* These routes are usually for browsing products and can be accessed by anyone */}
//             <Route path="/cart" element={<Cartpage />} /> 
//             <Route path="/categories/:slug" element={<CategoryProductPage />} />
//             <Route path="/products/:productId" element={<ProductDetailPage />} />

//           </Routes>
//         </CartProvider>
//       </Router>
//     </>
//   )
// }

// export default App




